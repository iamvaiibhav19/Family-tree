import {
  Box,
  Button,
  Container,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { importJson } from "../../slice/familyTreeSlice";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";

const ImportJsonModal = ({ open, setOpen }) => {
  const [file, setFile] = React.useState(null);
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleImport = (e) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const data = JSON.parse(text);
      dispatch(importJson(data));
      setOpen(false);
      setFile(null);
    };
    reader.readAsText(file);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    backgroundColor: "#292f38",
    boxShadow: 24,
    fontFamily: "Josefin Sans",
    p: 4,
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box sx={style}>
        <TextField
          onChange={handleChange}
          sx={{
            input: {
              color: "#8F8A8A",
            },
          }}
          type="file"
        />
        <Button className="filecss" onClick={handleImport} variant="contained">
          Import
        </Button>
      </Box>
    </Modal>
  );
};

export default ImportJsonModal;
