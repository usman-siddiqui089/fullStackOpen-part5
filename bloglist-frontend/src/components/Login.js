import React from 'react'

const LoginForm = ({onSubmitHandler, usernameVal, passwordVal, onUsernameChange, onPasswordChange}) => {
    return (
        <>
            <form onSubmit={onSubmitHandler}>
                <div>
                Enter Username: 
                    <input
                    type="text"
                    value={usernameVal}
                    name="Username"
                    onChange={onUsernameChange}
                    />
                </div>
                <div>
                Enter Password: 
                    <input
                    type="password"
                    value={passwordVal}
                    name="Password"
                    onChange={onPasswordChange}
                    />
                </div>
                <button type='submit'>Login</button>
            </form>
        </>
    )
}

export default LoginForm