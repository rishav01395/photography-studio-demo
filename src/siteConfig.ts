export type GalleryItem = {
  id: string
  title: string
  category: 'Weddings' | 'Pre-Wedding' | 'Portraits' | 'Events' | 'Cinematic Films'
  image: string
  alt: string
}

export type ServiceItem = {
  title: string
  shortTitle: string
  image: string
  description: string
  deliverables: string[]
}

export type PackageItem = {
  name: string
  priceLabel: string
  summary: string
  inclusions: string[]
}

export const brand = {
  name: 'FRAME & FOREVER',
  tagline: 'Every Frame Tells Your Story.',
  yearFounded: '2021',
  heroBadge: 'PHOTOGRAPHY • FILMS • STORIES',
  primaryHeading: 'Your Moments. Our Masterpiece.',
  heroText:
    'We create cinematic, honest imagery that lets your emotions, rituals, and relationships feel beautifully alive long after the day is over.',
}

export const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Packages', href: '#packages' },
  { label: 'Contact', href: '#contact' },
]

export const studioStats = [
  { label: 'Illustrative demo data', value: 'Custom story-led shoots' },
  { label: 'Creative direction', value: 'Editorial + cinematic' },
  { label: 'Experience style', value: 'Personal & warm' },
]

export const galleryItems: GalleryItem[] = [
  {
    id: 'wedding-1',
    title: 'Golden Hour Vows',
    category: 'Weddings',
    image:
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80',
    alt: 'A couple sharing a warm embrace during a sunset wedding ceremony',
  },
  {
    id: 'portrait-1',
    title: 'Quiet Confidence',
    category: 'Portraits',
    image:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
    alt: 'A portrait of a woman in soft natural light',
  },
  {
    id: 'pre-wedding-1',
    title: 'Coastal Frames',
    category: 'Pre-Wedding',
    image:
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80',
    alt: 'Couple walking along a coastal shoreline at golden hour',
  },
  {
    id: 'film-1',
    title: 'A Moment in Motion',
    category: 'Cinematic Films',
    image:
      'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80',
    alt: 'A cinematic film still showing a couple in a glowing evening setting',
  },
  {
    id: 'event-1',
    title: 'Celebration Details',
    category: 'Events',
    image:
      'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=900&q=80',
    alt: 'Event highlights with joyful guests and warm festive lights',
  },
  {
    id: 'wedding-2',
    title: 'Barefoot Promise',
    category: 'Weddings',
    image:
      'https://images.unsplash.com/photo-1529636799239-75f7c4c8c0fa?auto=format&fit=crop&w=900&q=80',
    alt: 'A wedding couple holding each other outdoors in a romantic setting',
  },
  {
    id: 'portrait-2',
    title: 'Stillness',
    category: 'Portraits',
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80',
    alt: 'Portrait of a graceful woman in a neutral-toned studio environment',
  },
  {
    id: 'film-2',
    title: 'The Story Takes Shape',
    category: 'Cinematic Films',
    image:
      'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80',
    alt: 'A couple looking into the distance while walking on a cinematic road',
  },
  {
    id: 'event-2',
    title: 'Afterglow',
    category: 'Events',
    image:
      'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=900&q=80',
    alt: 'A lively evening celebration with glowing lights and smiling guests',
  },
  {
    id: 'pre-wedding-2',
    title: 'Fields of Us',
    category: 'Pre-Wedding',
    image:
      'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=80',
    alt: 'A couple sharing a quiet moment in a peaceful natural landscape',
  },
]

