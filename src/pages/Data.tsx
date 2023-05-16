import React from 'react';
import { useNavigate } from 'react-router-dom';
function Configs(props: any) {
    const navigate = useNavigate();

    return (
        <div className="flex-container">
            <div>
                <h1>Tranforming music into stunning visual displays of color</h1>
                <p>This sound color generator is an innovative ...............................</p>
                <button onClick={() => navigate("/login")}>Proceed</button>
            </div>
        </div>
    );
}

export default Configs;