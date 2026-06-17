import { useState, useEffect, useRef, useCallback } from 'react'
import ProblemPage from '../components/ProblemPage/ProblemPage'

const ACCENT = 'var(--accent-blue)'
const ACCENT_HEX = '#59a7fb'

// ─── Keyframe CSS ──────────────────────────────────────────────────────────────

const KEYFRAMES = `
  @keyframes fadeSlideUp    { from { opacity:0; transform:translateY(14px);  } to { opacity:1; transform:translateY(0);  } }
  @keyframes fadeSlideRight { from { opacity:0; transform:translateX(-14px); } to { opacity:1; transform:translateX(0);  } }
  @keyframes drawArc        { from { stroke-dashoffset:400; } to { stroke-dashoffset:0; } }
  @keyframes popIn          { from { transform:scale(0.6); opacity:0; } to { transform:scale(1); opacity:1; } }
  @keyframes pulseGlow      { 0%,100%{opacity:0.5} 50%{opacity:1} }
  @keyframes spinDot        { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

  .fsu-1 { opacity:0; animation:fadeSlideUp    0.7s ease forwards 0.15s; }
  .fsu-2 { opacity:0; animation:fadeSlideUp    0.7s ease forwards 0.4s;  }
  .fsu-3 { opacity:0; animation:fadeSlideUp    0.7s ease forwards 0.65s; }
  .fsu-4 { opacity:0; animation:fadeSlideUp    0.7s ease forwards 0.9s;  }
  .fsr-1 { opacity:0; animation:fadeSlideRight 0.7s ease forwards 0.2s;  }
  .fsr-2 { opacity:0; animation:fadeSlideRight 0.7s ease forwards 0.5s;  }
  .pop-1 { opacity:0; animation:popIn 0.5s cubic-bezier(.175,.885,.32,1.275) forwards 0.3s; }
  .pop-2 { opacity:0; animation:popIn 0.5s cubic-bezier(.175,.885,.32,1.275) forwards 0.6s; }
  .pop-3 { opacity:0; animation:popIn 0.5s cubic-bezier(.175,.885,.32,1.275) forwards 0.9s; }
  .dl-1  { stroke-dasharray:400; stroke-dashoffset:400; animation:drawArc 1.2s ease forwards 0.3s; }
  .dl-2  { stroke-dasharray:400; stroke-dashoffset:400; animation:drawArc 1.2s ease forwards 0.6s; }
  .pg    { animation:pulseGlow 2.4s ease-in-out infinite; }
`

// ─── STEP 1 — Euler Formula & Modular System ──────────────────────────────────

function EulerViz() {
  return (
    <svg
      viewBox="0 0 800 380"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <style>{KEYFRAMES}</style>
      </defs>

      {/* Axes */}
      <line x1={120} y1={190} x2={480} y2={190} stroke="#2a2a2a" strokeWidth="1" />
      <line x1={300} y1={60} x2={300} y2={320} stroke="#2a2a2a" strokeWidth="1" />
      <text x={458} y={204} fill="#444" fontSize="10" fontFamily="Inter,sans-serif">Re</text>
      <text x={286} y={56} fill="#444" fontSize="10" fontFamily="Inter,sans-serif">Im</text>

      {/* Unit circle */}
      <circle cx={300} cy={190} r={110} fill="none"
        stroke="#2d3a4a" strokeWidth="1" strokeDasharray="5 4" />
      <text x={300} y={310} fill="#333" fontSize="9" textAnchor="middle" fontFamily="Inter,sans-serif">r = 1</text>

      {/* Rotating radius arm (at t = π/3 for visual) */}
      <line className="dl-1" x1={300} y1={190} x2={355} y2={95}
        stroke={ACCENT_HEX} strokeWidth="1.5" />
      <circle className="pop-2" cx={355} cy={95} r={5} fill={ACCENT_HEX} />

      {/* Projection lines */}
      <line className="dl-2"
        x1={355} y1={95} x2={355} y2={190}
        stroke="#fff" strokeWidth="0.8" strokeDasharray="3 3" strokeOpacity="0.25" />
      <line className="dl-2"
        x1={355} y1={95} x2={300} y2={95}
        stroke="#fff" strokeWidth="0.8" strokeDasharray="3 3" strokeOpacity="0.25" />

      {/* cos/sin labels */}
      <text className="fsu-3" x={328} y={205} fill="#aaa" fontSize="10" fontFamily="Inter,sans-serif">cos(t)</text>
      <text className="fsu-3" x={358} y={145} fill="#aaa" fontSize="10" fontFamily="Inter,sans-serif">sin(t)</text>

      {/* Origin dot */}
      <circle cx={300} cy={190} r={3} fill="#555" />
      <text x={307} y={202} fill="#555" fontSize="10" fontFamily="Inter,sans-serif">O</text>

      {/* Formulas panel on the right */}
      <g className="fsr-1">
        <line x1={530} y1={90} x2={530} y2={160} stroke={ACCENT_HEX} strokeWidth="2.5" />
        <text x={548} y={106} fill={ACCENT_HEX} fontSize="8.5" fontWeight="800" letterSpacing="0.16em" fontFamily="Inter,sans-serif">FÓRMULA DE EULER</text>
        <text x={548} y={136} fill="#e8e8e8" fontSize="20" fontFamily="Inter,sans-serif" fontWeight="300">eⁱᵗ = cos(t) + i·sin(t)</text>
        <text x={548} y={156} fill="rgba(255,255,255,0.35)" fontSize="10" fontFamily="Inter,sans-serif">Rotación pura en el plano complejo</text>
      </g>

      <g className="fsr-2">
        <line x1={530} y1={190} x2={530} y2={265} stroke="#6b7fff" strokeWidth="2.5" />
        <text x={548} y={206} fill="#6b7fff" fontSize="8.5" fontWeight="800" letterSpacing="0.16em" fontFamily="Inter,sans-serif">IDENTIDAD DE EULER</text>
        <text x={548} y={236} fill="#e8e8e8" fontSize="20" fontFamily="Inter,sans-serif" fontWeight="300">eⁱᵖ = −1</text>
        <text x={548} y={256} fill="rgba(255,255,255,0.35)" fontSize="10" fontFamily="Inter,sans-serif">Cuando t = π (media vuelta)</text>
      </g>

      <text x={400} y={368} fill="#444" fontSize="10"
        textAnchor="middle" fontFamily="Inter,sans-serif" letterSpacing="0.08em">
        FÓRMULAS QUE GOBIERNAN LA DINÁMICA DEL DRON
      </text>
    </svg>
  )
}

