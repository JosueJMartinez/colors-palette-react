import React, { useEffect, useState } from "react";

import Button from "@material-ui/core/Button";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  ValidatorForm,
  TextValidator,
} from "react-material-ui-form-validator";
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
    <div>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        className={classes.nameDialogForm}
      >
        <DialogTitle id="form-dialog-title">
          Please enter a name
        </DialogTitle>
        <ValidatorForm
          instantValidate={false}
          onSubmit={handleSubmitName}
          className={classes.paletteNameForm}
          onError={errors => console.log(errors)}
        >
          <DialogContent>
            <DialogContentText>
              <TextValidator
                label="Palette Name"
                onChange={handleNameChange}
                name="newPaletteName"
                value={newPaletteName}
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
          </DialogContent>
          <DialogActions>
            <Button type="submit" color="primary">
              Save Name
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </div>
  );
}

export default withStyles(styles)(PaletteMetaForm);
