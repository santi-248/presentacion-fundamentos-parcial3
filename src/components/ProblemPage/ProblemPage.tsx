import { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import HalfCircleAnim from '../HalfCircleAnim/HalfCircleAnim'
import './ProblemPage.css'

// ─── Types ──────────────────────────────────────────────────────────────────

export type TheoryItem = string

export interface ProblemPageProps {
  /** e.g. "01" */
  number: string
  /** e.g. "Álgebra Lineal" */
  subject: string
  /** Large editorial display title */
  title: ReactNode
  /** Compelling question that introduces the problem */
  question?: string
  /** Hero background color (used for the slab) */
  heroBackground?: string
  /** Accent color CSS variable string, e.g. "var(--accent-orange)" */
  accent?: string
  /** Items for the Theory sidebar panel */
  theoryItems: TheoryItem[]
  /** Approach section body */
  approach: ReactNode
  /** Resolution section body */
  resolution: ReactNode
}

// ─── Circle accent colors per accent ─────────────────────────────────────

function resolveCircleColor(accent: string): string {
  if (accent.includes('orange') || accent.includes('#E95D35')) return '#FF6B4A'
  if (accent.includes('blue')   || accent.includes('#59a7fb')) return '#6B7FFF'
  if (accent.includes('sage')   || accent.includes('#59c383')) return '#A8FF3E'
  if (accent.includes('yellow') || accent.includes('#F7B626')) return '#F5E642'
  if (accent.includes('pink')   || accent.includes('#e77290')) return '#FF2D78'
  return '#F5E642'
}

// ─── Framer variants ──────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0 },
}

const fadeLeft = {
  hidden: { opacity: 0, x: -24 },
  show:   { opacity: 1, x: 0 },
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function ProblemPage(props: ProblemPageProps) {
  const {
    title,
    question,
    accent = 'var(--accent-orange)',
    theoryItems,
    approach,
    resolution,
  } = props

  const containerRef = useRef<HTMLDivElement>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [totalSteps, setTotalSteps] = useState(1)

  // Navigation handlers
  const handleNext = useCallback(() => {
    setCurrentStep((prev) => {
      const slides = containerRef.current?.querySelectorAll('.pp-hero, .pp-approach, .pp-step') || []
      const next = Math.min(prev + 1, slides.length - 1)
      if (next !== prev) {
        setTimeout(() => {
          const nextEl = containerRef.current?.querySelectorAll('.pp-hero, .pp-approach, .pp-step')[next]
          if (nextEl) {
            nextEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }, 50)
      }
      return next
    })
  }, [])

  const handlePrev = useCallback(() => {
    setCurrentStep((prev) => {
      const next = Math.max(prev - 1, 0)
      if (next !== prev) {
        setTimeout(() => {
          const nextEl = containerRef.current?.querySelectorAll('.pp-hero, .pp-approach, .pp-step')[next]
          if (nextEl) {
            nextEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }, 50)
      }
      return next
    })
  }, [])

  // Keyboard and click bindings
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return
      if (e.key === ' ' || e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault()
        handleNext()
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault()
        handlePrev()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleNext, handlePrev])

  // Slide visibility logic using IntersectionObserver
  useEffect(() => {
    if (!containerRef.current) return
    const slides = Array.from(containerRef.current.querySelectorAll('.pp-hero, .pp-approach, .pp-step'))
    setTotalSteps(slides.length || 1)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('pp-active-slide')
            const index = slides.indexOf(entry.target)
            if (index !== -1) {
              setCurrentStep(index)
            }
          } else {
            entry.target.classList.remove('pp-active-slide')
          }
        })
      },
      {
        root: containerRef.current,
        threshold: 0.5,
      }
    )

    slides.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [resolution, approach])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const circleColor = resolveCircleColor(accent)
  const resolvedAccent = accent.startsWith('var(') ? circleColor : accent

  return (
    <div ref={containerRef} className="pp-root">

      {/* ══════════════════════════════════════════
          HERO — Swiss Editorial
          ══════════════════════════════════════════ */}
      <section className="pp-hero">

        {/* ── Dark left panel with unified HalfCircle grid animation ── */}
        <div className="pp-hero-dark">
          <HalfCircleAnim overrideAccentColor={resolvedAccent} />
        </div>

        {/* ── White right panel ── */}
        <div className="pp-hero-light">

          <div className="pp-hero-light-content">
            {question && (
              <motion.div
                className="pp-hero-light-question"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
              >
                <p className="pp-hero-question-label">Pregunta central</p>
                <p className="pp-hero-question">{question}</p>
              </motion.div>
            )}

            {/* Title */}
            <motion.div
              className="pp-hero-title-group"
              initial={{ opacity: 0, y: 48 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="pp-hero-title">{title}</h1>
            </motion.div>
          </div>

          {/* Theory pills — bottom of light panel */}
          <motion.div
            className="pp-hero-light-pills"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55, ease: 'easeOut' }}
          >
            {theoryItems.map((item, i) => {
              return (
                <motion.span
                  key={i}
                  className="pp-hero-pill"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.6 + i * 0.07 }}
                >
                  {item}
                </motion.span>
              )
            })}
          </motion.div>
        </div>

      </section>

      {/* ══════════════════════════════════════════
          APPROACH — Minimal Swiss Editorial Layout
          ══════════════════════════════════════════ */}
      {approach && (
        <section className="pp-approach">
          <div className="pp-approach-grid">

            <motion.div
              className="pp-approach-left"
              variants={fadeLeft}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.65 }}
            >
              <h2 className="pp-approach-heading-minimal">
                <span className="pp-approach-bullet">•</span> Estrategia de resolución
              </h2>
            </motion.div>

            <motion.div
              className="pp-approach-right"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.65, delay: 0.15 }}
            >
              <div className="pp-approach-body">
                {approach}
              </div>
            </motion.div>

          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════
          RESOLUTION — Full-screen step slides
          ══════════════════════════════════════════ */}
      <section className="pp-resolution">
        <div
          className="pp-steps"
          style={{ '--step-accent': resolvedAccent } as React.CSSProperties}
        >
          {resolution}
        </div>
      </section>


      <div className="pp-hud-counter">
        {String(currentStep + 1).padStart(2, '0')} / {String(totalSteps).padStart(2, '0')}
      </div>

    </div>
  )
}
