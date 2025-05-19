import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const TilesCalculator = () => {
  const navigate = useNavigate()

  const [floorLength, setFloorLength] = useState('')
  const [floorWidth, setFloorWidth] = useState('')
  const [wallHeight, setWallHeight] = useState('')
  const [wallWidth, setWallWidth] = useState('')
  const [tileHeight, setTileHeight] = useState('')
  const [tileWidth, setTileWidth] = useState('')
  const [spacing, setSpacing] = useState('')
  const [pricePerTile, setPricePerTile] = useState('')
  const [currency, setCurrency] = useState('AMD')

  const [floorTilesNeeded, setFloorTilesNeeded] = useState(null)
  const [wallTilesNeeded, setWallTilesNeeded] = useState(null)
  const [floorCost, setFloorCost] = useState(null)
  const [wallCost, setWallCost] = useState(null)

  const calculateTiles = () => {
    // Գտնենք հատակի մակերեսը մետրերով
    const floorArea = parseFloat(floorLength) * parseFloat(floorWidth)
    // Պատի մակերեսը
    const wallArea = parseFloat(wallHeight) * parseFloat(wallWidth)

    // Սալիկի մակերեսը սանտիմետրերով (բացվածքն ընդգրկված)
    const tileHeightWithSpacing = parseFloat(tileHeight) + parseFloat(spacing)
    const tileWidthWithSpacing = parseFloat(tileWidth) + parseFloat(spacing)

    // Սալիկի մակերեսը մ^2
    const tileArea = (tileHeightWithSpacing * tileWidthWithSpacing) / 10000 // սմ2 => մ2

    if (
      isNaN(floorArea) || isNaN(wallArea) ||
      isNaN(tileArea) || tileArea === 0 ||
      isNaN(parseFloat(pricePerTile))
    ) {
      alert('Խնդրում եմ մուտքագրեք բոլոր անհրաժեշտ արժեքները ճիշտ ձևաչափով։')
      return
    }

    const floorTiles = Math.ceil(floorArea / tileArea)
    const wallTiles = Math.ceil(wallArea / tileArea)

    setFloorTilesNeeded(floorTiles)
    setWallTilesNeeded(wallTiles)

    setFloorCost(floorTiles * parseFloat(pricePerTile))
    setWallCost(wallTiles * parseFloat(pricePerTile))
  }

  return (
    <div className="tiles-calculator">
      <div className="breadcrumb">
        <span onClick={() => navigate('/')}>🏠 Գլխավոր</span>
        <span className="breadcrumb-separator">›</span>
        <span onClick={() => navigate('/calculators')}>Շինարարական հաշվիչներ</span>
        <span className="breadcrumb-separator">›</span>
        <span className="current">Սալիկների հաշվիչ՝ հատակի և պատերի համար</span>
      </div>

      <h2>Սալիկների հաշվիչ՝ հատակի և պատերի համար</h2>

      {/* Info Section */}
      <div
        className="info-section"
        style={{
          backgroundColor: '#eef6ff',
          padding: '10px',
          borderRadius: '5px',
          marginBottom: '15px',
        }}
      >
        <h4>Ինֆորմացիա</h4>
        <p>
          Սալիկների միջև բացվածքը կարևոր է հաշվի առնել, քանի որ դա ապահովում է սալիկների ճիշտ տեղավորումը, թույլ է տալիս լրացնել համընկնող նյութերը (փոսիկները) և կանխում է ճաքերի առաջացումը: Այս բացվածքը սովորաբար հաշվվում է սանտիմետրերով և պետք է ներառվի ընդհանուր սալիկների տարածքի հաշվարկում՝ ավելի ճշգրիտ արդյունքի համար:
        </p>
      </div>

      <p>
        Մուտքագրեք չափսերը՝ հատակի համար մետրերով, պատերի համար մետրերով, սալիկի չափսերը՝ սանտիմետրերով, սալիկների միջև բացվածքը՝ սանտիմետրերով, և սալիկի միավոր գինը՝ դրամով կամ դոլարով:
      </p>

      <div className="section">
        <h3>Հատակի չափսեր (մ)</h3>
        <div className="input-group">
          <label>Երկարություն</label>
          <input type="number" value={floorLength} onChange={(e) => setFloorLength(e.target.value)} />
        </div>
        <div className="input-group">
          <label>Լայնություն</label>
          <input type="number" value={floorWidth} onChange={(e) => setFloorWidth(e.target.value)} />
        </div>
      </div>

      <div className="section">
        <h3>Պատի չափսեր (մ)</h3>
        <div className="input-group">
          <label>Բարձրություն</label>
          <input type="number" value={wallHeight} onChange={(e) => setWallHeight(e.target.value)} />
        </div>
        <div className="input-group">
          <label>Լայնություն</label>
          <input type="number" value={wallWidth} onChange={(e) => setWallWidth(e.target.value)} />
        </div>
      </div>

      <div className="section">
        <h3>Սալիկի չափսեր (սմ)</h3>
        <div className="input-group">
          <label>Բարձրություն</label>
          <input type="number" value={tileHeight} onChange={(e) => setTileHeight(e.target.value)} />
        </div>
        <div className="input-group">
          <label>Լայնություն</label>
          <input type="number" value={tileWidth} onChange={(e) => setTileWidth(e.target.value)} />
        </div>
        <div className="input-group">
          <label>Սալիկների միջև բացվածք (սմ)</label>
          <input type="number" value={spacing} onChange={(e) => setSpacing(e.target.value)} />
        </div>
      </div>

      <div className="section">
        <h3>Գին և արժույթ</h3>
        <div className="input-group">
          <label>Սալիկի միավոր գին</label>
          <input type="number" value={pricePerTile} onChange={(e) => setPricePerTile(e.target.value)} />
        </div>
        <div className="input-group">
          <label>Արժույթ</label>
          <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            <option value="AMD">Դրամ (AMD)</option>
            <option value="USD">Դոլար (USD)</option>
          </select>
        </div>
      </div>

      <button className="calculate-button" onClick={calculateTiles}>
        Հաշվել
      </button>

      {(floorTilesNeeded !== null || wallTilesNeeded !== null) && (
        <div className="result" style={{ marginTop: '20px' }}>
          {floorTilesNeeded !== null && (
            <p>
              Հատակի համար անհրաժեշտ սալիկների քանակը՝ <strong>{floorTilesNeeded} հատ</strong>
              {floorCost !== null && ` (~${floorCost.toFixed(2)} ${currency})`}
            </p>
          )}
          {wallTilesNeeded !== null && (
            <p>
              Պատերի համար անհրաժեշտ սալիկների քանակը՝ <strong>{wallTilesNeeded} հատ</strong>
              {wallCost !== null && ` (~${wallCost.toFixed(2)} ${currency})`}
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default TilesCalculator
