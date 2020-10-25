import sizes from "./mediaQueries";
export default {
  root: {
    width: "20%",
    height: props =>
      props.isBackBox || props.isRegPalette ? "50%" : "25%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    "&:hover $copy-button": {
      opacity: 1,
    },
    [sizes.down("lg")]: {
      width: "25%",
      height: props =>
        props.isBackBox || props.isRegPalette ? "33.3%" : "20%",
    },
    [sizes.down("md")]: {
      width: "50%",
      height: props =>
        props.isBackBox || props.isRegPalette ? "20%" : "10%",
    },
    [sizes.down("xs")]: {
      width: "100%",
      height: props =>
        props.isBackBox || props.isRegPalette ? "10%" : "5%",
    },
  },
  "copy-button": {
    width: "100px",
    height: "30px",
    position: "absolute",
    display: "inline-block",
    top: "50%",
    left: "50%",
    marginLeft: "-50px",
    marginTop: "-15px",
    textAlign: "center",
    outline: "none",
    border: "none",
    fontSize: "1rem",
    lineHeight: "20px",
    color: "white",
    opacity: "0",
    cursor: "pointer",
    transition: "0.5s",
    textTransform: "uppercase",
  },
  "copy-container": {
    width: "100%",
    height: "100%",
  },
  "height-lvl-palette": {
    height: "50%",
  },
  "copy-overlay": {
    opacity: "0",
    zIndex: "0",
    width: "100%",
    height: "100%",
    position: "absolute",
    transition: "transform .6s ease-in-out",
    transform: "scale(0.6)",
  },
  show: {
    opacity: "1",
    transform: "scale(52)",
    zIndex: "10",
  },
  content: {
    margin: "0 auto",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  "more-link": {
    padding: "0 5px",
    color: "white",
    width: "60px",
    height: "30px",
    textAlign: "center",
    lineHeight: "30px",
    textDecoration: "none",
  },
  "dark-background": {
    backgroundColor: props =>
      !props.isBackBox && props.isBackgroundColorDark(props.type)
        ? "#00000084"
        : "#ffffff34",
  },
  "color-name": {
    paddingLeft: "5px",
    padding: "10px",
    fontSize: "12px",
    letterSpacing: "1px",
    color: props =>
      !props.isBackBox && props.isFontColorDark(props.type)
        ? "white"
        : "black",
    [sizes.down("sm")]: {
      padding: "0 0 0 10px",
      marginBottom: "0px",
    },
    margin: "-2px",
  },
  "margin-back": {
    marginTop: "-30px",
  },
  back: {
    width: "100px",
    height: "30px",
    position: "absolute",
    display: "inline-block",
    top: "50%",
    left: "50%",
    marginLeft: "-50px",
    textAlign: "center",
    outline: "none",
    border: "none",
    background: "#000000",
    fontSize: "1rem",
    lineHeight: "30px",
    color: "white",
    opacity: "1",
    cursor: "pointer",
    transition: "0.5s",
    textTransform: "uppercase",
    textDecoration: "none",
    "&:hover $back": {
      backgroundColor: "grey",
    },
  },

  "default-pointer": {
    cursor: "default !important",
  },
};
