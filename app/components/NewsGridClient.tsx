"use client";

import NewsCard from "./NewsCard";
import { useRouter } from "next/navigation";

interface NewsItem {
  id: string;
  title: string;
  shortDescription: string;
  longDescription?: string;
  duration: number;
  logo: string | null;
  mainImage: string;
}

interface NewsGridClientProps {
  news: NewsItem[];
  whiteMode?: boolean;
  className?: string;
}

const NewsGridClient: React.FC<NewsGridClientProps> = ({ 
  news, 
  whiteMode = false,
  className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
}) => {
  const router = useRouter();

  const handleNewsDelete = () => {
    // 刷新页面以更新新闻列表
    router.refresh();
  };

  return (
    <div className={className}>
      {news.map((item) => (
        <NewsCard
          key={item.id}
          id={item.id}
          title={item.title}
          short_description={item.shortDescription}
          long_description={item.longDescription}
          length_time={item.duration}
          logo={item.logo || "/images/logo-czarne.svg"}
          main_image={item.mainImage}
          whiteMode={whiteMode}
          onDelete={handleNewsDelete}
        />
      ))}
    </div>
  );
};

export default NewsGridClient;
