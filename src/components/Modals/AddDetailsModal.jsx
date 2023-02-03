import {
  Box,
  Button,
  Container,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { addChildren, getData } from "../../slice/familyTreeSlice";
import { useDispatch } from "react-redux";
import "./style.css";

const AddDetailsModal = ({ open, setOpen }) => {
  const [dataToAdd, setDataToAdd] = React.useState({});
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    // console.log(dataToAdd, "dataToAdd");
    dispatch(addChildren(dataToAdd));
    setOpen(false);
    setDataToAdd({});
    dispatch(getData());
  };

  const style = {
    box: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      backgroundColor: "#292f38",
      boxShadow: 24,
      fontFamily: "Josefin Sans",
      p: 4,
    },
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box sx={style.box}>
        <Container className="container">
          <Typography className="typography">Name</Typography>
          <TextField
            className="textfield"
            sx={{
              input: {
                color: "#8F8A8A",
              },
            }}
            id="outlined-basic"
            onChange={(e) => {
              setDataToAdd({ ...dataToAdd, name: e.target.value });
            }}
            InputLabelProps={{
              style: {
                color: "#8F8A8A",
              },
            }}
          />
        </Container>
        <Container className="container2">
          <Typography className="typography">Spouse</Typography>
          <TextField
            className="textfield"
            sx={{
              input: {
                color: "#8F8A8A",
              },
            }}
            id="outlined-basic"
            onChange={(e) => {
              setDataToAdd({ ...dataToAdd, spouse: e.target.value });
            }}
            InputLabelProps={{
              style: {
                color: "#8F8A8A",
              },
            }}
          />
        </Container>
        <Container className="container2">
          <Typography className="typography">Location</Typography>
          <TextField
            className="textfield"
            sx={{
              input: {
                color: "#8F8A8A",
              },
            }}
            onChange={(e) => {
              setDataToAdd({ ...dataToAdd, location: e.target.value });
            }}
            id="outlined-basic"
            InputLabelProps={{
              style: {
                color: "#8F8A8A",
              },
            }}
          />
        </Container>
        <Container className="container2">
          <Typography className="typography">Birth Year</Typography>
          <TextField
            className="textfield"
            sx={{
              input: {
                color: "#8F8A8A",
              },
            }}
            id="outlined-basic"
            onChange={(e) => {
              setDataToAdd({ ...dataToAdd, birthYear: e.target.value });
            }}
            InputLabelProps={{
              style: {
                color: "#8F8A8A",
              },
            }}
          />
        </Container>
        <Container className="container2">
          <Typography className="typography">Present Address</Typography>
          <TextField
            className="textfield"
            sx={{
              input: {
                color: "#8F8A8A",
              },
            }}
            id="outlined-basic"
            onChange={(e) => {
              setDataToAdd({ ...dataToAdd, presentAddress: e.target.value });
            }}
            InputLabelProps={{
              style: {
                color: "#8F8A8A",
              },
            }}
          />
        </Container>
        <Container className="container2">
          <Typography className="typography">Family Photo</Typography>
          <TextField
            className="textfield"
            sx={{
              input: {
                color: "#8F8A8A",
              },
            }}
            id="outlined-basic"
            onChange={(e) => {
              setDataToAdd({
                ...dataToAdd,
                familyPhoto: [
                  {
                    img: e.target.value,
                    title: "Family Photo",
                  },
                ],
              });
            }}
            InputLabelProps={{
              style: {
                color: "#8F8A8A",
              },
            }}
          />
        </Container>
        <Button variant="contained" onClick={handleClick} className="add">
          Add
        </Button>
      </Box>
    </Modal>
  );
};

export default AddDetailsModal;
