import ProblemPage from '../components/ProblemPage/ProblemPage'

const ACCENT = 'var(--accent-yellow)'
const C_YELLOW = 'var(--accent-yellow)'

const theoryItems = [
  'HTML + JS Asíncrono',
  'Python + FastAPI',
  'SQLite Relacional',
  'Arquitectura n-capas',
  'Clases de Dominio',
]

const approach = (
  <>
    <p>
      Para garantizar la escalabilidad y un rendimiento óptimo, el sistema FARO se fundamenta en una arquitectura desacoplada estructurada en capas.
    </p>
    <p>
      El dominio del negocio está representado por <strong>10 clases de negocio</strong> que modelan entidades del mundo real.
    </p>
    <p>
      Cada clase encapsula lógica de validación y comportamiento específico, permitiendo evolucionar la solución sin cambios abruptos en la interfaz.
    </p>
  </>
)

const classes = [
  { name: 'Producto', attrs: ['id', 'nombre', 'precio_unitario', 'descripción'] },
  { name: 'Stock_Sucursal', attrs: ['id', 'producto_id', 'sucursal_id', 'cantidad', 'fecha_última_actualización'] },
  { name: 'Venta', attrs: ['id', 'fecha', 'cliente_id', 'vendedor_id', 'total', 'estado'] },
  { name: 'Detalle_Venta', attrs: ['id', 'venta_id', 'producto_id', 'cantidad', 'precio_unitario'] },
  { name: 'Cliente', attrs: ['id', 'nombre', 'email', 'teléfono', 'dirección'] },
  { name: 'Cuenta_Corriente', attrs: ['id', 'cliente_id', 'saldo', 'fecha_última_transacción'] },
  { name: 'Usuario', attrs: ['id', 'nombre', 'email', 'rol', 'sucursal_id', 'estado'] },
  { name: 'Sucursal', attrs: ['id', 'nombre', 'dirección', 'localidad', 'responsable_id'] },
  { name: 'Simulador_Escenario', attrs: ['id', 'nombre', 'fecha_creación', 'parámetros_json', 'resultado_json'] },
  { name: 'Alerta', attrs: ['id', 'tipo', 'producto_id', 'sucursal_id', 'mensaje', 'fecha'] },
]

