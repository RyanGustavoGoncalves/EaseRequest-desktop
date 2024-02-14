interface RequestData {
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

type SetToolBoxes = (data: RequestData[]) => void;
type SetLoading = (loading: boolean) => void;
type SetRequestsLoaded = (loaded: boolean) => void;

export const fetchRequestsPage = async (
    currentPage: number,
    setLoading: SetLoading,
    token: string,
    setToolBoxes: SetToolBoxes,
    setRequestsLoaded: SetRequestsLoaded
): Promise<void> => {
    const size = 15;

    try {
        setLoading(true);
        const response = await fetch(`http://localhost:8080/request?page=${currentPage}&size=${size}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            const responseData = await response.json();

            if (Array.isArray(responseData.content)) {
                // Map the requests and include user data
                const updatedToolBoxes: RequestData[] = responseData.content.map((box: RequestData) => {
                    return {
                        ...box,
                        user: box.user,
                    };
                });

                setToolBoxes(updatedToolBoxes);
                setRequestsLoaded(true);
            } else {
                console.error("Response does not contain a valid array:", responseData);
            }
        }
    } catch (error) {
        console.log("Error fetching requests:", error);
        // alert("Error fetching requests. Please try again later.");
    } finally {
        setLoading(false);
    }
};
