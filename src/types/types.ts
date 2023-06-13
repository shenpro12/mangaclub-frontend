export interface Manga {
  id: string;
  name: string;
  alternative: string;
  author: string;
  status: boolean;
  slug: string;
  description: string;
  views: number;
  thumb_url: string;
  categories: Array<object>;
  ratings: Array<object>;
  chapters: Array<{
    createdAt: string;
    updatedAt: string;
    deleteAt: null;
    id: string;
    title: string;
    order: number;
    slug: string;
    images: Array<any>;
  }>;
  createdAt: string;
  updatedAt: string;
  deleteAt: null;
}
export interface Chapter {
  createdAt: string;
  updatedAt: string;
  deleteAt: null;
  id: string;
  title: string;
  order: number;
  slug: string;
  images: Array<any>;
}
export interface Image {
  createdAt: string;
  updatedAt: string;
  deleteAt: null;
  id: string;
  thumb_url: string;
  order: number;
}
export interface Genres {
  createdAt: string;
  deleteAt: null;
  id: string;
  manga: number;
  name: string;
  slug: string;
  updatedAt: string;
}

export interface ResponseMangaInfo {
  mangaList: Array<Manga>;
  pages: Array<number>;
  page: number;
  totalItem: number;
  maxPage: number;
}

export interface ApiResponse {
  timestamp: Date;
  status: number;
  error: string;
  message: string;
  payload: any;
}
