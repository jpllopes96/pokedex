import {FiGithub, FiLinkedin} from 'react-icons/fi'
import './header.css'
import { Link } from 'react-router-dom'

export default function Header(){
    return(
        <div className="containerHeader">
            <div className='logo'>
                <Link to='/'><img src="https://user-images.githubusercontent.com/54673205/169507707-07bcd3d1-5f62-4e1d-9e5f-d700ede5a5ec.png" />Pokemon</Link>
                
            </div>
            <ul>
                <li>
                    <a href='https://www.github.com' target='blank'><FiGithub size={30} color="#FFF" /></a>
                </li>
                <li>
                    <a href='https://www.github.com' target='blank'><FiLinkedin size={30} color="#FFF" /></a>
                </li>
            </ul>
            
        </div>
    )
}