// ─── STEP 2 — Algebraic Expansion SVG ─────────────────────────────────────────

function AlgebraViz() {
  const lines = [
    { tag: 'FUNCIÓN ORIGINAL', formula: 'z(π) = eⁱᵗ + (2i + 1)·(1 + i)', color: ACCENT_HEX, cls: 'fsu-1' },
    { tag: 'DISTRIBUCIÓN', formula: 'z(π) = eⁱᵗ + 2i(1) + 2i(i) + 1(1) + 1(i)', color: '#aaa', cls: 'fsu-2' },
    { tag: 'SIMPLIFICANDO  ·  i² = −1', formula: 'z(π) = eⁱᵗ + 2i − 2 + 1 + i', color: '#6b7fff', cls: 'fsu-3' },
    { tag: 'CENTRO DE ROTACIÓN', formula: 'z(π) = eⁱᵗ − 1 + 3i', color: '#aaa', cls: 'fsu-4' },
  ]

  return (
    <svg
      viewBox="0 0 800 380"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs><style>{KEYFRAMES}</style></defs>

      {lines.map((l, i) => {
        const y = 48 + i * 80
        return (
          <g key={l.tag} className={l.cls}>
            <line x1={60} y1={y} x2={60} y2={y + 52} stroke={l.color} strokeWidth="2.5" />
            <text x={80} y={y + 14} fill={l.color} fontSize="8.5" fontWeight="800"
              letterSpacing="0.16em" fontFamily="Inter,sans-serif">{l.tag}</text>
            <text x={80} y={y + 44} fill="#e2e2e2" fontSize="19" fontFamily="Inter,sans-serif" fontWeight="300">{l.formula}</text>
          </g>
        )
      })}

      {/* i² callout box */}
      <g className="pop-2">
        <rect x={596} y={150} width={164} height={56} rx={8}
          fill="rgba(107,127,255,0.08)" stroke="rgba(107,127,255,0.25)" strokeWidth="1" />
        <text x={678} y={172} fill="#6b7fff" fontSize="8.5" fontWeight="800"
          letterSpacing="0.14em" textAnchor="middle" fontFamily="Inter,sans-serif">PROPIEDAD CLAVE</text>
        <text x={678} y={196} fill="#e2e2e2" fontSize="20" textAnchor="middle"
          fontFamily="Inter,sans-serif" fontWeight="300">i² = −1</text>
      </g>

      <text x={400} y={368} fill="#444" fontSize="10"
        textAnchor="middle" fontFamily="Inter,sans-serif" letterSpacing="0.08em">
        z₀ = 1 + i · EXPANSIÓN ALGEBRAICA DEL BLOQUE ESTÁTICO
      </text>
    </svg>
  )
}

// ─── STEP 3 — Trajectory diagram (semi-circle arc) ────────────────────────────

