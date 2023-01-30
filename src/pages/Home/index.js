import Header from "../../components/Header"
import Pokemon from "../../components/Pokemon"


import './home.css'

export default function Home(){
    return(
        <>
            <Header />
            <div className="containerHome">
                <Pokemon />
            </div>
        </>
    )
}