export { ViewMap as default } from '$views/bo/ViewMap/ViewMap';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    return {
        props: {
            id: parseInt(ctx.query.id as string)
        }
    };
};
