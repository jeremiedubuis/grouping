const objectToFormData = (obj) => {
    const formData = new FormData();
    if (obj) {
        for (let key in obj) {
            if (typeof obj[key] !== 'undefined') {
                if (Array.isArray(obj[key])) {
                    obj[key].forEach((value) => {
                        formData.append(`${key}[]`, value);
                    });
                } else {
                    formData.append(key, obj[key]);
                }
            }
        }
    }
    return formData;
};

export const apiFetch = (url: string, options: any = {}) => {
    let headers;
    let body;
    if (options.multiPart) {
        headers = options.headers;
        body = objectToFormData(options.body);
    } else {
        headers = {
            'content-type': 'application/json',
            ...(options.headers || {})
        };
        body = typeof options.body === 'object' ? JSON.stringify(options.body) : options.body;
    }

    return fetch(url, {
        ...options,
        headers,
        body
    }).then(async (r) => {
        if (r.status > 299) {
            throw new Error(await r.text());
        }
        return r.status !== 204 ? await r.json() : null;
    });
};
