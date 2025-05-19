import React, { useState, useRef } from 'react'
import '../../styles/LaminateCalculator.css'
import { useNavigate } from 'react-router-dom'
import html2canvas from 'html2canvas'

const LaminateCalculator = () => {
  const [length, setLength] = useState('')
  const [width, setWidth] = useState('')
  const [boxCoverage, setBoxCoverage] = useState(2.2)
  const [wastePercent, setWastePercent] = useState(5)
  const [pricePerSqm, setPricePerSqm] = useState('')
  const [spongePrice, setSpongePrice] = useState('')
  const [result, setResult] = useState(null)
  const navigate = useNavigate()
  const resultRef = useRef(null)

  const calculateLaminate = () => {
    const l = parseFloat(length)
    const w = parseFloat(width)
    const box = parseFloat(boxCoverage)
    const waste = parseFloat(wastePercent)
    const sqmPrice = parseFloat(pricePerSqm)
    const sponge = parseFloat(spongePrice)

    if (!isNaN(l) && !isNaN(w) && !isNaN(box)) {
      const area = l * w
      const areaWithWaste = area * (1 + waste / 100)
      const boxesNeeded = Math.ceil(areaWithWaste / box)
      const boxPriceCalculated = !isNaN(sqmPrice) ? sqmPrice * box : null
      const laminateTotal = !isNaN(boxPriceCalculated) ? boxesNeeded * boxPriceCalculated : null
      const spongeTotal = !isNaN(sponge) ? area * sponge : null

      setResult({
        area: area.toFixed(2),
        areaWithWaste: areaWithWaste.toFixed(2),
        boxes: boxesNeeded,
        totalLaminate: laminateTotal?.toFixed(0) || null,
        spongeTotal: spongeTotal?.toFixed(0) || null,
        finalTotal:
          !isNaN(laminateTotal) && !isNaN(spongeTotal)
            ? (laminateTotal + spongeTotal).toFixed(0)
            : null,
      })
    } else {
      setResult(null)
    }
  }

  const downloadAsImage = () => {
    if (!resultRef.current) return
    html2canvas(resultRef.current).then(canvas => {
      const link = document.createElement('a')
      link.download = 'laminate-calculation.png'
      link.href = canvas.toDataURL()
      link.click()
    })
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

      <div className="input-group">
        <label>1 քմ լամինատի գինը (դրամ)</label>
        <input type="number" value={pricePerSqm} onChange={e => setPricePerSqm(e.target.value)} />
      </div>

      <div className="input-group">
        <label>1 քմ սպունգի գինը (դրամ)</label>
        <input type="number" value={spongePrice} onChange={e => setSpongePrice(e.target.value)} />
      </div>

      <button className="calculate-btn" onClick={calculateLaminate}>Հաշվել</button>

      {result && (
        <div className="result" ref={resultRef}>
          <h3>📐 Տվյալներ</h3>
          <p>Քառակուսի տարածք՝ <strong>{result.area} քմ</strong></p>
          <p>Նոսրացումով՝ <strong>{result.areaWithWaste} քմ</strong></p>
          <p>Անհրաժեշտ է <strong>{result.boxes}</strong> տուփ լամինատ</p>
          {result.totalLaminate && (
            <p>💰 Լամինատի արժեք՝ <strong>{result.totalLaminate} դրամ</strong></p>
          )}
          {result.spongeTotal && (
            <p>🧽 Սպունգի արժեք՝ <strong>{result.spongeTotal} դրամ</strong></p>
          )}
          {result.finalTotal && (
            <p>💵 Ընդհանուր արժեք (լամինատ + սպունգ)՝ <strong>{result.finalTotal} դրամ</strong></p>
          )}
        </div>
      )}

      {result && (
        <button className="download-btn" onClick={downloadAsImage}>
          ⬇️ Ներբեռնել արդյունքը որպես նկար
        </button>
      )}
    </div>
  )
}

export default LaminateCalculator
