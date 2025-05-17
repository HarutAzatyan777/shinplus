import React from 'react'
import '../styles/Calculators.css'
import { useNavigate } from 'react-router-dom'

const Calculators = () => {
  const navigate = useNavigate()

  return (
    <div className="calculators-page">
      <div className="breadcrumb">
        <span onClick={() => navigate('/')}>🏠 Գլխավոր</span>
        <span className="breadcrumb-separator">›</span>
        <span className="current">Շինարարական հաշվիչներ</span>
      </div>

      <h2>Շինարարական Հաշվիչներ</h2>
      <p className="intro-text">
        Այստեղ կարող եք արագ ու ճշգրիտ հաշվարկել տարբեր շինարարական նյութերի քանակը՝ ըստ ձեր տարածքի չափսերի։
      </p>

      <div className="calculators-list">
        <div className="calculator-card" onClick={() => navigate('/calculators/concrete')}>
          <h3>Բետոնի ծավալի հաշվիչ</h3>
          <p>Հաշվեք, թե որքան բետոն է անհրաժեշտ հիմնակմախքի կամ հատակի համար։</p>
        </div>
        <div className="calculator-card" onClick={() => navigate('/calculators/tiles')}>
          <h3>Սալիկների հաշվիչ</h3>
          <p>Հաշվեք պահանջվող սալիկների քանակը՝ ըստ մակերեսի։</p>
        </div>
        <div className="calculator-card" onClick={() => navigate('/calculators/paint')}>
          <h3>Ներկի հաշվիչ</h3>
          <p>Իմացեք՝ որքան ներկ է պետք ձեր պատերը ներկելու համար։</p>
        </div>
        <div className="calculator-card" onClick={() => navigate('/calculators/gypsum')}>
          <h3>Գիպսակարտոնի հաշվիչ</h3>
          <p>Հաշվեք գիպսակարտոնե պանելների քանակը և պռոֆիլները։</p>
        </div>
      </div>
    </div>
  )
}

export default Calculators