const resolution = (
  <>
    {/* ════════════════════════════════════════════════════════
        PASO 01 — ARQUITECTURA DE CAPAS
        ════════════════════════════════════════════════════════ */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#0a0a0a', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '2rem', flex: '0 0 75%' }}>
        <p className="pp-step-category">Stack Tecnológico</p>
        
        <div className="responsive-grid-1" style={{ marginTop: '1.5rem' }}>
          <div style={{
            background: 'rgba(255, 193, 7, 0.1)',
            border: `2px solid ${C_YELLOW}`,
            borderRadius: '8px',
            padding: '1.2rem',
            textAlign: 'center'
          }}>
            <p style={{ color: C_YELLOW, fontWeight: 'bold', fontSize: '1.15em', marginBottom: '0.5rem', fontFamily: 'Inter, sans-serif' }}>🖥️ Capa de Presentación (Frontend Dinámico)</p>
            <p style={{ fontFamily: 'monospace', fontSize: '0.95em', color: '#fff' }}>HTML puro + JavaScript (AJAX / Fetch API)</p>
            <p style={{ fontSize: '0.85em', color: 'rgba(255,255,255,0.7)', marginTop: '0.5rem', fontFamily: 'Inter, sans-serif' }}>La interfaz visual está desarrollada con archivos HTML puros y JavaScript Asíncrono (AJAX / Fetch API). Esto permite que el navegador dibuje la información y reaccione a los eventos del usuario (como registrar una venta) comunicándose en segundo plano con el servidor, sin necesidad de recargar la página completa.</p>
          </div>

          <div style={{
            background: 'rgba(255, 193, 7, 0.1)',
            border: `2px solid ${C_YELLOW}`,
            borderRadius: '8px',
            padding: '1.2rem',
            textAlign: 'center'
          }}>
            <p style={{ color: C_YELLOW, fontWeight: 'bold', fontSize: '1.15em', marginBottom: '0.5rem', fontFamily: 'Inter, sans-serif' }}>⚙️ Capa de Enrutamiento y Lógica (Backend)</p>
            <p style={{ fontFamily: 'monospace', fontSize: '0.95em', color: '#fff' }}>Python + FastAPI</p>
            <p style={{ fontSize: '0.85em', color: 'rgba(255,255,255,0.7)', marginTop: '0.5rem', fontFamily: 'Inter, sans-serif' }}>El servidor principal está construido en Python utilizando el framework FastAPI. Funciona como el 'recepcionista' del sistema: recibe las peticiones, valida estrictamente los formatos y deriva el procesamiento matemático a los servicios internos. Además, implementa un sistema de Transacciones Atómicas que garantiza que, si ocurre un error, no se descuente el stock del inventario de forma errónea.</p>
          </div>

          <div style={{
            background: 'rgba(255, 193, 7, 0.1)',
            border: `2px solid ${C_YELLOW}`,
            borderRadius: '8px',
            padding: '1.2rem',
            textAlign: 'center'
          }}>
            <p style={{ color: C_YELLOW, fontWeight: 'bold', fontSize: '1.15em', marginBottom: '0.5rem', fontFamily: 'Inter, sans-serif' }}>🗄️ Capa de Persistencia de Datos</p>
            <p style={{ fontFamily: 'monospace', fontSize: '0.95em', color: '#fff' }}>SQLite Relacional</p>
            <p style={{ fontSize: '0.85em', color: 'rgba(255,255,255,0.7)', marginTop: '0.5rem', fontFamily: 'Inter, sans-serif' }}>Se utiliza una base de datos relacional altamente normalizada en SQLite. Esta funciona como la 'fuente de la verdad absoluta', utilizando historiales inmutables y eliminación en cascada para mantener la integridad de las cuentas corrientes y los inventarios.</p>
          </div>
        </div>
      </div>
      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p>
            La arquitectura sigue el patrón <strong>n-capas</strong> con separación clara de responsabilidades, garantizando transacciones ACID y relaciones bien definidas.
          </p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">1</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Arquitectura en 3 Capas</h3></div>
        </div>
      </div>
    </div>

    {/* ════════════════════════════════════════════════════════
        PASO 02 — MODELO DE CLASES DE DOMINIO (PARTE 1)
        ════════════════════════════════════════════════════════ */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#0a0a0a', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '2rem', flex: '0 0 75%' }}>
        <p className="pp-step-category">Entidades del Negocio</p>
        
        <div className="responsive-grid-2" style={{ marginTop: '1rem' }}>
          {classes.slice(0, 6).map((cls, idx) => (
            <div key={idx} style={{
              background: 'rgba(255, 193, 7, 0.05)',
              border: `1px solid ${C_YELLOW}`,
              borderRadius: '6px',
              padding: '0.9rem',
              fontFamily: 'monospace',
              fontSize: '0.8em'
            }}>
              <p style={{ fontWeight: 'bold', color: C_YELLOW, marginBottom: '0.5rem' }}>class {cls.name}</p>
              <ul style={{ listStyleType: 'none', margin: 0, paddingLeft: '1rem' }}>
                {cls.attrs.map((attr, aidx) => (
                  <li key={aidx} style={{ color: 'rgba(255,255,255,0.5)' }}>+ {attr}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p>
            El dominio del negocio está representado por 10 clases que modelan entidades del mundo real, encapsulando la lógica de validación y comportamiento.
          </p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">2</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">10 Clases de Dominio (OOP)</h3></div>
        </div>
      </div>
    </div>

    {/* ════════════════════════════════════════════════════════
        PASO 03 — MODELO DE CLASES DE DOMINIO (PARTE 2)
        ════════════════════════════════════════════════════════ */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#0a0a0a', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '2rem', flex: '0 0 75%' }}>
        <p className="pp-step-category">Entidades del Negocio</p>
        
        <div className="responsive-grid-2" style={{ marginTop: '1rem' }}>
          {classes.slice(6, 10).map((cls, idx) => (
            <div key={idx} style={{
              background: 'rgba(255, 193, 7, 0.05)',
              border: `1px solid ${C_YELLOW}`,
              borderRadius: '6px',
              padding: '0.9rem',
              fontFamily: 'monospace',
              fontSize: '0.8em'
            }}>
              <p style={{ fontWeight: 'bold', color: C_YELLOW, marginBottom: '0.5rem' }}>class {cls.name}</p>
              <ul style={{ listStyleType: 'none', margin: 0, paddingLeft: '1rem' }}>
                {cls.attrs.map((attr, aidx) => (
                  <li key={aidx} style={{ color: 'rgba(255,255,255,0.5)' }}>+ {attr}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{
          background: 'rgba(255, 193, 7, 0.1)',
          border: `1px solid ${C_YELLOW}`,
          borderRadius: '8px',
          padding: '1rem',
          marginTop: '1.5rem',
          fontFamily: 'Inter, sans-serif'
        }}>
          <p style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: C_YELLOW, fontSize: '0.95em' }}>📋 Relaciones Principales</p>
          <ul style={{ fontSize: '0.85em', lineHeight: '1.7', margin: 0, paddingLeft: '1.5rem', color: 'rgba(255,255,255,0.8)' }}>
            <li><strong style={{ color: '#fff' }}>Venta</strong> → 1:N → <strong style={{ color: '#fff' }}>Detalle_Venta</strong> (1 venta, muchos productos)</li>
            <li><strong style={{ color: '#fff' }}>Producto</strong> → 1:N → <strong style={{ color: '#fff' }}>Stock_Sucursal</strong> (1 producto, múltiples sucursales)</li>
            <li><strong style={{ color: '#fff' }}>Cliente</strong> → 1:1 → <strong style={{ color: '#fff' }}>Cuenta_Corriente</strong> (cada cliente tiene saldo)</li>
            <li><strong style={{ color: '#fff' }}>Usuario</strong> → N:1 → <strong style={{ color: '#fff' }}>Sucursal</strong> (varios usuarios por sucursal)</li>
          </ul>
        </div>
      </div>
      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p>
            El dominio del negocio está representado por 10 clases que modelan entidades del mundo real, encapsulando la lógica de validación y comportamiento.
          </p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">3</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">10 Clases de Dominio (OOP)</h3></div>
        </div>
      </div>
    </div>

    {/* ════════════════════════════════════════════════════════
        PASO 04 — FLUJO DE DATOS
        ════════════════════════════════════════════════════════ */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#0a0a0a', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '2rem', flex: '0 0 75%' }}>
        <p className="pp-step-category">Integración de Capas</p>
        
        <div style={{
          background: 'rgba(255, 193, 7, 0.05)',
          border: `2px dashed ${C_YELLOW}`,
          borderRadius: '8px',
          padding: '1.5rem',
          marginTop: '1.5rem',
          fontFamily: 'monospace',
          fontSize: '0.85em',
          lineHeight: '2',
          color: 'rgba(255,255,255,0.8)'
        }}>
          <p><span style={{ color: C_YELLOW }}>1.</span> Usuario (Vendedor) ingresa datos en React → Valida formato</p>
          <p><span style={{ color: C_YELLOW }}>2.</span> POST /api/ventas → FastAPI recibe JSON con cliente_id, productos[]</p>
          <p><span style={{ color: C_YELLOW }}>3.</span> Backend valida reglas de negocio (stock suficiente, cliente válido)</p>
          <p><span style={{ color: C_YELLOW }}>4.</span> ORM SQLAlchemy ejecuta transacción en BD (INSERT venta + INSERT detalles + UPDATE stock)</p>
          <p><span style={{ color: C_YELLOW }}>5.</span> BD responde con transacción confirmada (COMMIT ACID)</p>
          <p><span style={{ color: C_YELLOW }}>6.</span> FastAPI retorna 201 Created + venta_id al frontend</p>
          <p><span style={{ color: C_YELLOW }}>7.</span> React actualiza dashboard y muestra confirmación al usuario ✓</p>
        </div>

      </div>
      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p>
            El flujo de datos de una transacción demuestra cómo las capas se comunican garantizando la integridad de los datos en un entorno concurrente.
          </p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">4</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Flujo de una Transacción</h3></div>
        </div>
      </div>
    </div>
  </>
)


export default function Problem4() {
  return (
    <ProblemPage
      number="04"
      subject="Architecture"
      title="Arquitectura del Sistema"
      question="¿Cómo están organizadas las capas tecnológicas y las estructuras de datos?"
      accent={ACCENT}
      theoryItems={theoryItems}
      approach={approach}
      resolution={resolution}
    />
  )
}

