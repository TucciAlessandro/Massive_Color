import React from "react";
import { SortableElement } from "react-sortable-hoc";
import { withStyles } from "@material-ui/styles";
import DeleteIcon from "@material-ui/icons/Delete";

import styles from "../styles/DraggableColorBoxStyles";

const DraggableColorBox = SortableElement((props) => {
  const { root, boxContent, deleteIcon } = props.classes;
  const { color, name, handleClick } = props;
  return (
    <div className={root} style={{ backgroundColor: color }}>
      <div className={boxContent}>
        <span>{name}</span>
        <span>
          <DeleteIcon className={deleteIcon} onClick={handleClick} />
        </span>
      </div>
    </div>
  );
});

export default withStyles(styles)(DraggableColorBox);
