interface RequestData {
    id: string;
    problem: string;
    description: string;
    priority: string;
    status: string;
    creationRequest: string;
}

type SetToolBoxes = (data: RequestData[]) => void;
type SetLoading = (loading: boolean) => void;
type GetStatusClass = (status: string) => string;
type SetRequestsLoaded = (loaded: boolean) => void;

export const fetchRequests = async (
    currentPage: number,
    setLoading: SetLoading,
    token: string,
    setToolBoxes: SetToolBoxes,
    getStatusClass: GetStatusClass,
    setRequestsLoaded: SetRequestsLoaded
): Promise<void> => {
    const size = 15;
    try {
        setLoading(true);
        const response = await fetch(`http://localhost:8080/request/user?page=${currentPage}&size=${size}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            const responseData = await response.json();

            if (Array.isArray(responseData)) {
                // Atualiza as solicitações e atribui a cor a cada uma
                setToolBoxes(responseData.map((request: RequestData) => ({
                    ...request,
                    colorClass: getStatusClass(request.status),
                })));
                setRequestsLoaded(true);
            } else {
                console.error("A resposta não contém uma matriz válida:", responseData);
            }
        } else {
            console.log("Ocorreu um erro inesperado ao buscar as solicitações: " + response.status);
        }
    } catch (error) {
        console.log("Erro ao buscar as solicitações:", error);
        // alert("Erro ao buscar as solicitações. Por favor, tente novamente mais tarde.");
    } finally {
        setLoading(false);
    }
};
