"use client";

import NewsGridClient from "@/app/components/NewsGridClient";

interface NewsItem {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  duration: number;
  logo: string | null;
  mainImage: string;
}

interface NewsGridProps {
  news: NewsItem[];
}

const NewsGrid: React.FC<NewsGridProps> = ({ news }) => {
  return (
    <NewsGridClient 
      news={news}
      whiteMode={true}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-10 relative border-none"
    />
  );
};

export default NewsGrid;
