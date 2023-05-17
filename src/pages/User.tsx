import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Configs from './Configs';
import Configs2 from './Configs2';
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
                return <Configs2 id={props.user._id} />;
            case 'Data':
                return <Data id={props.user._id} />;
            default:
                return null;
        }
    };

    return (
        <div className='disableCaret'>
            <ul>
                <li onClick={() => setSelectedItem('DynamicForm')} style={{ color: '#593353', borderRadius: '40px', marginTop: '10px', width: 200 }} className={selectedItem === 'DynamicForm' ? 'selected' : ''}>Colors</li>
                <li onClick={() => setSelectedItem('Configs')} style={{ color: '#593353', borderRadius: '40px', marginTop: '10px', width: 200 }} className={selectedItem === 'Configs' ? 'selected' : ''}>Configs</li>
                <li onClick={() => setSelectedItem('Data')} style={{ color: '#593353', borderRadius: '40px', marginTop: '10px', width: 200 }} className={selectedItem === 'Data' ? 'selected' : ''}>Info</li>
            </ul>
            {renderPage()}
        </div>
    );
}

export default User;
