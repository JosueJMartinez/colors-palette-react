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
  const [state, setState] = useState({ newPaletteName: "", emoji: "" });
  const {
    isPaletteNameOpen,
    isEmojiOpen,
    handleClose,
    handleEmojiOpen,
    handleSubmitPalette,
    palettes,
    totalColors,
  } = props;
  const { newPaletteName, emoji } = state;

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
    handleEmojiOpen();
  };

  const handleFinalSubmit = () => {
    handleClose();
    handleSubmitPalette({ paletteName: newPaletteName, emoji });
  };

  const handleNameChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEmojiSelection = emoji => {
    console.log(`i am selecting ${emoji.native}`);
    setState(prevState => ({ ...prevState, emoji: emoji.native }));
  };
  return (
    <>
      <Dialog
        open={isEmojiOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Choose an Emoji</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Picker onSelect={handleEmojiSelection} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <ButtonGroup
            aria-label="contained primary button group"
            disableElevation
          >
            <Button color="primary" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleFinalSubmit}
            >
              Save!
            </Button>
          </ButtonGroup>
        </DialogActions>
      </Dialog>
      <Dialog
        open={isPaletteNameOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
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
              Please enter a name for this new palette. It has to be a
              unique palette name!
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
          </DialogContent>
          <DialogActions>
            <ButtonGroup
              aria-label="contained primary button group"
              disableElevation
            >
              <Button color="primary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="contained" color="primary" type="submit">
                Next
              </Button>
            </ButtonGroup>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </>
  );
}

export default withStyles(styles)(PaletteMetaForm);
