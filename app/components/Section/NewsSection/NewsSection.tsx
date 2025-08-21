import { fetchFiveNews } from "@/app/actions/getFiveNews";
import NewsCard from "@/app/components/NewsCard";
import Container from "../../Container";
import NewsControls from "./NewsControls";

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-10 relative border-none">
            {news.map((item, index) => (
              <NewsCard
                id={item.id}
                whiteMode
                key={index}
                title={item.title}
                short_description={item.shortDescription}
                long_description={item.longDescription}
                length_time={item.duration}
                logo={item.logo || "/images/logo-czarne.svg"}
                main_image={item.mainImage}
              />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default NewsSection;
