import React, { useEffect, useState } from 'react';

function Configs2(props: any) {
    const [configs, setConfigs] = useState([]);
    const [newColor, setNewColor] = useState('');
    const [selectedColorIndex, setSelectedColorIndex] = useState(-1);

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

    const handleColorChange = (index: any, value: any) => {
        const updatedConfigs: any = [...configs];
        updatedConfigs[index].colors = value;
        setConfigs(updatedConfigs);
    };

    const handleAddColor = () => {
        const updatedConfigs: any = [...configs];
        updatedConfigs[selectedColorIndex].colors.push(newColor);
        setConfigs(updatedConfigs);
        setNewColor('');
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
                    onChange={(e) => handleColorChange(configIndex, e.target.value)}
                />
                <button onClick={() => handleDeleteColor(configIndex, colorIndex)}>x</button>
            </div>
        ));
    };

    const renderTree = () => {
        return configs.map((config: any, configIndex: any) => (
            <div key={config._id}>
                <span>{config.name}</span>
                {renderColors(configIndex)}
                <button onClick={() => setSelectedColorIndex(configIndex)}>+</button>
                <input
                    type="color"
                    value={newColor}
                    onChange={(e) => setNewColor(e.target.value)}
                    style={{ display: selectedColorIndex === configIndex ? 'block' : 'none' }}
                />
                <button onClick={handleAddColor} style={{ display: selectedColorIndex === configIndex ? 'block' : 'none' }}>Add</button>
            </div>
        ));
    };

    return (
        <div className="flex-container">
            {renderTree()}
        </div>
    );
}

export default Configs2;
