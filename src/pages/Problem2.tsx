import ProblemPage from '../components/ProblemPage/ProblemPage'

const ACCENT = 'var(--accent-pink)'
const ACCENT_HEX = '#728be7ff'
const A_COLOR = '#69b6ddff'
const B_COLOR = '#e77290'

// ─── Data ─────────────────────────────────────────────────────────────────────

const dataA = [3, 4, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 11, 12]
const dataB = [3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 6, 6, 6, 7, 7, 8, 9, 10, 11, 12]

// freq by time value
const freqA: Record<number, number> = {}
const freqB: Record<number, number> = {}
dataA.forEach(v => { freqA[v] = (freqA[v] || 0) + 1 })
dataB.forEach(v => { freqB[v] = (freqB[v] || 0) + 1 })

// ─── Theory / pills ─────────────────────────────────────────────────────────

const theoryItems = [
  'Media, Mediana, Moda',
  'Desviación Estándar',
  'Inferencia Estadística',
  'Prueba t de Student',
  'Probabilidad Condicional',
  'Tabla de Contingencia',
]

// ─── Approach ────────────────────────────────────────────────────────────────

const approach = (
  <>
    <p>
      Para resolver este problema se aplicaron tres bloques de análisis. Primero, se organizaron los 30 registros de cada algoritmo en tablas para caracterizar el comportamiento individual de cada distribución.
    </p>
    <p>
      Segundo, se contrastaron ambas distribuciones mediante una <strong>Prueba t de Student para varianzas desiguales</strong> (Welch), determinando si la diferencia de medias observada era estadísticamente significativa con un nivel de confianza del 95% (α = 0,05) o podía atribuirse al azar muestral.
    </p>
    <p>
      Tercero, se construyó una <strong>tabla de contingencia</strong> cruzando algoritmo × rango de tiempo ({"<"}5 s / 5–7 s / {">"}7 s), lo que permitió aplicar Laplace para calcular probabilidades clásicas, analizar eventos mutuamente excluyentes y resolver escenarios de probabilidad condicional.
    </p>
  </>
)

// ─── Visualization Helpers ───────────────────────────────────────────────────

// Compact horizontal bar inside dark SVG
function HBar({ y, val, max, color, label, valLabel }: {
  y: number; val: number; max: number; color: string; label: string; valLabel: string
}) {
  const BAR_W = 480
  const w = (val / max) * BAR_W
  return (
    <g>
      <text x={10} y={y - 3} fill="rgba(255,255,255,0.45)" fontSize="9" fontFamily="Inter,sans-serif" fontWeight="700" letterSpacing="0.08em">
        {label}
      </text>
      <rect x={10} y={y + 2} width={BAR_W} height={16} fill="rgba(255,255,255,0.05)" rx={3} />
      <rect x={10} y={y + 2} width={w} height={16} fill={color} rx={3} opacity={0.85} />
      <text x={10 + w + 8} y={y + 14} fill={color} fontSize="10" fontFamily="Inter,sans-serif" fontWeight="800">
        {valLabel}
      </text>
    </g>
  )
}

// ─── SVG: Stats comparison bars ──────────────────────────────────────────────

function StatsBarsViz() {
  // Media, Mediana, Moda for A and B
  const stats = [
    { label: 'Media', a: 7.50, b: 5.30, max: 12 },
    { label: 'Mediana', a: 7.50, b: 4.50, max: 12 },
    { label: 'Moda', a: 7.00, b: 3.00, max: 12 },
    { label: 'Desv. Est.', a: 1.96, b: 2.51, max: 4 },
    { label: 'Error Típ.', a: 0.35, b: 0.45, max: 1 },
  ]
  const BAR_W = 260
  return (
    <svg viewBox="0 0 800 380" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid meet">
      <text x={30} y={38} fill="rgba(255,255,255,0.25)" fontSize="9" fontFamily="Inter,sans-serif" fontWeight="800" letterSpacing="0.15em">MÉTRICAS ESTADÍSTICAS</text>
      {stats.map((s, i) => {
        const y = 60 + i * 58
        const wA = (s.a / s.max) * BAR_W
        const wB = (s.b / s.max) * BAR_W
        return (
          <g key={s.label}>
            <text x={30} y={y + 12} fill="rgba(255,255,255,0.6)" fontSize="9" fontFamily="Inter,sans-serif" fontWeight="700" letterSpacing="0.06em">{s.label.toUpperCase()}</text>
            {/* A bar */}
            <rect x={130} y={y} width={BAR_W} height={14} fill="rgba(255,255,255,0.05)" rx={3} />
            <rect x={130} y={y} width={wA} height={14} fill={A_COLOR} rx={3} opacity={0.9} />
            <text x={130 + wA + 6} y={y + 11} fill="rgba(255,255,255,0.7)" fontSize="9" fontFamily="Inter,sans-serif" fontWeight="700">{s.a}</text>
            {/* B bar */}
            <rect x={430} y={y} width={BAR_W} height={14} fill="rgba(255,255,255,0.05)" rx={3} />
            <rect x={430} y={y} width={wB * (BAR_W / 260)} height={14} fill={B_COLOR} rx={3} opacity={0.85} />
            <text x={430 + wB * (BAR_W / 260) + 6} y={y + 11} fill={B_COLOR} fontSize="9" fontFamily="Inter,sans-serif" fontWeight="700">{s.b}</text>
            {/* labels */}
            <text x={120} y={y + 11} fill={A_COLOR} fontSize="8" fontFamily="Inter,sans-serif" fontWeight="800" textAnchor="end">A</text>
            <text x={420} y={y + 11} fill={B_COLOR} fontSize="8" fontFamily="Inter,sans-serif" fontWeight="800" textAnchor="end">B</text>
          </g>
        )
      })}
    </svg>
  )
}

// ─── SVG: Symmetry / Asymmetry illustration ───────────────────────────────────

