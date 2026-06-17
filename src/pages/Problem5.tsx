import ProblemPage from '../components/ProblemPage/ProblemPage'

const ACCENT = 'var(--accent-pink)'
const ACCENT_HEX = '#FF2D78'

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
  .pop-1 { opacity:0; animation:popIn 0.5s cubic-bezier(.175,.885,.32,1.275) forwards 0.3s;  }
  .pop-2 { opacity:0; animation:popIn 0.5s cubic-bezier(.175,.885,.32,1.275) forwards 0.6s;  }
  .pop-3 { opacity:0; animation:popIn 0.5s cubic-bezier(.175,.885,.32,1.275) forwards 0.9s;  }
  .pop-4 { opacity:0; animation:popIn 0.5s cubic-bezier(.175,.885,.32,1.275) forwards 1.2s;  }
  .dl-1  { stroke-dasharray:1200; stroke-dashoffset:1200; animation:drawLine 1.2s ease forwards 0.3s; }
  .dl-2  { stroke-dasharray:1200; stroke-dashoffset:1200; animation:drawLine 1.2s ease forwards 0.6s; }
  .dl-3  { stroke-dasharray:1200; stroke-dashoffset:1200; animation:drawLine 1.2s ease forwards 0.9s; }
  .pg    { animation:pulseGlow 2.4s ease-in-out infinite; }
