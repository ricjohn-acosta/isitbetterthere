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
  const [byHelpful, setByHelpful] = React.useState(false);
  const [byNewest, setByNewest] = React.useState(false);
  const [byOldest, setByOldest] = React.useState(false);

  const handleCheckbox = (filterBy) => {
    switch (filterBy) {
      case "most-helpful":
        setByNewest(false);
        setByOldest(false);
        {
          byHelpful
            ? Router.push({
                pathname: "/transition",
                query: {
                  category: router.query.category,
                  from: router.query.from,
                  to: router.query.to,
                },
                asPath: router.asPath,
              })
            : Router.push({
                pathname: "/transition",
                query: {
                  category: router.query.category,
                  from: router.query.from,
                  to: router.query.to,
                  sortBy: "most-helpful",
                },
                asPath: router.asPath,
              });
        }
        break;

      case "newest":
        setByHelpful(false);
        setByOldest(false);
        {
          byNewest
            ? Router.push({
                pathname: "/transition",
                query: {
                  category: router.query.category,
                  from: router.query.from,
                  to: router.query.to,
                },
                asPath: router.asPath,
              })
            : Router.push({
                pathname: "/transition",
                query: {
                  category: router.query.category,
                  from: router.query.from,
                  to: router.query.to,
                  sortBy: "newest",
                },
                asPath: router.asPath,
              });
        }
        break;

      case "oldest":
        setByHelpful(false);
        setByNewest(false);
        {
          byOldest
            ? Router.push({
                pathname: "/transition",
                query: {
                  category: router.query.category,
                  from: router.query.from,
                  to: router.query.to,
                },
                asPath: router.asPath,
              })
            : Router.push({
                pathname: "/transition",
                query: {
                  category: router.query.category,
                  from: router.query.from,
                  to: router.query.to,
                  sortBy: "oldest",
                },
                asPath: router.asPath,
              });
        }
        break;

      default:
        break;
    }
  };

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
                  setByHelpful(!byHelpful);
                  handleCheckbox("most-helpful");
                }}
                checked={byHelpful}
              />
            }
            label="by most helpful"
          />
        </ListItem>
        <ListItem>
          <FormControlLabel
            control={
              <Checkbox
                name="gilad"
                onChange={() => {
                  setByNewest(!byNewest);
                  handleCheckbox("newest");
                }}
                checked={byNewest}
              />
            }
            label="by newest"
          />{" "}
        </ListItem>
        <ListItem>
          <FormControlLabel
            control={
              <Checkbox
                name="gilad"
                onChange={() => {
                  setByOldest(!byOldest);
                  handleCheckbox("oldest");
                }}
                checked={byOldest}
              />
            }
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
