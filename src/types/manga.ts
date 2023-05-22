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
  chapters: Array<object>;
  createdAt: string;
  updatedAt: string;
  deleteAt: null;
}