`

// ─── Viz A — 2D Octagon with translation path ─────────────────────────────────
function VizA() {
  // Octagon vertices around center (5,2) with radius 3 — displayed on a mini grid
  const scale = 28
  const offX = 130
  const offY = 200

  const toSvg = (x: number, y: number) => ({
    sx: offX + x * scale,
    sy: offY - y * scale,
  })

  // Octagon vertices for a regular octagon centered at (5,2) r=3
  const octPts = Array.from({ length: 8 }, (_, i) => {
    const angle = (Math.PI / 8) + i * (Math.PI / 4)
    return { x: 5 + 3 * Math.cos(angle), y: 2 + 3 * Math.sin(angle) }
  })

  // Translated octagon by (3,-2) → center (8,0)
  const octPts2 = octPts.map(p => ({ x: p.x + 3, y: p.y - 2 }))

  const pts1 = octPts.map(p => toSvg(p.x, p.y))
  const pts2 = octPts2.map(p => toSvg(p.x, p.y))

  const poly1 = pts1.map(p => `${p.sx},${p.sy}`).join(' ')
  const poly2 = pts2.map(p => `${p.sx},${p.sy}`).join(' ')

  const { sx: c1x, sy: c1y } = toSvg(5, 2)
  const { sx: c2x, sy: c2y } = toSvg(8, 0)

  return (
    <svg viewBox="0 0 840 400" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid meet">
      <defs><style>{KEYFRAMES}</style></defs>

      {/* Axis grid */}
      {Array.from({ length: 13 }, (_, i) => (
        <line key={`gx${i}`} x1={offX + (i - 1) * scale} y1={30} x2={offX + (i - 1) * scale} y2={370}
          stroke="#1a1a1a" strokeWidth="0.5" />
      ))}
      {Array.from({ length: 14 }, (_, i) => (
        <line key={`gy${i}`} x1={60} y1={offY - (i - 5) * scale} x2={780} y2={offY - (i - 5) * scale}
          stroke="#1a1a1a" strokeWidth="0.5" />
      ))}
      <line x1={60} y1={offY} x2={780} y2={offY} stroke="#333" strokeWidth="1" />
      <line x1={offX} y1={30} x2={offX} y2={370} stroke="#333" strokeWidth="1" />

      {/* Original octagon */}
      <polygon className="fsr-1" points={poly1} fill="rgba(255,45,120,0.08)" stroke={ACCENT_HEX} strokeWidth="1.5" strokeDasharray="5 3" />
      <circle className="pop-1" cx={c1x} cy={c1y} r={5} fill={ACCENT_HEX} opacity={0.6} />
      <text x={c1x + 8} y={c1y - 8} fill={ACCENT_HEX} fontSize="11" fontFamily="Inter,sans-serif" className="fsu-1"
        fontWeight="600">V₁ = (5, 2)</text>

      {/* Arrow for translation */}
      <defs>
        <marker id="arrT" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#F5E642" />
        </marker>
      </defs>
      <line className="dl-1" x1={c1x} y1={c1y} x2={c2x} y2={c2y}
        stroke="#F5E642" strokeWidth="1.5" markerEnd="url(#arrT)" />
      <text x={(c1x + c2x) / 2 + 8} y={(c1y + c2y) / 2 - 10} fill="#F5E642" fontSize="10"
        fontFamily="Inter,sans-serif" className="fsu-2" fontWeight="700">T(3, −2)</text>

      {/* Translated octagon */}
      <polygon className="fsr-2" points={poly2} fill="rgba(245,230,66,0.06)" stroke="#F5E642" strokeWidth="1.5" />
      <circle className="pop-2" cx={c2x} cy={c2y} r={5} fill="#F5E642" />
      <text x={c2x + 8} y={c2y + 4} fill="#F5E642" fontSize="11" fontFamily="Inter,sans-serif" className="fsu-2"
        fontWeight="600">V₂ = (8, 0)</text>

      {/* Axis labels */}
      <text x={775} y={offY + 14} fill="#555" fontSize="11" fontFamily="Inter,sans-serif">x</text>
      <text x={offX - 14} y={38} fill="#555" fontSize="11" fontFamily="Inter,sans-serif">y</text>

      <text x={420} y={392} fill="#444" fontSize="9.5" textAnchor="middle"
        fontFamily="Inter,sans-serif" letterSpacing="0.08em">
        PARTE 1 — 2D · TRASLACIÓN DE V₁(5,2) POR T(3,−2) → V₂(8,0)
      </text>
    </svg>
  )
}

// ─── Viz B — 2D Rotation matrix + vector multiply ─────────────────────────────
function VizB() {
  return (
    <svg viewBox="0 0 840 400" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid meet">
      <defs><style>{KEYFRAMES}</style></defs>

      {/* Rotation matrix R(30°) */}
      <text x={420} y={42} fill="#888" fontSize="10" fontWeight="800" letterSpacing="0.14em"
        fontFamily="Inter,sans-serif" textAnchor="middle">MATRIZ DE ROTACIÓN 30° · R × V₂</text>

      {/* Matrix R */}
      <g className="fsr-1">
        <text x={105} y={78} fill="#888" fontSize="9" fontWeight="700" letterSpacing="0.1em"
          fontFamily="Inter,sans-serif" textAnchor="middle">R =</text>
        {[['√3/2', '−½'], ['½', '√3/2']].map((row, r) =>
          row.map((v, c) => (
            <text key={`rm-${r}-${c}`} x={175 + c * 110} y={90 + r * 72}
              fill={ACCENT_HEX} fontSize="20" fontWeight="700"
              textAnchor="middle" fontFamily="Inter,sans-serif">{v}</text>
          ))
        )}
        <path d="M 130 68 L 123 68 L 123 178 L 130 178" stroke="#444" strokeWidth="1.5" fill="none" />
        <path d="M 310 68 L 317 68 L 317 178 L 310 178" stroke="#444" strokeWidth="1.5" fill="none" />
      </g>

      {/* × */}
      <text x={360} y={135} fill="#555" fontSize="32" fontWeight="300" textAnchor="middle"
        fontFamily="Inter,sans-serif" className="fsu-2">×</text>

      {/* Vector V2 = (8, 0) */}
      <g className="fsr-2">
        <text x={425} y={78} fill="#888" fontSize="9" fontWeight="700" letterSpacing="0.1em"
          fontFamily="Inter,sans-serif" textAnchor="middle">V₂ =</text>
        {['8', '0'].map((v, i) => (
          <text key={`v2-${i}`} x={425} y={90 + i * 72} fill="#aaa" fontSize="22" fontWeight="300"
            textAnchor="middle" fontFamily="Inter,sans-serif">{v}</text>
        ))}
        <path d="M 400 68 L 393 68 L 393 178 L 400 178" stroke="#444" strokeWidth="1.5" fill="none" />
        <path d="M 452 68 L 459 68 L 459 178 L 452 178" stroke="#444" strokeWidth="1.5" fill="none" />
      </g>

      {/* = */}
      <text x={505} y={135} fill="#555" fontSize="32" fontWeight="300" textAnchor="middle"
        fontFamily="Inter,sans-serif" className="fsu-3">=</text>

      {/* Result V3 */}
      <g className="pop-3">
        <text x={590} y={78} fill="#888" fontSize="9" fontWeight="700" letterSpacing="0.1em"
          fontFamily="Inter,sans-serif" textAnchor="middle">V₃ =</text>
        <text x={590} y={95} fill={ACCENT_HEX} fontSize="18" fontWeight="700"
          textAnchor="middle" fontFamily="Inter,sans-serif">4√3</text>
        <text x={590} y={162} fill={ACCENT_HEX} fontSize="18" fontWeight="700"
          textAnchor="middle" fontFamily="Inter,sans-serif">4</text>
        <path d="M 558 68 L 551 68 L 551 178 L 558 178" stroke={ACCENT_HEX} strokeWidth="1.5" fill="none" />
        <path d="M 628 68 L 635 68 L 635 178 L 628 178" stroke={ACCENT_HEX} strokeWidth="1.5" fill="none" />
      </g>

      {/* Calculation detail */}
      <g className="fsu-4">
        <rect x={110} y={220} width={620} height={130} rx="6"
          fill="rgba(255,45,120,0.04)" stroke="rgba(255,45,120,0.2)" strokeWidth="1" />
        <text x={420} y={248} fill="#888" fontSize="9.5" textAnchor="middle"
          fontFamily="Inter,sans-serif" fontWeight="800" letterSpacing="0.1em">CÁLCULO ROW BY ROW</text>
        <text x={420} y={272} fill="#ccc" fontSize="12" textAnchor="middle"
          fontFamily="Inter,sans-serif">
          x = (√3/2)·8 + (−½)·0 = 4√3
        </text>
        <text x={420} y={298} fill="#ccc" fontSize="12" textAnchor="middle"
          fontFamily="Inter,sans-serif">
          y = (½)·8 + (√3/2)·0 = 4
        </text>
        <text x={420} y={330} fill={ACCENT_HEX} fontSize="13" fontWeight="700" textAnchor="middle"
          fontFamily="Inter,sans-serif">
          V₃ = (4√3, 4)
        </text>
      </g>

      <text x={420} y={392} fill="#444" fontSize="9.5" textAnchor="middle"
        fontFamily="Inter,sans-serif" letterSpacing="0.08em">
        ROTACIÓN 30° ANTIHORARIO RESPECTO AL ORIGEN
      </text>
    </svg>
  )
}

// ─── Viz C — 2D Scaling + final result ────────────────────────────────────────
function VizC() {
  return (
    <svg viewBox="0 0 840 400" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid meet">
      <defs><style>{KEYFRAMES}</style></defs>

      <text x={420} y={40} fill="#888" fontSize="10" fontWeight="800" letterSpacing="0.14em"
        fontFamily="Inter,sans-serif" textAnchor="middle">ESCALADO × 3.5 · RESULTADO FINAL PARTE 1</text>

      {/* Scale formula */}
      <g className="fsu-1">
        <text x={420} y={90} fill="#ccc" fontSize="15" textAnchor="middle" fontFamily="Inter,sans-serif">
          V₄ = V₃ × 3.5 = (4√3, 4) × 3.5 = (14√3, 14)
        </text>
      </g>

      {/* Division line */}
      <line className="dl-1" x1={180} y1={112} x2={660} y2={112} stroke="#2a2a2a" strokeWidth="1" />

      {/* Result breakdown */}
      <g className="fsu-2">
        <text x={420} y={148} fill="#888" fontSize="10" textAnchor="middle"
          fontFamily="Inter,sans-serif" letterSpacing="0.1em" fontWeight="800">CONVERSIÓN A DECIMALES</text>
        <text x={420} y={178} fill="#ccc" fontSize="13" textAnchor="middle" fontFamily="Inter,sans-serif">
          X = 14 × √3 = 14 × 1.732 ≈ 24.25
        </text>
        <text x={420} y={205} fill="#ccc" fontSize="13" textAnchor="middle" fontFamily="Inter,sans-serif">
          Y = 14
        </text>
      </g>

      {/* Final answer box */}
      <g className="pop-3">
        <rect x={240} y={230} width={360} height={90} rx="8"
          fill="rgba(255,45,120,0.07)" stroke={ACCENT_HEX} strokeWidth="1.5" />
        <text x={420} y={262} fill="#888" fontSize="9" fontWeight="800" letterSpacing="0.15em"
          textAnchor="middle" fontFamily="Inter,sans-serif">COORDENADAS FINALES — PARTE 1</text>
        <text x={420} y={296} fill={ACCENT_HEX} fontSize="26" fontWeight="800" textAnchor="middle"
          fontFamily="Inter,sans-serif">V₄ = (24.25, 14)</text>
      </g>

      {/* Transformation chain */}
      <g className="fsu-4">
        {[
          { label: 'V₁', sub: '(5,2)', color: '#555' },
          { label: '+T', sub: '(3,−2)', color: '#777' },
          { label: 'V₂', sub: '(8,0)', color: '#999' },
          { label: 'R30°', sub: '', color: '#bbb' },
          { label: 'V₃', sub: '(4√3,4)', color: '#ddd' },
          { label: '×3.5', sub: '', color: '#eee' },
          { label: 'V₄', sub: '(24.25,14)', color: ACCENT_HEX },
        ].map((s, i) => (
          <g key={s.label}>
            <text x={80 + i * 104} y={356} fill={s.color} fontSize="11" fontWeight="700"
              textAnchor="middle" fontFamily="Inter,sans-serif">{s.label}</text>
            <text x={80 + i * 104} y={372} fill={s.color} fontSize="9"
              textAnchor="middle" fontFamily="Inter,sans-serif">{s.sub}</text>
            {i < 6 && (
              <text x={80 + i * 104 + 52} y={357} fill="#333" fontSize="14"
                textAnchor="middle" fontFamily="Inter,sans-serif">→</text>
            )}
          </g>
        ))}
      </g>
    </svg>
  )
}

// ─── Viz D — 3D Homogeneous initial point + Rz(180°) ─────────────────────────
function VizD() {
  return (
    <svg viewBox="0 0 840 400" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid meet">
      <defs><style>{KEYFRAMES}</style></defs>

      <text x={420} y={38} fill="#888" fontSize="10" fontWeight="800" letterSpacing="0.14em"
        fontFamily="Inter,sans-serif" textAnchor="middle">PARTE 2 — 3D · PUNTO INICIAL + PASO 1: Rz(180°)</text>

      {/* P0 vector */}
      <g className="fsr-1">
        <text x={118} y={75} fill="#888" fontSize="9" fontWeight="700" letterSpacing="0.1em"
          fontFamily="Inter,sans-serif" textAnchor="middle">P₀ =</text>
        {['1', '0', '0', '1'].map((v, i) => (
          <text key={i} x={118} y={92 + i * 52} fill="#aaa" fontSize="18" fontWeight="300"
            textAnchor="middle" fontFamily="Inter,sans-serif">{v}</text>
        ))}
        <path d="M 90 66 L 83 66 L 83 230 L 90 230" stroke="#444" strokeWidth="1.5" fill="none" />
        <path d="M 148 66 L 155 66 L 155 230 L 148 230" stroke="#444" strokeWidth="1.5" fill="none" />
      </g>

      {/* M1 matrix Rz(180°) */}
      <g className="fsr-2">
        <text x={310} y={75} fill="#888" fontSize="9" fontWeight="700" letterSpacing="0.1em"
          fontFamily="Inter,sans-serif" textAnchor="middle">M₁ = Rz(180°)</text>
        {[[-1,0,0,0],[0,-1,0,0],[0,0,1,0],[0,0,0,1]].map((row, r) =>
          row.map((v, c) => (
            <text key={`m1-${r}-${c}`} x={230 + c * 64} y={94 + r * 44}
              fill={v !== 0 && Math.abs(v) === 1 && (r === 0 || r === 1) ? ACCENT_HEX : '#666'}
              fontSize="16" fontWeight={v !== 0 ? '700' : '300'}
              textAnchor="middle" fontFamily="Inter,sans-serif">{v}</text>
          ))
        )}
        <path d="M 196 66 L 189 66 L 189 230 L 196 230" stroke="#444" strokeWidth="1.5" fill="none" />
        <path d="M 430 66 L 437 66 L 437 230 L 430 230" stroke="#444" strokeWidth="1.5" fill="none" />
      </g>

      {/* = */}
      <text x={490} y={155} fill="#555" fontSize="28" fontWeight="300" textAnchor="middle"
        fontFamily="Inter,sans-serif" className="fsu-2">=</text>

      {/* P1 result */}
      <g className="pop-3">
        <text x={580} y={75} fill="#888" fontSize="9" fontWeight="700" letterSpacing="0.1em"
          fontFamily="Inter,sans-serif" textAnchor="middle">P₁ =</text>
        {['-1', '0', '0', '1'].map((v, i) => (
          <text key={i} x={580} y={94 + i * 44} fill={v === '-1' ? ACCENT_HEX : '#888'} fontSize="18"
            fontWeight={v === '-1' ? '700' : '300'}
            textAnchor="middle" fontFamily="Inter,sans-serif">{v}</text>
        ))}
        <path d="M 552 66 L 545 66 L 545 230 L 552 230" stroke={ACCENT_HEX} strokeWidth="1.5" fill="none" />
        <path d="M 612 66 L 619 66 L 619 230 L 612 230" stroke={ACCENT_HEX} strokeWidth="1.5" fill="none" />
      </g>

      {/* Note */}
      <g className="fsu-4">
        <rect x={190} y={250} width={460} height={108} rx="6"
          fill="rgba(255,45,120,0.04)" stroke="rgba(255,45,120,0.18)" strokeWidth="1" />
        <text x={420} y={274} fill="#888" fontSize="9" textAnchor="middle"
          fontFamily="Inter,sans-serif" fontWeight="800" letterSpacing="0.12em">TEORÍA: COORDENADAS HOMOGÉNEAS 4×4</text>
        <text x={420} y={298} fill="#aaa" fontSize="11" textAnchor="middle" fontFamily="Inter,sans-serif">
          cos(180°) = −1 · sin(180°) = 0
        </text>
        <text x={420} y={320} fill="#aaa" fontSize="11" textAnchor="middle" fontFamily="Inter,sans-serif">
          El eje Z permanece inalterado · X e Y invierten su signo
        </text>
        <text x={420} y={343} fill={ACCENT_HEX} fontSize="11" fontWeight="700" textAnchor="middle"
          fontFamily="Inter,sans-serif">
          P₀(1,0,0,1) → P₁(−1,0,0,1)
        </text>
      </g>
    </svg>
  )
}

// ─── Viz E — Ry(45°) then Translation ─────────────────────────────────────────
function VizE() {
  return (
    <svg viewBox="0 0 840 420" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid meet">
      <defs><style>{KEYFRAMES}</style></defs>

      <text x={420} y={34} fill="#888" fontSize="10" fontWeight="800" letterSpacing="0.14em"
        fontFamily="Inter,sans-serif" textAnchor="middle">PASO 2: Ry(45°) · PASO 3: TRASLACIÓN (2,−1,3)</text>

      {/* M2 Ry(45°) */}
      <g className="fsr-1">
        <text x={175} y={64} fill="#888" fontSize="9" fontWeight="700" letterSpacing="0.1em"
          fontFamily="Inter,sans-serif" textAnchor="middle">M₂ = Ry(45°)</text>
        {[['√2/2','0','√2/2','0'],['0','1','0','0'],['-√2/2','0','√2/2','0'],['0','0','0','1']].map((row, r) =>
          row.map((v, c) => (
            <text key={`m2-${r}-${c}`} x={90 + c * 70} y={80 + r * 44}
              fill={v.includes('√') ? ACCENT_HEX : '#666'}
              fontSize={v.includes('√') ? '12' : '14'} fontWeight={v.includes('√') ? '700' : '300'}
              textAnchor="middle" fontFamily="Inter,sans-serif">{v}</text>
          ))
        )}
        <path d="M 52 66 L 45 66 L 45 246 L 52 246" stroke="#444" strokeWidth="1.5" fill="none" />
        <path d="M 300 66 L 307 66 L 307 246 L 300 246" stroke="#444" strokeWidth="1.5" fill="none" />
        <text x={175} y={290} fill={ACCENT_HEX} fontSize="12" fontWeight="700" textAnchor="middle"
          fontFamily="Inter,sans-serif">P₂ = (−√2/2, 0, √2/2, 1)</text>
      </g>

      {/* M3 Translation */}
      <g className="fsr-2">
        <text x={560} y={64} fill="#888" fontSize="9" fontWeight="700" letterSpacing="0.1em"
          fontFamily="Inter,sans-serif" textAnchor="middle">M₃ = Traslación</text>
        {[['1','0','0','2'],['0','1','0','−1'],['0','0','1','3'],['0','0','0','1']].map((row, r) =>
          row.map((v, c) => (
            <text key={`m3-${r}-${c}`} x={470 + c * 68} y={80 + r * 44}
              fill={c === 3 && r < 3 ? '#F5E642' : '#666'}
              fontSize={c === 3 && r < 3 ? '14' : '14'} fontWeight={c === 3 && r < 3 ? '700' : '300'}
              textAnchor="middle" fontFamily="Inter,sans-serif">{v}</text>
          ))
        )}
        <path d="M 432 66 L 425 66 L 425 246 L 432 246" stroke="#444" strokeWidth="1.5" fill="none" />
        <path d="M 680 66 L 687 66 L 687 246 L 680 246" stroke="#444" strokeWidth="1.5" fill="none" />
        <text x={560} y={290} fill="#F5E642" fontSize="12" fontWeight="700" textAnchor="middle"
          fontFamily="Inter,sans-serif">P₃ = (2−√2/2, −1, 3+√2/2, 1)</text>
      </g>

      {/* Detail box */}
      <g className="fsu-4">
        <rect x={120} y={310} width={600} height={90} rx="6"
          fill="rgba(245,230,66,0.04)" stroke="rgba(245,230,66,0.2)" strokeWidth="1" />
        <text x={420} y={334} fill="#888" fontSize="9" textAnchor="middle"
          fontFamily="Inter,sans-serif" fontWeight="800" letterSpacing="0.12em">cos(45°) = sin(45°) = √2/2 ≈ 0.707</text>
        <text x={420} y={358} fill="#bbb" fontSize="11" textAnchor="middle" fontFamily="Inter,sans-serif">
          Ry(45°) actúa sobre X y Z · Y permanece intacto
        </text>
        <text x={420} y={382} fill="#bbb" fontSize="11" textAnchor="middle" fontFamily="Inter,sans-serif">
          La traslación suma (2,−1,3) usando la última columna de la matriz homogénea 4×4
        </text>
      </g>
    </svg>
  )
}

// ─── Viz F — Reverse order: Ry(45°) then Rz(180°) without translation ─────────
function VizF() {
  return (
    <svg viewBox="0 0 840 420" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid meet">
      <defs><style>{KEYFRAMES}</style></defs>

      <text x={420} y={34} fill="#888" fontSize="10" fontWeight="800" letterSpacing="0.14em"
        fontFamily="Inter,sans-serif" textAnchor="middle">PASO 4: Ry(45°) · PASO 5: Rz(180°) — SIN TRASLACIÓN</text>

      {/* Step 4: M2 × P3 */}
      <g className="fsr-1">
        <text x={175} y={64} fill="#888" fontSize="9" fontWeight="700" letterSpacing="0.1em"
          fontFamily="Inter,sans-serif" textAnchor="middle">P₄ = M₂ × P₃</text>
        <text x={175} y={84} fill="#666" fontSize="9" textAnchor="middle"
          fontFamily="Inter,sans-serif">Ry(45°) aplicado a P₃</text>

        {/* Resulting P4 vector */}
        {['5√2/2', '−1', '1+√2/2', '1'].map((v, i) => (
          <text key={i} x={175} y={120 + i * 46} fill={ACCENT_HEX} fontSize="15"
            fontWeight="700" textAnchor="middle" fontFamily="Inter,sans-serif">{v}</text>
        ))}
        <path d="M 140 100 L 133 100 L 133 260 L 140 260" stroke={ACCENT_HEX} strokeWidth="1.5" fill="none" />
        <path d="M 216 100 L 223 100 L 223 260 L 216 260" stroke={ACCENT_HEX} strokeWidth="1.5" fill="none" />
        <text x={175} y={292} fill={ACCENT_HEX} fontSize="11" fontWeight="700" textAnchor="middle"
          fontFamily="Inter,sans-serif">P₄ = (5√2/2, −1, 1+√2/2, 1)</text>
      </g>

      {/* Step 5: M1 × P4 */}
      <g className="fsr-2">
        <text x={565} y={64} fill="#888" fontSize="9" fontWeight="700" letterSpacing="0.1em"
          fontFamily="Inter,sans-serif" textAnchor="middle">P_final = M₁ × P₄</text>
        <text x={565} y={84} fill="#666" fontSize="9" textAnchor="middle"
          fontFamily="Inter,sans-serif">Rz(180°) aplicado a P₄</text>

        {['−5√2/2', '1', '1+√2/2', '1'].map((v, i) => (
          <text key={i} x={565} y={120 + i * 46}
            fill={i === 0 || i === 1 ? '#F5E642' : '#aaa'}
            fontSize="15" fontWeight="700" textAnchor="middle"
            fontFamily="Inter,sans-serif">{v}</text>
        ))}
        <path d="M 530 100 L 523 100 L 523 260 L 530 260" stroke="#F5E642" strokeWidth="1.5" fill="none" />
        <path d="M 605 100 L 612 100 L 612 260 L 605 260" stroke="#F5E642" strokeWidth="1.5" fill="none" />
        <text x={565} y={292} fill="#F5E642" fontSize="11" fontWeight="700" textAnchor="middle"
          fontFamily="Inter,sans-serif">P_final = (−5√2/2, 1, 1+√2/2, 1)</text>
      </g>

      {/* Key insight */}
      <g className="fsu-4">
        <rect x={120} y={315} width={600} height={84} rx="6"
          fill="rgba(255,45,120,0.05)" stroke="rgba(255,45,120,0.22)" strokeWidth="1" />
        <text x={420} y={339} fill="#888" fontSize="9" textAnchor="middle"
          fontFamily="Inter,sans-serif" fontWeight="800" letterSpacing="0.12em">
          NO CONMUTATIVIDAD — EL ORDEN SÍ IMPORTA
        </text>
        <text x={420} y={362} fill="#bbb" fontSize="11" textAnchor="middle" fontFamily="Inter,sans-serif">
          Rz·Ry ≠ Ry·Rz — invertir el orden lleva a un cuadrante completamente distinto
        </text>
        <text x={420} y={385} fill={ACCENT_HEX} fontSize="11" fontWeight="700" textAnchor="middle"
          fontFamily="Inter,sans-serif">
          X negativo, Y positivo, Z positivo — desvío cruzado por cambio de jerarquía
        </text>
      </g>
    </svg>
  )
}

// ─── Viz G — Final results table + 3D axis visual ─────────────────────────────
function VizG() {
  return (
    <svg viewBox="0 0 840 420" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid meet">
      <defs><style>{KEYFRAMES}</style></defs>

      <text x={420} y={36} fill="#888" fontSize="10" fontWeight="800" letterSpacing="0.14em"
        fontFamily="Inter,sans-serif" textAnchor="middle">COORDENADAS FINALES COMPUTADAS · TABLA DE RESULTADOS</text>

      {/* Table header */}
      <g className="fsr-1">
        <rect x={80} y={54} width={680} height={34} fill="rgba(255,255,255,0.05)" />
        {['Componente Espacial', 'Expresión Exacta', 'Valor Decimal Aprox.'].map((h, i) => (
          <text key={h} x={80 + i * 230 + 115} y={76} fill="rgba(255,255,255,0.35)"
            fontSize="9" fontWeight="800" letterSpacing="0.12em" textAnchor="middle"
            fontFamily="Inter,sans-serif">{h.toUpperCase()}</text>
        ))}
      </g>

      {/* Table rows */}
      {[
        { comp: 'Eje X (Horizontal)', exact: '−5√2 / 2', dec: '−3.54', color: ACCENT_HEX },
        { comp: 'Eje Y (Vertical)', exact: '1', dec: '1.00', color: '#F5E642' },
        { comp: 'Eje Z (Profundidad)', exact: '1 + √2 / 2', dec: '1.71', color: '#69b6dd' },
      ].map((row, i) => (
        <g key={row.comp} className={`fsu-${i + 2}`}>
          <rect x={80} y={88 + i * 52} width={680} height={52}
            fill={i % 2 === 0 ? 'rgba(255,255,255,0.025)' : 'rgba(255,255,255,0.01)'}
            stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
          <text x={195} y={120 + i * 52} fill="#ccc" fontSize="13" fontWeight="600" textAnchor="middle"
            fontFamily="Inter,sans-serif">{row.comp}</text>
          <text x={425} y={120 + i * 52} fill={row.color} fontSize="16" fontWeight="700" textAnchor="middle"
            fontFamily="Inter,sans-serif">{row.exact}</text>
          <text x={655} y={120 + i * 52} fill={row.color} fontSize="16" fontWeight="700" textAnchor="middle"
            fontFamily="Inter,sans-serif">{row.dec}</text>
        </g>
      ))}

      {/* 3D axis representation */}
      <g className="pop-4">
        {/* Origin */}
        <circle cx={420} cy={310} r={5} fill="#555" />
        {/* X axis — red */}
        <line x1={420} y1={310} x2={340} y2={310} stroke={ACCENT_HEX} strokeWidth="2" />
        <text x={324} y={314} fill={ACCENT_HEX} fontSize="11" fontWeight="700"
          fontFamily="Inter,sans-serif">X: −3.54</text>
        {/* Y axis — yellow */}
        <line x1={420} y1={310} x2={420} y2={250} stroke="#F5E642" strokeWidth="2" />
        <text x={428} y={248} fill="#F5E642" fontSize="11" fontWeight="700"
          fontFamily="Inter,sans-serif">Y: 1.00</text>
        {/* Z axis — blue (projected diagonally) */}
        <line x1={420} y1={310} x2={480} y2={270} stroke="#69b6dd" strokeWidth="2" />
        <text x={488} y={268} fill="#69b6dd" fontSize="11" fontWeight="700"
          fontFamily="Inter,sans-serif">Z: 1.71</text>

        {/* Final point */}
        <circle cx={340} cy={250} r={8} fill="none" stroke={ACCENT_HEX} strokeWidth="1.5"
          strokeDasharray="3 3" />
        <text x={310} y={244} fill={ACCENT_HEX} fontSize="10" fontWeight="700"
          fontFamily="Inter,sans-serif">P_final</text>
      </g>

      <text x={420} y={408} fill="#444" fontSize="9.5" textAnchor="middle"
        fontFamily="Inter,sans-serif" letterSpacing="0.08em">
        EN 3D EL ORDEN DE LAS ROTACIONES SÍ ALTERA EL RESULTADO — NO CONMUTATIVIDAD MATRICIAL
      </text>
    </svg>
  )
}

// ─── Theory items ─────────────────────────────────────────────────────────────
const theoryItems = [
  'Coord. Homogéneas',
  'Traslación 2D/3D',
  'Rotación matricial',
  'Escalado',
  'Composición de matrices',
  'No conmutatividad',
]

// ─── Approach ─────────────────────────────────────────────────────────────────
const approach = (
  <>
    <p>
      Las transformaciones geométricas (traslación, rotación, escala) se modelan mediante{' '}
      <strong>matrices en coordenadas homogéneas</strong>: extendemos los puntos con un componente
      adicional '1' que permite representar todas las operaciones —incluyendo la traslación— como
      multiplicaciones matriciales uniformes.
    </p>
    <p>
      La estrategia consiste en aplicar cada transformación <strong>secuencialmente</strong>: el
      resultado de cada paso se convierte en la entrada del siguiente. En 3D, el orden de las rotaciones
      es fundamental, ya que la multiplicación matricial <strong>no es conmutativa</strong>:
      aplicar Rz·Ry produce un resultado diferente a Ry·Rz.
    </p>
  </>
)

// ─── Resolution ───────────────────────────────────────────────────────────────
const resolution = (
  <>
    {/* ── PASO 01 — 2D: Traslación ── */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#0d0a10', position: 'relative', overflow: 'hidden' }}>
        <p className="pp-step-category">Parte 1 · 2D — Traslación</p>
        <VizA />
      </div>
      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p>
            El octógono tiene su centro en <strong>V₁ = (5, 2)</strong> con radio 3. Para trasladarlo,
            sumamos el vector de traslación <strong>T = (3, −2)</strong> directamente al vector central:
          </p>
          <p>
            <strong>V₁ + T = V₂ → (5, 2) + (3, −2) = (8, 0)</strong>
          </p>
          <p>
            El nuevo centro queda en el eje X, con Y igual a cero. El octógono mantiene su forma y radio;
            sólo cambia de posición.
          </p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">Paso 01</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Traslación 2D</h3></div>
        </div>
      </div>
    </div>

    {/* ── PASO 02 — 2D: Rotación 30° ── */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#0d0a12', position: 'relative', overflow: 'hidden' }}>
        <p className="pp-step-category">Parte 1 · 2D — Rotación 30°</p>
        <VizB />
      </div>
      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p>
            Aplicamos la <strong>Matriz de Rotación</strong> de 30° antihorario sobre V₂ = (8, 0):
          </p>
          <p>
            R(30°) tiene cos(30°) = √3/2 y sin(30°) = ½. Al multiplicar <strong>R × V₂</strong>:
          </p>
          <p>
            x = (√3/2)·8 + (−½)·0 = <strong>4√3</strong> &nbsp;|&nbsp;
            y = (½)·8 + (√3/2)·0 = <strong>4</strong>
          </p>
          <p>
            <strong>V₃ = (4√3, 4)</strong>. El punto fue girado exactamente 30° en sentido antihorario respecto al origen.
          </p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">Paso 02</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Rotación 30°</h3></div>
        </div>
      </div>
    </div>

    {/* ── PASO 03 — 2D: Escalado y resultado final ── */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#0d0810', position: 'relative', overflow: 'hidden' }}>
        <p className="pp-step-category">Parte 1 · 2D — Escalado × 3.5</p>
        <VizC />
      </div>
      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p>
            El escalado multiplica cada componente de V₃ por el factor <strong>3.5</strong>:
          </p>
          <p>
            V₄ = (4√3, 4) × 3.5 = <strong>(14√3, 14)</strong>
          </p>
          <p>
            Convirtiendo a decimales: X = 14 × 1.732 ≈ <strong>24.25</strong>, Y = <strong>14</strong>.
            Las coordenadas finales de la Parte 1 son <strong>V₄ ≈ (24.25, 14)</strong>.
          </p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">Paso 03</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Escalado · Resultado 2D</h3></div>
        </div>
      </div>
    </div>

    {/* ── PASO 04 — 3D: Rz(180°) ── */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#0a0a0d', position: 'relative', overflow: 'hidden' }}>
        <p className="pp-step-category">Parte 2 · 3D — Punto Inicial + Rz(180°)</p>
        <VizD />
      </div>
      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p>
            El vértice del cubo parte de <strong>P₀ = (1, 0, 0)</strong>. En coordenadas homogéneas
            4D se escribe como <strong>[1, 0, 0, 1]ᵀ</strong>.
          </p>
          <p>
            La rotación de <strong>180° alrededor del eje Z</strong> usa cos(180°) = −1 y sin(180°) = 0.
            La matriz M₁ invierte X e Y, dejando Z intacto. Resultado: <strong>P₁ = (−1, 0, 0, 1)</strong>.
          </p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">Paso 04</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">3D · Rz(180°)</h3></div>
        </div>
      </div>
    </div>

    {/* ── PASO 05 — 3D: Ry(45°) + Traslación ── */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#080a0d', position: 'relative', overflow: 'hidden' }}>
        <p className="pp-step-category">Parte 2 · 3D — Ry(45°) y Traslación</p>
        <VizE />
      </div>
      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p>
            <strong>Paso 2 — Ry(45°):</strong> cos(45°) = sin(45°) = √2/2. Multiplicamos M₂ × P₁:
            <br />
            x = (√2/2)·(−1) = <strong>−√2/2</strong> &nbsp;|&nbsp; y = 0 &nbsp;|&nbsp;
            z = (√2/2)·(−1) = <strong>√2/2</strong> (cambia de signo por la fila −√2/2)
            <br />→ <strong>P₂ = (−√2/2, 0, √2/2, 1)</strong>
          </p>
          <p>
            <strong>Paso 3 — Traslación (2, −1, 3):</strong> La matriz M₃ suma los desplazamientos via
            la última columna: P₃ = <strong>(2−√2/2, −1, 3+√2/2, 1)</strong>.
          </p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">Paso 05</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">3D · Ry(45°) + Traslación</h3></div>
        </div>
      </div>
    </div>

    {/* ── PASO 06 — 3D: Orden inverso Ry→Rz ── */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#0a080d', position: 'relative', overflow: 'hidden' }}>
        <p className="pp-step-category">Parte 2 · 3D — Orden Inverso: Ry(45°) → Rz(180°)</p>
        <VizF />
      </div>
      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p>
            <strong>Paso 4 — Ry(45°) sobre P₃:</strong> M₂ × P₃ produce
            <strong> P₄ = (5√2/2, −1, 1+√2/2, 1)</strong>.
            El componente X crece por la suma de (2−√2/2) y (3+√2/2) proyectados.
          </p>
          <p>
            <strong>Paso 5 — Rz(180°) sobre P₄:</strong> M₁ × P₄ invierte X e Y:
            <strong> P_final = (−5√2/2, 1, 1+√2/2, 1)</strong>.
          </p>
          <p>
            El cambio de orden demostró que <strong>Rz·Ry ≠ Ry·Rz</strong>: el punto terminó en un
            cuadrante completamente diferente al que hubiera alcanzado con el orden original.
          </p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">Paso 06</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">No Conmutatividad</h3></div>
        </div>
      </div>
    </div>

    {/* ── PASO 07 — Tabla de resultados finales ── */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#0a0a0a', position: 'relative', overflow: 'hidden' }}>
        <p className="pp-step-category">Resultados · Tabla Final 3D</p>
        <VizG />
      </div>
      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p>
            Las coordenadas finales del vértice 3D tras todas las transformaciones son:
            <strong> X = −5√2/2 ≈ −3.54</strong>, <strong>Y = 1</strong>,{' '}
            <strong>Z = 1 + √2/2 ≈ 1.71</strong>.
          </p>
          <p>
            Este resultado demuestra que en motores 3D (Unity, Unreal, Blender) existe una{' '}
            <strong>jerarquía rígida e inmutable de operaciones</strong> —generalmente Escala → Rotación
            → Traslación— que debe respetarse con exactitud. Si se invierte el orden, los objetos se
            desplazan a posiciones erróneas y la animación se vuelve errática.
          </p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">Paso 07</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Coordenadas Finales</h3></div>
        </div>
      </div>
    </div>
  </>
)

export default function Problem5() {
  return (
    <ProblemPage
      number="05"
      subject="Geometría"
      title={<>Transformaciones Geométricas</>}
      question="¿Cómo se componen traslación, rotación y escala en 2D y 3D usando matrices homogéneas?"
      heroBackground="#1a1220"
      accent={ACCENT}
      theoryItems={theoryItems}
      approach={approach}
      resolution={resolution}
    />
  )
}
