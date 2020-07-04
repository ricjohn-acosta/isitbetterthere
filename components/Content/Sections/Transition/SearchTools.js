import styled from "styled-components";
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

const StyledSelect = styled(Select)`
  width: 70px;
`;

const SearchTools = () => {
  const router = useRouter();
  const [byHelpful, setByHelpful] = React.useState(false);
  const [byNewest, setByNewest] = React.useState(false);
  const [byOldest, setByOldest] = React.useState(false);
  const [byFulfillment, setByFulfillment] = React.useState("none");
  const [byEase, setByEase] = React.useState("none");
  const [byRegret, setByRegret] = React.useState("none");

  const handleFilter = (filterBy, quality) => {
    switch (quality) {
      case "fulfillment":
        setByFulfillment(filterBy);
        setByEase("none");
        setByRegret("none");
        Router.push({
          pathname: "/transition",
          query: { ...router.query, page: "1", filterBy },
          asPath: router.asPath,
        });

        break;

      case "ease":
        setByEase(filterBy);
        setByFulfillment("none");
        setByRegret("none");
        Router.push({
          pathname: "/transition",
          query: { ...router.query, page: "1", filterBy },
          asPath: router.asPath,
        });
        break;

      case "regret":
        setByFulfillment("none");
        setByEase("none");
        setByRegret(filterBy);
        Router.push({
          pathname: "/transition",
          query: { ...router.query, page: "1", filterBy },
          asPath: router.asPath,
        });
        break;

      default:
        break;
    }
  };

  console.log(byFulfillment);
  const handleCheckbox = (sortBy) => {
    switch (sortBy) {
      case "most-helpful":
        setByNewest(false);
        setByOldest(false);
        {
          byHelpful
            ? Router.push({
                pathname: "/transition",
                query: { ...router.query, sortBy: "none" },
                asPath: router.asPath,
              })
            : Router.push({
                pathname: "/transition",
                query: { ...router.query, sortBy: "most-helpful" },
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
                query: { ...router.query, sortBy: "none" },
                asPath: router.asPath,
              })
            : Router.push({
                pathname: "/transition",
                query: { ...router.query, sortBy: "newest" },
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
                query: { ...router.query, sortBy: "none" },
                asPath: router.asPath,
              })
            : Router.push({
                pathname: "/transition",
                query: { ...router.query, sortBy: "oldest" },
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
                <StyledSelect
                  value={byFulfillment}
                  onChange={(e) => handleFilter(e.target.value, "fulfillment")}
                >
                  <MenuItem value={"none"}>None</MenuItem>
                  <MenuItem value={"fulfilled"}>Fulfilled</MenuItem>
                  <MenuItem value={"not-fulfilled"}>Not fulfilled</MenuItem>
                  <MenuItem value={"mixed"}>Mixed</MenuItem>
                </StyledSelect>
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
                <StyledSelect
                  value={byEase}
                  onChange={(e) => handleFilter(e.target.value, "ease")}
                >
                  <MenuItem value={"none"}>None</MenuItem>
                  <MenuItem value={"easy"}>Easy</MenuItem>
                  <MenuItem value={"medium"}>Medium</MenuItem>
                  <MenuItem value={"hard"}>Hard</MenuItem>
                </StyledSelect>
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
                <StyledSelect
                  value={byRegret}
                  onChange={(e) => handleFilter(e.target.value, "regret")}
                >
                  <MenuItem value={"none"}>None</MenuItem>
                  <MenuItem value={"did-regret"}>Did regret</MenuItem>
                  <MenuItem value={"did-not-regret"}>Did not regret</MenuItem>
                </StyledSelect>
                &nbsp;
              </>
            }
            label="by regret"
          />
        </ListItem>
      </List>
      {/* {console.log(byFilter)} */}
    </List>
  );
};

export default SearchTools;
