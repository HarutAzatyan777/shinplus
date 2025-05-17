import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../styles/PaintCalculator.css'

const PaintCalculator = () => {
  const [calcType, setCalcType] = useState('wall') // wall կամ floor
  const [length, setLength] = useState('')
  const [height, setHeight] = useState('') // միայն պատերի համար է
  const [coats, setCoats] = useState(1)
  const [coverage, setCoverage] = useState('') // լիտր / մ²
  const [result, setResult] = useState(null)
  const navigate = useNavigate()

  const calculatePaint = () => {
    const l = parseFloat(length)
    const h = parseFloat(height)
    const c = parseInt(coats, 10)
    const cov = parseFloat(coverage)

    if (!l || !c || !cov || l <= 0 || c <= 0 || cov <= 0) {
      setResult(null)
      return
    }

    let area = 0

    if (calcType === 'wall') {
      if (!h || h <= 0) {
        setResult(null)
        return
      }
      area = l * h
    } else if (calcType === 'floor') {
      // հատակի համար երկարություն * լայնություն (հատակի դեպքում length-ին լցնում ենք երկարությունը, height-ին՝ լայնությունը)
      area = l * h
    }

    const liters = ((area * c) / cov).toFixed(2)
    setResult(liters)
  }

  return (
    <div className="paint-calculator">
      <div className="breadcrumb">
        <span onClick={() => navigate('/')}>🏠 Գլխավոր</span>
        <span className="breadcrumb-separator">›</span>
        <span onClick={() => navigate('/calculators')}>Շինարարական հաշվիչներ</span>
        <span className="breadcrumb-separator">›</span>
        <span className="current">Ներկի հաշվիչ</span>
      </div>

      <h2>Ներկի հաշվիչ</h2>

      <div className="calc-type">
        <label>
          <input
            type="radio"
            value="wall"
            checked={calcType === 'wall'}
            onChange={() => setCalcType('wall')}
          />
          Պատ
        </label>
        <label>
          <input
            type="radio"
            value="floor"
            checked={calcType === 'floor'}
            onChange={() => setCalcType('floor')}
          />
          Հատակ
        </label>
      </div>

      <div className="input-group">
        <label>
          {calcType === 'wall' ? 'Երկարություն (մ)' : 'Երկարություն (մ)'}
        </label>
        <input
          type="number"
          value={length}
          onChange={e => setLength(e.target.value)}
          min="0"
        />
      </div>

      <div className="input-group">
        <label>
          {calcType === 'wall' ? 'Բարձրություն (մ)' : 'Լայնություն (մ)'}
        </label>
        <input
          type="number"
          value={height}
          onChange={e => setHeight(e.target.value)}
          min="0"
        />
      </div>

      <div className="input-group">
        <label>Ներկի շերտերի քանակը</label>
        <input
          type="number"
          value={coats}
          onChange={e => setCoats(e.target.value)}
          min="1"
        />
      </div>

      <div className="input-group">
        <label>Ներկի ծածկույթի համար անհրաժեշտ լիտրներ / մ²</label>
        <input
          type="number"
          value={coverage}
          onChange={e => setCoverage(e.target.value)}
          min="0"
          step="0.01"
        />
      </div>

      <button className="btn" onClick={calculatePaint}>
        Հաշվել
      </button>

      {result !== null && (
        <div className="result">
          <p>
            Պահանջվող ներկի քանակը՝ <strong>{result} լիտր</strong>
          </p>
        </div>
      )}
    </div>
  )
}

export default PaintCalculator
