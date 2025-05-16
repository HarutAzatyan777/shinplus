import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Services.css' // assuming you have styles

const services = [
  {
    title: 'Եվրոպական պատուհանների տեղադրում',
    description: 'Մասնագիտացված տեղադրում՝ ջերմամեկուսիչ նյութերով։',
    slug: 'euro-windows',
    image: '/images/euro-windows.jpg',
  },
  {
    title: 'Գիպսակարդոնի աշխատանքներ',
    description: 'Խոնավության դիմացկուն և կրակադիմացկուն լուծումներ։',
    slug: 'drywall-installation',
    image: '/images/drywall-installation.jpg',
  },
  {
    title: 'Սալիկապատում',
    description: 'Բարձր որակի կերամիկա, խոհանոց, լոգասենյակ և այլն։',
    slug: 'tiling-services',
    image: '/images/tiling-services.jpg',
  },
  {
    title: 'Լամինատի տեղադրում',
    description: 'Ձայնամեկուսիչ հիմքով, խոնավության դիմացկուն լամինատ։',
    slug: 'laminate-installation',
    image: '/images/laminate-installation.jpg',
  },
  {
    title: 'Պատերի հարդարում',
    description: 'Հարթեցում, ներկում և դեկորատիվ շերտեր՝ ցանկացած դիզայնով։',
    slug: 'wall-finishing',
    image: '/images/wall-finishing.jpg',
  },
]

const Services = () => {
  const navigate = useNavigate()
  const [modalProject, setModalProject] = useState(null)

  const openModal = (project) => {
    setModalProject(project)
  }

  const closeModal = () => {
    setModalProject(null)
  }

  return (
    <div className="services" id="services">
      <h2>Մեր Ծառայությունները</h2>
      <div className="projects-grid">
        {services.map((service, index) => (
          <div key={index} className="project-card">
            <img
              src={service.image}
              alt={service.title}
              className="project-image"
            />
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <div className="buttons">
              <button onClick={() => openModal(service)}>Մանրամասներ (մոդալ)</button>
              <button onClick={() => navigate(`/project/${service.slug}`)}>
                Մանրամասներ (էջ)
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalProject && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <img
              src={modalProject.image}
              alt={modalProject.title}
              className="modal-image"
            />
            <h2>{modalProject.title}</h2>
            <p>{modalProject.description}</p>
            <button onClick={closeModal}>Փակել</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Services
