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
// import styles from "../../../styles/PaletteFormNavStyles";

const styles = {};

function PaletteMetaForm(props) {
  const [state, setState] = useState({ newPaletteName: "" });
  const {
    isOpen,
    handleClose,
    classes,
    handleSubmitPalette,
    palettes,
    totalColors,
  } = props;
  const { newPaletteName } = state;

  useEffect(() => {
    ValidatorForm.addValidationRule("isPaletteNameUnique", value =>
      palettes.every(
        ({ paletteName }) =>
          value.toLowerCase() !== paletteName.toLocaleLowerCase()
      )
    );

    ValidatorForm.addValidationRule(
      "isPaletteNotEmpty",
      () => totalColors > 0
    );
    return () => {
      ValidatorForm.removeValidationRule("isPaletteNameUnique");
      ValidatorForm.removeValidationRule("isPaletteNotEmpty");
    };
  });

  const handleSubmitName = () => {
    handleClose();
    handleSubmitPalette(newPaletteName);
  };

  const handleNameChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      className={classes.nameDialogForm}
    >
      <DialogTitle id="form-dialog-title">
        Choose a Palette Name
      </DialogTitle>
      <ValidatorForm
        instantValidate={false}
        onSubmit={handleSubmitName}
        onError={errors => console.log(errors)}
      >
        <DialogContent>
          <DialogContentText>
            Please enter a name for this new palette. It has to be a unique
            palette name!
            <TextValidator
              label="Palette Name"
              onChange={handleNameChange}
              name="newPaletteName"
              value={newPaletteName}
              fullWidth
              margin="normal"
              validators={[
                "required",
                "isPaletteNameUnique",
                "isPaletteNotEmpty",
              ]}
              errorMessages={[
                "this field is required",
                "Already a palette with this name",
                "Palette at least needs one color",
              ]}
            />
          </DialogContentText>
          <Picker />
        </DialogContent>
        <DialogActions>
          <ButtonGroup
            // className={classes.formContent}
            aria-label="contained primary button group"
            disableElevation
          >
            <Button color="primary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Save Name
            </Button>
          </ButtonGroup>
        </DialogActions>
      </ValidatorForm>
    </Dialog>
  );
}

export default withStyles(styles)(PaletteMetaForm);
