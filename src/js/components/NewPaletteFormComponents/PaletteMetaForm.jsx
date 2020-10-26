import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/styles";
import {
  ValidatorForm,
  TextValidator,
} from "react-material-ui-form-validator";
import { Picker } from "emoji-mart";

import "emoji-mart/css/emoji-mart.css";
import styles from "../../../styles/NewPaletteFormComponentStyles/PaletteMetaFormStyles";

function PaletteMetaForm(props) {
  const [state, setState] = useState({
    newPaletteName: "",
    emoji: "",
    isEmojiSelected: true,
  });

  const {
    handleSubmitPalette,
    palettes,
    totalColors,
    classes,
    changeStateOfForm,
    stateOfMetaForm,
  } = props;

  const { newPaletteName, emoji, isEmojiSelected } = state;

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

  const handleFinalSubmit = () => {
    if (!emoji.length) {
      return setState(prevState => ({
        ...prevState,
        isEmojiSelected: false,
      }));
    }
    changeStateOfForm("closed");
    handleSubmitPalette({
      paletteName: newPaletteName,
      emoji,
    });
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
    setState(prevState => ({ ...prevState, emoji: emoji.native }));
  };

  return (
    <>
      <Dialog
        open={stateOfMetaForm === "emojiForm"}
        onClose={() => stateOfMetaForm !== "emojiForm"}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Choose an Emoji</DialogTitle>
        <DialogContent>
          <Picker
            title="Pick a palette emoji"
            showPreview={true}
            onSelect={handleEmojiSelection}
            emoji={emoji.native}
            autofocus
          />

          <DialogContentText className={classes.warning}>
            {isEmojiSelected ? "" : "Please select an emoji"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <ButtonGroup
            aria-label="contained primary button group"
            disableElevation
          >
            <Button
              color="primary"
              onClick={() => changeStateOfForm("closed")}
            >
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
        open={stateOfMetaForm === "nameForm"}
        onClose={() => stateOfMetaForm !== "nameForm"}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Choose a Palette Name
        </DialogTitle>
        <ValidatorForm
          instantValidate={false}
          onSubmit={() => changeStateOfForm("emojiForm")}
          onError={errors => console.log(errors)}
        >
          <DialogContent>
            <DialogContentText className={classes.dialog}>
              Please enter a name for this new palette. It has to be a
              unique palette name!
            </DialogContentText>
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
          </DialogContent>
          <DialogActions>
            <ButtonGroup
              aria-label="contained primary button group"
              disableElevation
            >
              <Button
                color="primary"
                onClick={() => changeStateOfForm("closed")}
              >
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
