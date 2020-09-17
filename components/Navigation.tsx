import React, { Dispatch } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import SearchIcon from "@material-ui/icons/Search";

import { useRouter } from "next/router";

import useStyles from "../styles/navigation.style";

type Props = {
  setContinent: Dispatch<string>;
  setSearch: Dispatch<string>;
  continent: string;
  search: string;
};

export default function Navigation({
  setContinent,
  setSearch,
  continent,
  search,
}: Props) {
  const classes = useStyles();

  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | any>) => {
    if ((event.target?.name as string) === "input")
      setSearch(event.target.value as string);
    else setContinent(event.target.value as string);
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            className={
              router.pathname === "/" ? classes.title : classes.normalTitle
            }
            variant="h6"
            component="h1"
            noWrap
          >
            CountriesInfo
          </Typography>

          {router.pathname === "/" ? (
            <>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search country"
                  name="input"
                  value={search}
                  onChange={handleChange}
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
              </div>

              <FormControl className={classes.formControl}>
                <InputLabel
                  id="demo-simple-select-label"
                  className={classes.whiteColor}
                >
                  Continent
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="select"
                  value={continent}
                  onChange={handleChange}
                  className={classes.select}
                  inputProps={{ fill: "white" }}
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="Africa">Africa</MenuItem>
                  <MenuItem value="Americas">Americas</MenuItem>
                  <MenuItem value="Asia">Asia</MenuItem>
                  <MenuItem value="Europe">Europe</MenuItem>
                  <MenuItem value="Oceania">Oceania</MenuItem>
                </Select>
              </FormControl>
            </>
          ) : null}
        </Toolbar>
      </AppBar>
    </div>
  );
}
