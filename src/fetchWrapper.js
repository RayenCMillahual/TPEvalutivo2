export const fetchWrapper = {
    get(url) {
        return fetch(url).then(handleResponse).catch(handleError);
    },
    post(url, body) {
        return fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        }).then(handleResponse).catch(handleError);
    },
};

function handleResponse(response) {
    return response.json().then(data => {
        if (!response.ok) {
            return Promise.reject(data);
        }
        return data;
    });
}

function handleError(error) {
    return Promise.reject({ message: error.message || 'Error desconocido' });
}
