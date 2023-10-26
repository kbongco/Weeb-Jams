export default function Login() {
  const clientId = import.meta.env.VITE_REACT_APP_SPOTIFY_CLIENT_ID;
  const redirectURI = import.meta.env.VITE_REACT_APP_REDIRECT_URI;
  const spotifyOAuthUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectURI}&scope=user-read-private&response_type=token`;

  return (
    <>
      <h1 className="is-size-1">WeebJams</h1>
      <figure className="image is-32x32">
      <img width='240px' src="../src/assets/Screen Shot 2023-10-24 at 12.51.29 PM.png" alt="WeebJams" />
</figure>
      <section>
        <p>Ever watch an anime to find that the OP or the ED is great and you want to find out if its on 
          spotify so you can add it to a playlist? Want to save yourself the disappointment and find out 
          before you go into spotify and disappoint yourself? 
          This is where Weeb Jams come in! 
        </p>
        <p>Login using your spotify account and you can search an anime and find out if their OPs/EDs are on
          spotify
        </p>
        <a href={spotifyOAuthUrl} className="button is-medium is-blue">Login to Spotify</a>
      </section>
    </>
  )
}