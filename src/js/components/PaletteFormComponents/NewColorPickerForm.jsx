import React, { useEffect, useState } from "react";
import { ChromePicker } from "react-color";
import Button from "@material-ui/core/Button";
import {
  ValidatorForm,
  TextValidator,
} from "react-material-ui-form-validator";

export default function NewColorPickerForm(props) {
  const [state, setState] = useState({
    currentColor: "#0000FF",
    newColorName: "",
  });
  const { classes, isFull, addColor, paletteColors } = props;
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

  const handleChangeComplete = color => {
    setState(prevState => ({
      ...prevState,
      currentColor: color.hex,
      newColorName: "",
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
    setState({ newColorName: "", currentColor: "#0000FF" });
  };

  return (
    <>
      <ChromePicker
        disableAlpha
        className={classes.formContent}
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
          className={classes.formContent}
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
          className={classes.formContent}
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
    </>
  );
}
