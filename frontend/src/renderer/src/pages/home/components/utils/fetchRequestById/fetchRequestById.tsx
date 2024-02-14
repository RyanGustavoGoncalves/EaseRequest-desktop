interface SingleRequest {
    id: string;
    problem: string;
    description: string;
    priority: string;
    status: string;
    creationRequest: string;
    user: {
        idUsers: string;
        username: string;
        firstName: string;
        lastName: string;
        email: string;
        role: string;
    };
}

type SetSingleRequest = (data: SingleRequest) => void;

export const fetchRequestById = async (id: string, token: string, setSingleRequest: SetSingleRequest): Promise<void> => {
    try {
        const response = await fetch(`http://localhost:8080/request/${id}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            const responseData = await response.json();

            if (responseData && typeof responseData === 'object') {

                // Extract user data and add it to the single request
                const user = responseData.user;
                const updatedSingleRequest: SingleRequest = {
                    ...responseData,
                    user: user,
                };

                setSingleRequest(updatedSingleRequest);
            } else {
                console.error("Response does not contain a valid object:", responseData);
            }
        } else if (response.status === 404) {
            console.log("Request not found");
            // Handle the case where the request was not found
        } else {
            console.log("An unexpected error occurred: " + response.status);
        }
    } catch (error) {
        console.log("Error fetching the request:", error);
    }
};
