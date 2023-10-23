import React, { useState } from 'react'
import axios from 'axios';
import Input from './Components/Input'
import './App.css'
import { sendJikanData, getAnimeTheme } from './constants';


function App() {
  const [inputValue, setInputValue] = useState('');
  const [animeData, setAnimeData] = useState<any>({});
  const [filteredAnime, setFilteredAnime] = useState<any>([]);
  const [animeId, setAnimeId] = useState(null);
  const [animeTheme, setAnimeThemes] = useState([]);

  const handleInputChange = (newValue: string) => {
    setInputValue(newValue);
  };

  const getAnime = () => {
    axios.get(sendJikanData(inputValue)).then((response) => {
      setAnimeData(response.data);
      const malIdAndTitles = animeData?.data?.map((anime:any) => ({
        mal_id: anime.mal_id,
        title: anime.title,
      }));
    
      const filteredMalIdAndTitles = malIdAndTitles?.filter((anime:any) => {
        return anime?.title?.toLowerCase().includes(inputValue.toLowerCase());
      });

      setFilteredAnime(filteredMalIdAndTitles);
    }).catch((error) => {
      console.error(error);
    });
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
                  <td>{anime.title}</td>
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
