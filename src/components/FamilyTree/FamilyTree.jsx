import { Box, TextField, Typography } from "@mui/material";
import React from "react";
import TreeViewComponent from "./TreeViewComponent";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { inputLabelClasses } from "@mui/material/InputLabel";
import { searchByName } from "../../slice/familyTreeSlice";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";

const FamilyTree = () => {
  const familyTree = useSelector((state) => state.familyTree.data);
  // console.log(familyTree, "familyTree");

  const dispatch = useDispatch();
  const handleSearch = (e, value) => {
    dispatch(searchByName(e.target.value));
  };

  return (
    <Box className="box-tree">
      <Typography className="title-tree">Family Tree</Typography>
      <TextField
        id="no-border"
        type="search"
        placeholder="Search"
        onChange={handleSearch}
        className="search"
        InputProps={{
          sx: {
            color: "white",
            [`&.${inputLabelClasses.shrink}`]: {
              color: "white",
            },
          },
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon
                sx={{
                  color: "white",
                }}
              />
            </InputAdornment>
          ),
        }}
      />
      <TreeViewComponent />
    </Box>
  );
};

export default FamilyTree;
