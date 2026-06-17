import ProblemPage from '../components/ProblemPage/ProblemPage'

const ACCENT = 'var(--accent-yellow)'
const ACCENT_HEX = '#F5E642'

// ─── Shared keyframes ─────────────────────────────────────────────────────────
const KEYFRAMES = `
  @keyframes fadeSlideUp    { from { opacity:0; transform:translateY(14px);  } to { opacity:1; transform:translateY(0);  } }
  @keyframes fadeSlideRight { from { opacity:0; transform:translateX(-14px); } to { opacity:1; transform:translateX(0);  } }
  @keyframes drawLine       { from { stroke-dashoffset:1200; } to { stroke-dashoffset:0; } }
  @keyframes popIn          { from { transform:scale(0.6); opacity:0; } to { transform:scale(1); opacity:1; } }
  @keyframes pulseGlow      { 0%,100%{opacity:0.4} 50%{opacity:1} }

  .fsu-1 { opacity:0; animation:fadeSlideUp    0.7s ease forwards 0.15s; }
  .fsu-2 { opacity:0; animation:fadeSlideUp    0.7s ease forwards 0.4s;  }
  .fsu-3 { opacity:0; animation:fadeSlideUp    0.7s ease forwards 0.65s; }
  .fsu-4 { opacity:0; animation:fadeSlideUp    0.7s ease forwards 0.9s;  }
  .fsr-1 { opacity:0; animation:fadeSlideRight 0.7s ease forwards 0.2s;  }
  .fsr-2 { opacity:0; animation:fadeSlideRight 0.7s ease forwards 0.5s;  }
  .pop-1 { opacity:0; animation:popIn          0.5s cubic-bezier(.175,.885,.32,1.275) forwards 0.3s;  }
  .pop-2 { opacity:0; animation:popIn          0.5s cubic-bezier(.175,.885,.32,1.275) forwards 0.6s;  }
  .pop-3 { opacity:0; animation:popIn          0.5s cubic-bezier(.175,.885,.32,1.275) forwards 0.9s;  }
  .pop-4 { opacity:0; animation:popIn          0.5s cubic-bezier(.175,.885,.32,1.275) forwards 1.2s;  }
  .dl-1  { stroke-dasharray:1200; stroke-dashoffset:1200; animation:drawLine 1.2s ease forwards 0.3s; }
  .dl-2  { stroke-dasharray:1200; stroke-dashoffset:1200; animation:drawLine 1.2s ease forwards 0.6s; }
  .dl-3  { stroke-dasharray:1200; stroke-dashoffset:1200; animation:drawLine 1.2s ease forwards 0.9s; }
  .pg    { animation:pulseGlow 2.4s ease-in-out infinite; }
`

