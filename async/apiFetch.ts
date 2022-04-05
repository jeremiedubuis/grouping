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

    if (typeof window === 'undefined') {
        url = 'http://localhost:' + (process.env.PORT || 3000) + url;
        headers['origin'] = process.env.HOST;
    }
    console.log(url);

    return fetch(url, {
        ...options,
        headers,
        body
    }).then(async (r) => {
        const t = await r.text();
        if (r.status > 299) {
            throw await JSON.parse(t);
        }

        if (!r) return null;
        return r.status !== 204 ? JSON.parse(t) : null;
    });
};
