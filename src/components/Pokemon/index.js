import './pokemon.css'
import { Link } from 'react-router-dom'
import api from '../../services/api';
import React from 'react';
import { useEffect, useState } from 'react';
import ModalPokemon from "../../components/ModalPokemon";

export default function Pokemon(){
    const [pokemons, setPokemons] = useState([]);
    const [limit, setLimit] = useState(20);
    const [namePokemon, setNamePokemon] = useState()
    const [modal, setModal] = useState(false)
    useEffect(()=>{
        async function loadPokes(){
            const response = await api.get(`pokemon?limit=${limit}`)          
            setPokemons(response.data.results)              
        }
        
        loadPokes();
    }, [limit])

    function showModal(name){
        setNamePokemon(name);
        setModal(true)  
    }

    function loadMorePokes(){
        const current = limit;
        setLimit(current + 20);
    }
    return(
        
        <>
            <div className='pokeContainer'>
            {pokemons.map((poke, index) => (
                
                    <button onClick={()=>{showModal(poke.name)}}  key={poke.name} className="pokeCard" on>
                        <h1 className='pokeName'>{poke.name}</h1>
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${index+1}.svg`} />
                    </button>

/* <Link to={`/pokemon/${poke.name}`} key={poke.name} className="pokeCard" on>
<h1 className='pokeName'>{poke.name}</h1>
<img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${index+1}.svg`} />
</Link> */
            
                )
            )}
            </div>
            
            <button className='btnLoadMore' onClick={loadMorePokes}>Load More Pokemons</button>

            { modal && <ModalPokemon pokeName={namePokemon} closeModal={setModal}/> }
           
                
        </>            
    )
    
}