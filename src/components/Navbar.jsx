import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <nav className="nav-container">
            <div>
                <img src={process.env.PUBLIC_URL + "/codesicon.png"} alt="Code's Icon" />
            </div>
            <div className="list-wrapper">
                <ul>
                    <li>
                        <NavLink to="/" id="navbarli1" className="preventDefault" activeClassName="activePage activePage1" exact>
                            Memes
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="about" activeClassName="activePage activePage2" exact>
                            Sobre
                        </NavLink>
                    </li>
                    <li>
                        <a href="https://discord.gg/XpTWUy72Cq" target="_blank" rel="noreferrer">
                            Discord
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/Code-s-Moon-Development/CodesMoonMemes" target="_blank" rel="noreferrer">
                            Repositório
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
