import React, { useState, useEffect, useRef } from 'react';
import laminateCalculatorApi from '../../api/LaminateCalculator';
import '../../styles/LaminateCalculator.css';
// Removed: import { toPng } from 'html-to-image';
import html2canvas from 'html2canvas';
import { useSelector } from 'react-redux';

function LaminateCalculator() {
  const userId = useSelector(state => state.auth.user?.uid);

  const [formData, setFormData] = useState({
    userId: '',
    lengthMeters: '',
    widthMeters: '',
    coveragePerBoxSqm: '',
    wastePercent: '',
    laminatePricePerSqm: '',
    spongePricePerSqm: '',
  });

  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const resultRef = useRef(null);

  const coverageOptions = ['1.8', '2', '2.2', '2.5', '3'];
  const wasteOptions = ['5', '7', '10', '12'];

  useEffect(() => {
    if (userId) {
      setFormData(prev => ({ ...prev, userId }));
      fetchHistory(userId);
    }
  }, [userId]);

  const fetchHistory = async (uid) => {
    if (!uid) return;
    setLoadingHistory(true);
    try {
      const res = await laminateCalculatorApi.get(`/user/${uid}`);
      setHistory(res.data);
    } catch {
      alert('Պատմությունը բեռնելը չհաջողվեց');
    } finally {
      setLoadingHistory(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCalculate = async () => {
    if (!userId) return alert('Մուտք գործեք՝ շարունակելու համար։');
    try {
      const response = await laminateCalculatorApi.post('/', formData);
      setResult(response.data);
      fetchHistory(userId);
    } catch (error) {
      alert(error.response?.data?.error || 'Հաշվարկի ընթացքում սխալ տեղի ունեցավ');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Համոզված եք, որ ուզում եք ջնջել հաշվարկը?')) return;
    try {
      await laminateCalculatorApi.delete(`/${id}`, {
        data: { userId },
      });
      setHistory(prev => prev.filter(item => item._id !== id));
      if (result?.calculationId === id) setResult(null);
    } catch {
      alert('Հաշվարկը ջնջել չհաջողվեց');
    }
  };

  // Updated handleDownloadImage to use html2canvas instead of html-to-image
  const handleDownloadImage = () => {
    if (!resultRef.current) return alert('Առաջին հաշվեք արդյունքը:');
    html2canvas(resultRef.current, { useCORS: true }).then(canvas => {
      const link = document.createElement('a');
      link.download = 'laminate_calculation_result.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    }).catch(() => {
      alert('Նկարահանման ժամանակ սխալ է պատահել։');
    });
  };

  const infoText = (
    <div className="info-text" style={{ marginBottom: 20, backgroundColor: '#f0f8ff', padding: 15, borderRadius: 6 }}>
      <h3>Ինչպես լրացնել դաշտերը</h3>
      <p><b>Երկարություն (մետր)</b> — Մակերեսի երկարությունը մետրերով:</p>
      <p><b>Լայնություն (մետր)</b> — Մակերեսի լայնությունը մետրերով:</p>
      <p><b>Նախապատրաստված տարածք մեկ տուփի համար (մ²)</b> — Օրինակ՝ 2.2 մ²: Ընտրեք կամ գրեք սեփականը</p>
      <p><b>Ծախս (%)</b> — Օրինակ՝ 5% կորուստներ: Ընտրեք կամ գրեք սեփականը</p>
      <p><b>Լամինատի գին/մ²</b> — Լամինատի մեկ մ²-ի գինը դրամով:</p>
      <p><b>Սպունգի գին/մ²</b> — Սպունգի մեկ մ²-ի գինը դրամով:</p>
    </div>
  );

  return (
    <div className="laminate-calculator">
      <h1>Լամինատի Հաշվիչ</h1>
      {infoText}
      <div className="input-group">
        <input
          type="number"
          name="lengthMeters"
          placeholder="Երկարություն (մետր)"
          value={formData.lengthMeters}
          onChange={handleChange}
          min="0"
          step="any"
        />
        <input
          type="number"
          name="widthMeters"
          placeholder="Լայնություն (մետր)"
          value={formData.widthMeters}
          onChange={handleChange}
          min="0"
          step="any"
        />
        <div className="field-with-datalist">
          <label htmlFor="coveragePerBoxSqmInput">Նախապատրաստված տարածք մեկ տուփի համար (մ²):</label>
          <input
            list="coverageOptions"
            id="coveragePerBoxSqmInput"
            name="coveragePerBoxSqm"
            placeholder="Ընտրել կամ գրել սեփականը"
            value={formData.coveragePerBoxSqm}
            onChange={handleChange}
          />
          <datalist id="coverageOptions">
            {coverageOptions.map(opt => <option key={opt} value={opt} />)}
          </datalist>
        </div>
        <div className="field-with-datalist">
          <label htmlFor="wastePercentInput">Ծախս (%):</label>
          <input
            list="wasteOptions"
            id="wastePercentInput"
            name="wastePercent"
            placeholder="Ընտրել կամ գրել սեփականը"
            value={formData.wastePercent}
            onChange={handleChange}
          />
          <datalist id="wasteOptions">
            {wasteOptions.map(opt => <option key={opt} value={opt} />)}
          </datalist>
        </div>
        <input
          type="number"
          name="laminatePricePerSqm"
          placeholder="Լամինատի գին/մ²"
          value={formData.laminatePricePerSqm}
          onChange={handleChange}
          min="0"
          step="any"
        />
        <input
          type="number"
          name="spongePricePerSqm"
          placeholder="Սպունգի գին/մ²"
          value={formData.spongePricePerSqm}
          onChange={handleChange}
          min="0"
          step="any"
        />
      </div>

      <button onClick={handleCalculate} style={{ marginTop: 10 }}>
        Հաշվել
      </button>

      {result && (
        <>
          <div
            ref={resultRef}
            style={{
              marginTop: 20,
              padding: 15,
              border: '1px solid #ccc',
              borderRadius: 6,
              backgroundColor: '#fff',
              width: 'fit-content',
              userSelect: 'none',
            }}
          >
            <h3>Արդյունք</h3>
            <p>Տուփերի քանակը՝ <b>{result.boxesNeeded}</b></p>
            <p>Լամինատի ընդհանուր արժեքը՝ <b>{result.totalLaminatePrice} դրամ</b></p>
            <p>Սպունգի ընդհանուր արժեքը՝ <b>{result.totalSpongePrice} դրամ</b></p>
            <p>Ընդհանուր արժեքը՝ <b>{result.totalPrice} դրամ</b></p>
          </div>

          <button onClick={handleDownloadImage} style={{ marginTop: 10 }}>
            Ներբեռնել արդյունքը նկարի տեսքով
          </button>
        </>
      )}

      <hr style={{ margin: '20px 0' }} />
      <h2>Պատմություն {loadingHistory && '(բեռնում...)'}</h2>
      <ul>
        {history.length === 0 && <li>Պատմությունը դատարկ է։</li>}
        {history.map(item => (
          <li key={item._id} style={{ marginBottom: 10 }}>
            Տարածք՝ {item.lengthMeters} x {item.widthMeters} մ, Գին՝ {item.totalPrice} դրամ
            <button
              onClick={() => handleDelete(item._id)}
              style={{ marginLeft: 10, color: 'red' }}
            >
              Ջնջել
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LaminateCalculator;
