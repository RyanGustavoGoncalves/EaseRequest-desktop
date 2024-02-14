// Get the CSS class for the status
export const getStatusClass = (status: string): string => {
    let colorClass: string = "status-red"; // Assume red as default

    // Check the status of the request
    if (status === "PROCESSING") {
        colorClass = "status-yellow";
    } else if (status === "FINISH") {
        colorClass = "status-green";
    }

    return colorClass;
};
