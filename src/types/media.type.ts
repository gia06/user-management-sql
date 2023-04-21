interface Trending {
  small: string;
  large: string;
}

interface Regular extends Trending {
  medium: string;
}

interface Thumbnail {
  trending: Trending;
  regular: Regular;
}

export interface BookmarkType {
  title: string;
  thumbnail: Thumbnail;
  year: number;
  category: "string";
  rating: string;
  isTrending: boolean;
}
