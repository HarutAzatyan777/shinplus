import React, { useState } from 'react'
import '../../styles/ConcreteCalculator.css'
import { useNavigate } from 'react-router-dom'

const ConcreteCalculator = () => {
  const [length, setLength] = useState('')
  const [width, setWidth] = useState('')
  const [height, setHeight] = useState('')
  const [volume, setVolume] = useState(null)
  const navigate = useNavigate()

  const calculateVolume = () => {
    const l = parseFloat(length)
    const w = parseFloat(width)
    const h = parseFloat(height)

    if (!isNaN(l) && !isNaN(w) && !isNaN(h)) {
      const result = (l * w * h).toFixed(2)
      setVolume(result)
    } else {
      setVolume(null)
    }
  }

  return (
    <div className="concrete-calculator">
      <div className="breadcrumb">
        <span onClick={() => navigate('/')}>🏠 Գլխավոր</span>
        <span className="breadcrumb-separator">›</span>
        <span onClick={() => navigate('/calculators')}>Շինարարական հաշվիչներ</span>
        <span className="breadcrumb-separator">›</span>
        <span className="current">Բետոնի ծավալի հաշվիչ</span>
      </div>

      <h2>Բետոնի ծավալի հաշվիչ</h2>
      <p>Մուտքագրեք չափսերը մետրերով:</p>

      <div className="input-group">
        <label>Երկարություն (մ)</label>
        <input type="number" value={length} onChange={e => setLength(e.target.value)} />
      </div>

      <div className="input-group">
        <label>Լայնություն (մ)</label>
        <input type="number" value={width} onChange={e => setWidth(e.target.value)} />
      </div>

      <div className="input-group">
        <label>Բարձրություն (մ)</label>
        <input type="number" value={height} onChange={e => setHeight(e.target.value)} />
      </div>

      <button className="calculate-btn" onClick={calculateVolume}>Հաշվել</button>


      {volume && (
        <div className="result">
          <p>Անհրաժեշտ բետոնի ծավալը՝ <strong>{volume} մ³</strong></p>
        </div>
      )}
    </div>
  )
}

export default ConcreteCalculator
