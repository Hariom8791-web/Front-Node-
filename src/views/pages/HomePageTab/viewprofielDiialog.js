import React, { useState, useEffect } from "react";
import {
  Grid,
  Backdrop,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Box,
  IconButton,
  Typography,
  Tooltip,
  Snackbar,
  Input,
  TextField,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";

import PropTypes from "prop-types";
import { FETCH_URL } from "../../../fetchIp";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

//React Icons

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle className="dialog-title-add" sx={{ m: 0, p: 1.2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          className="dialogcrossicon-white"
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function MaxWidthDialog({ sensorValue, deviceID2 }) {
  const [open, setOpen] = React.useState(false);
  const [fullWidth] = React.useState(true);
  const [maxWidth] = React.useState("lg");
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [siteName, setSiteName] = useState(null);
  const [inputState, setInputState] = useState(true);
  const [deviceName, setDeviceName] = useState(null);
  const [nodeUid, setNodeUid] = useState(null);
  const [vmrSensors, setVmrSensors] = useState(null);
  const [resSensors, setResSensors] = useState(null);
  const [spdSensors, setSpdSensors] = useState(null);
  const [nerSensors, setNerSensors] = useState(null);
  const [resSensorsThreshold, setResSensorsThreshold] = useState(null);
  const [spdSensorsThreshold, setSpdSensorsThreshold] = useState(null);
  const [nerSensorsThreshold, setNerSensorsThreshold] = useState(null);
  const [vmrSensorsThreshold, setVmrSensorsThreshold] = useState({
    r: "",
    y: " ",
    b: "",
    rY: "",
    Yb: "",
    rb: "",
  });

  const handleChangesetR = (event) => {
    setVmrSensorsThreshold((data) => ({
      ...data,
      [event.target.name]: event.target.value,
    }));
  };
  // SnackBar
  const [snackopen, setSnackOpen] = useState(false);
  const [snackmsg, setSnackMsg] = useState("");
  const [snackErrMsg, setSnackErrMsg] = useState();
  const [snackerropen, setSnackerropen] = useState(false);

  const SnanbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackOpen(false);
    setSnackMsg("");
  };

  const SnackbarErrorClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackerropen(false);
    setSnackErrMsg("");
  };

  useEffect(() => {
    if (sensorValue) {
      setSiteName(sensorValue?.siteId?.siteName);
      setDeviceName(sensorValue?.deviceName);
      setVmrSensors(sensorValue?.vmrSensors);
      setNodeUid(sensorValue?.nodeUid);
      // setVmrSensorsThreshold(sensorValue?.vmrSensors?.vmrSensorsThreshold);'
      setResSensors(sensorValue?.resSensors);
      setResSensorsThreshold(sensorValue?.resSensorsThreshold);
      setSpdSensors(sensorValue?.spdSensors);
      setSpdSensorsThreshold(sensorValue?.spdSensorsThreshold);
      setNerSensors(sensorValue?.nerSensors);
      setNerSensorsThreshold(sensorValue?.nerSensorsThreshold);
    }
  }, [sensorValue]);

  return (
    <React.Fragment>
      <Snackbar open={snackopen} autoHideDuration={3000} onClose={SnanbarClose}>
        <Alert onClose={SnanbarClose} severity={"success"}>
          {snackmsg}
        </Alert>
      </Snackbar>
      <Snackbar
        open={snackerropen}
        autoHideDuration={8000}
        onClose={SnackbarErrorClose}
      >
        <Alert onClose={SnackbarErrorClose} severity={"error"}>
          {snackErrMsg}
        </Alert>
      </Snackbar>

      <span onClick={handleClickOpen} className="hover-sky">
        {" "}
        (View profile){" "}
      </span>
      <BootstrapDialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
        PaperProps={{
          className: "SmallDialog",
        }}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {inputState ? (
            <Typography className="white-typo">Device Profile</Typography>
          ) : (
            <Typography className="white-typo"> Edit Profile</Typography>
          )}
        </BootstrapDialogTitle>
        <DialogContent className="mt-16" sx={{ marginBottom: "20px" }}>
          <Grid container justifyContent="space-between">
            <Grid item md={5.8}>
              <Typography className="heading-black mt-16">Site Name</Typography>
              <Typography className="input-style-typo mt-12 width100">
                {sensorValue?.siteId?.siteName}
              </Typography>
            </Grid>
            <Grid item md={5.8}>
              <Typography className="heading-black mt-16">Site UID</Typography>
              <Typography className="input-style-typo mt-12 width97">
                {sensorValue?.siteId?.uid}
              </Typography>
            </Grid>
            <Grid item md={5.8}>
              <Typography className="heading-black mt-12">
                Device Name
              </Typography>
              <Typography className="input-style-typo mt-12 width100">
                {deviceName}
              </Typography>
            </Grid>
            <Grid item md={5.8}>
              <Typography className="heading-black mt-12">Node UID</Typography>
              <Typography className="input-style-typo mt-12 width97">
                {nodeUid}
              </Typography>
            </Grid>
            <Grid item md={5.8}>
              <Typography className="heading-black mt-12">
                Phase Sensors
              </Typography>
              <Typography className="input-style-typo mt-12 width100">
                {vmrSensors}
              </Typography>
            </Grid>
            <Grid item md={5.8}>
              <Typography className="heading-black mt-12">
                Phase Sensor Threshold{" "}
              </Typography>
              <Grid
                container
                justifyContent="space-between"
                sx={{ width: "98.5%" }}
              >
                <Grid item md={1.4}>
                  <TextField
                    className=" mt-4 width100  text-field-disable"
                    id="outlined-basic"
                    type="number"
                    label="R"
                    name="r"
                    disabled
                    value={sensorValue?.vmrSensorsThreshold?.r}
                    onChange={handleChangesetR}
                  />
                </Grid>

                <Grid item md={1.4}>
                  <TextField
                    className=" mt-4 width100  text-field-disable"
                    id="outlined-basic"
                    type="number"
                    label="Y"
                    name="y"
                    disabled
                    value={sensorValue?.vmrSensorsThreshold?.y}
                    onChange={handleChangesetR}
                  />
                </Grid>
                <Grid item md={1.4}>
                  <TextField
                    className=" mt-4 width100 text-field-disable"
                    id="outlined-basic"
                    type="number"
                    label="B"
                    name="b"
                    disabled
                    onChange={handleChangesetR}
                    value={sensorValue?.vmrSensorsThreshold?.b}
                  />
                </Grid>
                <Grid item md={1.4}>
                  <TextField
                    className=" mt-4 width100  text-field-disable"
                    id="outlined-basic"
                    type="number"
                    label="RY"
                    name="ry"
                    disabled
                    onChange={handleChangesetR}
                    value={sensorValue?.vmrSensorsThreshold?.ry}
                  />
                </Grid>

                <Grid item md={1.4}>
                  <TextField
                    className=" mt-4 width100  text-field-disable"
                    id="outlined-basic"
                    type="number"
                    label="YB"
                    name="Yb"
                    disabled
                    onChange={handleChangesetR}
                    value={sensorValue?.vmrSensorsThreshold?.yb}
                  />
                </Grid>
                <Grid item md={1.4}>
                  <TextField
                    className=" mt-4 width100  text-field-disable"
                    id="outlined-basic"
                    type="number"
                    label="RB"
                    name="rb"
                    disabled
                    onChange={handleChangesetR}
                    value={sensorValue?.vmrSensorsThreshold?.rb}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={5.8}>
              <Typography className="heading-black mt-12">
                SPD Sesnors
              </Typography>
              <Typography className="input-style-typo mt-12 width100">
                {spdSensors}
              </Typography>
            </Grid>
            <Grid item md={5.8}>
              <Typography className="heading-black mt-12">
                SPD Sensor Threshold
              </Typography>
              <Typography className="input-style-typo mt-12 width98">
                {spdSensorsThreshold}
              </Typography>
            </Grid>

            <Grid item md={5.8}>
              <Typography className="heading-black mt-12">
                RES Sensors
              </Typography>
              <Typography className="input-style-typo mt-12 width100">
                {resSensors}
              </Typography>
            </Grid>
            <Grid item md={5.8}>
              <Typography className="heading-black mt-12">
                RES Sensor Threshold
              </Typography>
              <Typography className="input-style-typo mt-12 width98">
                {resSensorsThreshold}
              </Typography>
            </Grid>

            <Grid item md={5.8}>
              <Typography className="heading-black mt-12">
                GN Sensors
              </Typography>
              <Typography className="input-style-typo mt-12 width100">
                {nerSensors}
              </Typography>
            </Grid>
            <Grid item md={5.8}>
              <Typography className="heading-black mt-12">
                GN Sensor Threshold
              </Typography>
              <Typography className="input-style-typo mt-12 width98">
                {nerSensorsThreshold}
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}