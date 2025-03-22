import { redirect } from "next/navigation";
import getNewsById from "@/app/actions/getNewsById";
import Container from "@/app/components/Container";
import Text from "@/app/components/Text";
import Title from "@/app/components/Title";
import Image from "next/image";

interface Iparams {
  newsId?: string;
}

const NewsPage = async ({ params }: { params: Iparams }) => {
  const newsId = params.newsId;

  if (!newsId) {
    // Przekierowanie, gdy newsId jest undefined
    redirect("/news");
  }

  const news = await getNewsById(newsId);

  if (!news) {
    redirect("/news");
  }

  return (
    <div className=" pt-[100px] md:pt-[120px] ">
      <Container>
        <div className="relative flex flex-col w-full my-12">
          <div className=" relative flex justify-end items-center">
            <div className="absolute z-20 inset-0 flex flex-col justify-center my-auto bg-neutral-200 rounded-md w-[30rem] h-[26rem] p-12 items-center gap-8">
              <div className="py-8 border-b-2 border-black px-4">
                <Text color="black" medium bold opacity1 alignCenter center>
                  {news.title}
                </Text>
              </div>
              <Text color="black" center alignCenter>
                {news.long_description}
              </Text>
            </div>
            <div className="bg-red-500 h-[32rem] w-2/3 relative rounded-md overflow-hidden">
              <Image
                src={news.main_image}
                alt={news.title}
                fill
                style={{ objectFit: "cover" }}
                className="group-hover:scale-105 duration-500 ease-in-out"
              />
            </div>
          </div>

          <div className=" flex flex-col gap-6 mt-12 w-2/3 mx-auto">
            {news.content.map((paragraph: { text: string }, index: number) => (
              <Text color="gray" key={index}>
                {paragraph.text}
              </Text>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default NewsPage;
