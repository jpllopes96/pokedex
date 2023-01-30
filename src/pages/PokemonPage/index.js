import Header from "../../components/Header"
import { useEffect, useState } from "react"
import api from '../../services/api'
import { useParams } from "react-router-dom"

export default function PokemonPage(){
    const { name } = useParams()
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true)
    const [abilities, setAbilities] = useState([])
    const [stats, setStats] = useState([]);
    
    useEffect(()=> {
        
        async function loadPokemon(){
            setLoading(true)
            
           await api.get(`pokemon/${name}`)
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
        <div>
            <Header />
        
            
            
            {console.log(pokemon.data)}
             <p>{pokemon.data.height/10}</p>
            <p>{pokemon.data.weight/10}</p>
            <p>{pokemon.data.name}</p>
            <p>{pokemon.data.order}</p>

            {abilities.map((item) =>
                (
                    <p key={item}>{item} </p>
                    
                   
                )
            )}
            {stats.map((item) =>
                (
                    <p key={item.stat_name}>{`${item.stat_name} ${item.base_stat}` } </p>
                    
                   
                )
            )}
            <img src={pokemon.data.sprites.other.home.front_default} />
            <img src={pokemon.data.sprites.other.home.front_shiny} /> 
            
          

            {console.log(stats)} 
            
             {/* {console.log(pokemon.data.abilities[0].ability.name)} 
            {console.log(pokemon.data)} */}
        
            
        </div>
    )
}
}
    