function TrajectoryViz() {
  // Center of rotation: (-1, 3) → in SVG coords
  // We map: x_svg = cx + (re)*scale, y_svg = cy - (im)*scale
  const cx = 400, cy = 275, scale = 45

  // Semi-circle arc from t=0 to t=π
  // x(t) = cos(t) - 1, y(t) = sin(t) + 3
  // At t=0:  (0, 3) → start
  // At t=π: (-2, 3) → end
  // Center of arc: (-1, 3)

  const toSVG = (re: number, im: number) => ({
    x: cx + re * scale,
    y: cy - im * scale,
  })

  const center = toSVG(-1, 3)
  const start = toSVG(0, 3)
  const end = toSVG(-2, 3)

  // Build arc path: semi-circle above center
  // The arc goes from start (right side) counterclockwise to end (left side)
  const r = scale // radius = 1 in math = scale in SVG
  const arcPath = `M ${start.x},${start.y} A ${r},${r} 0 0,0 ${end.x},${end.y}`

  // Grid marks
  const gridLines = []
  for (let v = -4; v <= 5; v++) {
    const { x: gx } = toSVG(v, 0)
    if (gx > 80 && gx < 700)
      gridLines.push(<line key={`vg${v}`} x1={gx} y1={60} x2={gx} y2={320} stroke="#1a1a1a" strokeWidth="0.8" />)
    const { y: gy } = toSVG(0, v)
    if (gy > 60 && gy < 320)
      gridLines.push(<line key={`hg${v}`} x1={80} y1={gy} x2={700} y2={gy} stroke="#1a1a1a" strokeWidth="0.8" />)
  }

  return (
    <svg
      viewBox="0 0 800 380"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs><style>{KEYFRAMES}</style></defs>

      {/* Grid */}
      {gridLines}

      {/* Axes */}
      <line x1={80} y1={cy} x2={700} y2={cy} stroke="#333" strokeWidth="1.2" />
      <line x1={cx} y1={40} x2={cx} y2={340} stroke="#333" strokeWidth="1.2" />
      <text x={685} y={cy + 14} fill="#555" fontSize="10" fontFamily="Inter,sans-serif">Re</text>
      <text x={cx - 14} y={46} fill="#555" fontSize="10" fontFamily="Inter,sans-serif">Im</text>

      {/* Axis tick labels */}
      {[-3, -2, -1, 1, 2].map(v => {
        const { x: gx } = toSVG(v, 0)
        return <text key={`xt${v}`} x={gx} y={cy + 14} fill="#444" fontSize="9" textAnchor="middle" fontFamily="Inter,sans-serif">{v}</text>
      })}
      {[1, 2, 3, 4].map(v => {
        const { y: gy } = toSVG(0, v)
        return <text key={`yt${v}`} x={cx - 14} y={gy + 3} fill="#444" fontSize="9" textAnchor="middle" fontFamily="Inter,sans-serif">{v}</text>
      })}

      {/* Semi-circle trajectory */}
      <path
        className="dl-1"
        d={arcPath}
        fill="none"
        stroke={ACCENT_HEX}
        strokeWidth="2.5"
        strokeDasharray="400"
        strokeDashoffset="400"
      />

      {/* Center of rotation: (-1, 3) */}
      <circle className="pop-1" cx={center.x} cy={center.y} r={5}
        fill="none" stroke="#6b7fff" strokeWidth="1.5" />
      <text className="fsu-2" x={center.x + 10} y={center.y - 8}
        fill="#6b7fff" fontSize="10" fontFamily="Inter,sans-serif">C = (−1, 3)</text>

      {/* Start point t=0: (0, 3) */}
      <circle className="pop-1" cx={start.x} cy={start.y} r={5} fill="#22cc88" />
      <text className="fsu-2" x={start.x + 10} y={start.y - 8}
        fill="#22cc88" fontSize="10" fontFamily="Inter,sans-serif">t=0  (0, 3)</text>

      {/* End point t=π: (-2, 3) */}
      <circle className="pop-2" cx={end.x} cy={end.y} r={5} fill={ACCENT_HEX} />
      <text className="fsu-3" x={end.x - 12} y={end.y - 10}
        fill={ACCENT_HEX} fontSize="10" fontFamily="Inter,sans-serif" textAnchor="end">t=π  (−2, 3)</text>

      {/* Radius annotation */}
      <line x1={center.x} y1={center.y} x2={start.x} y2={start.y}
        stroke="#333" strokeWidth="1" strokeDasharray="3 3" />
      <text x={(center.x + start.x) / 2} y={center.y + 14}
        fill="#555" fontSize="9" textAnchor="middle" fontFamily="Inter,sans-serif">r = 1</text>

      {/* Direction arrow indicator */}
      <text className="fsu-4" x={cx - 5} y={center.y - scale - 12}
        fill={ACCENT_HEX} fontSize="11" textAnchor="middle" fontFamily="Inter,sans-serif">↺ antihorario</text>

      <text x={400} y={368} fill="#444" fontSize="10"
        textAnchor="middle" fontFamily="Inter,sans-serif" letterSpacing="0.08em">
        TRAYECTORIA DE t=0 HASTA t=π · CENTRO (−1, 3) · RADIO 1
      </text>
    </svg>
  )
}

