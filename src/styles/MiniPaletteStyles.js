export default {
  root: {
    padding: "6px !important",
  },
  card: {
    backgroundColor: "white",
    borderRadius: "5px",
    padding: "0.5rem",
    "&:hover": {
      cursor: "pointer",
    },
  },
  colors: {
    display: "flex",
    flexWrap: "wrap",
    alignContent: "flex-start",
    height: "150px",
    width: "100%",
    borderRadius: "5px !important",
    backgroundColor: "grey",
    overflow: "hidden",
  },
  color: {
    height: "25%",
    width: "20%",
  },
  "div.color :first-child": {
    color: "red",
  },
  title: {
    display: "flex",
    justifyContent: "space-between",
    margin: "0",
    paddingTop: "0.5rem",
  },
  link: {
    textDecoration: "none",
    fontSize: ".75rem",
    color: "#000000",
  },
  emoji: {
    fontSize: "1rem",
    lineHeight: "15px",
    textShadow: "1px 2px black",
  },
};
