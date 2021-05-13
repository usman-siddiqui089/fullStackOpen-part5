import React, {useState} from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({loginHandler}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()
        const userCred = {
            username,
            password
        }
        loginHandler(userCred)
        setUsername('')
        setPassword('')
    }

    return (
        <>
            <form onSubmit={handleLogin}>
                <div>
                Enter Username: 
                    <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({target}) => setUsername(target.value)}
                    />
                </div>
                <div>
                Enter Password: 
                    <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({target}) => setPassword(target.value)}
                    />
                </div>
                <button type='submit'>Login</button>
            </form>
        </>
    )
}

LoginForm.propTypes = {
    loginHandler: PropTypes.func.isRequired
}

export default LoginForm