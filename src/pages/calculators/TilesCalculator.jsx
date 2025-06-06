import React, { useState, useEffect } from 'react'
import axiosInstance from '../../api/tilesCalculatorApi'

const TilesCalculatorPage = () => {
  const [form, setForm] = useState({
    floorLengthMeters: 5,      // Հատակ — երկարություն (մետր)
    floorWidthMeters: 4,       // Հատակ — լայնություն (մետր)
    wallLengthMeters: 10,      // Պատ — երկարություն (մետր)
    wallHeightMeters: 3,       // Պատ — բարձրություն (մետր)
    tileLengthCm: 30,          // Սալիկի երկարություն (սմ)
    tileWidthCm: 30,           // Սալիկի լայնություն (սմ)
    groutCm: 0.5,              // Հարակցման բաց (սմ)
    tilePrice: 1500,           // Սալիկի գին (դրամ)
  })

  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const fetchHistory = async () => {
    setLoading(true)
    try {
      const res = await axiosInstance.get('/my-history')
      setHistory(res.data)
      setError(null)
    } catch (err) {
      setError('Չհաջողվեց բեռնել պատմությունը')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHistory()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const clearMessages = () => {
    setError(null)
    setSuccessMessage(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    clearMessages()

    try {
      const body = {
        floorLengthMeters: parseFloat(form.floorLengthMeters),
        floorWidthMeters: parseFloat(form.floorWidthMeters),
        wallLengthMeters: parseFloat(form.wallLengthMeters),
        wallHeightMeters: parseFloat(form.wallHeightMeters),
        tileLengthCm: parseFloat(form.tileLengthCm),
        tileWidthCm: parseFloat(form.tileWidthCm),
        groutCm: parseFloat(form.groutCm),
        tilePrice: parseFloat(form.tilePrice),
      }

      const res = await axiosInstance.post('/', body)

      setSuccessMessage(`Հաշվարկը հաջողությամբ ստեղծվեց։ Անհրաժեշտ Սալիկի՝ ${res.data.tilesNeeded} հատ, Ընդհանուր արժեք՝ ${res.data.totalPrice} դրամ։`)

      fetchHistory()
      setForm({
        floorLengthMeters: 5,
        floorWidthMeters: 4,
        wallLengthMeters: 10,
        wallHeightMeters: 3,
        tileLengthCm: 30,
        tileWidthCm: 30,
        groutCm: 0.5,
        tilePrice: 1500,
      })

      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)

    } catch (err) {
      setError('Չհաջողվեց ստեղծել հաշվարկը')
      console.error(err)
    }
  }

  const handleDelete = async (id) => {
    clearMessages()
    if (!window.confirm('Համոզվա՞ծ եք, որ ցանկանում եք ջնջել։')) return

    try {
      await axiosInstance.delete(`/${id}`)
      setSuccessMessage('Հաշվարկը ջնջվեց։')
      fetchHistory()

      setTimeout(() => {
        setSuccessMessage(null)
      }, 3000)

    } catch (err) {
      setError('Չհաջողվեց ջնջել հաշվարկը')
      console.error(err)
    }
  }

  const handleLike = async (id) => {
    clearMessages()
    try {
      await axiosInstance.put(`/${id}/like`)
      setSuccessMessage('Հաշվարկը հավանվեց։')
      fetchHistory()

      setTimeout(() => {
        setSuccessMessage(null)
      }, 3000)

    } catch (err) {
      setError('Չհաջողվեց ավելացնել հավանումը')
      console.error(err)
    }
  }

  const labels = {
    floorLengthMeters: 'Հատակ — երկարություն (մետր)',
    floorWidthMeters: 'Հատակ — լայնություն (մետր)',
    wallLengthMeters: 'Պատ — երկարություն (մետր)',
    wallHeightMeters: 'Պատ — բարձրություն (մետր)',
    tileLengthCm: 'Սալիկի երկարություն (սմ)',
    tileWidthCm: 'Սալիկի լայնություն (սմ)',
    groutCm: 'Հարակցման բաց (սմ)',
    tilePrice: 'Սալիկի գին (դրամ)',
  }

  return (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
      <h1>Սալիկի հաշվիչ</h1>

      {successMessage && (
        <div style={{ backgroundColor: '#d4edda', color: '#155724', padding: '10px 15px', borderRadius: 4, marginBottom: 20, border: '1px solid #c3e6cb' }}>
          {successMessage}
        </div>
      )}

      {error && (
        <div style={{ backgroundColor: '#f8d7da', color: '#721c24', padding: '10px 15px', borderRadius: 4, marginBottom: 20, border: '1px solid #f5c6cb' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ marginBottom: 30 }}>
        {Object.entries(form).map(([key, value]) => (
          <div key={key} style={{ marginBottom: 10 }}>
            <label htmlFor={key} style={{ display: 'block', fontWeight: 'bold' }}>
              {labels[key]}:
            </label>
            <input
              id={key}
              name={key}
              type="number"
              step="any"
              value={value}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: 8 }}
            />
          </div>
        ))}

        <button type="submit" style={{ padding: '10px 15px', fontWeight: 'bold' }}>
          Հաշվել
        </button>
      </form>

      <h2>Իմ հաշվարկները</h2>

      {loading ? (
        <p>Բեռնում...</p>
      ) : history.length === 0 ? (
        <p>Դատարկ է, դեռ հաշվարկ չունեք։</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {history.map(calc => (
            <li
              key={calc._id}
              style={{
                border: '1px solid #ccc',
                borderRadius: 6,
                padding: 15,
                marginBottom: 10,
              }}
            >
              {/* <div><b>ID:</b> {calc._id}</div> */}
              <div><b>Անհրաժեշտ Սալիկի:</b> {calc.tilesNeeded} հատ</div>
              <div><b>Ընդհանուր արժեք:</b> {calc.totalPrice} դրամ</div>
              <div><b>Ստեղծման ամսաթիվ:</b> {new Date(calc.createdAt).toLocaleString()}</div>
              <button onClick={() => handleLike(calc._id)} style={{ marginRight: 10 }}>
                👍 Հավանել
              </button>
              <button onClick={() => handleDelete(calc._id)} style={{ color: 'red' }}>
                Ջնջել
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default TilesCalculatorPage
