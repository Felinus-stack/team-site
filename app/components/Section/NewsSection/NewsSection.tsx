import { fetchFiveNews } from "@/app/actions/getFiveNews";
import Container from "../../Container";
import NewsControls from "./NewsControls";
import NewsGrid from "./NewsGrid";

interface NewsSectionProps {
  dict: {
    title: string;
    becomePartner: string;
    contact: string;
  };
  language?: "ch" | "en";
}

const NewsSection: React.FC<NewsSectionProps> = async ({ dict, language = "ch" }) => {
  let news: any[] = [];
  try {
    const rawNews = await fetchFiveNews();
    // 处理多语言显示，使用数据库中的英文字段
    news = rawNews.map(item => {
      const newsItem = item as any; // 类型断言以访问新的英文字段
      return {
        ...item,
        title: language === "en" && newsItem.enTitle ? newsItem.enTitle : item.title,
        shortDescription: language === "en" && newsItem.enShortDescription 
          ? newsItem.enShortDescription 
          : item.shortDescription
      };
    });
  } catch (error) {
    console.error('Failed to fetch news:', error);
    news = [];
  }

  return (
    <div id="section-news" className="flex flex-col">
      <Container>
        <div className="pt-12">
          <NewsControls dict={dict} />
          <NewsGrid news={news} />
        </div>
      </Container>
    </div>
  );
};

export default NewsSection;
