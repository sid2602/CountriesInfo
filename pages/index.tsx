import { GetStaticProps, GetServerSideProps } from "next"
import {useState,useEffect} from 'react'

//Material

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

//Redux

import {useDispatch,useSelector} from 'react-redux'
import {getCountries,getMoreCountries} from '../store/actions/countries.action'



import InfiniteScroll from 'react-infinite-scroll-component';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginTop: 24,
    },

    card: {
      
      textAlign: 'center',
      flexGrow:0.75,
      margin: 'auto',
    },
    media:{
      height: 250
    }
  }),
);


export default function Home({}) {
  
  const dispatch = useDispatch();
  const {limitedCountries} = useSelector(state=>state.countries)
 
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
  <div className={classes.root}>
    <InfiniteScroll
      dataLength={20}
      next={handleScroll}
      hasMore={true}
      loader={<h4>Loading</h4>}
    >


    <Grid container justify="space-around" spacing={3} >
      
      {data?.map(country => (
        <Grid key={country.name} container item  lg={3} md={4} sm={6} xs={12}>
           <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={country.flag}
                  title={country.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {country.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    population: {country.population} <br/>
                    region: {country.region}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
        </Grid>
      ))}
    
    </Grid>
    </InfiniteScroll>
    </div>
     )
    
}



// Home.getInitialProps = async() => {

// }


// export const getStaticProps:GetStaticProps = async() => {
//     const resp = await fetch('https://restcountries.eu/rest/v2/all?fields=name;capital;region;subregion;flag;population;currencies;borders;languages');
//     const countries = await resp.json();
    

//     return {props:{countries}}
// }