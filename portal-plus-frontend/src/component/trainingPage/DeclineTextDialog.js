import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { checkTrainingFile } from "../../store";

const DeclineTextDialog = ({ open, onConfirm, fileName }) => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleClick = () => {
    console.log(value);
    onConfirm();
    dispatch(
      checkTrainingFile({ checkType: "false", fileName, declineText: value })
    );
    //dispatch(checkTrainingFile({ checkType: "false", fileName }));
  };
  return (
    <Dialog open={open} onClose={onConfirm}>
      <DialogContent>
        <input
          value={value}
          onChange={handleChange}
          placeholder="يرجى كتابة سبب الرفض"
          type="text"
          className="border rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClick} color="primary">
          تأكيد
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeclineTextDialog;
