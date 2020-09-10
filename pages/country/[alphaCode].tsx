import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Zoom from '@material-ui/core/Zoom';
import Slide from '@material-ui/core/Slide';

import BackButton from '../../src/BackButton'
import CountryButton from '../../src/CountryButton'


import {motion} from 'framer-motion'
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        marginTop: 24,
        [theme.breakpoints.up('md')]: {
           
          
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
    ): <Typography variant="h5" component="h5" className={classes.borders}> {info.name} has no neighbors </Typography>


    return (
        <motion.div exit={{opacity: 0}} initial={{opacity: 0}} animate={{opacity: 1}}>
      <Container maxWidth="lg" className={classes.root}>
        <Grid container  justify='space-around' spacing={6} >
            <Grid item xs={12}>
                <BackButton/>
            </Grid>

            {/* IMAGE */}

            <Zoom  in={true} >
                <Grid container item md={6} sm={12} >
                    <img src={info?.flag} alt={info?.name} className={classes.image}/>
                </Grid>
            </Zoom>
            {/* INFO */}

            <Slide direction="left" in={true}>
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

                {/* Borders */}

               <Grid item  sm={12} >
                <Typography variant="h4" component="h4" className={classes.borders}>
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


export const getServerSideProps:GetServerSideProps = async ctx => {
    const {alphaCode} = ctx.params;

    const response = await fetch(`https://restcountries.eu/rest/v2/alpha/${alphaCode}`)
    const info = await response.json();

    if(info.subregion === '') info.subregion = 'Unknown'
    if(info.capital === '') info.capital = 'Unknown'
    if(info.demonym === '') info.demonym = 'Unknown'

    return {props: {info}}
}