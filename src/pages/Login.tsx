import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import User from './User';
function Login() {
    const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');
    // const [age, setAge] = useState('');
    const [data, setData] = useState(null)

    const navigate = useNavigate();

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        const formData = { name: username };

        try {
            const response = await fetch('http://localhost:3000/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (data) {
                setData(data)
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            {!data && <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <button type="submit">Login</button>
                <button onClick={() => navigate("/register")}>Register</button>
            </form>}
            {data && <User user={data} />}
        </div>
    );
}

export default Login;