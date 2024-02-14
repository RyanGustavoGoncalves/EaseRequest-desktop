import React from 'react';
import UserPreview from '../userPreview/UserPreview';

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
    handleDeleteAction: (request: Request) => void;
    editedRequest: Request;
    role: string;
}

const DeleteRequestConfirmation: React.FC<Props> = ({ singleRequest, handleDeleteAction, editedRequest, role }) => {
    return (
        <div className="userPreview">
            <div className="password-update-modal">
                <h5>Deseja deletar a request com o ID:</h5>
                <p>{singleRequest.id}</p>
            </div>
            {role === "ADMIN" && (
                <>
                    <UserPreview
                        user={singleRequest.user}
                    />
                </>
            )}

            <div className="btnSave">
                <button className="deleteBtn" onClick={() => handleDeleteAction(editedRequest)}>Delete!</button>
            </div>
        </div>
    );
};

export default DeleteRequestConfirmation;