// ─── STEP 4 — Python code visualization ───────────────────────────────────────

function CodeViz() {
  const KW = ACCENT_HEX
  const C_COMMENT = '#444'
  const C_STR = '#f0a36c'

  const colStyle = (accent?: boolean): React.CSSProperties => ({
    fontSize: '0.57rem',
    lineHeight: 1.65,
    color: '#888',
    background: 'transparent',
    borderLeft: `1.5px solid ${accent ? ACCENT_HEX : '#1e1e1e'}`,
    paddingLeft: '0.8rem',
    margin: 0,
    fontFamily: "'JetBrains Mono','Fira Code','Menlo',monospace",
    whiteSpace: 'pre-wrap',
  })

  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'grid', gridTemplateColumns: 'repeat(3,1fr)',
      gap: '1.1rem', padding: '2.6rem 2.2rem 1rem',
      overflow: 'hidden',
    }}>
      {/* Column 1 — Setup & trajectory */}
      <pre style={colStyle(true)}>
        <span style={{ color: C_COMMENT }}>{'# parámetros iniciales\n'}</span>
        <span style={{ color: KW }}>import</span>{' numpy as np\n'}
        <span style={{ color: KW }}>import</span>{' matplotlib.pyplot as plt\n\n'}
        <span style={{ color: C_COMMENT }}>{'# posición inicial z0\n'}</span>
        {'z0 = 1 + 1j\n\n'}
        <span style={{ color: C_COMMENT }}>{'# centro de rotación\n'}</span>
        {'offset = (2j + 1) * z0\n'}
        <span style={{ color: C_COMMENT }}>{'# → (-1 + 3j)\n\n'}</span>
        <span style={{ color: C_COMMENT }}>{'# array de tiempo t ∈ [0, π]\n'}</span>
        {'t = np.linspace(0, np.pi, 100)\n\n'}
        <span style={{ color: C_COMMENT }}>{'# trayectoria\n'}</span>
        {'z_t = np.exp(1j * t) + offset\n'}
      </pre>

      {/* Column 2 — Plot config */}
      <pre style={colStyle()}>
        <span style={{ color: C_COMMENT }}>{'# configurar gráfico\n'}</span>
        {'plt.figure(figsize=(8, 8))\n\n'}
        <span style={{ color: C_COMMENT }}>{'# curva de trayectoria\n'}</span>
        {'plt.plot(\n'}
        {'    z_t.real, z_t.imag,\n'}
        {'    label='}
        <span style={{ color: C_STR }}>{"'Trayectoria'"}</span>
        {',\n'}
        {'    color='}
        <span style={{ color: C_STR }}>{"'blue'"}</span>
        {', linewidth=2\n'}\n
        {')\n\n'}
        <span style={{ color: C_COMMENT }}>{'# puntos de inicio y fin\n'}</span>
        {'plt.plot(z_t.real[0],\n'}
        {'    z_t.imag[0],\n'}
        {'    '}
        <span style={{ color: C_STR }}>{"'go'"}</span>
        {", label='Inicio t=0')\n"}
        {'plt.plot(z_t.real[-1],\n'}
        {'    z_t.imag[-1],\n'}
        {'    '}
        <span style={{ color: C_STR }}>{"'ro'"}</span>
        {", label='Fin t=π')\n"}
      </pre>

      {/* Column 3 — Styling & show */}
      <pre style={colStyle()}>
        <span style={{ color: C_COMMENT }}>{'# centro de rotación\n'}</span>
        {'plt.plot(\n'}
        {'    offset.real, offset.imag,\n'}
        {'    '}
        <span style={{ color: C_STR }}>{"'kx'"}</span>
        {", label='Centro')\n\n"}
        <span style={{ color: C_COMMENT }}>{'# ejes y grilla\n'}</span>
        {'plt.axhline(0, color='}
        <span style={{ color: C_STR }}>{"'black'"}</span>
        {', lw=1)\n'}
        {'plt.axvline(0, color='}
        <span style={{ color: C_STR }}>{"'black'"}</span>
        {', lw=1)\n'}
        {'plt.grid(True, ls='}
        <span style={{ color: C_STR }}>{"'--'"}</span>
        {', alpha=0.6)\n\n'}
        <span style={{ color: C_COMMENT }}>{'# ajuste y visualización\n'}</span>
        {'plt.axis('}
        <span style={{ color: C_STR }}>{"'equal'"}</span>
        {')\n'}
        {'plt.legend()\n'}
        {'plt.show()\n'}
      </pre>
    </div>
  )
}

// ─── STEP 5 — Sign inversion analysis (e⁻ⁱᵗ) ────────────────────────────────

