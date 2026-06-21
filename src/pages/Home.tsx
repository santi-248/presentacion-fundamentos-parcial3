import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import DotGrid from '../components/DotGrid/DotGrid'

const problems = [
  {
    number: '01',
    title: 'Visión General',
    description: 'Descripción integral del sistema, objetivos empresariales y alcance del proyecto de inventario.',
    path: '/problema/1',
    accent: 'var(--accent-orange)',
    tag: 'Introducción',
  },
  {
    number: '02',
    title: 'Alcances y Límites',
    description: 'Módulos centrales, funcionalidades cubiertas y limitaciones deliberadas del sistema.',
    path: '/problema/2',
    accent: 'var(--accent-pink)',
    tag: 'Scope',
  },
  {
    number: '03',
    title: 'Actores y Casos de Uso',
    description: 'Modelado UML de usuarios (Vendedor, Supervisor, Gerente) y 8 casos de uso críticos.',
    path: '/problema/3',
    accent: 'var(--accent-sage)',
    tag: 'UML',
  },
  {
    number: '04',
    title: 'Arquitectura del Sistema',
    description: 'Stack tecnológico (React/Python/PostgreSQL), diseño OOP con 10 clases centrales.',
    path: '/problema/4',
    accent: 'var(--accent-yellow)',
    tag: 'Arquitectura',
  },
  {
    number: '05',
    title: 'Pruebas e Implementación',
    description: 'Estrategia de testing unitario e integración, despliegue piloto en Sucursal 2.',
    path: '/problema/5',
    accent: 'var(--accent-blue)',
    tag: 'DevOps',
  },
]

export default function Home() {
  return (
    <div>
      {/* ── Hero Section ────────────────────────── */}
      <section
        style={{
          borderBottom: 'var(--border-mid)',
          background: 'var(--color-bg)',
          position: 'relative',
        }}
      >
        {/* ── Discrete Dark Rectangle (Animation Panel) ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{
            position: 'relative',
            width: '100%',
            height: 'clamp(320px, 52vh, 520px)',
            background: '#0B0B0B',
            overflow: 'hidden',
          }}
        >
          <DotGrid />

          {/* Aesthetic location/subject stamp, matching reference poster style */}
          <div
            style={{
              position: 'absolute',
              top: '2.5rem',
              left: 'clamp(1rem, 4vw, 4rem)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
              fontWeight: 500,
              letterSpacing: '0.1em',
              color: 'rgba(255, 255, 255, 0.4)',
              userSelect: 'none',
            }}
          >
            PARCIAL MÓDULO 3
          </div>
        </motion.div>

        {/* ── Content Grid below dark rectangle ── */}
        <div className="editorial-container" style={{ paddingBlock: '4rem 3.5rem' }}>
          <div
            className="editorial-grid"
            style={{
              alignItems: 'start',
            }}
          >
            {/* Left Column: Massive Bold Swiss Title */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="col-8"
            >
              <h1
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 800,
                  fontSize: 'clamp(2rem, 5.8vw, 6.2rem)',
                  lineHeight: 0.9,
                  color: 'var(--color-ink)',
                  letterSpacing: '-0.04em',
                  margin: 0,
                }}
              >
                FARO - Control de Inventario y Proyección
              </h1>
            </motion.div>

            {/* Right Column: Red Accent Dot & Project Intro Paragraph */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="col-4"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                paddingTop: '0.5rem',
              }}
            >
              {/* Seal red dot */}
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: 'var(--accent-orange)',
                  marginBottom: '1.5rem',
                }}
              />

              {/* Pitch copy */}
              <p
                style={{
                  fontSize: '0.875rem',
                  lineHeight: 1.6,
                  color: 'var(--color-muted)',
                  margin: 0,
                  maxWidth: '38ch',
                }}
              >
                Sistema integral para registrar ventas, gestionar inventario y visualizar métricas críticas del negocio. Incluye motor de predicciones de stock y simulador de escenarios empresariales para la toma de decisiones estratégica.
              </p>

              <div style={{ width: '100%' }}>
                <div
                  style={{
                    width: '100%',
                    height: '1px',
                    background: 'var(--color-ink)',
                    opacity: 0.12,
                    marginTop: '3.5rem',
                    marginBottom: '1rem',
                  }}
                />
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    width: '100%',
                  }}
                >
                  <button
                    onClick={() => {
                      document.getElementById('problems-list')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="nav-link"
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      textDecoration: 'none',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    Comenzar exploración
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <style>{`
        @media (max-width: 768px) {
          .mobile-text-left {
            text-align: left !important;
          }
          .mobile-mt-8 {
            margin-top: 3rem !important;
          }
        }
      `}</style>

      <section id="problems-list" style={{ paddingBlock: '0 2rem' }}>
        <div className="editorial-container">
          {problems.map((p, i) => (
            <motion.div
              key={p.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <Link to={p.path} style={{ textDecoration: 'none', display: 'block' }}>
                <div
                  className="problem-row"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '7rem 1fr auto',
                    alignItems: 'start',
                    gap: '2.5rem',
                    padding: '3.5rem 0',
                    borderBottom: '1px solid rgba(17,17,17,0.1)',
                    transition: 'background 300ms var(--ease-editorial)',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(17,17,17,0.018)'
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = 'transparent'
                  }}
                >
                  {/* Left — italic slash number */}
                  <div style={{ paddingTop: '0.6rem' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontStyle: 'italic',
                        fontWeight: 400,
                        fontSize: '0.95rem',
                        color: 'var(--color-muted)',
                        letterSpacing: '0.02em',
                      }}
                    >
                      /{p.number}
                    </span>
                  </div>

                  {/* Center — large multi-line title */}
                  <div>
                    <h2
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontWeight: 800,
                        fontSize: 'clamp(2rem, 4.5vw, 4.5rem)',
                        lineHeight: 0.95,
                        color: 'var(--color-ink)',
                        letterSpacing: '-0.03em',
                        margin: 0,
                      }}
                    >
                      {p.title}
                    </h2>
                  </div>

                  {/* Right — accent dot + tag + description + CTA */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                      maxWidth: '22ch',
                      paddingTop: '0.5rem',
                    }}
                  >
                    {/* Accent dot + category tag */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          background: p.accent,
                          flexShrink: 0,
                        }}
                      />
                      <span
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.6875rem',
                          fontWeight: 600,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          color: p.accent,
                        }}
                      >
                        {p.tag}
                      </span>
                    </div>

                    {/* Short description */}
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.78rem',
                        lineHeight: 1.55,
                        color: 'var(--color-muted)',
                        margin: 0,
                      }}
                    >
                      {p.description}
                    </p>

                    {/* VER ——— PROBLEMA */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginTop: '0.5rem',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.6875rem',
                          fontWeight: 600,
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          color: 'var(--color-ink)',
                        }}
                      >
                        VER
                      </span>
                      <div
                        style={{
                          flex: 1,
                          height: '1px',
                          background: 'var(--color-ink)',
                          minWidth: '2rem',
                        }}
                      />
                      <span
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.6875rem',
                          fontWeight: 600,
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          color: 'var(--color-ink)',
                        }}
                      >
                        SECCIÓN
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
