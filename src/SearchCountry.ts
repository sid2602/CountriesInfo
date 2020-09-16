 import {CountryData} from '../interfaces/interfaces'



 const searchCountry = async(search:string,continent:string) =>{

    let resp:Response | undefined,
    json:Array<CountryData> = [];


      //if u search country and change continent
      if(search !== '' && continent !== 'all'){
        resp = await fetch(`https://restcountries.eu/rest/v2/name/${search}?fields=name;population;region;flag;alpha3Code`);
        const arr:Array<CountryData> = await resp.json();

        arr.map(country => country?.region === continent && json.push(country))
        

      }else{

        
        //other ways

      if(search !== '' && continent === 'all')
         resp = await fetch(`https://restcountries.eu/rest/v2/name/${search}?fields=name;population;region;flag;alpha3Code`);
      else if(search === '' && continent !== 'all')
        resp = await fetch(`https://restcountries.eu/rest/v2/region/${continent}?fields=name;population;region;flag;alpha3Code`);
      
      
       json = await resp?.json();

       
      }

      return json;
}

export default searchCountry