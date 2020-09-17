import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(12),
      [theme.breakpoints.up("md")]: {
        display: "flex",
        alignItems: "center",
        position: "absolute",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        marginTop: 0,
      },
    },

    image: {
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        maxWidth: 600,
        margin: "0 auto",
      },
    },
    p: {
      color: "#616161",
      fontWeight: "bold",
      fontSize: "1.4em",
      lineHeight: "2em",
      [theme.breakpoints.down("sm")]: {
        fontSize: "1.2em",
      },
    },
    center: {
      [theme.breakpoints.up("sm")]: {
        justifyContent: "center",
      },
    },
    span: {
      fontWeight: "normal",
      color: "#969696",
    },
    borders: {
      color: "#616161",
      margin: "1em 0",
    },
  })
);

export default useStyles;
