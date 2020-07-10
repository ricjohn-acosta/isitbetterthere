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
        >
          <LinkTab label={"Settings"} view={"settings"}/>
          <LinkTab label={"Contributions"} view={"contributions"}/>
          <LinkTab label={"Helpful stories"} view={"helpful-stories"}/>
          {/* <Tab
            value={"settings"}
            component="a"
            label="Settings"
            disableRipple
          />
          <Tab value={"contributions"} label="Contributions" disableRipple />
          <Tab
            value={"helpful-stories"}
            label="Helpful stories"
            disableRipple
          /> */}
        </Tabs>
      </Paper>
    </>
  );
};

export default CenteredTabs;
