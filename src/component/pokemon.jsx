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
    backgroundColor: '#ffebbb',
    borderRadius: '8px',
    maxWidth: '400px',
    padding: '20px',
    textAlign: 'center',
  },
  pokemonImage: {
    width: '150px',
    height: '150px',
    cursor: 'pointer',
    borderRadius: '50%',
    border: '2px solid #ccc',
    transition: 'transform 0.2s ease-in-out',
  },
  hoveredPokemonImage: {
    transform: 'scale(1.1)',
  },
};

function Pokemon({ pok, reset, evolFrom,evolTo }) {
  const [selectedImage, setSelectedImage] = useState('image_shiny');
  const [rotation, setRotation] = useState(360);

  const handleImage = () => {
    setRotation(rotation + 360); // Augmente la rotation de 360 degrés à chaque clic
    setSelectedImage(selectedImage === 'image_shiny' ? 'image' : 'image_shiny');
  };

  console.log(evolFrom,evolTo)


  return (
    <Modal show={pok != null} onHide={reset} centered style={styles.pokemonModal}>
      <Modal.Header closeButton>
        <Modal.Title className="text-center">{pok && pok.name.fr}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {pok && (
          <div className="text-center">
            <img
              src={pok[selectedImage]}
              alt={pok.name.fr}
              style={{
                ...styles.pokemonImage,
                ...(selectedImage === 'image_shiny' && {
                  ...styles.hoveredPokemonImage,
                  transform: `scale(1.1) rotate(${rotation}deg)`, // Applique la rotation
                }),
              }}
              onClick={handleImage}
            />
            <p>
              <strong>ID:</strong> {pok.id}
            </p>
            <p>
              <strong>Height:</strong> {pok.height}
            </p>
            <p>
              <strong>Weight:</strong> {pok.weight}
            </p>
            <div>
                <p>Evol From</p>
                {evolFrom&&evolFrom.map((pokemon)=>
                <img src={pokemon.image}/>)}
            </div>
            <div>
            <p>Evol To</p>
                {evolTo && evolTo.map((pokemon)=>
                <img src={pokemon.image}/>)}
            </div>

          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default Pokemon;
