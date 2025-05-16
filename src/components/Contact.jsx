import '../styles/Contact.css'

const Contact = () => (
  <section id="contact" className="contact">
    <h2>Կապ մեզ հետ</h2>
    <form className="contact-form">
      <input type="text" placeholder="Անուն" required />
      <input type="email" placeholder="Էլ․ հասցե" required />
      <textarea placeholder="Հաղորդագրություն" required></textarea>
      <button type="submit">Ուղարկել</button>
    </form>
  </section>
)

export default Contact
