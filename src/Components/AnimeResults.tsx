import React from 'react';
import styled from 'styled-components';

const ChibiTableContainer = styled.div`
margin-top: 16px;
`

export default function AnimeResults({ filteredAnime, handleAnimeClick }: any) {
  return (
    <ChibiTableContainer>
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
  </ChibiTableContainer>
  )
}