function SignViz() {
  const cx = 400, cy = 200, scale = 70
  const toSVG = (re: number, im: number) => ({
    x: cx + re * scale,
    y: cy - im * scale,
  })

  // Arcs: counterclockwise (+) and clockwise (-)
  const startPos = toSVG(1, 0)
  const startNeg = toSVG(1, 0)

  return (
    <svg
      viewBox="0 0 800 380"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs><style>{KEYFRAMES}</style></defs>

      {/* Axes */}
      <line x1={200} y1={cy} x2={620} y2={cy} stroke="#2a2a2a" strokeWidth="1.2" />
      <line x1={cx} y1={50} x2={cx} y2={350} stroke="#2a2a2a" strokeWidth="1.2" />
      <text x={605} y={cy + 14} fill="#444" fontSize="10" fontFamily="Inter,sans-serif">Re</text>
      <text x={cx - 14} y={56} fill="#444" fontSize="10" fontFamily="Inter,sans-serif">Im</text>

      {/* Unit circle faint */}
      <circle cx={cx} cy={cy} r={scale} fill="none"
        stroke="#1f1f1f" strokeWidth="1" strokeDasharray="4 4" />

      {/* +it arc: counterclockwise (upper half) */}
      <path
        className="dl-1"
        d={`M ${startPos.x},${startPos.y} A ${scale},${scale} 0 0,0 ${cx - scale},${cy}`}
        fill="none"
        stroke={ACCENT_HEX}
        strokeWidth="2.5"
        strokeDasharray="400"
        strokeDashoffset="400"
      />
      {/* Arrow at top of +it arc */}
      <polygon className="pop-2"
        points={`${cx},${cy - scale - 6} ${cx - 7},${cy - scale + 6} ${cx + 7},${cy - scale + 6}`}
        fill={ACCENT_HEX} />

      {/* -it arc: clockwise (lower half) */}
      <path
        className="dl-2"
        d={`M ${startNeg.x},${startNeg.y} A ${scale},${scale} 0 0,1 ${cx - scale},${cy}`}
        fill="none"
        stroke="#ff5e7d"
        strokeWidth="2.5"
        strokeDasharray="400"
        strokeDashoffset="400"
      />
      {/* Arrow at bottom of -it arc */}
      <polygon className="pop-3"
        points={`${cx},${cy + scale + 6} ${cx - 7},${cy + scale - 6} ${cx + 7},${cy + scale - 6}`}
        fill="#ff5e7d" />

      {/* Labels */}
      <g className="fsu-1">
        <text x={cx + scale + 12} y={cy - 4} fill="#777" fontSize="10" fontFamily="Inter,sans-serif">z₀=(1,0)</text>
        <circle cx={cx + scale} cy={cy} r={4} fill="#777" />
      </g>

      {/* +it label */}
      <g className="fsu-2">
        <text x={cx - scale - 16} y={cy - 6} fill={ACCENT_HEX} fontSize="10" fontFamily="Inter,sans-serif" textAnchor="end">eⁱᵗ</text>
        <text x={160} y={cy - 30} fill={ACCENT_HEX} fontSize="9" fontFamily="Inter,sans-serif">↺ antihorario</text>
      </g>

      {/* -it label */}
      <g className="fsu-3">
        <text x={cx - scale - 16} y={cy + 14} fill="#ff5e7d" fontSize="10" fontFamily="Inter,sans-serif" textAnchor="end">e⁻ⁱᵗ</text>
        <text x={160} y={cy + 44} fill="#ff5e7d" fontSize="9" fontFamily="Inter,sans-serif">↻ horario</text>
      </g>

      {/* Info boxes */}
      <g className="fsr-1">
        <rect x={530} y={80} width={210} height={70} rx={8}
          fill={`rgba(89,167,251,0.07)`} stroke={`rgba(89,167,251,0.2)`} strokeWidth="1" />
        <text x={545} y={100} fill={ACCENT_HEX} fontSize="8.5" fontWeight="800" letterSpacing="0.14em" fontFamily="Inter,sans-serif">eⁱᵗ = cos(t) + i·sin(t)</text>
        <text x={545} y={120} fill="#999" fontSize="10" fontFamily="Inter,sans-serif">Eje Y ↑ controlado por sin(t)</text>
        <text x={545} y={138} fill="#999" fontSize="10" fontFamily="Inter,sans-serif">Giro en sentido antihorario</text>
      </g>

      <g className="fsr-2">
        <rect x={530} y={190} width={210} height={70} rx={8}
          fill="rgba(255,94,125,0.07)" stroke="rgba(255,94,125,0.2)" strokeWidth="1" />
        <text x={545} y={210} fill="#ff5e7d" fontSize="8.5" fontWeight="800" letterSpacing="0.14em" fontFamily="Inter,sans-serif">e⁻ⁱᵗ = cos(t) − i·sin(t)</text>
        <text x={545} y={230} fill="#999" fontSize="10" fontFamily="Inter,sans-serif">Eje Y ↓ se invierte al − sin(t)</text>
        <text x={545} y={248} fill="#999" fontSize="10" fontFamily="Inter,sans-serif">Giro en sentido horario</text>
      </g>

      <text x={400} y={368} fill="#444" fontSize="10"
        textAnchor="middle" fontFamily="Inter,sans-serif" letterSpacing="0.08em">
        EFECTO DEL SIGNO EN LA PARTE IMAGINARIA · INVERSIÓN DE SENTIDO
      </text>
    </svg>
  )
}

