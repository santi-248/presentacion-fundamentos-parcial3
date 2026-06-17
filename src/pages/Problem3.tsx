import { useState, useEffect, useRef, useCallback, Fragment } from 'react'
import ProblemPage from '../components/ProblemPage/ProblemPage'
import MathBlock from '../components/MathBlock/MathBlock'

const ACCENT = 'var(--accent-sage)'
const ACCENT_HEX = '#83dd9cff'

const theoryItems = [
  'Lógica Proposicional',
  'Algoritmos',
  'Fuerza Bruta',
  'Restricciones',
]

const approach = (
  <>
    <p>
      Primero identificamos las 3 restricciones del tablero: ninguna reina puede compartir fila, columna ni diagonal con otra. Elegimos Python como lenguaje de implementación por su claridad. Estructuramos el código en tres funciones: una para generar todas las permutaciones de columnas, otra para validar las reglas lógicas y una tercera para mostrar cada solución encontrada.
    </p>
    <p>
      Por el lado de la lógica proposicional, definimos <MathBlock formula="R_{i,j}" /> para indicar que hay una reina en la fila <em>i</em>, columna <em>j</em>. Para la primera consigna usamos <MathBlock formula="R_{3,3}" /> como caso concreto verdadero y a partir de él derivamos las proposiciones generales que rigen todo el tablero.
    </p>
  </>
)

// ─── STEP ANIMATIONS ──────────────────────────────────────────────────────────

const KEYFRAMES = `
  @keyframes fadeSlideUp   { from { opacity:0; transform:translateY(14px);  } to { opacity:1; transform:translateY(0);  } }
  @keyframes fadeSlideRight{ from { opacity:0; transform:translateX(-14px); } to { opacity:1; transform:translateX(0);  } }
  @keyframes drawLine      { from { stroke-dashoffset:600; } to { stroke-dashoffset:0; } }
  @keyframes popIn         { from { transform:scale(0.6); opacity:0; } to { transform:scale(1); opacity:1; } }
  @keyframes pulseGlow     { 0%,100%{opacity:0.55} 50%{opacity:1} }
  @keyframes expandBar     { from { width:0; } to { width:var(--bar-w); } }

  .fsu-1  { opacity:0; animation:fadeSlideUp    0.7s ease forwards 0.15s; }
  .fsu-2  { opacity:0; animation:fadeSlideUp    0.7s ease forwards 0.4s;  }
  .fsu-3  { opacity:0; animation:fadeSlideUp    0.7s ease forwards 0.65s; }
  .fsu-4  { opacity:0; animation:fadeSlideUp    0.7s ease forwards 0.9s;  }
  .fsr-1  { opacity:0; animation:fadeSlideRight 0.7s ease forwards 0.2s;  }
  .fsr-2  { opacity:0; animation:fadeSlideRight 0.7s ease forwards 0.5s;  }
  .fsr-3  { opacity:0; animation:fadeSlideRight 0.7s ease forwards 0.8s;  }
  .pop-1  { opacity:0; animation:popIn          0.5s cubic-bezier(.175,.885,.32,1.275) forwards 0.3s;  }
  .pop-2  { opacity:0; animation:popIn          0.5s cubic-bezier(.175,.885,.32,1.275) forwards 0.55s; }
  .pop-3  { opacity:0; animation:popIn          0.5s cubic-bezier(.175,.885,.32,1.275) forwards 0.8s;  }
  .dl-1   { stroke-dasharray:600; stroke-dashoffset:600; animation:drawLine 0.9s ease forwards 0.2s;  }
  .dl-2   { stroke-dasharray:600; stroke-dashoffset:600; animation:drawLine 0.9s ease forwards 0.5s;  }
  .dl-3   { stroke-dasharray:600; stroke-dashoffset:600; animation:drawLine 0.9s ease forwards 0.8s;  }
  .dl-4   { stroke-dasharray:600; stroke-dashoffset:600; animation:drawLine 0.9s ease forwards 1.1s;  }
  .pg     { animation:pulseGlow 2.4s ease-in-out infinite; }
`

// ─── Step 1 — Chessboard + block visualisation ────────────────────────────────

