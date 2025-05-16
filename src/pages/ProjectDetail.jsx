import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import '../styles/ProjectDetail.css'

const services = [
  {
    title: 'Եվրոպական պատուհանների տեղադրում',
    description: 'Մենք առաջարկում ենք եվրոպական ստանդարտներին համապատասխան պատուհանների տեղադրում՝ ապահովելով ջերմա- և ձայնամեկուսացում։',
    slug: 'euro-windows',
  },
  {
    title: 'Գիպսակարդոնի աշխատանքներ',
    description: 'Տրամադրում ենք գիպսակարդոնի տեղադրման և ձևավորման ծառայություններ՝ ներառյալ առաստաղներ, պատեր և դիզայն։',
    slug: 'drywall-installation',
  },
  {
    title: 'Սալիկապատում',
    description: 'Մեր մասնագետները կատարում են բարձր որակով սալիկապատման աշխատանքներ՝ խոհանոց, լոգասենյակ, հատակ և այլն։',
    slug: 'tiling-services',
  },
  {
    title: 'Լամինատի տեղադրում',
    description: 'Պրոֆեսիոնալ լամինատի տեղադրում՝ մաքուր, արագ և որակով։',
    slug: 'laminate-installation',
  },
  {
    title: 'Պատերի հարդարում',
    description: 'Պատերի հարթեցում, ներկում, դեկորատիվ լուծումներ՝ ըստ ձեր նախասիրությունների։',
    slug: 'wall-finishing',
  },
]

const ProjectDetail = () => {
  const { slug } = useParams()
  const navigate = useNavigate()

  const project = services.find((item) => item.slug === slug)

  if (!project) {
    return (
      <div className="project-detail">
        <h2>Ծառայությունը չի գտնվել</h2>
        <button onClick={() => navigate(-1)}>Վերադառնալ</button>
      </div>
    )
  }

  return (
    <div className="project-detail">
      <h2>{project.title}</h2>
      <p>{project.description}</p>
      <button onClick={() => navigate(-1)}>Վերադառնալ</button>
    </div>
  )
}

export default ProjectDetail
