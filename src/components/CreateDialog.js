import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { DialogContent } from "@material-ui/core";

const CreateDialog = (props) => {
  const { open,  data, children } = props;

  return (
    <Dialog open={open}>
      <DialogTitle>{`${data ? "Edit" : "Add"}`} Recipe</DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default CreateDialog;
