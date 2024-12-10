import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Container } from "@mui/system";

import {
  Box,
  Grid,
  List,
  Badge,
  Button,
  Avatar,
  Tooltip,
  ListItem,
  IconButton,
  Typography,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  SwipeableDrawer,
} from "@mui/material";
import Sound from "react-sound";
// Logo Images
import NavbarBgs from "../../assets/img/Navbar-bgs.png";
import LeftLogo from "../../assets/img/Left-logo.png";
import alertSound from "../../assets/sounds/alertsound.mp3";
import { FiMenu } from "react-icons/fi";
import { VscUnmute, VscMute } from "react-icons/vsc";

// Internal Import
import { FETCH_URL } from "../../fetchIp";
import RebootDialog from "./RebootDialog";
import LogoutDialog from "./LogoutDialog";
import routes from "../../routes/AdminRoutes";
import ShutDonwDialog from "./ShutDonwDialog";
import { AuthContext } from "../../context/AuthContext";

const StyledToolbar = styled(Box)(({ theme }) => ({
  backgroundImage: `url(${NavbarBgs})`,
  backgroundSize: "cover",
  // Override media queries injected by theme.mixins.toolbar
  "@media all": {
    minHeight: 260,
  },
}));

export default function ProminentAppBar() {
  // ============= userRole ============== //
  const auth = React.useContext(AuthContext);
  const { token, setToken, user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    const hasDialogBeenOpened = localStorage.getItem("welcomeDialogOpened");
    if (token && !hasDialogBeenOpened) {
      setOpen(true);

      localStorage.setItem("welcomeDialogOpened", "true");
    }
  }, [token]);

  const [reboot, setReboot] = useState(null);

  const getRebootStatus = async () => {
    const response = await fetch(`${FETCH_URL}/api/device/reboot`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    let res = await response.json();
    if (response.ok) {
      // // console.log(" getRebootStatus resp ===> ", res.msg);
      setReboot(res.msg);
    } else {
      // // console.log("Error in getRebootStatus ==> ", res);
    }
  };
  const [shutdown, setShutDown] = useState(null);
  const getShutdownStatus = async () => {
    const response = await fetch(`${FETCH_URL}/api/device/shutdown`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    let res = await response.json();
    if (response.ok) {
      setShutDown(res.msg);
    }
  };
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("userData");
    localStorage.removeItem("welcomeDialogOpened");
    localStorage.clear();
    window.location.reload();
  };
  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 270,
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <ListItemButton
        sx={{
          padding: "0px",
          borderTop: "2px solid #ddd",
          borderBottom: "2px solid #ddd",
        }}
      >
        <ListItemIcon className="sidebar-icon  text-capitalize pl-6 ">
          <Avatar sx={{ bgcolor: " #fff" }}>
            <span className="blue-typo ">{user?.fullName?.slice("a")[0]} </span>
          </Avatar>
        </ListItemIcon>

        <ListItemText className="sidebar-text pl-6 ">
          <Typography className="fs-14  heading-white   text-capitalize ">
            {user?.fullName}
          </Typography>
          <Typography className="fs-14  heading-white   text-capitalize ">
            #{user?.uid}
          </Typography>
        </ListItemText>
      </ListItemButton>
      <List>
        {routes?.map((route, index) => {
          if (route.invisible === false) {
            return (
              <>
                {auth.user.role === 2 && route.name !== "User Management" ? (
                  <ListItem
                    key={route}
                    disablePadding
                    component={Link}
                    to={route.link}
                  >
                    <ListItemButton>
                      <ListItemIcon className="sidebar-icon">
                        <img src={route.icon} />
                      </ListItemIcon>
                      <ListItemText className="sidebar-text">
                        {route.name}
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                ) : null}
                {auth.user.role === 0 || auth.user.role === 1 ? (
                  <ListItem
                    key={route}
                    disablePadding
                    component={Link}
                    to={route.link}
                  >
                    <ListItemButton className="p-7">
                      <ListItemIcon className="sidebar-icon">
                        <img src={route.icon} />{" "}
                      </ListItemIcon>
                      <ListItemText className="sidebar-text">
                        {route.name}
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                ) : null}
              </>
            );
          }
        })}{" "}
      </List>
    </Box>
  );

  const [alarmStatus, setAlarmStatus] = useState({
    status: false,
    sound: false,
  });

  const toggleAlarmStatus = async (newStatus) => {
    setAlarmStatus({
      status: newStatus,
      sound: newStatus ? true : alarmStatus.sound, // Keep sound as true when enabling alarm
    });
  };
  const handleNotificationClick = () => {
    navigate("/alarm");
  };
  return (
    <>
      <StyledToolbar>
        <Container maxWidth="xl">
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            className="widthLR-90 "
            style={{ paddingTop: "42px" }}
          >
            <Grid item>
              <img src={LeftLogo} alt="LeftLogo" className="nav-leftlogo" />
            </Grid>
            <Grid item>
              <Typography align="center" className="blue-typo mt-20 fs-50">
                MCC Basant Nagar{" "}
              </Typography>
              <Typography align="center" className="blue-typo  fs-30">
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
            justifyContent="flex-end"
            alignItems="center"
            className="widthLR-90"
            style={{ marginTop: "51px", width: "100%" }}
          >
            {["right"].map((anchor) => (
              <React.Fragment key={anchor}>
                <Grid item>
                  {alarmStatus?.status ? (
                    <>
                      {alarmStatus?.sound && (
                        <Sound
                          url={alertSound}
                          playStatus={Sound.status.PLAYING}
                          playFromPosition={300}
                          loop={true}
                        />
                      )}
                      <Tooltip title="Mute" arrow>
                        <IconButton
                          onClick={() => {
                            toggleAlarmStatus(false);
                          }}
                        >
                          <VscUnmute color="red" />
                        </IconButton>
                      </Tooltip>
                    </>
                  ) : (
                    <>
                      <Tooltip title="Unmute" arrow>
                        <IconButton
                          onClick={() => {
                            toggleAlarmStatus(true);
                          }}
                        >
                          <VscMute />
                        </IconButton>
                      </Tooltip>
                    </>
                  )}
                </Grid>
                {/* Sidebar */}
                <Button onClick={toggleDrawer(anchor, true)}>
                  <FiMenu className="hamburger-menu" />
                </Button>
                <SwipeableDrawer
                  sx={{
                    flexShrink: 0,
                    // zIndex: 9999,
                    "& .MuiDrawer-paper": {
                      boxSizing: "border-box",
                      background: " #044a70",
                    },
                  }}
                  anchor={anchor}
                  open={state[anchor]}
                  onClose={toggleDrawer(anchor, false)}
                  onOpen={toggleDrawer(anchor, true)}
                >
                  {list(anchor)}
                  {auth.user.role === 0 || auth.user.role === 1 ? (
                    <>
                      <ListItem disablePadding>
                        <ListItemButton>
                          <RebootDialog getRebootStatus={getRebootStatus} />
                        </ListItemButton>
                      </ListItem>

                      <ListItem disablePadding>
                        <ListItemButton>
                          <ShutDonwDialog
                            getShutdownStatus={getShutdownStatus}
                          />
                        </ListItemButton>
                      </ListItem>
                    </>
                  ) : null}
                  <ListItem
                    style={{
                      position: "absolute",
                      bottom: "0",
                      cursor: "pointer",
                      marginTop: "20px",
                    }}
                  >
                    <LogoutDialog logout={logout} />
                  </ListItem>
                </SwipeableDrawer>
              </React.Fragment>
            ))}
          </Grid>
        </Container>
      </StyledToolbar>
    </>
  );
}
