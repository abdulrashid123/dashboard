import { Link, useMatch, useResolvedPath } from "react-router-dom"
import './Navbar.css'
import { BiLogOut } from "react-icons/bi";

function Navbar() {
  return (
    <nav className="nav">
      <span style={{fontSize:"20px", cursor:"pointer"}}>&#9776;</span>
      <Link to="/" className="site-title">
        Autocount
      </Link>
      <ul id="logout">
          
         <CustomLink to="/logout"><BiLogOut size={20}/> Logout</CustomLink>
      </ul>
      
    </nav>
  )
}

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })
  
    return (
      <li className={isActive ? "active" : ""}>
        <Link to={to} {...props}>
          {children}
        </Link>
      </li>
    )
  }

export default Navbar