// ─── Step A — k-promising vectors as nodes ────────────────────────────────────
function VizA() {
  // Show a tree of partial configurations k=0..3
  const nodeRadius = 18
  const nodes = [
    // k=0 (root)
    { id: 'root', x: 400, y: 50, label: '()', k: 0, cls: 'pop-1' },
    // k=1
    { id: 'n10', x: 130, y: 150, label: '(1)', k: 1, cls: 'pop-2' },
    { id: 'n13', x: 250, y: 150, label: '(3)', k: 1, cls: 'pop-2' },
    { id: 'n15', x: 370, y: 150, label: '(5)', k: 1, cls: 'pop-2' },
    { id: 'n17', x: 490, y: 150, label: '(7)', k: 1, cls: 'pop-2' },
    { id: 'n18', x: 600, y: 150, label: '…', k: 1, cls: 'pop-2' },
    // k=2
    { id: 'n133', x: 130, y: 270, label: '(1,3)', k: 2, cls: 'pop-3' },
    { id: 'n135', x: 255, y: 270, label: '(1,5)', k: 2, cls: 'pop-3' },
    { id: 'n137', x: 380, y: 270, label: '(1,7)', k: 2, cls: 'pop-3' },
    { id: 'n1x', x: 505, y: 270, label: '…', k: 2, cls: 'pop-3' },
    // k=3
    { id: 'n1352', x: 130, y: 350, label: '(1,3,5)', k: 3, cls: 'pop-4' },
    { id: 'n1357', x: 275, y: 350, label: '(1,3,7)', k: 3, cls: 'pop-4' },
    { id: 'n13x', x: 410, y: 350, label: '…', k: 3, cls: 'pop-4' },
  ]

  const edges = [
    // root → k1
    { x1: 400, y1: 68, x2: 130, y2: 132 },
    { x1: 400, y1: 68, x2: 250, y2: 132 },
    { x1: 400, y1: 68, x2: 370, y2: 132 },
    { x1: 400, y1: 68, x2: 490, y2: 132 },
    { x1: 400, y1: 68, x2: 600, y2: 132 },
    // k1(1) → k2
    { x1: 130, y1: 168, x2: 130, y2: 252 },
    { x1: 130, y1: 168, x2: 255, y2: 252 },
    { x1: 130, y1: 168, x2: 380, y2: 252 },
    { x1: 130, y1: 168, x2: 505, y2: 252 },
    // k2(1,3) → k3
    { x1: 130, y1: 288, x2: 130, y2: 332 },
    { x1: 130, y1: 288, x2: 275, y2: 332 },
    { x1: 130, y1: 288, x2: 410, y2: 332 },
  ]

  const kColors: Record<number, string> = {
    0: ACCENT_HEX,
    1: '#69b6dd',
    2: '#e0a0ff',
    3: '#ff9f67',
  }

  return (
    <svg viewBox="0 0 840 400" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid meet">
      <defs><style>{KEYFRAMES}</style></defs>

      {/* Edges */}
      {edges.map((e, i) => (
        <line key={i} className={`dl-${Math.min(3, Math.floor(i / 4) + 1)}`}
          x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
          stroke="#333" strokeWidth="1"
        />
      ))}

      {/* Nodes */}
      {nodes.map(n => (
        <g key={n.id} className={n.cls}>
          <circle cx={n.x} cy={n.y} r={nodeRadius}
            fill="#0a0a0a" stroke={kColors[n.k]} strokeWidth="1.5" />
          <text x={n.x} y={n.y + 4} fill={kColors[n.k]} fontSize="10"
            fontWeight="700" textAnchor="middle"
            fontFamily="'JetBrains Mono','Fira Code',monospace">{n.label}</text>
        </g>
      ))}

      {/* Legend */}
      {[
        { color: ACCENT_HEX, label: 'k=0 · raíz (vector vacío)', y: 50 },
        { color: '#69b6dd', label: 'k=1 · 1 reina colocada', y: 76 },
        { color: '#e0a0ff', label: 'k=2 · 2 reinas colocadas', y: 102 },
        { color: '#ff9f67', label: 'k=3 · 3 reinas colocadas', y: 128 },
      ].map(l => (
        <g key={l.label} className="fsu-4">
          <rect x={670} y={l.y - 6} width={8} height={8} fill={l.color} />
          <text x={684} y={l.y + 3} fill={l.color} fontSize="9.5"
            fontFamily="Inter,sans-serif">{l.label}</text>
        </g>
      ))}

      <text x={420} y={392} fill="#444" fontSize="9.5" textAnchor="middle"
        fontFamily="Inter,sans-serif" letterSpacing="0.08em">
        ÁRBOL DE VECTORES k-PROMETEDORES · k DE 0 A 8
      </text>
    </svg>
  )
}

