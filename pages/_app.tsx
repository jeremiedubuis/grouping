import '../css/global.css';
import React from 'react';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { BoLayout } from '../components/layout/BoLayout';
import { Layout } from '../components/layout/Layout';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
    const { pathname } = useRouter();
    const Wrapper = /\/bo$|\/bo\/.*/.test(pathname) ? BoLayout : Layout;
    return (
        <Wrapper>
            <Component {...pageProps} />
        </Wrapper>
    );
};

export default App;
