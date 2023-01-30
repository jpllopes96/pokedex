import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import PokemonPage from "../pages/PokemonPage";

export default function RoutesApp(){
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pokemon/:name" element={<PokemonPage />} />
        </Routes>
    )
}