// ─── Step B — Aristas como transiciones de estado ─────────────────────────────
function VizB() {
  return (
    <svg viewBox="0 0 840 400" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid meet">
      <defs>
        <style>{KEYFRAMES}</style>
        <marker id="arrB" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill={ACCENT_HEX} />
        </marker>
      </defs>

      {/* Central path: ()→(2)→(2,4)→(2,4,6)→(2,4,6,8) */}
      {[
        { x1: 120, y1: 200, x2: 260, y2: 200, lbl: '()', lbx: 80, lby: 200 },
        { x1: 295, y1: 200, x2: 435, y2: 200, lbl: '(2)', lbx: 252, lby: 200 },
        { x1: 470, y1: 200, x2: 610, y2: 200, lbl: '(2,4)', lbx: 430, lby: 200 },
        { x1: 645, y1: 200, x2: 760, y2: 200, lbl: '(2,4,6)', lbx: 600, lby: 200 },
      ].map((e, i) => (
        <g key={i}>
          <line className="dl-1"
            x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
            stroke={ACCENT_HEX} strokeWidth="1.5" markerEnd="url(#arrB)" />
          <circle cx={e.x1 - 35} cy={e.y1} r={28}
            fill="#0a0a0a" stroke={ACCENT_HEX} strokeWidth="1.5"
            className={`pop-${i + 1}`} />
          <text x={e.x1 - 35} y={e.y1 + 4} fill={ACCENT_HEX} fontSize="9"
            fontWeight="700" textAnchor="middle"
            fontFamily="'JetBrains Mono','Fira Code',monospace">{e.lbl}</text>
        </g>
      ))}
      {/* Last node (2,4,6,8) */}
      <circle cx={793} cy={200} r={28}
        fill="#0a0a0a" stroke={ACCENT_HEX} strokeWidth="1.5" className="pop-4" />
      <text x={793} y={196} fill={ACCENT_HEX} fontSize="8"
        fontWeight="700" textAnchor="middle"
        fontFamily="'JetBrains Mono','Fira Code',monospace">···</text>

      {/* Branch from (2) downward (rejected) */}
      <line className="dl-2" x1={277} y1={228} x2={277} y2={300}
        stroke="#555" strokeWidth="1" strokeDasharray="4 3" markerEnd="url(#arrB)" />
      <circle cx={277} cy={320} r={22}
        fill="#0a0a0a" stroke="#555" strokeWidth="1" className="pop-3" />
      <text x={277} y={324} fill="#555" fontSize="8.5"
        textAnchor="middle" fontFamily="'JetBrains Mono','Fira Code',monospace">(2,2)</text>
      <text x={277} y={352} fill="#ff4444" fontSize="8"
        textAnchor="middle" fontFamily="Inter,sans-serif" fontWeight="800">✗ CONFLICTO</text>

      {/* Annotation */}
      <g className="fsu-3">
        <rect x={42} y={52} width={360} height={84} rx="6"
          fill="rgba(245,230,66,0.04)" stroke="rgba(245,230,66,0.18)" strokeWidth="1" />
        <text x={222} y={80} fill="#aaa" fontSize="10"
          textAnchor="middle" fontFamily="Inter,sans-serif">Arista: transición de estado válida</text>
        <text x={222} y={100} fill={ACCENT_HEX} fontSize="12"
          fontWeight="600" textAnchor="middle"
          fontFamily="'JetBrains Mono','Fira Code',monospace">(c₁,…,cₖ)  →  (c₁,…,cₖ,cₖ₊₁)</text>
        <text x={222} y={120} fill="#666" fontSize="9.5"
          textAnchor="middle" fontFamily="Inter,sans-serif">una sola extensión por arista · sin ciclos · estructura de árbol</text>
      </g>

      <text x={420} y={392} fill="#444" fontSize="9.5" textAnchor="middle"
        fontFamily="Inter,sans-serif" letterSpacing="0.08em">
        GRAFO DIRIGIDO · ARISTAS = EXTENSIONES VÁLIDAS · RAÍZ EN k=0
      </text>
    </svg>
  )
}

