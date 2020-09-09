import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import BackButton from '../../src/BackButton'
import CountryButton from '../../src/CountryButton'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        marginTop: 24,
        [theme.breakpoints.up('sm')]: {
           
          
        display: 'flex',
        alignItems: 'center',
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
    },
    },

    image:{
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            maxWidth: 600,
            margin: '0 auto'
          },
    },
    p:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: '1.4em',
        lineHeight: '2em',
        [theme.breakpoints.down('sm')]: {
            fontSize: '1.2em'
            
          },
        
    },
    center:{
        [theme.breakpoints.up('sm')]: {
            justifyContent: 'center'
            
          },
    },
    span:{
        fontWeight:'normal',
        color: '#e4e4e4',
    },
    borders:{
        color: 'white',
        margin: '1em 0',
    },
    
   
    
    
  }));


export default function Country ({info}){
   
    const classes = useStyles();
    
    const borders = info.borders.length > 0 ?( 
        info.borders.map(alpha3Code => <CountryButton key={alpha3Code} alpha3Code={alpha3Code}/>) 
    ): <div>'NoBorders'</div>


    return (
      <Container maxWidth="lg" className={classes.root}>
        <Grid container  justify='space-around' spacing={6} >
            <Grid item xs={12}>
                <BackButton/>
            </Grid>

            {/* IMAGE */}

            <Grid container item md={6} sm={12} >
                <img src={info?.flag} alt={info?.name} className={classes.image}/>
            </Grid>

            {/* INFO */}

            <Grid container item md={6} sm={12} spacing={1} className={classes.center}>
               <Grid item  sm={4} md={6} >
               <Typography variant="body2"  component="p" className={classes.p}>
    
                    Name: <span className={classes.span}>{info.name}</span><br/>
                    Region: <span className={classes.span}>{info.region}</span><br/>
                    Subregion: <span className={classes.span}>{info.subregion}</span><br/>
                    Capital: <span className={classes.span}>{info.capital}</span><br/>
                    Population: <span className={classes.span}>{info.population}</span><br/>
                    
                    
                </Typography>
               </Grid>
               <Grid item  sm={4} md={6}>
               <Typography variant="body2"  component="p" className={classes.p}>
                   
                   Demonym <span className={classes.span}>{info.demonym}</span><br/>
                   Native name: <span className={classes.span}>{info.nativeName}</span><br/>
                   Languages: <span className={classes.span}>{info.languages[0]?.name}</span><br/>
                   Currencies: <span className={classes.span}>{info.currencies[0]?.name} {info.currencies[0]?.symbol}</span><br/>
                   Top level domain: <span className={classes.span}>{info.topLevelDomain}</span><br/>
                   
               </Typography>
               </Grid>

               <Grid item  sm={12} >
                <Typography variant="h5" component="h5" className={classes.borders}>
                    Borders:
                </Typography>

                
                {borders}
               </Grid>

            </Grid>

        </Grid>
    </Container>
    );
}


export const getServerSideProps:GetServerSideProps = async ctx => {
    const {alphaCode} = ctx.params;

    const response = await fetch(`https://restcountries.eu/rest/v2/alpha/${alphaCode}`)
    const info = await response.json();

    if(info.subregion === '') info.subregion = 'Unknown'
    if(info.capital === '') info.capital = 'Unknown'
    if(info.demonym === '') info.demonym = 'Unknown'
    // if(info.borders.length === 0) info.borders[0] = 
    
    //Get Borders

    // const borders =  await info.borders?.map(border=>fetch(`https://restcountries.eu/rest/v2/alpha/${border}?fields=name;alpha3Code;`))
 
    

    // console.log(borders);

    
    return {props: {info}}
}