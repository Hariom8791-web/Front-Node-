// Import Server Component
import React, { useState } from "react";
import { Typography, Grid, Input, Button, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MuiAlert from "@mui/material/Alert";
import DssLogo from "../../assets/img/login-logo.png";
import axios from "axios";
import { FETCH_URL } from "../../fetchIp";
import LeftLogo from "../../assets/img/Left-logo.png";
import RightLogo from "../../assets/img/Right-logo.png";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useForm } from "react-hook-form";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [uid, setUid] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // ===================== SnackBar ==================== //
  const [snackopen, setSnackOpen] = useState(false);
  const [snackmsg, setSnackMsg] = useState("");
  const [snackErrMsg, setSnackErrMsg] = useState();
  const [snackerropen, setSnackerropen] = useState(false);
  const [show, setShow] = React.useState(false);

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
  const SignSubmit = (e) => {
    const body = {
      uid: uid,
      password: password,
    };

    const LoginRequest = async () => {
      try {
        const resp = await axios.post(`${FETCH_URL}/api/user/login`, body);
        if (resp.status === 200) {
          localStorage.setItem(
            "userData",
            JSON.stringify({
              user: resp.data.user,
              token: resp.data.token,
              refreshToken: resp.data.refreshToken,
            })
          );

          localStorage.setItem("access_token", resp.data.token);
          window.dispatchEvent(new Event("storage"));
          setSnackOpen(true);
          setSnackMsg(resp.msg);
          navigate("/resistence-monitoring");
          window.location.reload();
        }
      } catch (err) {
        // Handle Error Here
        setSnackerropen(true);
        setSnackErrMsg(err.response.data.msg);
        console.error("error from Login ==> ", err);
        if (err.message === "Network Error") {
          setSnackErrMsg("Network Error. Please try after some time");
          // // console.log("SERVER IS DOWN PLEASE Try after some time..")
        }
      }
    };

    LoginRequest();
  };
  return (
    <>
      <Snackbar open={snackopen} autoHideDuration={6000} onClose={SnanbarClose}>
        <Alert onClose={SnanbarClose} severity={"success"}>
          {snackmsg}
        </Alert>
      </Snackbar>
      <Snackbar
        open={snackerropen}
        autoHideDuration={3000}
        onClose={SnackbarErrorClose}
      >
        <Alert onClose={SnackbarErrorClose} severity={"error"}>
          {snackErrMsg}
        </Alert>
      </Snackbar>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        className="login-bg "
      >
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          className="widthLR-90"
        >
          <Grid item>
            <img src={LeftLogo} alt="LeftLogo" className="nav-leftlogo" />
          </Grid>
          <Grid item>
            <Typography align="center" className="white-typo mt-20 fs-50">
             MCC BASANT NAGAR{" "}
            </Typography>
            <Typography align="center" className="white-typo  fs-30">
              Online Resistance Monitoring System
            </Typography>
          </Grid>
          <Grid item className="nav-rightlogo">
            {/* <img src={RightLogo} alt="RightLogo" className="nav-rightlogo" /> */}
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <form onSubmit={handleSubmit(SignSubmit)}>
            <Grid item className="login-box">
              <Typography className="white-typo fs-24 fw-700">Login</Typography>
              <Typography className="white-typo  fs-20  fw-700 mt-24">
                Enter UID
              </Typography>
              <Input
                id="uid"
                className={
                  errors?.Uid?.message
                    ? "  input-style-trans-warn   mt-8"
                    : " input-style-trans  mt-8"
                }
                disableUnderline
                value={uid}
                onChange={(e) => {
                  setUid(e.target.value);
                }}
                {...register("Uid", {
                  required: "Uid  is required",
                  onChange: (e) => {
                    setUid(e.target.value);
                  },
                })}
              />
              {errors?.Uid && (
                <Typography className="red-typo mt-5px" role="alert">
                  {errors?.Uid?.message}
                </Typography>
              )}
              <Typography className="white-typo  fs-20 fw-700 mt-16">
                Enter Password
              </Typography>
              <Grid container style={{ position: "relative" }}>
                <Input
                  className={
                    errors?.Password?.message
                      ? "  input-style-trans-warn   mt-8"
                      : " input-style-trans  mt-8"
                  }
                  disableUnderline
                  value={password}
                  type={show ? "text" : "password"}
                  {...register("Password", {
                    required: "password is required.",
                    onChange: (e) => {
                      setPassword(e.target.value);
                    },
                  })}
                />
                <Grid
                  style={{ right: "10px", top: "5px", position: " absolute" }}
                >
                  <Typography
                    align="right"
                    className="fs-24 white-typo mt-8"
                    onClick={() => setShow(!show)}
                  >
                    {show ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                  </Typography>{" "}
                </Grid>
                {errors?.Password && (
                  <Typography className="red-typo mt-5px" role="alert">
                    {errors?.Password?.message}
                  </Typography>
                )}{" "}
              </Grid>
              {/* <Typography
              className="width100 white-typo mt-16 "
              align="right"
              onClick={() => setShow(!show)}
            >
              Show password
            </Typography> */}
              <Button
                className="blue-bg-button  fs-20   fw-700 width100 hgt-48 mt-32"
                type="submit"
              >
                Login
              </Button>
              <Typography align="center" className="mt-32">
                {/* <img src={DssLogo} alt="DssLogo" /> */}
              </Typography>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
