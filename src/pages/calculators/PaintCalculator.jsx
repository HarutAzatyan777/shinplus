import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import paintCalculatorApi from '../../api/paintCalculator';
import '../../styles/PaintCalculator.css';

const PaintCalculator = () => {
  const { user } = useSelector((state) => state.auth); // ստանում ենք օգտատիրոջ ID-ն

  console.log('👉 user from Redux:', user); // ✅ Այստեղ ստուգում ենք user-ը

  const [roomData, setRoomData] = useState({
    length: '',
    width: '',
    height: '',
    coveragePerLiter: 12, // default արժեք, կարող է փոփոխվել
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setRoomData({ ...roomData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    console.log('📦 Submitted room data:', roomData);

    if (!user?.uid) {
      console.warn('⚠️ User not logged in or uid missing');
      setError('Մուտք գործեք՝ օգտագործելու համար։');
      return;
    }

    const payload = {
      ...roomData,
      length: parseFloat(roomData.length),
      width: parseFloat(roomData.width),
      height: parseFloat(roomData.height),
      coveragePerLiter: parseFloat(roomData.coveragePerLiter),
      user: user.uid,
    };

    console.log('📤 Payload to API:', payload);

    try {
      const res = await paintCalculatorApi.post('/', payload);
      console.log('✅ Response from API:', res.data);
      setResult(res.data); // ենթադրում ենք՝ `{ paintLiters: number }`
    } catch (err) {
      console.error('❌ Error calculating paint:', err);
      setError('Չհաջողվեց հաշվարկել ներկի քանակը։');
    }
  };

  return (
    <div className="paint-calculator">
      <h2>Ներկի Հաշվիչ</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Երկարություն (մ):</label>
          <input
            type="number"
            name="length"
            value={roomData.length}
            onChange={handleChange}
            required
            step="0.1"
          />
        </div>
        <div>
          <label>Լայնություն (մ):</label>
          <input
            type="number"
            name="width"
            value={roomData.width}
            onChange={handleChange}
            required
            step="0.1"
          />
        </div>
        <div>
          <label>Բարձրություն (մ):</label>
          <input
            type="number"
            name="height"
            value={roomData.height}
            onChange={handleChange}
            required
            step="0.1"
          />
        </div>
        <div>
          <label>Ծածկույթ (մ²/լիտր):</label>
          <input
            type="number"
            name="coveragePerLiter"
            value={roomData.coveragePerLiter}
            onChange={handleChange}
            required
            step="0.1"
          />
        </div>
        <button type="submit">Հաշվել</button>
      </form>

      {result && (
  <div className="result">
    <h3>Արդյունք</h3>
    <p>Սենյակի մակերեսը՝ {result.area} մ²</p>
    <p>Պահանջվող ներկ՝ {result.litersNeeded} լիտր</p>
    <p>Նախատեսվող աշխատանքային ժամեր՝ {result.estimatedHours} ժամ</p>
  </div>
)}

      {error && <p className="error"> >{error}</p>}
    </div>
  );
};

export default PaintCalculator;
