export function BarChart({ data = [], width = 480, height = 200 }) {
  const max = Math.max(...data.map(d => d.value), 1)
  const barWidth = Math.floor(width / (data.length * 1.5))
  return (
    <svg width={width} height={height}>
      {data.map((d, i) => {
        const h = Math.round((d.value / max) * (height - 30))
        const x = i * (barWidth + 16) + 24
        const y = height - h - 20
        return (
          <g key={d.label}>
            <rect x={x} y={y} width={barWidth} height={h} fill="#61dafb" rx="6" />
            <text x={x + barWidth / 2} y={height - 6} fontSize="12" textAnchor="middle" fill="#ccc">{d.label}</text>
          </g>
        )
      })}
    </svg>
  )
}

export function LineChart({ points = [], width = 480, height = 200 }) {
  if (!points.length) return null
  const maxY = Math.max(...points.map(p => p.total), 1)
  const maxX = Math.max(...points.map(p => p.day), 1)
  const path = points.map((p, i) => {
    const x = Math.round((p.day / maxX) * (width - 20)) + 10
    const y = height - Math.round((p.total / maxY) * (height - 20)) - 10
    return `${i ? 'L' : 'M'} ${x} ${y}`
  }).join(' ')
  return (
    <svg width={width} height={height}>
      <path d={path} stroke="#7aa97a" fill="none" strokeWidth="2" />
    </svg>
  )
}