function SymmetryViz() {
  // Bell curve A (symmetric) + skewed curve B
  return (
    <svg viewBox="0 0 800 380" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid meet">
      <text x={200} y={28} fill="rgba(255,255,255,0.3)" fontSize="9" fontFamily="Inter,sans-serif" fontWeight="800" letterSpacing="0.15em" textAnchor="middle">ALGORITMO A — Simétrica (0,00)</text>
      <text x={590} y={28} fill="rgba(255,255,255,0.3)" fontSize="9" fontFamily="Inter,sans-serif" fontWeight="800" letterSpacing="0.15em" textAnchor="middle">ALGORITMO B — Asimetría positiva (1,31)</text>
      {/* A - symmetric bell */}
      <path d="M 40,300 Q 80,300 120,250 Q 160,150 200,80 Q 240,150 280,250 Q 320,300 360,300" fill="none" stroke={A_COLOR} strokeWidth="2.5" />
      <line x1={200} y1={80} x2={200} y2={300} stroke={A_COLOR} strokeWidth="1.5" strokeDasharray="4,4" />
      <text x={200} y={72} fill={A_COLOR} fontSize="9" fontFamily="Inter,sans-serif" fontWeight="800" textAnchor="middle">x̄ = Me = 7,5</text>
      <line x1={40} y1={300} x2={360} y2={300} stroke="#333" strokeWidth="1" />
      {/* B - right-skewed */}
      <path d="M 430,300 Q 460,300 480,180 Q 500,60 520,50 Q 550,80 580,150 Q 620,230 660,280 Q 700,300 760,300" fill="none" stroke={B_COLOR} strokeWidth="2.5" />
      {/* Moda */}
      <line x1={518} y1={50} x2={518} y2={300} stroke="rgba(231,114,144,0.5)" strokeWidth="1" strokeDasharray="3,3" />
      <text x={518} y={44} fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="Inter,sans-serif" textAnchor="middle">Mo=3</text>
      {/* Mediana */}
      <line x1={560} y1={100} x2={560} y2={300} stroke="rgba(231,114,144,0.7)" strokeWidth="1.5" strokeDasharray="4,4" />
      <text x={560} y={92} fill="rgba(231,114,144,0.8)" fontSize="8" fontFamily="Inter,sans-serif" textAnchor="middle">Me=4,5</text>
      {/* Media */}
      <line x1={600} y1={150} x2={600} y2={300} stroke={B_COLOR} strokeWidth="2" />
      <text x={600} y={142} fill={B_COLOR} fontSize="9" fontFamily="Inter,sans-serif" fontWeight="800" textAnchor="middle">x̄=5,3</text>
      <line x1={430} y1={300} x2={760} y2={300} stroke="#333" strokeWidth="1" />
      {/* cola label */}
      <text x={700} y={275} fill="rgba(255,255,255,0.25)" fontSize="8" fontFamily="Inter,sans-serif">cola →</text>
    </svg>
  )
}

// ─── SVG: t-test result ───────────────────────────────────────────────────────

function TTestViz() {
  return (
    <svg viewBox="0 0 800 380" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid meet">
      {/* null distribution curve */}
      <path d="M 80,300 Q 200,300 280,180 Q 340,80 400,65 Q 460,80 520,180 Q 600,300 720,300" fill="none" stroke="#444" strokeWidth="2" />
      <line x1={80} y1={300} x2={720} y2={300} stroke="#333" strokeWidth="1" />
      {/* Center / H0 zone */}
      <line x1={400} y1={65} x2={400} y2={300} stroke="#555" strokeWidth="1" strokeDasharray="4,4" />
      <text x={400} y={58} fill="rgba(255,255,255,0.25)" fontSize="8" fontFamily="Inter,sans-serif" textAnchor="middle">H₀: μA−μB=0</text>
      {/* critical region left */}
      <path d="M 80,300 Q 150,300 185,280 Q 205,260 220,250" fill={ACCENT_HEX} opacity={0.15} />
      {/* critical region right */}
      <path d="M 580,250 Q 595,260 615,280 Q 650,300 720,300" fill={ACCENT_HEX} opacity={0.15} />
      {/* alpha lines */}
      <line x1={225} y1={250} x2={225} y2={300} stroke={ACCENT_HEX} strokeWidth="1.5" strokeDasharray="3,3" />
      <text x={225} y={244} fill={ACCENT_HEX} fontSize="8" fontFamily="Inter,sans-serif" textAnchor="middle">α/2 = 0,025</text>
      <line x1={575} y1={250} x2={575} y2={300} stroke={ACCENT_HEX} strokeWidth="1.5" strokeDasharray="3,3" />
      <text x={575} y={244} fill={ACCENT_HEX} fontSize="8" fontFamily="Inter,sans-serif" textAnchor="middle">α/2 = 0,025</text>
      {/* Observed t-statistic */}
      <line x1={150} y1={290} x2={150} y2={300} stroke="#FF2D78" strokeWidth="3" />
      <circle cx={150} cy={292} r={5} fill="#FF2D78" />
      <text x={150} y={284} fill="#FF2D78" fontSize="9" fontFamily="Inter,sans-serif" fontWeight="800" textAnchor="middle">t obs</text>
      {/* p-value annotation */}
      <rect x={240} y={100} width={320} height={100} fill="rgba(255,45,120,0.08)" rx={8} stroke="rgba(255,45,120,0.25)" strokeWidth="1" />
      <text x={400} y={128} fill="#FF2D78" fontSize="13" fontFamily="Inter,sans-serif" fontWeight="900" textAnchor="middle">P-valor = 0,00022</text>
      <text x={400} y={148} fill="rgba(255,255,255,0.6)" fontSize="10" fontFamily="Inter,sans-serif" textAnchor="middle">0,00022 {"<"} α = 0,05</text>
      <text x={400} y={168} fill="rgba(255,255,255,0.5)" fontSize="10" fontFamily="Inter,sans-serif" textAnchor="middle">✗ Se rechaza H₀</text>
      <text x={400} y={188} fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="Inter,sans-serif" textAnchor="middle">Confianza 95%</text>
    </svg>
  )
}

