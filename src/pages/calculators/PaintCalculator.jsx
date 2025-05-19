import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../styles/PaintCalculator.css'

const PaintCalculator = () => {
  const navigate = useNavigate()

  const [calcType, setCalcType] = useState('wall') // wall կամ floor
  const [inputMode, setInputMode] = useState('dimensions') // dimensions կամ area

  const [length, setLength] = useState('') // մ
  const [widthOrHeight, setWidthOrHeight] = useState('') // մ
  const [area, setArea] = useState('') // մ²

  const [coats, setCoats] = useState(1) // շերտերի քանակը
  const [coverage, setCoverage] = useState('12') // մ²/լ, գունավորման ծածկույթ (օրինակ՝ 10, 12, 14)

  const [result, setResult] = useState(null)

  const calculatePaint = () => {
    let totalArea = 0

    if (inputMode === 'dimensions') {
      const l = parseFloat(length)
      const w = parseFloat(widthOrHeight)
      if (isNaN(l) || isNaN(w) || l <= 0 || w <= 0) {
        alert('Խնդրում ենք մուտքագրել ճիշտ չափսեր։')
        return
      }
      totalArea = l * w
    } else if (inputMode === 'area') {
      const a = parseFloat(area)
      if (isNaN(a) || a <= 0) {
        alert('Խնդրում ենք մուտքագրել ճիշտ մակերես։')
        return
      }
      totalArea = a
    }

    if (totalArea <= 0) {
      alert('Մակերեսը պետք է լինի մեծ 0-ից։')
      return
    }

    const c = parseFloat(coats)
    if (isNaN(c) || c < 1) {
      alert('Խնդրում ենք մուտքագրել ճիշտ շերտերի քանակ։')
      return
    }

    const cov = parseFloat(coverage)
    if (isNaN(cov) || cov <= 0) {
      alert('Խնդրում ենք մուտքագրել ճիշտ ծածկույթ։')
      return
    }

    const totalCoverageArea = totalArea * c
    const litersNeeded = totalCoverageArea / cov

    setResult({
      area: totalCoverageArea.toFixed(2),
      liters: litersNeeded.toFixed(2),
    })
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

      <p className="tutorial">
        Մուտքագրեք այն սենյակի չափսերը, որը պետք է ներկել։ Սեղմեք կոճակը՝ այս աշխատանքի համար անհրաժեշտ ներկի քանակը և աշխատաժամերը հաշվարկելու համար։ 
        Ներքին ներկի ծածկույթը կախված է օգտագործված ներկի ապրանքանիշից։ Ծածկույթի քանակը նշված է ներկի տուփի պիտակի վրա։ Օգտագործեք սա ստորև բերված 
        <strong> «Գունավորման ծածկույթ»</strong> բաժնում արժեքները կարգավորելու համար։<br />
        Օրինակ՝ 1 լիտրը կարող է ծածկել՝ 10 մ², 12 մ², 14 մ²։
      </p>

      <div className="calculator-and-info">
        <div className="calculator-inputs">
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

          <div className="input-mode">
            <label>
              <input
                type="radio"
                value="dimensions"
                checked={inputMode === 'dimensions'}
                onChange={() => setInputMode('dimensions')}
              />
              Չափսերով մուտքագրում
            </label>
            <label>
              <input
                type="radio"
                value="area"
                checked={inputMode === 'area'}
                onChange={() => setInputMode('area')}
              />
              Քառակուսի մետրով մուտքագրում
            </label>
          </div>

          {inputMode === 'dimensions' ? (
            <>
              <div className="input-group">
                <label>Երկարություն (մ)</label>
                <input
                  type="number"
                  value={length}
                  onChange={e => setLength(e.target.value)}
                  min="0"
                />
              </div>

              <div className="input-group">
                <label>{calcType === 'wall' ? 'Բարձրություն (մ)' : 'Լայնություն (մ)'}</label>
                <input
                  type="number"
                  value={widthOrHeight}
                  onChange={e => setWidthOrHeight(e.target.value)}
                  min="0"
                />
              </div>
            </>
          ) : (
            <div className="input-group">
              <label>Մակերես (մ²)</label>
              <input
                type="number"
                value={area}
                onChange={e => setArea(e.target.value)}
                min="0"
              />
            </div>
          )}

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
            <label>
              Գունավորման ծածկույթ (մ² / լիտր)
              <div className="examples">Օրինակներ՝ 10, 12, 14</div>
            </label>
            <input
              type="number"
              value={coverage}
              onChange={e => setCoverage(e.target.value)}
              min="0"
              step="0.1"
            />
          </div>

          <button className="btn" onClick={calculatePaint}>Հաշվել</button>

          {result && (
            <div className="result">
              <p>Ընդհանուր մակերես՝ <strong>{result.area} մ²</strong></p>
              <p>Պահանջվող ներկի քանակը՝ <strong>{result.liters} լիտր</strong></p>
            </div>
          )}
        </div>

        <div className="paint-info">
          <h3>Ներկերի կիրառություն</h3>
          <p>
            Ներկերը լայն կիրառություն ունեն շինարարության, վերանորոգման և դիզայներական աշխատանքներում։ Գոյություն ունեն ներկերի, լաքերի բազմաթիվ տեսակներ, որոնցից յուրաքանչյուրն ունի իր կիրառման առանձնահատկությունը։
          </p>
          <p>Առավել տարածված են ներկերի հետևյալ խմբերը՝</p>
          <ul>
            <li>Էմուլսիոն</li>
            <li>Ալկիդային</li>
            <li>Սոսնձային</li>
            <li>Սիլիկատային</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default PaintCalculator
