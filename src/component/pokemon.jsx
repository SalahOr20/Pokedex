import { useState } from 'react';
import { Modal } from 'react-bootstrap';

const styles = {
  pokemonModal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  },
  pokemonContent: {
    backgroundColor: '#fceabb',
    borderRadius: '8px',
    width: '80%',
    maxWidth: '600px',
    padding: '20px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  pokemonImage: {
    width: '150px',
    height: '150px',
    cursor: 'pointer',
    borderRadius: '50%',
    border: '2px solid #ffb74d',
    transition: 'transform 0.3s ease-in-out',
  },
  hoveredPokemonImage: {
    transform: 'scale(1.1)',
  },
  statCard: {
    backgroundColor: '#ffcc80',
    borderRadius: '8px',
    padding: '10px',
    margin: '5px 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  evolutionContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '20px',
  },
  evolutionInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  evolutionImage: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    border: '2px solid #ccc',
    margin: '5px',
  },
};

function Pokemon({ pokemon, reset, evolFrom, evolTo ,setPokemon}) {
  const [selectedImage, setSelectedImage] = useState('image_shiny');
  const [sl,setsl]=useState('fr')


  const handleImage = () => {
  
    setSelectedImage(selectedImage === 'image_shiny' ? 'image' : 'image_shiny');
  };
  
  const handlePokemonEvol=(pokemon)=>{
    setPokemon(pokemon)
    console.log(pokemon)
  }

 
  return (
    <Modal show={pokemon != null} onHide={reset} centered style={styles.pokemonModal}>
      <Modal.Header closeButton>
        <Modal.Title className="text-center">{pokemon && pokemon.name.fr}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
     
        {pokemon && (
          <div className="text-center">
            <img
              src={pokemon[selectedImage]}
              alt={pokemon.name.fr}
              style={styles.pokemonImage}
              onClick={handleImage}
            />
         
            <div style={styles.pokemonContent}>
              <p style={{ color: '#e64a19', marginBottom: '10px', fontSize: '18px' }}>Statistiques</p>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {Object.keys(pokemon.stats).map((statName) => (
                  <div key={statName} style={styles.statCard}>
                    <p>{statName}:</p>
                    <p>{pokemon.stats[statName]}</p>
                  </div>
                ))}
              </div>
            </div>
            <div style={styles.evolutionContainer}>
              <div style={styles.evolutionInfo}>
                <p style={{ color: '#e64a19', marginBottom: '10px', fontSize: '18px' }}>Evol From</p>
                {evolFrom &&
                  evolFrom.map((pokemon) => (
                    <img
            
                      src={pokemon.image}
                      onClick={() => handlePokemonEvol(pokemon)}
                      style={styles.evolutionImage}
                    />
                  ))}
              </div>
              <div style={styles.evolutionInfo}>
                <p style={{ color: '#e64a19', marginBottom: '10px', fontSize: '18px' }}>Evol To</p>
                {evolTo &&
                  evolTo.map((pokemon) => (
                    <img
                    
                      src={pokemon.image}
                      onClick={() => handlePokemonEvol(pokemon)}
                     
                      style={styles.evolutionImage}
                    />
                  ))}
              </div>
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default Pokemon;
