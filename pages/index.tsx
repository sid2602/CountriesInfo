import { GetStaticProps, GetServerSideProps } from "next";
import { useState, useEffect } from "react";
import { CountryData } from "../types";
import Link from "next/link";
import searchCountry from "../api/SearchCountry";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Zoom from "@material-ui/core/Zoom";
import InfiniteScroll from "react-infinite-scroll-component";
import { motion } from "framer-motion";
import useStyles from "../styles/home.style";
import { GET_ALL_COUNTRIES } from "../api/paths";
type MainProps = {
  countries: CountryData[] | undefined;
  search: string;
  continent: string;
};

export default function Home({ countries, search, continent }: MainProps) {
  const classes = useStyles();

  const [countriesToShow, setCountries] = useState<CountryData[]>([]);
  const [filters, setFilters] = useState<CountryData[]>([]);

  useEffect(() => {
    if (search !== "" || continent !== "all") {
      searchCountry(search, continent).then((json) => {
        if (json.length > 0) {
          setFilters(json);
          setCountries(json.slice(0, 20));
        } else {
          setFilters([]);
          setCountries([]);
        }
      });
    }

    if (search === "" && continent === "all") {
      setFilters([]);
      setCountries(countries!.slice(0, 20));
    }
  }, [search, continent]);

  const handleScroll = () => {
    const { length } = countriesToShow;

    if (filters.length > 0) {
      setCountries(countriesToShow.concat(filters.slice(length, length + 20)));
    } else {
      setCountries(
        countriesToShow.concat(countries!.slice(length, length + 20))
      );
    }
  };

  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Container maxWidth="xl" className={classes.root}>
        {filters.length > 0 || countriesToShow.length > 0 ? (
          <InfiniteScroll
            dataLength={countriesToShow.length}
            next={handleScroll}
            hasMore={
              filters.length > 0
                ? filters.length > countriesToShow.length
                : countries!.length > countriesToShow.length
            }
            loader={<h4>Loading</h4>}
            style={{ overflow: "hidden" }}
          >
            <Grid container justify="space-around" spacing={3}>
              {countriesToShow?.map((country) => (
                <Grid key={country.name} item lg={3} md={4} sm={6} xs={12}>
                  <Link
                    href="/country/[alphaCode]"
                    as={`/country/${country.alpha3Code}`}
                  >
                    <a className={classes.link}>
                      <Card className={classes.card}>
                        <CardActionArea className={classes.cardAction}>
                          <CardMedia
                            className={classes.media}
                            image={country.flag}
                            title={country.name}
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h3"
                            >
                              {country.name}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                              className={classes.info}
                            >
                              Population: {country.population} <br />
                              Region:{" "}
                              {country.region !== ""
                                ? country.region
                                : "Unkown"}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </a>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </InfiniteScroll>
        ) : (
          <Zoom in={true}>
            <Grid container className={classes.badSearch}>
              <img src="images/ziemia.png" style={{ width: "100%" }} />
              <Typography gutterBottom variant="h4" component="h2">
                This contry doesn't exist
              </Typography>
            </Grid>
          </Zoom>
        )}
      </Container>
    </motion.div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const resp = await fetch(GET_ALL_COUNTRIES);
  const countries: CountryData[] | undefined = await resp.json();

  return { props: { countries } };
};
