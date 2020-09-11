import React ,{useState} from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';

//Framer Motion
import {  AnimatePresence } from "framer-motion"

import Navigation from '../src/Navigation'

export default function MyApp(props) {
  const { Component, pageProps } = props;

  const [search,setSearch] = useState('');
  const [continent,setContinent] = useState('all');

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>

     
        <Navigation search={search} setSearch={setSearch} setContinent={setContinent} continent={continent}/>
        <CssBaseline />

        <AnimatePresence exitBeforeEnter>
            <Component {...pageProps} search={search} continent={continent}/>
        </AnimatePresence>

      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};


