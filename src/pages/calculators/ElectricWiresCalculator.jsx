import React, { useState, useRef } from 'react'
import html2canvas from 'html2canvas'
import '../../styles/ElectricWiresCalculator.css'
import { useNavigate } from 'react-router-dom'


const MATERIAL_RESISTIVITY = {
  copper: 1.68e-8,   // Ω·m
  aluminum: 2.65e-8  // Ω·m
}


const ElectricWiresCalculator = () => {
  const [rooms, setRooms] = useState([
    { length: 4, width: 3, sockets: 4, switches: 2, appliances: [{ name: 'Լամպ', power: 60 }] }
  ])
  const [wireType, setWireType] = useState('2.5')

  const [systemType, setSystemType] = useState('single-phase')
  const [voltage, setVoltage] = useState(230)
  const [voltageDropPercent, setVoltageDropPercent] = useState(3)
  const [material, setMaterial] = useState('copper')
  const [current, setCurrent] = useState(10)
  const [distance, setDistance] = useState(20)
  const [maxTemp, setMaxTemp] = useState(75)
  

  const [result, setResult] = useState(null)
  const resultRef = useRef(null)

  const handleRoomChange = (index, field, value) => {
    const newRooms = [...rooms]
    newRooms[index][field] = ['length','width','sockets','switches'].includes(field)
      ? Number(value)
      : value
    setRooms(newRooms)
  }
  

  const handleApplianceChange = (roomIndex, applianceIndex, field, value) => {
    const newRooms = [...rooms]
    newRooms[roomIndex].appliances[applianceIndex][field] = field === 'power' ? Number(value) : value
    setRooms(newRooms)
  }

  const addRoom = () => {
    setRooms([...rooms, { length: 4, width: 3, sockets: 4, switches: 2, appliances: [] }])
  }

  const addAppliance = (roomIndex) => {
    const newRooms = [...rooms]
    newRooms[roomIndex].appliances.push({ name: '', power: 0 })
    setRooms(newRooms)
  }

  const calculate = () => {
    const rho = MATERIAL_RESISTIVITY[material]
    const deltaV = (voltage * voltageDropPercent) / 100
    const L = distance
    const A_m2 = (rho * L * current) / deltaV
    const A_mm2 = A_m2 * 1e6
    const diameter_m = 2 * Math.sqrt(A_m2 / Math.PI)
    const diameter_mm = diameter_m * 1000

    let totalLength = 0
    let totalPower = 0
    rooms.forEach(room => {
      const perim = 2 * (room.length + room.width)
      totalLength += perim + room.sockets * 5 + room.switches * 3
      room.appliances.forEach(ap => totalPower += ap.power)
    })

    setResult({
      totalLength,
      totalPower,
      area: A_mm2.toFixed(2),
      diameter: diameter_mm.toFixed(2)
    })
  }

  const downloadImage = () => {
    if (!resultRef.current) return
    html2canvas(resultRef.current).then(canvas => {
      const link = document.createElement('a')
      link.download = 'electric-wires-calculation.png'
      link.href = canvas.toDataURL('image/png')
      link.click()
    })
  }
  const navigate = useNavigate()

  return (
    <div className="electric-wires-calculator">

      <h2>Մանրակ. էլեկտր. լարերի հաշվիչ</h2>
     <div className="breadcrumb">
        <span onClick={() => navigate('/')}>🏠 Գլխավոր</span>
        <span className="breadcrumb-separator">›</span>
        <span onClick={() => navigate('/calculators')}>Շինարարական հաշվիչներ</span>
        <span className="breadcrumb-separator">›</span>
        <span className="current">Բետոնի ծավալի հաշվիչ</span>
      </div>
      <div className="input-group">
        <label>Համակարգի տեսակը</label>
        <select value={systemType} onChange={e => setSystemType(e.target.value)}>
          <option value="DC">DC</option>
          <option value="single-phase">Միաֆազ AC</option>
          <option value="three-phase">Եռաֆազ AC</option>
        </select>
      </div>
      <div className="input-group">
        <label>Աղբյուրի լարում (Վ)</label>
        <input type="number" value={voltage} onChange={e => setVoltage(Number(e.target.value))} />
      </div>
      <div className="input-group">
        <label>Թույլատր. լարման անկում (%)</label>
        <input type="number" value={voltageDropPercent} onChange={e => setVoltageDropPercent(Number(e.target.value))} />
      </div>
      <div className="input-group">
        <label>Հաղորդիչի նյութ</label>
        <select value={material} onChange={e => setMaterial(e.target.value)}>
          <option value="copper">Պղինձ</option>
          <option value="aluminum">Ալյումին</option>
        </select>
      </div>
      <div className="input-group">
        <label>Հոսանք (Ա)</label>
        <input type="number" value={current} onChange={e => setCurrent(Number(e.target.value))} />
      </div>
      <div className="input-group">
        <label>One-way հեռավորություն (մ)</label>
        <input type="number" value={distance} onChange={e => setDistance(Number(e.target.value))} />
      </div>
      <div className="input-group">
        <label>Լարի առավելագույն ջերմաստիճան (°C)</label>
        <input type="number" value={maxTemp} onChange={e => setMaxTemp(Number(e.target.value))} />
      </div>
      <div className="input-group">
        <label>Լարի տեսակը (մմ²)</label>
        <select value={wireType} onChange={e => setWireType(e.target.value)}>
          <option value="1.5">1.5 մմ²</option>
          <option value="2.5">2.5 մմ²</option>
          <option value="4">4 մմ²</option>
        </select>
      </div>

      {rooms.map((room, idx) => (
        <div key={idx} className="room-box">
          <h4>Սենյակ {idx + 1}</h4>
          <div className="room-inputs">
            <label>Երկարություն (մ)</label>
            <input
              type="number"
              value={room.length}
              onChange={e => handleRoomChange(idx, 'length', e.target.value)}
            />
            <label>Լայնություն (մ)</label>
            <input
              type="number"
              value={room.width}
              onChange={e => handleRoomChange(idx, 'width', e.target.value)}
            />
            <label>Վարդակների քանակ</label>
            <input
              type="number"
              value={room.sockets}
              onChange={e => handleRoomChange(idx, 'sockets', e.target.value)}
            />
            <label>Անջատիչների քանակ</label>
            <input
              type="number"
              value={room.switches}
              onChange={e => handleRoomChange(idx, 'switches', e.target.value)}
            />
          </div>
          <div className="appliances">
            <h5>Սարքեր</h5>
            {room.appliances.map((appliance, aIdx) => (
              <div key={aIdx} className="appliance-item">
                <input
                  type="text"
                  placeholder="Անուն"
                  value={appliance.name}
                  onChange={e => handleApplianceChange(idx, aIdx, 'name', e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Հզորություն (Վտ)"
                  value={appliance.power}
                  onChange={e => handleApplianceChange(idx, aIdx, 'power', e.target.value)}
                />
              </div>
            ))}
            <button onClick={() => addAppliance(idx)}>➕ Ավելացնել սարք</button>
          </div>
        </div>
      ))}

      <button onClick={addRoom}>➕ Ավելացնել սենյակ</button>
      <button className="calculate-btn" onClick={calculate}>Հաշվել</button>

      {result && (
        <>
          <div className="result" ref={resultRef}>
            <p><strong>Ընդ. լարի երկարություն՝</strong> {result.totalLength} մ</p>
            <p><strong>Ընդ. հզորություն՝</strong> {result.totalPower} Վտ</p>
            <p><strong>Հաշված հատ./մմ²՝</strong> {result.area}</p>
            <p><strong>Հաշված տրամագիծ՝</strong> {result.diameter} մմ</p>
          </div>
          <button className="calculate-btn" onClick={downloadImage}>📥 Ներբեռնել նկարի տեսքով</button>
        </>
      )}
    </div>
  )
}

export default ElectricWiresCalculator
