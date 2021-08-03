
import logo from "../codesicon.png";
import { NavLink } from "react-router-dom";  
import styled from 'styled-components'
import "../index.css";

function Navbar() {
    const NavUnlisted = styled.ul`
    .nav-container .activePage:hover::after {
        background-color: #99802d;
    }
    .nav-container .activePage::after {
        content: " ";
        display: block;
        position: absolute;
        margin-top: 2rem;
        width: 50px;
        height: 2px;
        background-color: #ffcf00;
    }
    `;
    function preventAnim() {
        alert("hola")
        setTimeout(function(){
           document.getElementById("navbarli1").classList.remove("preventDefault");
        }, 1000);
    }
    return (
        <nav className="nav-container">
            <div>
                <img src={logo} alt="" />
            </div>
            <div className="list-wrapper">
                <NavUnlisted>
                    <li onload={preventAnim}>
                        <NavLink to="/" id="navbarli1" className="preventDefault" activeClassName="activePage activePage1" exact>Memes</NavLink>
                    </li>
                    <li>
                        <NavLink to="about" activeClassName="activePage activePage2" exact>About</NavLink>
                    </li>
                    <li>
                        <a href="https://discord.gg/XpTWUy72Cq" target="_blank" rel="noreferrer">Discord</a>
                    </li>
                    <li>
                        <a href="aa">Repository</a>
                    </li>
                </NavUnlisted>
            </div>
        </nav>
    );
}

export default Navbar;
