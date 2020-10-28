export default {
  root: {
    width: "90%",
  },
  picker: {
    width: "100% !important",
    marginBottom: "1rem",
  },
  textInput: {
    width: "100%",
    height: "100%",
    margin: "0 auto 1rem auto",
  },
  btn: {
    paddingTop: "1rem",
    paddingBottom: "1rem",
    width: "100%",
    fontSize: "1.5rem",
  },
  isGrabbing: {
    cursor: ({ isGrabbing }) => (isGrabbing ? "grabbing" : ""),
    "& input": {
      cursor: ({ isGrabbing }) => (isGrabbing ? "grabbing" : ""),
    },
    "& svg": {
      cursor: ({ isGrabbing }) => (isGrabbing ? "grabbing" : ""),
    },
  },
};
