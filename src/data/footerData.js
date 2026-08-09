// Dynamic footer configuration data
export const FOOTER_DATA = {
  brand: {
    name: 'Voyara',
    tagline: 'Thoughtful journeys, intelligently planned.',
    icon: 'Compass'
  },
  sections: [
    {
      title: 'Explore',
      links: [
        { label: 'Destinations', href: '/destinations' },
        { label: 'Trip Planner', href: '/planner' },
        { label: 'How It Works', href: '/#how-it-works' },
        { label: 'My Trips', href: '/my-trips' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Careers', href: '/careers' },
        { label: 'Blog', href: '/blog' },
        { label: 'Press', href: '/press' }
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', href: '/help' },
        { label: 'FAQ', href: '/faq' },
        { label: 'Contact Us', href: 'mailto:hello@voyara.ai' },
        { label: 'Feedback', href: '/#feedback' }
      ]
    }
  ],
  social: {
    title: 'Connect',
    platforms: [
      { icon: 'GitBranch', label: 'GitHub', href: '#' },
      { icon: 'Link2', label: 'LinkedIn', href: '#' },
      { icon: 'Mail', label: 'Contact', href: 'mailto:hello@voyara.ai' }
    ]
  },
  newsletter: {
    title: 'Stay Updated',
    description: 'Get travel tips and destination inspiration delivered to your inbox.',
    placeholder: 'Enter your email',
    buttonText: 'Subscribe'
  },
  legal: {
    copyright: '© 2026 Voyara. All rights reserved.',
    links: [
      { label: 'Privacy Policy', href: '/#privacy' },
      { label: 'Terms of Service', href: '/#terms' },
      { label: 'Cookie Policy', href: '/#cookies' }
    ]
  }
};

export const FOOTER_CONFIG = {
  colors: {
    background: '#16271d',
    text: '#ffffff',
    textMuted: 'rgba(255, 255, 255, 0.6)',
    accent: '#c8601a'
  },
  animation: {
    stagger: 0.08,
    duration: 0.5
  }
};
