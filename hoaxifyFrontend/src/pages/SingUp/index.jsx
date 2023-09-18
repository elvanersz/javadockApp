import {useEffect, useState} from "react";
import axios from "axios";
import {Input} from "./components/Input.jsx";

export function SingUp() {
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordRepeat, setPasswordRepeat] = useState();
    const [apiProgress, setApiProgress] = useState(false);
    const [successMessage, setSuccessMessage] = useState();
    const [errors, setErrors] = useState({});
    const [generalError, setGeneralError] = useState();

    useEffect(() => {
        setErrors(function (lastErrors) {
            return {
                ...lastErrors,
                username: undefined
            }
        })
    }, [username])
    useEffect(() => {
        setErrors(function (lastErrors) {
            return {
                ...lastErrors,
                email: undefined
            }
        })
    }, [email])
    useEffect(() => {
        setErrors(function (lastErrors) {
            return {
                ...lastErrors,
                password: undefined
            }
        })
    }, [password])

    const buttonDisable = () => {
        if (!username || !email || !password || password !== passwordRepeat) {
            return true
        }
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        setApiProgress(true);
        setSuccessMessage();

        await axios.post('/api/v1/users', {
            username: username,
            email: email,
            password: password
        }).then((response) => {
            setSuccessMessage(response.data.username + " has been successfully registered")
            console.log(response.data.username)
        }).catch((error) => {
            if (error.response?.data) {
                setErrors(error.response.data.validationErrors)
                console.log(error.response)
            } else {
                setGeneralError("Unexpected error occurred, Please try again!")
            }
        }).finally(setApiProgress(false))
    }

    return (
        <div className="container">
            <div className="col-xl-8 offset-xl-2">
                <form className="card" onSubmit={onSubmit}>
                    <div className="text-center card-header">
                        <h1>Sing Up</h1>
                    </div>
                    <div className="card-body">
                        <Input id="username"
                               labelText="Username"
                               error={errors.username}
                               onChange={(event) => setUsername(event.target.value)}/>
                        <Input id="email"
                               labelText="E-mail"
                               error={errors.email}
                               onChange={(event) => setEmail(event.target.value)}/>
                        <Input id="password"
                               labelText="Password"
                               error={errors.password}
                               onChange={(event) => setPassword(event.target.value)}
                               type="password"/>
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
                        {generalError && <div className="alert alert-danger">
                            {generalError}
                        </div>}
                        <div className="text-center">
                            <button className="btn btn-primary"
                                    disabled={buttonDisable() || apiProgress}>
                                {apiProgress &&
                                    <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>}
                                Sing Up
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}