import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function SimpleMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { name, userId } = useSelector((state) => {
    return state.auth;
  });

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    setAnchorEl(null);
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className={classes.root}>
      <div
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <RiArrowDropDownLine className="text-3xl text-white" />
      </div>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>{name}</MenuItem>
        <MenuItem onClick={handleClose}>
          <span style={{ direction: "ltr" }}>{userId}@std.hu.edu.jo</span>
        </MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
