export class ApiError extends Error {
    public code: number;
    public apiError: boolean = true;
    constructor(json: any, code: number = 500) {
        super(JSON.stringify(json));
        this.code = code;
    }
}
