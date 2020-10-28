export default {
  root: {
    height: "100%",
    cursor: ({ isGrabbing }) => (isGrabbing ? "grabbing" : "grab"),
  },
};
