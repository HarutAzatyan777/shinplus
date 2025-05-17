import React, { useState } from 'react'
import jsPDF from 'jspdf'
import '../../styles/ElectricWiresCalculator.css'

const ElectricWiresCalculator = () => {
  const [rooms, setRooms] = useState([
    { length: 4, width: 3, sockets: 4, switches: 2, appliances: [{ name: 'Լամպ', power: 60 }] }
  ])
  const [wireType, setWireType] = useState('2.5')
  const [result, setResult] = useState(null)

  const handleRoomChange = (index, field, value) => {
    const newRooms = [...rooms]
    newRooms[index][field] = field === 'length' || field === 'width' || field === 'sockets' || field === 'switches' ? Number(value) : value
    setRooms(newRooms)
  }

  const handleApplianceChange = (index, applianceIndex, field, value) => {
    const newRooms = [...rooms]
    newRooms[index].appliances[applianceIndex][field] = field === 'power' ? Number(value) : value
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
    let totalLength = 0
    let totalPower = 0

    rooms.forEach(room => {
      const perimeter = 2 * (room.length + room.width)
      const socketWire = room.sockets * 5
      const switchWire = room.switches * 3
      const roomLength = perimeter + socketWire + switchWire
      totalLength += roomLength

      room.appliances.forEach(appliance => {
        totalPower += appliance.power
      })
    })

    setResult({ totalLength, totalPower })
  }

  const downloadPDF = () => {
    const doc = new jsPDF()

    doc.setFontSize(16)
    doc.text('Էլեկտրական լարերի հաշվիչի արդյունքներ', 10, 20)

    doc.setFontSize(12)
    let y = 30
    rooms.forEach((room, index) => {
      doc.text(`Սենյակ ${index + 1}:`, 10, y)
      y += 6
      doc.text(`  - Չափսեր՝ ${room.length}մ x ${room.width}մ`, 10, y)
      y += 6
      doc.text(`  - Վարդակներ՝ ${room.sockets}, Անջատիչներ՝ ${room.switches}`, 10, y)
      y += 6

      if (room.appliances.length > 0) {
        doc.text(`  - Սարքեր`, 10, y)
        room.appliances.forEach(appliance => {
          y += 6
          doc.text(`    • ${appliance.name || 'անհայտ'}: ${appliance.power} Վտ`, 10, y)
        })
      } else {
        y += 6
        doc.text(`  - Սարքեր չկան`, 10, y)
      }

      y += 10
    })

    doc.text(`Ընդհանուր լարի երկարություն: ${result?.totalLength || 0} մ`, 10, y)
    y += 6
    doc.text(`Ընդհանուր հզորություն: ${result?.totalPower || 0} Վտ`, 10, y)

    doc.save('electric-wires-calculation.pdf')
  }

  return (
    <div className="electric-wires-calculator">
      <h2>Մանրակրկիտ էլեկտրական լարերի հաշվիչ</h2>
      <p>Հաշվիր պահանջվող լարերը՝ ըստ սենյակների, լարերի տեսակի, հզորությունների։</p>

      <div className="input-group">
        <label>Լարի տեսակը (մմ²)</label>
        <select value={wireType} onChange={e => setWireType(e.target.value)}>
          <option value="1.5">1.5 մմ²</option>
          <option value="2.5">2.5 մմ²</option>
          <option value="4">4 մմ²</option>
        </select>
      </div>

      {rooms.map((room, index) => (
        <div key={index} className="room-box">
          <h4>Սենյակ {index + 1}</h4>
          <div className="input-pair">
            <label>Երկարություն (մ)</label>
            <input type="number" value={room.length} onChange={e => handleRoomChange(index, 'length', e.target.value)} />
            <label>Լայնություն (մ)</label>
            <input type="number" value={room.width} onChange={e => handleRoomChange(index, 'width', e.target.value)} />
          </div>

          <div className="input-pair">
            <label>Վարդակների քանակ</label>
            <input type="number" value={room.sockets} onChange={e => handleRoomChange(index, 'sockets', e.target.value)} />
            <label>Անջատիչների քանակ</label>
            <input type="number" value={room.switches} onChange={e => handleRoomChange(index, 'switches', e.target.value)} />
          </div>

          <div className="appliance-list">
            <h5>Էլեկտրասարքեր</h5>
            {room.appliances.map((appliance, applianceIndex) => (
              <div key={applianceIndex} className="input-pair">
                <input
                  type="text"
                  placeholder="Օրինակ՝ Լամպ"
                  value={appliance.name}
                  onChange={e => handleApplianceChange(index, applianceIndex, 'name', e.target.value)}
                />
                <input
                  type="number"
                  placeholder="հզորություն (W)"
                  value={appliance.power}
                  onChange={e => handleApplianceChange(index, applianceIndex, 'power', e.target.value)}
                />
              </div>
            ))}
            <button onClick={() => addAppliance(index)}>➕ Ավելացնել սարք</button>
          </div>
        </div>
      ))}

      <button onClick={addRoom}>➕ Ավելացնել սենյակ</button>
      <button className="calculate-btn" onClick={calculate}>Հաշվել</button>

      {result && (
        <>
          <div className="result">
            <p><strong>Ընդհանուր լարի երկարություն՝</strong> {result.totalLength} մետր</p>
            <p><strong>Ընդհանուր հզորություն՝</strong> {result.totalPower} Վատտ</p>
          </div>
          <button className="calculate-btn" onClick={downloadPDF}>📥 Ներբեռնել PDF</button>
        </>
      )}
    </div>
  )
}

export default ElectricWiresCalculator
