import Swal from 'sweetalert2';

export const updateUser = async (editUser: any, token: string, setUserData: React.Dispatch<React.SetStateAction<any>>): Promise<void> => {
    try {
        const response = await fetch("http://localhost:8080", {
            method: 'PUT',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(editUser),
        });

        if (response.ok) {
            const responseData = await response.json();

            setUserData(responseData);
            Swal.fire({
                text: responseData.message || 'Update carried out successfully!',
                icon: 'success',
            });

        } else {
            Swal.fire({
                text: 'Unexpected error. Please try again later.',
                icon: 'error',
            });
        }
    } catch (error) {
        console.error("Error updating user information:", error);
        Swal.fire({
            text: 'Error updating user information. Please try again later.',
            icon: 'error',
        });
    }
};
