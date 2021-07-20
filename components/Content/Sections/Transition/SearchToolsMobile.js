import React from "react";
import {Menu, MenuItem, Button} from "@material-ui/core";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

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
        <div style={{display: "flex"}}>
            <Button onClick={handleSort}>Sort experiences <ArrowDropDownIcon/></Button>
            <Menu
                anchorEl={sort}
                keepMounted
                open={Boolean(sort)}
                onClose={handleCloseSort}
            >
                <MenuItem onClick={handleCloseSort}>Highest rated</MenuItem>
                <MenuItem onClick={handleCloseSort}>Comment count</MenuItem>
                <MenuItem onClick={handleCloseSort}>Newest</MenuItem>
                <MenuItem onClick={handleCloseSort}>Oldest</MenuItem>
            </Menu>
            &nbsp;
            <Button onClick={handleFilter}>Filter experiences <ArrowDropDownIcon/></Button>
            <Menu
                anchorEl={filter}
                keepMounted
                open={Boolean(filter)}
                onClose={handleCloseFilter}
            >
                <MenuItem onClick={handleCloseFilter}>Fulfilled</MenuItem>
                <MenuItem onClick={handleCloseFilter}>Not Fulfilled</MenuItem>
                <MenuItem onClick={handleCloseFilter}>Mixed</MenuItem>
                <MenuItem onClick={handleCloseFilter}>Easy transition</MenuItem>
                <MenuItem onClick={handleCloseFilter}>Medium transition</MenuItem>
                <MenuItem onClick={handleCloseFilter}>Hard transition</MenuItem>
                <MenuItem onClick={handleCloseFilter}>Regret transition</MenuItem>
                <MenuItem onClick={handleCloseFilter}>Did not regret transition</MenuItem>
            </Menu>
        </div>
    );
};

export default SearchToolsMobile;