// ─── Step C — DFS / Backtracking traversal ────────────────────────────────────
function VizC() {
  // Show a partial DFS tree with backtrack arrow
  const nodes = [
    { id: 'r', x: 420, y: 42, label: '()', depth: 0, state: 'visited' },
    { id: 'n1', x: 180, y: 120, label: '(1)', depth: 1, state: 'visited' },
    { id: 'n3', x: 420, y: 120, label: '(3)', depth: 1, state: 'future' },
    { id: 'n5', x: 550, y: 120, label: '(5)', depth: 1, state: 'future' },
    { id: 'n13', x: 80, y: 210, label: '(1,3)', depth: 2, state: 'visited' },
    { id: 'n15', x: 220, y: 210, label: '(1,5)', depth: 2, state: 'future' },
    { id: 'n135', x: 80, y: 300, label: '(1,3,5)', depth: 3, state: 'dead' },
    { id: 'n137', x: 220, y: 300, label: '(1,3,7)', depth: 3, state: 'current' },
    { id: 'sol', x: 220, y: 380, label: 'k=8 ✓', depth: 4, state: 'solution' },
  ]
  const edges = [
    { p: 'r', c: 'n1' }, { p: 'r', c: 'n3' }, { p: 'r', c: 'n5' },
    { p: 'n1', c: 'n13' }, { p: 'n1', c: 'n15' },
    { p: 'n13', c: 'n135' }, { p: 'n13', c: 'n137' },
    { p: 'n137', c: 'sol' },
  ]
  const pos: Record<string, { x: number; y: number }> = Object.fromEntries(nodes.map(n => [n.id, { x: n.x, y: n.y }]))
  const stateColor: Record<string, string> = {
    visited: '#555',
    future: '#2a2a2a',
    dead: '#ff4444',
    current: ACCENT_HEX,
    solution: '#7dff9a',
  }

  return (
    <svg viewBox="0 0 840 420" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid meet">
      <defs>
        <style>{KEYFRAMES}</style>
        <marker id="arrC" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
          <path d="M0,0 L0,6 L7,3 z" fill="#555" />
        </marker>
        <marker id="arrCbt" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
          <path d="M0,0 L0,6 L7,3 z" fill="#ff4444" />
        </marker>
      </defs>

      {edges.map((e, i) => {
        const p = pos[e.p], c = pos[e.c]
        return (
          <line key={i} className="dl-1"
            x1={p.x} y1={p.y + 18} x2={c.x} y2={c.y - 18}
            stroke="#333" strokeWidth="1" markerEnd="url(#arrC)" />
        )
      })}

      {/* Backtrack arrow from dead node */}
      <path className="dl-2"
        d="M80,282 Q20,260 80,210" fill="none"
        stroke="#ff4444" strokeWidth="1.5" strokeDasharray="4 3"
        markerEnd="url(#arrCbt)" />
      <text x={22} y={250} fill="#ff4444" fontSize="8.5"
        fontFamily="Inter,sans-serif" fontWeight="800">PODA</text>

      {nodes.map((n, i) => (
        <g key={n.id} className={`pop-${Math.min(4, i + 1)}`}>
          <circle cx={n.x} cy={n.y} r={18}
            fill="#0a0a0a" stroke={stateColor[n.state]}
            strokeWidth={n.state === 'current' || n.state === 'solution' ? '2' : '1'} />
          <text x={n.x} y={n.y + 4} fill={stateColor[n.state]} fontSize="8"
            fontWeight="700" textAnchor="middle"
            fontFamily="'JetBrains Mono','Fira Code',monospace">{n.label}</text>
        </g>
      ))}

      {/* DFS Legend */}
      {[
        { color: '#555', label: 'Nodo visitado (DFS)' },
        { color: ACCENT_HEX, label: 'Nodo actual' },
        { color: '#ff4444', label: 'Nodo sin extensiones (poda)' },
        { color: '#7dff9a', label: 'Hoja solución k=8' },
      ].map((l, i) => (
        <g key={l.label} className="fsu-4">
          <circle cx={660} cy={90 + i * 28} r={6} fill={l.color} />
          <text x={672} y={94 + i * 28} fill={l.color} fontSize="9.5"
            fontFamily="Inter,sans-serif">{l.label}</text>
        </g>
      ))}

      <text x={420} y={410} fill="#444" fontSize="9.5" textAnchor="middle"
        fontFamily="Inter,sans-serif" letterSpacing="0.08em">
        RECORRIDO EN PROFUNDIDAD (DFS) · BACKTRACKING CON PODA
      </text>
    </svg>
  )
}

// ─── Step D — Independence number Q_{8,8} ─────────────────────────────────────
function VizD() {
  // Mini 8×8 board showing one of the 92 independent sets
  const SZ = 34
  const OX = 60
  const OY = 30
  const solution = [0, 4, 7, 5, 2, 6, 1, 3] // col index per row (0-based)

  return (
    <svg viewBox="0 0 840 360" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid meet">
      <defs><style>{KEYFRAMES}</style></defs>

      {/* Board */}
      <g className="fsr-1">
        {Array.from({ length: 8 }, (_, r) =>
          Array.from({ length: 8 }, (_, c) => {
            const isQueen = solution[r] === c
            const light = (r + c) % 2 === 0
            return (
              <rect key={`${r}-${c}`}
                x={OX + c * SZ} y={OY + r * SZ}
                width={SZ - 1} height={SZ - 1}
                fill={isQueen ? ACCENT_HEX : light ? '#181818' : '#111'}
                stroke={isQueen ? ACCENT_HEX : '#2a2a2a'}
                strokeWidth="1"
              />
            )
          })
        )}
        {/* Queens */}
        {solution.map((col, row) => (
          <text key={row}
            x={OX + col * SZ + SZ / 2} y={OY + row * SZ + SZ - 6}
            fill="#000" fontSize="18" textAnchor="middle"
            fontFamily="Inter,sans-serif">♛</text>
        ))}
        {/* Row + col labels */}
        {Array.from({ length: 8 }, (_, i) => (
          <g key={i}>
            <text x={OX - 10} y={OY + i * SZ + SZ / 2 + 4}
              fill="#555" fontSize="9" textAnchor="middle"
              fontFamily="Inter,sans-serif">{i + 1}</text>
            <text x={OX + i * SZ + SZ / 2} y={OY - 8}
              fill="#555" fontSize="9" textAnchor="middle"
              fontFamily="Inter,sans-serif">{i + 1}</text>
          </g>
        ))}
      </g>

      {/* Stats panel */}
      <g className="fsu-2">
        <rect x={360} y={30} width={430} height={260} rx="8"
          fill="rgba(245,230,66,0.03)" stroke="rgba(245,230,66,0.14)" strokeWidth="1" />

        {[
          { tag: 'GRAFO DE REINAS Q₈,₈', value: '64 vértices · 8×8 casillas', y: 75, color: '#888' },
          { tag: 'ARISTAS', value: 'casillas que se amenazan', y: 115, color: '#888' },
          { tag: 'NÚMERO DE INDEPENDENCIA', value: 'α(Q₈,₈) = 8', y: 155, color: ACCENT_HEX },
          { tag: 'CONJUNTOS INDEPENDIENTES', value: '92 conjuntos de tamaño 8', y: 195, color: '#7dff9a' },
          { tag: 'RELACIÓN BIUNÍVOCA', value: '1 solución ↔ 1 conjunto maximal', y: 240, color: '#e0a0ff' },
        ].map(s => (
          <g key={s.tag}>
            <text x={385} y={s.y - 14} fill="rgba(255,255,255,0.28)" fontSize="8"
              fontWeight="800" letterSpacing="0.14em"
              fontFamily="Inter,sans-serif">{s.tag}</text>
            <text x={385} y={s.y} fill={s.color} fontSize={s.color === ACCENT_HEX ? '22' : '14'}
              fontWeight="600" fontFamily="'JetBrains Mono','Fira Code',monospace">{s.value}</text>
          </g>
        ))}
      </g>

      <text x={420} y={350} fill="#444" fontSize="9.5" textAnchor="middle"
        fontFamily="Inter,sans-serif" letterSpacing="0.08em">
        α(Q₈,₈) = 8 · LAS 92 SOLUCIONES SON LOS 92 CONJUNTOS INDEPENDIENTES MAXIMALES DE TAMAÑO 8
      </text>
    </svg>
  )
}