function BoardViz() {
  const SZ = 42          // cell size
  const OX = 90, OY = 18 // origin

  // Queen at (3,3) → row index 2, col index 2
  const QR = 2, QC = 2

  // Center of the Queen's cell
  const QX = OX + QC * SZ + SZ / 2
  const QY = OY + QR * SZ + SZ / 2

  // Diagonal 1 (slope = 1): x(t) = QX + t, y(t) = QY + t
  const t1Min = Math.max(- (QC * SZ + SZ / 2), - (QR * SZ + SZ / 2))
  const t1Max = Math.min((8 - QC) * SZ - SZ / 2, (8 - QR) * SZ - SZ / 2)
  const d1x1 = QX + t1Min
  const d1y1 = QY + t1Min
  const d1x2 = QX + t1Max
  const d1y2 = QY + t1Max

  // Diagonal 2 (slope = -1): x(t) = QX + t, y(t) = QY - t
  const t2Min = Math.max(- (QC * SZ + SZ / 2), (QR - 8) * SZ + SZ / 2)
  const t2Max = Math.min((8 - QC) * SZ - SZ / 2, QR * SZ + SZ / 2)
  const d2x1 = QX + t2Min
  const d2y1 = QY - t2Min
  const d2x2 = QX + t2Max
  const d2y2 = QY - t2Max

  const cells = Array.from({ length: 8 }, (_, r) =>
    Array.from({ length: 8 }, (_, c) => {
      const isQueen = r === QR && c === QC
      const inRow = r === QR && !isQueen
      const inCol = c === QC && !isQueen
      const inDiag = Math.abs(r - QR) === Math.abs(c - QC) && !isQueen
      return { r, c, isQueen, inRow, inCol, inDiag }
    })
  ).flat()

  const fill = (cell: typeof cells[0]) => {
    if (cell.isQueen) return ACCENT_HEX
    if (cell.inRow) return 'rgba(168,255,62,0.12)'
    if (cell.inCol) return 'rgba(168,255,62,0.12)'
    if (cell.inDiag) return 'rgba(255,255,255,0.04)'
    return 'none'
  }

  const stroke = (cell: typeof cells[0]) => {
    if (cell.isQueen) return ACCENT_HEX
    if (cell.inRow || cell.inCol) return 'rgba(168,255,62,0.35)'
    return '#2a2a2a'
  }

  return (
    <svg viewBox="0 0 800 380" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid meet">
      <defs><style>{KEYFRAMES}</style></defs>

      {/* Board */}
      <g className="fsr-1">
        {cells.map(cell => (
          <rect
            key={`${cell.r}-${cell.c}`}
            x={OX + cell.c * SZ} y={OY + cell.r * SZ}
            width={SZ - 1} height={SZ - 1}
            fill={fill(cell)} stroke={stroke(cell)} strokeWidth="1"
          />
        ))}
        {/* Queen symbol */}
        <text x={OX + QC * SZ + SZ / 2} y={OY + QR * SZ + 29}
          fill={ACCENT_HEX} fontSize="22" textAnchor="middle" fontFamily="Inter,sans-serif">♛</text>
      </g>

      {/* Row line */}
      <line className="dl-1"
        x1={OX} y1={OY + QR * SZ + SZ / 2}
        x2={OX + 8 * SZ} y2={OY + QR * SZ + SZ / 2}
        stroke={ACCENT_HEX} strokeWidth="1.5" strokeOpacity="0.7" />

      {/* Col line */}
      <line className="dl-2"
        x1={OX + QC * SZ + SZ / 2} y1={OY}
        x2={OX + QC * SZ + SZ / 2} y2={OY + 8 * SZ}
        stroke={ACCENT_HEX} strokeWidth="1.5" strokeOpacity="0.7" />

      {/* Diagonal 1 */}
      <line className="dl-3"
        x1={d1x1} y1={d1y1}
        x2={d1x2} y2={d1y2}
        stroke="#666" strokeWidth="1" />

      {/* Diagonal 2 */}
      <line className="dl-4"
        x1={d2x1} y1={d2y1}
        x2={d2x2} y2={d2y2}
        stroke="#666" strokeWidth="1" />

      {/* Legend */}
      <g className="fsu-2">
        {[
          { color: ACCENT_HEX, label: 'Fila / Columna bloqueadas', y: 60 },
          { color: '#666', label: 'Diagonales bloqueadas', y: 90 },
        ].map(l => (
          <g key={l.label}>
            <line x1={462} y1={l.y} x2={490} y2={l.y} stroke={l.color} strokeWidth="2" />
            <text x={498} y={l.y + 4} fill={l.color} fontSize="11" fontFamily="Inter,sans-serif">{l.label}</text>
          </g>
        ))}
      </g>

      {/* Proposition labels */}
      <g className="fsu-3">
        <text x={462} y={148} fill="rgba(255,255,255,0.28)" fontSize="8.5" fontFamily="Inter,sans-serif" fontWeight="800" letterSpacing="0.14em">BLOQUEO FILA 3</text>
        <text x={462} y={166} fill="#bbb" fontSize="10.5" fontFamily="'JetBrains Mono','Fira Code',monospace">R₃,₃→(¬R₃,₁∧…∧¬R₃,₈)</text>
        <text x={462} y={208} fill="rgba(255,255,255,0.28)" fontSize="8.5" fontFamily="Inter,sans-serif" fontWeight="800" letterSpacing="0.14em">BLOQUEO COLUMNA 3</text>
        <text x={462} y={226} fill="#bbb" fontSize="10.5" fontFamily="'JetBrains Mono','Fira Code',monospace">R₃,₃→(¬R₁,₃∧…∧¬R₈,₃)</text>
        <text x={462} y={268} fill="rgba(255,255,255,0.28)" fontSize="8.5" fontFamily="Inter,sans-serif" fontWeight="800" letterSpacing="0.14em">BLOQUEO DIAGONALES</text>
        <text x={462} y={286} fill="#bbb" fontSize="10.5" fontFamily="'JetBrains Mono','Fira Code',monospace">|i−k|=|j−l| → ¬(Rᵢ,ⱼ∧Rₖ,ₗ)</text>
      </g>

      <text x={400} y={372} fill="#444" fontSize="10" textAnchor="middle" fontFamily="Inter,sans-serif" letterSpacing="0.08em">
        R₃,₃ VERDADERO — BLOQUEO DE FILA, COLUMNA Y AMBAS DIAGONALES
      </text>
    </svg>
  )
}

