export interface MalIDandTitles {
  mal_id: string | number;
  title_english: string;
}

export interface AnimeData {
  aired: any;
  airing: boolean;
  approved: boolean;
  background: string;
  broadcast: {
    day: string;
    string: string;
    time: string;
    timezone: string;
  }
  demographics: {
    mal_id: string;
    name: string;
    type: string;
    url: string;
  }[];
  duration: string;
  episodes: number;
  explicit_genres: string[];
  favorites: number;
  genres: string[];
  images: {
    jpg: {
      image_url: string;
      large_image_url: string;
      small_image_url: string;
    },
    webp: {
      image_url: string;
      large_image_url: string;
      small_image_url: string;
    }
  }
  licensors: any;
  mal_id: string | number;
  members: number;
  popularity: number;
  producers: any;
  rank: number;
  rating: string;
  score: number;
  scored_by: number;
  season: string;
  source: string;
  status: string;
  studios: any;
  synopsis: string;
  themes: any;
  title: string;
  title_english: string;
  title_japanese: string;
  title_synonyms: any;
  titles: {
    type: string;
    title: string;
  }[];
  trailer: {
    embed_url?: any;
    images: {
      image_url: any;
      large_image_url: any;
      maximum_image_url: any;
      medium_image_url: any;
      small_image_url: any;
    }
  }
  url: string;
  year: number;
}

export interface AnimeTheme {
  endings: string[];
  openings: string[];
}