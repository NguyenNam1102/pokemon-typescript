import { Pokemon } from "../interface"
import PokemonList from "./PokemonList"
import './pokemon.css'

interface Props {
    pokemons: Pokemon[]
}

const PokemonColection: React.FC<Props> = (props) => {
    const { pokemons } = props
    return (
        <div>
            <section className="collection-container">
                {pokemons.map((pokemon, index) => {
                    return (
                        <div key={index}>
                            <PokemonList
                                key={pokemon.id}
                                name={pokemon.name}
                                id={pokemon.id}
                                image={pokemon.sprites.front_default}
                            />
                        </div>
                    )
                })}
            </section>
        </div>
    )
}

export default PokemonColection