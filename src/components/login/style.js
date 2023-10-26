import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  Main: {
    background: theme.palette.background.default,
  },
  Form: {
    padding: "0 16px",
    width: "100%",
    display: "inline-block",
    maxWidth: "350px",
  },
  FadeInWrapper: {
    transition: "0.9s",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    background: theme.palette.background.default,
  },
  InputCode: {
    "&:not(:last-child)": {
      marginLeft: "10px",
      textAlign: "center",
    },
    "& input": {
      fontWeight: "bold",
      textAlign: "center !important",
    },
  },
}));
