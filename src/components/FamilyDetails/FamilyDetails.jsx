import React, { useEffect } from "react";
import { Container } from "@mui/system";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { defaultDataForCurrentSelected } from "../../slice/familyTreeSlice";
import "./style.css";

const FamilyDetails = () => {
  const currentFamily = useSelector(
    (state) => state.familyTree.currentSelected
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(defaultDataForCurrentSelected());
  }, []);
  return (
    <Box className="box-details">
      <Typography className="title">Family Details</Typography>
      <Container className="container-details">
        <Box className="row">
          <Typography className="field1">
            <span>Name</span>
            <span>:</span>
          </Typography>
          <Typography className="field2">{currentFamily.name}</Typography>
        </Box>
        <Box className="row">
          <Typography className="field1">
            <span>Spouse</span>
            <span>:</span>
          </Typography>
          <Typography className="field2">{currentFamily.spouse}</Typography>
        </Box>
        <Box className="row">
          <Typography className="field1">
            <span>Location</span>
            <span>:</span>
          </Typography>
          <Typography className="field2">{currentFamily.location}</Typography>
        </Box>
        <Box className="row">
          <Typography className="field1">
            <span>Birth Year</span>
            <span>:</span>
          </Typography>
          <Typography className="field2">{currentFamily.birthYear}</Typography>
        </Box>
        <Box className="row">
          <Typography className="field1">
            <span>Present Address</span>
            <span>:</span>
          </Typography>
          <Typography className="field2">
            {currentFamily.presentAddress}
          </Typography>
        </Box>
        <Box className="row">
          <Typography className="field1">
            <span>Family Photo</span>
            <span>:</span>
          </Typography>
          <Box
            sx={{
              width: "75%",
            }}>
            {currentFamily?.familyPhoto ? (
              currentFamily.familyPhoto.map((item) => (
                <img
                  src={item.img}
                  style={{
                    width: "100px",
                    height: "100px",
                    marginLeft: "20px",
                  }}
                />
              ))
            ) : (
              <Typography className="field2">No Family Photo</Typography>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default FamilyDetails;