// ─── Step 2 — General rules ───────────────────────────────────────────────────

function RulesViz() {
  const rules = [
    {
      tag: 'UNA REINA POR COLUMNA',
      formula: 'Rᵢ,₁ ∧ Rᵢ,₂ ∧ Rᵢ,₃ ∧ … ∧ Rᵢ,₈',
      note: 'Exactamente una reina en cada columna del tablero.',
      color: ACCENT_HEX,
      cls: 'fsu-1',
    },
    {
      tag: 'SIN COMPARTIR FILA',
      formula: '¬(Rᵢ,ⱼ ∧ Rₖ,ⱼ)   para todo i ≠ k',
      note: 'Ningún par de reinas puede ocupar la misma fila.',
      color: '#69b6dd',
      cls: 'fsu-2',
    },
    {
      tag: 'SIN COMPARTIR DIAGONAL',
      formula: '¬(Rᵢ,ⱼ ∧ Rₖ,ₗ)   donde |i−k|=|j−l|',
      note: 'Condición de diagonal: distancia en filas igual a distancia en columnas.',
      color: '#e0a0ff',
      cls: 'fsu-3',
    },
  ]
  return (
    <svg viewBox="0 0 800 380" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid meet">
      <defs><style>{KEYFRAMES}</style></defs>

      {rules.map((r, i) => {
        const y = 60 + i * 108
        return (
          <g key={r.tag} className={r.cls}>
            {/* Accent line */}
            <line x1={60} y1={y} x2={60} y2={y + 68} stroke={r.color} strokeWidth="2.5" />
            {/* Tag */}
            <text x={80} y={y + 14} fill={r.color} fontSize="8.5" fontWeight="800" letterSpacing="0.16em" fontFamily="Inter,sans-serif">{r.tag}</text>
            {/* Formula */}
            <text x={80} y={y + 44} fill="#e8e8e8" fontSize="20" fontFamily="'JetBrains Mono','Fira Code',monospace" fontWeight="300">{r.formula}</text>
            {/* Note */}
            <text x={80} y={y + 66} fill="rgba(255,255,255,0.35)" fontSize="10" fontFamily="Inter,sans-serif">{r.note}</text>
          </g>
        )
      })}

      <text x={400} y={365} fill="#444" fontSize="10" textAnchor="middle" fontFamily="Inter,sans-serif" letterSpacing="0.08em">
        REGLAS GENERALES — TABLERO 8×8
      </text>
    </svg>
  )
}

