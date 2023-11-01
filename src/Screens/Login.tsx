export default function Login() {
  const clientId = import.meta.env.VITE_REACT_APP_SPOTIFY_CLIENT_ID;
  const redirectURI = import.meta.env.VITE_REACT_APP_REDIRECT_URI;
  const spotifyOAuthUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectURI}&scope=user-read-private&response_type=token`;

  const handleButtonClick = () => {
    window.location.href = spotifyOAuthUrl;
  }

  return (
    <>
      <h1 className="is-size-3">WeebJams</h1>
      <figure className="image is-32x32">
      <img width='240px' src="../src/assets/Screen Shot 2023-10-24 at 12.51.29 PM.png" alt="WeebJams" />
</figure>
      <section>
        <p>A responsive web application that utilizes the Jikan API and the Spotify APi to search for Anime openings and endings and find out if they are available for streaming and listening.
        </p>
      </section>
      <button className="button is-large is-rounded" onClick={handleButtonClick}> Login with Spotify
</button>
    </>
  )
}