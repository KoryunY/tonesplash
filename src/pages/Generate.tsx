import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Generate() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        const formData = { name: username };

        try {
            const response = await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <br />
            <label>
                Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <br />
            <label>
                Age:
                <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
            </label>
            <br />
            <button type="submit">Send API Request</button>
        </form>
    );
}

export default Generate;