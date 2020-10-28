import React, { useEffect, useState } from "react";
import { ChromePicker } from "react-color";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {
  ValidatorForm,
  TextValidator,
} from "react-material-ui-form-validator";
import clsx from "clsx";

import styles from "../../../styles/NewPaletteFormComponentStyles/NewColorPickerFormStyles";

function NewColorPickerForm(props) {
  const [state, setState] = useState({
    currentColor: "#0000FF",
    newColorName: "",
  });
  const { classes, isFull, addColor, paletteColors, isGrabbing } = props;
  const { currentColor, newColorName } = state;

  useEffect(() => {
    ValidatorForm.addValidationRule("isColorNameUnique", value =>
      paletteColors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      )
    );

    ValidatorForm.addValidationRule("isColorUnique", () =>
      paletteColors.every(({ color }) => currentColor !== color)
    );
    return () => {
      ValidatorForm.removeValidationRule("isColorNameUnique");
      ValidatorForm.removeValidationRule("isColorUnique");
    };
  });

  useEffect(() => {
    setState({ currentColor: "#0000FF", newColorName: "" });
  }, [paletteColors]);

  const handleChangeComplete = color => {
    setState(prevState => ({
      ...prevState,
      currentColor: color.hex,
    }));
  };
  const handleNameChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleAddColorSubmit = e => {
    addColor({ color: currentColor, name: newColorName });
  };

  return (
    <div className={classes.root}>
      <ChromePicker
        // disableAlpha
        className={clsx(classes.picker, classes.isGrabbing)}
        color={currentColor}
        onChangeComplete={handleChangeComplete}
      />
      <ValidatorForm
        instantValidate={false}
        onSubmit={handleAddColorSubmit}
        className={classes.formContent}
        onError={errors => console.log(errors)}
      >
        <TextValidator
          className={clsx(classes.textInput, classes.isGrabbing)}
          variant="filled"
          label="Name"
          onChange={handleNameChange}
          name="newColorName"
          value={newColorName}
          validators={["required", "isColorNameUnique", "isColorUnique"]}
          errorMessages={[
            "this field is required",
            "color name in use already",
            "color is already in use",
          ]}
        />
        <Button
          type="submit"
          className={clsx(classes.btn, classes.isGrabbing)}
          variant="contained"
          color="primary"
          style={{
            backgroundColor: isFull ? "grey" : currentColor,
          }}
          disabled={isFull}
        >
          {isFull ? "Palette Full" : "Add Color"}
        </Button>
      </ValidatorForm>
    </div>
  );
}

export default withStyles(styles)(NewColorPickerForm);
