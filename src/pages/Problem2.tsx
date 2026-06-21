import ProblemPage from '../components/ProblemPage/ProblemPage'

const ACCENT = 'var(--accent-pink)'
const C_PINK = 'var(--accent-pink)'

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
  'Núcleo Transaccional',
  'Módulo Analítico',
  'Simulador de Escenarios',
  'API Cloud',
  'Bases de Datos',
]

const approach = (
  <>
    <p>
      El sistema está estructurado sobre <strong>dos módulos centrales</strong> que cubren necesidades operativas y estratégicas diferenciadas. El primero es el núcleo transaccional: el "motor del día a día" que permite registro concurrente de ventas, actualización automática de stock en tiempo real, y administración de cuentas corrientes por cliente.
    </p>
    <p>
      El segundo es el módulo analítico-gerencial: el "cerebro estratégico" que provee un dashboard de métricas en tiempo real, predicción matemática de quiebres de stock usando análisis histórico, y un simulador de escenarios empresariales (análisis "what-if") para anticipar impactos financieros antes de implementar cambios.
    </p>
    <p>
      <strong>Limitaciones deliberadas:</strong> El sistema NO incluye integración automática con ARCA (ex AFIP) para validación de facturas en tiempo real, NO realiza compras automáticas a proveedores, y NO cuenta con portal E-commerce para venta final al público. Estas restricciones mantienen el foco en control interno y decisiones gerenciales.
    </p>
  </>
)

// ─── SVG: Stats comparison bars (unused visualization) ──────────────────────────

// function StatsBarsViz() {
//   // Media, Mediana, Moda for A and B
//   const stats = [
//     { label: 'Media', a: 7.50, b: 5.30, max: 12 },
//     { label: 'Mediana', a: 7.50, b: 4.50, max: 12 },
//     { label: 'Moda', a: 7.00, b: 3.00, max: 12 },
//     { label: 'Desv. Est.', a: 1.96, b: 2.51, max: 4 },
//     { label: 'Error Típ.', a: 0.35, b: 0.45, max: 1 },
//   ]
//   const BAR_W = 260
//   return (
//     <svg viewBox="0 0 800 380" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid meet">
//       <text x={30} y={38} fill="rgba(255,255,255,0.25)" fontSize="9" fontFamily="Inter,sans-serif" fontWeight="800" letterSpacing="0.15em">MÉTRICAS ESTADÍSTICAS</text>
//       {stats.map((s, i) => {
//         const y = 60 + i * 58
//         const wA = (s.a / s.max) * BAR_W
//         const wB = (s.b / s.max) * BAR_W
//         return (
//           <g key={s.label}>
//             <text x={30} y={y + 12} fill="rgba(255,255,255,0.6)" fontSize="9" fontFamily="Inter,sans-serif" fontWeight="700" letterSpacing="0.06em">{s.label.toUpperCase()}</text>
//             {/* A bar */}
//             <rect x={130} y={y} width={BAR_W} height={14} fill="rgba(255,255,255,0.05)" rx={3} />
//             <rect x={130} y={y} width={wA} height={14} fill={A_COLOR} rx={3} opacity={0.9} />
//             <text x={130 + wA + 6} y={y + 11} fill="rgba(255,255,255,0.7)" fontSize="9" fontFamily="Inter,sans-serif" fontWeight="700">{s.a}</text>
//             {/* B bar */}
//             <rect x={430} y={y} width={BAR_W} height={14} fill="rgba(255,255,255,0.05)" rx={3} />
//             <rect x={430} y={y} width={wB * (BAR_W / 260)} height={14} fill={B_COLOR} rx={3} opacity={0.85} />
//             <text x={430 + wB * (BAR_W / 260) + 6} y={y + 11} fill={B_COLOR} fontSize="9" fontFamily="Inter,sans-serif" fontWeight="700">{s.b}</text>
//             {/* labels */}
//             <text x={120} y={y + 11} fill={A_COLOR} fontSize="8" fontFamily="Inter,sans-serif" fontWeight="800" textAnchor="end">A</text>
//             <text x={420} y={y + 11} fill={B_COLOR} fontSize="8" fontFamily="Inter,sans-serif" fontWeight="800" textAnchor="end">B</text>
//           </g>
//         )
//       })}
//     </svg>
//   )
// }

// ─── Resolution steps ─────────────────────────────────────────────────────────

