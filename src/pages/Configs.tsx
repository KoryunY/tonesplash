import React, { useEffect, useState } from 'react';

function Configs(props: any) {
    const [configs, setConfigs] = useState([]);
    const [newConfig, setNewConfig] = useState({
        name: '',
        value: ''
    });

    useEffect(() => {
        fetch('http://localhost:3000/users/configs?id=' + props.id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    setConfigs(data.configs);
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

    const handleInputChange = (e: any) => {
        setNewConfig({
            ...newConfig,
            [e.target.name]: e.target.value
        });
    };

    const handleAdd = () => {
        // Handle add logic
    };

    const renderTree = () => {
        return configs.map((config: any) => (
            <div key={config._id}>
                {/* <span>{config.name}</span> */}
                <input type="text" value={config.name} onChange={(e) => handleEdit(config._id, e.target.value)} />
                <input type="text" value={config.type} onChange={(e) => handleEdit(config._id, e.target.value)} />
                <button onClick={() => handleSave(config._id)}>Save</button>
                <button onClick={() => handleDelete(config._id)}>Delete</button>
            </div>
        ));
    };

    return (
        <div className="flex-container">
            <div>
                <input
                    type="text"
                    name="name"
                    value={newConfig.name}
                    onChange={handleInputChange}
                    placeholder="Name"
                />
                <input
                    type="text"
                    name="value"
                    value={newConfig.value}
                    onChange={handleInputChange}
                    placeholder="Value"
                />
                <button onClick={handleAdd}>Add</button>
            </div>
            {renderTree()}
        </div>
    );
}

export default Configs;