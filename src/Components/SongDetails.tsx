import React, { useState, useEffect } from 'react';
import Select from './Select';
import axios from 'axios';
import {searchSpotify, songTypeOptions } from '../constants'



export default function SongDetails({ animeTheme }: any) {

  console.log(animeTheme?.data?.openings)
  const accessToken = import.meta.env.VITE_REACT_APP_ACCESS_TOKEN;

  function createSongMap(songs:any) {
    return new Map(
      songs?.map((theme:any) => {
        const match = theme.match(/"([^"]+)" by ([^(]+)\(/);
        if (match) {
          const title = match[1];
          const artist = match[2];
          return [title, artist];
        }
        return null;
      }).filter(Boolean) 
    );
  }

  const openingMap: Map<any,any> = createSongMap(animeTheme?.data?.openings);
  const closingMap: Map<any,any> = createSongMap(animeTheme?.data?.endings);




  const [selectedAnimeTheme, setSelectedAnimeTheme] = useState('');
  const [showSongs, setShowSongs] = useState('none');
  const [searchType, setSearchStype] = useState('track');
  
  const search = (selectedAnimeTheme:string, searchType: string,) => {
    axios.get(searchSpotify, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        q: selectedAnimeTheme,
        type: searchType,
      }
    }).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.error(error);
    })
  }

  const searchTrackorArtist = (title: string, searchType: string) => {
    setSelectedAnimeTheme(title);
    search(title,searchType);
    console.log(title);
  }

  useEffect(() => {
    search(selectedAnimeTheme, searchType);
  },[selectedAnimeTheme]);


  const handleSelectChange = (e:any) => {
    setShowSongs(e.target.value);
  }



  return (
    <>
      <Select onChange={handleSelectChange} options={songTypeOptions} value={showSongs} />
      {showSongs === 'Openings' ? <table>
  <thead>
    <tr>
      <th>Title</th>
      <th>Artist</th>
      <th>Search on Spotify</th>
    </tr>
  </thead>
  <tbody>
    {[...openingMap.entries()].map(([title, artist]) => (
      <tr key={title}>
        <td>{title}</td>
        <td>{artist}</td>
        <td><button onClick={() => searchTrackorArtist(title,searchType)}>
                            Select
                          </button></td>
      </tr>
    ))}
  </tbody>
      </table> : ''}
      {showSongs === 'Closings' ? <table>
  <thead>
    <tr>
      <th>Title</th>
            <th>Artist</th>
            <th>Search on Spotify</th>
    </tr>
  </thead>
  <tbody>
    {[...closingMap.entries()].map(([title, artist]) => (
      <tr key={title}>
        <td>{title}</td>
        <td>{artist}</td>
      </tr>
    ))}
  </tbody>
      </table> : ''}
    </>
  )
}