const resolution = (
  <>
    {/* ════════════════════════════════════════════════════════
        PASO 01 — NÚCLEO TRANSACCIONAL
        ════════════════════════════════════════════════════════ */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#0a0a0a', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '2rem', flex: '0 0 75%' }}>
        <p className="pp-step-category">Módulo 1: Operaciones Centrales</p>
        
        <ul style={{ marginLeft: '1.5rem', lineHeight: '1.8', color: 'rgba(255,255,255,0.7)', fontSize: '0.9em', marginTop: '1rem', fontFamily: 'Inter, sans-serif' }}>
          <li><strong style={{ color: C_PINK }}>Gestión de Ventas:</strong> Registro de cada venta con cliente, productos, cantidad y fecha/hora</li>
          <li><strong style={{ color: C_PINK }}>Actualización de Stock:</strong> Decremento automático del inventario por sucursal en tiempo real</li>
          <li><strong style={{ color: C_PINK }}>Cuentas Corrientes:</strong> Saldo actualizado después de cada transacción</li>
          <li><strong style={{ color: C_PINK }}>Concurrencia:</strong> Múltiples usuarios vendiendo simultáneamente en sucursales diferentes</li>
        </ul>
        <div style={{
          background: 'rgba(217, 119, 144, 0.1)',
          border: `2px solid ${C_PINK}`,
          borderRadius: '8px',
          padding: '1rem',
          marginTop: '1.5rem',
          fontFamily: 'monospace',
          fontSize: '0.9em',
          color: '#fff'
        }}>
          Flujo: Venta Creada → Stock Decrementado → Cuenta Corriente Actualizada ✓
        </div>
      </div>
      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p>
            Garantiza el registro concurrente de transacciones comerciales sin degradación de performance.
          </p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">1</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Núcleo Transaccional</h3></div>
        </div>
      </div>
    </div>

    {/* ════════════════════════════════════════════════════════
        PASO 02 — MÓDULO ANALÍTICO
        ════════════════════════════════════════════════════════ */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#0a0a0a', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '2rem', flex: '0 0 75%' }}>
        <p className="pp-step-category">Módulo 2: Inteligencia Empresarial</p>
        
        <ul style={{ marginLeft: '1.5rem', lineHeight: '1.8', color: 'rgba(255,255,255,0.7)', fontSize: '0.9em', marginTop: '1rem', fontFamily: 'Inter, sans-serif' }}>
          <li><strong style={{ color: C_PINK }}>Dashboard en Tiempo Real:</strong> KPIs de ventas, stock por sucursal, clientes principales</li>
          <li><strong style={{ color: C_PINK }}>Predicción de Quiebres:</strong> Análisis histórico + umbral de reorden automático</li>
          <li><strong style={{ color: C_PINK }}>Simulador What-If:</strong> Proyecta escenarios (ej: "Si subo 10% el precio, ¿impacto en ventas?")</li>
          <li><strong style={{ color: C_PINK }}>Alertas Inteligentes:</strong> Notificaciones de productos críticos y anomalías</li>
        </ul>
        <div style={{
          background: 'rgba(217, 119, 144, 0.1)',
          border: `2px solid ${C_PINK}`,
          borderRadius: '8px',
          padding: '1rem',
          marginTop: '1.5rem',
          fontFamily: 'monospace',
          fontSize: '0.9em',
          color: '#fff'
        }}>
          Dashboard: Ventas Hoy | Stock Crítico | Top 10 Productos | Proyección 30 días
        </div>
      </div>
      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p>
            Transforma datos transaccionales en decisiones estratégicas, permitiendo a la gerencia anticiparse a los escenarios.
          </p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">2</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Análisis y Simulación</h3></div>
        </div>
      </div>
    </div>

    {/* ════════════════════════════════════════════════════════
        PASO 03 — LIMITACIONES DELIBERADAS
        ════════════════════════════════════════════════════════ */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#0a0a0a', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '2rem', flex: '0 0 75%' }}>
        <p className="pp-step-category">Definición de Alcances</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
          <div style={{
            background: 'rgba(217, 119, 144, 0.05)',
            border: `1px solid ${C_PINK}`,
            borderRadius: '6px',
            padding: '1.2rem'
          }}>
            <strong style={{ color: C_PINK, fontFamily: 'Inter, sans-serif' }}>❌ Sin Integración ARCA</strong>
            <p style={{ fontSize: '0.85em', marginTop: '0.8rem', color: 'rgba(255,255,255,0.7)', fontFamily: 'Inter, sans-serif' }}>
              No valida facturas contra servidores AFIP en tiempo real. Control manual posterior.
            </p>
          </div>
          
          <div style={{
            background: 'rgba(217, 119, 144, 0.05)',
            border: `1px solid ${C_PINK}`,
            borderRadius: '6px',
            padding: '1.2rem'
          }}>
            <strong style={{ color: C_PINK, fontFamily: 'Inter, sans-serif' }}>❌ Sin Compras Automáticas</strong>
            <p style={{ fontSize: '0.85em', marginTop: '0.8rem', color: 'rgba(255,255,255,0.7)', fontFamily: 'Inter, sans-serif' }}>
              No genera órdenes de compra automáticas a proveedores. Decisión manual del supervisor.
            </p>
          </div>
          
          <div style={{
            background: 'rgba(217, 119, 144, 0.05)',
            border: `1px solid ${C_PINK}`,
            borderRadius: '6px',
            padding: '1.2rem',
            gridColumn: '1 / -1'
          }}>
            <strong style={{ color: C_PINK, fontFamily: 'Inter, sans-serif' }}>❌ Sin E-Commerce Público</strong>
            <p style={{ fontSize: '0.85em', marginTop: '0.8rem', color: 'rgba(255,255,255,0.7)', fontFamily: 'Inter, sans-serif' }}>
              No hay tienda online visible al público. Es herramienta B2B pura (solo usuarios internos y clientes B2B).
            </p>
          </div>
        </div>
      </div>
      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p>
            Estas restricciones son <strong>deliberadas</strong>, no limitaciones técnicas. Simplifican el prototipo y mantienen el foco en control interno y decisiones empresariales (B2B).
          </p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">3</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">¿Qué NO incluye el sistema?</h3></div>
        </div>
      </div>
    </div>
  </>
)

export default function Problem2() {
  return (
    <ProblemPage
      number="02"
      subject="Scope"
      title="Alcances y Límites"
      question="¿Cuáles son los módulos centrales del sistema y qué deliberadamente no incluye?"
      accent={ACCENT}
      theoryItems={theoryItems}
      approach={approach}
      resolution={resolution}
    />
  )
}

