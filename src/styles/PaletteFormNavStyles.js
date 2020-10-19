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
    },
    toolBar: {},
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
    paletteNameForm: {
      display: "flex",
      flexDirection: "column",
    },
    appBarBtns: {},
    nameDialogForm: {
      padding: "3rem",
    },
  };
}
