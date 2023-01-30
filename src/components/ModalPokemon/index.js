import './modal.css';
import api from '../../services/api'
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom"
import {FiXCircle} from 'react-icons/fi'


export default function ModalPokemon({pokeName, closeModal}){

    const { name } = useParams()
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true)
    const [abilities, setAbilities] = useState([])
    const [shiny, setShiny] = useState(false)
    const [stats, setStats] = useState([]);
    
    useEffect(()=> {
        
        async function loadPokemon(){
            setLoading(true)
            
           await api.get(`pokemon/${pokeName}`)
           .then((response) =>{
                setPokemon(response)
                let data = []
                Object.keys(response.data.abilities).forEach((key) => {
                    data.push(response.data.abilities[key].ability.name)
                   setAbilities(data)
                })   
                let stat = []      
                Object.keys(response.data.stats).forEach((key) => {
                    stat.push({
                        base_stat: response.data.stats[key].base_stat,
                        stat_name: response.data.stats[key].stat.name
                    })
                    setStats(stat)
                }) 
                setLoading(false)
           })
           .catch((error)=>{
            console.log(error)
            setLoading(false)
           })
            
        }


        loadPokemon()


    }, [name])


if (!loading){
    return(
        <div className='modalContainer'>
            <div className='modal'>
                <div className='modalHeader'>
                    <h1>{`#${pokemon.data.order} - ${pokemon.data.name}`} <button onClick={()=> closeModal(false) }> <FiXCircle size={30} color='red' /></button></h1>
                </div>
                
                <div className='modalBody'>
                    <div className='pokeImage'>
                        { shiny === false ?  
                            <>
                                <img src={pokemon.data.sprites.other.home.front_default} />
                                <button onClick={()=> setShiny(true)}>Shiny</button>
                            </>
                            
                            :
                          (
                            <>
                                <img src={pokemon.data.sprites.other.home.front_shiny} />
                                <button onClick={()=> setShiny(false)}>Normal</button>
                            </>
                          )
                            
                        }
                       
                        
                    </div>
                    <div className='containerPoke'>
                        <div className='title measurements'>
                            <p>Height</p>
                            <p>Weight</p>
                        </div>
                        <div className='measurementsValues'>
                            <p>{pokemon.data.height/10}M</p>                       
                            <p>{pokemon.data.weight/10}KG</p>
                        </div>
                        <div className='abilities'>
                        <p className='title'>Abilities</p>
                                {abilities.map((item) =>
                                    (
                                        <p key={item}>{item} </p>
                                        
                                    
                                    )
                                )}
                        </div>         
                        <p className='title'>Stats</p>
                        {stats.map((item) =>
                            (
                                // <p key={item.stat_name}>{`${item.stat_name} ${item.base_stat}` } </p>
                                
                                <div className='containerStats' key={item.stat_name}>
                                    <p className='statsName'>{item.stat_name}</p>
                                    <div className='myProgress'>
                                        <div title={item.base_stat} className='myBar' style={{width: `${item.base_stat/2}%` }} ></div>
                                    </div>
                                </div>                              
                            
                            )
                        )}
                                        
                    </div>
                </div>
                
                {/* <img src={pokemon.data.sprites.other.home.front_default} />
                <img src={pokemon.data.sprites.other.home.front_shiny} />  */}
                  
                </div>
        </div>
    )
    }
}