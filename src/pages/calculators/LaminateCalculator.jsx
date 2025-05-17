import React, { useState } from 'react'
import '../../styles/LaminateCalculator.css'
import { useNavigate } from 'react-router-dom'

const LaminateCalculator = () => {
  const [length, setLength] = useState('')
  const [width, setWidth] = useState('')
  const [boxCoverage, setBoxCoverage] = useState(2.2)
  const [wastePercent, setWastePercent] = useState(5)
  const [result, setResult] = useState(null)
  const navigate = useNavigate()

  const calculateLaminate = () => {
    const l = parseFloat(length)
    const w = parseFloat(width)
    const box = parseFloat(boxCoverage)
    const waste = parseFloat(wastePercent)

    if (!isNaN(l) && !isNaN(w) && !isNaN(box)) {
      const area = l * w
      const areaWithWaste = area * (1 + waste / 100)
      const boxesNeeded = Math.ceil(areaWithWaste / box)

      setResult({
        area: area.toFixed(2),
        areaWithWaste: areaWithWaste.toFixed(2),
        boxes: boxesNeeded,
      })
    } else {
      setResult(null)
    }
  }

  return (
    <div className="laminate-calculator">
      <div className="breadcrumb">
        <span onClick={() => navigate('/')}>🏠 Գլխավոր</span>
        <span className="breadcrumb-separator">›</span>
        <span onClick={() => navigate('/calculators')}>Հաշվիչներ</span>
        <span className="breadcrumb-separator">›</span>
        <span className="current">Լամինատի հաշվիչ</span>
      </div>

      <h2>Լամինատի հաշվիչ</h2>
      <p>Մուտքագրեք տարածքի չափսերը մետրերով։</p>

      <div className="input-group">
        <label>Երկարություն (մ)</label>
        <input type="number" value={length} onChange={e => setLength(e.target.value)} />
      </div>

      <div className="input-group">
        <label>Լայնություն (մ)</label>
        <input type="number" value={width} onChange={e => setWidth(e.target.value)} />
      </div>

      <div className="input-group">
        <label>Մեկ տուփի ծածկույթը (քմ)</label>
        <input type="number" value={boxCoverage} onChange={e => setBoxCoverage(e.target.value)} />
      </div>

      <div className="input-group">
        <label>Նոսրացման տոկոս (%)</label>
        <input type="number" value={wastePercent} onChange={e => setWastePercent(e.target.value)} />
      </div>

      <button className="calculate-btn" onClick={calculateLaminate}>Հաշվել</button>

      {result && (
        <div className="result">
          <p>Տարածք՝ <strong>{result.area} քմ</strong></p>
          <p>Նոսրացումով՝ <strong>{result.areaWithWaste} քմ</strong></p>
          <p>Պետք է <strong>{result.boxes}</strong> տուփ լամինատ</p>
        </div>
      )}
    </div>
  )
}

export default LaminateCalculator
