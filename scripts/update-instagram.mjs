// Refreshes src/data/instagram.json + public/images/instagram/ with the latest posts.
// Uses the official Instagram API (Instagram Login). Needs env INSTAGRAM_ACCESS_TOKEN.
// Run locally:  INSTAGRAM_ACCESS_TOKEN=... node scripts/update-instagram.mjs
// Runs daily via .github/workflows/instagram.yml
import fs from 'node:fs';
import path from 'node:path';

const COUNT = 8;
const token = process.env.INSTAGRAM_ACCESS_TOKEN;
if (!token) {
  console.log('INSTAGRAM_ACCESS_TOKEN not set – keeping existing Instagram data.');
  process.exit(0);
}

const API = 'https://graph.instagram.com';
const getJson = async (url) => {
  const res = await fetch(url);
  const body = await res.json();
  if (!res.ok || body.error) throw new Error(`Instagram API error: ${JSON.stringify(body.error ?? body)}`);
  return body;
};

// Long-lived tokens expire after 60 days unless refreshed; refreshing on every run keeps them alive.
await getJson(`${API}/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`).catch((e) =>
  console.warn('Token refresh skipped:', e.message),
);

const { data } = await getJson(
  `${API}/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&limit=${COUNT}&access_token=${token}`,
);

const imgDir = 'public/images/instagram';
fs.mkdirSync(imgDir, { recursive: true });
const items = [];
for (const post of data.slice(0, COUNT)) {
  const src = post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url;
  if (!src) continue;
  const id = post.permalink.split('/').filter(Boolean).pop();
  const file = path.join(imgDir, `${id}.jpg`);
  if (!fs.existsSync(file)) {
    const res = await fetch(src);
    if (!res.ok) { console.warn('Image download failed', res.status, post.permalink); continue; }
    fs.writeFileSync(file, Buffer.from(await res.arrayBuffer()));
  }
  items.push({
    url: post.permalink,
    image: `/images/instagram/${id}.jpg`,
    caption: (post.caption ?? '').split('\n')[0].slice(0, 200),
    date: post.timestamp.slice(0, 10),
  });
}

// remove images of posts that dropped out of the list
const keep = new Set(items.map((i) => path.basename(i.image)));
for (const f of fs.readdirSync(imgDir)) if (!keep.has(f)) fs.unlinkSync(path.join(imgDir, f));

fs.writeFileSync('src/data/instagram.json', JSON.stringify(items, null, 2) + '\n');
console.log(`Saved ${items.length} Instagram posts.`);
