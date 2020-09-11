import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
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
import SearchIcon from "@material-ui/icons/Search";

import { useRouter } from 'next/router'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    normalTitle:{
      display:'block'
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

export default function Navigation({setContinent,setSearch,continent,search}) {
  const classes = useStyles();

  const router = useRouter();

  // const [region, setRegion] = useState("all");

  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {

    if(event.target?.name === 'input')
      setSearch(event.target.value as string)
    else 
      setContinent(event.target.value as string);
  };


  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography className={router.pathname==='/'? classes.title: classes.normalTitle} variant="h6" noWrap>
            CountriesInfo
          </Typography>

          { router.pathname === '/' ? (
            <>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search country"
              name='input'
              value={search}
              onChange={handleChange}
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
              name='select'
              value={continent}
              onChange={handleChange}
              className={classes.select}
              inputProps={{'fill':'white'}}
            >
              <MenuItem value='all'>All</MenuItem>
              <MenuItem value='Africa'>Africa</MenuItem>
              <MenuItem value="Americas">Americas</MenuItem>
              <MenuItem value="Asia">Asia</MenuItem>
              <MenuItem value="Europe">Europe</MenuItem>
              <MenuItem value="Oceania">Oceania</MenuItem>

            </Select>
          </FormControl>
          </>
          ): null
        }
        </Toolbar>
      </AppBar>
    </div>
  );
}
