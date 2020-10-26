export default function styles(theme, drawerWidth) {
  return {
    root: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "space-between",
      minHeight: "64px",
    },
    drawerHeaderTitle: {
      marginLeft: "auto",
      marginRight: "auto",
    },
    drawerContainer: {
      width: "90%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      marginLeft: "auto",
      marginRight: "auto",
    },
    formContent: {
      marginBottom: "1rem",
    },
  };
}
