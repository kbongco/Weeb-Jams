import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const HeaderContainer = styled.div`
display: flex;
justify-content: center;
gap: 16px
`

const IconContainer = styled.div`
display: flex;
align-items: center;
color: black;
`

const InformationSection = styled.section`
padding-left: 32px;
padding-right: 32px;
`

const InformationParaGraph = styled.p`
text-align: left;
`

export default function Login() {

  const clientId = import.meta.env.VITE_REACT_APP_SPOTIFY_CLIENT_ID;
  const redirectURI = import.meta.env.VITE_REACT_APP_REDIRECT_URI;
  const spotifyOAuthUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectURI}&scope=user-read-private&response_type=token`;

  const handleButtonClick = () => {
    window.location.href = spotifyOAuthUrl;
  }

  return (
    <>
      <div className='columns'>
        <HeaderContainer>
          <IconContainer>
            <FontAwesomeIcon icon={faMusic} size='4x' />
          </IconContainer>
          <h1 className="is-size-4">WeebJams</h1>
        </HeaderContainer>
      </div>
      <figure className="image is-5by4">
        <img width='318px' src="../src/assets/Screen Shot 2023-10-24 at 12.51.29 PM.png" alt="WeebJams" />
      </figure>
      <InformationSection>
        <InformationParaGraph>A responsive web application that utilizes the Jikan API and the Spotify APi to search for Anime openings and endings and find out if they are available for streaming and listening.
        </InformationParaGraph>
      </InformationSection>
      <button className="button is-large is-rounded" onClick={handleButtonClick}> Login with Spotify
      </button>
    </>
  )
}