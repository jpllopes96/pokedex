import './pokemon.css'
import { Link } from 'react-router-dom'
import api from '../../services/api';
import React from 'react';
import { useEffect, useState } from 'react';

export default function Pokemon(){
    const [pokemons, setPokemons] = useState([]);
    const [pokeImage, setPokeImage] = useState([])
    const [limit, setLimit] = useState(20);
    useEffect(()=>{
        async function loadPokes(){
            const response = await api.get(`pokemon?limit=${limit}`)          
            setPokemons(response.data.results)              
        }
        
        loadPokes();
    }, [limit])

    function loadMorePokes(){
        const current = limit;
        setLimit(current + 20);
    }
    return(
        
        <>
            <div className='pokeContainer'>
            {pokemons.map((poke, index) => (
                
                    <Link  key={poke.name} className="pokeCard">
                        <h1>{poke.name}</h1>
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${index+1}.svg`} />
                    </Link>
            
                )
            )}
            </div>
            
            <button className='btnLoadMore' onClick={loadMorePokes}>Load More Pokemons</button>
           
                
        </>            
    )
    
}