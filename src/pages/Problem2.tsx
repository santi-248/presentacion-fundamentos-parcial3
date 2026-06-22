import ProblemPage from '../components/ProblemPage/ProblemPage'

const ACCENT = 'var(--accent-pink)'
const C_PINK = 'var(--accent-pink)'

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
      El sistema está estructurado sobre dos módulos centrales que cubren necesidades operativas y estratégicas diferenciadas:
    </p>
    <p>
      Primero, el <strong>núcleo transaccional</strong>, que permite registro concurrente de ventas, actualización automática de stock en tiempo real y administración de cuentas corrientes por cliente.
    </p>
    <p>
      Segundo, el <strong>módulo analítico-gerencial</strong>, que provee un dashboard de métricas en tiempo real, predicción matemática de quiebres de stock usando análisis histórico, y un simulador de escenarios empresariales para anticipar impactos financieros antes de implementar cambios.
    </p>
  </>
)
// ─── Resolution steps ─────────────────────────────────────────────────────────

const resolution = (
  <>
    {/* ════════════════════════════════════════════════════════
        PASO 01 — NÚCLEO TRANSACCIONAL
        ════════════════════════════════════════════════════════ */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#0a0a0a', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '2rem', flex: '1', justifyContent: 'center', alignItems: 'center' }}>
        <p className="pp-step-category">Módulo 1: Operaciones Centrales</p>
        
        <div style={{ maxWidth: '800px', width: '100%' }}>
          <ul style={{ margin: '0', padding: '0 0 0 1.5rem', lineHeight: '1.8', color: 'rgba(255,255,255,0.8)', fontSize: '1.05em', fontFamily: 'Inter, sans-serif' }}>
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
            marginTop: '2rem',
            fontFamily: 'monospace',
            fontSize: '1em',
            color: '#fff',
            textAlign: 'center'
          }}>
            Flujo: Venta Creada → Stock Decrementado → Cuenta Corriente Actualizada ✓
          </div>
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
        PASO 02 — LIMITACIONES DELIBERADAS (Ex PASO 03)
        ════════════════════════════════════════════════════════ */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#0a0a0a', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '2rem', flex: '1', justifyContent: 'center', alignItems: 'center' }}>
        <p className="pp-step-category">Definición de Alcances</p>
        
        <div style={{ maxWidth: '900px', width: '100%' }}>
          <div className="responsive-grid-2" style={{ marginTop: '0', display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            <div style={{
              background: 'rgba(217, 119, 144, 0.05)',
              border: `1px solid ${C_PINK}`,
              borderRadius: '8px',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <strong style={{ color: C_PINK, fontFamily: 'Inter, sans-serif', fontSize: '1.1em' }}>❌ Sin Integración ARCA</strong>
              <p style={{ fontSize: '0.95em', marginTop: '1rem', color: 'rgba(255,255,255,0.7)', fontFamily: 'Inter, sans-serif', lineHeight: '1.6' }}>
                No valida facturas contra servidores AFIP en tiempo real. Control manual posterior.
              </p>
            </div>
            
            <div style={{
              background: 'rgba(217, 119, 144, 0.05)',
              border: `1px solid ${C_PINK}`,
              borderRadius: '8px',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <strong style={{ color: C_PINK, fontFamily: 'Inter, sans-serif', fontSize: '1.1em' }}>❌ Sin Compras Automáticas</strong>
              <p style={{ fontSize: '0.95em', marginTop: '1rem', color: 'rgba(255,255,255,0.7)', fontFamily: 'Inter, sans-serif', lineHeight: '1.6' }}>
                No genera órdenes de compra automáticas a proveedores. Decisión manual del supervisor.
              </p>
            </div>
            
            <div style={{
              background: 'rgba(217, 119, 144, 0.05)',
              border: `1px solid ${C_PINK}`,
              borderRadius: '8px',
              padding: '1.5rem',
              gridColumn: '1 / -1',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              textAlign: 'center'
            }}>
              <strong style={{ color: C_PINK, fontFamily: 'Inter, sans-serif', fontSize: '1.1em' }}>❌ Sin E-Commerce Público</strong>
              <p style={{ fontSize: '0.95em', marginTop: '1rem', color: 'rgba(255,255,255,0.7)', fontFamily: 'Inter, sans-serif', lineHeight: '1.6', maxWidth: '700px', margin: '1rem auto 0' }}>
                No hay tienda online visible al público. Es herramienta B2B pura (solo usuarios internos y clientes B2B).
              </p>
            </div>
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
          <div className="pp-step-num-col"><span className="pp-step-num-circle">2</span></div>
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

