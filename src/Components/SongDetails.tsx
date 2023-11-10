import React, { useState, useEffect, ChangeEvent } from 'react';
import Select from './Select';
import axios from 'axios';
import { searchSpotify, songTypeOptions } from '../constants'



export default function SongDetails({ animeTheme }: any) {
  console.log(animeTheme);

  console.log(animeTheme?.data?.openings)
  const accessToken = import.meta.env.VITE_REACT_APP_ACCESS_TOKEN;

  function createSongMap(songs: any) {
    return new Map(
      songs?.map((theme: string) => {
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

  const openingMap: Map<any, any> = createSongMap(animeTheme?.data?.openings);
  const closingMap: Map<any, any> = createSongMap(animeTheme?.data?.endings);




  const [selectedAnimeTheme, setSelectedAnimeTheme] = useState('');
  const [showSongs, setShowSongs] = useState('none');
  const [songResults, setSongResults] = useState<any>([]);
  const [selectedArtist, setSelectedArtist] = useState('');

  const search = (selectedAnimeTheme: string, selectedArtist: string) => {
    axios.get(searchSpotify, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        q: selectedAnimeTheme, selectedArtist,
        type: 'track,artist'
      }
    }).then((response) => {
      console.log(response);
      console.log(response.data.tracks);
      setSongResults(response.data.tracks);
    }).catch((error) => {
      console.error(error);
    })
  }

  const searchTrackorArtist = (title: string, artist: string) => {
    setSelectedArtist(artist);
    setSelectedAnimeTheme(title);
    console.log(selectedArtist);
    console.log(title);
  }

  useEffect(() => {
    search(selectedAnimeTheme, selectedArtist);
    console.log(selectedAnimeTheme);
  }, [selectedAnimeTheme, selectedArtist]);


  const handleSelectChange = (e: ChangeEvent<HTMLInputElement>) => {
    setShowSongs(e.target.value);
  }

  const findExactSong = songResults?.items?.find((result: any) => {
    console.log(result);
    return (
      result.name === selectedAnimeTheme
    )
  })

  console.log(selectedAnimeTheme);

  console.log(songResults);
  console.log(findExactSong);

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
              <td><button onClick={() => searchTrackorArtist(title, artist)}>
                Select
              </button>
              </td>
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
      <div className='chbi-exists'>
        {findExactSong ? <p>The song is licensed and can be listened to and added to a playlist. Don't believe me? Here's the link to <a href='/'>open spotify</a> </p> : <h1>The song isnt licensed</h1>}
      </div>
    </>
  )
}