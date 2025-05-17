import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../styles/GypsumCalculator.css'

const GypsumCalculator = () => {
  const [calcType, setCalcType] = useState('wall')
  const [length, setLength] = useState('')
  const [height, setHeight] = useState('')
  const [panelLength, setPanelLength] = useState('')
  const [panelWidth, setPanelWidth] = useState('')
  const [profileCount, setProfileCount] = useState('')
  const [profileType, setProfileType] = useState('Ուղղահայաց') // default profile type
  const [result, setResult] = useState(null)
  const navigate = useNavigate()

  const calculatePanels = () => {
    const l = parseFloat(length)
    const h = parseFloat(height)
    const pl = parseFloat(panelLength)
    const pw = parseFloat(panelWidth)
    const pc = parseInt(profileCount)

    if (!l || !h || !pl || !pw || l <= 0 || h <= 0 || pl <= 0 || pw <= 0) {
      setResult(null)
      return
    }

    const area = l * h
    const panelArea = pl * pw
    const panelsCount = Math.ceil(area / panelArea)

    setResult({
      area: area.toFixed(2),
      panels: panelsCount,
      profileCount: isNaN(pc) || pc < 0 ? 0 : pc,
      profileType,
    })
  }

  return (
    <div className="gypsum-calculator">
      <div className="breadcrumb">
        <span onClick={() => navigate('/')}>🏠 Գլխավոր</span>
        <span className="breadcrumb-separator">›</span>
        <span onClick={() => navigate('/calculators')}>Շինարարական հաշվիչներ</span>
        <span className="breadcrumb-separator">›</span>
        <span className="current">Գիպսակարտոնի հաշվիչ</span>
      </div>

      <h2>Գիպսակարտոնի հաշվիչ</h2>

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
            value="ceiling"
            checked={calcType === 'ceiling'}
            onChange={() => setCalcType('ceiling')}
          />
          Տանիք
        </label>
      </div>

      <div className="input-group">
        <label>{calcType === 'wall' ? 'Երկարություն (մ)' : 'Սենյակի երկարություն (մ)'}</label>
        <input
          type="number"
          value={length}
          onChange={e => setLength(e.target.value)}
          min="0"
          step="0.01"
        />
      </div>

      <div className="input-group">
        <label>{calcType === 'wall' ? 'Բարձրություն (մ)' : 'Սենյակի լայնություն (մ)'}</label>
        <input
          type="number"
          value={height}
          onChange={e => setHeight(e.target.value)}
          min="0"
          step="0.01"
        />
      </div>

      <div className="input-group">
        <label>Գիպսակարտոնի պանելների չափսեր (մ)</label>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="number"
            placeholder="Երկարություն"
            value={panelLength}
            onChange={e => setPanelLength(e.target.value)}
            min="0"
            step="0.01"
            style={{ flex: 1 }}
          />
          <input
            type="number"
            placeholder="Լայնություն"
            value={panelWidth}
            onChange={e => setPanelWidth(e.target.value)}
            min="0"
            step="0.01"
            style={{ flex: 1 }}
          />
        </div>
      </div>

      <div className="input-group">
        <label>Պռոֆիլների քանակ</label>
        <input
          type="number"
          value={profileCount}
          onChange={e => setProfileCount(e.target.value)}
          min="0"
          step="1"
        />
      </div>

      <div className="input-group">
        <label>Պռոֆիլների տեսակը</label>
        <select value={profileType} onChange={e => setProfileType(e.target.value)}>
          <option>Ուղղահայաց</option>
          <option>Հորիզոնական</option>
          <option>Աղյուսաձև</option>
          <option>Մյուս</option>
        </select>
      </div>

      <button className="btn" onClick={calculatePanels}>Հաշվել</button>

      {result && (
        <div className="result">
          <p>Ընդհանուր մակերեսը՝ <strong>{result.area} մ²</strong></p>
          <p>Պահանջվող պանելների քանակը՝ <strong>{result.panels}</strong></p>
          <p>Պռոֆիլների քանակ՝ <strong>{result.profileCount}</strong></p>
          <p>Պռոֆիլների տեսակը՝ <strong>{result.profileType}</strong></p>
        </div>
      )}
    </div>
  )
}

export default GypsumCalculator
