export { ViewPage as default } from '$views/bo/ViewPage/ViewPage';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    return {
        props: {
            id: parseInt(ctx.query.id as string)
        }
    };
};