// ─── Step E — Bipartite graph rows vs columns ─────────────────────────────────
function VizE() {
  const rows = Array.from({ length: 8 }, (_, i) => ({ id: `F${i + 1}`, y: 48 + i * 36 }))
  const cols = Array.from({ length: 8 }, (_, i) => ({ id: `C${i + 1}`, y: 48 + i * 36 }))
  // Matching: one valid solution (0-based col for each row)
  const matching = [0, 4, 7, 5, 2, 6, 1, 3]

  return (
    <svg viewBox="0 0 840 360" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid meet">
      <defs><style>{KEYFRAMES}</style></defs>

      {/* U label */}
      <text x={180} y={24} fill="#888" fontSize="9.5" textAnchor="middle"
        fontFamily="Inter,sans-serif" letterSpacing="0.1em" fontWeight="800">
        U = FILAS
      </text>
      <text x={600} y={24} fill="#888" fontSize="9.5" textAnchor="middle"
        fontFamily="Inter,sans-serif" letterSpacing="0.1em" fontWeight="800">
        V = COLUMNAS
      </text>

      {/* All possible edges (faint) */}
      {rows.map((r, ri) =>
        cols.map((c, ci) => {
          const isMatch = matching[ri] === ci
          return (
            <line key={`${ri}-${ci}`}
              x1={220} y1={r.y} x2={560} y2={c.y}
              stroke={isMatch ? ACCENT_HEX : 'rgba(255,255,255,0.04)'}
              strokeWidth={isMatch ? '1.8' : '0.5'}
            />
          )
        })
      )}

      {/* Row nodes (U) */}
      {rows.map((r, i) => (
        <g key={r.id} className="fsr-1">
          <circle cx={180} cy={r.y} r={14}
            fill="#0a0a0a" stroke="#69b6dd" strokeWidth="1.5" />
          <text x={180} y={r.y + 4} fill="#69b6dd" fontSize="10"
            fontWeight="700" textAnchor="middle"
            fontFamily="Inter,sans-serif">F{i + 1}</text>
        </g>
      ))}

      {/* Col nodes (V) */}
      {cols.map((c, i) => (
        <g key={c.id} className="fsr-2">
          <circle cx={600} cy={c.y} r={14}
            fill="#0a0a0a" stroke="#e0a0ff" strokeWidth="1.5" />
          <text x={600} y={c.y + 4} fill="#e0a0ff" fontSize="10"
            fontWeight="700" textAnchor="middle"
            fontFamily="Inter,sans-serif">C{i + 1}</text>
        </g>
      ))}

      {/* Matching labels */}
      {rows.map((r, ri) => {
        const ci = matching[ri]
        const mx = (220 + 560) / 2
        const my = (r.y + cols[ci].y) / 2
        return (
          <text key={ri} x={mx} y={my - 4} fill={ACCENT_HEX} fontSize="7.5"
            textAnchor="middle" fontFamily="'JetBrains Mono','Fira Code',monospace"
            className="fsu-3">
            (F{ri + 1},C{ci + 1})
          </text>
        )
      })}

      {/* Constraint note */}
      <g className="fsu-4">
        <rect x={660} y={50} width={160} height={90} rx="6"
          fill="rgba(245,230,66,0.05)" stroke="rgba(245,230,66,0.2)" strokeWidth="1" />
        <text x={740} y={72} fill="#888" fontSize="8.5"
          textAnchor="middle" fontFamily="Inter,sans-serif">Restricción diagonal:</text>
        <text x={740} y={90} fill={ACCENT_HEX} fontSize="10"
          fontWeight="700" textAnchor="middle"
          fontFamily="'JetBrains Mono','Fira Code',monospace">|Fu−Fv|≠|Cu−Cv|</text>
        <text x={740} y={108} fill="#666" fontSize="8"
          textAnchor="middle" fontFamily="Inter,sans-serif">para todo par de aristas</text>
        <text x={740} y={126} fill="#666" fontSize="8"
          textAnchor="middle" fontFamily="Inter,sans-serif">seleccionadas del matching</text>
      </g>

      <text x={420} y={350} fill="#444" fontSize="9.5" textAnchor="middle"
        fontFamily="Inter,sans-serif" letterSpacing="0.08em">
        GRAFO BIPARTITO G=(U,V,E) · EMPAREJAMIENTO PERFECTO DE TAMAÑO 8 SIN CONFLICTOS DIAGONALES
      </text>
    </svg>
  )
}

