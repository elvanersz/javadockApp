import { useTranslation } from "react-i18next";
import {Link} from "react-router-dom";
import logo from "../../assets/javadock-icon.png";

export function NavBar() {
    const { t } = useTranslation();

    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img src={logo} width={80}/>
                </Link>
                <ul className="navbar-nav">
                    <li className="navbar-nav-item">
                        <Link className="nav-link" to="singup">{t('singUp')}</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}