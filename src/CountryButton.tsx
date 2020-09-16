import Link from "next/link";
import Button from "@material-ui/core/Button";
import { useEffect, useState } from "react";


type Props = {
    alpha3Code: string
}

export default function CountryButton({alpha3Code}:Props){

    const [name, setName] = useState(null);

    useEffect(()=>{

        const getCountryName = async() => {
            const response = await fetch(`https://restcountries.eu/rest/v2/alpha/${alpha3Code}?fields=name;alpha3Code`);
            const json = await response.json();
            
            setName(json.name)
           
        }

        getCountryName();
        
    },[])


    return (
        <Link href="/country/[alphaCode]" as={`/country/${alpha3Code}`} >
            <Button component="a" variant="contained" color="primary" style={{margin: '5px'}}>{name=== null ?'Loading': name}</Button>
        </Link>
    )
}