import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DynamicForm from './DynamicForm';
function User(props: any) {
    const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');
    // const [age, setAge] = useState('');
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
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            {props.user._id && <DynamicForm id={props.user._id} />}

        </div>
    );
}

export default User;