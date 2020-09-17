import {
  createStyles,
  fade,
  Theme,
  makeStyles,
} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    normalTitle: {
      display: "block",
    },

    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },

      margin: "auto",

      width: "auto",
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },

    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),

      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "13ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    select: {
      color: "white",
      "&:before": {
        borderColor: "white",
      },
      "&:hover:not(.Mui-disabled):before": {
        borderColor: "white",
      },
    },
    icon: {
      fill: "white",
    },
    whiteColor: {
      color: "white",
    },
  })
);

export default useStyles;
