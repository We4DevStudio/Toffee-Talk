import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// WhatsApp SVG logo — official brand green, no external dependency
const WhatsAppIcon = () => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    aria-hidden="true"
  >
    <path
      d="M16 1C7.716 1 1 7.716 1 16c0 2.628.672 5.1 1.852 7.252L1 31l7.952-1.828A14.938 14.938 0 0016 31c8.284 0 15-6.716 15-15S24.284 1 16 1z"
      fill="#25D366"
    />
    <path
      d="M23.07 19.64c-.358-.18-2.116-1.044-2.444-1.163-.328-.12-.567-.18-.806.179-.238.358-.923 1.163-1.132 1.402-.209.24-.418.269-.776.09-.358-.18-1.51-.556-2.876-1.775-1.063-.95-1.78-2.122-1.989-2.48-.208-.359-.022-.553.157-.732.161-.16.358-.418.537-.627.18-.21.24-.359.359-.597.12-.24.06-.448-.03-.627-.09-.18-.806-1.942-1.104-2.659-.29-.698-.585-.603-.806-.614-.208-.01-.447-.012-.686-.012-.239 0-.627.09-.955.448-.328.359-1.253 1.224-1.253 2.986 0 1.762 1.283 3.464 1.462 3.703.18.239 2.525 3.853 6.117 5.403.855.369 1.522.59 2.042.755.858.273 1.639.234 2.256.142.688-.102 2.116-.865 2.414-1.701.299-.836.299-1.553.21-1.702-.089-.149-.328-.239-.686-.418z"
      fill="white"
    />
  </svg>
)

export const FloatingWhatsApp = () => {
  const [visible, setVisible] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  // Show button after user scrolls 300px — don't distract on first load
  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const waUrl = "https://wa.me/917022711397?text=Hi%20Toffee%20And%20Talk!%20I%27d%20like%20to%20know%20more."

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="fixed bottom-6 right-4 sm:bottom-6 sm:right-6 z-[9990] flex items-center gap-3"
        >
          {/* Tooltip — shows on hover */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="bg-[#1A100A] text-[#F5EFE6] text-sm font-body px-4 py-2.5 rounded-xl shadow-xl border border-[rgba(200,149,90,0.2)] whitespace-nowrap"
              >
                <span className="font-semibold text-[#E8B86D]">Chat with us</span>
                <br />
                <span className="text-xs text-[#9A8070]">Usually replies in minutes</span>
                {/* Arrow pointing right */}
                <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-b-[6px] border-l-[6px] border-t-transparent border-b-transparent border-l-[#1A100A]" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main button */}
          <motion.a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with Toffee And Talk on WhatsApp"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-2xl cursor-pointer"
            style={{ background: '#25D366' }}
          >
            <WhatsAppIcon />

            {/* Pulse ring animation */}
            <span
              className="absolute inset-0 rounded-full animate-ping"
              style={{ background: '#25D366', opacity: 0.3 }}
            />
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
