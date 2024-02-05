/** @format */

// /** @format */

// import React, { useState, useEffect, useRef } from 'react';
// import './homepage.scss';

// const Homepage = () => {
//   const URL = 'https://pokeapi.co/api/v2/pokemon/';

//   const [pokemonData, setPokemonData] = useState([]);
//   const [buttonClicked, setButtonClicked] = useState(false);
//   const [dialogText, setDialogText] = useState('');

//   const intervalRef = useRef(null);

//   useEffect(() => {
//     // Al caricamento della pagina, puoi mostrare i card circle vuoti
//     const initialPokemonData = Array.from({ length: 6 }).fill(null);
//     setPokemonData(initialPokemonData);

//     // Inizia il dialogo automaticamente
//     intervalRef.current = animateText();

//     // Cleanup della funzione quando il componente si smonta
//     return () => clearInterval(intervalRef.current);
//   }, []);

//   const getRandomPokemon = async () => {
//     const randomPokemonData = [];
//     const existingPokemonIds = new Set();

//     while (randomPokemonData.length < 6) {
//       const id = Math.floor(Math.random() * 150) + 1;

//       // Check if the Pokemon is not already in the array
//       if (!existingPokemonIds.has(id)) {
//         existingPokemonIds.add(id);

//         const finalUrl = URL + id;

//         try {
//           const response = await fetch(finalUrl);
//           const data = await response.json();
//           randomPokemonData.push(data);
//         } catch (error) {
//           console.error('Errore nella richiesta API:', error);
//         }
//       }
//     }

//     setPokemonData(randomPokemonData);
//     setButtonClicked(true); // Imposta il bottone come premuto
//   };

//   const generateCard = (data, index) => {
//     if (!data) {
//       // Se il dato è vuoto, mostra il card circle vuoto
//       return (
//         <div
//           key={index}
//           className='card-circle'>
//           <div className='pokemon-info'></div>
//         </div>
//       );
//     }

//     const imgSrc = data.sprites.other.dream_world.front_default;
//     const pokeName = data.name[0].toUpperCase() + data.name.slice(1);

//     return (
//       <div
//         key={index}
//         className='card-circle'>
//         <div className='pokemon-info'>
//           <img
//             src={imgSrc}
//             alt={pokeName}
//           />
//           <p>{pokeName}</p>
//         </div>
//       </div>
//     );
//   };

//   const animateText = () => {
//     let i = 0;
//     const pokemonDialog =
//       'Ciao, giovane Allenatore! Benvenuto nel meraviglioso mondo dei Pokémon! Sono il Professor Oak, il tuo mentore in questa straordinaria avventura. Prima di iniziare, ricorda che ci sono Pokémon da scoprire, sfide da affrontare e amicizie da stringere. Scegli la squadra con la quale affronterai questo viaggio, clicca sulla Pokèball!';
//     setDialogText(pokemonDialog[0]);
//     const interval = setInterval(() => {
//       setDialogText(prevText => prevText + pokemonDialog[i]);
//       i++;

//       if (i === pokemonDialog.length) {
//         clearInterval(interval);
//         setDialogText(pokemonDialog); // Imposta il testo completo alla fine dell'animazione
//       }
//     }, 50);

//     return interval;
//   };

//   return (
//     <>
//       <div className='sfondo'>
//         <div className='container'>
//           <div className='team'>
//             {pokemonData.map((pokemon, index) => generateCard(pokemon, index))}

//             <div>
//               <button
//                 className='pokeball'
//                 onClick={getRandomPokemon}
//                 disabled={buttonClicked}></button>
//             </div>
//           </div>
//           <div className='professore'>
//             <img
//               src='https://media.pokemoncentral.it/wiki/e/ed/Masters_Professor_Oak.png'
//               alt=''
//             />
//             <div className='dialogo'>
//               <span className='professor-intro'>{dialogText}</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Homepage;

import React, { useState, useEffect, useRef } from 'react';
import './homepage.scss';

