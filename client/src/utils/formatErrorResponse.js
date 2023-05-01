export const formatErrorResponse = (error) => {
    const message = error.response?.data?.errorMessage || error.message;
    return message;
};
