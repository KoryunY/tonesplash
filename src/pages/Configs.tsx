import React, { useEffect, useState } from 'react';
import Popup from './Popup';
import "./configStyles.css"
import "./formStyles.css"

function Configs(props: any) {
    const [configs, setConfigs] = useState([]);
    const [stateChange, setStateChange] = useState(0);
    const [showPopup, setShowPopup] = useState(false);

    const openPopup = () => {
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

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
    }, [props.id, stateChange]);

    const handleEdit = (configId: any, newValue: any, fieldName: any) => {
        const updatedConfigs: any = [...configs];
        if (fieldName === 'type') {
            updatedConfigs[configId].type = newValue;
        }
        if (fieldName === 'name') {
            updatedConfigs[configId].name = newValue;
        }
        setConfigs(updatedConfigs);
    };

    const handleSave = (configId: any) => {
        const updatedConfigs: any = [...configs];
        let requestConfig: any = {};
        requestConfig.name = updatedConfigs[configId].name;
        requestConfig.type = updatedConfigs[configId].type;
        requestConfig.colors = updatedConfigs[configId].colors;
        fetch('http://localhost:3000/config?id=' + updatedConfigs[configId]._id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestConfig)
        })
            .then(response => console.log(response))
            .catch(error => console.error(error));
    };

    const handleDelete = (configId: any) => {
        const updatedConfigs: any = [...configs];

        fetch('http://localhost:3000/config?id=' + updatedConfigs[configId]._id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => {
                if (response.ok) {
                    // Remove the deleted configuration from the updatedConfigs array
                    updatedConfigs.splice(configId, 1);
                    // Update the state with the modified array
                    setConfigs(updatedConfigs);
                } else {
                    console.error('Failed to delete configuration');
                }
            })
            .catch(error => console.error(error));
    };

    const handleColorChange = (index: any, colorIndex: any, value: any) => {
        const updatedConfigs: any = [...configs];
        updatedConfigs[index].colors[colorIndex] = value;
        setConfigs(updatedConfigs);
    };

    const handleAddColor = (configIndex: any) => {
        const updatedConfigs: any = [...configs];
        updatedConfigs[configIndex].colors.push('red'); // Default color is red
        setConfigs(updatedConfigs);
    };

    const handleDeleteColor = (configIndex: any, colorIndex: any) => {
        const updatedConfigs: any = [...configs];
        updatedConfigs[configIndex].colors.splice(colorIndex, 1);
        setConfigs(updatedConfigs);
    };

    const handleAddConfig = (name: any, type: any, colors: any) => {
        let requestConfig: any = {};
        requestConfig.name = name;
        requestConfig.type = type;
        requestConfig.colors = colors;

        fetch('http://localhost:3000/config?id=' + props.id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestConfig)
        })
            .then(response => {
                console.log(response); setStateChange(stateChange + 1);
            })
            .catch(error => console.error(error));
    };

    const renderColors = (configIndex: any) => {
        return (configs[configIndex] as any).colors.map((color: any, colorIndex: any) => (
            <div key={colorIndex}>
                <input
                    type="color"
                    value={color}
                    onChange={(e) => handleColorChange(configIndex, colorIndex, e.target.value)}
                />
                <button style={{ backgroundColor: 'red' }} onClick={() => handleDeleteColor(configIndex, colorIndex)}>x</button>
            </div>
        ));
    };

    const renderTree = () => {
        return configs.map((config: any, configIndex: any) => (
            <div key={configIndex} className="form-container">

                Text:<input type="text" value={config.name} onChange={(e) => handleEdit(configIndex, e.target.value, 'name')} />
                <br />
                Type:<input type="text" value={config.type} onChange={(e) => handleEdit(configIndex, e.target.value, 'type')} />
                <br />
                <br />
                {renderColors(configIndex)}
                <br />
                <button className="form-button" onClick={() => handleAddColor(configIndex)}>+</button>
                <br />
                <button className="form-button" onClick={() => handleSave(configIndex)}>Save</button>
                <br />
                <button className="form-button" onClick={() => handleDelete(configIndex)}>Remove</button>
            </div>
        ));
    };

    const handleAddNewConfig = () => {
        // Get values from input fields
        const name = document.getElementById('newConfigName') as HTMLInputElement;
        const type = document.getElementById('newConfigType') as HTMLInputElement;

        // Validate input values
        if (name && type && name.value && type.value) {
            const updatedConfigs: any = [...configs];
            const newConfig = {
                name: name.value,
                type: type.value,
                colors: ['red'] // Default color is red
            };
            // updatedConfigs.push(newConfig);
            // setConfigs(updatedConfigs);

            // // Clear input values
            // name.value = '';
            // type.value = '';

            // Call handleAddConfig to save the newly added config
            handleAddConfig(newConfig.name, newConfig.type, newConfig.colors);
        }
    };

    return (
        <div className="flex-container">
            <button className="form-button form-outer-button form-container" onClick={openPopup}>Defaults</button>
            {renderTree()}
            <div className="form-container">
                <input type="text" id="newConfigName" placeholder="New Config Name" />
                <input type="text" id="newConfigType" placeholder="New Config Type" />
                <br />
                <br />
                <button className="form-button" onClick={handleAddNewConfig}>Add Config</button>
            </div>
            <br />
            {showPopup && <Popup onClose={closePopup} />}
        </div>
    );
}

export default Configs;