const Homepage = () => {
  const URL = 'https://pokeapi.co/api/v2/pokemon/';

  const [pokemonData, setPokemonData] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [dialogText, setDialogText] = useState('');
  const [showCongratulations, setShowCongratulations] = useState(false);

  const intervalRef = useRef(null);

  useEffect(() => {
    // Al caricamento della pagina, puoi mostrare i card circle vuoti
    const initialPokemonData = Array.from({ length: 6 }).fill(null);
    setPokemonData(initialPokemonData);

    // Inizia il dialogo automaticamente
    intervalRef.current = animateText();

    // Cleanup della funzione quando il componente si smonta
    return () => clearInterval(intervalRef.current);
  }, []);

  const getRandomPokemon = async () => {
    const randomPokemonData = [];
    const existingPokemonIds = new Set();

    while (randomPokemonData.length < 6) {
      const id = Math.floor(Math.random() * 150) + 1;

      // Check if the Pokemon is not already in the array
      if (!existingPokemonIds.has(id)) {
        existingPokemonIds.add(id);

        const finalUrl = URL + id;

        try {
          const response = await fetch(finalUrl);
          const data = await response.json();
          randomPokemonData.push(data);
        } catch (error) {
          console.error('Errore nella richiesta API:', error);
        }
      }
    }

    setPokemonData(randomPokemonData);
    setButtonClicked(true); // Imposta il bottone come premuto
    setShowCongratulations(true); // Mostra il messaggio di congratulazioni
    setDialogText(''); // Resetta la frase del dialogo
    clearInterval(intervalRef.current); // Interrompe l'animazione corrente
    intervalRef.current = animateCongratulations(); // Avvia l'animazione di congratulazioni
  };

  const generateCard = (data, index) => {
    if (!data) {
      // Se il dato è vuoto, mostra il card circle vuoto
      return (
        <div
          key={index}
          className='card-circle'>
          <div className='pokemon-info'></div>
        </div>
      );
    }

    const imgSrc = data.sprites.other.dream_world.front_default;
    const pokeName = data.name[0].toUpperCase() + data.name.slice(1);

    return (
      <div
        key={index}
        className='card-circle'>
        <div className='pokemon-info'>
          <img
            src={imgSrc}
            alt={pokeName}
          />
          <p>{pokeName}</p>
        </div>
      </div>
    );
  };

  const animateText = () => {
    let i = 0;
    const pokemonDialog =
      'Ciao, giovane Allenatore! Benvenuto nel meraviglioso mondo dei Pokémon! Sono il Professor Oak, il tuo mentore in questa straordinaria avventura. Prima di iniziare, ricorda che ci sono Pokémon da scoprire, sfide da affrontare e amicizie da stringere. Scegli la squadra con la quale affronterai questo viaggio, clicca sulla Pokèball!';
    setDialogText(pokemonDialog[0]);
    const interval = setInterval(() => {
      setDialogText(prevText => prevText + pokemonDialog[i]);
      i++;

      if (i === pokemonDialog.length) {
        clearInterval(interval);
        setDialogText(pokemonDialog); // Imposta il testo completo alla fine dell'animazione
      }
    }, 50);

    return interval;
  };

  const animateCongratulations = () => {
    const congratulationsText =
      'Congratulazioni! Questi sono i tuoi compagni per la grande avventura che ti attende! Si parte!';
    setDialogText('');
    let i = 0;
    setDialogText(congratulationsText[0]);
    const interval = setInterval(() => {
      setDialogText(prevText => prevText + congratulationsText[i]);
      i++;

      if (i === congratulationsText.length) {
        clearInterval(interval);
        setDialogText(congratulationsText); // Imposta il testo completo alla fine dell'animazione
      }
    }, 50);

    return interval;
  };

  return (
    <>
      <div className='sfondo'>
        <div className='container'>
          <div className='team'>
            {pokemonData.map((pokemon, index) => generateCard(pokemon, index))}

            <div>
              <button
                className='pokeball'
                onClick={getRandomPokemon}
                disabled={buttonClicked}></button>
            </div>
          </div>
          <div className='professore'>
            <img
              src='https://media.pokemoncentral.it/wiki/e/ed/Masters_Professor_Oak.png'
              alt=''
            />
            <div className='dialogo'>
              <span className='professor-intro'>{dialogText}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
