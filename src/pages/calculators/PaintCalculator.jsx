import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import paintCalculatorApi from "../../api/paintCalculator";
import "../../styles/PaintCalculator.css";
import html2canvas from 'html2canvas';

const PaintCalculator = () => {
  const { user } = useSelector((state) => state.auth); // ստանում ենք օգտատիրոջ ID-ն
  const resultRef = useRef();



  console.log("👉 user from Redux:", user); // ✅ Այստեղ ստուգում ենք user-ը

  const [roomData, setRoomData] = useState({
    length: "",
    width: "",
    height: "",
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

    console.log("📦 Submitted room data:", roomData);

    if (!user?.uid) {
      console.warn("⚠️ User not logged in or uid missing");
      setError("Մուտք գործեք՝ օգտագործելու համար։");
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

    console.log("📤 Payload to API:", payload);

    try {
      const res = await paintCalculatorApi.post("/", payload);
      console.log("✅ Response from API:", res.data);
      setResult(res.data); // ենթադրում ենք՝ `{ paintLiters: number }`
    } catch (err) {
      console.error("❌ Error calculating paint:", err);
      setError("Չհաջողվեց հաշվարկել ներկի քանակը։");
    }
  };
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
  

  return (
    <div className="paint-calculator">
      <h2>Ներկի Հաշվիչ</h2>

      <div className="paint-instructions">
        <h4>📘 Օգտագործման ուղեցույց</h4>
        <p>
          Այս գործիքը նախատեսված է ներքին տարածքներում ներկի անհրաժեշտ քանակը
          գնահատելու համար։ Խնդրում ենք մուտքագրել սենյակի ճշգրիտ չափերը՝ հաշվի
          առնելով նաև պատերի բարձրությունը։
        </p>

        <ol>
          <li>
            Մուտքագրեք սենյակի երկարությունը, լայնությունը և բարձրությունը
            մետրերով։
          </li>
          <li>
            Նշեք ներկի ծածկույթի արդյունավետությունը՝ քանի քմ տարածք է պատվում
            մեկ լիտր ներկով։
          </li>
          <li>
            Սեղմեք <strong>«Հաշվել»</strong> կոճակը՝ արդյունքները տեսնելու
            համար։
          </li>
        </ol>

        <div className="paint-example">
          <p>
            <strong>Օրինակ</strong>
          </p>
          <ul>
            <li>Երկարություն՝ 5 մ</li>
            <li>Լայնություն՝ 4 մ</li>
            <li>Բարձրություն՝ 2.8 մ</li>
            <li>Ծածկույթ՝ 11 մ²/լիտր</li>
          </ul>
          <p>
            👉 Այս պարագայում անհրաժեշտ կլինի մոտավորապես <em>5.1 լիտր</em>{" "}
            ներկ՝ պատերը ներկելու համար։
          </p>
        </div>
      </div>
      <div>
        <label htmlFor="coveragePerLiter">Ծածկույթ (մ²/լիտր):</label>
        <select
          name="coveragePerLiter"
          id="coveragePerLiter"
          value={roomData.coveragePerLiter}
          onChange={handleChange}
          required
        >
          <option value={10}>10 մ²/լիտր</option>
          <option value={11}>11 մ²/լիտր</option>
          <option value={12}>12 մ²/լիտր</option>
          <option value={13}>13 մ²/լիտր</option>
          <option value={14}>14 մ²/լիտր</option>
        </select>
        <small className="coverage-info">
          ⚠️ Ընտրեք, թե որքա՛ն մակերես է ծածկում 1 լիտր ներկը:
          <br />
          <strong>10-14 մ²/լիտր</strong> ընկածը տարածված միջին արժեքներ են՝
          կախված մակերեսի տեսակից և ներկի որակից։
        </small>
      </div>

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
        <div className="result" ref={resultRef}>
          <h3>Արդյունք</h3>
          <p>Սենյակի մակերեսը՝ {result.area} մ²</p>
          <p>Պահանջվող ներկ՝ {result.litersNeeded} լիտր</p>
          <p>Նախատեսվող աշխատանքային ժամեր՝ {result.estimatedHours} ժամ</p>
        </div>
      )}

      {result && (
        <button onClick={handleDownloadImage} className="download-btn">
          📥 Ներբեռնել որպես Նկար
        </button>
      )}

      {error && <p className="error"> {error}</p>}
    </div>
  );
};

export default PaintCalculator;
