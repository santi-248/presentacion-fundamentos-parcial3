export default function Footer() {
  return (
    <footer style={{
      borderTop: 'var(--border-mid)',
      marginTop: '6rem',
      paddingBlock: '2.5rem',
    }}>
      <div className="editorial-container">
        <div className="editorial-grid" style={{ alignItems: 'center' }}>
          <div className="col-6">
            <p className="text-caption">
              Sistema de Control de Inventario y Proyección de Negocio - "Faro"
            </p>
            <p className="text-caption" style={{ marginTop: '0.25rem' }}>
              Grupo: Santis y Los Otros - Apoud, Figueroa, Marsala, Mir, Rojas
            </p>
          </div>
          <div className="col-6" style={{ textAlign: 'right' }}>
            <p className="text-caption">ITU - DS - Fundamentos de Análisis de Sistemas</p>
            <p className="text-caption" style={{ marginTop: '0.25rem', color: 'var(--accent-orange)' }}>
              Frontend: React • Backend: Python • DB: PostgreSQL/MySQL
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
