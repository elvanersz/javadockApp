import {useState} from "react";
import axios from "axios";

export function SingUp() {
    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [passwordRepeat, setPasswordRepeat] = useState()
    const [apiProgress, setApiProgress] = useState(false);
    const [successMessage, setSuccasseMessage] = useState();

    const buttonDisable = () => {
        if (!username || !email || !password || password !== passwordRepeat) {
            return true
        }
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        setApiProgress(true);
        setSuccasseMessage();

        await axios.post('/api/v1/users', {
            username: username,
            email: email,
            password: password
        }).then((response) => {
            setSuccasseMessage(response.data.username + " has been successfully registered")
        }).finally(() => {
            setApiProgress(false)
        })
    }

    return (
        <div className="container">
            <div className="col-xl-8 offset-xl-2">
                <form className="card" onSubmit={onSubmit}>
                    <div className="text-center card-header">
                        <h1>Sing Up</h1>
                    </div>
                    <div className="card-body">
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input id="username"
                                   className="form-control"
                                   onChange={(event) => setUsername(event.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">E-mail</label>
                            <input id="email"
                                   className="form-control"
                                   onChange={(event) => setEmail(event.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input id="password"
                                   type="password"
                                   className="form-control"
                                   onChange={(event) => setPassword(event.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="passwordRepeat" className="form-label">Password Repeat</label>
                            <input id="passwordRepeat"
                                   type="password"
                                   className="form-control"
                                   onChange={(event) => setPasswordRepeat(event.target.value)}/>
                        </div>

                        {successMessage && <div className="alert alert-success">
                            {successMessage}
                        </div>}

                        <div className="text-center">
                            <button className="btn btn-primary"
                                    disabled={buttonDisable() || apiProgress}>
                                    {apiProgress && <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>}
                                Sing Up
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}