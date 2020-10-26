export default {
  root: {},
  nav: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignContent: "center",
    padding: "20px 0",
    textAlign: "center",
    "& h1": {
      margin: "0px",
      fontSize: "2rem",
    },
  },
  create: {
    color: "white",
    fontSize: "1rem",
    textDecoration: "none",
    "&:hover": {
      color: "blue",
    },
  },
  "@global": {
    ".transition-exit": {
      opacity: "1",
    },
    ".transition-exit-active": {
      opacity: "0",
      transition: "opacity 500ms ease-in",
    },
  },
};
