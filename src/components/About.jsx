import { useNavigate } from 'react-router-dom'
import '../styles/About.css'

const About = () => {
  const navigate = useNavigate()

  return (
    <section id="about" className="about">
      <h2>Մեր Մասին</h2>
      <p>
        <strong>ShinPlus</strong> առաջարկում է բարձրորակ շինարարական և վերանորոգման ծառայություններ՝ սկսած հիմքից մինչև վերջնական հարդարում։ Մենք միավորում ենք ժամանակակից տեխնոլոգիաները և մասնագիտական փորձը՝ ապահովելու որակյալ արդյունք։
      </p>
      <p>
        Մեր թիմն ունի տարիների փորձ, պրոֆեսիոնալ մոտեցում և կենտրոնացած է հաճախորդի պահանջների վրա։ Մենք հավատում ենք, որ յուրաքանչյուր նախագիծ՝ մեծ թե փոքր, արժանի է հատուկ ուշադրության։
      </p>
      <p>
        Ընտրեք <strong>ShinPlus</strong>, երբ առաջնահերթ են վստահությունը, որակը և պատասխանատվությունը։
      </p>
      <button className="about-cta-btn" onClick={() => navigate('/services')}>
        Տեսնել Ծառայությունները
      </button>
    </section>
  )
}

export default About
