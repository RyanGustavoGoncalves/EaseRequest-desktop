export const openModal = (setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>): void => {
    document.body.style.overflow = "hidden";
    setModalIsOpen(true);
};

export const closeModal = (setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>): void => {
    document.body.style.overflow = "auto";
    setModalIsOpen(false);
};

export const openModalConfirm = (
    id: string,
    handleSomeAction: (id: string) => void,
    setModalConfirmIsOpen: React.Dispatch<React.SetStateAction<boolean>>
): void => {
    document.body.style.overflow = "hidden";
    handleSomeAction(id);
    setModalConfirmIsOpen(true);
};

export const closeModalConfirm = (setModalConfirmIsOpen: React.Dispatch<React.SetStateAction<boolean>>): void => {
    document.body.style.overflow = "auto";
    setModalConfirmIsOpen(false);
};

export const openModalUpdate = (
    id: string,
    handleSomeAction: (id: string) => void,
    setEditedRequest: React.Dispatch<React.SetStateAction<any>>,
    singleRequest: any,
    setModalUpdateIsOpen: React.Dispatch<React.SetStateAction<boolean>>
): void => {
    document.body.style.overflow = "hidden";
    handleSomeAction(id);
    setEditedRequest({ ...singleRequest });
    setModalUpdateIsOpen(true);
};

export const closeModalUpdate = (setModalUpdateIsOpen: React.Dispatch<React.SetStateAction<boolean>>): void => {
    document.body.style.overflow = "auto";
    setModalUpdateIsOpen(false);
};

export const openModalDelete = (
    id: string,
    handleSomeAction: (id: string) => void,
    setModalDeleteIsOpen: React.Dispatch<React.SetStateAction<boolean>>
): void => {
    document.body.style.overflow = "hidden";
    handleSomeAction(id);
    setModalDeleteIsOpen(true);
};

export const closeModalDelete = (setModalDeleteIsOpen: React.Dispatch<React.SetStateAction<boolean>>): void => {
    document.body.style.overflow = "auto";
    setModalDeleteIsOpen(false);
};

export const openModalFilter = (setModalFilterIsOpen: React.Dispatch<React.SetStateAction<boolean>>): void => {
    document.body.style.overflow = "hidden";
    setModalFilterIsOpen(true);
};

export const closeModalFilter = (setModalFilterIsOpen: React.Dispatch<React.SetStateAction<boolean>>): void => {
    document.body.style.overflow = "auto";
    setModalFilterIsOpen(false);
};

export const openModalUserUpdate = (
    setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setEditData: React.Dispatch<React.SetStateAction<any>>,
    userData: any
): void => {
    document.body.style.overflow = "hidden";
    setEditData({ ...userData });
    setModalIsOpen(true);
};

export const closeModalUserUpdate = (setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>): void => {
    document.body.style.overflow = "auto";
    setModalIsOpen(false);
};
