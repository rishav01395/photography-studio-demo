import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  Camera,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clapperboard,
  Mail,
  MapPin,
  Menu,
  MessageCircleMore,
  Phone,
  Play,
  Sparkles,
  Star,
  X,
} from 'lucide-react'
import './App.css'
import {
  brand,
  contactDetails,
  faqs,
  galleryItems,
  navItems,
  packages,
  services,
  studioConfig,
  studioStats,
} from './siteConfig'

type FormValues = {
  name: string
  email: string
  phone: string
  shootType: string
  eventDate: string
  location: string
  packagePreference: string
  budget: string
  message: string
  consent: boolean
}

const initialForm: FormValues = {
  name: '',
  email: '',
  phone: '',
  shootType: '',
  eventDate: '',
  location: '',
  packagePreference: 'Signature',
  budget: '',
  message: '',
  consent: false,
}

const categoryList = ['All', ...new Set(galleryItems.map((item) => item.category))]

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [formValues, setFormValues] = useState<FormValues>(initialForm)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [formStatus, setFormStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: '',
  })

  const filteredGallery = useMemo(
    () =>
      activeCategory === 'All'
        ? galleryItems
        : galleryItems.filter((item) => item.category === activeCategory),
    [activeCategory],
  )

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!lightboxOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLightboxOpen(false)
      }

      if (event.key === 'ArrowRight') {
        setLightboxIndex((current) => (current + 1) % filteredGallery.length)
      }

      if (event.key === 'ArrowLeft') {
        setLightboxIndex((current) => (current - 1 + filteredGallery.length) % filteredGallery.length)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [filteredGallery.length, lightboxOpen])

  const currentLightboxItem = filteredGallery[lightboxIndex] ?? filteredGallery[0]

  const scrollToSection = (href: string) => {
    const section = document.querySelector(href)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setMobileOpen(false)
  }

  const openEnquiry = (serviceName?: string, packageName?: string) => {
    setFormStatus({ type: 'idle', message: '' })
    setFormValues((current) => ({
      ...current,
      shootType: serviceName ?? current.shootType,
      packagePreference: packageName ?? current.packagePreference,
    }))

    const contactSection = document.getElementById('contact')
    contactSection?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = event.target
    const checked = 'checked' in event.target ? event.target.checked : undefined

    setFormValues((current) => ({
      ...current,
      [name]: type === 'checkbox' ? Boolean(checked) : value,
    }))

    if (formErrors[name]) {
      setFormErrors((current) => ({ ...current, [name]: '' }))
    }
  }

  const validateForm = () => {
    const nextErrors: Record<string, string> = {}

    if (!formValues.name.trim()) nextErrors.name = 'Please enter your full name.'
    if (!formValues.email.trim()) {
      nextErrors.email = 'Please enter your email.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
      nextErrors.email = 'Please enter a valid email address.'
    }
    if (!formValues.phone.trim()) nextErrors.phone = 'Please add a phone or WhatsApp number.'
    if (!formValues.shootType.trim()) nextErrors.shootType = 'Please tell us the shoot type.'
    if (!formValues.eventDate.trim()) nextErrors.eventDate = 'Please select an event date.'
    if (!formValues.location.trim()) nextErrors.location = 'Please enter the location.'
    if (!formValues.packagePreference.trim()) {
      nextErrors.packagePreference = 'Please select or request a package.'
    }
    if (!formValues.consent) nextErrors.consent = 'Please confirm that you agree to be contacted.'

    return nextErrors
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validateForm()
    setFormErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      setFormStatus({
        type: 'error',
        message: 'Please complete the highlighted fields before submitting the enquiry form.',
      })
      return
    }

    setFormStatus({
      type: 'success',
      message:
        'Demo mode enabled: the enquiry has been prepared for a backend or email workflow. No submissions are saved yet.',
    })
    setFormValues(initialForm)
    setFormErrors({})
  }

  const handleWhatsApp = () => {
    if (!studioConfig.whatsAppNumber) {
      setFormStatus({
        type: 'error',
        message: 'WhatsApp setup required. Add a valid number in src/siteConfig.ts or your environment variables.',
      })
      return
    }

    const enquiryText = `Hello FRAME & FOREVER,\n\nI would like to enquire about ${formValues.shootType || 'a photography session'} for ${formValues.eventDate || 'my preferred date'} in ${formValues.location || 'my location'}.\n\nMessage: ${formValues.message || 'Please share the details for my shoot.'}\n\nPreferred package: ${formValues.packagePreference || 'Not specified'}.`

    window.open(
      `https://wa.me/${studioConfig.whatsAppNumber}?text=${encodeURIComponent(enquiryText)}`,
      '_blank',
      'noopener,noreferrer',
    )
  }

  return (
    <div className="app-shell">
      <header className={scrolled ? 'site-header scrolled' : 'site-header'}>
        <div className="container nav-row">
          <button type="button" className="brand-mark" onClick={() => scrollToSection('#home')}>
            <span className="brand-wordmark">{brand.name}</span>
          </button>

          <nav className="main-nav" aria-label="Main navigation">
            {navItems.map((item) => (
              <button key={item.href} type="button" onClick={() => scrollToSection(item.href)}>
                {item.label}
              </button>
            ))}
          </nav>

          <div className="nav-actions">
            <button type="button" className="button button-primary" onClick={() => openEnquiry()}>
              Book a Consultation
            </button>
            <button
              type="button"
              className="mobile-menu-toggle"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((current) => !current)}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="mobile-menu">
            {navItems.map((item) => (
              <button key={item.href} type="button" onClick={() => scrollToSection(item.href)}>
                {item.label}
              </button>
            ))}
            <button type="button" className="button button-primary mobile-cta" onClick={() => openEnquiry()}>
              Book a Consultation
            </button>
          </div>
        )}
      </header>

      <main>
        <section id="home" className="hero-section">
          <div className="hero-backdrop" />
          <div className="container hero-grid">
            <div className="hero-copy reveal">
              <p className="eyebrow">{brand.heroBadge}</p>
              <h1>{brand.primaryHeading}</h1>
              <p className="hero-text">{brand.heroText}</p>
              <div className="hero-actions">
                <button type="button" className="button button-primary" onClick={() => scrollToSection('#portfolio')}>
                  Explore Our Work
                  <ArrowRight size={16} />
                </button>
                <button type="button" className="button button-secondary" onClick={() => openEnquiry('Wedding Photography')}>
                  Let&apos;s Plan Your Shoot
                </button>
              </div>
              <div className="meta-line">
                <span className="dot" />
                <span>Creating timeless memories since {brand.yearFounded}. Sample content.</span>
              </div>
            </div>
            <div className="hero-stat-card reveal">
              <div className="mini-label">Signature approach</div>
              <div className="mini-value">Story-led • Editorial • Emotional</div>
              <div className="mini-gallery">
                <div className="mini-card card-one" />
                <div className="mini-card card-two" />
              </div>
            </div>
          </div>
          <div className="scroll-indicator" aria-hidden="true">
            <span>Scroll</span>
            <div className="scroll-line" />
          </div>
        </section>

        <section className="intro-section section-shell">
          <div className="container intro-grid reveal">
            <div>
              <p className="section-kicker">About the experience</p>
              <h2>We capture the feeling behind the moment.</h2>
            </div>
            <p>
              Every frame is composed with intention—crafted to hold the texture of emotion, the glow of
              connection, and the details that make your story unmistakably yours.
            </p>
          </div>

          <div className="container stats-row">
            {studioStats.map((item) => (
              <div key={item.label} className="stat-card reveal">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </section>

        <section id="portfolio" className="section-shell gallery-section">
          <div className="container section-head reveal">
            <div>
              <p className="section-kicker">Portfolio</p>
              <h2>Selected stories.</h2>
            </div>
            <div className="portfolio-filters" aria-label="Portfolio categories">
              {categoryList.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={activeCategory === category ? 'filter-button is-active' : 'filter-button'}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="container gallery-grid">
            {filteredGallery.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className="gallery-card reveal"
                onClick={() => {
                  setLightboxIndex(index)
                  setLightboxOpen(true)
                }}
              >
                <img src={item.image} alt={item.alt} loading="lazy" />
                <span className="gallery-overlay">
                  <small>{item.category}</small>
                  <strong>{item.title}</strong>
                </span>
              </button>
            ))}
          </div>
        </section>

        <section id="services" className="section-shell services-section">
          <div className="container section-head reveal">
            <div>
              <p className="section-kicker">Services</p>
              <h2>Creative coverage for life&apos;s most meaningful chapters.</h2>
            </div>
          </div>

          <div className="container services-grid">
            {services.map((service) => (
              <article key={service.title} className="service-card reveal">
                <div className="service-image-wrap">
                  <img src={service.image} alt={service.title} loading="lazy" />
                </div>
                <div className="service-content">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <ul>
                    {service.deliverables.map((item) => (
                      <li key={item}>
                        <Check size={14} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <button type="button" className="button button-secondary" onClick={() => openEnquiry(service.shortTitle)}>
                    Discuss Your Shoot
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-shell featured-film">
          <div className="container film-layout reveal">
            <div className="film-card">
              <div className="film-image">
                <img
                  src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80"
                  alt="Cinematic film still with couple walking through warm evening light"
                />
                <button type="button" className="play-button" aria-label="Preview film placeholder">
                  <Play size={18} />
                </button>
              </div>
            </div>

            <div className="film-copy">
              <p className="section-kicker">Featured film</p>
              <h2>Stories that move gently and linger beautifully.</h2>
              <p>
                Demo placeholder: a real video URL can be added in the studio configuration to enable a full
                playable cinematic preview. Until then, this section remains clearly marked as sample content.
              </p>
              <button type="button" className="button button-primary" onClick={() => scrollToSection('#portfolio')}>
                View Our Stories
              </button>
            </div>
          </div>
        </section>

        <section className="section-shell approach-section">
          <div className="container section-head reveal">
            <div>
              <p className="section-kicker">Our approach</p>
              <h2>A simple process, thoughtfully designed.</h2>
            </div>
          </div>

          <div className="container approach-grid">
            {[
              {
                icon: Sparkles,
                title: 'Discover',
                description: 'We understand your vision, timeline, location, and the moments that matter most.',
              },
              {
                icon: Camera,
                title: 'Create',
                description: 'We plan the story, direct the atmosphere, and capture the genuine emotion of the day.',
              },
              {
                icon: Clapperboard,
                title: 'Deliver',
                description: 'We carefully organise and present your photographs or films with clarity and care.',
              },
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="approach-card reveal">
                  <div className="approach-number">0{index + 1}</div>
                  <div className="approach-icon">
                    <Icon size={24} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              )
            })}
          </div>
        </section>

        <section id="packages" className="section-shell pricing-section">
          <div className="container section-head reveal">
            <div>
              <p className="section-kicker">Packages</p>
              <h2>Starting points for your story.</h2>
            </div>
          </div>

          <div className="container pricing-grid">
            {packages.map((pkg) => (
              <article key={pkg.name} className="package-card reveal">
                <div className="card-topline">{pkg.name}</div>
                <div className="price-tag">{pkg.priceLabel}</div>
                <p>{pkg.summary}</p>
                <ul>
                  {pkg.inclusions.map((item) => (
                    <li key={item}>
                      <Check size={14} />
                      {item}
                    </li>
                  ))}
                </ul>
                <button type="button" className="button button-primary" onClick={() => openEnquiry(undefined, pkg.name)}>
                  Choose This Package
                </button>
              </article>
            ))}
          </div>
        </section>

        <section id="about" className="section-shell about-section">
          <div className="container about-grid reveal">
            <div className="about-image-panel">
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80"
                alt="Portrait of the studio photographer"
              />
            </div>
            <div className="about-copy">
              <p className="section-kicker">About the studio</p>
              <h2>Thoughtful imagery and meaningful detail.</h2>
              <p>{studioConfig.studioAbout}</p>
              <div className="signature-block">
                <span className="signature-label">Photographer</span>
                <strong>{studioConfig.photographerName}</strong>
                <p>{studioConfig.photographerBio}</p>
              </div>
              <button type="button" className="button button-secondary" onClick={() => openEnquiry('Portrait Photography')}>
                Let&apos;s Work Together
              </button>
            </div>
          </div>
        </section>

        <section className="section-shell testimonial-section">
          <div className="container section-head reveal">
            <div>
              <p className="section-kicker">Testimonials</p>
              <h2>Sample placeholders ready for verified reviews.</h2>
            </div>
          </div>
          <div className="container testimonial-grid reveal">
            {['Sample review placeholder for future client quotes.', 'Add real client feedback once it has been verified and approved.'].map((quote, index) => (
              <div key={quote} className="testimonial-card">
                <div className="testimonial-stars" aria-label="Sample testimonial rating">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star key={`${quote}-${starIndex}`} size={14} fill="currentColor" />
                  ))}
                </div>
                <p>“{quote}”</p>
                <span>Demo review {index + 1}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="section-shell faq-section">
          <div className="container section-head reveal">
            <div>
              <p className="section-kicker">FAQ</p>
              <h2>Helpful answers for new enquiries.</h2>
            </div>
          </div>

          <div className="container faq-list reveal">
            {faqs.map((item, index) => {
              const isOpen = openFaq === index
              return (
                <div key={item.question} className={isOpen ? 'faq-item open' : 'faq-item'}>
                  <button type="button" className="faq-question" onClick={() => setOpenFaq(isOpen ? null : index)} aria-expanded={isOpen}>
                    <span>{item.question}</span>
                    <ChevronDown size={18} />
                  </button>
                  {isOpen && <div className="faq-answer">{item.answer}</div>}
                </div>
              )
            })}
          </div>
        </section>

        <section id="contact" className="section-shell contact-section">
          <div className="container contact-grid reveal">
            <div className="contact-copy">
              <p className="section-kicker">Contact & booking</p>
              <h2>Tell us about your story.</h2>
              <p>
                We create meaningful visual stories for weddings, portraits, commercial work, and cinematic
                projects. Share a few details and we will respond with next steps.
              </p>
              <div className="contact-meta">
                {studioConfig.contactEmail ? (
                  <a href={`mailto:${studioConfig.contactEmail}`}>
                    <Mail size={16} />
                    {studioConfig.contactEmail}
                  </a>
                ) : null}
                {studioConfig.contactPhone ? (
                  <a href={`tel:${studioConfig.contactPhone}`}>
                    <Phone size={16} />
                    {studioConfig.contactPhone}
                  </a>
                ) : null}
                {contactDetails.address ? (
                  <span>
                    <MapPin size={16} />
                    {contactDetails.address}
                  </span>
                ) : null}
              </div>

              {studioConfig.whatsAppNumber ? (
                <button type="button" className="button button-primary whatsapp-button" onClick={handleWhatsApp}>
                  <MessageCircleMore size={16} />
                  Enquire on WhatsApp
                </button>
              ) : (
                <div className="whatsapp-placeholder" role="note">
                  <MessageCircleMore size={16} />
                  WhatsApp setup required. Add a real number in the site configuration.
                </div>
              )}
            </div>

            <form className="enquiry-form" onSubmit={handleSubmit} noValidate>
              <div className="field-row two-up">
                <div className="field-group">
                  <label htmlFor="name">Full name</label>
                  <input id="name" name="name" type="text" value={formValues.name} onChange={handleFieldChange} />
                  {formErrors.name ? <span className="error-text">{formErrors.name}</span> : null}
                </div>

                <div className="field-group">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" value={formValues.email} onChange={handleFieldChange} />
                  {formErrors.email ? <span className="error-text">{formErrors.email}</span> : null}
                </div>
              </div>

              <div className="field-row two-up">
                <div className="field-group">
                  <label htmlFor="phone">Phone / WhatsApp</label>
                  <input id="phone" name="phone" type="tel" value={formValues.phone} onChange={handleFieldChange} />
                  {formErrors.phone ? <span className="error-text">{formErrors.phone}</span> : null}
                </div>

                <div className="field-group">
                  <label htmlFor="shootType">Event or shoot type</label>
                  <input id="shootType" name="shootType" type="text" value={formValues.shootType} onChange={handleFieldChange} />
                  {formErrors.shootType ? <span className="error-text">{formErrors.shootType}</span> : null}
                </div>
              </div>

              <div className="field-row two-up">
                <div className="field-group">
                  <label htmlFor="eventDate">Event date</label>
                  <input id="eventDate" name="eventDate" type="date" value={formValues.eventDate} onChange={handleFieldChange} />
                  {formErrors.eventDate ? <span className="error-text">{formErrors.eventDate}</span> : null}
                </div>

                <div className="field-group">
                  <label htmlFor="location">Location</label>
                  <input id="location" name="location" type="text" value={formValues.location} onChange={handleFieldChange} />
                  {formErrors.location ? <span className="error-text">{formErrors.location}</span> : null}
                </div>
              </div>

              <div className="field-row two-up">
                <div className="field-group">
                  <label htmlFor="packagePreference">Package preference</label>
                  <select id="packagePreference" name="packagePreference" value={formValues.packagePreference} onChange={handleFieldChange}>
                    <option value="Essential">Essential</option>
                    <option value="Signature">Signature</option>
                    <option value="Cinematic">Cinematic</option>
                    <option value="Custom package">Custom package</option>
                  </select>
                  {formErrors.packagePreference ? <span className="error-text">{formErrors.packagePreference}</span> : null}
                </div>

                <div className="field-group">
                  <label htmlFor="budget">Estimated budget (optional)</label>
                  <input id="budget" name="budget" type="text" value={formValues.budget} onChange={handleFieldChange} />
                </div>
              </div>

              <div className="field-group">
                <label htmlFor="message">Message / special requirements</label>
                <textarea id="message" name="message" rows={5} value={formValues.message} onChange={handleFieldChange} />
              </div>

              <label className="checkbox-row">
                <input name="consent" type="checkbox" checked={formValues.consent} onChange={handleFieldChange} />
                <span>I agree to be contacted regarding this enquiry.</span>
              </label>
              {formErrors.consent ? <span className="error-text">{formErrors.consent}</span> : null}

              {formStatus.message ? (
                <div className={formStatus.type === 'success' ? 'status-banner success' : 'status-banner error'}>
                  {formStatus.message}
                </div>
              ) : null}

              <button type="submit" className="button button-primary submit-button">
                Send Enquiry
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <span className="brand-wordmark">{brand.name}</span>
            <p>{brand.tagline}</p>
          </div>

          <div>
            <h3>Quick links</h3>
            <ul>
              {navItems.map((item) => (
                <li key={item.href}>
                  <button type="button" onClick={() => scrollToSection(item.href)}>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3>Services</h3>
            <ul>
              {services.map((service) => (
                <li key={service.title}>{service.title}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3>Contact</h3>
            <ul className="footer-contact-list">
              {studioConfig.contactEmail ? <li><a href={`mailto:${studioConfig.contactEmail}`}>{studioConfig.contactEmail}</a></li> : null}
              {studioConfig.contactPhone ? <li><a href={`tel:${studioConfig.contactPhone}`}>{studioConfig.contactPhone}</a></li> : null}
              {contactDetails.address ? <li>{contactDetails.address}</li> : null}
            </ul>
          </div>
        </div>

        <div className="container footer-bottom">
          <div className="social-links">
            {studioConfig.instagramUrl ? (
              <a href={studioConfig.instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram">
                <span className="social-badge">IG</span>
              </a>
            ) : null}
            {studioConfig.youtubeUrl ? (
              <a href={studioConfig.youtubeUrl} target="_blank" rel="noreferrer" aria-label="YouTube">
                <span className="social-badge">YT</span>
              </a>
            ) : null}
          </div>
          <span>© {new Date().getFullYear()} {brand.name}. All rights reserved.</span>
          <button type="button" className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Back to top
          </button>
        </div>
      </footer>

      {lightboxOpen && currentLightboxItem ? (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={currentLightboxItem.title}>
          <button type="button" className="lightbox-close" onClick={() => setLightboxOpen(false)} aria-label="Close gallery">
            <X size={22} />
          </button>

          <button
            type="button"
            className="lightbox-arrow prev"
            onClick={() => setLightboxIndex((current) => (current - 1 + filteredGallery.length) % filteredGallery.length)}
            aria-label="Previous image"
          >
            <ChevronLeft size={22} />
          </button>

          <img src={currentLightboxItem.image} alt={currentLightboxItem.alt} />

          <button
            type="button"
            className="lightbox-arrow next"
            onClick={() => setLightboxIndex((current) => (current + 1) % filteredGallery.length)}
            aria-label="Next image"
          >
            <ChevronRight size={22} />
          </button>

          <div className="lightbox-caption">
            <small>{currentLightboxItem.category}</small>
            <strong>{currentLightboxItem.title}</strong>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default App
