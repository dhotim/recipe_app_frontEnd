import { TextField, Button, Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import XTextField from "./XTextField";
import { useForm } from "./useForm";
import * as receipeService from "../services/recipeService";
import XButton from "./XButton";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "30ch",
  },
  longTextField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

const initialValues = {
  id: 0,
  title: "",
  description: "",
  ingredients: "",
  instructions: "",
  imageUrl: "",
  sourceUrl: "",
};

const AddRecipe = (props) => {
  const classes = useStyles();
  const { recipeToEdit } = props;
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("title" in fieldValues)
      temp.title = fieldValues.title ? "" : "Title is required";
    if ("description" in fieldValues)
      temp.description = fieldValues.description
        ? ""
        : "Description is required";
    if ("ingredients" in fieldValues)
      temp.ingredients =
        fieldValues.ingredients.length > 0 ? "" : "Ingredients are required";
    if ("instructions" in fieldValues)
      temp.instructions = fieldValues.instructions
        ? ""
        : "Instructions are required";
    setErrors({
      ...temp,
    });
    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialValues, true, validate);

  useEffect(() => {
    if (recipeToEdit != null) {
      setValues({
        ...recipeToEdit,
      });
    }
  }, [recipeToEdit, setValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      receipeService.insertRecipe(values);
      resetForm();
      props.setOpen(false);
    }
  };

  function deleteRecipe(id) {
    receipeService.deleteRecipe(id);
    props.setOpen(false);
    props.viewHome();
  }

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <XTextField
        name="title"
        label="Title"
        placeholder="Recipe Title"
        onChange={handleInputChange}
        className={classes.longTextField}
        error={errors.title}
        value={values.title}
        fullWidth
        required
      />
      <Grid>
        <XTextField
          name="description"
          label="Description"
          placeholder="Description"
          onChange={handleInputChange}
          className={classes.longTextField}
          error={errors.description}
          value={values.description}
          maxRows={5}
          fullWidth
          multiline
          required
        />
      </Grid>

      <TextField
        name="imageUrl"
        label="Image Link"
        placeholder="Paste image link here"
        onChange={handleInputChange}
        className={classes.textField}
        value={values.imageUrl}
        size="small"
        margin="dense"
        variant="outlined"
      />
      <TextField
        name="sourceUrl"
        label="Source Link"
        placeholder="Paste URL to the original recipe"
        onChange={handleInputChange}
        className={classes.textField}
        value={values.sourceUrl}
        size="small"
        margin="dense"
        variant="outlined"
      />
      <XTextField
        name="instructions"
        label="Instructions"
        placeholder="Add instructions here"
        maxRows={5}
        onChange={handleInputChange}
        className={classes.longTextField}
        error={errors.instructions}
        value={values.instructions}
        multiline
        required
        fullWidth
      />

      <Grid>
        <XTextField
          name="ingredients"
          label="Ingredients"
          placeholder="Add each Ingredient on a new line"
          maxRows={5}
          onChange={handleInputChange}
          className={classes.longTextField}
          error={errors.ingredients}
          value={values.ingredients}
          multiline
          required
          fullWidth
        />
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {recipeToEdit != null && (
          <XButton
            text="Delete"
            onClick={() => deleteRecipe(recipeToEdit.id)}
          />
        )}
        <XButton text="Close" onClick={props.setOpen} />
        <XButton text="Reset" onClick={resetForm} />

        <XButton text="Save" type="submit" />
      </Grid>
    </form>
  );
};

export default AddRecipe;
