import { GetServerSideProps } from "next";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Zoom from "@material-ui/core/Zoom";
import Slide from "@material-ui/core/Slide";
import BackButton from "../../components/BackButton";
import CountryButton from "../../components/CountryButton";
import { CountryDataDetails } from "../../types";
import { motion } from "framer-motion";
import useStyles from "../../styles/country.style";
import { GET_SINGLE_COUNTRY } from "../../api/paths";

type Props = {
  info: CountryDataDetails;
};

export default function Country({ info }: Props) {
  const classes = useStyles();

  const borders =
    info!.borders.length > 0 ? (
      info?.borders.map((alpha3Code: string) => (
        <CountryButton key={alpha3Code} alpha3Code={alpha3Code} />
      ))
    ) : (
      <Typography variant="h5" component="h5" className={classes.borders}>
        {" "}
        {info.name} has no neighbors{" "}
      </Typography>
    );

  const {
    name,
    region,
    subregion,
    capital,
    population,
    demonym,
    nativeName,
    languages,
    currencies,
    topLevelDomain,
  } = info;

  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Container maxWidth="lg" className={classes.root}>
        <Grid container justify="space-around" spacing={6}>
          <Grid item xs={12}>
            <BackButton />
          </Grid>

          <Zoom in={true}>
            <Grid container item md={6} sm={12}>
              <img
                src={info?.flag}
                alt={info?.name}
                className={classes.image}
              />
            </Grid>
          </Zoom>

          <Slide direction="left" in={true}>
            <Grid
              container
              item
              md={6}
              sm={12}
              spacing={1}
              className={classes.center}
            >
              <Grid item sm={4} md={6}>
                <Typography variant="body2" component="p" className={classes.p}>
                  Name: <span className={classes.span}>{name}</span>
                  <br />
                  Region: <span className={classes.span}>{region}</span>
                  <br />
                  Subregion: <span className={classes.span}>{subregion}</span>
                  <br />
                  Capital: <span className={classes.span}>{capital}</span>
                  <br />
                  Population: <span className={classes.span}>{population}</span>
                  <br />
                </Typography>
              </Grid>
              <Grid item sm={4} md={6}>
                <Typography variant="body2" component="p" className={classes.p}>
                  Demonym <span className={classes.span}>{demonym}</span>
                  <br />
                  Native name:{" "}
                  <span className={classes.span}>{nativeName}</span>
                  <br />
                  Languages:{" "}
                  <span className={classes.span}>{languages[0].name}</span>
                  <br />
                  Currencies:{" "}
                  <span className={classes.span}>
                    {info.currencies[0].name} {currencies[0].symbol}
                  </span>
                  <br />
                  Top level domain:{" "}
                  <span className={classes.span}>{topLevelDomain}</span>
                  <br />
                </Typography>
              </Grid>

              <Grid item sm={12}>
                <Typography
                  variant="h4"
                  component="h4"
                  className={classes.borders}
                >
                  Borders:
                </Typography>

                {borders}
              </Grid>
            </Grid>
          </Slide>
        </Grid>
      </Container>
    </motion.div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { alphaCode } = ctx.params!;

  const response: Response = await fetch(
    GET_SINGLE_COUNTRY(alphaCode as string)
  );
  const info: CountryDataDetails = await response.json();

  if (info?.region === "") info.region = "Unknown";
  if (info?.subregion === "") info.subregion = "Unknown";
  if (info?.capital === "") info.capital = "Unknown";
  if (info?.demonym === "") info.demonym = "Unknown";

  return { props: { info } };
};
