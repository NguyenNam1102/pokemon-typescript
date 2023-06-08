import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import PokemonColection from './components/PokemonColection'
import { Pokemon } from './interface'

interface Pokemons {
  name: string
  url: string
}

const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [nextUrl, setNextUrl] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const getPokemon = async () => {
      const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20&offset=20')
      console.log(res.data);
      setNextUrl(res.data.next)
      res.data.results.forEach(async (pokemons: Pokemons) => {
        const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemons.name}`)
        // console.log(poke.data);
        setPokemons((p) => [...p, poke.data])
        setLoading(false)
      })
    }
    getPokemon()
  }, [])

  const nextPage = async () => {
    setLoading(true)
    let res = await axios.get(nextUrl)
    setNextUrl(res.data.next)
    res.data.results.forEach(async (pokemons: Pokemons) => {
      const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemons.name}`)
      setPokemons((p) => [...p, poke.data])
      setLoading(false)
    })
  }

  return (
    <div className='App'>
      <div className='container'>
        <header className='pokemon-header'>Pokemon</header>
        <PokemonColection pokemons={pokemons} />
        <div className="btn">
          <button
            onClick={nextPage}
          >{loading ? 'Loading...' : 'Load more'}</button>
        </div>
      </div>
    </div>
  )
}

export default App
