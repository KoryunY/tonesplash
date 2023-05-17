import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import User from './User';

function Login() {
    const [username, setUsername] = useState('');
    const [data, setData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const formData = { name: token };
            fetch(process.env.REACT_APP_URL + '/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
                .then(response => response.json())
                .then(data => {
                    if (data) {
                        setData(data);
                    }
                })
                .catch(error => console.error(error));
        }
    }, []);

    const handleLogin = async (event: any) => {
        event.preventDefault();

        const formData = { name: username };

        try {
            const response = await fetch(process.env.REACT_APP_URL + '/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (data) {
                setData(data);
                localStorage.setItem('token', username);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setData(null);
        setUsername('');
    };

    return (
        <div>
            {!data && (
                <form onSubmit={handleLogin}>
                    <label>
                        Username:
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={{
                                backgroundColor: '#f5d3d4'
                            }}
                        />
                    </label>
                    <button type="submit" style={{ color: '#593353', backgroundColor: '#c0a4fb', borderRadius: '40px', marginLeft: '10px' }}>Login</button>
                    <button onClick={() => navigate('/register')} style={{ color: '#593353', backgroundColor: '#c0a4fb', borderRadius: '40px', marginLeft: '5px' }}>Register</button>
                </form>
            )}
            {data && (
                <div>
                    <button onClick={handleLogout} style={{ color: '#593353', backgroundColor: '#c0a4fb', borderRadius: '40px', marginTop: '10px', width: 200, fontWeight: "bold" }} className="disableCaret">Logout</button>
                    <User user={data} />
                </div>
            )}
        </div>
    );
}

export default Login;
