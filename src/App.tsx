import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import axios from 'axios';
import Input from './Components/Input'
import Login from './Screens/Login';
import SongDetails from './Components/SongDetails';
import './App.css'
import { sendJikanData, getAnimeTheme, searchSongRegex } from './constants';
import { MalIDandTitles } from './interfaces/anime-interface';
import Footer from './Components/Footer';
import AnimeResults from './Components/AnimeResults';



const SearchButtonContainer = styled.div`
display: flex;
justify-content: end;
margin-right: 32px;
`


function App() {
  const [inputValue, setInputValue] = useState('');
  const [animeData, setAnimeData] = useState<any>({});
  const [filteredAnime, setFilteredAnime] = useState<any>([]);
  const [animeId, setAnimeId] = useState(null);
  const [animeTheme, setAnimeThemes] = useState<any>([]);
  const [buttonPressed, setButtonPressed] = useState(false);
  const [selectedAnime, setSelectedAnime] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const hash = window.location.hash;
    let localToken = window.localStorage.getItem("token");

    if (!localToken && hash) {
      const tokenPart = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"));

      if (tokenPart) {
        const token = tokenPart.split("=")[1];
        window.location.hash = "";
        window.localStorage.setItem("token", token);
        setToken(token);
      }
    } else if (localToken) {
      setToken(localToken);
    }
  }, []);



  useEffect(() => {
    if (buttonPressed) {
      axios.get(sendJikanData(inputValue)).then((response) => {
        setAnimeData(response.data);
        setButtonPressed(false);
        const malIdAndTitles = animeData?.data?.map((anime: MalIDandTitles) => ({
          mal_id: anime.mal_id,
          title_english: anime.title_english,
        }));

        const filteredMalIdAndTitles = malIdAndTitles?.filter((anime: MalIDandTitles) => {
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
    setAnimeData({});
    setFilteredAnime([]);
    setAnimeId(null);
    setAnimeThemes([]);
    setSelectedAnime(false);
  };

  const getAnimeTheme = (animeId: any) => {
    axios.get(`https://api.jikan.moe/v4/anime/${animeId}/themes`).then((response) => {
      setAnimeThemes(response.data);
      console.log(response.data);
    }).catch((error) => {
      console.error(error);
    })
  }

  const handleAnimeClick = (malId: any) => {
    setAnimeId(malId);
    getAnimeTheme(malId);
    setSelectedAnime(true);
  }


  console.log(animeTheme)


  return (
    <>
      {token ? (
        <div>
          <Input
            label="Enter Anime title here"
            value={inputValue}
            onChange={handleInputChange}
          />
          <SearchButtonContainer>
            <button onClick={getAnime}>Get Anime</button>
          </SearchButtonContainer>
            
          {
            // Figure out how to break this to its own component
            filteredAnime && filteredAnime.length > 0 ? (
            <AnimeResults filteredAnime={filteredAnime} handleAnimeClick={handleAnimeClick} />
            ) : (
              <p style={{textAlign:'left'}}>There currently is no anime matching what you searched for. If you know the anime exists try searching it with the English Name</p>
            )
          }
          {selectedAnime ? <SongDetails animeTheme={animeTheme} /> : ''}
        </div>
      ) : <Login />}
    </>
  )
}

export default App
