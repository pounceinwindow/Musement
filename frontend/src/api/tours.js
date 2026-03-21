function getApiBaseUrl() {
    const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL;
    return configuredBaseUrl ? configuredBaseUrl.replace(/\/$/, '') : '';
}

function normalizeParams(params) {
    if (params instanceof URLSearchParams) {
        return params;
    }

    const searchParams = new URLSearchParams();

    if (!params || typeof params !== 'object') {
        return searchParams;
    }

    for (const [key, value] of Object.entries(params)) {
        if (value === undefined || value === null || value === '') {
            continue;
        }

        searchParams.set(key, String(value));
    }

    return searchParams;
}

function buildUrl(path, params) {
    const searchParams = normalizeParams(params);
    const query = searchParams.toString();
    const baseUrl = getApiBaseUrl();
    const endpoint = baseUrl ? `${baseUrl}${path}` : path;

    return query ? `${endpoint}?${query}` : endpoint;
}

async function request(path, params) {
    const response = await fetch(buildUrl(path, params), {
        headers: {
            Accept: 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }

    return response.json();
}

export function fetchTours(params) {
    return request('/api/tours', params);
}

export function fetchTourById(id) {
    return request(`/api/tours/${id}`);
}
