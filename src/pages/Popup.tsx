import React, { useEffect, useState } from 'react';
import * as jsonData from './data.json';
import './popupStyles.css'
interface PopupProps {
    onClose: () => void;
}

interface Data {
    [key: string]: {
        [key: string]: string;
    };
}

const Popup: React.FC<PopupProps> = ({ onClose }) => {
    const [data, setData] = useState<Data | null>(null);

    useEffect(() => {
        setData(jsonData);
    }, []);

    if (!data) {
        return <div>Loading...</div>;
    }

    const getDescription = (key: string) => {
        switch (key) {
            case 'genres':
                return 'Genres represent different musical genres.';
            case 'tempos':
                return 'Tempos represent different tempo markings in music.';
            case 'energys':
                return 'Energys represent different energy levels in music.';
            case 'instruments':
                return 'Instruments represent different musical instruments.';
            case 'sentiments':
                return 'Sentiments represent different emotional states.';
            default:
                return '';
        }
    };

    const generateTable = () => {
        const tableData = Object.keys(data).reduce((result, category) => {
            const values = Object.keys(data[category]).map((key) => data[category][key]);
            result[category] = values.join('|');
            return result;
        }, {} as { [key: string]: string });

        return (
            <div className="table-wrapper">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Genres</th>
                            <th>Tempos</th>
                            <th>Energys</th>
                            <th>Instruments</th>
                            <th>Sentiments</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{tableData['genres']}</td>
                            <td>{tableData['tempos']}</td>
                            <td>{tableData['energys']}</td>
                            <td>{tableData['instruments']}</td>
                            <td>{tableData['sentiments']}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div className="popup">
            {generateTable()}
            <div className="table-wrapper">
                <table className="description-table">
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>genre</td>
                            <td>{getDescription('genres')}</td>
                        </tr>
                        <tr>
                            <td>tempos</td>
                            <td>{getDescription('tempos')}</td>
                        </tr>
                        <tr>
                            <td>energys</td>
                            <td>{getDescription('energys')}</td>
                        </tr>
                        <tr>
                            <td>instruments</td>
                            <td>{getDescription('instruments')}</td>
                        </tr>
                        <tr>
                            <td>sentiments</td>
                            <td>{getDescription('sentiments')}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default Popup;
