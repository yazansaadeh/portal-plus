import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const ConfirmGenerateDialog = ({ open, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onConfirm}>
      <DialogContent>
        يرجى التأكيد على انشاء هذا ال QR لانه سوف يتم اخذ غياب جميع الطلاب الذين
        لن يقوموا بعمل مسح لهذا ال QR
      </DialogContent>
      <DialogActions>
        <Button onClick={onConfirm} color="primary">
          تأكيد
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmGenerateDialog;
