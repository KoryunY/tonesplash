import React, { useEffect, useState } from 'react';
import Popup from '../pages/Popup';
function Configs(props: any) {
    const [configs, setConfigs] = useState([]);
    const [newColor, setNewColor] = useState('');
    const [selectedColorIndex, setSelectedColorIndex] = useState(-1);
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
    }, [props.id]);

    const handleEdit = (configId: any, newValue: any, fieldName: any) => {
        const updatedConfigs: any = [...configs];
        if (fieldName === "type") {
            updatedConfigs[configId].type = newValue;
        }
        if (fieldName === "name") {
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
        // Handle delete logic
    };

    const handleColorChange = (index: any, colorIndex: any, value: any) => {
        const updatedConfigs: any = [...configs];
        updatedConfigs[index].colors[colorIndex] = value;
        setConfigs(updatedConfigs);
    };

    const handleAddConfig = (name: any, type: any, colors: any) => {
        const updatedConfigs: any = [...configs];
        let requestConfig: any = {};
        requestConfig.name = name;
        requestConfig.type = type;
        requestConfig.colors = colors;

        fetch('http://localhost:3000/config?id=' + updatedConfigs[0].user, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestConfig)
        })
            .then(response => console.log(response))
            .catch(error => console.error(error));
    };

    const handleDeleteColor = (configIndex: any, colorIndex: any) => {
        const updatedConfigs: any = [...configs];
        updatedConfigs[configIndex].colors.splice(colorIndex, 1);
        setConfigs(updatedConfigs);
    };

    const renderColors = (configIndex: any) => {
        return (configs[configIndex] as any).colors.map((color: any, colorIndex: any) => (
            <div key={colorIndex}>
                <input
                    type="color"
                    value={color}
                    onChange={(e) => handleColorChange(configIndex, colorIndex, e.target.value)}
                />
                <button onClick={() => handleDeleteColor(configIndex, colorIndex)}>x</button>
            </div>
        ));
    };

    const renderTree = () => {
        return configs.map((config: any, configIndex: any) => (
            <div key={configIndex}>
                <input type="text" value={config.name} onChange={(e) => handleEdit(configIndex, e.target.value, "name")} />
                <input type="text" value={config.type} onChange={(e) => handleEdit(configIndex, e.target.value, "type")} />
                {renderColors(configIndex)}
                <button onClick={() => handleSave(configIndex)}>Save</button>
                {/* <button onClick={() => setSelectedColorIndex(configIndex)}>+</button> */}
                {/* <input
                    type="color"
                    value={newColor}
                    onChange={(e) => setNewColor(e.target.value)}
                    style={{ display: selectedColorIndex === configIndex ? 'block' : 'none' }}
                /> */}
            </div>
        ));
    };

    return (
        <div className="flex-container">
            {renderTree()}
            <button onClick={openPopup}>Defaults</button>
            {showPopup && <Popup onClose={closePopup} />}
        </div>
    );
}

export default Configs;