// ─── Step F — Graph coloring model ────────────────────────────────────────────
function VizF() {
  // 8 column-vertices in a circle, colored by their assigned row
  const cx = 420, cy = 185, r = 130
  const rowColors = [
    '#F5E642', '#69b6dd', '#e0a0ff', '#ff9f67',
    '#7dff9a', '#ff6b6b', '#5ecfff', '#ffb347',
  ]
  const solution = [1, 5, 8, 6, 3, 7, 2, 4] // row assigned (1-based) per column

  const nodePos = Array.from({ length: 8 }, (_, i) => {
    const angle = (i / 8) * 2 * Math.PI - Math.PI / 2
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) }
  })

  // Attack edges (diagonal conflicts between some pairs)
  const conflictPairs: [number, number][] = []
  for (let i = 0; i < 8; i++) {
    for (let j = i + 1; j < 8; j++) {
      if (Math.abs(i - j) === Math.abs(solution[i] - solution[j])) {
        // Diagonal conflict — but with valid solution these shouldn't exist
        // For visualization, show a couple of "potential" conflict edges (dashed) between others
      }
      // Show all edges (incompatibilities in general model)
      if (Math.abs(i - j) <= 2) conflictPairs.push([i, j])
    }
  }

  return (
    <svg viewBox="0 0 840 380" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid meet">
      <defs><style>{KEYFRAMES}</style></defs>

      {/* Incompatibility edges (dashed) */}
      {conflictPairs.map(([a, b], i) => (
        <line key={i}
          x1={nodePos[a].x} y1={nodePos[a].y}
          x2={nodePos[b].x} y2={nodePos[b].y}
          stroke="rgba(255,255,255,0.28)" strokeWidth="1" strokeDasharray="3 3"
        />
      ))}

      {/* Nodes colored by row assignment */}
      {nodePos.map((p, i) => (
        <g key={i} className={`pop-${Math.min(4, Math.floor(i / 2) + 1)}`}>
          <circle cx={p.x} cy={p.y} r={22}
            fill="#0a0a0a" stroke={rowColors[solution[i] - 1]} strokeWidth="2.5" />
          <text x={p.x} y={p.y - 4} fill={rowColors[solution[i] - 1]} fontSize="8"
            fontWeight="800" textAnchor="middle" fontFamily="Inter,sans-serif">
            Col {i + 1}
          </text>
          <text x={p.x} y={p.y + 10} fill={rowColors[solution[i] - 1]} fontSize="10"
            fontWeight="700" textAnchor="middle"
            fontFamily="'JetBrains Mono','Fira Code',monospace">
            F{solution[i]}
          </text>
        </g>
      ))}

      {/* Color legend */}
      <g className="fsu-3">
        <rect x={28} y={30} width={155} height={230} rx="6"
          fill="rgba(255,255,255,0.03)" stroke="#2a2a2a" strokeWidth="1" />
        <text x={106} y={52} fill="#888" fontSize="8.5"
          textAnchor="middle" fontFamily="Inter,sans-serif"
          fontWeight="800" letterSpacing="0.1em">8 COLORES = 8 FILAS</text>
        {rowColors.map((col, i) => (
          <g key={i}>
            <rect x={44} y={64 + i * 22} width={10} height={10} rx="2" fill={col} />
            <text x={60} y={73 + i * 22} fill={col} fontSize="9.5"
              fontFamily="Inter,sans-serif">Fila {i + 1}</text>
          </g>
        ))}
      </g>

      {/* Annotation */}
      <g className="fsu-4">
        <rect x={628} y={30} width={185} height={120} rx="6"
          fill="rgba(245,230,66,0.04)" stroke="rgba(245,230,66,0.18)" strokeWidth="1" />
        <text x={720} y={54} fill="#888" fontSize="8.5"
          textAnchor="middle" fontFamily="Inter,sans-serif" fontWeight="800">MODELO DE COLOREO</text>
        <text x={720} y={78} fill="#aaa" fontSize="8.5"
          textAnchor="middle" fontFamily="Inter,sans-serif">Vértices = 8 columnas</text>
        <text x={720} y={96} fill="#aaa" fontSize="8.5"
          textAnchor="middle" fontFamily="Inter,sans-serif">Colores = 8 filas</text>
        <text x={720} y={114} fill="#aaa" fontSize="8.5"
          textAnchor="middle" fontFamily="Inter,sans-serif">Aristas = ataques diagonales</text>
        <text x={720} y={132} fill={ACCENT_HEX} fontSize="9"
          textAnchor="middle" fontFamily="Inter,sans-serif" fontWeight="700">→ Coloreo propio válido</text>
      </g>

      <text x={420} y={372} fill="#444" fontSize="9.5" textAnchor="middle"
        fontFamily="Inter,sans-serif" letterSpacing="0.08em">
        GRAFO DE INCOMPATIBILIDADES · COLOREO CON 8 COLORES (FILAS) · BACKTRACKING
      </text>
    </svg>
  )
}

