/* eslint-disable prettier/prettier */
// Imports of other components and libraries

import { useState, useEffect } from "react";
import wave from './assets/wave.svg';
import mais from './assets/iconMais.png';
import { closeModal, closeModalConfirm, closeModalDelete, closeModalFilter, closeModalUpdate, openModal, openModalUpdate } from "./components/utils/ModalFunctions/ModalFunctions";
import { fetchRequestsPage } from "./components/utils/fetchRequestsPagination/FetchRequestPage";
import { fetchRequests } from "./components/utils/fetchRequests/FetchRequest";
import { CreateNewRequest } from "./components/utils/createNewRequest/CreateNewRequest";
import { updateRequest } from "./components/utils/updateRequest/UpdateRequest";
import { deleteRequest } from "./components/utils/deleteRequest/DeleteRequest";
import { fetchRequestById } from "./components/utils/fetchRequestById/fetchRequestById";
import { FinishRequestAndSendEmail } from "./components/utils/finishRequest/FinishRequestAndSendEmail";
import FilterBar from "./components/subNav/FilterBar";
import ToolBox from "./components/toolBox/ToolBox";
import Pagination from "./components/pagination/Pagination";
import RequestForm from "./components/requestForm/RequestForm";
import RequestDetails from "./components/requestDetails/RequestDetails";
import UpdateRequest from "./components/updateRequest/UpdateRequest";
import FinishRequest from "./components/finishRequest/FinishRequest";
import DeleteRequestConfirmation from "./components/deleteRequestConfirmation/deleteRequestConfirmation";
import FilterPriority from "./components/filterByPriority/FilterPriority";
import FilterStatus from "./components/filterStatus/FilterStatus";
import Modal from "@renderer/components/Modal";
import { getStatusClass } from "./components/utils/getStatusClass/getStatusClass";


