import React, { useEffect, useMemo, useState } from 'react';
import { AioOptionsDto, Config, ConvertingType, Genre, SaveAndReturnOption } from '../Dto/AioOptions.dto'
import { EnergyOptionsDto } from '../Dto/EnergyOptions.dto';
import { FrequencyOptionsDto } from '../Dto/FrequencyOptions.dto';
import { GenreOptionsDto } from '../Dto/GenreOptions.dto';
import { InstrumentOptionsDto } from '../Dto/InstrumentOptions.dto';
import { SentimentOptionsDto } from '../Dto/SentimentOptions.dto';
import { TempoOptionsDto } from '../Dto/TempoOptions.dto';
import './formStyles.css';

const DynamicForm = (props: any) => {
    const [convertingType, setConvertingType] = useState<ConvertingType>(ConvertingType.FREQUENCY);
    const [genre, setGenre] = useState<Genre | null>(null);
    const [saveAndReturnOption, setSaveAndReturnOption] = useState<SaveAndReturnOption>(SaveAndReturnOption.RETURN_DEMO);
    const [isCheckedCustomFft, setIsChecked] = useState(false);
    const [isCheckedUseIntervals, setIsCheckedUseIntervals] = useState(false);
    const [htmlContent, setHtmlContent] = useState('');
    const [file, setFile] = useState('');
    const [configs, setConfigs] = useState<any[] | null>(null);
    const [selectedConfigIndex, setSelectedConfigIndex] = useState<number>(-1);
    const [commonValues, setCommonValues] = useState({
        name: '', intervalCount: 0, user: props.id,

    });

    const handleConfigChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedIndex = parseInt(event.target.value);
        setSelectedConfigIndex(selectedIndex);
        // You can access the selected config using `configs[selectedIndex]`
    };
    useEffect(() => {
        if (!configs) {
            fetch('http://localhost:3000/users/configs?id=' + props.id, {
                method: 'GET'
            }).then(response => {
                response.json().then(val => {
                    if (val && !configs) {
                        setConfigs(val.configs);
                    }
                })
            }).catch(err => {
                console.error(err.message)
            });
        }

    }, []);

    const handleCheckboxChange = (e: any) => {
        setIsChecked(e.target.checked);
    };

    const handleFileChange = (e: any) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    useEffect(() => {
        if (htmlContent) {
            openNewPage()
            setHtmlContent('');
        }
    }, [htmlContent])

    const handleCheckboxChangeUseIntervals = (e: any) => {
        setIsCheckedUseIntervals(e.target.checked);
    };
    const handleConvertingTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setConvertingType(e.target.value as ConvertingType);
    };
    const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setGenre(e.target.value as Genre);
    };

    const handleSaveAndReturnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSaveAndReturnOption(e.target.value as SaveAndReturnOption);
    };

    const handleCommonInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCommonValues({
            ...commonValues,
            [e.target.name]: e.target.value,
        });
    };

    const openNewPage = () => {
        const newWindow = window.open('', '_blank');
        newWindow?.document.write(htmlContent);
        newWindow?.document.close();
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Get the specific form values based on the convertingType
        let specificValues;
        switch (convertingType) {
            case ConvertingType.AIO:
                specificValues = {

                    ...commonValues,
                    // Fill AioOptionsDto specific fields here
                } as AioOptionsDto;
                break;
            case ConvertingType.ENERGY:
                specificValues = {
                    ...commonValues,
                    // Fill EnergyOptionsDto specific fields here
                } as EnergyOptionsDto;
                break;
            case ConvertingType.FREQUENCY:
                specificValues = {
                    useIntervals: isCheckedUseIntervals,
                    useCustomFft: isCheckedCustomFft,
                    type: convertingType,
                    saveAndReturnOption: saveAndReturnOption,
                    ...commonValues,
                } as FrequencyOptionsDto;
                break;
            case ConvertingType.GENRE:
                specificValues = {
                    useCustomFft: isCheckedCustomFft,
                    type: convertingType,
                    saveAndReturnOption: saveAndReturnOption,
                    useIntervals: isCheckedUseIntervals,
                    genre,
                    config: configs ? configs[selectedConfigIndex]?._id : null,
                    ...commonValues,
                } as GenreOptionsDto;
                break;
            case ConvertingType.INSTRUMENT:
                specificValues = {
                    ...commonValues,
                    // Fill InstrumentOptionsDto specific fields here
                } as InstrumentOptionsDto;
                break;
            case ConvertingType.SPEECH:
                specificValues = {
                    ...commonValues,
                    // Fill SentimentOptionsDto specific fields here
                } as SentimentOptionsDto;
                break;
            case ConvertingType.TEMPO:
                specificValues = {
                    ...commonValues,
                    // Fill TempoOptionsDto specific fields here
                } as TempoOptionsDto;
                break;
            default:
                specificValues = null;
        }

        // Send the combined values to the corresponding handler
        if (specificValues) {
            handleSpecificFormSubmit(specificValues);
        }
    };

    const handleSpecificFormSubmit = async (specificValues: any) => {
        // Handle the submission for each specific form separately
        console.log(specificValues);
        console.log(convertingType);
        const formData = new FormData();
        formData.append('audio', file);
        for (const key in specificValues) {
            if (specificValues[key])
                formData.append(key, specificValues[key]);
        }

        let url;
        switch (convertingType) {
            case ConvertingType.AIO:
                url = 'http://localhost:3000/audio/aio'
                break;
            case ConvertingType.ENERGY:
                url = 'http://localhost:3000/audio/energy'
                break;
            case ConvertingType.FREQUENCY:
                url = 'http://localhost:3000/audio/frequency'
                break;
            case ConvertingType.GENRE:
                url = 'http://localhost:3000/audio/genre'
                break;
            case ConvertingType.INSTRUMENT:
                url = 'http://localhost:3000/audio/instrument'
                break;
            case ConvertingType.SPEECH:
                url = 'http://localhost:3000/audio/sentiment'
                break;
            case ConvertingType.TEMPO:
                url = 'http://localhost:3000/audio/tempo'
                break;
            default:
                url = null;
        };
        if (!url) return;
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formData
            });
            const htmlContent = await response.text();
            setHtmlContent(htmlContent);
        } catch (error) {
            console.error(error);
        }
    }
    // Render the form fields based on the selected convertingType
    let specificFormFields;
    switch (convertingType) {
        case ConvertingType.AIO:
            specificFormFields = (
                <div>
                    {/* Render AIO-specific form fields */}
                </div>
            );
            break;
        case ConvertingType.ENERGY:
            specificFormFields = (
                <div>
                    {/* Render ENERGY-specific form fields */}
                </div>
            );
            break;
        case ConvertingType.FREQUENCY:
            specificFormFields = (
                <div className="form-container">
                    <div className="form-group">
                        <label htmlFor="useIntervals">useIntervals:</label>
                        <input type="checkbox" checked={isCheckedUseIntervals} onChange={handleCheckboxChangeUseIntervals} className="input-container" />
                    </div>

                    {isCheckedUseIntervals && <div className="form-group">
                        <label htmlFor="intervalCount">IntervalCount:</label>
                        <input type="text" id="intervalCount" name="intervalCount" value={commonValues.intervalCount} onChange={handleCommonInputChange} className="input-container" />
                    </div>}
                </div>
            );
            break;
        case ConvertingType.GENRE:
            specificFormFields = (
                <div className="form-container">
                    <div className="form-group">
                        <label htmlFor="useIntervals">useIntervals:</label>
                        <input type="checkbox" checked={isCheckedUseIntervals} onChange={handleCheckboxChangeUseIntervals} />
                    </div>

                    {isCheckedUseIntervals && <div className="form-group">
                        <label htmlFor="intervalCount">IntervalCount:</label>
                        <input type="text" id="intervalCount" name="intervalCount" value={commonValues.intervalCount} onChange={handleCommonInputChange} />
                    </div>}

                    <div className="form-group">
                        <label htmlFor="genre">Genre(Optional):</label>
                        <select className="form-select" id="genre" value={genre === null ? '' : genre} onChange={handleGenreChange}>
                            <option value=''>Select Genre</option>

                            {Object.values(Genre).map((type) => (
                                <option key={type} value={type}  >
                                    {type}
                                </option>
                            ))}
                        </select>

                        <select className="form-select" id="configs" value={selectedConfigIndex} onChange={handleConfigChange}>
                            <option value="">Select Config</option>
                            {configs && Object.values(configs).map((config, index) => (
                                <option key={index} value={index}>
                                    {config.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            );
            break;
        case ConvertingType.INSTRUMENT:
            specificFormFields = (
                <div>
                    {/* Render INSTRUMENT-specific form fields */}
                </div>
            );
            break;
        case ConvertingType.SPEECH:
            specificFormFields = (
                <div>
                    {/* Render SENTIMENT-specific form fields */}
                </div>
            );
            break;
        case ConvertingType.TEMPO:
            specificFormFields = (
                <div>
                    {/* Render TEMPO-specific form fields */}
                </div>
            );
            break;
        default:
            specificFormFields = null;
    }

    return (
        <div>
            <form className="form-container" onSubmit={handleFormSubmit}>
                <div className="form-group">
                    <label htmlFor="convertingType">Converting Type:</label>
                    <select className="form-select" id="convertingType" value={convertingType} onChange={handleConvertingTypeChange}>
                        {Object.values(ConvertingType).map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={commonValues.name} onChange={handleCommonInputChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="useCustomFft">useCustomFft:</label>
                    <input type="checkbox" checked={isCheckedCustomFft} onChange={handleCheckboxChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="saveAndReturnOption">Save and Return Option:</label>
                    <select id="saveAndReturnOption" value={saveAndReturnOption} onChange={handleSaveAndReturnChange}>
                        {Object.values(SaveAndReturnOption).map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>
                        Select Audio:
                        <input type="file" onChange={handleFileChange} className="form-input" />
                    </label>
                </div>

                {specificFormFields}

                <button type="submit" className="form-button" style={{ marginTop: 10 }}>Submit</button>
            </form>
            {/* {htmlContent && <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>} */}
        </div>
    );
}

export default DynamicForm;