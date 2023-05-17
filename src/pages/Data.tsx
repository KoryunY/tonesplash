import React, { useEffect, useState } from 'react';

function Data(props: any) {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/users?id=' + props.id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    setData(data.configs); // Use "data.configs" instead of "data" to set the state
                }
            })
            .catch(error => console.error(error));
    }, [props.id]);

    const handleEdit = (configId: any, newValue: any) => {
        // Handle edit logic
    };

    const handleSave = (configId: any) => {
        // Handle save logic
    };

    const handleDelete = (configId: any) => {
        // Handle delete logic
    };

    const renderTree = () => {
        return data.map((config: any) => (
            <div key={config._id}>
                <span>{config.name}</span>
                <input type="text" value={config.value} onChange={(e) => handleEdit(config._id, e.target.value)} />
                <button onClick={() => handleSave(config._id)}>Save</button>
                <button onClick={() => handleDelete(config._id)}>Delete</button>
            </div>
        ));
    };

    return (
        <div className="flex-container">
            {renderTree()}
        </div>
    );
}

export default Data;