// ─── Theory items ─────────────────────────────────────────────────────────────
const theoryItems = [
  'Grafos Dirigidos',
  'Vectores k-Prometedores',
  'DFS / Backtracking',
  'Número de Independencia',
  'Grafos Bipartitos',
  'Coloreo de Grafos',
]

// ─── Approach ─────────────────────────────────────────────────────────────────
const approach = (
  <>
    <p>
      Reformulamos el problema de las ocho reinas como un <strong>grafo dirigido</strong> donde los nodos
      representan configuraciones parciales (vectores <em>k</em>-prometedores) y las aristas son
      las extensiones válidas al agregar una reina. Este enfoque unifica cinco modelos clásicos:
      árbol de búsqueda, conjunto independiente, emparejamiento bipartito y coloreo de grafos.
    </p>
    <p>
      La estrategia central es explorar el grafo mediante <strong>recorrido en profundidad (DFS)</strong>
      con poda agresiva: si un nodo parcial no tiene extensiones válidas, retrocedemos de inmediato
      sin explorar ramas inviables. Las hojas alcanzables con <em>k = 8</em> son exactamente las
      92 soluciones clásicas del problema.
    </p>
  </>
)

// ─── Resolution ───────────────────────────────────────────────────────────────
const resolution = (
  <>
    {/* ── PASO 01 — Vértices como vectores k-prometedores ── */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#0d0d08', position: 'relative', overflow: 'hidden' }}>
        <p className="pp-step-category">Definición de Vértices</p>
        <VizA />
      </div>
      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p>
            Los vértices del grafo son tuplas <strong>V = {'{'}(c₁, c₂, …, cₖ) | 0 ≤ k ≤ 8{'}'}</strong>,
            donde cᵢ es la fila ocupada por la reina en la columna&nbsp;i. La condición estricta es que
            ninguna de las <em>k</em> reinas colocadas se amenace mutuamente — es decir, sin filas,
            columnas ni diagonales compartidas. El vector vacío <strong>()</strong> con k=0
            es la raíz; los vectores con k=8 son las posibles hojas.
          </p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">Paso 01</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Vectores k-Prometedores</h3></div>
        </div>
      </div>
    </div>

    {/* ── PASO 02 — Aristas como extensiones válidas / árbol ── */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#0d0c08', position: 'relative', overflow: 'hidden' }}>
        <p className="pp-step-category">Aristas y Estructura de Árbol</p>
        <VizB />
      </div>
      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p>
            Las aristas representan <strong>transiciones de estado válidas</strong>: conectan un nodo
            (c₁,…,cₖ) con su hijo (c₁,…,cₖ, cₖ₊₁), agregando exactamente una reina segura.
            El grafo forma un <strong>árbol con raíz en el vector vacío</strong> porque cada
            configuración parcial se deriva de una única secuencia de decisiones — no existen
            ciclos ni múltiples caminos hacia un mismo estado parcial exacto.
          </p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">Paso 02</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Estructura de Árbol</h3></div>
        </div>
      </div>
    </div>

    {/* ── PASO 03 — DFS Backtracking ── */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#090d09', position: 'relative', overflow: 'hidden' }}>
        <p className="pp-step-category">Exploración del Grafo · DFS</p>
        <VizC />
      </div>
      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p>
            El <strong>recorrido en profundidad (DFS)</strong> implementa el algoritmo de backtracking:
            se desciende por las ramas agregando reinas (k+1) y validando restricciones en cada paso.
            Si un nodo no posee transiciones válidas — ninguna casilla segura en la siguiente columna —
            el algoritmo <strong>retrocede (poda)</strong> al nodo padre sin seguir explorando esa rama.
            Las soluciones finales se encuentran exclusivamente en las hojas del nivel <strong>k = 8</strong>.
          </p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">Paso 03</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Exploración DFS</h3></div>
        </div>
      </div>
    </div>

    {/* ── PASO 04 — Número de independencia Q_{8,8} ── */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#0d0d0a', position: 'relative', overflow: 'hidden' }}>
        <p className="pp-step-category">Teoría de Grafos · Conjunto Independiente</p>
        <VizD />
      </div>
      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p>
            En el grafo de 64 casillas donde las aristas conectan casillas que se amenazan,
            el <strong>número de independencia máxima α(Q₈,₈) = 8</strong>: el conjunto máximo de vértices
            que no comparten ninguna arista tiene exactamente 8 elementos. Las{' '}
            <strong>92 soluciones</strong> del problema corresponden de manera biunívoca a los
            92 conjuntos independientes maximales exactos de tamaño 8 en este grafo.
          </p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">Paso 04</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Número de Independencia</h3></div>
        </div>
      </div>
    </div>

    {/* ── PASO 05 — Grafo bipartito filas vs columnas ── */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#0a0a0d', position: 'relative', overflow: 'hidden' }}>
        <p className="pp-step-category">Grafo Bipartito · Emparejamiento Perfecto</p>
        <VizE />
      </div>
      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p>
            Se modela como <strong>G = (U, V, E)</strong> donde U = {'{'}F₁,…,F₈{'}'} son las filas
            y V = {'{'}C₁,…,C₈{'}'} las columnas. Una solución equivale a un{' '}
            <strong>emparejamiento perfecto de tamaño 8</strong>, bajo la restricción secundaria de que
            para cualquier par de aristas seleccionadas (Fᵤ, Cᵤ) y (Fᵥ, Cᵥ), se debe cumplir
            <strong> |Fᵤ − Fᵥ| ≠ |Cᵤ − Cᵥ|</strong> para evitar conflictos diagonales.
          </p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">Paso 05</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Grafo Bipartito</h3></div>
        </div>
      </div>
    </div>

    {/* ── PASO 06 — Coloreo de grafos ── */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#0d0a0d', position: 'relative', overflow: 'hidden' }}>
        <p className="pp-step-category">Coloreo de Grafos · Backtracking</p>
        <VizF />
      </div>
      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p>
            Se modelan los <strong>8 vértices como las 8 columnas</strong> del tablero y los{' '}
            <strong>8 colores como las 8 filas</strong>. Dos vértices (columnas) tienen una arista si
            la asignación de sus colores (filas) violaría las reglas del ajedrez — misma fila o misma
            diagonal. El algoritmo de <strong>coloreo con backtracking</strong> asigna un color único
            a cada vértice validando iterativamente que los vértices adyacentes no compartan color,
            equivalente directo a las restricciones del problema de las ocho reinas.
          </p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">Paso 06</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Coloreo de Grafos</h3></div>
        </div>
      </div>
    </div>
  </>
)

export default function Problem4() {
  return (
    <ProblemPage
      number="04"
      subject="Teoría de Grafos"
      title="Ocho Reinas como Grafo Dirigido"
      question="¿Cómo se puede reformular el problema de las ocho reinas utilizando teorías de grafos?"
      heroBackground="#1e1c08"
      accent={ACCENT}
      theoryItems={theoryItems}
      approach={approach}
      resolution={resolution}
    />
  )
}
