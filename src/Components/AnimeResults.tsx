import React, { useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, TablePagination, Button } from '@mui/material';

const AnimeTable = ({ filteredAnime, handleAnimeClick }:any) => {
  const rowsPerPage = 5; // Number of entries per page
  const [page, setPage] = useState(0);

  const handleChangePage = (event:Event, newPage:any) => {
    setPage(newPage);
  };

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontSize: '1.2rem', color: 'white' }}>Title</TableCell>
            <TableCell sx={{ fontSize: '1.2rem', color: 'white' }}>Search</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredAnime.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((anime:any) => (
            <TableRow key={anime.mal_id}>
              <TableCell sx={{ fontSize: '1.2rem', color: 'white' }}>{anime.title_english}</TableCell>
              <TableCell>
                <Button variant="contained" color="primary" onClick={() => handleAnimeClick(anime.mal_id)}>
                  Select
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* {filteredAnime.length > rowsPerPage && (
        <TablePagination
          component="div"
          count={filteredAnime.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
        />
      )} */}
    </div>
  );
};

export default AnimeTable;