import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import '../styles/ProjectDetail.css'

const services = [
  {
    title: 'Եվրոպական պատուհանների տեղադրում',
    description:
      'Մենք առաջարկում ենք եվրոպական ստանդարտներին համապատասխան պատուհանների տեղադրում՝ ապահովելով ջերմա- և ձայնամեկուսացում։ Մեր փորձառու մասնագետները կիրառում են որակյալ նյութեր՝ ապահովելով երկարատև ծառայություն։',
    slug: 'euro-windows',
    image: '/images/euro-windows.jpg',
  },
  {
    title: 'Գիպսակարդոնի աշխատանքներ',
    description:
      'Տրամադրում ենք գիպսակարդոնի տեղադրման և ձևավորման ծառայություններ՝ ներառյալ առաստաղներ, պատեր և դիզայն։ Օգտագործում ենք կրակադիմացկուն և խոնավակայուն գիպսակարդոն՝ հարմարեցված ձեր տարածքին։',
    slug: 'drywall-installation',
    image: '/images/drywall-installation.jpg',
  },
  {
    title: 'Սալիկապատում',
    description:
      'Մեր մասնագետները կատարում են բարձր որակով սալիկապատման աշխատանքներ՝ խոհանոց, լոգասենյակ, հատակ և այլն։ Աշխատանքն իրականացվում է ճշգրիտ չափագրությամբ և գեղագիտական մոտեցմամբ։',
    slug: 'tiling-services',
    image: '/images/tiling-services.jpg',
  },
  {
    title: 'Լամինատի տեղադրում',
    description:
      'Պրոֆեսիոնալ լամինատի տեղադրում՝ մաքուր, արագ և որակով։ Օգտագործվում են խոնավակայուն և ձայնամեկուսիչ հիմքով լամինատներ՝ երկարաժամկետ արդյունքի համար։',
    slug: 'laminate-installation',
    image: '/images/laminate-installation.jpg',
  },
  {
    title: 'Պատերի հարդարում',
    description:
      'Պատերի հարթեցում, ներկում, դեկորատիվ լուծումներ՝ ըստ ձեր նախասիրությունների։ Մեր դիզայներները կօգնեն ընտրել լավագույն գույները և մակերևութային ձևավորումները։',
    slug: 'wall-finishing',
    image: '/images/wall-finishing.jpg',
  },
  {
    title: 'Դարբնու աշխատանքներ',
    description:
      'Կատարում ենք դարպասների, ցանկապատերի, մետաղական դեկորատիվ տարրերի պատրաստում և տեղադրում։ Աշխատանքները իրականացվում են բացառիկ ճշգրտությամբ և ստեղծագործ մոտեցմամբ։',
    slug: 'metalwork',
    image: '/images/metalwork.jpg',
  },
  {
    title: 'Զոդում (սվառկա)',
    description:
      'Մատակարարում ենք մետաղական կառուցվածքների ամրացման, վերանորոգման և պատրաստման ծառայություններ՝ օգտագործելով սվառկայի տարբեր տեխնոլոգիաներ։ Հիմնվում ենք ամրության և անվտանգության վրա։',
    slug: 'welding',
    image: '/images/welding.jpg',
  },
  {
    title: 'Սանտեղնիկ աշխատանքներ',
    description:
      'Տրամադրում ենք ջրամատակարարման, ջրահեռացման և կոյուղու համակարգերի տեղադրում, նորոգում և սպասարկում։ Աշխատանքներն իրականացվում են բարձր ճշգրտությամբ և որակով։',
    slug: 'plumbing',
    image: '/images/plumbing.jpg',
  },
]

const ProjectDetail = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [showFull, setShowFull] = useState(false)

  const project = services.find((item) => item.slug === slug)

  if (!project) {
    return (
      <div className="project-detail">
        <h2>Ծառայությունը չի գտնվել</h2>
        <button onClick={() => navigate(-1)}>Վերադառնալ</button>
      </div>
    )
  }

  const shortDescription = project.description.slice(0, 100)
  const isLong = project.description.length > 100

  return (
    <div className="project-detail">
      <div className="breadcrumb">
        <span onClick={() => navigate('/')}>🏠 Գլխավոր</span>
        <span className="breadcrumb-separator">›</span>
        <span onClick={() => navigate('/#services')}>Ծառայություններ</span>
        <span className="breadcrumb-separator">›</span>
        <span className="current">{project.title}</span>
      </div>

      <div className="mobile-back">
        <button onClick={() => navigate(-1)}>← Վերադառնալ</button>
      </div>

      <h2>{project.title}</h2>

      <img
        src={project.image}
        alt={project.title}
        className="project-detail-image"
      />

      <p className="project-description">
        {showFull || !isLong
          ? project.description
          : `${shortDescription}...`}
      </p>

      {isLong && (
        <button
          className="toggle-description"
          onClick={() => setShowFull(!showFull)}
        >
          {showFull ? 'Փակել' : 'Ավելին'}
        </button>
      )}

      <button className="desktop-back" onClick={() => navigate(-1)}>
        Վերադառնալ
      </button>
    </div>
  )
}

export default ProjectDetail
