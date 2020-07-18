import React from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import LinkTab from "./LinkTab"

const CenteredTabs = ({ view, setView }) => {

  const handleChange = (event, newValue) => {
    setView(newValue);
  };


  return (
    <>
      <Paper elevation={0}>
        <Tabs
          value={view}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="primary"
          scrollButtons="on"
        >
          <LinkTab label={"Settings"} value={"settings"} view={"settings"}/>
          <LinkTab label={"Contributions"} value={"contributions"} view={"contributions"}/>
          <LinkTab label={"Helpful stories"} value={"helpful-stories"} view={"helpful-stories"}/>
        </Tabs>
      </Paper>
    </>
  );
};

export default CenteredTabs;
