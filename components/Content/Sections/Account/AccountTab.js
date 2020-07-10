import React from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Link from "next/link";

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
        <Tab value={"settings"} label="Settings" disableRipple />
        <Tab value={"contributions"} label="Contributions" disableRipple />
        <Tab value={"helpful-stories"} label="Helpful stories" disableRipple />
      </Tabs>
    </Paper>

    </>
  );
};

export default CenteredTabs;
