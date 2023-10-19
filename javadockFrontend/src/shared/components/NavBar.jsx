import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import logo from "@/assets/javadock-icon.png";
import {LanguageSelector} from "@/shared/components/LanguageSelector.jsx";
import {useAuthDispatch, useAuthState} from "@/shared/state/context.jsx";

export function NavBar() {
    const {t} = useTranslation();
    const authState = useAuthState();
    const dispatch = useAuthDispatch();

    const onClickLogout = () => {
        dispatch({type: "logout-success"})
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img src={logo} width={80}/>
                    {t('home')}
                </Link>
                <ul className="navbar-nav mb-1 px-2 ms-auto">
                    <li className="navbar-nav-item">
                        <Link className="nav-link" to="users">{t('users')}</Link>
                    </li>
                </ul>
                {authState.id === 0 &&
                    <>
                        <ul className="navbar-nav mb-1 px-2 ms-auto">
                            <li className="navbar-nav-item">
                                <Link className="nav-link" to="login">{t('login')}</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav mb-1 px-2 ms-auto">
                            <li className="navbar-nav-item">
                                <Link className="nav-link" to="singup">{t('register')}</Link>
                            </li>
                        </ul>
                    </>}
                {authState.id > 0 &&
                    <>
                        <ul className="navbar-nav mb-1 px-2 ms-auto">
                            <li className="navbar-nav-item">
                                <span className="nav-link" role="button" onClick={onClickLogout}>{t("logout")}</span>
                            </li>
                        </ul>
                        <ul className="navbar-nav mb-1 px-2 ms-auto">
                            <li className="navbar-nav-item">
                                <Link className="nav-link" to={`/user/${authState.id}`}>{t("myProfile")}</Link>
                            </li>
                        </ul>
                    </>}
                <ul className="navbar-nav">
                    <li className="navbar-nav-item mb-2">
                        <LanguageSelector/>
                    </li>
                </ul>
            </div>
        </nav>
    )
}