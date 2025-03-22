"use client";

import Image from "next/image";
import Title from "../../Title";
import Text from "../../Text";

type NewsProps = {
  article: string;
  category: string;
  title: string;
};

const News: React.FC<NewsProps> = ({ article, category, title }) => {
  const imagePath = `/images/news/news${article}.png`;

  return (
    <div className="relative w-full h-[358px] rounded-md border-0 m-0 cursor-pointer group overflow-hidden">
      <Image
        src={imagePath}
        alt={article}
        layout="fill"
        objectFit="cover"
        objectPosition="center center"
      />
      <div className="absolute inset-0 w-full h-full flex flex-col justify-end">
        <div className="text-center p-2 rounded-tr-sm w-1/3 bg-customRed">
          <Title size="subtitle">{category}</Title>
        </div>
        <div className="text-center p-2 rounded-bl-md rounded-tr-md w-2/3 bg-black border-black border-2">
          <Text opacity1 bold medium center color="white">
            {title}
          </Text>
        </div>
      </div>
      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-80 transition duration-300 ease-in-out"></div>
      <div className="absolute scale-x-0 group-hover:scale-x-100 opacity-0 group-hover:opacity-100 flex inset-0 gap-8 flex-col justify-center items-center text-white transition-all duration-300 ease-in-out">
        <Title size="medium">PREMIERA RT13E</Title>
        <div className="relative py-4">
          <span className=" h-[1px] bg-customRed scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left block absolute top-0 left-0 right-0"></span>
          <Text>Lorem ipsum dolor sit amet consectetur adipisicing.</Text>
          <span className=" h-[1px] bg-customRed scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left block absolute bottom-0 left-0 right-0"></span>
        </div>
        <Title size="small">WYDZARZENIA</Title>
      </div>
    </div>
  );
};

export default News;
