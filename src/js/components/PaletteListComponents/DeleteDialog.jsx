import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  ValidatorForm,
  TextValidator,
} from "react-material-ui-form-validator";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import { withStyles } from "@material-ui/styles";
import styles from "../../../styles/PaletteMetaFormStyles";

export default function DeleteDialog(props) {
  const {
    closeDelete,
    isDeleteDialogOpen,
    potentialDeleteID,
    removePalette,
  } = props;

  const handleDeleteClick = () => {
    removePalette(potentialDeleteID);
    closeDelete();
  };

  return (
    <Dialog
      open={isDeleteDialogOpen}
      // onClose={closeDelete}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Delete Palette</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete palette?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <ButtonGroup
          aria-label="contained primary button group"
          disableElevation
        >
          <Button color="primary" onClick={closeDelete}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleDeleteClick}
          >
            Delete
          </Button>
        </ButtonGroup>
      </DialogActions>
    </Dialog>
  );
}