// ─── SVG: Contingency table visual ───────────────────────────────────────────

function ContingencyViz() {
  const rows = [
    { label: '< 5 s', a: 2, b: 15, tot: 17, color: '#A8FF3E' },
    { label: '5 – 7 s', a: 13, b: 8, tot: 21, color: '#F5E642' },
    { label: '> 7 s', a: 15, b: 7, tot: 22, color: '#FF6B4A' },
  ]
  const colX = [60, 220, 360, 500]
  const rowH = 70
  return (
    <svg viewBox="0 0 700 380" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid meet">
      {/* Header */}
      {['Rango (s)', 'Algo. A', 'Algo. B', 'Total'].map((h, i) => (
        <text key={h} x={colX[i] + 80} y={50} fill="rgba(255,255,255,0.35)" fontSize="9" fontFamily="Inter,sans-serif" fontWeight="800" letterSpacing="0.12em" textAnchor="middle">{h.toUpperCase()}</text>
      ))}
      <line x1={40} y1={58} x2={620} y2={58} stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      {rows.map((r, i) => {
        const y = 70 + i * rowH
        const barWA = (r.a / 30) * 140
        const barWB = (r.b / 30) * 140
        return (
          <g key={r.label}>
            <text x={colX[0] + 80} y={y + 28} fill={r.color} fontSize="11" fontFamily="Inter,sans-serif" fontWeight="800" textAnchor="middle">{r.label}</text>
            {/* A bar-cell */}
            <rect x={colX[1] + 10} y={y + 8} width={140} height={20} fill="rgba(255,255,255,0.04)" rx={3} />
            <rect x={colX[1] + 10} y={y + 8} width={barWA} height={20} fill={A_COLOR} rx={3} opacity={0.9} />
            <text x={colX[1] + 80} y={y + 23} fill="#fff" fontSize="11" fontFamily="Inter,sans-serif" fontWeight="800" textAnchor="middle">{r.a}</text>
            {/* B bar-cell */}
            <rect x={colX[2] + 10} y={y + 8} width={140} height={20} fill="rgba(255,255,255,0.04)" rx={3} />
            <rect x={colX[2] + 10} y={y + 8} width={barWB} height={20} fill={B_COLOR} rx={3} opacity={0.85} />
            <text x={colX[2] + 80} y={y + 23} fill="#fff" fontSize="11" fontFamily="Inter,sans-serif" fontWeight="800" textAnchor="middle">{r.b}</text>
            {/* Total */}
            <text x={colX[3] + 80} y={y + 23} fill="rgba(255,255,255,0.8)" fontSize="11" fontFamily="Inter,sans-serif" fontWeight="700" textAnchor="middle">{r.tot}</text>
            <line x1={40} y1={y + rowH - 4} x2={620} y2={y + rowH - 4} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          </g>
        )
      })}
      {/* Footer totals */}
      <line x1={40} y1={286} x2={620} y2={286} stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      {['Total', '30', '30', '60'].map((t, i) => (
        <text key={i} x={colX[i] + 80} y={306} fill="#fff" fontSize="12" fontFamily="Inter,sans-serif" fontWeight="900" textAnchor="middle">{t}</text>
      ))}
      <text x={350} y={355} fill="#444" fontSize="9" textAnchor="middle" fontFamily="Inter,sans-serif" letterSpacing="0.08em">TABLA DE CONTINGENCIA</text>
    </svg>
  )
}

// ─── SVG: Donut chart for probability distribution ──────────────────────────

function DonutViz() {
  // Menor a 5: 17/60=28.3%, Entre 5-7: 21/60=35%, Mayor a 7: 22/60=36.7%
  const slices = [
    { pct: 17 / 60, color: '#e77290', label: '< 5 s', n: 17 },
    { pct: 21 / 60, color: '#F5E642', label: '5–7 s', n: 21 },
    { pct: 22 / 60, color: '#FF6B4A', label: '> 7 s', n: 22 },
  ]
  const cx = 220, cy = 190, r = 120, innerR = 68
  let cumAngle = -Math.PI / 2
  const paths = slices.map(s => {
    const startA = cumAngle
    const endA = cumAngle + 2 * Math.PI * s.pct
    cumAngle = endA
    const x1 = cx + r * Math.cos(startA), y1 = cy + r * Math.sin(startA)
    const x2 = cx + r * Math.cos(endA), y2 = cy + r * Math.sin(endA)
    const ix1 = cx + innerR * Math.cos(startA), iy1 = cy + innerR * Math.sin(startA)
    const ix2 = cx + innerR * Math.cos(endA), iy2 = cy + innerR * Math.sin(endA)
    const large = s.pct > 0.5 ? 1 : 0
    return { ...s, d: `M ${ix1} ${iy1} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} L ${ix2} ${iy2} A ${innerR} ${innerR} 0 ${large} 0 ${ix1} ${iy1} Z`, midA: (startA + endA) / 2 }
  })
  return (
    <svg viewBox="0 0 700 380" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid meet">
      {paths.map((p, i) => (
        <path key={i} d={p.d} fill={p.color} opacity={0.9} />
      ))}
      {/* center label */}
      <text x={cx} y={cy - 8} fill="#fff" fontSize="11" fontFamily="Inter,sans-serif" fontWeight="800" textAnchor="middle">N = 60</text>
      <text x={cx} y={cy + 8} fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="Inter,sans-serif" textAnchor="middle">ejecuciones</text>
      {/* legend */}
      {slices.map((s, i) => (
        <g key={i}>
          <rect x={380} y={120 + i * 50} width={14} height={14} fill={s.color} rx={3} />
          <text x={400} y={132 + i * 50} fill="rgba(255,255,255,0.7)" fontSize="10" fontFamily="Inter,sans-serif" fontWeight="700">{s.label}</text>
          <text x={400} y={146 + i * 50} fill="rgba(255,255,255,0.45)" fontSize="9" fontFamily="Inter,sans-serif">{(s.pct * 100).toFixed(1)}%</text>
        </g>
      ))}
      <text x={350} y={355} fill="#444" fontSize="9" textAnchor="middle" fontFamily="Inter,sans-serif" letterSpacing="0.08em">DISTRIBUCIÓN PROBABILÍSTICA</text>
    </svg>
  )
}

