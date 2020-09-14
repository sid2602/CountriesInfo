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
import Zoom from '@material-ui/core/Zoom';

import InfiniteScroll from 'react-infinite-scroll-component';

//framerMotion

import {motion} from 'framer-motion'



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(12),
    },

    card: {
      
      textAlign: 'center',
      flexGrow: 0.75,
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
    },
    badSearch:{
      // width: '300px',
      display: 'flex',
      flexDirection: 'column',
      width: '50%',
      textAlign: 'center',
      margin: '0 auto',
     
    },
  }),
);


export default function Home({countries,search,continent}) {
  
  const classes = useStyles();
  
  const [countriesToShow,setCountries] = useState([])
  const [filters,setFilters] = useState([])

  useEffect(()=>{

    const searchCountry = async (name) => {

      let resp,json=[];


      //if u search country and change continent
      if(search !== '' && continent !== 'all'){
        resp = await fetch(`https://restcountries.eu/rest/v2/name/${search}?fields=name;population;region;flag;alpha3Code`);
        const arr = await resp.json();

        arr.map(country => country.region === continent && json.push(country))
        

      }else{

        
        //other ways

      if(search !== '' && continent === 'all')
         resp = await fetch(`https://restcountries.eu/rest/v2/name/${search}?fields=name;population;region;flag;alpha3Code`);
      else if(search === '' && continent !== 'all')
        resp = await fetch(`https://restcountries.eu/rest/v2/region/${continent}?fields=name;population;region;flag;alpha3Code`);
      
      
       json = await resp.json();

      }
    

      if(json.length>0){
        setFilters(json)
        setCountries(json.slice(0,20))
      }
      else{
        setFilters([])
        setCountries([])
      } 
    }


    if(search !== '' || continent !== 'all'){
      searchCountry(search);
    }
    
    if(search === '' && continent === 'all')
    {
      setFilters([])
      setCountries(countries.slice(0,20))
    }



  },[search,continent])
 

  const handleScroll = () => {

    const {length} = countriesToShow
    
    if(filters.length>0){
      setCountries(countriesToShow.concat(filters.slice(length,length+20)))
    }else{
      setCountries(countriesToShow.concat(countries.slice(length,length+20)))
    }

  }

  return (
    <motion.div exit={{opacity: 0}} initial={{opacity: 0}} animate={{opacity: 1}}>
      <Container maxWidth="xl" className={classes.root}>
      
      {filters.length > 0 || countriesToShow.length > 0 ?<InfiniteScroll
        dataLength={countriesToShow.length}
        next={handleScroll}
        hasMore={filters.length>0? filters.length>countriesToShow.length : countries.length>countriesToShow.length}
        loader={<h4>Loading</h4>}
        style={{overflow:'hidden'}}
      >

        
      <Grid container justify="space-around" spacing={3} >
        
        {countriesToShow?.map(country => (
        
          <Grid key={country.name}  item  lg={3} md={4} sm={6} xs={12} >
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
                      Region: {country.region !==''? country.region: 'Unkown'}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
              </a>
              </Link>
          </Grid>
        ))}
      
      </Grid>
      </InfiniteScroll> :(  
      <Zoom  in={true} >                            
        <Grid container className={classes.badSearch}>
          <img src='images/ziemia.png' style={{width:'100%'}}/>
          <Typography gutterBottom variant="h4" component="h2">
                      This contry doesn't exist
          </Typography>
        </Grid>
      </Zoom>)
      }
      </Container>
    </motion.div>
     ) 
}

export interface CountryData {
  name: string,
  population: number,
  region: string,
  flag: string,
  alpha3Code: string
}


export const getStaticProps:GetStaticProps = async() => {
    const resp = await fetch('https://restcountries.eu/rest/v2/all?fields=name;population;region;flag;alpha3Code');
    const countries:CountryData[] | undefined = await resp.json();
    

    return {props:{countries}}
}