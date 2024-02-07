/** @format */

import React, { useState, useEffect, useRef } from 'react';

import ConfettiComponent from '../Confetti';
import './homepage.scss';

const Homepage = () => {
  const URL = 'https://pokeapi.co/api/v2/pokemon/';

  const [pokemonData, setPokemonData] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [dialogText, setDialogText] = useState('Caricamento in corso...'); // Testo predefinito per il dialogo
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [loading, setLoading] = useState(false); // Aggiungi stato per il caricamento

  const intervalRef = useRef(null);

  useEffect(() => {
    const initialPokemonData = Array.from({ length: 6 }).fill(null);
    setPokemonData(initialPokemonData);

    intervalRef.current = animateText();

    return () => clearInterval(intervalRef.current);
  }, []);

  const getRandomPokemon = async () => {
    setLoading(true); // Attiva l'indicatore di caricamento

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
    setDialogText(''); // Ripristina il testo del dialogo dopo il caricamento completato
    clearInterval(intervalRef.current);
    intervalRef.current = animateCongratulations();

    setConfetti(true); // Attiva l'effetto di coriandoli

    setTimeout(() => {
      setConfetti(false);
    }, 6000);

    setLoading(false); // Disattiva l'indicatore di caricamento
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
    }, 10);

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
    }, 10);

    return interval;
  };

  return (
    <>
      <div className='sfondo'>
        {confetti && <ConfettiComponent />}{' '}
        <div className='container'>
          <div className='team'>
            {loading ? (
              <div className='loading-container'>
                <svg
                  class='pl'
                  viewBox='0 0 160 160'
                  width='160px'
                  height='160px'
                  xmlns='http://www.w3.org/2000/svg'>
                  <defs>
                    <linearGradient
                      id='grad'
                      x1='0'
                      y1='0'
                      x2='0'
                      y2='1'>
                      <stop
                        offset='0%'
                        stop-color='#000'
                      />
                      <stop
                        offset='100%'
                        stop-color='#fff'
                      />
                    </linearGradient>
                    <mask id='mask1'>
                      <rect
                        x='0'
                        y='0'
                        width='160'
                        height='160'
                        fill='url(#grad)'
                      />
                    </mask>
                    <mask id='mask2'>
                      <rect
                        x='28'
                        y='28'
                        width='104'
                        height='104'
                        fill='url(#grad)'
                      />
                    </mask>
                  </defs>

                  <g>
                    <g class='pl__ring-rotate'>
                      <circle
                        class='pl__ring-stroke'
                        cx='80'
                        cy='80'
                        r='72'
                        fill='none'
                        stroke='hsl(223,90%,55%)'
                        stroke-width='16'
                        stroke-dasharray='452.39 452.39'
                        stroke-dashoffset='452'
                        stroke-linecap='round'
                        transform='rotate(-45,80,80)'
                      />
                    </g>
                  </g>
                  <g mask='url(#mask1)'>
                    <g class='pl__ring-rotate'>
                      <circle
                        class='pl__ring-stroke'
                        cx='80'
                        cy='80'
                        r='72'
                        fill='none'
                        stroke='hsl(193,90%,55%)'
                        stroke-width='16'
                        stroke-dasharray='452.39 452.39'
                        stroke-dashoffset='452'
                        stroke-linecap='round'
                        transform='rotate(-45,80,80)'
                      />
                    </g>
                  </g>

                  <g>
                    <g
                      stroke-width='4'
                      stroke-dasharray='12 12'
                      stroke-dashoffset='12'
                      stroke-linecap='round'
                      transform='translate(80,80)'>
                      <polyline
                        class='pl__tick'
                        stroke='hsl(223,10%,90%)'
                        points='0,2 0,14'
                        transform='rotate(-135,0,0) translate(0,40)'
                      />
                      <polyline
                        class='pl__tick'
                        stroke='hsl(223,10%,90%)'
                        points='0,2 0,14'
                        transform='rotate(-90,0,0) translate(0,40)'
                      />
                      <polyline
                        class='pl__tick'
                        stroke='hsl(223,10%,90%)'
                        points='0,2 0,14'
                        transform='rotate(-45,0,0) translate(0,40)'
                      />
                      <polyline
                        class='pl__tick'
                        stroke='hsl(223,10%,90%)'
                        points='0,2 0,14'
                        transform='rotate(0,0,0) translate(0,40)'
                      />
                      <polyline
                        class='pl__tick'
                        stroke='hsl(223,10%,90%)'
                        points='0,2 0,14'
                        transform='rotate(45,0,0) translate(0,40)'
                      />
                      <polyline
                        class='pl__tick'
                        stroke='hsl(223,10%,90%)'
                        points='0,2 0,14'
                        transform='rotate(90,0,0) translate(0,40)'
                      />
                      <polyline
                        class='pl__tick'
                        stroke='hsl(223,10%,90%)'
                        points='0,2 0,14'
                        transform='rotate(135,0,0) translate(0,40)'
                      />
                      <polyline
                        class='pl__tick'
                        stroke='hsl(223,10%,90%)'
                        points='0,2 0,14'
                        transform='rotate(180,0,0) translate(0,40)'
                      />
                    </g>
                  </g>
                  <g mask='url(#mask1)'>
                    <g
                      stroke-width='4'
                      stroke-dasharray='12 12'
                      stroke-dashoffset='12'
                      stroke-linecap='round'
                      transform='translate(80,80)'>
                      <polyline
                        class='pl__tick'
                        stroke='hsl(223,90%,80%)'
                        points='0,2 0,14'
                        transform='rotate(-135,0,0) translate(0,40)'
                      />
                      <polyline
                        class='pl__tick'
                        stroke='hsl(223,90%,80%)'
                        points='0,2 0,14'
                        transform='rotate(-90,0,0) translate(0,40)'
                      />
                      <polyline
                        class='pl__tick'
                        stroke='hsl(223,90%,80%)'
                        points='0,2 0,14'
                        transform='rotate(-45,0,0) translate(0,40)'
                      />
                      <polyline
                        class='pl__tick'
                        stroke='hsl(223,90%,80%)'
                        points='0,2 0,14'
                        transform='rotate(0,0,0) translate(0,40)'
                      />
                      <polyline
                        class='pl__tick'
                        stroke='hsl(223,90%,80%)'
                        points='0,2 0,14'
                        transform='rotate(45,0,0) translate(0,40)'
                      />
                      <polyline
                        class='pl__tick'
                        stroke='hsl(223,90%,80%)'
                        points='0,2 0,14'
                        transform='rotate(90,0,0) translate(0,40)'
                      />
                      <polyline
                        class='pl__tick'
                        stroke='hsl(223,90%,80%)'
                        points='0,2 0,14'
                        transform='rotate(135,0,0) translate(0,40)'
                      />
                      <polyline
                        class='pl__tick'
                        stroke='hsl(223,90%,80%)'
                        points='0,2 0,14'
                        transform='rotate(180,0,0) translate(0,40)'
                      />
                    </g>
                  </g>

                  <g>
                    <g transform='translate(64,28)'>
                      <g
                        class='pl__arrows'
                        transform='rotate(45,16,52)'>
                        <path
                          fill='hsl(3,90%,55%)'
                          d='M17.998,1.506l13.892,43.594c.455,1.426-.56,2.899-1.998,2.899H2.108c-1.437,0-2.452-1.473-1.998-2.899L14.002,1.506c.64-2.008,3.356-2.008,3.996,0Z'
                        />
                        <path
                          fill='hsl(223,10%,90%)'
                          d='M14.009,102.499L.109,58.889c-.453-1.421,.559-2.889,1.991-2.889H29.899c1.433,0,2.444,1.468,1.991,2.889l-13.899,43.61c-.638,2.001-3.345,2.001-3.983,0Z'
                        />
                      </g>
                    </g>
                  </g>
                  <g mask='url(#mask2)'>
                    <g transform='translate(64,28)'>
                      <g
                        class='pl__arrows'
                        transform='rotate(45,16,52)'>
                        <path
                          fill='hsl(333,90%,55%)'
                          d='M17.998,1.506l13.892,43.594c.455,1.426-.56,2.899-1.998,2.899H2.108c-1.437,0-2.452-1.473-1.998-2.899L14.002,1.506c.64-2.008,3.356-2.008,3.996,0Z'
                        />
                        <path
                          fill='hsl(223,90%,80%)'
                          d='M14.009,102.499L.109,58.889c-.453-1.421,.559-2.889,1.991-2.889H29.899c1.433,0,2.444,1.468,1.991,2.889l-13.899,43.61c-.638,2.001-3.345,2.001-3.983,0Z'
                        />
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
            ) : (
              pokemonData.map((pokemon, index) => generateCard(pokemon, index))
            )}

            {!loading && !buttonClicked && (
              <div className='bottone'>
                <button
                  className='pokeball'
                  onClick={getRandomPokemon}
                  style={{
                    visibility: buttonClicked ? 'hidden' : 'visible',
                  }}></button>
              </div>
            )}
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
