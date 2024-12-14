import * as React from 'react';
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import logo from "@/assets/javadock-icon.png";
import {LanguageSelector} from "@/shared/Components/LanguageSelector.jsx";
import {useAuthDispatch, useAuthState} from "@/shared/State/context.jsx";
import {useNavigate} from "react-router-dom";
import {
    Box,
    IconButton,
    Typography,
    Menu,
    Avatar,
    Tooltip,
    MenuItem,
    Button,
} from '@mui/material';


export function NavBar() {
    const {t} = useTranslation();
    const authState = useAuthState();
    const dispatch = useAuthDispatch();
    const navigate = useNavigate();
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const onClickLogout = () => {
        dispatch({type: "logout-success"})
    }

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };


    return (
        <nav className="navbar navbar-expand-lg p-0">
            <div className="container-fluid" style={{backgroundColor: "#F8F6F4"}}>
                <Link className="navbar-brand" to="/">
                    <img src={logo} width={80}/>
                </Link>
                <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
                    {authState.id > 1 && (
                        <Tooltip title={t("posts")}>
                        <Button
                            component={Link}
                            to="posts"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textTransform: 'none',
                                color: 'black',
                                backgroundColor: 'transparent',
                                '&:hover': { backgroundColor: 'rgba(128, 128, 128, 0.1)' },
                                mx: 1,
                            }}
                        >
                            <Typography variant="h6" fontWeight="bold">
                                {t("posts")}
                            </Typography>
                        </Button>
                        </Tooltip>
                    )}
                    {authState.id === 0 && (
                        <Tooltip title={t("posts")}>
                        <Button
                            component={Link}
                            to="login"
                            sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textTransform: 'none',
                            color: 'black',
                            backgroundColor: 'transparent',
                            '&:hover': { backgroundColor: 'rgba(128, 128, 128, 0.1)' },
                            mx: 1,
                            }}
                        >
                            <Typography variant="h6" fontWeight="bold">
                                {t("posts")}
                            </Typography>
                        </Button>
                        </Tooltip>
                    )}
                </Box>
                <Box sx={{ flexGrow: 0, mr: 'auto', display: 'flex', alignItems: 'center' }}>
                    {authState.id > 1 && (
                        <Tooltip title={t("users")}>
                        <Button
                            component={Link}
                            to="users"
                            sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textTransform: 'none',
                            color: 'black',
                            backgroundColor: 'transparent',
                            '&:hover': { backgroundColor: 'rgba(128, 128, 128, 0.1)' },
                            mx: 1,
                            }}
                        >
                            <Typography variant="h6" fontWeight="bold">
                                {t("users")}
                            </Typography>
                        </Button>
                        </Tooltip>
                    )}
                    {authState.id === 0 && (
                        <Tooltip title={t("users")}>
                        <Button
                            component={Link}
                            to="login"
                            sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textTransform: 'none',
                            color: 'black',
                            backgroundColor: 'transparent',
                            '&:hover': { backgroundColor: 'rgba(128, 128, 128, 0.1)' },
                            mx: 1,
                            }}
                        >
                            <Typography variant="h6" fontWeight="bold">
                                {t("users")}
                            </Typography>
                        </Button>
                        </Tooltip>
                    )}
                </Box>
                {authState.id === 0 && (
                    <Box sx={{ flexGrow: 0, ml: 'auto' }}>
                        <Tooltip title={t("login")}>
                        <Button
                            component={Link}
                            to="login"
                            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textTransform: 'none', color: 'black' }}
                        >
                            <Typography variant="h6" fontWeight="bold">
                                {t("login")}
                            </Typography>
                        </Button>
                        </Tooltip>
                    </Box>
                    )}
                {authState.id > 0 &&
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="User Avatar" src={authState.image} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem onClick={() => {
                                handleCloseUserMenu();
                                navigate(`/users/${authState.id}`);
                            }}>
                                <Typography sx={{ textAlign: 'center' }}>{t("myProfile")}</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => {
                                handleCloseUserMenu();
                                onClickLogout();
                                setTimeout(() => {
                                    navigate('login')
                                }, 1000)
                            }}>
                                <Typography sx={{ textAlign: 'center' }}>{t("logout")}</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                }
                <ul className="navbar-nav">
                    <li className="navbar-nav-item mb-2" style={{ marginLeft: '10px', marginTop: '5px' }}>
                        <LanguageSelector/>
                    </li>
                </ul>
            </div>
        </nav>
    )
}