// ─── SVG: Probability bar for each question ──────────────────────────────────

function ProbBarViz({ items }: { items: { label: string; prob: number; color: string; formula: string }[] }) {
  return (
    <svg viewBox="0 0 800 380" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid meet">
      <text x={100} y={50} fill="rgba(255,255,255,0.25)" fontSize="10" fontFamily="Inter,sans-serif" fontWeight="800" letterSpacing="0.15em">PROBABILIDADES CALCULADAS</text>
      {items.map((item, i) => {
        const y = 120 + i * 115
        const BAR = 540
        const w = item.prob * BAR
        return (
          <g key={i}>
            <text x={100} y={y} fill="rgba(255,255,255,0.65)" fontSize="12" fontFamily="Inter,sans-serif" fontWeight="700">{item.label}</text>
            <text x={100} y={y + 20} fill="rgba(255,255,255,0.35)" fontSize="10" fontFamily="Inter,sans-serif">{item.formula}</text>
            <rect x={100} y={y + 35} width={BAR} height={20} fill="rgba(255,255,255,0.05)" rx={4} />
            <rect x={100} y={y + 35} width={w} height={20} fill={item.color} rx={4} opacity={0.85} />
            <text x={100 + w + 14} y={y + 50} fill={item.color} fontSize="14" fontFamily="Inter,sans-serif" fontWeight="900">{(item.prob * 100).toFixed(2)}%</text>
          </g>
        )
      })}
    </svg>
  )
}

// ─── Resolution steps ─────────────────────────────────────────────────────────

