import ProblemPage from '../components/ProblemPage/ProblemPage'

const ACCENT = 'var(--accent-sage)'
const C_SAGE = 'var(--accent-sage)'

const theoryItems = [
  'Actores del Sistema',
  'Casos de Uso (Use Cases)',
  'Operaciones de Stock',
  'Análisis de Ventas',
  'Toma de Decisiones',
]

const approach = (
  <>
    <p>
      El sistema interactúa con <strong>tres perfiles de usuario</strong> diferenciados por rol y responsabilidades. El <strong>Vendedor</strong> (más numeroso) realiza transacciones diarias: registra ventas, consulta stock y emite recibos. El <strong>Supervisor de Sucursal</strong> valida operaciones, gestiona inventario por ubicación física y autoriza rebajas. El <strong>Gerente Operativo</strong> accede a la inteligencia empresarial: consulta dashboards, genera reportes, simula escenarios y toma decisiones estratégicas.
    </p>
    <p>
      Los ocho casos de uso derivados cubren el ciclo completo: desde la venta individual hasta la proyección financiera. Cada caso conecta actores, datos y acciones de negocio, garantizando trazabilidad y cumplimiento de políticas internas.
    </p>
  </>
)

const useCases = [
  { num: 1, title: 'Registrar Venta', actor: 'Vendedor', desc: 'Crea nueva venta con cliente, productos y cantidad' },
  { num: 2, title: 'Consultar Stock', actor: 'Vendedor', desc: 'Verifica disponibilidad antes de vender' },
  { num: 3, title: 'Autorizar Rebaja', actor: 'Supervisor', desc: 'Aprueba descuentos o cambios de precio' },
  { num: 4, title: 'Gestionar Inventario', actor: 'Supervisor', desc: 'Actualiza existencias por traslado o conteo' },
  { num: 5, title: 'Ver Dashboard', actor: 'Gerente', desc: 'Accede a KPIs en tiempo real' },
  { num: 6, title: 'Generar Reporte', actor: 'Gerente', desc: 'Exporta datos de ventas, stock, clientes' },
  { num: 7, title: 'Simular Escenario', actor: 'Gerente', desc: 'Proyecta impacto financiero de cambios' },
  { num: 8, title: 'Recibir Alertas', actor: 'Supervisor/Gerente', desc: 'Notificaciones de quiebres y anomalías' },
]

