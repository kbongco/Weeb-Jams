# WeebJams

## Table of contents
 [WeebJams](#weebjams)
- [WeebJams](#weebjams)
  - [Table of contents](#table-of-contents)
  - [About this Project](#about-this-project)
  - [Technologies and Libraries Used](#technologies-and-libraries-used)
  - [How to Set up](#how-to-set-up)
  - [Some code samples](#some-code-samples)
  - [Future Features to be added](#future-features-to-be-added)
## About this Project
This project is a front end application which utilizes the Jikan API the unofficial API for my amime list, and the Spotify Search API. A user of this web application can search an anime, then filter out the songs based on the Opening and Ending and then notify if the song they have searched on Spotify is licensed and available for listening or not. 

## Technologies and Libraries Used 
<ul>
<li> Vite 
<li> React.js
<li> Typescript
<li> Jikan 
<li> Spotify API
<li> Material UI
</ul>

## How to Set up 
Clone down this repository then run: 
```
npm i 
``` 

## Some code samples 
When looking at the response of the opening and closing songs on Jikan the response would be an array of strings.

example: 
```
    "data": {
        "openings": [
            "1: \"Ao no Sumika (青のすみか)\" by Tatsuya Kitani (キタニタツヤ)",
            "2: \"SPECIALZ\" by King Gnu"
        ],
        "endings": [
            "1: \"Akari (燈)\" by Soushi Sakiyama (崎山蒼志)",
            "2: \"more than words\" by Hitsujibungaku (羊文学)"
        ]
    }
```

With the response of the OP and Endings, you can see that both the title and the artist are combined. In addition it also adds extra characters in such as the '\' and the word "by"

To fix this up, what I did was I used a data structure, aka the  hashmap with the key is the title of the song and the value is the artist. Inside my hashmap, I used some regex to remove the "/" and "by". 
```
  function createSongMap(songs: any) {
    return new Map(
      songs?.map((theme: any) => {
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
```
The returning hashmap object, with an example using the openSongs Map using Naruto's OPs would be this (using only some songs): This returns a Hashmap using the title as the key and the value as the artist.
```
0
: 
{"R★O★C★K★S" => "Hound Dog "}
key
: 
"R★O★C★K★S"
value
: 
"Hound Dog "
1
: 
{"Haruka Kanata (遥か彼方)" => "Asian Kung-fu Generation "}
key
: 
"Haruka Kanata (遥か彼方)"
value
: 
"Asian Kung-fu Generation "
```

However with a map, we now have to iterate through it so it would show on the UI. Using the spread operator and the ```.entries()```
in method for our object we use .map for it to show up on our table. 

```
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
```

## Future Features to be added 
-Various UI improvements
-Adding in the Spotify player as well 
-Creating more reusable components


