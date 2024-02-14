import React from 'react';
import UserPreview from '../userPreview/UserPreview';

interface User {
    idUsers: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
}

interface Request {
    id: string;
    problem: string;
    description: string;
    priority: string;
    status: string;
    creationRequest: string;
    user: User[];
}

interface Props {
    singleRequest: Request;
    isExpanded: boolean;
    focusDescription: () => void;
    openModalUpdate: (
        id: string,
        handleSomeAction: () => void,
        setEditedRequest: React.Dispatch<React.SetStateAction<Request>>,
        singleRequest: Request,
        editedRequest: Request,
        setModalUpdateIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    ) => void;
    handleSomeAction: () => void;
    setEditedRequest: React.Dispatch<React.SetStateAction<Request>>;
    setModalUpdateIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    editedRequest: Request;
    role: string;
}

const RequestDetails: React.FC<Props> = ({
    singleRequest,
    isExpanded,
    focusDescription,
    openModalUpdate,
    handleSomeAction,
    setEditedRequest,
    setModalUpdateIsOpen,
    role
}) => {
    return (
        <div className="singleRequest">
            <div>
                <span>Request ID:</span> {singleRequest.id}
            </div>
            <div>
                <span>Problem:</span> {singleRequest.problem}
            </div>
            <div style={{ cursor: "pointer" }} onClick={focusDescription}>
                <span>Description:</span> {isExpanded ? <div className="focusDesc">{singleRequest.description}</div> : <>[EXTEND]</>}
            </div>
            {role === "ADMIN" && (
                <>
                    <div>
                        <span>Priority:</span> {singleRequest.priority}
                    </div>
                    <div>
                        <span>Status:</span> {singleRequest.status}
                    </div>
                    <div>
                        <span>Date request:</span> {singleRequest.creationRequest}
                    </div>
                    <UserPreview user={singleRequest.user} />
                </>
            )}
            <div className="btnSave">
                <button onClick={() => openModalUpdate(singleRequest.id, handleSomeAction, setEditedRequest, singleRequest, setModalUpdateIsOpen)}>Update!</button>
            </div>
        </div>
    );
};

export default RequestDetails;
