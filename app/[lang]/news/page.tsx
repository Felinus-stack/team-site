// 新闻页面组件
import Container from "@/app/components/Container";
import NewsCard from "@/app/components/NewsCard";
import { fetchNews } from "@/app/actions/getNews";
import Title from "@/app/components/Title";
import { getDictionary } from "../dictionaries";

interface NewsPageProps {
  params: {
    lang: string;
  };
}

const AboutUs = async ({ params }: NewsPageProps) => {
  const language = params.lang === "ch" || params.lang === "en" ? params.lang : "en";
  const dict = await getDictionary(language);
  const news = await fetchNews();
  
  return (
    <div className=" flex flex-col items-center pt-[100px] md:pt-[120px] bg-neutral-900">
      <div className="py-4 my-4 md:my-12 border-b-2 md:w-fit px-8 border-white uppercase">
        <Title>{dict.newsPage?.title || "新闻资讯"}</Title>
      </div>
      <Container>
        <div className="my-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {news.map((item, index) => (
            <NewsCard
              key={index}
              id={item.id}
              title={item.title}
              short_description={item.shortDescription}
              length_time={item.duration}
              logo={item.logo || "/images/logo-czarne.svg"}
              main_image={item.mainImage}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default AboutUs;
