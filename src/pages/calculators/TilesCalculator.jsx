import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';

const TilesCalculatorPage = () => {
  // ...հիմնական state-ները, handleChange, handleSubmit ...
  // Այս պահին օգտագործում ենք axiosInstance-ը բոլոր հարցումների համար

  const [form, setForm] = useState({
    floorLengthMeters: '',
    floorWidthMeters: '',
    wallLengthMeters: '',
    wallHeightMeters: '',
    tileLengthCm: '',
    tileWidthCm: '',
    groutCm: '',
    tilePrice: '',
  });

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get('/my-history');
      setHistory(res.data);
      setError(null);
    } catch (err) {
      setError('Չհաջողվեց բեռնել history-ն');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      };

      const res = await axiosInstance.post('/', body);
      alert(`Հաշվարկ ստեղծվեց։ Տակտալ՝ ${res.data.tilesNeeded} հատ, Ընդհանուր արժեք՝ ${res.data.totalPrice}։`);
      fetchHistory();
      setForm({
        floorLengthMeters: '',
        floorWidthMeters: '',
        wallLengthMeters: '',
        wallHeightMeters: '',
        tileLengthCm: '',
        tileWidthCm: '',
        groutCm: '',
        tilePrice: '',
      });
      setError(null);
    } catch (err) {
      setError('Չհաջողվեց ստեղծել հաշվարկը');
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Համոզվա՞ծ եք, որ ուզում եք ջնջել։')) return;

    try {
      await axiosInstance.delete(`/${id}`);
      alert('Ջնջվեց։');
      fetchHistory();
    } catch (err) {
      setError('Չհաջողվեց ջնջել');
      console.error(err);
    }
  };

  const handleLike = async (id) => {
    try {
      await axiosInstance.put(`/${id}/like`);
      alert('Like ավելացավ։');
      fetchHistory();
    } catch (err) {
      setError('Չհաջողվեց ավելացնել like');
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
      <h1>Տաշերի հաշվիչ</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ marginBottom: 30 }}>
        {Object.entries(form).map(([key, value]) => (
          <div key={key} style={{ marginBottom: 10 }}>
            <label htmlFor={key} style={{ display: 'block', fontWeight: 'bold' }}>
              {key}:
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

      <h2>Իմ Հաշվարկները</h2>

      {loading ? (
        <p>Բեռնում...</p>
      ) : history.length === 0 ? (
        <p>Դատարկ է</p>
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
              <div><b>ID:</b> {calc._id}</div>
              <div><b>Tiles Needed:</b> {calc.tilesNeeded}</div>
              <div><b>Total Price:</b> {calc.totalPrice} AMD</div>
              <div><b>Created At:</b> {new Date(calc.createdAt).toLocaleString()}</div>
              <button onClick={() => handleLike(calc._id)} style={{ marginRight: 10 }}>
                👍 Like
              </button>
              <button onClick={() => handleDelete(calc._id)} style={{ color: 'red' }}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TilesCalculatorPage;