export const services: ServiceItem[] = [
  {
    title: 'Wedding Photography',
    shortTitle: 'Wedding Photo',
    image:
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=900&q=80',
    description:
      'Documentary-led portraits, rituals, and intimate details that feel honest, elevated, and timeless.',
    deliverables: ['Coverage planning', 'Editorial curation', 'Full gallery delivery'],
  },
  {
    title: 'Wedding Cinematography',
    shortTitle: 'Cinematic Film',
    image:
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80',
    description:
      'Short-form and feature-style films designed to capture movement, emotion, and the flow of your day.',
    deliverables: ['Creative concept', 'Filming timeline', 'Final film preview'],
  },
  {
    title: 'Pre-Wedding Shoots',
    shortTitle: 'Pre-Wedding',
    image:
      'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=80',
    description:
      'Thoughtful, location-led storytelling shoots with direction that feels personal and effortless.',
    deliverables: ['Moodboard planning', 'Location guidance', 'Retouched gallery'],
  },
  {
    title: 'Portrait Photography',
    shortTitle: 'Portraits',
    image:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
    description:
      'Refined portraits that balance natural expression, styling, and cinematic composition.',
    deliverables: ['Wardrobe guidance', 'Story-led posing', 'Retouched selections'],
  },
  {
    title: 'Birthday & Event Coverage',
    shortTitle: 'Events',
    image:
      'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=900&q=80',
    description:
      'Celebration coverage focused on authentic energy, meaningful moments, and detail-rich storytelling.',
    deliverables: ['Event coverage', 'Highlight edit', 'Delivery gallery'],
  },
  {
    title: 'Commercial / Brand Photography',
    shortTitle: 'Brand',
    image:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80',
    description:
      'Modern commercial imagery for businesses and founders who want their story to feel premium and clear.',
    deliverables: ['Creative direction', 'Brand imagery', 'Usage-ready files'],
  },
]

export const packages: PackageItem[] = [
  {
    name: 'Essential',
    priceLabel: 'SAMPLE PRICE: ₹18,000',
    summary: 'For intimate stories and essentials-focused coverage.',
    inclusions: ['1 photography session', 'Candid storytelling coverage', 'Approx. 30 edited images'],
  },
  {
    name: 'Signature',
    priceLabel: 'SAMPLE PRICE: ₹34,000',
    summary: 'A fuller, elevated story with more coverage and polished deliverables.',
    inclusions: ['Extended session coverage', 'Portrait + detail storytelling', 'Curated online gallery'],
  },
  {
    name: 'Cinematic',
    priceLabel: 'Request a Quote',
    summary: 'For couples and brands that want an immersive visual narrative.',
    inclusions: ['Story-led planning session', 'Cinematic film + photography', 'Tailored deliverable list'],
  },
]

export const faqs = [
  {
    question: 'How do I book a session?',
    answer:
      'Send a short enquiry through the contact form or WhatsApp with your preferred date, type of shoot, and location. We will review the details and confirm the next steps.',
  },
  {
    question: 'How far in advance should I enquire?',
    answer:
      'We recommend reaching out as early as possible, especially for weddings and event coverage. If your date is approaching quickly, we will still do our best to accommodate based on availability.',
  },
  {
    question: 'What locations do you cover?',
    answer:
      'We are happy to work in your preferred city, destination, or surrounding areas. Travel details and location planning can be discussed during the initial consultation.',
  },
  {
    question: 'How are photographs delivered?',
    answer:
      'Photographs are typically delivered through a private, curated gallery. Final delivery timelines and file formats can be tailored to the project requirements.',
  },
  {
    question: 'Can I customize a package?',
    answer:
      'Yes. Packages can be adjusted based on the scope, timeline, and experience you want. We can build a custom proposal around your vision.',
  },
  {
    question: 'How can I request a quote?',
    answer:
      'Use the enquiry form and include your event type, date, location, and any specific requirements. A tailored quote can then be prepared for you.',
  },
]

export const studioConfig = {
  featureVideoUrl: '',
  contactEmail: 'hello@frameandforever.com',
  contactPhone: '',
  whatsAppNumber: '',
  studioLocation: '',
  instagramUrl: '',
  youtubeUrl: '',
  facebookUrl: '',
  behanceUrl: '',
  photographerName: 'Aarav Mehta',
  photographerBio:
    'An editorial photographer and storyteller creating warm, honest imagery for modern couples, families, and brands.',
  studioAbout:
    'FRAME & FOREVER is a lifestyle-led studio focused on crafting stories that feel deeply personal, polished, and distinctly yours. We believe the best imagery sits between art direction and human truth—intentional, calm, and emotionally resonant.',
}

export const contactDetails = {
  address: 'Demo Studio Address, Your City, India',
  whatsappSetupMessage:
    'WhatsApp number not configured yet. Add a real number in src/siteConfig.ts or .env to enable direct enquiries.',
}
