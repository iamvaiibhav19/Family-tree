import React, { useEffect } from "react";
import { TreeView } from "@mui/lab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { TreeItem } from "@mui/lab";
import FolderIcon from "@mui/icons-material/Folder";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentByNodeId } from "../../slice/familyTreeSlice";
import "./style.css";

const TreeViewComponent = () => {
  const familyTree = useSelector((state) => state.familyTree.data);
  const searchData = useSelector((state) => state.familyTree.searchData);
  const importedData = useSelector((state) => state.familyTree.importedData);

  const familyTreeArray = searchData
    ? [searchData]
    : importedData
    ? [importedData]
    : [familyTree];
  const dispatch = useDispatch();

  useEffect(() => {}, [familyTree]);

  const labelForTreeItem = (name) => {
    return (
      <div>
        <FolderIcon
          sx={{
            mr: 1,
            width: 22,
            height: 22,
            color: "rgb(255, 210, 48)",
            verticalAlign: "middle",
          }}
        />
        {name}
      </div>
    );
  };

  const handleClick = (e, nodeId) => {
    dispatch(getCurrentByNodeId(nodeId));
  };

  return (
    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      className="tree-view">
      {familyTreeArray.map((node) => (
        <TreeItem
          onClick={(e) => handleClick(e, node.uniqueId)}
          key={node.uniqueId}
          nodeId={node.uniqueId}
          label={labelForTreeItem(node.name)}>
          {node.children && node.children.length > 0 ? (
            node.children.map((child) => (
              <TreeItem
                onClick={(e) => handleClick(e, child.uniqueId)}
                key={child.uniqueId}
                nodeId={child.uniqueId}
                label={labelForTreeItem(child.name)}>
                {child.children && child.children.length > 0 ? (
                  child.children.map((grandChild) => (
                    <TreeItem
                      onClick={(e) => handleClick(e, grandChild.uniqueId)}
                      key={grandChild.uniqueId}
                      nodeId={grandChild.uniqueId}
                      label={labelForTreeItem(grandChild.name)}
                    />
                  ))
                ) : (
                  <TreeItem
                    onClick={(e) => handleClick(e, child.uniqueId)}
                    key={child.uniqueId}
                    nodeId={child.uniqueId}
                    label={labelForTreeItem(child.name)}
                  />
                )}
              </TreeItem>
            ))
          ) : (
            <TreeItem
              onClick={(e) => handleClick(e, node.uniqueId)}
              key={node.uniqueId}
              nodeId={node.uniqueId}
              label={labelForTreeItem(node.name)}
            />
          )}
        </TreeItem>
      ))}
    </TreeView>
  );
};

export default TreeViewComponent;
