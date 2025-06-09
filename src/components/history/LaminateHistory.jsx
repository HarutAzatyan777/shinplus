import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import laminateApi from '../../api/LaminateCalculator';
import '../../styles/LaminateCalculatorHistory.css';

const LaminateHistory = () => {
  const userId = useSelector(state => state.auth.user?.uid); // updated here
  const [laminateRecords, setLaminateRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editId, setEditId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const [formData, setFormData] = useState({
    lengthMeters: '',
    widthMeters: '',
    coveragePerBoxSqm: '',
    wastePercent: '',
    laminatePricePerSqm: '',
    spongePricePerSqm: '',
  });

  useEffect(() => {
    if (!userId) return;

    const fetchLaminateHistory = async () => {
      try {
        const res = await laminateApi.get(`/user/${userId}`);
        setLaminateRecords(res.data);
      } catch (err) {
        setError('Չհաջողվեց ստանալ պատմությունը։');
      } finally {
        setLoading(false);
      }
    };

    fetchLaminateHistory();
  }, [userId]);  // update dependency to userId

  const handleDelete = async (id) => {
    if (!window.confirm('Վստա՞հ եք, որ ցանկանում եք ջնջել։')) return;
    try {
      await laminateApi.delete(`/${id}`);
      setLaminateRecords((prev) => prev.filter((rec) => rec._id !== id));
    } catch {
      alert('Չհաջողվեց ջնջել։');
    }
  };

  const startEdit = (record) => {
    setEditId(record._id);
    setFormData({
      lengthMeters: record.lengthMeters,
      widthMeters: record.widthMeters,
      coveragePerBoxSqm: record.coveragePerBoxSqm,
      wastePercent: record.wastePercent,
      laminatePricePerSqm: record.laminatePricePerSqm,
      spongePricePerSqm: record.spongePricePerSqm,
    });
  };

  const handleEditSave = async () => {
    const length = parseFloat(formData.lengthMeters) || 0;
    const width = parseFloat(formData.widthMeters) || 0;
    const coverage = parseFloat(formData.coveragePerBoxSqm) || 0;
    const waste = parseFloat(formData.wastePercent) || 0;
    const laminatePrice = parseFloat(formData.laminatePricePerSqm) || 0;
    const spongePrice = parseFloat(formData.spongePricePerSqm) || 0;

    if (!length || !width || !coverage) {
      return alert('Խնդրում ենք լրացնել բոլոր պարտադիր դաշտերը։');
    }

    try {
      setIsSaving(true);

      const totalArea = length * width;
      const adjustedArea = totalArea * (1 + waste / 100);
      const boxesNeeded = Math.ceil(adjustedArea / coverage);
      const totalLaminatePrice = adjustedArea * laminatePrice;
      const totalSpongePrice = adjustedArea * spongePrice;
      const totalPrice = totalLaminatePrice + totalSpongePrice;

      const updatedData = {
        ...formData,
        lengthMeters: length,
        widthMeters: width,
        coveragePerBoxSqm: coverage,
        wastePercent: waste,
        totalArea,
        adjustedArea,
        boxesNeeded,
        totalLaminatePrice,
        totalSpongePrice,
        totalPrice,
        userId, // add userId here for the backend update
      };

      const res = await laminateApi.put(`/${editId}`, updatedData);
      setLaminateRecords((prev) =>
        prev.map((rec) => (rec._id === editId ? res.data : rec))
      );
      setEditId(null);
      alert('Հաջողությամբ թարմացվեց։');
    } catch (err) {
      console.error('Error updating laminate record:', err);
      alert('Թարմացման սխալ։');
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="laminate-history">
      <h3>🪵 Լամինատի հաշվարկների պատմություն</h3>

      {loading ? (
        <p>Բեռնվում է...</p>
      ) : error ? (
        <p className="laminate-history__error">{error}</p>
      ) : laminateRecords.length === 0 ? (
        <p>Դեռևս հաշվարկներ չկան։</p>
      ) : (
        <>
          <ul className="laminate-history__list">
            {(showAll ? laminateRecords : laminateRecords.slice(0, 5)).map((record) => (
              <li key={record._id} className="laminate-history__entry">
                {editId === record._id ? (
                  <div className="laminate-history__edit-form">
                    <input
                      type="number"
                      name="lengthMeters"
                      value={formData.lengthMeters}
                      onChange={handleInputChange}
                      placeholder="Երկարություն (մետր)"
                      step="0.01"
                    />
                    <input
                      type="number"
                      name="widthMeters"
                      value={formData.widthMeters}
                      onChange={handleInputChange}
                      placeholder="Լայնություն (մետր)"
                      step="0.01"
                    />
                    <input
                      type="number"
                      name="coveragePerBoxSqm"
                      value={formData.coveragePerBoxSqm}
                      onChange={handleInputChange}
                      placeholder="Տարածք մեկ տուփի համար (մ²)"
                      step="0.01"
                    />
                    <input
                      type="number"
                      name="wastePercent"
                      value={formData.wastePercent}
                      onChange={handleInputChange}
                      placeholder="Կորուստ (%)"
                      step="0.01"
                    />
                    <input
                      type="number"
                      name="laminatePricePerSqm"
                      value={formData.laminatePricePerSqm}
                      onChange={handleInputChange}
                      placeholder="Լամինատի գին (մ²)"
                      step="0.01"
                    />
                    <input
                      type="number"
                      name="spongePricePerSqm"
                      value={formData.spongePricePerSqm}
                      onChange={handleInputChange}
                      placeholder="Սպունգի գին (մ²)"
                      step="0.01"
                    />
                    <button onClick={handleEditSave} disabled={isSaving}>
                      💾 Պահպանել
                    </button>
                    <button onClick={() => setEditId(null)}>Չեղարկել</button>
                  </div>
                ) : (
                  <>
                    <span className="laminate-history__date">
                      {new Date(record.createdAt).toLocaleDateString('hy-AM')}
                    </span>
                    <span className="laminate-history__details">
                      Տարածք՝ {(record.adjustedArea ?? record.totalArea)?.toFixed(2) || '—'} մ², Պարկեր՝ {record.boxesNeeded}
                    </span>
                    <div className="laminate-history__actions">
                      <button onClick={() => startEdit(record)}>✏️ Խմբագրել</button>
                      <button onClick={() => handleDelete(record._id)}>🗑 Ջնջել</button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>

          {laminateRecords.length > 5 && (
            <div className="laminate-history__more-toggle">
              <button onClick={() => setShowAll((prev) => !prev)}>
                {showAll ? 'Քչացնել' : 'Ավելին...'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LaminateHistory;
