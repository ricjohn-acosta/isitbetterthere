import Tab from "@material-ui/core/Tab";
import Router from "next/router";

const LinkTab = (props) => {
  const handler = () => {
    Router.push({ pathname: "/account", query: { tab: props.view } });
  };
  return <Tab onClick={handler} disableRipple component="a" {...props} />;
};

export default LinkTab;
