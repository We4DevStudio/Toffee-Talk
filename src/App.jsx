import React, { useMemo } from 'react'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Lenis from 'lenis'
import { Menu as MenuIcon, X, MapPin, Clock, Phone, Instagram, Star } from 'lucide-react'
import { SiSwiggy, SiZomato } from 'react-icons/si'
import { TypeAnimation } from 'react-type-animation'
import { FloatingWhatsApp } from './components/FloatingWhatsApp'
import { StarRating } from './components/StarRating'

const useSectionInView = () => {
  const ref = React.useRef(null)
  const inView = useInView(ref, { once: true, margin: '-120px 0px -120px 0px' })
  return [ref, inView]
}

const Section = ({ id, children, className = '' }) => {
  const [ref, inView] = useSectionInView()
  return (
    <motion.section
      id={id}
      ref={ref}
      className={`section-reveal ${inView ? 'in-view' : ''} ${className}`}
    >
      {children}
    </motion.section>
  )
}

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'menu', label: 'Menu' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'location', label: 'Location' },
  { id: 'contact', label: 'Contact' }
]

const Navbar = () => {
  const [open, setOpen] = React.useState(false)

  const handleNav = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setOpen(false)
  }

  React.useEffect(() => {
    const onScroll = () => {
      const nav = document.querySelector('nav')
      if (!nav) return
      if (window.scrollY > 80) {
        nav.classList.add('backdrop-blur-md', 'shadow-lg', 'bg-[rgba(59,42,38,0.97)]')
      } else {
        nav.classList.remove('shadow-lg', 'bg-[rgba(59,42,38,0.97)]')
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-[rgba(59,42,38,0.9)] text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <div className="font-script text-2xl tracking-wide">Toffee And Talk</div>
        <div className="hidden gap-8 md:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNav(item.id)}
              className="text-sm font-medium text-[rgb(var(--color-bg))] transition hover:text-[rgb(var(--color-accent))]"
            >
              {item.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          aria-label="Toggle navigation"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/30 md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} className="text-white" /> : <MenuIcon size={20} className="text-white" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-white/10 bg-[rgba(59,42,38,0.98)] md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-4 py-3 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNav(item.id)}
                className="w-full rounded-full px-3 py-2 text-left text-sm font-medium text-[rgb(var(--color-bg))] hover:bg-white/10"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

const Hero = () => {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 1000], [0, 400])

  return (
    <Section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black"
    >
      <motion.div 
        style={{ y }}
        className="absolute inset-[top:-100px_bottom:-100px] h-[120%] w-full bg-[url('/images/2025-12-26.webp')] bg-cover bg-center" 
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-4 text-center text-[rgb(var(--color-bg))]">
        <p className="mb-3 font-semibold uppercase tracking-[0.2em] text-[rgba(248,245,242,0.7)]">
          Jayanagar · Bengaluru
        </p>
        <h1 className="font-display text-4xl leading-tight sm:text-5xl md:text-6xl min-h-[120px] sm:min-h-[100px] md:min-h-[80px] flex items-center justify-center">
          <TypeAnimation
            sequence={[
              'Coffee, Conversations & Cozy Moments',
              1000,
            ]}
            wrapper="span"
            speed={50}
            cursor={true}
          />
        </h1>
        <p className="mt-5 max-w-2xl text-sm text-[rgba(248,245,242,0.85)] sm:text-base">
          A slow, warm café for handwritten notes, honest catch‑ups, and that first sip of coffee that
          quiets the city outside.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href="#location"
            className="rounded-full bg-[rgb(var(--color-accent))] px-6 py-3 text-sm font-semibold text-[rgb(var(--color-bg))] shadow-card transition hover:bg-[rgb(var(--color-accent-soft))]"
          >
            Plan Your Visit
          </a>
          <a
            href="#menu"
            className="rounded-full border border-[rgba(248,245,242,0.5)] px-6 py-3 text-sm font-semibold text-[rgba(248,245,242,0.9)] backdrop-blur-md hover:bg-white/10"
          >
            Explore the Menu
          </a>
        </div>
      </div>
    </Section>
  )
}

const LoadingScreen = ({ onComplete }) => (
  <motion.div
    initial={{ opacity: 1 }}
    animate={{ opacity: 0 }}
    transition={{ duration: 0.5, delay: 1.5 }}
    onAnimationComplete={onComplete}
    className="fixed inset-0 z-[10000] flex items-center justify-center bg-[rgb(var(--color-bg))] text-[rgb(var(--color-accent))]"
  >
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="font-script text-5xl tracking-wide max-w-[90vw] text-center"
    >
      Toffee And Talk
    </motion.div>
  </motion.div>
)

const About = () => (
  <Section id="about" className="bg-[rgb(var(--color-bg))] py-20">
    <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[rgb(var(--color-text-soft))]">
          About the café
        </p>
        <h2 className="mt-3 font-display text-3xl text-[rgb(var(--color-text))] sm:text-4xl">
          A living room for Jayanagar
        </h2>
        <p className="mt-4 text-sm text-[rgb(var(--color-text-soft))] sm:text-base">
          Toffee And Talk is more than just a café. It’s a slow corner of Jayanagar where morning
          sunlight, worn‑in wooden tables, and the scent of freshly ground beans set the pace for
          your day.
        </p>
        <p className="mt-3 text-sm text-[rgb(var(--color-text-soft))] sm:text-base">
          We pour attention into every cup, pair it with desserts that feel like a treat
          <span className="whitespace-nowrap"> (never rushed)</span>, and keep the music just low
          enough so conversations can do the rest.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 text-xs text-[rgb(var(--color-text-soft))]">
          <span className="rounded-full bg-[rgb(var(--color-bg-soft))] px-4 py-2">
            Specialty coffee &amp; playful signatures
          </span>
          <span className="rounded-full bg-[rgb(var(--color-bg-soft))] px-4 py-2">
            Brunch plates &amp; slow desserts
          </span>
        </div>
      </div>
      <div className="relative">
        <div className="overflow-hidden rounded-3xl shadow-card">
          <img
            src="/images/2026-03-09 (2).webp"
            alt="Warm café interior at Toffee And Talk"
            className="h-full w-full object-cover transition duration-700 hover:scale-105"
          />
        </div>
      </div>
    </div>
  </Section>
)

const menuData = [
  {
    id: 'viet-iced',
    name: 'Vietnamese Iced Coffee',
    price: '₹220',
    rating: 4.8,
    category: 'coffee',
    image:
      'https://www.zulaykitchen.com/cdn/shop/articles/How_to_Authentic_Vietnamese_Iced_Coffee_Ca_Phe_S_a_Da_93df60f4-a9ff-4959-ac8b-542dcb32cffa.jpg?v=1749504398&width=2048',
    description:
      'Slow‑brewed coffee over ice with silky condensed milk. Bold, sweet and a little addictive.'
  },
  {
    id: 'popcorn-latte',
    name: 'Popcorn Latte',
    price: '₹240',
    rating: 4.7,
    category: 'coffee',
    image:
      'https://thumbs.dreamstime.com/b/caramel-popcorn-latte-close-up-topped-drizzle-whipped-cream-served-glass-wooden-table-scattered-kernels-coffee-324666619.jpg',
    description: 'Buttery caramel popcorn notes folded into a velvety latte, finished with crunch.'
  },
  {
    id: 'brew',
    name: 'Freshly Brewed Coffee',
    price: '₹180',
    rating: 4.9,
    category: 'coffee',
    image:
      'https://images.stockcake.com/public/4/2/3/4238bdaf-b9e7-4907-9be4-148e9df85b85_large/steamy-coffee-aroma-stockcake.jpg',
    description: 'Single‑origin beans, medium roasted to highlight chocolate and nutty notes.'
  },
  {
    id: 'lava',
    name: 'Chocolate Lava Cake',
    price: '₹260',
    rating: 4.9,
    category: 'dessert',
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=300&h=200&fit=crop',
    description:
      'Warm, fudgy center with vanilla ice cream and a slow drizzle of chocolate on top.'
  },
  {
    id: 'avo-toast',
    name: 'Avocado Toast Deluxe',
    price: '₹320',
    rating: 4.6,
    category: 'bites',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&h=200&fit=crop',
    description:
      'Multigrain toast with buttery avocado, poached eggs, seeds and fresh garden herbs.'
  },
  {
    id: 'cappuccino',
    name: 'Artisan Cappuccino',
    price: '₹210',
    rating: 4.8,
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=200&fit=crop',
    description: 'Classic 1:1:1 cappuccino with microfoam and slow, intentional latte art.'
  }
]

const filterTabs = [
  { id: 'all', label: 'All' },
  { id: 'coffee', label: 'Coffee' },
  { id: 'bites', label: 'Bites & Brunch' },
  { id: 'dessert', label: 'Desserts' }
]

const Menu = () => {
  const [active, setActive] = React.useState('all')

  const filtered = useMemo(
    () => (active === 'all' ? menuData : menuData.filter((m) => m.category === active)),
    [active]
  )

  return (
    <Section id="menu" className="bg-[rgb(var(--color-bg))] py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[rgb(var(--color-text-soft))]">
            Menu
          </p>
          <h2 className="mt-3 font-display text-3xl text-[rgb(var(--color-text))] sm:text-4xl">
            Signature drinks &amp; slow bites
          </h2>
          <p className="mt-3 text-sm text-[rgb(var(--color-text-soft))] sm:text-base">
            A short list of what regulars keep coming back for. The full menu is waiting at the bar.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActive(tab.id)}
              className={`rounded-full border px-4 py-2 text-xs font-medium transition ${
                active === tab.id
                  ? 'border-[rgb(var(--color-accent-soft))] bg-[rgb(var(--color-accent))] text-[rgb(var(--color-bg))]'
                  : 'border-[rgba(0,0,0,0.06)] bg-[rgb(var(--color-card))] text-[rgb(var(--color-text-soft))] hover:border-[rgb(var(--color-accent))]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <motion.article
              key={item.id}
              layout
              className="flex flex-col overflow-hidden rounded-3xl bg-[rgb(var(--color-card))] shadow-card"
            >
              <div className="h-44 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition duration-700 hover:scale-110"
                />
              </div>
              <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-lg text-[rgb(var(--color-text))]">
                    {item.name}
                  </h3>
                </div>
                <p className="mt-2 text-xs text-[rgb(var(--color-text-soft))] sm:text-sm">
                  {item.description}
                </p>
                <div className="mt-4 flex items-center justify-between text-xs text-[rgb(var(--color-text-soft))]">
                  <span className="inline-flex items-center gap-1.5">
                    <Star size={14} className="text-[rgb(var(--color-accent))]" fill="currentColor" strokeWidth={0} />
                    {item.rating.toFixed(1)}
                  </span>
                  <span className="rounded-full bg-[rgb(var(--color-bg-soft))] px-3 py-1 text-[0.7rem] uppercase tracking-wide">
                    {item.category === 'coffee'
                      ? 'coffee bar'
                      : item.category === 'bites'
                      ? 'brunch'
                      : 'dessert'}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a
            href="https://dinein.petpooja.com/qr/o9cf7xbv23/C3"
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-[rgb(var(--color-accent))] px-6 py-3 text-sm font-semibold text-[rgb(var(--color-bg))] shadow-card transition hover:bg-[rgb(var(--color-accent-soft))]"
          >
            View full menu
          </a>
          <a
            href="tel:07022711397"
            className="rounded-full border border-[rgba(0,0,0,0.12)] px-6 py-3 text-sm font-semibold text-[rgb(var(--color-text))] hover:border-[rgb(var(--color-accent))]"
          >
            Call to order
          </a>
        </div>
      </div>
    </Section>
  )
}

const galleryImages = [
  '/images/unnamed.webp',
  '/images/unnamed (2).webp',
  '/images/unnamed (3).webp',
  '/images/unnamed (4).webp',
  '/images/unnamed (5).webp',
  '/images/unnamed (7).webp',
]

const Atmosphere = () => (
  <Section id="gallery" className="bg-[rgb(var(--color-bg))] py-20 border-t border-[rgba(0,0,0,0.06)]">
    <div className="mx-auto max-w-6xl px-4">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[rgb(var(--color-text-soft))]">
          The Space
        </p>
        <h2 className="mt-3 font-display text-3xl text-[rgb(var(--color-text))] sm:text-4xl">
          Cozy corners & warm light
        </h2>
        <p className="mt-3 mx-auto max-w-2xl text-sm text-[rgb(var(--color-text-soft))] sm:text-base">
          A glimpse into the café. Designed for slow sipping, deep conversations, and finding your new favorite spot in Jayanagar.
        </p>
      </div>
      <div className="mt-12 columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {galleryImages.map((src, idx) => (
          <div key={idx} className="break-inside-avoid overflow-hidden rounded-3xl shadow-card hover:shadow-lg transition-shadow bg-[rgb(var(--color-card))]">
            <img 
              src={src} 
              alt={`Toffee And Talk café atmosphere ${idx + 1}`} 
              className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105" 
              loading="lazy" 
            />
          </div>
        ))}
      </div>
    </div>
  </Section>
)

const ReviewCard = ({ review }) => (
  <article className="rounded-3xl bg-white/5 p-6 backdrop-blur-md">
    <div className="mb-3">
      <StarRating rating={review.rating} size={16} />
    </div>
    <p className="text-sm italic text-[rgba(248,245,242,0.9)]">“{review.text}”</p>
    <div className="mt-4 flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgb(var(--color-accent))] text-xs font-semibold text-[rgb(var(--color-bg))]">
        {review.initials}
      </div>
      <div>
        <p className="text-sm font-semibold text-[rgb(var(--color-bg))]">{review.name}</p>
        <p className="text-xs text-[rgba(248,245,242,0.7)]">{review.meta}</p>
      </div>
    </div>
  </article>
)

const reviewsData = [
  {
    name: 'Vishwa Shah',
    initials: 'VS',
    meta: 'Local Guide · 33 reviews',
    rating: 5,
    text:
      "Such a cute, aesthetic little café. The space feels cozy without trying too hard, and the food honestly surprised me in a good way. Smoker Latte, avocado toast and pancakes were all comfort on a plate."
  },
  {
    name: 'kashyap C',
    initials: 'KC',
    meta: 'Local Guide · 242 reviews',
    rating: 5,
    text:
      'Calm ambience, warm lighting and a playlist that just works. Pink Roast coffee is unique and the Loaded Nachos are the kind of snack you end up reordering.'
  },
  {
    name: 'Neha Nayak',
    initials: 'NN',
    meta: 'Local Guide · 27 reviews',
    rating: 4.0,
    text:
      'Great to work from, or just linger with friends. Staff is thoughtful and transparent, and the hot chocolate with marshmallow was spot on.'
  }
]

const Reviews = () => (
  <Section
    id="reviews"
    className="bg-[url('/images/2025-12-29.webp')] bg-cover bg-center py-20 text-[rgb(var(--color-bg))]"
  >
    <div className="bg-gradient-to-b from-black/80 via-black/78 to-black/85">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[rgba(248,245,242,0.7)]">
            Voices from the café
          </p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl">
            Loved by coffee people
          </h2>
          <p className="mt-3 text-sm text-[rgba(248,245,242,0.78)] sm:text-base">
            Honest reviews from guests who found a new “regular” spot.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {reviewsData.map((r) => (
            <ReviewCard key={r.name} review={r} />
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center gap-4 text-sm text-[rgba(248,245,242,0.85)]">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-semibold">4.6</span>
            <span className="text-sm text-[rgba(248,245,242,0.7)]">/ 5</span>
          </div>
          <div>
            <StarRating rating={4.6} size={24} />
          </div>
          <span className="text-xs text-[rgba(248,245,242,0.7)]">Based on 422+ reviews</span>
        </div>

        <div className="mt-6 text-center">
          <a
            href="https://share.google/DdmOwdQEkyrNpoHaT"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[rgba(248,245,242,0.6)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[rgba(248,245,242,0.9)] hover:bg-white/10"
          >
            <span>Read more on Google</span>
          </a>
        </div>
      </div>
    </div>
  </Section>
)

const Location = () => (
  <Section id="location" className="bg-[rgb(var(--color-bg))] py-20">
    <div className="mx-auto max-w-6xl px-4">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[rgb(var(--color-text-soft))]">
          Find us
        </p>
        <h2 className="mt-3 font-display text-3xl text-[rgb(var(--color-text))] sm:text-4xl">
          A corner of Jayanagar
        </h2>
      </div>
      <div className="mt-10 grid gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <div className="flex flex-col gap-5">
          <div className="flex gap-3 rounded-2xl bg-[rgb(var(--color-card))] p-4 shadow-card">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgb(var(--color-accent))] text-[rgb(var(--color-bg))]">
              <MapPin size={22} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[rgb(var(--color-text))]">Address</h3>
              <a href="https://maps.app.goo.gl/oHDvjkYyRiJC1WSc7" target="_blank" rel="noreferrer" className="mt-1 block text-sm text-[rgb(var(--color-text-soft))] hover:text-[rgb(var(--color-accent))] transition-colors">
                36th Cross, 20th Main Rd
                <br />
                Jayanagar
                <br />
                Bengaluru, Karnataka 560041
              </a>
            </div>
          </div>
          <div className="flex gap-3 rounded-2xl bg-[rgb(var(--color-card))] p-4 shadow-card">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgb(var(--color-accent))] text-[rgb(var(--color-bg))]">
              <Clock size={22} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[rgb(var(--color-text))]">Hours</h3>
              <p className="mt-1 text-sm text-[rgb(var(--color-text-soft))]">
                10:00 AM – 10:00 PM
                <br />
                Open every day
              </p>
            </div>
          </div>
          <div className="flex gap-3 rounded-2xl bg-[rgb(var(--color-card))] p-4 shadow-card">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgb(var(--color-accent))] text-[rgb(var(--color-bg))]">
              <Phone size={22} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[rgb(var(--color-text))]">Contact</h3>
              <a href="tel:07022711397" className="mt-1 block text-sm text-[rgb(var(--color-text-soft))] hover:text-[rgb(var(--color-accent))] transition-colors">070227 11397</a>
            </div>
          </div>
          <div className="mt-2 flex flex-wrap gap-3">
            <a
              href="https://maps.app.goo.gl/oHDvjkYyRiJC1WSc7"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-[rgb(var(--color-accent))] px-5 py-2.5 text-xs font-semibold text-[rgb(var(--color-bg))] shadow-card hover:bg-[rgb(var(--color-accent-soft))]"
            >
              Open in Google Maps
            </a>
            <a
              href="tel:07022711397"
              className="rounded-full border border-[rgba(0,0,0,0.12)] px-5 py-2.5 text-xs font-semibold text-[rgb(var(--color-text))] hover:border-[rgb(var(--color-accent))]"
            >
              Call the café
            </a>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl bg-[rgb(var(--color-card))] shadow-card">
          <iframe
            src="https://www.google.com/maps?q=36th+Cross,+20th+Main+Rd,+Jayanagar,+Bengaluru,+Karnataka+560041&output=embed"
            width="100%"
            height="360"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            title="Toffee And Talk location"
          ></iframe>
        </div>
      </div>
    </div>
  </Section>
)

const CTA = () => (
  <Section
    id="contact"
    className="relative bg-[url('/images/2026-03-09.webp')] bg-cover bg-center py-20 text-[rgb(var(--color-bg))]"
  >
    <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/75 to-black/85" />
    <div className="relative mx-auto max-w-4xl px-4 text-center">
      <h2 className="font-display text-3xl sm:text-4xl">
        Drop by for coffee &amp; conversations
      </h2>
      <p className="mt-3 text-sm text-[rgba(248,245,242,0.85)] sm:text-base">
        Whether it&apos;s a quiet morning with a book, a quick catch‑up, or a late dessert run,
        there&apos;s always a corner waiting for you.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <a href="tel:07022711397" className="rounded-full bg-[rgb(var(--color-accent))] px-6 py-3 text-sm font-semibold text-[rgb(var(--color-bg))] shadow-card hover:bg-[rgb(var(--color-accent-soft))]">
          Call the café
        </a>
        <a
          href="https://dinein.petpooja.com/qr/o9cf7xbv23/C3"
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-[rgba(248,245,242,0.6)] px-6 py-3 text-sm font-semibold text-[rgba(248,245,242,0.9)] hover:bg-white/10"
        >
          Reserve a table
        </a>
      </div>
      <div className="mt-4 flex flex-wrap justify-center gap-3 text-xs text-[rgba(248,245,242,0.85)]">
        <span className="rounded-full bg-white/5 px-4 py-1.5">Work‑from‑café friendly</span>
        <span className="rounded-full bg-white/5 px-4 py-1.5">Outdoor seating on request</span>
      </div>
    </div>
  </Section>
)

const Footer = () => (
  <footer className="bg-[rgb(var(--color-bg-soft))] border-t border-[rgba(0,0,0,0.06)]">
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-8 md:grid-cols-4">
        <div>
          <div className="font-script text-2xl text-[rgb(var(--color-accent-soft))]">
            Toffee And Talk
          </div>
          <p className="mt-2 text-xs text-[rgb(var(--color-text-soft))]">
            Where coffee slows down and conversations linger a little longer than planned.
          </p>
          <div className="mt-3 flex gap-2">
            <a
              href="https://www.instagram.com/toffeeandtalk/"
              target="_blank"
              rel="noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[rgb(var(--color-accent))] text-[rgb(var(--color-bg))]"
            >
              <Instagram size={18} />
            </a>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-[rgb(var(--color-text))]">Visit us</h4>
          <a href="https://maps.app.goo.gl/oHDvjkYyRiJC1WSc7" target="_blank" rel="noreferrer" className="mt-2 block text-xs text-[rgb(var(--color-text-soft))] hover:text-[rgb(var(--color-accent))] transition-colors">
            36th Cross, 20th Main Rd
            <br />
            Jayanagar
            <br />
            Bengaluru, Karnataka 560041
          </a>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-[rgb(var(--color-text))]">Order online</h4>
          <div className="mt-2 flex flex-col gap-2 text-xs text-[rgb(var(--color-text-soft))]">
            <a
              href="https://www.zomato.com/bangalore/toffee-talk-jayanagar-bangalore"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 hover:text-[rgb(var(--color-accent-soft))]"
            >
              <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-[#CB202D] text-[rgb(var(--color-bg))]">
                <SiZomato size={14} />
              </span>
              <span>Order on Zomato</span>
            </a>
            <a
              href="https://www.swiggy.com/city/bangalore/toffee-and-talk-coffee-jayanagar-rest1162193"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 hover:text-[rgb(var(--color-accent-soft))]"
            >
              <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-[#FC8019] text-[rgb(var(--color-bg))]">
                <SiSwiggy size={14} />
              </span>
              <span>Order on Swiggy</span>
            </a>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-[rgb(var(--color-text))]">Contact</h4>
          <div className="mt-2 flex flex-col gap-1 text-xs text-[rgb(var(--color-text-soft))]">
            <p>
              Phone:{' '}
              <a href="tel:07022711397" className="hover:text-[rgb(var(--color-accent))] transition-colors">
                070227 11397
              </a>
            </p>
            <p>
              Email:{' '}
              <a href="mailto:info@toffeeandtalk.com" className="hover:text-[rgb(var(--color-accent))] transition-colors">
                info@toffeeandtalk.com
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t border-[rgba(0,0,0,0.06)] pt-4 text-center text-[0.75rem] text-[rgb(var(--color-text-soft))]">
        <p>© 2024 Toffee And Talk. All rights reserved.</p>
        <p className="mt-1">
          Designed and developed by{' '}
          <a
            href="https://dev-studio-theta.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-[rgb(var(--color-text))] hover:text-[rgb(var(--color-accent))] transition-colors"
          >
            WE4DEVSTUDIO
          </a>
        </p>
      </div>
    </div>
  </footer>
)

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    // Prevent scrolling while loading
    if (isLoading) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      document.body.style.overflow = ''
    }
  }, [isLoading])

  return (
    <div className="bg-[rgb(var(--color-bg))] text-[rgb(var(--color-text))]">
      <AnimatePresence>
        {isLoading && (
          <motion.div exit={{ opacity: 0 }}>
            <LoadingScreen onComplete={() => setIsLoading(false)} />
          </motion.div>
        )}
      </AnimatePresence>
      <FloatingWhatsApp />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Menu />
        <Atmosphere />
        <Reviews />
        <Location />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}

