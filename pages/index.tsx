import { GetStaticProps, GetServerSideProps } from "next"
import {useState,useEffect} from 'react'
import Link from 'next/link'

//Material

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

//Redux

import {useDispatch,useSelector} from 'react-redux'
import {getCountries,getMoreCountries} from '../store/actions/countries.action'



import InfiniteScroll from 'react-infinite-scroll-component';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: 24,
    },

    card: {
      
      textAlign: 'center',
      flexGrow: 0.75,
      // margin: 'auto',
      height: '100%',
    },
    cardAction:{
      height: '100%',
    },
    info:{
      padding: "18px 36px 55px",
    },
    media:{
      height: 250
    },
    grid:{
      height: '425px',
    },
    link:{
      textDecoration: 'none',
    }
  }),
);


export default function Home() {
  
  const dispatch = useDispatch();
  const {limitedCountries,allCountries} = useSelector(state=>state.countries)
 
  const [data,setData] = useState(limitedCountries)
  const classes = useStyles();
 

  const handleScroll = () => {
    dispatch(getMoreCountries(limitedCountries.length))
  }

  useEffect(()=>{
    dispatch(getCountries())
  },[])

  useEffect(()=>{
    setData(limitedCountries)
  },[limitedCountries])


  return (
    <Container maxWidth="xl" className={classes.root}>
 
    <InfiniteScroll
      dataLength={limitedCountries.length}
      next={handleScroll}
      hasMore={allCountries.length>limitedCountries.length}
      loader={<h4>Loading</h4>}
    >


    <Grid container justify="space-around" spacing={3} >
      
      {data?.map(country => (
      
        <Grid key={country.name}  item  lg={3} md={4} sm={6} xs={12} className={classes.grid}>
          <Link href='/country/[alphaCode]' as={`/country/${country.alpha3Code}`}>
          <a className={classes.link}>
           <Card className={classes.card}>
              <CardActionArea className={classes.cardAction}>
                <CardMedia
                  className={classes.media}
                  image={country.flag}
                  title={country.name}
                />
                <CardContent >
                  <Typography gutterBottom variant="h5" component="h3">
                    {country.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p" className={classes.info}>
                    Population: {country.population} <br/>
                    Region: {country.region}
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
    </Container>
     )
    
}



// Home.getInitialProps = async() => {

// }


// export const getStaticProps:GetStaticProps = async() => {
//     const resp = await fetch('https://restcountries.eu/rest/v2/all?fields=name;capital;region;subregion;flag;population;currencies;borders;languages');
//     const countries = await resp.json();
    

//     return {props:{countries}}
// }