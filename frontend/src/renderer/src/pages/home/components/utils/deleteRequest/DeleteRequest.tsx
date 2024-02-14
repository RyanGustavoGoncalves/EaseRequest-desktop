import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

interface EditedRequest {
    id: string;
}

export const deleteRequest = async (token: string, editedRequest: EditedRequest): Promise<void> => {
    try {
        const response = await fetch(`http://localhost:8080/request/${editedRequest.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.ok) {
            Swal.fire({
                text: 'Request deleted successfully!',
                icon: 'success',
                customClass: {
                    popup: 'custom-popup-class',
                },
                didOpen: () => {
                    const modal = Swal.getPopup();
                    if (modal) {
                        modal.style.zIndex = '99999';
                        // Adicione outras personalizações de estilo conforme necessário
                    }
                },
            });
        } else {
            console.error('Error deleting the request:', response.status);
        }
    } catch (error) {
        console.error('Error making delete request:', error);
        Swal.fire({
            text: 'Error making delete request. Please try again later.',
            icon: 'error',
            customClass: {
                popup: 'custom-popup-class',
            },
        });
    }
};
