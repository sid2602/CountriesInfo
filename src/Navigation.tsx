import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import {
  createStyles,
  fade,
  Theme,
  makeStyles,
} from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      // flexGrow: 1,

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
      // marginLeft: theme.spacing(1),
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
      // vertical padding + font size from searchIcon
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
    select:{
        color: 'white',
        '&:before': {
            borderColor: "white",
        },
        '&:hover:not(.Mui-disabled):before': {
          borderColor: 'white',
      }
    },
    icon: {
      fill: "white",
    },
    whiteColor:{
      color:'white',
    }
    
  })
);

export default function Navigation() {
  const classes = useStyles();

  const [region, setRegion] = useState("all");

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setRegion(event.target.value as string);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            CountriesInfo
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search country"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search"}}
            />
          </div>

          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label" className={classes.whiteColor}>Continent</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={region}
              onChange={handleChange}
              className={classes.select}
              inputProps={{'fill':'white'}}
            >
              <MenuItem value='all'>All</MenuItem>
              <MenuItem value='africa'>Africa</MenuItem>
              <MenuItem value="americas">Americas</MenuItem>
              <MenuItem value="asia">Asia</MenuItem>
              <MenuItem value="Europe">Europe</MenuItem>
              <MenuItem value="Oceania">Oceania</MenuItem>

            </Select>
          </FormControl>
        </Toolbar>
      </AppBar>
    </div>
  );
}
