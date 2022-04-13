import '../css/global.css';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { BoLayout } from '$components/layout/BoLayout';
import { Layout } from '$components/layout/Layout';
import { registerColorPicker } from '$components/forms/ColorPicker/ColorPicker';
import { asyncMenuFetch } from '../async/asyncMenu';
import { MenuLink } from '$types/menuLink';
import { registerQuill } from '$components/forms/Quill/Quill';
import Head from 'next/head';

registerColorPicker();
registerQuill();

function App({ Component, pageProps, props }: AppProps & { props: { menu: MenuLink[] } }) {
    const { pathname } = useRouter();
    const Wrapper = /\/bo$|\/bo\/.*/.test(pathname) ? BoLayout : Layout;
    return (
        <Wrapper menu={props.menu}>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Component {...pageProps} />
        </Wrapper>
    );
}

App.getInitialProps = async () => {
    return {
        props: {
            menu: await asyncMenuFetch()
        }
    };
};

export default App;
