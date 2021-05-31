import Header from "../Navigation/Header";
import Footer from "../Navigation/Footer";
import styled from "styled-components";
import Head from 'next/head'
import { useRouter } from 'next/router'

const Container = styled.div`
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;
const Layout = (props) => {
    const router = useRouter()

    console.log(router)

    return (
        <React.Fragment>
            <Head>
                <title>IsItBetterThere {router.pathname === '/' ? null : '| ' + router.pathname.substring(1)}</title>
            </Head>
            <header>
                <Header/>
            </header>
            <Container>{props.children}</Container>
            <footer>
                <Footer/>
            </footer>
        </React.Fragment>
    );
};

export default Layout;