const resolution = (
  <>
    {/* ════════════════════════════════════════════════════════
        PASO 01 — ACTORES
        ════════════════════════════════════════════════════════ */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#0a0a0a', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '2rem', flex: '0 0 75%' }}>
        <p className="pp-step-category">Modelo de Actores</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginTop: '1.5rem' }}>
          <div style={{
            background: 'rgba(131, 221, 156, 0.1)',
            border: `2px solid ${C_SAGE}`,
            borderRadius: '8px',
            padding: '1.2rem'
          }}>
            <p style={{ color: C_SAGE, fontWeight: 'bold', fontSize: '1.1em', marginBottom: '0.8rem', fontFamily: 'Inter, sans-serif' }}>👤 Vendedor</p>
            <ul style={{ fontSize: '0.85em', lineHeight: '1.6', marginLeft: '1rem', color: 'rgba(255,255,255,0.7)', fontFamily: 'Inter, sans-serif' }}>
              <li>Registra ventas diarias</li>
              <li>Consulta stock en tiempo real</li>
              <li>Emite comprobantes</li>
              <li>5-10 transacciones/día</li>
            </ul>
          </div>

          <div style={{
            background: 'rgba(131, 221, 156, 0.1)',
            border: `2px solid ${C_SAGE}`,
            borderRadius: '8px',
            padding: '1.2rem'
          }}>
            <p style={{ color: C_SAGE, fontWeight: 'bold', fontSize: '1.1em', marginBottom: '0.8rem', fontFamily: 'Inter, sans-serif' }}>👨‍💼 Supervisor</p>
            <ul style={{ fontSize: '0.85em', lineHeight: '1.6', marginLeft: '1rem', color: 'rgba(255,255,255,0.7)', fontFamily: 'Inter, sans-serif' }}>
              <li>Valida operaciones</li>
              <li>Gestiona inventario físico</li>
              <li>Autoriza rebajas</li>
              <li>1-2 por sucursal</li>
            </ul>
          </div>

          <div style={{
            background: 'rgba(131, 221, 156, 0.1)',
            border: `2px solid ${C_SAGE}`,
            borderRadius: '8px',
            padding: '1.2rem'
          }}>
            <p style={{ color: C_SAGE, fontWeight: 'bold', fontSize: '1.1em', marginBottom: '0.8rem', fontFamily: 'Inter, sans-serif' }}>🏢 Gerente</p>
            <ul style={{ fontSize: '0.85em', lineHeight: '1.6', marginLeft: '1rem', color: 'rgba(255,255,255,0.7)', fontFamily: 'Inter, sans-serif' }}>
              <li>Analiza dashboards</li>
              <li>Genera reportes</li>
              <li>Simula escenarios</li>
              <li>Toma decisiones estratégicas</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p>
            El sistema interactúa con tres perfiles diferenciados por sus permisos, acciones recurrentes y necesidades de información.
          </p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">1</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">3 Roles Diferenciados</h3></div>
        </div>
      </div>
    </div>

    {/* ════════════════════════════════════════════════════════
        PASO 02 — CASOS DE USO (USE CASES)
        ════════════════════════════════════════════════════════ */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#0a0a0a', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '2rem', flex: '0 0 75%' }}>
        <p className="pp-step-category">Especificación Funcional</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', marginTop: '1rem', fontFamily: 'Inter, sans-serif' }}>

          <div style={{
            background: 'rgba(131, 221, 156, 0.05)',
            border: `1px solid ${C_SAGE}`,
            borderRadius: '6px',
            padding: '1rem'
          }}>
            <p style={{ fontWeight: 'bold', color: C_SAGE, marginBottom: '0.8rem', fontSize: '1.05em' }}>Actor: Vendedor, quien atiende el mostrador</p>
            <ul style={{ fontSize: '0.85em', color: 'rgba(255,255,255,0.7)', margin: 0, paddingLeft: '1.5rem', lineHeight: '1.7' }}>
              <li><strong style={{ color: '#fff' }}>CU01 - Registrar Venta:</strong> Carga productos y asienta transacciones concurrentes.</li>
              <li><strong style={{ color: '#fff' }}>CU02 - Emitir Facturación:</strong> Genera el comprobante de la compra.</li>
              <li><strong style={{ color: '#fff' }}>CU03 - Buscar Producto:</strong> Localiza ítems en segundos usando múltiples filtros combinados.</li>
            </ul>
          </div>

          <div style={{
            background: 'rgba(131, 221, 156, 0.05)',
            border: `1px solid ${C_SAGE}`,
            borderRadius: '6px',
            padding: '1rem'
          }}>
            <p style={{ fontWeight: 'bold', color: C_SAGE, marginBottom: '0.8rem', fontSize: '1.05em' }}>Actor: Supervisor, quien gestiona la operativa local</p>
            <ul style={{ fontSize: '0.85em', color: 'rgba(255,255,255,0.7)', margin: 0, paddingLeft: '1.5rem', lineHeight: '1.7' }}>
              <li><strong style={{ color: '#fff' }}>CU04 - Administrar Cuenta Corriente:</strong> Gestiona límites de crédito y pagos.</li>
              <li><strong style={{ color: '#fff' }}>CU05 - Actualizar Precios Globales:</strong> Ajusta costos por inflación de manera masiva.</li>
              <li><strong style={{ color: '#fff' }}>CU06 - Consultar Alertas:</strong> Visualiza notificaciones de quiebre de stock o límites excedidos.</li>
            </ul>
          </div>

          <div style={{
            background: 'rgba(131, 221, 156, 0.05)',
            border: `1px solid ${C_SAGE}`,
            borderRadius: '6px',
            padding: '1rem'
          }}>
            <p style={{ fontWeight: 'bold', color: C_SAGE, marginBottom: '0.8rem', fontSize: '1.05em' }}>Actor: Gerente General, quien toma decisiones de alto nivel</p>
            <ul style={{ fontSize: '0.85em', color: 'rgba(255,255,255,0.7)', margin: 0, paddingLeft: '1.5rem', lineHeight: '1.7' }}>
              <li><strong style={{ color: '#fff' }}>CU07 - Proyectar Quiebre de Stock:</strong> Calcula la fecha en que se acabará un producto.</li>
              <li><strong style={{ color: '#fff' }}>CU08 - Simular Escenarios (What-If):</strong> Altera variables de precio/costos para proyectar la rentabilidad.</li>
            </ul>
          </div>

        </div>
      </div>
      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p>
            Ocho casos de uso derivados que cubren todo el ciclo del negocio, garantizando trazabilidad y cumplimiento.
          </p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">2</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">8 Casos de Uso Críticos</h3></div>
        </div>
      </div>
    </div>

    {/* ════════════════════════════════════════════════════════
        PASO 03 — MATRIZ DE RESPONSABILIDADES
        ════════════════════════════════════════════════════════ */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#0a0a0a', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '2rem', flex: '0 0 75%' }}>
        <p className="pp-step-category">Mapping de Actores y Funciones</p>

        <div style={{ overflowX: 'auto', marginTop: '1.5rem', fontFamily: 'Inter, sans-serif' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '0.85em',
            color: 'rgba(255,255,255,0.8)'
          }}>
            <thead>
              <tr style={{ background: `${C_SAGE}33` }}>
                <th style={{ border: `1px solid ${C_SAGE}`, padding: '0.7rem', textAlign: 'left', color: C_SAGE }}>Función</th>
                <th style={{ border: `1px solid ${C_SAGE}`, padding: '0.7rem', textAlign: 'center', color: C_SAGE }}>Vendedor</th>
                <th style={{ border: `1px solid ${C_SAGE}`, padding: '0.7rem', textAlign: 'center', color: C_SAGE }}>Supervisor</th>
                <th style={{ border: `1px solid ${C_SAGE}`, padding: '0.7rem', textAlign: 'center', color: C_SAGE }}>Gerente</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ border: `1px solid rgba(131, 221, 156, 0.3)`, padding: '0.7rem' }}>Registrar Venta</td>
                <td style={{ border: `1px solid rgba(131, 221, 156, 0.3)`, padding: '0.7rem', textAlign: 'center' }}>✓ Realiza</td>
                <td style={{ border: `1px solid rgba(131, 221, 156, 0.3)`, padding: '0.7rem', textAlign: 'center' }}>↻ Valida</td>
                <td style={{ border: `1px solid rgba(131, 221, 156, 0.3)`, padding: '0.7rem', textAlign: 'center' }}>👁 Ve</td>
              </tr>
              <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                <td style={{ border: `1px solid rgba(131, 221, 156, 0.3)`, padding: '0.7rem' }}>Consultar Stock</td>
                <td style={{ border: `1px solid rgba(131, 221, 156, 0.3)`, padding: '0.7rem', textAlign: 'center' }}>✓ Realiza</td>
                <td style={{ border: `1px solid rgba(131, 221, 156, 0.3)`, padding: '0.7rem', textAlign: 'center' }}>↻ Valida</td>
                <td style={{ border: `1px solid rgba(131, 221, 156, 0.3)`, padding: '0.7rem', textAlign: 'center' }}>👁 Ve</td>
              </tr>
              <tr>
                <td style={{ border: `1px solid rgba(131, 221, 156, 0.3)`, padding: '0.7rem' }}>Autorizar Rebaja</td>
                <td style={{ border: `1px solid rgba(131, 221, 156, 0.3)`, padding: '0.7rem', textAlign: 'center' }}>Solicita</td>
                <td style={{ border: `1px solid rgba(131, 221, 156, 0.3)`, padding: '0.7rem', textAlign: 'center' }}>✓ Realiza</td>
                <td style={{ border: `1px solid rgba(131, 221, 156, 0.3)`, padding: '0.7rem', textAlign: 'center' }}>Audita</td>
              </tr>
              <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                <td style={{ border: `1px solid rgba(131, 221, 156, 0.3)`, padding: '0.7rem' }}>Ver Dashboard</td>
                <td style={{ border: `1px solid rgba(131, 221, 156, 0.3)`, padding: '0.7rem', textAlign: 'center' }}>-</td>
                <td style={{ border: `1px solid rgba(131, 221, 156, 0.3)`, padding: '0.7rem', textAlign: 'center' }}>👁 Ve</td>
                <td style={{ border: `1px solid rgba(131, 221, 156, 0.3)`, padding: '0.7rem', textAlign: 'center' }}>✓ Realiza</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p>
            La matriz RACI (Responsible, Accountable, Consulted, Informed) define la gobernanza del sistema de forma clara.
          </p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">3</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Matriz RACI Simplificada</h3></div>
        </div>
      </div>
    </div>
  </>
)


export default function Problem3() {
  return (
    <ProblemPage
      number="03"
      subject="Actors & Use Cases"
      title="Actores y Casos de Uso"
      question="¿Quiénes usan el sistema y qué acciones pueden realizar?"
      accent={ACCENT}
      theoryItems={theoryItems}
      approach={approach}
      resolution={resolution}
    />
  )
}

