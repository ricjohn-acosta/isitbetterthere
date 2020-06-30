import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { useRouter } from "next/router";
import Router from "next/router";

const SearchTools = () => {
  const router = useRouter();

  return (
    <List component="nav">
      <ListItem>
        <ListItemText primary="Sort comments.." />
      </ListItem>
      <Divider />
      <List style={{ marginLeft: "10px" }}>
        <ListItem>
          <FormControlLabel
            control={
              <Checkbox
                onChange={() => {
                  router.query["test"] = "test";
                  Router.push(router.asPath, router.asPath + `/?test=${"test"}`, { shallow: true });
                }}
              />
            }
            label="by highest rated"
          />
        </ListItem>
        <ListItem>
          <FormControlLabel
            control={<Checkbox name="gilad" />}
            label="by comment count"
          />{" "}
        </ListItem>
        <ListItem>
          <FormControlLabel
            control={<Checkbox name="gilad" />}
            label="by newest"
          />{" "}
        </ListItem>
        <ListItem>
          <FormControlLabel
            control={<Checkbox name="gilad" />}
            label="by oldest"
          />{" "}
        </ListItem>
      </List>
      <ListItem>
        <ListItemText primary="Filter comments.." />
      </ListItem>
      <Divider />
      <List style={{ marginLeft: "10px" }}>
        <ListItem>
          <FormControlLabel
            control={
              <>
                <Select>
                  <MenuItem>Fulfilled</MenuItem>
                  <MenuItem>Not fulfilled</MenuItem>
                  <MenuItem>Mixed</MenuItem>
                </Select>
                &nbsp;
              </>
            }
            label="by fulfillment"
          />
        </ListItem>

        <ListItem>
          <FormControlLabel
            control={
              <>
                <Select>
                  <MenuItem>Easy</MenuItem>
                  <MenuItem>Medium</MenuItem>
                  <MenuItem>Hard</MenuItem>
                </Select>
                &nbsp;
              </>
            }
            label="by ease of transition"
          />
        </ListItem>

        <ListItem>
          <FormControlLabel
            control={
              <>
                <Select>
                  <MenuItem>Did regret</MenuItem>
                  <MenuItem>Did not regret</MenuItem>
                </Select>
                &nbsp;
              </>
            }
            label="by people who regret the transition"
          />
        </ListItem>
      </List>
    </List>
  );
};

export default SearchTools;
