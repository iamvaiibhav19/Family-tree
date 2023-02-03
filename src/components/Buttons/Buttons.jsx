import { Box, TextField } from "@mui/material";
import React from "react";
import { Button } from "@mui/material";
import AddDetailsModal from "../Modals/AddDetailsModal";
import { useDispatch, useSelector } from "react-redux";
import ImportJsonModal from "../Modals/ImportJsonModal";
import jsPDF from "jspdf";
import "./style.css";

const Buttons = () => {
  const familyTreeData = useSelector((state) => state.familyTree.data);

  const currentSelected = useSelector(
    (state) => state.familyTree.currentSelected
  );

  const [open, setOpen] = React.useState(false);
  const [openImport, setOpenImport] = React.useState(false);

  const printFamilyTree = (data) => {
    // console.log(data, "data");
    const doc = new jsPDF();
    const printNode = (node, x, y) => {
      doc.text(node?.name, x, y);
      if (node?.children?.length > 0) {
        node?.children?.forEach((child, i) => {
          const childX = x + 30;
          const childY = y + (i + 1) * 20;
          doc.line(x, y + 1, childX, childY - 5);
          printNode(child, childX, childY);
        });
      }
    };
    printNode(data, 10, 10);
    doc.save("family-tree.pdf");
  };

  const handleExport = () => {
    const dataAsJson = currentSelected?.name
      ? JSON.stringify(currentSelected)
      : JSON.stringify(familyTreeData);
    const blob = new Blob([dataAsJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "data.json";
    link.href = url;
    link.click();
  };

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <Box className="box-container">
      <Button
        variant="contained"
        onClick={() => setOpenImport(true)}
        className="xyz">
        Import Json
      </Button>
      <Button variant="contained" onClick={handleExport} className="xyz">
        Export Json
      </Button>
      <Button variant="contained" onClick={handleOpen} className="xyz">
        Add Family
      </Button>
      <Button
        variant="contained"
        onClick={() =>
          printFamilyTree(
            currentSelected?.name ? currentSelected : familyTreeData
          )
        }
        className="xyz">
        Print Family
      </Button>
      <AddDetailsModal open={open} setOpen={setOpen} />
      <ImportJsonModal open={openImport} setOpen={setOpenImport} />
    </Box>
  );
};

export default Buttons;
