export const projects = [
  {
    id: 'haven',
    number: 'PROJECT 01',
    name: 'Haven',
    category: 'DIGITAL PRODUCT / WEB EXPERIENCE',
    description: 'A thoughtful digital experience designed around connection, comfort and simplicity. Haven combines a calm visual system with an intuitive interface to make the experience feel approachable from the very first interaction.',
    tags: ['UI/UX', 'WEB DESIGN', 'DIGITAL EXPERIENCE'],
    image: '/assets/project-haven.jpg',
    role: 'Web Designer — Visual direction, UI design, responsive layouts and interaction design.',
    overview: 'Haven is a luxury real estate brand that needed a digital presence as refined as the properties they represent. The website was designed to showcase architectural sanctuaries through immersive visual storytelling, elegant typography and a seamless browsing experience that mirrors the exclusivity of the brand.',
    approach: 'The design approach centered on creating a sense of exclusivity and sophistication. Large-format imagery, generous negative space and a warm neutral palette were used to let the architecture speak for itself. Every interaction was designed to feel calm and intentional, guiding potential buyers through the properties with editorial precision.',
    tools: 'Figma, HTML, CSS, JavaScript',
  },
  {
    id: 'dental',
    number: 'PROJECT 02',
    name: 'Dental',
    category: 'HEALTHCARE WEBSITE',
    description: 'A polished website experience focused on trust, clarity and effortless appointment discovery. The design gives the practice a stronger digital presence while keeping essential information easy to find.',
    tags: ['WEB DESIGN', 'UI/UX', 'BUSINESS WEBSITE'],
    image: '/assets/project-dental.jpg',
    role: 'Web Designer — UI/UX design, responsive development and conversion optimization.',
    overview: 'Elite Dental Care required a website that would build instant trust with patients while making it effortless to book appointments. The design balances clinical professionalism with warm approachability, featuring a clean layout that highlights services, team expertise and patient testimonials.',
    approach: 'Trust was the primary design driver. A clean white and soft blue palette conveys cleanliness and professionalism. Strategic CTA placement makes booking appointments frictionless. The mobile experience was prioritized, ensuring patients could easily find information and take action from any device.',
    tools: 'Figma, HTML, CSS, JavaScript',
  },
  {
    id: 'business',
    number: 'PROJECT 03',
    name: 'Business Website',
    category: 'BUSINESS / SERVICE WEBSITE',
    description: 'A conversion-focused website designed to turn a business\'s online presence into a clear customer journey — from first impression to enquiry.',
    tags: ['WEB DESIGN', 'BRANDING', 'CONVERSION'],
    image: '/assets/project-business.jpg',
    role: 'Web Designer — Brand-aligned web design, content architecture and responsive implementation.',
    overview: 'Apex Consortium is a business consulting firm that needed a corporate website reflecting their authority and expertise. The website positions them as industry leaders through strategic design, compelling case studies and a professional visual identity that inspires confidence.',
    approach: 'A dark navy and white color scheme was chosen to convey authority and trust. The design uses a structured grid layout with clear information hierarchy. Strategic use of client logos, testimonials and case studies builds social proof throughout the experience.',
    tools: 'Figma, HTML, CSS, JavaScript',
  },
  {
    id: 'ppf',
    number: 'PROJECT 04',
    name: 'PPF',
    category: 'AUTOMOTIVE / PPF WEBSITE',
    description: 'A premium digital presence created for a paint protection film business. The design uses strong visual hierarchy, clear service presentation and direct calls to action to help potential customers understand the service and enquire with confidence.',
    tags: ['WEB DESIGN', 'BUSINESS WEBSITE', 'CONVERSION'],
    image: '/assets/project-ppf.jpg',
    role: 'Web Designer — Visual design, service showcase and responsive layouts.',
    overview: 'Veloce Automotive specializes in premium paint protection film and ceramic coating services. Their website needed to reflect the luxury automotive aesthetic while clearly communicating their services and expertise. The dark, sleek design mirrors the premium nature of the vehicles they protect.',
    approach: 'The dark theme with subtle highlights creates a premium automotive atmosphere. High-quality imagery of luxury vehicles and detailed service descriptions build trust. The service cards are designed to make it easy for customers to understand options and book services directly.',
    tools: 'Figma, HTML, CSS, JavaScript',
  },
  {
    id: 'aura',
    number: 'PROJECT 05',
    name: 'Aura',
    category: 'PREMIUM CREATIVE WEBSITE',
    description: 'A visual-first creative website built around expressive typography, bold composition and a refined dark aesthetic. The experience treats the website itself as part of the brand — designed to capture attention without sacrificing clarity.',
    tags: ['CREATIVE DIRECTION', 'WEB DESIGN', 'INTERACTION'],
    image: '/assets/project-creative.jpg',
    role: 'Web Designer — Creative direction, editorial layout and motion design.',
    overview: 'Aura Creative is a digital agency that wanted a landing page as bold and creative as their work. The design pushes boundaries with dramatic typography, dynamic visual elements and an immersive dark aesthetic that immediately establishes their creative authority.',
    approach: 'Bold, experimental typography takes center stage, creating an immediate visual impact. The dark background allows creative elements and project showcases to pop. Fluid animations and hover interactions create an engaging, gallery-like browsing experience that showcases the agency\'s capabilities through the website itself.',
    tools: 'Figma, HTML, CSS, JavaScript, GSAP',
  },
];

export function getProjectBySlug(slug) {
  return projects.find(p => p.id === slug);
}

export function getAdjacentProjects(slug) {
  const index = projects.findIndex(p => p.id === slug);
  return {
    prev: index > 0 ? projects[index - 1] : null,
    next: index < projects.length - 1 ? projects[index + 1] : null,
  };
}