// ─── Interactive trajectory animation ──────────────────────────────────────────

function AnimatedTrajectory() {
  const [t, setT] = useState(0)
  const [playing, setPlaying] = useState(false)
  const rafRef = useRef<number | null>(null)
  const startRef = useRef<number | null>(null)
  const DURATION = 3000 // ms for full π sweep

  const stop = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = null
    setPlaying(false)
  }, [])

  const play = useCallback(() => {
    if (playing) { stop(); return }
    setT(0)
    startRef.current = null
    setPlaying(true)

    const animate = (ts: number) => {
      if (!startRef.current) startRef.current = ts
      const elapsed = ts - startRef.current
      const progress = Math.min(elapsed / DURATION, 1)
      setT(progress * Math.PI)
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        setPlaying(false)
      }
    }
    rafRef.current = requestAnimationFrame(animate)
  }, [playing, stop])

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }, [])

  const cx = 340, cy = 275, scale = 45
  const toSVG = (re: number, im: number) => ({ x: cx + re * scale, y: cy - im * scale })

  const center = toSVG(-1, 3)
  const dronePos = toSVG(Math.cos(t) - 1, Math.sin(t) + 3)

  // Build trail path so far
  const points: string[] = []
  const steps = 80
  for (let s = 0; s <= steps; s++) {
    const tVal = (s / steps) * t
    const p = toSVG(Math.cos(tVal) - 1, Math.sin(tVal) + 3)
    points.push(`${s === 0 ? 'M' : 'L'} ${p.x},${p.y}`)
  }
  const trailPath = points.join(' ')

  const re = (Math.cos(t) - 1).toFixed(3)
  const im = (Math.sin(t) + 3).toFixed(3)
  const tDeg = ((t / Math.PI) * 180).toFixed(1)

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <svg viewBox="0 0 680 380" style={{ width: '100%', flex: 1 }} preserveAspectRatio="xMidYMid meet">

        {/* Grid */}
        {[-4, -3, -2, -1, 0, 1, 2].map(v => {
          const { x: gx } = toSVG(v, 0)
          const { y: gy } = toSVG(0, v + 3)
          return (
            <g key={v}>
              <line x1={gx} y1={50} x2={gx} y2={340} stroke="#161616" strokeWidth="0.8" />
              <line x1={40} y1={gy} x2={600} y2={gy} stroke="#161616" strokeWidth="0.8" />
            </g>
          )
        })}

        {/* Axes */}
        <line x1={40} y1={cy} x2={600} y2={cy} stroke="#2a2a2a" strokeWidth="1" />
        <line x1={cx} y1={30} x2={cx} y2={350} stroke="#2a2a2a" strokeWidth="1" />
        <text x={585} y={cy + 14} fill="#444" fontSize="9" fontFamily="Inter,sans-serif">Re</text>
        <text x={cx - 12} y={36} fill="#444" fontSize="9" fontFamily="Inter,sans-serif">Im</text>

        {/* Full orbit circle (faint reference) */}
        <circle cx={center.x} cy={center.y} r={scale} fill="none"
          stroke="#1e2a3a" strokeWidth="1" strokeDasharray="4 4" />

        {/* Trail */}
        {t > 0 && (
          <path d={trailPath} fill="none" stroke={ACCENT_HEX} strokeWidth="2" strokeLinecap="round" />
        )}

        {/* Radius arm */}
        <line
          x1={center.x} y1={center.y}
          x2={dronePos.x} y2={dronePos.y}
          stroke="#223" strokeWidth="1.5" strokeDasharray="3 2"
        />

        {/* Center */}
        <circle cx={center.x} cy={center.y} r={4} fill="none" stroke="#6b7fff" strokeWidth="1.5" />
        <text x={center.x + 8} y={center.y - 6} fill="#6b7fff" fontSize="8.5" fontFamily="Inter,sans-serif">C(−1,3)</text>

        {/* Start point */}
        <circle cx={toSVG(0, 3).x} cy={toSVG(0, 3).y} r={4} fill="#22cc88" />
        <text x={toSVG(0, 3).x + 8} y={toSVG(0, 3).y - 6} fill="#22cc88" fontSize="8.5" fontFamily="Inter,sans-serif">t=0 (0,3)</text>

        {/* Drone dot */}
        <circle cx={dronePos.x} cy={dronePos.y} r={7} fill={ACCENT_HEX} opacity="0.9" />
        <text x={dronePos.x + 10} y={dronePos.y - 8} fill={ACCENT_HEX} fontSize="9" fontFamily="Inter,sans-serif">🚁</text>

        {/* End point label */}
        {t >= Math.PI - 0.05 && (
          <g>
            <circle cx={toSVG(-2, 3).x} cy={toSVG(-2, 3).y} r={5} fill={ACCENT_HEX} />
            <text x={toSVG(-2, 3).x - 12} y={toSVG(-2, 3).y - 8} fill={ACCENT_HEX} fontSize="9"
              textAnchor="end" fontFamily="Inter,sans-serif">t=π (−2,3)</text>
          </g>
        )}

        {/* Live readout */}
        <rect x={430} y={50} width={185} height={80} rx={6}
          fill="rgba(0,0,0,0.5)" stroke="rgba(89,167,251,0.2)" strokeWidth="1" />
        <text x={444} y={72} fill={ACCENT_HEX} fontSize="8.5" fontWeight="800" letterSpacing="0.14em" fontFamily="Inter,sans-serif">POSICIÓN ACTUAL</text>
        <text x={444} y={92} fill="#ddd" fontSize="10" fontFamily="Inter,sans-serif">Re: {re}</text>
        <text x={444} y={108} fill="#ddd" fontSize="10" fontFamily="Inter,sans-serif">Im: {im}</text>
        <text x={444} y={122} fill="#666" fontSize="9" fontFamily="Inter,sans-serif">t = {tDeg}° / 180°</text>
      </svg>

      {/* Play button */}
      <button
        onClick={play}
        style={{
          marginBottom: '1rem',
          padding: '0.45rem 2rem',
          background: playing ? 'rgba(255,94,125,0.08)' : `rgba(89,167,251,0.08)`,
          border: `1px solid ${playing ? '#ff5e7d55' : ACCENT_HEX + '55'}`,
          borderRadius: 8,
          color: playing ? '#ff5e7d' : t >= Math.PI - 0.05 ? 'rgba(89,167,251,0.6)' : ACCENT_HEX,
          fontFamily: 'Inter,sans-serif', fontWeight: 800,
          fontSize: '0.62rem', letterSpacing: '0.12em',
          cursor: 'pointer', transition: 'all 0.2s ease',
        }}
      >
        {playing ? '⏸ PAUSAR' : t >= Math.PI - 0.05 ? '↺ REINICIAR' : '▶ ANIMAR TRAYECTORIA'}
      </button>
    </div>
  )
}

