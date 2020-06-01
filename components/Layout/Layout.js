import Header from "../Navigation/Header";
import Footer from "../Navigation/Footer";

const Layout = (props) => {
  return (
    <React.Fragment>
      <header>
        <Header />
      </header>
      {props.children}
      <footer></footer>
    </React.Fragment>
  );
};

export default Layout;
