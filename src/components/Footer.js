import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
      {/* <p>Copyright &copy; 2023</p> */}
      <div className='footer_credit'>
        <p>Developed by <a href="https://kalebsday.netlify.app/" className='author'>Kaleb Day</a></p>
      </div>
      <Link to="/about" className='footer-link'>About</Link>
    </footer>
  )
}
export default Footer