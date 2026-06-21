import ProblemPage from '../components/ProblemPage/ProblemPage'

const ACCENT = 'var(--accent-orange)'

const theoryItems = [
  'Herramienta Integral',
  'Gestión de Ventas',
  'Control de Inventario',
  'Análisis de Métricas',
  'Decisiones Estratégicas',
]

const approach = (
  <>
    <p>
      El sistema se ha desarrollado como respuesta integral a las necesidades operativas y estratégicas de la empresa. La solución combina tres pilares fundamentales: un <strong>núcleo transaccional</strong> para el "día a día", un <strong>módulo analítico</strong> para visualizar el estado actual, y un <strong>simulador de escenarios</strong> para la toma de decisiones anticipadas.
    </p>
    <p>
      Faro registra ventas en tiempo real, actualiza automáticamente el stock en cada sucursal, gestiona cuentas corrientes de clientes, y proporciona un motor de predicciones matemáticas que estima cuándo agotaremos inventario. Esto permite a la gerencia simular "¿qué pasaría si...?" y fundamentar decisiones sobre precios, stock y rentabilidad.
    </p>
  </>
)

const resolution = (
  <>
    {/* Módulo 1 */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#0a0a0a', position: 'relative' }}>
        <p className="pp-step-category">Núcleo Transaccional</p>
        <svg
          viewBox="0 0 800 380"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <style>{`
              @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
              @keyframes popIn { from { transform: scale(0.7); opacity: 0; } to { transform: scale(1); opacity: 1; } }
              .box-1 { opacity: 0; animation: fadeSlideUp 0.7s ease forwards 0.2s; }
              .box-2 { opacity: 0; animation: fadeSlideUp 0.7s ease forwards 0.4s; }
              .box-3 { opacity: 0; animation: fadeSlideUp 0.7s ease forwards 0.6s; }
              .arrow-1 { opacity: 0; animation: fadeSlideUp 0.7s ease forwards 0.5s; }
              .arrow-2 { opacity: 0; animation: fadeSlideUp 0.7s ease forwards 0.7s; }
            `}</style>
          </defs>

          {/* Title */}
          <text x={400} y={35} fill="rgba(255,255,255,0.7)" fontSize="13" fontWeight="700" textAnchor="middle" fontFamily="Inter,sans-serif" letterSpacing="0.1em">OPERACIONES CONCURRENTES EN TIEMPO REAL</text>

          {/* Box 1: Sales Registration */}
          <g className="box-1">
            <rect x={50} y={80} width={180} height={120} fill="rgba(233, 93, 53, 0.12)" rx="6" stroke="var(--accent-orange)" strokeWidth="2" />
            <text x={140} y={110} fill="var(--accent-orange)" fontSize="14" fontWeight="700" textAnchor="middle" fontFamily="Inter,sans-serif">Registro de Ventas</text>
            <text x={140} y={130} fill="rgba(255,255,255,0.5)" fontSize="11" textAnchor="middle" fontFamily="Inter,sans-serif">• Cargar productos</text>
            <text x={140} y={145} fill="rgba(255,255,255,0.5)" fontSize="11" textAnchor="middle" fontFamily="Inter,sans-serif">• Crear transacciones</text>
            <text x={140} y={160} fill="rgba(255,255,255,0.5)" fontSize="11" textAnchor="middle" fontFamily="Inter,sans-serif">• Emitir facturas</text>
            <text x={140} y={180} fill="var(--accent-orange)" fontSize="10" fontWeight="600" textAnchor="middle" fontFamily="Inter,sans-serif">(CU01, CU02)</text>
          </g>

          {/* Arrow 1 */}
          <g className="arrow-1">
            <line x1={230} y1={140} x2={310} y2={140} stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
            <polygon points="320,140 310,135 310,145" fill="rgba(255,255,255,0.3)" />
          </g>

          {/* Box 2: Inventory Update */}
          <g className="box-2">
            <rect x={310} y={80} width={180} height={120} fill="rgba(168, 255, 62, 0.12)" rx="6" stroke="var(--accent-sage)" strokeWidth="2" />
            <text x={400} y={110} fill="var(--accent-sage)" fontSize="14" fontWeight="700" textAnchor="middle" fontFamily="Inter,sans-serif">Stock Actualizado</text>
            <text x={400} y={130} fill="rgba(255,255,255,0.5)" fontSize="11" textAnchor="middle" fontFamily="Inter,sans-serif">• Reducir cantidades</text>
            <text x={400} y={145} fill="rgba(255,255,255,0.5)" fontSize="11" textAnchor="middle" fontFamily="Inter,sans-serif">• Por sucursal</text>
            <text x={400} y={160} fill="rgba(255,255,255,0.5)" fontSize="11" textAnchor="middle" fontFamily="Inter,sans-serif">• En tiempo real</text>
            <text x={400} y={180} fill="var(--accent-sage)" fontSize="10" fontWeight="600" textAnchor="middle" fontFamily="Inter,sans-serif">(Sync automático)</text>
          </g>

          {/* Arrow 2 */}
          <g className="arrow-2">
            <line x1={490} y1={140} x2={570} y2={140} stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
            <polygon points="580,140 570,135 570,145" fill="rgba(255,255,255,0.3)" />
          </g>

          {/* Box 3: Accounts Management */}
          <g className="box-3">
            <rect x={570} y={80} width={180} height={120} fill="rgba(255, 107, 107, 0.12)" rx="6" stroke="var(--accent-pink)" strokeWidth="2" />
            <text x={660} y={110} fill="var(--accent-pink)" fontSize="14" fontWeight="700" textAnchor="middle" fontFamily="Inter,sans-serif">Cuentas Corrientes</text>
            <text x={660} y={130} fill="rgba(255,255,255,0.5)" fontSize="11" textAnchor="middle" fontFamily="Inter,sans-serif">• Saldos de clientes</text>
            <text x={660} y={145} fill="rgba(255,255,255,0.5)" fontSize="11" textAnchor="middle" fontFamily="Inter,sans-serif">• Límites de crédito</text>
            <text x={660} y={160} fill="rgba(255,255,255,0.5)" fontSize="11" textAnchor="middle" fontFamily="Inter,sans-serif">• Registrar pagos</text>
            <text x={660} y={180} fill="var(--accent-pink)" fontSize="10" fontWeight="600" textAnchor="middle" fontFamily="Inter,sans-serif">(CU04)</text>
          </g>

          {/* Bottom annotation */}
          <text x={400} y={330} fill="rgba(255,255,255,0.4)" fontSize="11" textAnchor="middle" fontFamily="Inter,sans-serif" letterSpacing="0.05em">
            El núcleo garantiza consistencia transaccional y actualización instantánea en todas las sucursales
          </text>
        </svg>
      </div>
      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p>
            El núcleo transaccional es el "motor del día a día". Opera en tres capas: registro de ventas con cargas concurrentes de productos, actualización automática e instantánea del stock por sucursal, y administración de cuentas corrientes con límites de crédito personalizados por cliente. Todo esto sincroniza en tiempo real sobre la base de datos central en Cloud.
          </p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">1</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Operaciones Concurrentes</h3></div>
        </div>
      </div>
    </div>

    {/* Módulo 2 */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#0a0a0a', position: 'relative' }}>
        <p className="pp-step-category">Módulo Analítico</p>
        <svg
          viewBox="0 0 800 380"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <style>{`
              @keyframes expandBar { from { height: 0; opacity: 0; } to { height: var(--bar-h); opacity: 1; } }
              .bar-1 { opacity: 0; animation: expandBar 0.6s ease forwards 0.3s; --bar-h: 120px; }
              .bar-2 { opacity: 0; animation: expandBar 0.6s ease forwards 0.5s; --bar-h: 160px; }
              .bar-3 { opacity: 0; animation: expandBar 0.6s ease forwards 0.7s; --bar-h: 80px; }
            `}</style>
          </defs>

          {/* Title */}
          <text x={400} y={35} fill="rgba(255,255,255,0.7)" fontSize="13" fontWeight="700" textAnchor="middle" fontFamily="Inter,sans-serif" letterSpacing="0.1em">DASHBOARD DE MÉTRICAS EN TIEMPO REAL</text>

          {/* Dashboard bars */}
          <g className="bar-1">
            <rect x={120} y={200} width={80} height={120} fill="var(--accent-orange)" opacity="0.85" rx="4" />
            <text x={160} y={240} fill="rgba(255,255,255,0.8)" fontSize="18" fontWeight="700" textAnchor="middle" fontFamily="Inter,sans-serif">$42.5k</text>
            <text x={160} y={265} fill="rgba(255,255,255,0.5)" fontSize="10" textAnchor="middle" fontFamily="Inter,sans-serif">Ventas Hoy</text>
          </g>

          <g className="bar-2">
            <rect x={330} y={160} width={80} height={160} fill="var(--accent-sage)" opacity="0.85" rx="4" />
            <text x={370} y={245} fill="rgba(255,255,255,0.8)" fontSize="18" fontWeight="700" textAnchor="middle" fontFamily="Inter,sans-serif">12k</text>
            <text x={370} y={270} fill="rgba(255,255,255,0.5)" fontSize="10" textAnchor="middle" fontFamily="Inter,sans-serif">Stock Bajo</text>
          </g>

          <g className="bar-3">
            <rect x={540} y={240} width={80} height={80} fill="var(--accent-pink)" opacity="0.85" rx="4" />
            <text x={580} y={280} fill="rgba(255,255,255,0.8)" fontSize="18" fontWeight="700" textAnchor="middle" fontFamily="Inter,sans-serif">3</text>
            <text x={580} y={305} fill="rgba(255,255,255,0.5)" fontSize="10" textAnchor="middle" fontFamily="Inter,sans-serif">Alertas</text>
          </g>

          <text x={400} y={330} fill="rgba(255,255,255,0.4)" fontSize="11" textAnchor="middle" fontFamily="Inter,sans-serif" letterSpacing="0.05em">
            Indicadores clave accesibles en tiempo real para la toma de decisiones inmediata
          </text>
        </svg>
      </div>
      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p>
            El módulo analítico es el "cerebro estratégico". Proporciona un dashboard con métricas actualizadas en tiempo real: ventas del día, estado del inventario por sucursal, cuentas morosas, y alertas de quiebre de stock. Los supervisores visualizan el estado operativo actual y pueden tomar decisiones sobre precios, promociones y reorden.
          </p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">2</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Visualización Analítica</h3></div>
        </div>
      </div>
    </div>

    {/* Módulo 3 */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#0a0a0a', position: 'relative' }}>
        <p className="pp-step-category">Simulador de Escenarios (What-If)</p>
        <svg
          viewBox="0 0 800 380"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <style>{`
              @keyframes slideInLeft { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
              @keyframes slideInRight { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
              .scenario-left { opacity: 0; animation: slideInLeft 0.7s ease forwards 0.3s; }
              .scenario-right { opacity: 0; animation: slideInRight 0.7s ease forwards 0.5s; }
            `}</style>
          </defs>

          {/* Title */}
          <text x={400} y={35} fill="rgba(255,255,255,0.7)" fontSize="13" fontWeight="700" textAnchor="middle" fontFamily="Inter,sans-serif" letterSpacing="0.1em">ANÁLISIS WHAT-IF PARA ESCENARIOS FUTUROS</text>

          {/* Scenario 1 */}
          <g className="scenario-left">
            <rect x={80} y={80} width={240} height={200} fill="rgba(233, 93, 53, 0.08)" rx="6" stroke="var(--accent-orange)" strokeWidth="2" />
            <text x={200} y={110} fill="var(--accent-orange)" fontSize="13" fontWeight="700" textAnchor="middle" fontFamily="Inter,sans-serif">Escenario A</text>
            <text x={200} y={130} fill="rgba(255,255,255,0.6)" fontSize="10" textAnchor="middle" fontFamily="Inter,sans-serif">+15% demanda</text>
            <text x={200} y={148} fill="rgba(255,255,255,0.5)" fontSize="9" textAnchor="middle" fontFamily="Inter,sans-serif">• Precio: sin cambio</text>
            <text x={200} y={163} fill="rgba(255,255,255,0.5)" fontSize="9" textAnchor="middle" fontFamily="Inter,sans-serif">• Costo: +8% inflación</text>
            <text x={200} y={178} fill="rgba(255,255,255,0.5)" fontSize="9" textAnchor="middle" fontFamily="Inter,sans-serif" />
            <rect x={100} y={200} width={200} height="2" fill="var(--accent-orange)" opacity="0.3" />
            <text x={200} y={230} fill="var(--accent-orange)" fontSize="16" fontWeight="700" textAnchor="middle" fontFamily="Inter,sans-serif">Rentabilidad: -2.3%</text>
            <text x={200} y={250} fill="rgba(255,255,255,0.4)" fontSize="9" textAnchor="middle" fontFamily="Inter,sans-serif">Requiere ajuste de precios</text>
          </g>

          {/* Scenario 2 */}
          <g className="scenario-right">
            <rect x={480} y={80} width={240} height={200} fill="rgba(168, 255, 62, 0.08)" rx="6" stroke="var(--accent-sage)" strokeWidth="2" />
            <text x={600} y={110} fill="var(--accent-sage)" fontSize="13" fontWeight="700" textAnchor="middle" fontFamily="Inter,sans-serif">Escenario B</text>
            <text x={600} y={130} fill="rgba(255,255,255,0.6)" fontSize="10" textAnchor="middle" fontFamily="Inter,sans-serif">+15% demanda + 10% precio</text>
            <text x={600} y={148} fill="rgba(255,255,255,0.5)" fontSize="9" textAnchor="middle" fontFamily="Inter,sans-serif">• Precio: +10%</text>
            <text x={600} y={163} fill="rgba(255,255,255,0.5)" fontSize="9" textAnchor="middle" fontFamily="Inter,sans-serif">• Costo: +8% inflación</text>
            <text x={600} y={178} fill="rgba(255,255,255,0.5)" fontSize="9" textAnchor="middle" fontFamily="Inter,sans-serif" />
            <rect x={500} y={200} width={200} height="2" fill="var(--accent-sage)" opacity="0.3" />
            <text x={600} y={230} fill="var(--accent-sage)" fontSize="16" fontWeight="700" textAnchor="middle" fontFamily="Inter,sans-serif">Rentabilidad: +9.7%</text>
            <text x={600} y={250} fill="rgba(255,255,255,0.4)" fontSize="9" textAnchor="middle" fontFamily="Inter,sans-serif">Riesgo: sensibilidad de demanda</text>
          </g>

          <text x={400} y={330} fill="rgba(255,255,255,0.4)" fontSize="11" textAnchor="middle" fontFamily="Inter,sans-serif" letterSpacing="0.05em">
            La gerencia simula impactos financieros antes de implementar cambios operativos
          </text>
        </svg>
      </div>
      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p>
            El simulador de escenarios permite a la gerencia explorar "¿qué pasaría si...?" antes de tomar decisiones críticas. Pueden alterar variables como demanda estimada, lista de precios, costos de proveedores, y visualizar el impacto proyectado en rentabilidad. Esto transforma la toma de decisiones de reaccionaria a anticipatoria.
          </p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">3</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Simulación Estratégica</h3></div>
        </div>
      </div>
    </div>
  </>
)

export default function Problem1() {
  return (
    <ProblemPage
      number="01"
      subject="Introducción"
      title="Visión General del Sistema"
      question="¿Cómo integrar operaciones del día a día con análisis estratégico en un único sistema de gestión?"
      heroBackground="#0B0B0B"
      accent={ACCENT}
      theoryItems={theoryItems}
      approach={approach}
      resolution={resolution}
    />
  )
}
 
