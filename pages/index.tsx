import { GetStaticProps } from "next"
import {useState,useEffect} from 'react'

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  
  media: {
    height: 140,
  },
});


export default function Home({countries}) {
  
  const [data,setData] = useState(countries.slice(0,20))
  const classes = useStyles();
 

  return (
    <Grid container spacing={1}>
      
      {data.map(country => (
        <Grid key={country.name} container item xs={12} sm ={3} >
           <Card width="100%">
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
     )
}




export const getStaticProps:GetStaticProps = async() => {
    const resp = await fetch('https://restcountries.eu/rest/v2/all?fields=name;capital;region;subregion;flag;population;currencies;borders;languages');
    const countries = await resp.json();

    return {props:{countries}}
}