const Home = () => {
    // Retrieve token from local storage
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    interface User {
        idUsers: string;
        username: string;
        firstName: string;
        lastName: string;
        email: string;
        role: string;
    }

    interface FormData {
        id: string;
        problem: string;
        description: string;
        priority: string;
        status: string;
        creationRequest: string;
        user: User[];
    }

    interface Request {
        id: string;
        problem: string;
        description: string;
        priority: string;
        status: string;
    }

    const [toolBoxes, setToolBoxes] = useState<Request[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingFinish, setLoadingFinish] = useState<boolean>(false);
    const [formData, setFormData] = useState<FormData>({
        id: "",
        problem: "",
        description: "",
        priority: "",
        status: "PENDING",
        creationRequest: "",
        user: [{
            idUsers: "",
            username: "",
            firstName: "",
            lastName: "",
            email: "",
            role: "",
        }]
    });
    const [finishRequest, setFinishRequest] = useState<boolean>(false);
    const [showId, setShowId] = useState<boolean>(true);
    const [isExpanded, setExpanded] = useState<boolean>(false);
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [modalConfirmIsOpen, setModalConfirmIsOpen] = useState<boolean>(false);
    const [modalUpdateIsOpen, setModalUpdateIsOpen] = useState<boolean>(false);
    const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState<boolean>(false);
    const [modalFilterIsOpen, setModalFilterIsOpen] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [requestsLoaded, setRequestsLoaded] = useState<boolean>(false);
    const [singleRequest, setSingleRequest] = useState<Request>({});
    const [editedRequest, setEditedRequest] = useState<Request>({
        id: "",
        problem: "",
        description: "",
        priority: "",
        status: "",
    });
    const [filterCriteria, setFilterCriteria] = useState<string>('');
    const [selectedStatus, setSelectedStatus] = useState<string[]>([]);

    const [currentPage, setCurrentPage] = useState<number>(0);

    const focusDescription = () => {
        setExpanded(!isExpanded);
    };

    useEffect(() => {
        if (!requestsLoaded) {
            fetchData();
        }
    }, [requestsLoaded]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            fetchData(currentPage);
        }, 5000);

        return () => clearInterval(intervalId);
    }, [currentPage, token]);

    const handleAddBox = () => {
        setToolBoxes([...toolBoxes, formData]);
        setFormData({
            id: "",
            problem: "",
            description: "",
            priority: "",
            status: "PENDING",
            creationRequest: "",
            user: [{
                idUsers: "",
                username: "",
                firstName: "",
                lastName: "",
                email: "",
                role: "",
            }]
        });
        closeModal(modalIsOpen);
    };

    const handleSave = () => {
        setFormData({
            ...formData,
            problem: document.getElementById("problem")?.value || "",
            description: document.getElementById("description")?.value || "",
            priority: document.getElementById("priority")?.value || "",
            status: document.getElementById("status")?.value || ""
        });

        createNewRequest();
        handleAddBox();
    };

    const handleNextPage = () => {
        setCurrentPage(prevPage => {
            const nextPage = prevPage + 1;
            role === "ADMIN"
                ?
                fetchRequestsPage(nextPage, setLoading, token, setToolBoxes, getStatusClass, setRequestsLoaded)
                :
                fetchRequests(nextPage, setLoading, token, setToolBoxes, getStatusClass, setRequestsLoaded);
            return nextPage;
        });
    };

    const handlePreviousPage = () => {
        setCurrentPage(prevPage => {
            const previousPage = prevPage - 1;
            role === "ADMIN"
                ?
                fetchRequestsPage(previousPage, setLoading, token, setToolBoxes, getStatusClass, setRequestsLoaded)
                :
                fetchRequests(previousPage, setLoading, token, setToolBoxes, getStatusClass, setRequestsLoaded);

            return previousPage;
        });
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const fetchData = async () => {
        role === "ADMIN"
            ?
            await fetchRequestsPage(currentPage, setLoading, token, setToolBoxes, getStatusClass, setRequestsLoaded)
            :
            await fetchRequests(currentPage, setLoading, token, setToolBoxes, getStatusClass, setRequestsLoaded);
    }

    const createNewRequest = async () => {
        await CreateNewRequest(formData, token);
        setModalIsOpen(false);
    }

    const handleUpdateAction = async () => {
        await updateRequest(token, editedRequest!, setSingleRequest);
        setModalUpdateIsOpen(false);
        setModalConfirmIsOpen(false);
    }

    const handleDeleteAction = async () => {
        await deleteRequest(token, editedRequest!);
        setModalConfirmIsOpen(false);
        setModalUpdateIsOpen(false);
        setModalDeleteIsOpen(false);
    };

    const handleSomeAction = async (id: string) => {
        await fetchRequestById(id, token, setSingleRequest);
    };

    const handleFinishAction = async (editedRequest: ToolBox) => {
        setLoadingFinish(true);
        await FinishRequestAndSendEmail(token, editedRequest.user[0].email, editedRequest.problem, editedRequest.user[0].username, editedRequest.id);
        editedRequest.status = "FINISH";
        setEditedRequest(editedRequest)
        await updateRequest(token, editedRequest, setSingleRequest)
        setModalUpdateIsOpen(false);
        setModalConfirmIsOpen(false);
        setFinishRequest(false);
        setLoadingFinish(false);
    }

    // Filter and sort tool boxes based on search term, filter criteria, and selected status
    const filteredAndSortedToolBoxes = Array.isArray(toolBoxes)
        ? toolBoxes
            .filter((box) =>
                box.problem.toLowerCase().includes(searchTerm.toLowerCase()) &&
                (!filterCriteria || box.priority === filterCriteria) &&
                (selectedStatus.length === 0 || selectedStatus.includes(box.status))
            )
            .sort((a, b) => {
                // Sort based on priority (HIGH, MEDIUM, LOW)
                const priorityOrder: { [key: string]: number } = { HIGH: 1, MEDIUM: 2, LOW: 3 };
                return priorityOrder[a.priority] - priorityOrder[b.priority];
            })
        : [];

    // Function to handle status change
    const handleStatusChange = (status: string) => {
        if (selectedStatus.includes(status)) {
            setSelectedStatus((prevStatus: string[]) =>
                prevStatus.filter((selected) => selected !== status)
            );
        } else {
            setSelectedStatus((prevStatus: string[]) => [...prevStatus, status]);
        }
    };

    // Count the occurrences of each priority
    const priorityCounts = filteredAndSortedToolBoxes.reduce((counts: { [key: string]: number }, box) => {
        // Increment the count for the current priority
        counts[box.priority] = (counts[box.priority] || 0) + 1;
        return counts;
    }, {});


    useEffect(() => {
        const intervalId = setInterval(() => {
            setShowId((prevShowId) => !prevShowId);
        }, 4000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);


    return (
        <section className="homeSection">
            {role === "ADMIN" ? (
                <>
                    <div className="wave">
                        <img src={wave} alt="" />
                    </div>
                    <div className="alignCont">
                        <FilterBar handleSearch={handleSearch} searchTerm={searchTerm} setModalFilterIsOpen={setModalFilterIsOpen} role={role} />
                        <div className="boxTools">
                            <div className="tool" style={{ display: "grid", placeItems: "center" }} onClick={() => openModal(setModalIsOpen)}>
                                <h2>Create new Request</h2>
                                <img src={mais} alt="Add" width={40} />
                            </div>
                            {filteredAndSortedToolBoxes.map((box, index) => (
                                // Verifica se o item atende aos critérios de filtro antes de renderizá-lo
                                (filterCriteria === '' || box.priority === filterCriteria) && (
                                    <ToolBox
                                        key={index}
                                        box={box}
                                        loading={loading}
                                        showId={showId}
                                        handleSomeAction={handleSomeAction}
                                        setModalConfirmIsOpen={setModalConfirmIsOpen}
                                        role={role}
                                    />
                                )
                            ))}
                        </div>
                        <Pagination
                            currentPage={currentPage}
                            handlePreviousPage={handlePreviousPage}
                            handleNextPage={handleNextPage}
                            role={role}
                        />
                    </div>

                    <Modal isOpen={modalIsOpen} onClose={() => closeModal(setModalIsOpen)}>
                        <RequestForm
                            formData={formData}
                            setFormData={setFormData}
                            handleSave={handleSave}
                            role={role}
                        />
                    </Modal>

                    <Modal isOpen={modalConfirmIsOpen} onClose={() => closeModalConfirm(setModalConfirmIsOpen)}>
                        <RequestDetails
                            singleRequest={singleRequest}
                            isExpanded={isExpanded}
                            focusDescription={focusDescription}
                            openModalUpdate={openModalUpdate}
                            handleSomeAction={handleSomeAction}
                            setEditedRequest={setEditedRequest}
                            setModalUpdateIsOpen={setModalUpdateIsOpen}
                            editedRequest={editedRequest}
                            role={role}
                        />

                    </Modal>

                    <Modal isOpen={modalUpdateIsOpen} onClose={() => { closeModalUpdate(setModalUpdateIsOpen), setFinishRequest(false) }}>
                        {loadingFinish && (
                            <div className="loading-container">
                                <div className="spinner"></div>
                            </div>
                        )}

                        {!finishRequest ? (

                            <UpdateRequest
                                editedRequest={editedRequest}
                                singleRequest={singleRequest}
                                setEditedRequest={setEditedRequest}
                                handleSomeAction={handleSomeAction}
                                handleUpdateAction={handleUpdateAction}
                                setModalDeleteIsOpen={setModalDeleteIsOpen}
                                setFinishRequest={setFinishRequest}
                                role={role}
                            />


                        ) : (

                            <FinishRequest
                                singleRequest={singleRequest}
                                handleFinishAction={handleFinishAction}
                                editedRequest={editedRequest}
                            />

                        )}
                    </Modal>

                    <Modal isOpen={modalDeleteIsOpen} onClose={() => closeModalDelete(setModalDeleteIsOpen)}>

                        <DeleteRequestConfirmation
                            singleRequest={singleRequest}
                            handleDeleteAction={handleDeleteAction}
                            editedRequest={editedRequest}
                            role={role}
                        />

                    </Modal>

                    <Modal isOpen={modalFilterIsOpen} onClose={() => closeModalFilter(setModalFilterIsOpen)}>
                        <FilterPriority filterCriteria={filterCriteria} setFilterCriteria={setFilterCriteria} priorityCounts={priorityCounts} />
                        <FilterStatus selectedStatus={selectedStatus} handleStatusChange={handleStatusChange} />
                    </Modal>
                </>
            ) : (
                <>
                    <div className="wave">
                        <img src={wave} alt="" />
                    </div>

                    <div className="alignCont">
                        <FilterBar handleSearch={handleSearch} searchTerm={searchTerm} setModalFilterIsOpen={setModalFilterIsOpen} role={role} />
                        <div className="boxTools">
                            <div className="tool" style={{ display: "grid", placeItems: "center" }} onClick={() => openModal(setModalIsOpen)}>
                                <h2>Create new Request</h2>
                                <img src={mais} alt="Add" width={40} />
                            </div>
                            {filteredAndSortedToolBoxes.map((box, index) => (
                                // Verifica se o item atende aos critérios de filtro antes de renderizá-lo
                                (filterCriteria === '' || box.priority === filterCriteria) && (
                                    <ToolBox
                                        key={index}
                                        box={box}
                                        loading={loading}
                                        showId={showId}
                                        handleSomeAction={handleSomeAction}
                                        setModalConfirmIsOpen={setModalConfirmIsOpen}
                                        role={role}
                                    />
                                )
                            ))}
                        </div>
                        <Pagination
                            currentPage={currentPage}
                            handlePreviousPage={handlePreviousPage}
                            handleNextPage={handleNextPage}
                            role={role}
                        />
                    </div>

                    <Modal isOpen={modalIsOpen} onClose={() => closeModal(setModalIsOpen)}>
                        <RequestForm
                            formData={formData}
                            setFormData={setFormData}
                            handleSave={handleSave}
                            role={role}
                        />
                    </Modal>

                    <Modal isOpen={modalConfirmIsOpen} onClose={() => closeModalConfirm(setModalConfirmIsOpen)}>
                        <RequestDetails
                            singleRequest={singleRequest}
                            isExpanded={isExpanded}
                            focusDescription={focusDescription}
                            openModalUpdate={openModalUpdate}
                            handleSomeAction={handleSomeAction}
                            setEditedRequest={setEditedRequest}
                            setModalUpdateIsOpen={setModalUpdateIsOpen}
                            editedRequest={editedRequest}
                            role={role}
                        />
                    </Modal>

                    <Modal isOpen={modalUpdateIsOpen} onClose={() => closeModalUpdate(setModalUpdateIsOpen)}>
                        {loadingFinish && (
                            <div className="loading-container">
                                <div className="spinner"></div>
                            </div>
                        )}

                        <UpdateRequest
                            editedRequest={editedRequest}
                            singleRequest={singleRequest}
                            setEditedRequest={setEditedRequest}
                            handleSomeAction={handleSomeAction}
                            handleUpdateAction={handleUpdateAction}
                            setModalDeleteIsOpen={setModalDeleteIsOpen}
                            setFinishRequest={setFinishRequest}
                            role={role}
                        />

                    </Modal>

                    <Modal isOpen={modalDeleteIsOpen} onClose={() => closeModalDelete(setModalDeleteIsOpen)}>

                        <DeleteRequestConfirmation
                            singleRequest={singleRequest}
                            handleDeleteAction={handleDeleteAction}
                            editedRequest={editedRequest}
                            role={role}
                        />
                    </Modal>
                </>
            )}
        </section>
    );
}

export default Home;