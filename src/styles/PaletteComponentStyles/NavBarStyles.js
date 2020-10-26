import sizes from "../mediaQueries";
export default {
  root: {
    display: " flex",
    alignItems: " center",
    justifyContent: "flex-start",
    height: "6%",
    backgroundColor: " white",
  },
  logo: {
    height: "100%",
    padding: "0px 20px",
    margin: "auto 0",
    marginRight: " 15px",
    backgroundColor: "#eceff1",
    fontSize: " 22px",
    fontFamily: '"Roboto", sans-serif',
    display: " flex",
    alignItems: " center",
    "& a": {
      textDecoration: "none",
      color: "black",
    },
  },
  slider: {
    width: " 340px",
    margin: "0 10px",
    display: "inline-block",
    "& .rc-slider-track": {
      backgroundColor: "transparent",
      height: "8px",
    },
    "& .rc-slider-handle": {
      backgroundColor: " green",
      outline: " none",
      border: "2px solid green",
      boxShadow: " none",
      width: " 14px",
      height: " 14px",
    },

    [sizes.down("md")]: {
      width: "270px",
    },
    [sizes.down("xs")]: {
      width: "150px",
    },
  },
  selectContainer: {
    marginLeft: "auto",
    marginRight: "10px",
  },
  levelDisplay: {
    [sizes.down("xs")]: {
      display: "none",
    },
  },
};