// ─── Step 3 — Python code (3-column layout) ────────────────────────────────

function CodeViz() {
  const KW = ACCENT_HEX
  const C_COMMENT = '#555'
  const colStyle = (accent?: boolean): React.CSSProperties => ({
    fontSize: '0.58rem',
    lineHeight: 1.6,
    color: '#888',
    background: 'transparent',
    borderLeft: `1.5px solid ${accent ? ACCENT_HEX : '#2a2a2a'}`,
    paddingLeft: '0.8rem',
    margin: 0,
    fontFamily: "'JetBrains Mono','Fira Code','Menlo',monospace",
    whiteSpace: 'pre-wrap',
  })

  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'grid', gridTemplateColumns: 'repeat(3,1fr)',
      gap: '1.2rem', padding: '2.8rem 2.5rem 1rem',
      overflow: 'hidden',
    }}>
      {/* Column 1 — probarTodas */}
      <pre style={colStyle(true)}>
        <span style={{ color: C_COMMENT }}># genera todos los tableros posibles{'\n'}</span>
        <span style={{ color: KW }}>import</span>{' itertools\n\n'}
        <span style={{ color: KW }}>def </span>
        <span style={{ color: KW }}>probarTodas</span>{'():\n'}
        {'    cols = [1,2,3,4,5,6,7,8]\n'}
        {'    mezclas = itertools.permutations(cols)\n'}
        {'    n = 0\n\n'}
        {'    '}
        <span style={{ color: KW }}>for</span>
        {' mezcla '}
        <span style={{ color: KW }}>in</span>
        {' mezclas:\n'}
        {'        reinas = {}\n'}
        {'        '}
        <span style={{ color: KW }}>for</span>
        {' i '}
        <span style={{ color: KW }}>in</span>
        {' range(8):\n'}
        {'            reinas[i+1] = mezcla[i]\n\n'}
        {'        '}
        <span style={{ color: KW }}>if</span>
        {' resolver(reinas):\n'}
        {'            n += 1\n'}
        {'            mostrarTablero(reinas, n)\n'}
      </pre>

      {/* Column 2 — resolver */}
      <pre style={colStyle()}>
        <span style={{ color: C_COMMENT }}># valida restricciones lógicas{'\n'}</span>
        <span style={{ color: KW }}>def </span>
        <span style={{ color: KW }}>resolver</span>
        {'(pos: dict):\n'}
        {'    '}
        <span style={{ color: KW }}>for</span>
        {' f1 '}
        <span style={{ color: KW }}>in</span>
        {' pos:\n'}
        {'        c1 = pos[f1]\n'}
        {'        '}
        <span style={{ color: KW }}>for</span>
        {' f2 '}
        <span style={{ color: KW }}>in</span>
        {' pos:\n'}
        {'            c2 = pos[f2]\n'}
        {'            '}
        <span style={{ color: KW }}>if</span>
        {' f1 != f2:\n'}
        {'                '}
        <span style={{ color: KW }}>if</span>
        {' c1 == c2:\n'}
        {'                    '}
        <span style={{ color: KW }}>return</span>
        <span style={{ color: '#ccc' }}>{' False'}</span>
        {'\n                '}
        <span style={{ color: KW }}>if</span>
        {' c1+f1==c2+f2:\n'}
        {'                    '}
        <span style={{ color: KW }}>return</span>
        <span style={{ color: '#ccc' }}>{' False'}</span>
        {'\n                '}
        <span style={{ color: KW }}>if</span>
        {' c1-f1==c2-f2:\n'}
        {'                    '}
        <span style={{ color: KW }}>return</span>
        <span style={{ color: '#ccc' }}>{' False'}</span>
        {'\n    '}
        <span style={{ color: KW }}>return</span>
        <span style={{ color: KW }}>{' True'}</span>
      </pre>

      {/* Column 3 — mostrarTablero */}
      <pre style={colStyle()}>
        <span style={{ color: C_COMMENT }}># imprime el tablero en consola{'\n'}</span>
        <span style={{ color: KW }}>def </span>
        <span style={{ color: KW }}>mostrarTablero</span>
        {'(pos, n):\n'}
        {'    print(f"\\n--- SOLUCIÓN N° {n} ---")\n'}
        {'    '}
        <span style={{ color: KW }}>for</span>
        {' fila '}
        <span style={{ color: KW }}>in</span>
        {' range(1, 9):\n'}
        {'        linea = ""\n'}
        {'        '}
        <span style={{ color: KW }}>for</span>
        {' col '}
        <span style={{ color: KW }}>in</span>
        {' range(1, 9):\n'}
        {'            '}
        <span style={{ color: KW }}>if</span>
        {' pos[fila] == col:\n'}
        {'                linea += "[♛]"\n'}
        {'            '}
        <span style={{ color: KW }}>else</span>
        {':\n'}
        {'                linea += "[ ]"\n'}
        {'        print(linea)\n'}
      </pre>
    </div>
  )
}

