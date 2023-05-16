import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Configs from './Configs';
import Data from './Data';
import DynamicForm from './DynamicForm';
import './listStyles.css'
function User(props: any) {
    const [selectedItem, setSelectedItem] = useState('');

    const renderPage = () => {
        switch (selectedItem) {
            case 'DynamicForm':
                return <DynamicForm id={props.user._id} />;
            case 'Configs':
                return <Configs id={props.user._id} />;
            case 'Data':
                return <Data id={props.user._id} />;
            default:
                return null;
        }
    };

    return (
        <div className='disableCaret'>
            <ul>
                <li onClick={() => setSelectedItem('DynamicForm')}>Generate Colors</li>
                <li onClick={() => setSelectedItem('Configs')}>Create Configs</li>
                <li onClick={() => setSelectedItem('Data')}>User Info</li>
            </ul>
            {renderPage()}
        </div>
    );
}

export default User;
