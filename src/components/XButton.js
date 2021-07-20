import { Button } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(0.5),
  },
}));

export default function XButton(props) {
  const classes = useStyles();
  const { text, ...others } = props;
  return (
    <Button
      variant="outlined"
      color="secondary"
      size="small"
      className={classes.button}
      {...others}
    >
      {text}
    </Button>
  );
}
