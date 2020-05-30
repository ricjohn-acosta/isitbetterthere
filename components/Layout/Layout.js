import Header from "../UI/Navigation/Header";
import Footer from "../UI/Navigation/Footer";

const Layout = (props) => {
  return (
    <React.Fragment>
      <header>
        <Header />
      </header>
      {props.children}
      <footer>footer</footer>
    </React.Fragment>
  );
};

export default Layout;
