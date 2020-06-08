import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

const SearchToolsMobile = () => {
  const [sort, setSort] = React.useState(null);
  const [filter, setFilter] = React.useState(null);

  const handleSort = (event) => {
    setSort(event.currentTarget);
  };

  const handleCloseSort = () => {
    setSort(null);
  };

  const handleFilter = (event) => {
    setFilter(event.currentTarget);
  };

  const handleCloseFilter = () => {
    setFilter(null);
  };

  return (
    <div style={{ display: "flex" }}>
      <Button onClick={handleSort}>Sort experiences</Button>
      <Menu
        anchorEl={sort}
        keepMounted
        open={Boolean(sort)}
        onClose={handleCloseSort}
      >
        <MenuItem onClick={handleCloseSort}>Profile</MenuItem>
        <MenuItem onClick={handleCloseSort}>My account</MenuItem>
        <MenuItem onClick={handleCloseSort}>Logout</MenuItem>
      </Menu>
      &nbsp;
      <Button onClick={handleFilter}>Filter experiences</Button>
      <Menu
        anchorEl={filter}
        keepMounted
        open={Boolean(filter)}
        onClose={handleCloseFilter}
      >
        <MenuItem onClick={handleCloseFilter}>Profile</MenuItem>
        <MenuItem onClick={handleCloseFilter}>My account</MenuItem>
        <MenuItem onClick={handleCloseFilter}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default SearchToolsMobile;