// ─── theoryItems ───────────────────────────────────────────────────────────────

const theoryItems = [
  'Números complejos (forma binómica)',
  'Operaciones en plano complejo',
  'Forma exponencial',
  'Fórmula de Traslación',
  'Fórmula de Euler',
  'Identidad de Euler',
  'Cinemática y funciones paramétricas',
]

// ─── Approach ─────────────────────────────────────────────────────────────────

const approach = (
  <>
    <p>
      Dividimos la función <strong>z(t) = eⁱᵗ + (2i + 1)·z₀</strong> en dos módulos independientes:
      un <strong>bloque dinámico</strong> dependiente del tiempo (eⁱᵗ) y un <strong>bloque estático</strong>
      que representa la constante de desplazamiento espacial ((2i + 1)·z₀).
    </p>
    <p>
      Primero resolvemos el bloque estático usando la posición inicial y expandiendo el producto de complejos,
      usando i² = −1. Esto nos deja una ecuación simplificada con un centro de rotación fijo.
      Luego aplicamos la <strong>Identidad de Euler</strong> (eⁱᵖ = −1) para evaluar el bloque dinámico
      en t = π, obteniendo la posición final del dron. Finalmente validamos el resultado geométricamente.
    </p>
  </>
)

// ─── Resolution ───────────────────────────────────────────────────────────────

