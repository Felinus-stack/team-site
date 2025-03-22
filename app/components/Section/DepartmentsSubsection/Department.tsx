"use client";

import Image from "next/image";
import Link from "next/link";

type DepartmentProps = {
  department: string;
};

const Department: React.FC<DepartmentProps> = ({ department }) => {
  const imagePath = `/images/departments/${department}.png`;

  return (
    <Link href={`/about#${department}`} passHref scroll>
      <div className="relative border-0 m-0 cursor-pointer group overflow-hidden">
        <div className="h-[6rem] md:h-[16rem] transition-transform duration-700 ease-in-out group-hover:scale-110">
          <Image
            src={imagePath}
            alt={department}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="absolute inset-0 bg-black opacity-50 group-hover:opacity-70 transition duration-300 ease-in-out"></div>
        <div className="absolute right-0 bottom-0 flex items-center p-4 pr-12 uppercase text-white transition-all duration-300 ease-in-out group-hover:right-1/2 group-hover:bottom-1/2 group-hover:translate-x-1/2 group-hover:translate-y-1/2 group-hover:pr-4">
          <p className="flex-shrink-0 whitespace-nowrap text-sm md:text-xl font-extrabold px-4 group-hover:text-white group-hover:text-[1rem] md:group-hover:text-[1.5rem] transition-all duration-300 ease-in-out">
            {department}
          </p>
          <svg
            className="absolute right-4 transition-all duration-300 ease-in-out group-hover:opacity-0 group-hover:translate-x-full"
            width="35"
            height="32"
            viewBox="0 0 35 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Group 3307">
              <path
                id="Ellipse 1"
                d="M33.9111 15.6489C33.9111 23.9718 26.4775 30.7977 17.2056 30.7977C7.93366 30.7977 0.5 23.9718 0.5 15.6489C0.5 7.32595 7.93366 0.5 17.2056 0.5C26.4775 0.5 33.9111 7.32595 33.9111 15.6489Z"
                stroke="white"
              />
              <path
                id="Vector 2"
                d="M15.7715 13.0408L19.356 16.301L15.7715 19.5611"
                stroke="white"
              />
            </g>
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default Department;
