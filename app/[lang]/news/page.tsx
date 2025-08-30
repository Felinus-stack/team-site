// 新闻页面组件
import Container from "@/app/components/Container";
import NewsGridClient from "@/app/components/NewsGridClient";
import { fetchNews } from "@/app/actions/getNews";
import Title from "@/app/components/Title";

const AboutUs = async () => {
  const news = await fetchNews();
  return (
    <div className=" flex flex-col items-center pt-[100px] md:pt-[120px] bg-neutral-900">
      <div className="py-4 my-4 md:my-12 border-b-2 md:w-fit px-8 border-white uppercase">
        <Title>新闻资讯</Title>
      </div>
      <Container>
        <div className="my-6">
          <NewsGridClient 
            news={news}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
          />
        </div>
      </Container>
    </div>
  );
};

export default AboutUs;
