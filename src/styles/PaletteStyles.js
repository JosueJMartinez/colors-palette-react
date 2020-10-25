import sizes from "./mediaQueries";
export default {
  root: {
    height: "100vh",
  },
  paletteColors: {
    height: "90%",
    textTransform: "uppercase",
  },
  copyOverlayText: {
    width: "100%",
    height: "100%",
    left: "0",
    right: "0",
    top: "0",
    bottom: "0",
    position: "fixed",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    fontSize: "4rem",
    transform: "scale(0.1)",
    color: "white",
    opacity: "0",
    "& p": {
      fontSize: "2rem",
      fontWeight: "100",
      color: "black",
    },
    "& $lightText": {
      color: "white",
    },
    [sizes.down("md")]: {
      fontSize: "3rem",
      "& p": { fontSize: "1.5rem" },
    },
    [sizes.down("xs")]: {
      fontSize: "2rem",
      "& p": { fontSize: "1rem" },
    },
  },
  show: {
    opacity: "1",
    transform: "scale(1)",
    zIndex: "14",
    transition: "all 0.1s ease-in-out",
    transitionDelay: "0.3s",
    "& h1": {
      fontWeight: "400",
      textShadow: "1px 2px black",
      background: "#ffffff2d",
      width: "100%",
      textAlign: "center",
      marginBottom: "0px",
      padding: "1rem",
    },
    "& $darkBackground": {
      background: "#00000084",
    },
  },
  darkBackground: {},
  lightText: {},
};
