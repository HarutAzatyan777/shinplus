import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import paintCalculatorApi from '../../api/paintCalculator';
import '../../styles/PaintCalculatorHistory.css';


const PaintCalculatorHistory = () => {
  const { user } = useSelector((state) => state.auth);
  const [paintRecords, setPaintRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({ length: '', width: '', height: '' });
  const [showAll, setShowAll] = useState(false); // Ավելին/Քչացնել toggle

  useEffect(() => {
    const fetchPaintHistory = async () => {
      try {
        if (!user?.uid) return;
        const res = await paintCalculatorApi.get(`/user/${user.uid}`);
        setPaintRecords(res.data);
      } catch (err) {
        setError('Չհաջողվեց ստանալ պատմությունը։');
      } finally {
        setLoading(false);
      }
    };

    fetchPaintHistory();
  }, [user?.uid]);

  const handleDelete = async (id) => {
    try {
      await paintCalculatorApi.delete(`/${id}`);
      setPaintRecords((prev) => prev.filter((rec) => rec._id !== id));
    } catch (err) {
      alert('Չհաջողվեց ջնջել։');
    }
  };

  const startEdit = (record) => {
    setEditId(record._id);
    setFormData({ length: record.length, width: record.width, height: record.height });
  };

  const handleEditSave = async () => {
    try {
      const updatedData = {
        ...formData,
        area: 2 * (formData.length * formData.height + formData.width * formData.height),
        coveragePerLiter: 12,
        litersNeeded:
          2 * (formData.length * formData.height + formData.width * formData.height) / 12,
        estimatedHours:
          (2 * (formData.length * formData.height + formData.width * formData.height)) / 24,
      };

      const res = await paintCalculatorApi.put(`/${editId}`, updatedData);
      setPaintRecords((prev) =>
        prev.map((rec) => (rec._id === editId ? res.data : rec))
      );
      setEditId(null);
    } catch (err) {
      alert('Թարմացման սխալ։');
    }
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: +e.target.value }));
  };

  return (
    <div className="paint-history">
      <h3>🎨 Ներկի հաշվարկների պատմություն</h3>

      {loading ? (
        <p>Բեռնվում է...</p>
      ) : error ? (
        <p className="paint-history__error">{error}</p>
      ) : paintRecords.length === 0 ? (
        <p>Դեռևս հաշվարկներ չկան։</p>
      ) : (
        <>
          <ul className="paint-history__list">
            {(showAll ? paintRecords : paintRecords.slice(0, 5)).map((record) => (
              <li key={record._id} className="paint-history__entry">
                {editId === record._id ? (
                  <div className="paint-history__edit-form">
                    <input
                      type="number"
                      name="length"
                      value={formData.length}
                      onChange={handleInputChange}
                      placeholder="Երկարություն"
                    />
                    <input
                      type="number"
                      name="width"
                      value={formData.width}
                      onChange={handleInputChange}
                      placeholder="Լայնություն"
                    />
                    <input
                      type="number"
                      name="height"
                      value={formData.height}
                      onChange={handleInputChange}
                      placeholder="Բարձրություն"
                    />
                    <button onClick={handleEditSave}>💾 Պահպանել</button>
                    <button onClick={() => setEditId(null)}>Չեղարկել</button>
                  </div>
                ) : (
                  <>
                    <span className="paint-history__date">
                      {new Date(record.createdAt).toLocaleDateString('hy-AM')}
                    </span>
                    <span className="paint-history__details">
                      Տարածք՝ {record.area} մ², Ներկ՝ {record.litersNeeded.toFixed(2)} լ, Ժամեր՝{' '}
                      {record.estimatedHours.toFixed(1)}
                    </span>
                    <div className="paint-history__actions">
                      <button onClick={() => startEdit(record)}>✏️ Խմբագրել</button>
                      <button onClick={() => handleDelete(record._id)}>🗑 Ջնջել</button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>

          {paintRecords.length > 5 && (
            <div className="paint-history__more-toggle">
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

export default PaintCalculatorHistory;
