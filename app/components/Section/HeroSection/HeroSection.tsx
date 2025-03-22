"use client";

import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import Container from "../../Container";
import Text from "../../Text";
import BackgroundVideo from "./BackgroundVideo";
import Title from "../../Title";
import ClientOnly from "../../ClientOnly";
import { motion } from "framer-motion";

type Locale = "pl" | "en";

interface HeroSectionProps {
  dict: {
    title1: string;
    title2: string;
    description: string;
    subtitle: string;
    button: string;
  };
}
const textVariants = {
  hidden: { x: -100, opacity: 0 },
  visible: (delay: number) => ({
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      delay,
      ease: "easeOut",
    },
  }),
};

const HeroSection: React.FC<HeroSectionProps> = ({ dict }) => {
  const handleScroll = () => {
    const element = document.getElementById("bolid");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const imageVariants = {
    hidden: {
      scale: 0,
      y: -100,
      opacity: 1,
    },
    visible: {
      scale: 1,
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  if (!dict) return <div>Loading...</div>;

  return (
    <ClientOnly>
      <div className="relative md:h-screen">
        <BackgroundVideo />
        <Container>
          <div className="pt-[100px] lg:pt-0 relative z-10 grid items-center lg:grid-cols-2 gap-8 lg:gap-24">
            <div>
              {/* Animated Titles */}
              <motion.div
                initial="hidden"
                animate="visible"
                custom={0.4}
                variants={textVariants}
              >
                <Title wrap size="subtitle" color="red">
                  {dict.title1}
                </Title>
              </motion.div>

              <motion.div
                initial="hidden"
                animate="visible"
                custom={0.2}
                variants={textVariants}
              >
                <Title>{dict.title2}</Title>
              </motion.div>

              {/* Animated Description */}
              <motion.div
                initial="hidden"
                animate="visible"
                custom={0.6}
                variants={textVariants}
                className="my-2 md:my-6"
              >
                <Text color="white" main>
                  {dict.description}
                </Text>
              </motion.div>

              {/* Animated Subtitle */}
              <motion.div
                initial="hidden"
                animate="visible"
                custom={0.8}
                variants={textVariants}
              >
                <Title wrap color="red" size="small">
                  {dict.subtitle}
                </Title>
              </motion.div>

              {/* Animated Button */}
              <motion.button
                initial="hidden"
                animate="visible"
                custom={1}
                variants={textVariants}
                onClick={handleScroll}
                className="hidden md:flex items-center py-2 text-white rounded hover:pl-8 transition-all duration-300 group"
              >
                <span>{dict.button}</span>
                <FaArrowRight className="ml-2 transition-all duration-300 group-hover:text-customRed" />
              </motion.button>
            </div>

            {/* Animated Image */}
            <motion.div
              className="flex justify-center mb-8 sm:mb-0 items-center"
              initial="hidden"
              animate="visible"
              variants={imageVariants}
            >
              <Image
                src="/images/bolid_main.png"
                alt="bolid"
                layout="intrinsic"
                width={700}
                height={551}
              />
            </motion.div>
          </div>
        </Container>
      </div>
    </ClientOnly>
  );
};

export default HeroSection;
