import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Input from './Components/Input'
import './App.css'
import { sendJikanData, getAnimeTheme } from './constants';
import { MalIDandTitles } from './interfaces/anime-interface';



function App() {
  const [inputValue, setInputValue] = useState('');
  const [animeData, setAnimeData] = useState<any>({});
  const [filteredAnime, setFilteredAnime] = useState<any>([]);
  const [animeId, setAnimeId] = useState(null);
  const [animeTheme, setAnimeThemes] = useState([]);
  const [buttonPressed, setButtonPressed] = useState(false);


  useEffect(() => {
    if (buttonPressed) {
    axios.get(sendJikanData(inputValue)).then((response) => {
      console.log(response.data);
      setAnimeData(response.data);
      setButtonPressed(false); 
      const malIdAndTitles = animeData?.data?.map((anime:MalIDandTitles) => ({
        mal_id: anime.mal_id,
        title_english: anime.title_english,
      }));
    
      const filteredMalIdAndTitles = malIdAndTitles?.filter((anime:MalIDandTitles) => {
        return anime?.title_english?.toLowerCase().includes(inputValue.toLowerCase());
      });

      setFilteredAnime(filteredMalIdAndTitles);
      console.log(animeData);
    }).catch((error) => {
      console.error(error);
    });
    }
  }, [buttonPressed, inputValue])
  const getAnime = () => { 
    setButtonPressed(true);
  }


  const handleInputChange = (newValue: string) => {
    setInputValue(newValue);
  };

  const getAnimeTheme = (animeId) => {
    axios.get(`https://api.jikan.moe/v4/anime/${animeId}/themes`).then((response) => {
      setAnimeThemes(response.data);
      console.log(response.data);
    }).catch((error) => {
      console.error(error);
    })
  }

  const handleAnimeClick = (malId:any) => {
    setAnimeId(malId);
    console.log(malId);
    getAnimeTheme(malId);
  }


  return (
    <>
      <div>
        <p>Test</p>
        <Input
          label="Test"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button onClick={getAnime}>Get Anime</button>
        {
        filteredAnime && filteredAnime.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredAnime.map((anime: any) => (
                <tr key={anime.mal_id}>
                  <td>{anime.title_english}</td>
                  <td>
                    <button onClick={() => handleAnimeClick(anime.mal_id)}>
                      Select
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h1>No anime found</h1>
        )
      }
    </div>
    </>
  )
}

export default App
