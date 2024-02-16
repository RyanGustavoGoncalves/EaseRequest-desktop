/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { GenerateExcelFile } from '../../../home/components/utils/generateExcelFile/GenerateExcelFile';
import ButtonGenerate from './components/buttonGenerate/ButtonGenerate';

const RequestSettings: React.FC = () => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const [fileUrl, setFileUrl] = useState<string>('');
    const [isDownloadButtonDisabled, setDownloadButtonDisabled] = useState<boolean>(true);
    const [isDownloadAllButtonDisabled, setDownloadAllButtonDisabled] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingAll, setLoadingAll] = useState<boolean>(false);

    const handleGenerateClick = async (allUsers = false): Promise<void> => {
        allUsers ? setLoadingAll(true) : setLoading(true);
        try {
            allUsers ? setDownloadButtonDisabled(true) : setDownloadAllButtonDisabled(true);
            await GenerateExcelFile({ allUsers, token, setFileUrl });
            allUsers ? setDownloadAllButtonDisabled(false) : setDownloadButtonDisabled(false);
        } finally {
            allUsers ? setLoadingAll(false) : setLoading(false);
        }
    };

    const handleDownloadClick = (value: boolean): void => {
        if (fileUrl) {
            const a = document.createElement('a');
            a.href = fileUrl;
            a.download = 'requests.xlsx'; // Nome do arquivo desejado
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            // Desativa o botão após o download ser concluído
            value ? setDownloadAllButtonDisabled(true) : setDownloadButtonDisabled(true);
        }
    };

    return (
        <article className="article-settings-content">
            <h1>Request Configurations</h1>

            <div className="excel-file-generator">
                <h3>Generate excel file</h3>
                <span>When you click on the button, an excel file will be generated with all your requests!</span>

                <ButtonGenerate
                    loading={loading}
                    handleGenerateClick={() => handleGenerateClick(false)}
                    buttonText="Generate!"
                />

                <div className={isDownloadButtonDisabled ? 'desactiveBtn' : 'downloadBtn'}>
                    <button onClick={() => handleDownloadClick(false)} disabled={isDownloadButtonDisabled}>
                        Download Excel
                    </button>
                </div>
            </div>
            {role === 'ADMIN' && (
                <>
                    <hr />

                    <div className="excel-file-generator">
                        <h3>Generate excel file from all users</h3>
                        <span>When you click on the button, an excel file will be generated with the requests from all users!</span>

                        <ButtonGenerate
                            loading={loadingAll}
                            handleGenerateClick={() => handleGenerateClick(true)}
                            buttonText="Generate!"
                        />
                        <div className={isDownloadAllButtonDisabled ? 'desactiveBtn' : 'downloadBtn'}>
                            <button onClick={() => handleDownloadClick(true)} disabled={isDownloadAllButtonDisabled}>
                                Download Excel
                            </button>
                        </div>
                    </div>
                </>
            )}
        </article>
    );
};

export default RequestSettings;
