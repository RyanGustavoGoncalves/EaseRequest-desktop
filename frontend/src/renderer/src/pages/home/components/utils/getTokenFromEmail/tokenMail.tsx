import Swal from 'sweetalert2';

export const tokenMail = async (email: string, token: string): Promise<void> => {
    try {
        const response = await fetch("http://localhost:8080/update-password/generate-token", {
            method: 'PUT',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ email }),
        });

        if (response.ok) {
            Swal.fire({
                text: 'Token sent. Check your email.',
                icon: 'success',
            });
        } else {
            console.error("Error generating token:", response.status);
            const errorMessage = await response.text();
            Swal.fire({
                text: `Error generating token: ${errorMessage}`,
                icon: 'error',
            });
        }
    } catch (error) {
        console.error("Error generating token:", error);
        Swal.fire({
            text: 'Error generating token. Please try again later.',
            icon: 'error',
        });
    }
};
