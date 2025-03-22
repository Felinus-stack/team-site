"use client";

import Button from "@/app/components/Button";
import Container from "@/app/components/Container";
import Text from "@/app/components/Text";
import Title from "@/app/components/Title";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface GarageAboutProps {
  dict: {
    title: string;
    paragraph: string;
    address: string;
    contact: string;
  };
}

const GarageAbout: React.FC<GarageAboutProps> = ({ dict }) => {
  const router = useRouter();

  const handleMapClick = () => {
    window.open(
      "https://www.google.com/maps/place/Sopocka+16,+50-344+Wroc%C5%82aw/data=!4m2!3m1!1s0x470fe82d5f41f4fd:0xa5be6508736bb57b?sa=X&ved=1t:242&ictx=1",
      "_blank"
    );
  };

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div id="garage-section" className="relative bg-white pt-12 md:pt-20">
      <Container>
        <div className="w-full">
          <Title color="black">{dict.title}</Title>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-20 mt-4">
            <div className=" col-span-3 flex flex-col gap-6 md:gap-8">
              <div className=" hidden md:block relative h-2/3">
                <Image
                  src="/images/garage/1.jpg"
                  alt="bolid"
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center 20%"
                />
              </div>
              <Text color="black">{dict.paragraph}</Text>
              <div className="flex flex-col md:flex-row gap-6 md:gap-0 justify-between items-center">
                <div
                  onClick={handleMapClick}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="group cursor-pointer flex items-center gap-3 capitalize "
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22 11C22 13.1756 21.3549 15.3023 20.1462 17.1113C18.9375 18.9202 17.2195 20.3301 15.2095 21.1627C13.1995 21.9952 10.9878 22.2131 8.85401 21.7886C6.72022 21.3642 4.76021 20.3165 3.22183 18.7782C1.68345 17.2398 0.635804 15.2798 0.211367 13.146C-0.213071 11.0122 0.00476612 8.80047 0.83733 6.79048C1.66989 4.78049 3.07979 3.06253 4.88873 1.85383C6.69767 0.645139 8.82441 0 11 0C12.4445 0 13.8749 0.284523 15.2095 0.837325C16.5441 1.39013 17.7567 2.20038 18.7782 3.22182C19.7996 4.24327 20.6099 5.4559 21.1627 6.79048C21.7155 8.12506 22 9.55546 22 11ZM18.1208 9.33548C18.1564 9.27263 18.1794 9.20336 18.1883 9.13163C18.1972 9.0599 18.1919 8.98712 18.1727 8.91745C18.1535 8.84777 18.1207 8.78256 18.0763 8.72556C18.0318 8.66855 17.9766 8.62085 17.9137 8.58519L11.2237 4.77681C11.1406 4.72929 11.0464 4.70429 10.9507 4.70429C10.8549 4.70429 10.7608 4.72929 10.6777 4.77681L7.46811 6.61639V5.37287C7.46774 5.25617 7.42122 5.14435 7.3387 5.06183C7.25618 4.97931 7.14437 4.93279 7.02767 4.93242H5.68271C5.56601 4.93279 5.4542 4.97931 5.37168 5.06183C5.28916 5.14435 5.24263 5.25617 5.24227 5.37287V7.89188L4.0307 8.58658C3.96351 8.61993 3.90385 8.66667 3.85538 8.72392C3.80692 8.78117 3.77067 8.84773 3.74887 8.9195C3.72707 8.99127 3.72017 9.06674 3.7286 9.14128C3.73704 9.21581 3.76062 9.28784 3.79791 9.35293C3.83519 9.41801 3.8854 9.47479 3.94543 9.51976C4.00546 9.56474 4.07406 9.59696 4.147 9.61446C4.21994 9.63195 4.29569 9.63435 4.36959 9.62149C4.44349 9.60864 4.51398 9.58081 4.57674 9.53972L10.9528 5.88695L17.3705 9.54111C17.4332 9.57704 17.5024 9.60023 17.5741 9.60934C17.6458 9.61845 17.7186 9.6133 17.7883 9.5942C17.8581 9.57509 17.9233 9.5424 17.9804 9.498C18.0374 9.4536 18.0851 9.39837 18.1208 9.33548ZM16.7036 10.4276L10.9542 7.1541L5.24366 10.4276V16.6313C5.24402 16.7478 5.29035 16.8594 5.37257 16.9418C5.45479 17.0243 5.56625 17.071 5.68271 17.0717H16.2631C16.3798 17.0714 16.4916 17.0249 16.5741 16.9423C16.6567 16.8598 16.7032 16.748 16.7036 16.6313V10.4276ZM7.46811 11.2709H9.75648V13.5885H7.46811V11.2709ZM14.4777 13.5885H12.1893V11.2709H14.4777V13.5885Z"
                        fill={isHovered ? "#000000" : "#D41E3E"}
                        className="transition-fill"
                      />
                    </svg>
                  </svg>
                  <Text
                    center
                    hoverColor="black"
                    color="red"
                    small
                    bold
                    opacity1
                  >
                    {dict.address}
                  </Text>
                </div>
                <div className="w-full md:w-1/3">
                  <Button
                    outline
                    label={dict.contact}
                    onClick={() => router.push("/contact")}
                  />
                </div>
              </div>
            </div>
            <div className=" col-span-3 md:col-span-2 relative h-[20rem] md:h-[36rem]">
              <Image
                className="scale-x-[-1]"
                src="/images/garage/2.jpg"
                alt="bolid"
                layout="fill"
                objectFit="cover"
                objectPosition="center 20%"
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default GarageAbout;
