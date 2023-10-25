import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { searchSongRegex, searchSpotify } from '../constants'
import { AnyComponent } from 'styled-components/dist/types';



export default function SongDetails({ animeTheme }: any) {


  const openingNameArr = animeTheme?.data?.openings.map((theme:any) => {
    const splitBy = theme.split(" by ");
    return splitBy[0].replace(/\d+/g, '').replace(/\"/g, '').replace(/^:\s*/, '').trim();
  })

  const closedThemeArr = animeTheme?.data?.endings.map((theme: any) => {
    const splitBy = theme.split(" by ");
    return splitBy[0].replace(/\d+/g, '').replace(/\"/g, '').replace(/^:\s*/, '').trim();
  })

  const [selectedAnimeTheme, setSelectedAnimeTheme] = useState('');
  const [showOpeningThemes, setShowOpeningThemes] = useState(false);
  const [showClosingThemes, setShowClosingThemes] = useState(false);

  // useEffect(() => {
  //   const search = () => {
  //     axios.post(searchSpotify, null, {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //       params: {
  //         q: selectedAnimeTheme,
  //         type: 'track',
  //       }
  //     }).catch((error) => {
  //       console.error(error);
  //     })
  //   }
  // }, []);

  console.log(selectedAnimeTheme);

  return (
    <>
      <h1>Opening themes</h1>
      <table>
                  <thead>
                    <tr>
                      <th>Song Name</th>
                      <th>Search</th>
                    </tr>
                  </thead>
                  <tbody>
                    {openingNameArr?.map((songName:string, index:number) => (
                      <tr key={index}>
                        <td>{songName}</td>
                        <td>
                          <button onClick={() => setSelectedAnimeTheme(songName)}>
                            Select
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
    </>
  )
}