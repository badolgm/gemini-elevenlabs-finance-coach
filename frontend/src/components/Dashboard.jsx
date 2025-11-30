import { useEffect, useState } from 'react'
import { BarChart, LineChart } from './Chart'

const apiBase = 'http://localhost:3001'

export default function Dashboard() {
  const [breakdown, setBreakdown] = useState([])
  const [forecast, setForecast] = useState([])

  useEffect(() => {
    fetch(`${apiBase}/api/spend/breakdown`).then(r => r.json()).then(d => {
      const data = (d.items || []).map(i => ({ label: i.category, value: i.total }))
      setBreakdown(data)
    }).catch(() => setBreakdown([]))
    fetch(`${apiBase}/api/forecast`).then(r => r.json()).then(d => {
      setForecast(d.points || [])
    }).catch(() => setForecast([]))
  }, [])

  return (
    <div className="grid">
      <div className="card">
        <h2>Spend by Category</h2>
        <BarChart data={breakdown} />
      </div>
      <div className="card">
        <h2>Monthly Forecast</h2>
        <LineChart points={forecast} />
      </div>
    </div>
  )
}
