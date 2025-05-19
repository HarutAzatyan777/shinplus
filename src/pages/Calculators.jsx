import React from 'react'
import '../styles/Calculators.css'
import { useNavigate } from 'react-router-dom'
import DarkModeToggle from '../components/DarkModeToggle'

const Calculators = () => {
  const navigate = useNavigate()

  return (
    <div className="calculators-page">
      <DarkModeToggle />
      <div className="breadcrumb">
        <span className="breadcrumb-home" onClick={() => navigate('/')}>‹ Գլխավոր</span>
        <span className="breadcrumb-current">Շինարարական հաշվիչներ</span>
      </div>

      <h2 className='hashvich-h2'>Շինարարական Հաշվիչներ</h2>
      <p className="intro-text">
        Այստեղ կարող եք արագ ու ճշգրիտ հաշվարկել տարբեր շինարարական նյութերի քանակը՝ ըստ ձեր տարածքի չափսերի։
      </p>

      <div className="calculators-list">
      
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
        <div className="calculator-card" onClick={() => navigate('/calculators/laminate')}>
          <h3>Լամինատի հաշվիչ</h3>
          <p>Հաշվեք անհրաժեշտ լամինատի քանակը՝ ըստ տարածքի։</p>
        </div>
        <div className="calculator-card" onClick={() => navigate('/calculators/electric-wires')}>
          <h3>Էլեկտրական լարերի հաշվիչ</h3>
          <p>Հաշվեք լարերի ընդհանուր երկարությունը և էլեկտրասարքերի հզորությունը՝ սենյակների համար։</p>
        </div>
        <div className="calculator-card" onClick={() => navigate('/calculators/concrete')}>
          <h3>Բետոնի ծավալի հաշվիչ</h3>
          <p>Հաշվեք, թե որքան բետոն է անհրաժեշտ հիմնակմախքի կամ հատակի համար։</p>
        </div>
      </div>
    </div>
  )
}

export default Calculators
