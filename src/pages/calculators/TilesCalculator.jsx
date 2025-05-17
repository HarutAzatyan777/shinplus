import React, { useState } from 'react'
import '../../styles/TilesCalculator.css'
import { useNavigate } from 'react-router-dom'

const TilesCalculator = () => {
  const [floorLength, setFloorLength] = useState('')
  const [floorWidth, setFloorWidth] = useState('')
  const [wallHeight, setWallHeight] = useState('')
  const [wallWidth, setWallWidth] = useState('')
  const [tileHeight, setTileHeight] = useState('')
  const [tileWidth, setTileWidth] = useState('')
  const [floorTilesNeeded, setFloorTilesNeeded] = useState(null)
  const [wallTilesNeeded, setWallTilesNeeded] = useState(null)
  const navigate = useNavigate()

  const calculateTiles = () => {
    const fLength = parseFloat(floorLength)
    const fWidth = parseFloat(floorWidth)
    const wHeight = parseFloat(wallHeight)
    const wWidth = parseFloat(wallWidth)
    const tHeight = parseFloat(tileHeight)
    const tWidth = parseFloat(tileWidth)

    if (
      !isNaN(fLength) && !isNaN(fWidth) && !isNaN(wHeight) && !isNaN(wWidth) &&
      !isNaN(tHeight) && !isNaN(tWidth) &&
      fLength > 0 && fWidth > 0 && wHeight > 0 && wWidth > 0 && tHeight > 0 && tWidth > 0
    ) {
      // Հատակի տարածք (մ²)
      const floorArea = fLength * fWidth
      // Պատի տարածք (մ²)
      const wallArea = wHeight * wWidth
      // Սալիկի մակերեսը (մ²), հաշվի առնելով սանտիմետրից մետր փոխարկումը
      const tileArea = (tHeight / 100) * (tWidth / 100)

      // Հաշվարկում ենք սալիկների քանակը՝ անկյունավորանում վերընթացի
      const floorCount = Math.ceil(floorArea / tileArea)
      const wallCount = Math.ceil(wallArea / tileArea)

      setFloorTilesNeeded(floorCount)
      setWallTilesNeeded(wallCount)
    } else {
      setFloorTilesNeeded(null)
      setWallTilesNeeded(null)
    }
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
      <p>Մուտքագրեք չափսերը՝ հատակի համար մետրերով, պատերի համար մետրերով, սալիկի չափսերը՝ սանտիմետրերով:</p>

      <div className="section">
        <h3>Հատակի չափսեր (մ)</h3>
        <div className="input-group">
          <label>Երկարություն</label>
          <input type="number" value={floorLength} onChange={e => setFloorLength(e.target.value)} />
        </div>
        <div className="input-group">
          <label>Լայնություն</label>
          <input type="number" value={floorWidth} onChange={e => setFloorWidth(e.target.value)} />
        </div>
      </div>

      <div className="section">
        <h3>Պատի չափսեր (մ)</h3>
        <div className="input-group">
          <label>Բարձրություն</label>
          <input type="number" value={wallHeight} onChange={e => setWallHeight(e.target.value)} />
        </div>
        <div className="input-group">
          <label>Լայնություն</label>
          <input type="number" value={wallWidth} onChange={e => setWallWidth(e.target.value)} />
        </div>
      </div>

      <div className="section">
        <h3>Սալիկի չափսեր (սմ)</h3>
        <div className="input-group">
          <label>Բարձրություն</label>
          <input type="number" value={tileHeight} onChange={e => setTileHeight(e.target.value)} />
        </div>
        <div className="input-group">
          <label>Լայնություն</label>
          <input type="number" value={tileWidth} onChange={e => setTileWidth(e.target.value)} />
        </div>
      </div>

      <button className="calculate-button" onClick={calculateTiles}>Հաշվել</button>

      {(floorTilesNeeded !== null || wallTilesNeeded !== null) && (
        <div className="result">
          {floorTilesNeeded !== null && <p>Հատակի համար անհրաժեշտ սալիկների քանակը՝ <strong>{floorTilesNeeded} հատ</strong></p>}
          {wallTilesNeeded !== null && <p>Պատերի համար անհրաժեշտ սալիկների քանակը՝ <strong>{wallTilesNeeded} հատ</strong></p>}
        </div>
      )}
    </div>
  )
}

export default TilesCalculator
