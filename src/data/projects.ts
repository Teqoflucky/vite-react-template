export interface Project {
  title: string;
  description: string;
  tags: string[];
  href: string;
  status: 'shipped' | 'in progress' | 'idea';
}

export const projects: Project[] = [
  {
    title: 'Instagram Live Stream Detection',
    description: 'Detects active Instagram live streams via the Graph API — built for a hackathon-style sprint.',
    tags: ['Python', 'Graph API'],
    href: '#',
    status: 'in progress',
  },
  {
    title: 'ML Portfolio Web App',
    description: 'Client-side ML demo for phishing URL detection or log anomaly visualization, running entirely in-browser.',
    tags: ['TensorFlow.js', 'React'],
    href: '#',
    status: 'idea',
  },
];
