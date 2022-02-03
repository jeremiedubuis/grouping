declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production';
            UPLOAD_PATH: string;
        }
    }
}
export {};
