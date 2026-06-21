import ProblemPage from '../components/ProblemPage/ProblemPage'

const ACCENT = 'var(--accent-blue)'
const C_BLUE = 'var(--accent-blue)'

const theoryItems = [
  'Testing Strategy',
  'Unit Tests',
  'Integration Tests',
  'Pilot Deployment',
  'Monitoring & Rollout',
]

const approach = (
  <>
    <p>
      La estrategia de pruebas sigue un modelo <strong>escalonado</strong>: primero, tests unitarios en backend validan la lógica de negocio de forma aislada (ej: cálculo de promociones, validación de stock). Segundo, tests de integración verifican la comunicación entre capas: frontend ↔ API, API ↔ BD. Finalmente, pruebas funcionales end-to-end simulan casos reales completos (registro de venta → consulta en dashboard).
    </p>
    <p>
      El despliegue es <strong>progresivo y controlado</strong>: se inicia en sucursal piloto (Sucursal 2), se monitorea rendimiento y errores durante 2 semanas, se recopilan feedback de usuarios, y una vez validado, se expande a las otras sucursales. Todo cambio en producción se acompaña de rollback plan y alertas automáticas.
    </p>
  </>
)

const resolution = (
  <>
    {/* ════════════════════════════════════════════════════════
        PASO 01 — ESTRATEGIA DE TESTING
        ════════════════════════════════════════════════════════ */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#0a0a0a', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '2rem', flex: '0 0 75%' }}>
        <p className="pp-step-category">Quality Assurance</p>
        
        <div style={{
          background: 'rgba(33, 150, 243, 0.05)',
          border: `2px solid ${C_BLUE}`,
          borderRadius: '8px',
          padding: '1.5rem',
          marginTop: '1.5rem'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem', fontFamily: 'Inter, sans-serif' }}>
            <div style={{
              background: 'rgba(33, 150, 243, 0.15)',
              border: `2px solid ${C_BLUE}`,
              padding: '0.8rem',
              borderRadius: '4px',
              marginBottom: '1rem'
            }}>
              <p style={{ fontWeight: 'bold', color: C_BLUE, margin: 0 }}>🎯 End-to-End (E2E)</p>
              <p style={{ fontSize: '0.85em', color: 'rgba(255,255,255,0.8)', margin: '0.3rem 0 0 0' }}>5-10 casos críticos | Cypress</p>
            </div>

            <div style={{
              background: 'rgba(33, 150, 243, 0.12)',
              border: `2px solid ${C_BLUE}`,
              padding: '1rem',
              borderRadius: '4px',
              marginBottom: '1rem'
            }}>
              <p style={{ fontWeight: 'bold', color: C_BLUE, margin: 0 }}>🔗 Integration Tests</p>
              <p style={{ fontSize: '0.85em', color: 'rgba(255,255,255,0.8)', margin: '0.3rem 0 0 0' }}>20-30 escenarios | pytest + requests</p>
              <p style={{ fontSize: '0.8em', color: 'rgba(255,255,255,0.5)', margin: '0.3rem 0 0 0' }}>API → Database, caching, transacciones</p>
            </div>

            <div style={{
              background: 'rgba(33, 150, 243, 0.1)',
              border: `2px solid ${C_BLUE}`,
              padding: '1.2rem',
              borderRadius: '4px'
            }}>
              <p style={{ fontWeight: 'bold', color: C_BLUE, margin: 0 }}>🧪 Unit Tests (Cobertura 80%+)</p>
              <p style={{ fontSize: '0.85em', color: 'rgba(255,255,255,0.8)', margin: '0.3rem 0 0 0' }}>200+ test cases | pytest + unittest</p>
              <p style={{ fontSize: '0.8em', color: 'rgba(255,255,255,0.5)', margin: '0.3rem 0 0 0' }}>Lógica de negocio, validaciones, utilidades</p>
            </div>
          </div>

          <div style={{
            background: 'rgba(33, 150, 243, 0.05)',
            border: `1px dashed ${C_BLUE}`,
            borderRadius: '6px',
            padding: '1rem',
            fontSize: '0.85em',
            lineHeight: '1.7',
            fontFamily: 'Inter, sans-serif'
          }}>
            <strong style={{ color: C_BLUE }}>Criterios de Aceptación:</strong>
            <ul style={{ margin: '0.5rem 0 0 1rem', paddingLeft: '1rem', color: 'rgba(255,255,255,0.7)' }}>
              <li>✓ Todos los tests unitarios pasan (CI/CD gate)</li>
              <li>✓ Cobertura de código ≥ 80%</li>
              <li>✓ Cero errores críticos en staging</li>
              <li>✓ Performance: respuesta API &lt; 200ms (p95)</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p>
            El testing escalonado asegura que cada capa del sistema cumpla su rol sin afectar a las demás, desde la lógica base hasta los flujos completos de usuario.
          </p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">1</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Pirámide de Testing</h3></div>
        </div>
      </div>
    </div>

    {/* ════════════════════════════════════════════════════════
        PASO 02 — DESPLIEGUE PILOTO
        ════════════════════════════════════════════════════════ */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#0a0a0a', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '2rem', flex: '0 0 75%' }}>
        <p className="pp-step-category">Release Management</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1.5rem', fontFamily: 'Inter, sans-serif' }}>
          <div style={{
            background: 'rgba(33, 150, 243, 0.1)',
            border: `2px solid ${C_BLUE}`,
            borderRadius: '8px',
            padding: '1.2rem'
          }}>
            <p style={{ color: C_BLUE, fontWeight: 'bold', fontSize: '1.05em', marginBottom: '0.8rem' }}>🎯 Fase 1: Piloto (2 semanas)</p>
            <ul style={{ fontSize: '0.9em', lineHeight: '1.8', margin: 0, paddingLeft: '1.5rem', color: 'rgba(255,255,255,0.8)' }}>
              <li><strong style={{ color: '#fff' }}>Sucursal:</strong> Sucursal 2 (15-20 usuarios)</li>
              <li><strong style={{ color: '#fff' }}>Equipo:</strong> 3 vendedores + 1 supervisor</li>
              <li><strong style={{ color: '#fff' }}>Monitoreo:</strong> Logs, errores, tiempo respuesta</li>
              <li><strong style={{ color: '#fff' }}>Métricas:</strong> Transacciones/día, downtime</li>
              <li><strong style={{ color: '#fff' }}>Feedback:</strong> Sesión grupal diaria</li>
            </ul>
          </div>

          <div style={{
            background: 'rgba(33, 150, 243, 0.1)',
            border: `2px solid ${C_BLUE}`,
            borderRadius: '8px',
            padding: '1.2rem'
          }}>
            <p style={{ color: C_BLUE, fontWeight: 'bold', fontSize: '1.05em', marginBottom: '0.8rem' }}>📊 Fase 2: Expansión (gradual)</p>
            <ul style={{ fontSize: '0.9em', lineHeight: '1.8', margin: 0, paddingLeft: '1.5rem', color: 'rgba(255,255,255,0.8)' }}>
              <li><strong style={{ color: '#fff' }}>Go/No-Go:</strong> Junta de decisión post-piloto</li>
              <li><strong style={{ color: '#fff' }}>Sucursal 1:</strong> Semana 3</li>
              <li><strong style={{ color: '#fff' }}>Sucursal 3:</strong> Semana 4</li>
              <li><strong style={{ color: '#fff' }}>Todos:</strong> Semana 5 (full rollout)</li>
              <li><strong style={{ color: '#fff' }}>Rollback:</strong> Plan disponible en cada fase</li>
            </ul>
          </div>
        </div>

        <div style={{
          background: 'rgba(33, 150, 243, 0.08)',
          border: `2px dashed ${C_BLUE}`,
          borderRadius: '8px',
          padding: '1.2rem',
          marginTop: '1.5rem',
          fontSize: '0.85em',
          fontFamily: 'monospace',
          color: 'rgba(255,255,255,0.7)'
        }}>
          <strong style={{ color: C_BLUE }}>⚠️ Criterios de Rollback Automático:</strong>
          <div style={{ marginTop: '0.5rem', lineHeight: '1.8' }}>
            • Error rate &gt; 5% durante 1 hora<br/>
            • Latencia API &gt; 500ms (p95)<br/>
            • Downtime &gt; 30 minutos no planeado<br/>
            • Corrupción de datos reportada
          </div>
        </div>
      </div>
      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p>
            El sistema se despliega gradualmente empezando con un piloto para reducir el riesgo, monitoreando el comportamiento en producción real antes del lanzamiento masivo.
          </p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">2</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Despliegue Progresivo</h3></div>
        </div>
      </div>
    </div>

    {/* ════════════════════════════════════════════════════════
        PASO 03 — MONITOREO Y OPERACIÓN
        ════════════════════════════════════════════════════════ */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#0a0a0a', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '2rem', flex: '0 0 75%' }}>
        <p className="pp-step-category">Operations Excellence</p>
        
        <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontFamily: 'Inter, sans-serif' }}>
          <div style={{
            background: 'rgba(33, 150, 243, 0.05)',
            border: `1px solid ${C_BLUE}`,
            borderRadius: '6px',
            padding: '1.2rem'
          }}>
            <p style={{ fontWeight: 'bold', color: C_BLUE, marginBottom: '0.8rem' }}>📈 Dashboards en Tiempo Real</p>
            <ul style={{ fontSize: '0.85em', lineHeight: '1.7', margin: 0, paddingLeft: '1.5rem', color: 'rgba(255,255,255,0.7)' }}>
              <li>Transacciones por minuto</li>
              <li>Latencia de APIs (p50, p95, p99)</li>
              <li>Uso de BD (conexiones activas, queries lentas)</li>
              <li>Errores por tipo (400, 500, timeout)</li>
              <li>Alertas automáticas vía Slack</li>
            </ul>
          </div>

          <div style={{
            background: 'rgba(33, 150, 243, 0.05)',
            border: `1px solid ${C_BLUE}`,
            borderRadius: '6px',
            padding: '1.2rem'
          }}>
            <p style={{ fontWeight: 'bold', color: C_BLUE, marginBottom: '0.8rem' }}>🛠️ Soporte Técnico</p>
            <ul style={{ fontSize: '0.85em', lineHeight: '1.7', margin: 0, paddingLeft: '1.5rem', color: 'rgba(255,255,255,0.7)' }}>
              <li>Hotline: IT responsable en horarios clave</li>
              <li>Ticketing integrado (email + sistema)</li>
              <li>SLA: Críticos &lt; 1 hora, Alto &lt; 4 horas</li>
              <li>Documentación en vivo + FAQs</li>
              <li>Capacitación mensual para nuevos usuarios</li>
            </ul>
          </div>
        </div>

        <div style={{
          background: 'rgba(33, 150, 243, 0.1)',
          border: `2px solid ${C_BLUE}`,
          borderRadius: '8px',
          padding: '1.2rem',
          marginTop: '1.5rem',
          fontFamily: 'Inter, sans-serif'
        }}>
          <p style={{ fontWeight: 'bold', color: C_BLUE, marginBottom: '0.5rem', fontSize: '0.95em' }}>🔄 Ciclo de Mejora Continua</p>
          <p style={{ fontSize: '0.85em', margin: 0, lineHeight: '1.7', color: 'rgba(255,255,255,0.8)' }}>
            Cada 2 semanas: revisión de logs, retrospectiva con usuarios, priorización de bugs vs features, siguiente sprint de desarrollo.
          </p>
        </div>
      </div>
      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p>
            Mantenemos el sistema observable y a los usuarios con soporte constante, lo que permite iterar rápido y mejorar el producto continuamente.
          </p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">3</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Soporte y Observabilidad</h3></div>
        </div>
      </div>
    </div>
  </>
)


export default function Problem5() {
  return (
    <ProblemPage
      number="05"
      subject="Testing & Deployment"
      title="Pruebas e Implementación"
      question="¿Cómo se valida el sistema y se despliega de manera controlada?"
      accent={ACCENT}
      theoryItems={theoryItems}
      approach={approach}
      resolution={resolution}
    />
  )
}

