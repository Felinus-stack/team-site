import Image from "next/image";
import Title from "./Title";
import Text from "./Text";
import Link from "next/link";

type NewsCardProps = {
  id: string;
  title: string;
  short_description: string;
  long_description?: string;
  length_time?: number;
  logo: string;
  main_image: string;
  whiteMode?: boolean;
};
const NewsCard: React.FC<NewsCardProps> = ({
  id,
  title,
  short_description,
  long_description,
  length_time,
  logo,
  main_image,
  whiteMode,
}) => {
  return (
    <Link href={`/news/${id}`} passHref>
      <div className=" group h-[26rem] md:h-[34rem] rounded-md flex flex-col overflow-hidden cursor-pointer">
        <div className="h-full relative overflow-hidden">
          <Image
            src={main_image}
            alt={"test"}
            fill
            style={{ objectFit: "cover" }}
            className="group-hover:scale-105 duration-500 ease-in-out"
          />
        </div>
        <div
          className={` ${
            whiteMode ? "bg-neutral-200" : "bg-neutral-200"
          } w-full px-5 py-4 flex flex-col`}
        >
          <Text color="black" small wide bold opacity1 center>
            {title}
          </Text>
          <div className="mb-3 mt-1 md:mb-4 md:mt-2 flex-1">
            <div 
              className="text-sm leading-relaxed text-black overflow-hidden"
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical' as const,
                maxHeight: '4.5em'
              }}
            >
              {short_description.length > 150 
                ? `${short_description.substring(0, 150)}...` 
                : short_description}
            </div>
          </div>
          <div className="flex justify-between">
            <Image alt="Logo" height={40} width={80} src={logo} />
            <Text color="gray">{length_time} 分钟阅读</Text>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
