/* eslint-disable prettier/prettier */
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export const tokenMailForgotPassword = async (username: string): Promise<void> => {
    try {
        const response = await fetch("http://localhost:8080/update-password/generate-token/forgot-password", {
            method: 'PUT',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username }),
        });

        if (response.ok) {
            Swal.fire({
                text: 'Token sent. Check your email.',
                icon: 'success',
            });
        } else {
            console.log("An error occurred while generating the token:", response.status);
            const errorMessage = await response.text();
            Swal.fire({
                text: `Error generating token: ${errorMessage}`,
                icon: 'error',
            });
        }
    } catch (error) {
        console.log("Error generating token:", error);
        Swal.fire({
            text: 'Error generating token. Please try again later.',
            icon: 'error',
        });
    }
};