const resolution = (
  <>
    {/* ── PASO 01 — Teoría: Fórmula de Euler ── */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#060d14', position: 'relative', overflow: 'hidden' }}>
        <p className="pp-step-category">Fundamento Teórico · Fórmula de Euler</p>
        <EulerViz />
      </div>
      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p>
            La <strong>Fórmula de Euler</strong> (eⁱᵗ = cos(t) + i·sin(t)) es el motor del sistema:
            traduce la exponencial compleja en componentes trigonométricos. La <strong>parte real (coseno)</strong> controla
            el movimiento sobre el eje X y la <strong>parte imaginaria (seno)</strong> controla el eje Y,
            generando así una rotación circular perfecta de radio 1. La <strong>Identidad de Euler</strong> (eⁱᵖ = −1)
            es el caso especial cuando t = π, equivalente a media vuelta de circunferencia (180°).
          </p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">Paso 01</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Fórmula e Identidad de Euler</h3></div>
        </div>
      </div>
    </div>

    {/* ── PASO 02 — Expansión algebraica ── */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#090a10', position: 'relative', overflow: 'hidden' }}>
        <p className="pp-step-category">Resolución Algebraica · Bloque Estático</p>
        <AlgebraViz />
      </div>
      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p>
            Sustituimos z₀ = 1 + i en la función original y <strong>distribuimos el producto</strong> (2i + 1)·(1 + i)
            término a término: 2i·1 + 2i·i + 1·1 + 1·i = 2i + 2i² + 1 + i. Usando i² = −1,
            simplificamos a <strong>−1 + 3i</strong>. Este resultado es el <em>centro de rotación geométrico</em> del dron:
            el punto fijo alrededor del cual orbita toda la trayectoria.
          </p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">Paso 02</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Expansión algebraica · Centro (−1, 3)</h3></div>
        </div>
      </div>
    </div>

    {/* ── PASO 03 — Evaluación en t=π y resultado ── */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#060d14', position: 'relative', overflow: 'hidden' }}>
        <p className="pp-step-category">Evaluación Final · Identidad de Euler en t=π</p>
        <TrajectoryViz />
      </div>
      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p>
            Con z(π) = eⁱᵖ − 1 + 3i, aplicamos la Identidad de Euler: eⁱᵖ = −1.
            Por lo tanto z(π) = <strong>−1 − 1 + 3i = −2 + 3i</strong>.
            La posición del dron en t = π es la coordenada <strong>(−2, 3)</strong> del plano complejo.
            La trayectoria completa de t = 0 a t = π es el semicírculo superior con centro en (−1, 3)
            y radio 1.
          </p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">Paso 03</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Resultado · z(π) = −2 + 3i</h3></div>
        </div>
      </div>
    </div>

    {/* ── PASO 04 — Animación interactiva de la trayectoria ── */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#060c12', position: 'relative', overflow: 'hidden' }}>
        <p className="pp-step-category">Visualización Interactiva · Trayectoria del Dron</p>
        <AnimatedTrajectory />
      </div>
      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p>
            La animación muestra al dron recorriendo el semicírculo superior desde el punto inicial
            (0, 3) en t = 0 hasta el punto final (−2, 3) en t = π. El <strong>readout en tiempo real</strong> muestra
            las coordenadas exactas (Re, Im) en cada instante. El centro de rotación (−1, 3), calculado
            algebráicamente, actúa como el pivot geométrico de toda la órbita.
          </p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">Paso 04</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Animación de la Trayectoria</h3></div>
        </div>
      </div>
    </div>

    {/* ── PASO 05 — Efecto del signo (eⁱᵗ vs e⁻ⁱᵗ) ── */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#090812', position: 'relative', overflow: 'hidden' }}>
        <p className="pp-step-category">Análisis Comparativo · Inversión del Sentido</p>
        <SignViz />
      </div>
      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p>
            La <strong>parte imaginaria</strong> (sin(t)) es la responsable del sentido de giro.
            Con eⁱᵗ = cos(t) + i·sin(t), el dron gira en sentido <strong>antihorario</strong> (↺),
            pues el seno crece positivamente hacia Im+. Al cambiar a e⁻ⁱᵗ = cos(t) − i·sin(t),
            el signo negativo invierte el componente imaginario: el dron trazaría la
            <strong> misma circunferencia pero en sentido horario</strong> (↻), como si se alterara
            el código de vuelo del algoritmo, cambiando físicamente la dirección de rotación del motor.
          </p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">Paso 05</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">eⁱᵗ vs e⁻ⁱᵗ · Inversión de Sentido</h3></div>
        </div>
      </div>
    </div>

    {/* ── PASO 06 — Código Python ── */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#080a0e', position: 'relative', overflow: 'hidden' }}>
        <p className="pp-step-category">Implementación · Python / NumPy / Matplotlib</p>
        <CodeViz />
      </div>
      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p>
            El programa define z₀ = 1 + 1j y calcula el offset (centro de rotación) como (2j + 1)·z₀ = −1 + 3j.
            Usando <strong>np.linspace(0, π, 100)</strong> para generar 100 puntos de tiempo y
            <strong> np.exp(1j·t)</strong> para la función exponencial compleja, construye la trayectoria completa.
            Matplotlib grafica la parte real (eje X) vs la parte imaginaria (eje Y) con marcadores
            para el inicio, el fin y el centro de rotación, y <strong>plt.axis('equal')</strong>
            garantiza que el círculo no se deforme.
          </p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">Paso 06</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Implementación en Python</h3></div>
        </div>
      </div>
    </div>
  </>
)

// ─── Export ───────────────────────────────────────────────────────────────────

export default function Problem6() {
  return (
    <ProblemPage
      number="06"
      subject="Análisis Complejo"
      title="Navegación en Plano Complejo"
      question="¿Cómo se desplaza un dron en el plano complejo dada su ecuación de movimiento?"
      heroBackground="#0d1a20"
      accent={ACCENT}
      theoryItems={theoryItems}
      approach={approach}
      resolution={resolution}
    />
  )
}
