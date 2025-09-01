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
}

const NewsSection: React.FC<NewsSectionProps> = async ({ dict }) => {
  const news = await fetchFiveNews();

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
