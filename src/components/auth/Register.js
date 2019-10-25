import React, { useRef } from "react"
import { withRouter } from "react-router-dom"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"

const Register = props => {
    // Dom refs
    const username = useRef()
    const password = useRef()
    const verifyPassword = useRef()
    const firstName = useRef()
    const lastName = useRef()
    const email = useRef()
    const company_name = useRef()
    const phone = useRef()
    const city = useRef()
    const bio = useRef()

    const { register } = useSimpleAuth()

    //Post new user
    const handleRegister = e => {
        e.preventDefault()

        const newUser = {
            username: username.current.value,
            password: password.current.value,
            first_name: firstName.current.value,
            last_name: lastName.current.value,
            email: email.current.value,
            company_name: company_name.current.value,
            phone: phone.current.value,
            city: city.current.value,
            bio: bio.current.value
        }

        register(newUser).then(() => {
            props.history.push({
                pathname: "/"
            })
        })
    }

    return (
        <>
            {/* <h1>register form</h1>
            <input ref={username} type="text" placeholder="username" />
            <input ref={password} type="password" placeholder="password" />
            <input ref={firstName} type="text" placeholder="first name" />
            <input ref={lastName} type="text" placeholder="last name" />
            <input ref={email} type="text" placeholder="email" />
            <input ref={company_name} type="text" placeholder="company_name" />
            <input ref={phone} type="text" placeholder="phone number" />
            <input ref={city} type="text" placeholder="city" />
            <input ref={bio} type="text" placeholder="bio" />
            <button onClick={handleRegister}>Register</button> */}

            <form className="form--login" onSubmit={handleRegister}>
                <h1>
                    Register to use KTER
                </h1>
                <fieldset>
                    <label htmlFor="username"> Username </label>
                    <input
                        ref={username}
                        type="text"
                        name="username"
                        className="form-control"
                        placeholder="Username"
                        required
                        autoFocus
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="firstName"> First Name </label>
                    <input
                        ref={firstName}
                        type="text"
                        name="firstName"
                        className="form-control"
                        placeholder="First name"
                        required
                        autoFocus
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="lastName"> Last Name </label>
                    <input
                        ref={lastName}
                        type="text"
                        name="lastName"
                        className="form-control"
                        placeholder="Last name"
                        required
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input
                        ref={email}
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Email address"
                        required
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="company_name"> Company Name </label>
                    <input
                        ref={company_name}
                        type="text"
                        name="company_name"
                        className="form-control"
                        required
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="phone"> Phone Number </label>
                    <input
                        ref={phone}
                        type="text"
                        name="phone"
                        className="form-control"
                        required
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="city"> Current City </label>
                    <input
                        ref={city}
                        type="text"
                        name="city"
                        className="form-control"
                        required
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="password"> Password </label>
                    <input
                        ref={password}
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Password"
                        required
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="verifyPassword"> Verify Password </label>
                    <input
                        ref={verifyPassword}
                        type="password"
                        name="verifyPassword"
                        className="form-control"
                        placeholder="Verify password"
                        required
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="bio"> Bio </label>
                    <input
                        ref={bio}
                        type="text"
                        name="bio"
                        className="form-control"
                        placeholder="Bio"
                        required
                    />
                </fieldset>
                <fieldset>
                    <button type="submit">Create Account</button>
                </fieldset>
            </form>
        </>
    )
}
export default withRouter(Register)
