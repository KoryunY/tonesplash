import React, { useEffect, useState } from 'react';

function Data(props: any) {
    const [data, setData] = useState(null);
    const [audios, setAudios] = useState<any[] | null>(null);
    const [selectedAudio, setSelectedAudio] = useState<number>(-1);
    const [audio, setFile] = useState<File | null>(null);
    const [htmlContent, setHtmlContent] = useState<any>(null);

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
                    setData(data);
                    setAudios(data.audios) // Use "data.configs" instead of "data" to set the state
                }
            })
            .catch(error => console.error(error));
    }, [props.id]);

    useEffect(() => {
        if (htmlContent) {
            openNewPage()
            setHtmlContent(null);
        }
    }, [htmlContent])

    const openNewPage = () => {
        const newWindow = window.open('', '_blank');
        newWindow?.document.write(htmlContent);
        newWindow?.document.close();
    };

    const handleFileChange = (e: any) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const generateHTMLContent = (data: any, audio: any) => {
        const formData = new FormData();
        formData.append('data', JSON.stringify(data));
        formData.append('audio', audio);

        fetch('http://localhost:3000/audio/html', {
            method: 'POST',
            body: formData
        }).then(response => {
            response.text().then(html => {
                if (html) {
                    setHtmlContent(html);
                }
            });
        }).catch(err => {
            console.error(err.message);
        });
    };

    const handleAudioChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedIndex = parseInt(event.target.value);
        setSelectedAudio(selectedIndex);
        // You can access the selected config using `configs[selectedIndex]`
    };

    const handlePlay = () => {
        if (audios) {
            fetch('http://localhost:3000/audio?id=' + audios[selectedAudio], {
                method: 'GET'
            }).then(response => {
                response.json().then(val => {
                    if (val) {
                        generateHTMLContent(val.data, audio)
                    }
                })
            }).catch(err => {
                console.error(err.message)
            });
        }
    }

    const renderTree = (data: any) => {
        return (
            <div >
                <span>Name:{data?.name}</span>
                <select className="form-select" id="configs" value={selectedAudio} onChange={handleAudioChange}>
                    <option value="">Select Generated Colors</option>
                    {audios && Object.values(audios).map((audio, index) => (
                        <option key={index} value={index}>
                            {audio}
                        </option>
                    ))}
                </select>
                <div className="form-group">
                    <label>
                        Select Audio:
                        <input type="file" onChange={handleFileChange} className="form-input" />
                    </label>
                </div>
                <button className="form-button" onClick={handlePlay}>Play</button>
            </div>
        );
    };

    return (
        <div className="flex-container">
            {renderTree(data)}
        </div>
    );
}

export default Data;


