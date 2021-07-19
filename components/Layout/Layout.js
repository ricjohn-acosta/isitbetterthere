import Header from "../Navigation/Header";
import Footer from "../Navigation/Footer";
import styled from "styled-components";
import Head from 'next/head'
import {useRouter} from 'next/router'

const Container = styled.div`
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;
const Layout = (props) => {
    const router = useRouter()

    const headerTitleBuilder = () => {
        const userView = router.pathname.split('/')[1] === 'user'
        const root = router.pathname === '/'

        if (root) return null
        if (userView && props.user) {
            return '| ' + props.user.name
        } else {
            return '| ' + router.pathname.substring(1)
        }
    }

    return (
        <React.Fragment>
            <Head>
                <title>IsItBetterThere {headerTitleBuilder()}</title>
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
