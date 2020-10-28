import sizes from "../mediaQueries";

export default function styles(theme, drawerWidth) {
  return {
    root: { display: "flex" },
    appBar: {
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      height: "64px",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: "none",
    },
    appBarBtns: {
      marginRight: "1rem",
      [sizes.down("md")]: {
        marginRight: "0.5rem",
        marginLeft: "0.5rem",
      },
      "& button": {
        [sizes.down("md")]: {
          fontSize: "0.7rem",
          padding: "0.4rem",
        },
      },
    },
    logo: {
      textDecoration: "none",
      color: "inherit",
    },
    toolBar: {
      [sizes.down("md")]: {
        paddingLeft: "10px",
        paddingRight: "10px",
      },
      [sizes.down("xs")]: {
        paddingLeft: "6px",
        paddingRight: "6px",
      },
    },
    isGrabbing: {
      cursor: ({ isGrabbing }) => (isGrabbing ? "grabbing" : ""),
      "& svg": {
        cursor: ({ isGrabbing }) => (isGrabbing ? "grabbing" : ""),
      },
      "& button": {
        cursor: ({ isGrabbing }) => (isGrabbing ? "grabbing" : ""),
      },
    },
  };
}
