export const sendJikanData = (inputValue: string) => {
  return `https://api.jikan.moe/v4/anime?q=${inputValue}`
}

export const getAnimeTheme = (id: any) => {
  return `https://api.jikan.moe/v4/anime/${id}/themes`
}

export const searchSongRegex = /\\ "(.*?)\\ "/;

export const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
export const RESPONSE_TYPE = 'token';
