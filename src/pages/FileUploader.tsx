import React, { useState } from 'react';

const FileUploader: React.FC = () => {
    const [fileData, setFileData] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const fileContent = e.target?.result as string;
                setFileData(fileContent);
            };

            reader.readAsText(file);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            {fileData && <pre>{fileData}</pre>}
        </div>
    );
};

export default FileUploader;