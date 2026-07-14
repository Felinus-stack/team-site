export type NewsContent = {
  id: string;
  text: string;
  newsId: string;
};

export type NewsItem = {
  id: string;
  date: string;
  title: string;
  enTitle: string | null;
  shortDescription: string;
  enShortDescription: string | null;
  longDescription: string;
  enLongDescription: string | null;
  duration: number;
  logo: string;
  mainImage: string;
  content: NewsContent[];
};