// ─── Step 4 — Interactive Board Grid Simulator ────────────────────────────────

// 3 invalid permutations + 3 valid solutions (verified)
const BOARDS: { cols: number[]; valid: boolean }[] = [
  { cols: [0, 1, 2, 3, 4, 5, 6, 7], valid: false }, // diagonal — obvious conflict
  { cols: [0, 2, 4, 6, 1, 3, 5, 7], valid: false }, // conflict
  { cols: [0, 3, 6, 4, 1, 7, 5, 2], valid: false }, // conflict
  { cols: [0, 4, 7, 5, 2, 6, 1, 3], valid: true  }, // known solution
  { cols: [0, 5, 7, 2, 6, 3, 1, 4], valid: true  }, // known solution
  { cols: [1, 3, 5, 7, 2, 0, 6, 4], valid: true  }, // known solution
]

// Find the two conflicting rows in an invalid board
function findConflict(cols: number[]): [number, number] {
  for (let i = 0; i < 8; i++) {
    for (let j = i + 1; j < 8; j++) {
      if (cols[i] === cols[j] || Math.abs(cols[i] - cols[j]) === Math.abs(i - j)) {
        return [i, j]
      }
    }
  }
  return [-1, -1]
}

function SimulatorViz() {
  const [tick, setTick] = useState(-1)
  const [running, setRunning] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const stop = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = null
    setRunning(false)
  }, [])

  const TOTAL_TICKS = BOARDS.length * 14

  const play = useCallback(() => {
    if (tick >= TOTAL_TICKS) {
      setTick(-1)
      setTimeout(() => setRunning(true), 50)
      return
    }
    setRunning(true)
  }, [tick, TOTAL_TICKS])

  useEffect(() => {
    if (running) {
      timerRef.current = setInterval(() => {
        setTick(prev => {
          const next = prev + 1
          if (next >= TOTAL_TICKS) {
            stop()
            return next
          }
          return next
        })
      }, 100) // 100ms per tick for fast animation
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [running, stop, TOTAL_TICKS])

  useEffect(() => {
    if (tick >= TOTAL_TICKS && running) stop()
  }, [tick, running, stop, TOTAL_TICKS])

  const isDone = tick >= TOTAL_TICKS && !running

  const SZ = 12

  function MiniBoard({ board, tickOffset }: {
    board: typeof BOARDS[0]
    tickOffset: number
  }) {
    const boardTick = tick - tickOffset
    const isRevealed = boardTick >= 0
    // Queens placed: starts at tick 3, places 1 per tick, max 8
    const queensPlaced = isRevealed ? Math.min(8, Math.max(0, boardTick - 2)) : 0
    const showValidation = isRevealed && boardTick >= 11

    const [r1, r2] = (!board.valid && showValidation) ? findConflict(board.cols) : [-1, -1]

    const queenFill = (row: number) => {
      if (!showValidation) return ACCENT_HEX
      if (!board.valid && (row === r1 || row === r2)) return '#ff4444'
      if (board.valid) return '#000'
      return ACCENT_HEX
    }

    const cellFill = (row: number, col: number) => {
      const isQueen = board.cols[row] === col && row < queensPlaced
      if (showValidation && !board.valid && (row === r1 || row === r2)) {
        return isQueen ? '#ff4444' : 'rgba(255,68,68,0.1)'
      }
      if (showValidation && board.valid && isQueen) return ACCENT_HEX
      return 'none'
    }

    const cellStroke = (row: number, col: number) => {
      const isQueen = board.cols[row] === col && row < queensPlaced
      if (showValidation && !board.valid && (row === r1 || row === r2)) return isQueen ? '#ff4444' : 'rgba(255,68,68,0.3)'
      if (showValidation && board.valid) return isQueen ? ACCENT_HEX : 'rgba(168,255,62,0.15)'
      return '#222'
    }

    const boardSize = 8 * SZ
    const badge = showValidation ? (board.valid ? ACCENT_HEX : '#ff4444') : '#555'

    return (
      <div style={{
        opacity: isRevealed ? 1 : 0,
        transform: isRevealed ? 'scale(1)' : 'scale(0.88)',
        transition: 'opacity 0.35s ease, transform 0.35s ease',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
      }}>
        <div style={{
          fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.1em',
          color: badge, fontFamily: 'Inter,sans-serif',
          opacity: isRevealed ? 1 : 0,
          transition: 'color 0.2s ease',
        }}>
          {showValidation ? (board.valid ? '✓ SOLUCIÓN' : '✗ CONFLICTO') : 'PROBANDO...'}
        </div>
        <svg width={boardSize + 2} height={boardSize + 2} viewBox={`0 0 ${boardSize + 2} ${boardSize + 2}`}>
          {Array.from({ length: 8 }, (_, r) =>
            Array.from({ length: 8 }, (_, c) => (
              <rect
                key={`${r}-${c}`}
                x={1 + c * SZ} y={1 + r * SZ}
                width={SZ - 1} height={SZ - 1}
                fill={cellFill(r, c)}
                stroke={cellStroke(r, c)}
                strokeWidth="0.7"
                style={{ transition: 'all 0.2s ease' }}
              />
            ))
          )}
          {Array.from({ length: 8 }, (_, r) => {
            const isPlaced = r < queensPlaced
            return (
              <text
                key={r}
                x={1 + board.cols[r] * SZ + SZ / 2}
                y={1 + r * SZ + SZ - 2}
                textAnchor="middle"
                fontSize={SZ * 0.72}
                fill={queenFill(r)}
                opacity={isPlaced ? 1 : 0}
                style={{ transition: 'opacity 0.1s ease, fill 0.2s ease' }}
              >♛</text>
            )
          })}
          <rect x={0.5} y={0.5} width={boardSize + 1} height={boardSize + 1}
            fill="none" stroke={showValidation ? (board.valid ? 'rgba(168,255,62,0.3)' : 'rgba(255,68,68,0.25)') : '#333'}
            strokeWidth="1" style={{ transition: 'stroke 0.2s ease' }} />
        </svg>
      </div>
    )
  }

  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: '1.4rem', padding: '1.5rem 2rem',
    }}>
      <div style={{ display: 'flex', width: '100%', justifyContent: 'space-around', maxWidth: 580 }}>
        <span style={{ fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.14em', color: 'rgba(255,68,68,0.55)', fontFamily: 'Inter,sans-serif' }}>
          TABLEROS DESCARTADOS
        </span>
        <span style={{ fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.14em', color: 'rgba(168,255,62,0.55)', fontFamily: 'Inter,sans-serif' }}>
          SOLUCIONES VÁLIDAS
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
        {BOARDS.map((board, i) => (
          <Fragment key={i}>
            {i === 3 && (
              <div style={{ width: 1, height: 120, background: 'rgba(255,255,255,0.07)', margin: '0 0.4rem' }} />
            )}
            <MiniBoard board={board} tickOffset={i * 14} />
          </Fragment>
        ))}
      </div>

      <button
        onClick={running ? stop : play}
        style={{
          padding: '0.5rem 2rem',
          background: running ? 'rgba(255,68,68,0.08)' : 'rgba(168,255,62,0.08)',
          border: `1px solid ${running ? '#ff444455' : ACCENT_HEX + '55'}`,
          borderRadius: 8,
          color: running ? '#ff4444' : isDone ? 'rgba(168,255,62,0.6)' : ACCENT_HEX,
          fontFamily: 'Inter,sans-serif', fontWeight: 800,
          fontSize: '0.65rem', letterSpacing: '0.12em',
          cursor: 'pointer', transition: 'all 0.2s ease',
        }}
      >
        {running ? '⏸ PAUSAR' : isDone ? '↺ REINICIAR' : '▶ EJECUTAR'}
      </button>
    </div>
  )
}



// ─── Resolution ───────────────────────────────────────────────────────────────

const resolution = (
  <>
    {/* ── PASO 01 — Restricciones: R(3,3) verdadero ── */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#080f08', position: 'relative', overflow: 'hidden' }}>
        <p className="pp-step-category">Lógica Proposicional</p>
        <BoardViz />
      </div>
      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p>Con <strong>R₃,₃ verdadero</strong> bloqueamos la fila 3 completa, la columna 3 completa y ambas diagonales que pasan por (3,3). Ninguna otra reina puede ocupar esas posiciones. La condición de diagonal se cumple cuando la distancia entre filas es exactamente igual a la distancia entre columnas: <strong>|i−k| = |j−l|</strong>.</p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">Paso 01</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Restricciones: reina en (3,3)</h3></div>
        </div>
      </div>
    </div>

    {/* ── PASO 02 — Reglas Generales ── */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#08100a', position: 'relative', overflow: 'hidden' }}>
        <p className="pp-step-category">Lógica Proposicional</p>
        <RulesViz />
      </div>
      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p><strong>Regla 1:</strong> Exactamente una reina por columna — todas las combinaciones de fila deben cubrir las 8 columnas.</p>
          <p><strong>Reglas 2 y 3:</strong> Para todo par de posiciones distintas donde <strong>i ≠ k</strong>, las reinas no pueden compartir fila. Y para todo par donde <strong>i−j = k−l</strong> o <strong>i+j = k+l</strong>, tampoco pueden compartir diagonal.</p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">Paso 02</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Reglas Generales del Tablero</h3></div>
        </div>
      </div>
    </div>

    {/* ── PASO 03 — Implementación Python ── */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#0a0a0a', position: 'relative', overflow: 'hidden' }}>
        <p className="pp-step-category">Resolución Algorítmica · Python</p>
        <CodeViz />
      </div>
      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p><strong>probarTodas()</strong> genera todas las permutaciones de columnas (8! = 40.320 tableros candidatos). <strong>resolver()</strong> aplica las restricciones lógicas, descartando al instante cualquier configuración inválida. <strong>mostrarTablero()</strong> imprime en consola cada solución encontrada.</p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">Paso 03</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Implementación en Python</h3></div>
        </div>
      </div>
    </div>

    {/* ── PASO 04 — Simulador interactivo ── */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#07100a', position: 'relative', overflow: 'hidden' }}>
        <p className="pp-step-category">Simulación del Algoritmo · Interactivo</p>
        <SimulatorViz />
      </div>
      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p>El sistema prueba permutaciones de columnas: cuando detecta que dos reinas se amenazan las <strong>descarta en rojo</strong> (Fail Fast), y cuando el tablero es válido lo <strong>marca en verde</strong>. En la práctica, de 40.320 tableros posibles solo <strong>92 son soluciones</strong>.</p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">Paso 04</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Simulación del Algoritmo</h3></div>
        </div>
      </div>
    </div>
  </>
)

export default function Problem3() {
  return (
    <ProblemPage
      number="03"
      subject="Lógica Computacional"
      title={<>Problema de las Ocho Reinas</>}
      question="¿Cómo podemos colocar ocho damas en un tablero de ajedrez, de manera que no se amenacen entre ellas?"
      heroBackground="#1a2018"
      accent={ACCENT}
      theoryItems={theoryItems}
      approach={approach}
      resolution={resolution}
    />
  )
}
