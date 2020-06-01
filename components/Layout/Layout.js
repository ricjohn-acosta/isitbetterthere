import Header from "../Navigation/Header";
import Footer from "../Navigation/Footer";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;
const Layout = (props) => {
  return (
    <React.Fragment>
      <header>
        <Header />
      </header>
      <Container>{props.children}</Container>
      <footer>
        <Footer />
      </footer>
    </React.Fragment>
  );
};

export default Layout;
