import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/tilesCalculatorApi';
import '../../styles/History.css';

const TilesCalculatorHistory = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axiosInstance.get('/my-history');
        setRecords(res.data);
      } catch (err) {
        setError('Չհաջողվեց ստանալ պատմությունը։');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/${id}`);
      setRecords((prev) => prev.filter((rec) => rec._id !== id));
    } catch {
      alert('Չհաջողվեց ջնջել։');
    }
  };

  return (
    <div className="paint-history">
      <h3>🧱 Սալիկների հաշվարկների պատմություն</h3>

      {loading ? (
        <p>Բեռնվում է...</p>
      ) : error ? (
        <p className="paint-history__error">{error}</p>
      ) : records.length === 0 ? (
        <p>Դեռևս հաշվարկներ չկան։</p>
      ) : (
        <>
          <ul className="paint-history__list">
            {(showAll ? records : records.slice(0, 5)).map((rec) => (
              <li key={rec._id} className="paint-history__entry">
                <span className="paint-history__date">
                  {new Date(rec.createdAt).toLocaleDateString('hy-AM')}
                </span>
                <span className="paint-history__details">
                  Ընդհանուր մակերես՝ {rec.totalArea?.toFixed(2)} մ² | Պլիտկա՝ {rec.tilesNeeded} հատ | Գին՝ {rec.totalPrice?.toFixed(0)} ֏
                </span>
                <div className="paint-history__actions">
                  <button onClick={() => handleDelete(rec._id)}>🗑 Ջնջել</button>
                </div>
              </li>
            ))}
          </ul>

          {records.length > 5 && (
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

export default TilesCalculatorHistory;
