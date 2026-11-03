// Central place for everything that isn't an article: name, links, menus, projects.
export const SITE = {
  name: 'Manuel Brandt',
  url: 'https://manuelbrandt.com',
  description:
    'Founder & CEO of Blogtec. Writing about building and growing online businesses, books I read, and the things I learn along the way.',
  ogImage: '/images/2023/04/Manuel-Brandt-Blog-from-a-Startup-Founder-and-CEO.jpeg',
  locations: [
    { label: 'Kaohsiung, Taiwan', href: 'https://www.google.com/search?q=kaohsiung+taiwan' },
    { label: 'Porta Westfalica, Germany', href: 'https://www.google.com/search?q=porta+westfalica' },
  ],
};

export const NAV = [
  { label: 'About', href: '/about/' },
  { label: 'Blog', href: '/blog/' },
];

export const LISTS = [
  { label: 'My Travel Map 🌏', href: 'https://www.google.com/maps/d/u/0/viewer?mid=15KQhDei0jr-rK1wQCEAWYWsIkuoFlMQ&femb=1' },
  { label: 'My Playlist 🎵', href: 'https://open.spotify.com/playlist/32HrbeLywbZRb9xEq08W5v' },
  { label: 'My Book List 📚', href: 'https://beta.thestorygraph.com/profile/manuelbrandt' },
  { label: 'My Video Games 🎮', href: 'https://www.grouvee.com/user/157861-manuelbrandt/shelves/980458-played/?o=-score' },
];

export const SOCIALS = [
  { label: 'Instagram', icon: 'instagram', href: 'https://www.instagram.com/manuel_brandt/' },
  { label: 'LinkedIn', icon: 'linkedin', href: 'https://www.linkedin.com/in/manuel-brandt/' },
  { label: 'GitHub', icon: 'github', href: 'https://github.com/manuel-brandt' },
  { label: 'Strava', icon: 'strava', href: 'https://www.strava.com/athletes/32048948' },
] as const;

export const PROJECTS = [
  {
    name: 'Blogtec',
    href: 'https://blogtec.io/',
    logo: '/images/2025/02/Logo-2.png',
    description: 'The best place to outsource SEO and backlink services.',
  },
];

export const NEWSLETTER = {
  title: 'Notes from a Founder',
  linkedinUrl: 'https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7047887687009124352',
  // Optional: paste a form endpoint from any email tool (Kit, Beehiiv, Mailchimp, Buttondown, …)
  // to show an email signup form. Leave empty to show only the LinkedIn option.
  emailFormAction: '',
  emailFieldName: 'email',
};
