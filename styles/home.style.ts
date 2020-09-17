import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(12),
    },

    card: {
      textAlign: "center",
      flexGrow: 0.75,
      height: "100%",
    },
    cardAction: {
      height: "100%",
    },
    info: {
      padding: "18px 36px 55px",
    },
    media: {
      height: 250,
    },
    grid: {
      height: "425px",
    },
    link: {
      textDecoration: "none",
    },
    badSearch: {
      display: "flex",
      flexDirection: "column",
      width: "50%",
      textAlign: "center",
      margin: "0 auto",
    },
  })
);

export default useStyles;
