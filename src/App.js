import React, { useEffect, useState } from 'react';
import './App.css';
import Loading from './component/loanding';
import Traduction from './component/i18n.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import Pokemon from './component/pokemon.jsx';
import logo from './Pokemon.png'
import { useTranslation } from 'react-i18next';
import LanguageSelector from './component/LanguageSelector.jsx';

function App() {
  const [dataPokemon, setDataPokemon] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataType, setDataType] = useState();
  const [filtredData, setFiltredData] = useState([]);
  const [typeSelected, setTypeSelected] = useState('tous');
  const [genSelected, setGenSelected] = useState('tous');
  const [search, setSearch] = useState('');
  const [selectedPokemon, setPokemon] = useState('');
  const [evolutionFrom,setEvolutionFrom]=useState('')
  const [evolutionTo,setEvolutionTo]=useState('')
  const { t } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState('fr'); 

  useEffect(() => {
    fetch('https://pokedex-api.3rgo.tech/api/pokemon')
      .then(response => response.json())
      .then(json => {
        setDataPokemon(json.data);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch('https://pokedex-api.3rgo.tech/api/types')
      .then(response => response.json())
      .then(json => setDataType(json.data));
  }, []);
  
  const HandleTypeSelected = e => {
    setTypeSelected(e.target.value);
  };

  const handleGenSelected = e => {
    setGenSelected(e.target.value);
  };

  const handleSearch = e => {
    setSearch(e.target.value.toLowerCase());
  };

  const HandlePokemon = (pokemon) => {
    const evolvedFromIds = Object.keys(pokemon.evolvedFrom || {}).map(Number);
    const evolvesToIds = Object.keys(pokemon.evolvesTo || {}).map(Number);
    
    const evolutionFromPokemons = dataPokemon.filter((p) => evolvedFromIds.includes(p.id));
    const evolutionToPokemons = dataPokemon.filter((p) => evolvesToIds.includes(p.id));
  
    console.log("Evolution From:", evolutionFromPokemons);
    console.log("Evolution To:", evolutionToPokemons);
    console.log("Selected Pokemon:", pokemon);
  
    setEvolutionFrom(evolutionFromPokemons);
    setEvolutionTo(evolutionToPokemons);
    setPokemon(pokemon); 
  };

  const resetPokemon = () => {
    setPokemon('');
  };

  const handleSort = (sortBy) => {
    if (filtredData) {
      let sortedPokemonData;
      if (sortBy === 'asc') {
        sortedPokemonData = [...filtredData].sort((a, b) =>
          a.name.fr.localeCompare(b.name.fr)
        );
      } else if (sortBy === 'desc') {
        sortedPokemonData = [...filtredData].sort((a, b) =>
          b.name.fr.localeCompare(a.name.fr)
        );
      }
      else if (sortBy==='taille_asc'){
        sortedPokemonData = [...filtredData].sort((a, b) =>
        a.height-b.height
        );
      }
      else if (sortBy==='taille_desc'){
          sortedPokemonData = [...filtredData].sort((a, b) =>
          b.height-a.height
          );
      }
      else if (sortBy==='poid_asc'){
        sortedPokemonData = [...filtredData].sort((a, b) =>
        a.weight-b.weight
        );
    }
      else if (sortBy==='poid_desc'){
      sortedPokemonData = [...filtredData].sort((a, b) =>
      b.weight-a.weight
      );
     
    }
      setFiltredData(sortedPokemonData);
    }
  };
   
  useEffect(() => {
    let filteredData = dataPokemon;

    if (typeSelected !== 'tous') {
      filteredData = filteredData.filter(pokemon =>
        pokemon.types.includes(parseInt(typeSelected))
      );
    }

    if (genSelected !== 'tous') {
      filteredData = filteredData.filter(
        pokemon => pokemon.generation === parseInt(genSelected)
      );
    }

    if (search) {
      filteredData = filteredData.filter(pokemon =>
        pokemon.name.fr.toLowerCase().includes(search)
      );
    }

    setFiltredData(filteredData);
  }, [genSelected, typeSelected, dataPokemon, search]);

  return (
    <div className="App">
       <LanguageSelector setSelectedLanguage={setSelectedLanguage} /> 
      <header className="bg-warning text-white py-3">
         <img className='logo' src={logo}/>
      </header>
      <main className="py-3">
        {isLoading ? (
          <Loading />
        ) : (
          <div className="container">
          
            <div className="row mb-3" id='Functions'>
              <div className="col-md-6">
                <input
                  id="search-bar"
                  type="text"
                  placeholder={t("Rechercher par nom")}
                  onChange={handleSearch}
                />
              </div>
              <div className="col-md-2">
                <label htmlFor="type-select">Type :</label>
                <select
                  id="type-select"
                  onChange={HandleTypeSelected}
                  className="form-control"
                >
                  <option value="tous">Tous</option>
                  {dataType &&
                    dataType.map(type => (
                      <option key={type.id} value={type.id}>
                        {type.name.fr}
                      </option>
                    ))}
                </select>
              </div>
              <div className="col-md-2">
              <label>Tri :</label>
<select
  id="sort-select"
  onChange={(e) => handleSort(e.target.value)}
  className="form-control"
  defaultValue="tri"
>
  <option value="tri" disabled hidden>Triez par</option>
  <option value="asc"> nom croissant</option>
  <option value="desc"> nom décroissant</option>
  <option value="taille_asc"> taille croissante</option>
  <option value="taille_desc"> taille décroissante</option>
  <option value="poid_asc"> poids croissant</option>
  <option value="poid_desc"> poids décroissant</option>
</select>
</div>
              <div className="col-md-2">
                <label htmlFor="gen-select">Generation :</label>
                <select
                  id="gen-select"
                  onChange={handleGenSelected}
                  className="form-control"
                >
                  <option value="tous">Tous</option>
                  {dataPokemon &&
                    [
                      ...new Set(dataPokemon.map(pokemon => pokemon.generation)),
                    ].map(gen => (
                      <option key={gen} value={gen}>
                        Génération {gen}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="row" id='pokemons'>
              {filtredData.length > 0 ? (
                filtredData.map(pokemon => (
                  <div
                    key={pokemon.id}
                    className="col-lg-2 col-md-3 col-sm-4 col-6 mb-3"
                    onClick={() => {
                      HandlePokemon(pokemon);
                    
                    }}
                    
                  >
                    <div className="card shadow-sm" id="cards">
                      <img
                        src={pokemon.image}
                        alt={pokemon.name[selectedLanguage]}
                        className="card-img-top"
                      />
                      <div className="card-body">
                        <h5 className="card-title">{pokemon.name[selectedLanguage]}</h5>
                        <p className="card-text">
                          Generation: {pokemon.generation}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col">
                  <h3>Aucun élément n'est affiché</h3>
                </div>
              )}
            </div>
          </div>
        )}
        <div></div>
        {selectedPokemon && (
          <Pokemon setPokemon={setPokemon} pokemon={selectedPokemon} reset={resetPokemon} evolFrom={evolutionFrom} evolTo={evolutionTo}/>
        )}
      </main>
    </div>
  );
}

export default App;
