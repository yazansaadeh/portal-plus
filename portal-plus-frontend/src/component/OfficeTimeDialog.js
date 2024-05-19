import React, { useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
// import { getDoctorOfficeTime } from "../store";
// import { useDispatch, useSelector } from "react-redux";

const OfficeTimeDialog = ({ open, onConfirm }) => {
  //   const dispatch = useDispatch;
  //   const { officeTime } = useSelector((state) => {
  //     return state.auth;
  //   });
  //   useEffect(() => {
  //     dispatch(getDoctorOfficeTime());
  //   }, []);
  return (
    <Dialog open={open} onClose={onConfirm}>
      <DialogContent>
        <p>ساعات الدكتور المكتبية هي 11-12</p>
        <p>ايام الدكتور المكتبية هي اثنين اربعاء</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onConfirm} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OfficeTimeDialog;
