import React from 'react';
import UserPreview from '../userPreview/UserPreview';
import user from '../../assets/user.png'; // Importação de imagem mantida, presumindo que está corretamente configurada.

interface Request {
    id: string;
    user: {
        idUsers: string;
        username: string;
        firstName: string;
        lastName: string;
        email: string;
        role: string;
    }[];
}

interface Props {
    singleRequest: Request;
    handleFinishAction: (request: Request) => void;
    editedRequest: Request;
}

const FinishRequest: React.FC<Props> = ({ singleRequest, handleFinishAction, editedRequest }) => (
    <>
        <div className="userPreview">

            <div className="password-update-modal">
                <h5>Deseja finalizar a request com o ID:</h5>
                <p>{singleRequest.id}</p>
            </div>

            <UserPreview
                user={singleRequest.user}
            />
            <div className="btnSave">
                <button onClick={() => handleFinishAction(editedRequest)}>Finish!</button>
            </div>
        </div>
    </>
);

export default FinishRequest;
