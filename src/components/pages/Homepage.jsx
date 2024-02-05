/** @format */

import React, { useState, useEffect, useRef } from 'react';
import ConfettiComponent from '../Confetti'; // Importa il componente Confetti
import './homepage.scss';

const Homepage = () => {
  const URL = 'https://pokeapi.co/api/v2/pokemon/';

  const [pokemonData, setPokemonData] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [dialogText, setDialogText] = useState('');
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [confetti, setConfetti] = useState(false);

  const intervalRef = useRef(null);

  useEffect(() => {
    const initialPokemonData = Array.from({ length: 6 }).fill(null);
    setPokemonData(initialPokemonData);

    intervalRef.current = animateText();

    return () => clearInterval(intervalRef.current);
  }, []);

  const getRandomPokemon = async () => {
    const randomPokemonData = [];
    const existingPokemonIds = new Set();

    while (randomPokemonData.length < 6) {
      const id = Math.floor(Math.random() * 150) + 1;

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
    setButtonClicked(true);
    setShowCongratulations(true);
    setDialogText('');
    clearInterval(intervalRef.current);
    intervalRef.current = animateCongratulations();

    setConfetti(true); // Attiva l'effetto di coriandoli

    setTimeout(() => {
      setConfetti(false);
    }, 6000);
  };

  const generateCard = (data, index) => {
    if (!data) {
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
        setDialogText(pokemonDialog);
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
        setDialogText(congratulationsText);
      }
    }, 50);

    return interval;
  };

  return (
    <>
      <div className='sfondo'>
        {confetti && <ConfettiComponent />}{' '}
        {/* Mostra Confetti se confetti è true */}
        <div className='container'>
          <div className='team'>
            {pokemonData.map((pokemon, index) => generateCard(pokemon, index))}

            <div className='bottone'>
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
