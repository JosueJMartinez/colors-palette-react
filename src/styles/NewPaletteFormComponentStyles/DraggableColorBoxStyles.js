import sizes from "../mediaQueries";
import chroma from "chroma-js";
export default {
  root: {
    width: "20%",
    height: "25%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "default",
    "&:hover $deleteIcon": {
      color: "white",
      transform: "scale(1.3)",
    },
    [sizes.down("lg")]: {
      width: "25%",
      height: "20%",
    },
    [sizes.down("md")]: {
      width: "50%",
      height: "10%",
    },
    [sizes.down("xs")]: {
      width: "100%",
      height: "5%",
    },
  },
  content: {
    height: "100%",
    width: "100%",
    margin: "0 auto",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    color: props =>
      chroma(props.color.color).luminance() < 0.08
        ? "rgba(255,255,255,0.5)"
        : "rgba(0,0,0,0.5)",
  },
  name: {
    paddingLeft: "5px",
    padding: "10px",
    fontSize: "12px",
    letterSpacing: "1px",
  },
  deleteIcon: {
    transition: "all 0.3s ease-in-out",
    cursor: "pointer",
    margin: "0 5px",
    marginBottom: "3px",
  },
};