const resolution = (
  <>
    {/* ════════════════════════════════════════════════════════
        PASO 01 — CONSIGNA Y DATOS CRUDOS
        ════════════════════════════════════════════════════════ */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#08111a', position: 'relative', overflow: 'hidden' }}>
        <p className="pp-step-category">Enunciado del Problema</p>
        <svg viewBox="0 0 800 380" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid meet">
          {/* A data */}
          <text x={40} y={55} fill="rgba(255,255,255,0.22)" fontSize="8.5" fontFamily="Inter,sans-serif" fontWeight="800" letterSpacing="0.14em">ALGORITMO A</text>
          {dataA.map((v, i) => (
            <text key={i} x={40 + (i % 15) * 48} y={70 + (Math.floor(i / 15)) * 22}
              fill={v === 7 ? ACCENT_HEX : 'rgba(255,255,255,0.45)'} fontSize={v === 7 ? "12" : "10"}
              fontFamily="Inter,sans-serif" fontWeight={v === 7 ? "800" : "400"}>{v}</text>
          ))}
          <line x1={40} y1={120} x2={760} y2={120} stroke="#1a2a3a" strokeWidth="1" />
          {/* B data */}
          <text x={40} y={145} fill="rgba(255,255,255,0.22)" fontSize="8.5" fontFamily="Inter,sans-serif" fontWeight="800" letterSpacing="0.14em">ALGORITMO B</text>
          {dataB.map((v, i) => (
            <text key={i} x={40 + (i % 15) * 48} y={160 + (Math.floor(i / 15)) * 22}
              fill={v === 3 ? B_COLOR : 'rgba(255,255,255,0.45)'} fontSize={v === 3 ? "12" : "10"}
              fontFamily="Inter,sans-serif" fontWeight={v === 3 ? "800" : "400"}>{v}</text>
          ))}
          <line x1={40} y1={215} x2={760} y2={215} stroke="#1a2a3a" strokeWidth="1" />
          {/* summary callouts */}
          <text x={40} y={250} fill="rgba(255,255,255,0.22)" fontSize="8.5" fontFamily="Inter,sans-serif" fontWeight="800" letterSpacing="0.14em">TOTALES</text>
          <text x={40} y={272} fill="rgba(255,255,255,0.62)" fontSize="11.5" fontFamily="Inter,sans-serif">N = 60 ejecuciones  ·  Rango: [3, 12] s</text>
          <text x={40} y={295} fill={ACCENT_HEX} fontSize="11.5" fontFamily="Inter,sans-serif" fontWeight="700">Moda A = 7 s  ·  Moda B = 3 s</text>
        </svg>
      </div>
      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p>Un equipo de desarrollo probó dos algoritmos (A y B) registrando los tiempos de ejecución en segundos. Se recopilaron <strong>30 ejecuciones por algoritmo</strong> (60 en total). El objetivo es comparar su rendimiento y consistencia usando estadística descriptiva, inferencia estadística y probabilidad clásica.</p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">Paso 01</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Datos del Problema</h3></div>
        </div>
      </div>
    </div>

    {/* ════════════════════════════════════════════════════════
        PASO 02 — TABLA ESTADÍSTICA DESCRIPTIVA COMPLETA
        ════════════════════════════════════════════════════════ */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#070b12', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p className="pp-step-category">Métricas Resumen · Excel</p>
        <div style={{ width: '100%', height: '100%', overflow: 'auto', padding: '2.5rem 3.5rem 1.5rem' }}>
          <table className="pp-table" style={{ tableLayout: 'fixed' }}>
            <thead>
              <tr>
                <th style={{ width: '42%' }}>Métrica Estadística</th>
                <th style={{ width: '29%' }}>Algoritmo A</th>
                <th style={{ width: '29%' }}>Algoritmo B</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Media (Promedio)', '7,50 s', '5,30 s'],
                ['Mediana', '7,50 s', '4,50 s'],
                ['Moda', '7,00 s', '3,00 s'],
                ['Desviación Estándar', '1,96 s', '2,51 s'],
                ['Varianza de la Muestra', '3,84', '6,28'],
                ['Coeficiente de Asimetría', '0,00 (perfectamente simétrica)', '1,31 (asimetría positiva)'],
                ['Error Típico', '0,35 s', '0,45 s'],
                ['Rango (Mín / Máx)', '9,00 s  (3 s / 12 s)', '9,00 s  (3 s / 12 s)'],
                ['Cuenta (n)', '30 ejecuciones', '30 ejecuciones'],
              ].map(([m, a, b]) => (
                <tr key={m}>
                  <td style={{ fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>{m}</td>
                  <td style={{ color: 'rgba(163,192,228,0.9)' }}>{a}</td>
                  <td style={{ color: ACCENT_HEX }}>{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p>La tabla sintetiza las <strong>9 métricas clave</strong> obtenidas del procesamiento en Excel. La primera diferencia crítica: el Algoritmo B tiene una media 2,2 s inferior (5,30 vs 7,50), pero una desviación mayor (2,51 vs 1,96), revelando la tensión entre velocidad y previsibilidad.</p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">Paso 02</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Tabla Estadística Descriptiva</h3></div>
        </div>
      </div>
    </div>

    {/* ════════════════════════════════════════════════════════
        PASO 03 — CONSIGNA ESTADÍSTICA 1 & 2: MEDIA Y MODA
        ════════════════════════════════════════════════════════ */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#07101a', position: 'relative', overflow: 'hidden' }}>
        <p className="pp-step-category">Consignas 1 & 2 · Tendencia Central</p>
        <StatsBarsViz />
      </div>
      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p><strong>1. Media:</strong> A = <strong>7,50 s</strong> | B = <strong>5,30 s</strong>. El Algoritmo B tiene un menor costo esperado promedio.</p>
          <p><strong>2. Moda:</strong> En A (<strong>7 s</strong>) coincide con su media, indicando gran estabilidad. En B (<strong>3 s</strong>) está por debajo de su media, revelando que el promedio se infla por demoras atípicas.</p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">Paso 03</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Media y Moda</h3></div>
        </div>
      </div>
    </div>

    {/* ════════════════════════════════════════════════════════
        PASO 04 — CONSIGNA 3 & 4: MEDIANA Y VARIABILIDAD
        ════════════════════════════════════════════════════════ */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#080e18', position: 'relative', overflow: 'hidden' }}>
        <p className="pp-step-category">Consignas 3 & 4 · Mediana y Dispersión</p>
        <svg viewBox="0 0 800 380" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid meet">
          {/* Mediana */}

          <HBar y={50} val={7.5} max={12} color={A_COLOR} label="MEDIANA A" valLabel="7,50 s" />
          <HBar y={90} val={4.5} max={12} color={B_COLOR} label="MEDIANA B" valLabel="4,50 s" />
          <line x1={10} y1={125} x2={760} y2={125} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          {/* Desv estándar */}

          <HBar y={158} val={1.96} max={4} color={A_COLOR} label="DESV. A" valLabel="1,96 s" />
          <HBar y={196} val={2.51} max={4} color={B_COLOR} label="DESV. B" valLabel="2,51 s" />
          <line x1={10} y1={230} x2={760} y2={230} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          {/* Varianza */}

          <HBar y={260} val={3.84} max={8} color={A_COLOR} label="VARIANZA A" valLabel="3,84" />
          <HBar y={298} val={6.28} max={8} color={B_COLOR} label="VARIANZA B" valLabel="6,28" />
        </svg>
      </div>
      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p><strong>3. Mediana:</strong> En A coinciden media y mediana (<strong>7,50 s</strong>). En B, la mediana (<strong>4,50 s</strong>) es el valor más representativo, garantizando que el 50% de los casos terminan en ≤ 4,5 s.</p>
          <p><strong>4. Variabilidad:</strong> A es muy consistente (σ = <strong>1,96 s</strong>). B es más inestable (σ = <strong>2,51 s</strong>), dispersándose con mayor agresividad respecto a su centro.</p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">Paso 04</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Mediana y Dispersión</h3></div>
        </div>
      </div>
    </div>

    {/* ════════════════════════════════════════════════════════
        PASO 05 — CONSIGNAS 5, 6 & 7: COMPARACIÓN, CONFIABILIDAD, ASIMETRÍA
        ════════════════════════════════════════════════════════ */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#080c15', position: 'relative', overflow: 'hidden' }}>
        <p className="pp-step-category">Consignas 5, 6 & 7 · Comparación y Asimetría</p>
        <SymmetryViz />
      </div>
      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p><strong>5. Rendimiento:</strong> B es 30% más veloz (dif. <strong>2,20 s</strong> en medias, <strong>3,00 s</strong> en medianas).</p>
          <p><strong>6. Confiabilidad:</strong> A es el más seguro, sus tiempos rara vez se alejan de 7,5 s. B, aunque rápido, sufre demoras imprevistas.</p>
          <p><strong>7. Asimetría:</strong> A es perfectamente simétrica (<strong>0,00</strong>). B tiene "cola derecha" (<strong>1,31</strong>), reflejando picos ocasionales de lentitud.</p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">Paso 05</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Comparación y Asimetría</h3></div>
        </div>
      </div>
    </div>

    {/* ════════════════════════════════════════════════════════
        PASO 06 — CONSIGNA 8: PRUEBA t DE STUDENT (Inferencia)
        ════════════════════════════════════════════════════════ */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#0a0810', position: 'relative', overflow: 'hidden' }}>
        <p className="pp-step-category">Consigna 8 · Inferencia Estadística</p>
        <TTestViz />
      </div>
      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p><strong>8. Garantía Estadística:</strong> Mediante la <strong>Prueba t de Welch</strong> (α=0,05) se obtuvo un P-valor de <strong>0,00022</strong>, rechazando contundentemente la igualdad de medias.</p>
          <p>La ventaja del Algoritmo B es <strong>significativa al 95% de confianza</strong> y no se debe al azar muestral (respaldado por n=30).</p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">Paso 06</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Prueba t de Student</h3></div>
        </div>
      </div>
    </div>

    {/* ════════════════════════════════════════════════════════
        PASO 07 — TABLA DE CONTINGENCIA & DISTRIBUCIÓN (Base para probabilidad)
        ════════════════════════════════════════════════════════ */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#080d14', position: 'relative', overflow: 'hidden' }}>
        <p className="pp-step-category">Bloque B · Probabilidad — Contingencia y Distribución por Rangos</p>
        <div style={{ display: 'flex', width: '100%', height: '100%' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <ContingencyViz />
          </div>
          <div style={{ flex: 1, position: 'relative', borderLeft: '1px solid rgba(255,255,255,0.05)' }}>
            <DonutViz />
          </div>
        </div>
      </div>
      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p>Para estructurar los cálculos de probabilidad se construyó una <strong>matriz de frecuencias absolutas</strong> cruzando algoritmo × rango de tiempo crítico. Los tres rangos son: <strong>Menor a 5 s</strong>, <strong>Entre 5 y 7 s</strong> y <strong>Mayor a 7 s</strong>.</p>
          <p>Esto permite aplicar la <strong>Regla de Laplace</strong>. El gráfico muestra cómo se distribuyen las 60 ejecuciones: un 28,3% fue veloz, 35% medio y 36,7% lento.</p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">Paso 07</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Tabla de Contingencia</h3></div>
        </div>
      </div>
    </div>

    {/* ════════════════════════════════════════════════════════
        PASO 08 — PROBABILIDAD P1 & P2
        ════════════════════════════════════════════════════════ */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#080c18', position: 'relative', overflow: 'hidden' }}>
        <p className="pp-step-category">Probabilidad · Consignas 1 y 2</p>
        <ProbBarViz items={[
          { label: 'P1 — Algo. A, tiempo > 7 s', prob: 15 / 30, color: ACCENT_HEX, formula: '15 ÷ 30 = 0,5000' },
          { label: 'P2 — Algo. A y tiempo < 5 s', prob: 2 / 60, color: '#A8FF3E', formula: '2 ÷ 60 = 0,0333' },
        ]} />
      </div>
      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p><strong>P1:</strong> La probabilidad de que una ejecución de A dure más de 7 s es <strong>15/30 (50%)</strong>. La mitad de A supera este umbral debido a su distribución simétrica (media 7,5 s).</p>
          <p><strong>P2:</strong> La probabilidad conjunta de ser Algoritmo A Y durar menos de 5 s es <strong>2/60 (3,33%)</strong>. Esto confirma que A rara vez termina rápido.</p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">Paso 08</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Probabilidades 1 & 2</h3></div>
        </div>
      </div>
    </div>

    {/* ════════════════════════════════════════════════════════
        PASO 09 — PROBABILIDAD P3 & P4
        ════════════════════════════════════════════════════════ */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#090d16', position: 'relative', overflow: 'hidden' }}>
        <p className="pp-step-category">Probabilidad · Consignas 3 y 4</p>
        <ProbBarViz items={[
          { label: 'P3: Tiempo > 2 s', prob: 60 / 60, color: '#F5E642', formula: '60 ÷ 60 = 1,0000' },
          { label: 'P4: Tiempo entre 3 y 5 s', prob: 23 / 60, color: '#FF6B4A', formula: '23 ÷ 60 = 0,3833' },
        ]} />
      </div>
      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p><strong>P3: Evento Seguro:</strong> La probabilidad de superar los 2 s es <strong>60/60 (100%)</strong>. El mínimo registrado fue 3 s, por lo que este escenario abarca todo el espacio muestral disponible.</p>
          <p><strong>P4: Entre 3 y 5 s:</strong> Sumando casos de A (4) y de B (19) obtenemos un total de <strong>23/60 (38,33%)</strong> para este rango en la distribución combinada.</p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">Paso 09</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Probabilidades 3 & 4</h3></div>
        </div>
      </div>
    </div>

    {/* ════════════════════════════════════════════════════════
        PASO 10 — PROBABILIDAD P5 & P6
        ════════════════════════════════════════════════════════ */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#08101a', position: 'relative', overflow: 'hidden' }}>
        <p className="pp-step-category">Probabilidad · Consignas 5 y 6</p>
        <svg viewBox="0 0 800 380" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid meet">
          {/* P5 bar */}
          <text x={30} y={48} fill="rgba(255,255,255,0.25)" fontSize="8" fontFamily="Inter,sans-serif" fontWeight="800" letterSpacing="0.12em">P5 — ALGORITMO A, TIEMPO ENTRE 1 Y 7 s</text>
          <text x={30} y={64} fill="rgba(255,255,255,0.3)" fontSize="8" fontFamily="Inter,sans-serif">15 ÷ 30</text>
          <rect x={30} y={72} width={500} height={18} fill="rgba(255,255,255,0.05)" rx={3} />
          <rect x={30} y={72} width={250} height={18} fill={A_COLOR} rx={3} opacity={0.9} />
          <text x={286} y={85} fill={ACCENT_HEX} fontSize="12" fontFamily="Inter,sans-serif" fontWeight="900">50,00%</text>
          <line x1={30} y1={106} x2={770} y2={106} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          {/* P6 diagram — eventos mutuamente excluyentes */}
          <text x={30} y={128} fill="rgba(255,255,255,0.25)" fontSize="8" fontFamily="Inter,sans-serif" fontWeight="800" letterSpacing="0.12em">P6 — EVENTOS MUTUAMENTE EXCLUYENTES</text>
          {/* Círculo A > 7 */}
          <circle cx={200} cy={245} r={80} fill="rgba(231,114,144,0.12)" stroke={ACCENT_HEX} strokeWidth="1.5" />
          <text x={200} y={230} fill={ACCENT_HEX} fontSize="11" fontFamily="Inter,sans-serif" fontWeight="800" textAnchor="middle">Evento A</text>
          <text x={200} y={248} fill="rgba(255,255,255,0.6)" fontSize="10" fontFamily="Inter,sans-serif" textAnchor="middle">tiempo {">"} 7 s</text>
          <text x={200} y={264} fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="Inter,sans-serif" textAnchor="middle">22 casos</text>
          {/* Gap: valor 7 */}
          <text x={385} y={225} fill="rgba(255,255,255,0.25)" fontSize="9" fontFamily="Inter,sans-serif" textAnchor="middle">valor = 7 s</text>
          <line x1={300} y1={245} x2={470} y2={245} stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4,4" />
          {/* Círculo B < 7 */}
          <circle cx={570} cy={245} r={80} fill="rgba(255,107,74,0.12)" stroke="#FF6B4A" strokeWidth="1.5" />
          <text x={570} y={230} fill="#FF6B4A" fontSize="11" fontFamily="Inter,sans-serif" fontWeight="800" textAnchor="middle">Evento B</text>
          <text x={570} y={248} fill="rgba(255,255,255,0.6)" fontSize="10" fontFamily="Inter,sans-serif" textAnchor="middle">tiempo {"<"} 7 s</text>
          <text x={570} y={264} fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="Inter,sans-serif" textAnchor="middle">31 casos</text>
          {/* P(A ∩ B) = 0 */}
          <text x={385} y={310} fill="rgba(255,255,255,0.5)" fontSize="11" fontFamily="Inter,sans-serif" fontWeight="800" textAnchor="middle">P(A ∩ B) = 0</text>
        </svg>
      </div>
      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p><strong>P5: A entre 1 y 7 s:</strong> Se contabilizan 15 casos, resultando en <strong>15/30 (50%)</strong>. Exactamente la mitad de las ejecuciones de A finalizan en 7 s o menos.</p>
          <p><strong>P6: Mutuamente Excluyentes:</strong> Una ejecución no puede durar más Y menos de 7 s a la vez. Su intersección es nula: <strong>P(A ∩ B) = 0</strong>. El valor 7,00 s queda excluido, separando ambos rangos de forma estricta.</p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">Paso 10</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Probabilidades 5 & 6</h3></div>
        </div>
      </div>
    </div>

    {/* ════════════════════════════════════════════════════════
        PASO 11 — PROBABILIDAD CONDICIONAL P7
        ════════════════════════════════════════════════════════ */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#09101d', position: 'relative', overflow: 'hidden' }}>
        <p className="pp-step-category">Probabilidad Condicional · Consigna 7</p>
        <svg viewBox="0 0 800 380" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid meet">
          {/* Fila "< 5s" universe */}
          <text x={30} y={38} fill="rgba(255,255,255,0.2)" fontSize="8" fontFamily="Inter,sans-serif" fontWeight="800" letterSpacing="0.15em">P7 — P(Algoritmo B | tiempo {"<"} 5 s)</text>
          <text x={30} y={56} fill="rgba(255,255,255,0.35)" fontSize="9" fontFamily="Inter,sans-serif">Universo: 17 casos ({"<"} 5 s)</text>
          {/* 17 circles total — 2 A + 15 B */}
          {Array.from({ length: 17 }, (_, i) => {
            const isA = i < 2
            const row = Math.floor(i / 9)
            const col = i % 9
            return (
              <g key={i}>
                <circle cx={60 + col * 70} cy={110 + row * 70} r={26} fill={isA ? 'rgba(30,58,95,0.9)' : 'rgba(231,114,144,0.85)'} stroke={isA ? A_COLOR : ACCENT_HEX} strokeWidth="1.5" />
                <text x={60 + col * 70} y={114 + row * 70} fill="#fff" fontSize="9" fontFamily="Inter,sans-serif" fontWeight="800" textAnchor="middle">{isA ? 'A' : 'B'}</text>
              </g>
            )
          })}
          {/* formula */}
          <rect x={30} y={265} width={740} height={90} fill="rgba(231,114,144,0.07)" rx={8} stroke="rgba(231,114,144,0.2)" strokeWidth="1" />
          <text x={400} y={292} fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="Inter,sans-serif" textAnchor="middle">P(B | tiempo {"<"} 5s) = (15/60) / (17/60) = 15/17</text>
          <text x={400} y={320} fill={ACCENT_HEX} fontSize="18" fontFamily="Inter,sans-serif" fontWeight="900" textAnchor="middle">88,24%</text>
        </svg>
      </div>
      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p><strong>P7: Probabilidad Condicional:</strong> El universo se reduce estrictamente a las 17 ejecuciones menores a 5 s. Aplicando el teorema: <strong>P(B | {"<"} 5 s) = 15/17 (88,24%)</strong>.</p>
          <p>Si una ejecución finaliza velozmente, existe un 88% de probabilidad de que pertenezca al Algoritmo B, ratificando su marcada ventaja para tiempos cortos.</p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">Paso 11</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Probabilidad Condicional P7</h3></div>
        </div>
      </div>
    </div>

    {/* ════════════════════════════════════════════════════════
        PASO 12 — INTERPRETACIÓN Y CONCLUSIÓN FINAL
        ════════════════════════════════════════════════════════ */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#040710', position: 'relative', overflow: 'hidden' }}>
        <p className="pp-step-category">Conclusión Final · Trade-off de Ingeniería</p>
        <svg viewBox="0 0 800 390" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="gradA" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={A_COLOR} stopOpacity="0.18" />
              <stop offset="100%" stopColor={A_COLOR} stopOpacity="0.04" />
            </linearGradient>
            <linearGradient id="gradB" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={B_COLOR} stopOpacity="0.22" />
              <stop offset="100%" stopColor={B_COLOR} stopOpacity="0.04" />
            </linearGradient>
            <linearGradient id="gradVerdict" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={A_COLOR} stopOpacity="0.15" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.05" />
              <stop offset="100%" stopColor={B_COLOR} stopOpacity="0.15" />
            </linearGradient>
          </defs>

          {/* ── Header label ── */}
          <text x={400} y={26} fill="rgba(255,255,255,0.18)" fontSize="8" fontFamily="Inter,sans-serif" fontWeight="800" letterSpacing="0.2em" textAnchor="middle">ANÁLISIS TRADE-OFF · DECISIÓN FINAL</text>

          {/* ══ PANEL A ══ */}
          <rect x={28} y={38} width={335} height={248} fill="url(#gradA)" rx={10} stroke={A_COLOR} strokeWidth="1" strokeOpacity="0.35" />
          {/* top accent line */}
          <rect x={28} y={38} width={335} height={4} fill={A_COLOR} rx={2} opacity={0.7} />

          {/* Algorithm A header */}
          <text x={196} y={72} fill={A_COLOR} fontSize="13" fontFamily="Inter,sans-serif" fontWeight="900" textAnchor="middle" letterSpacing="0.05em">ALGORITMO A</text>
          <text x={196} y={86} fill="rgba(255,255,255,0.3)" fontSize="8.5" fontFamily="Inter,sans-serif" textAnchor="middle" letterSpacing="0.1em">ESTABLE · PREDECIBLE</text>

          {/* Score dots A — 4 pros, 2 cons → score 4/6 */}
          {[0, 1, 2, 3, 4, 5].map(i => (
            <circle key={i} cx={162 + i * 14} cy={98} r={4}
              fill={i < 4 ? A_COLOR : 'rgba(255,255,255,0.1)'}
              opacity={i < 4 ? 0.85 : 1} />
          ))}

          {/* Pros */}
          {[
            'Distribución perfectamente simétrica',
            'Desviación estándar estable: 1,96 s',
            'Coef. asimetría = 0,00 · sin picos',
            'Previsibilidad para SLAs críticos',
          ].map((t, i) => (
            <g key={i}>
              <circle cx={50} cy={122 + i * 28} r={3.5} fill={A_COLOR} opacity={0.8} />
              <text x={62} y={126 + i * 28} fill="rgba(255,255,255,0.65)" fontSize="9.5" fontFamily="Inter,sans-serif">{t}</text>
            </g>
          ))}

          {/* ══ PANEL B ══ */}
          <rect x={437} y={38} width={335} height={248} fill="url(#gradB)" rx={10} stroke={B_COLOR} strokeWidth="1" strokeOpacity="0.4" />
          <rect x={437} y={38} width={335} height={4} fill={B_COLOR} rx={2} opacity={0.75} />

          <text x={605} y={72} fill={B_COLOR} fontSize="13" fontFamily="Inter,sans-serif" fontWeight="900" textAnchor="middle" letterSpacing="0.05em">ALGORITMO B</text>
          <text x={605} y={86} fill="rgba(255,255,255,0.3)" fontSize="8.5" fontFamily="Inter,sans-serif" textAnchor="middle" letterSpacing="0.1em">VELOZ · EFICIENTE</text>

          {/* Score dots B — 4 pros → 4/6 */}
          {[0, 1, 2, 3, 4, 5].map(i => (
            <circle key={i} cx={571 + i * 14} cy={98} r={4}
              fill={i < 4 ? B_COLOR : 'rgba(255,255,255,0.1)'}
              opacity={i < 4 ? 0.9 : 1} />
          ))}

          {/* Pros */}
          {[
            'Media 29% más veloz: 5,30 s',
            'Mediana 4,50 s — 50% termina rápido',
            '88% ejecuciones cortas son B',
            'P-valor 0,00022 · ventaja estadística',
          ].map((t, i) => (
            <g key={i}>
              <circle cx={459} cy={122 + i * 28} r={3.5} fill={B_COLOR} opacity={0.85} />
              <text x={471} y={126 + i * 28} fill="rgba(255,255,255,0.65)" fontSize="9.5" fontFamily="Inter,sans-serif">{t}</text>
            </g>
          ))}


          {/* ══ VS divider ══ */}
          <line x1={400} y1={48} x2={400} y2={282} stroke="rgba(255,255,255,0.07)" strokeWidth="1" strokeDasharray="4,4" />
          <circle cx={400} cy={163} r={18} fill="#0a0f1c" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
          <text x={400} y={169} fill="rgba(255,255,255,0.3)" fontSize="11" fontFamily="Inter,sans-serif" fontWeight="900" textAnchor="middle">VS</text>
        </svg>
      </div>
      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p>El Algoritmo B es más veloz en promedio (P-valor = 0,00022 confirma significancia estadística al 95%), ideal para servicios de cara al usuario final o cloud donde importa maximizar velocidad. El Algoritmo A es más predecible y libre de picos, idóneo para sistemas de tiempo real crítico (aviónica, telecomunicaciones, banca transaccional) donde la estabilidad supera la velocidad promedio.</p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">Paso 12</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Conclusión Final</h3></div>
        </div>
      </div>
    </div>
  </>
)

// ─── Page export ──────────────────────────────────────────────────────────────

export default function Problem2() {
  return (
    <ProblemPage
      number="02"
      subject="Estadística"
      title="Comparar Algoritmos"
      question="¿Cómo comparamos dos algoritmos para determinar cuál ofrece un mejor rendimiento y consistencia en sus tiempos de respuesta usando estadística e inferencia?"
      heroBackground="#1a2433"
      accent={ACCENT}
      theoryItems={theoryItems}
      approach={approach}
      resolution={resolution}
    />
  )
}
