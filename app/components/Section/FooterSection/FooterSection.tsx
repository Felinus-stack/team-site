"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import Button from "../../Button";
import Container from "../../Container";
import Logo from "../../Navbar/Logo";
import SocialIcons from "../../Navbar/UserMenu/SocialIcons";
import Text from "../../Text";
import Title from "../../Title";
import FooterLink from "./FooterLink";

interface FooterSectionProps {
  dict: {
    callUs: string;
    writeUs: string;
    findUs: string;
    navigation: string;
    home: string;
    bolid: string;
    team: string;
    about: string;
    partners: string;
    headquarters: string;
    address: string;
    phone: string;
    email: string;
    joinUs: string;
    becomePartner: string;
    generalInfo: string;
    privacyPolicy: string;
    cookiesPolicy: string;
    rodo: string;
    recruitment: string;
    createdBy: string;
    allRightsReserved: string;
    seasonDescription: string;
  };
}

const FooterSection: React.FC<FooterSectionProps> = ({ dict }) => {
  const handlePhoneClick = () => {
    window.location.href = "tel:+48517350915";
  };

  const handleEmailClick = () => {
    window.location.href = "mailto:racing@gmail.com";
  };

  const handleMapClick = () => {
    window.open(
      "https://www.google.com/maps/place/Sopocka+16,+50-344+Wroc%C5%82aw/data=!4m2!3m1!1s0x470fe82d5f41f4fd:0xa5be6508736bb57b?sa=X&ved=1t:242&ictx=1",
      "_blank"
    );
  };

  const router = useRouter();

  return (
    <div id="section-contact" className="relative md:pt-6">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/joinus/photo5.jpeg"
          alt="Tło sekcji"
          layout="fill"
          objectFit="cover"
          objectPosition="left 70%"
          quality={50}
        />
        <div className="absolute inset-0 bg-black bg-opacity-80"></div>
      </div>
      <Container>
        <div className="flex flex-col w-full">
          <div className="w-full md:px-12 flex flex-wrap flex-col md:flex-row justify-center xl:justify-between items-center gap-x-12">
            <Logo width={200} height={180} />
            <div className="flex flex-col flex-wrap md:flex-row justify-center lg:justify-between items-center gap-4 md:gap-12">
              <div
                className="flex flex-col items-center md:items-start cursor-pointer group"
                onClick={handlePhoneClick}
              >
                <div className="flex items-center gap-3 pb-1 uppercase">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11 22C17.0068 22 22 17.0069 22 11C22 4.98235 16.996 0 10.9892 0C4.97152 0 0 4.98235 0 11C0 17.0069 4.98233 22 11 22ZM8.18525 13.6853C5.51074 11.0216 3.80684 7.62447 5.82349 5.60785C5.94212 5.48919 6.07155 5.37056 6.19017 5.25194C6.80486 4.6696 7.39801 4.70195 7.92643 5.44607L9.32839 7.44116C9.80288 8.13136 9.68426 8.51961 9.17743 9.05884L8.73524 9.54414C8.57351 9.69507 8.6382 9.90001 8.71371 10.0294C8.9186 10.4177 9.50094 11.1079 10.1264 11.7334C10.7735 12.3804 11.4313 12.9304 11.8411 13.1569C11.9921 13.2431 12.2078 13.2647 12.348 13.1353L12.8117 12.6931C13.3294 12.1863 13.75 12.0569 14.4186 12.5314C15.346 13.1892 15.9068 13.5775 16.4568 13.9549C17.1362 14.451 17.298 15.0657 16.6078 15.6912C16.4892 15.8098 16.3813 15.9392 16.2627 16.0579C14.246 18.0638 10.8598 16.3598 8.18525 13.6853Z"
                      fill="#D41E3E"
                    />
                  </svg>
                  <Title size="subtitle" color="red">
                    {dict.callUs}
                  </Title>
                </div>
                <div className="font-black ">
                  <Text color="white" opacity1 hoverColor="red" small bold wide>
                    +48 517 350 915
                  </Text>
                </div>
              </div>
              <div
                className="flex flex-col cursor-pointer group footer_bug"
                onClick={handleEmailClick}
              >
                <div className="flex items-center gap-3 pb-1 uppercase ">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="10.992" cy="10.992" r="10.992" fill="#D41E3E" />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M16.6649 7.90923V14.8043L14.0076 11.4415L13.5026 11.8506L16.1858 15.2468H6.15194L8.83514 11.8506L8.33018 11.4415L5.67285 14.8043V7.90922L11.1685 12.7344L16.6649 7.90923ZM16.6645 6.73682V7.04186L11.1688 11.867L5.67311 7.04187V6.73682H16.6645Z"
                      fill="#1F2021"
                    />
                  </svg>
                  <Title size="subtitle" color="red">
                    {dict.writeUs}
                  </Title>
                </div>
                <Text color="white" opacity1 hoverColor="red" small bold wide>
                  racing.pwr@gmail.com
                </Text>
              </div>
              <div
                className="flex flex-col items-center cursor-pointer group"
                onClick={handleMapClick}
              >
                <div className="flex items-center gap-3 pb-1 uppercase">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22 11C22 13.1756 21.3549 15.3023 20.1462 17.1113C18.9375 18.9202 17.2195 20.3301 15.2095 21.1627C13.1995 21.9952 10.9878 22.2131 8.85401 21.7886C6.72022 21.3642 4.76021 20.3165 3.22183 18.7782C1.68345 17.2398 0.635804 15.2798 0.211367 13.146C-0.213071 11.0122 0.00476612 8.80047 0.83733 6.79048C1.66989 4.78049 3.07979 3.06253 4.88873 1.85383C6.69767 0.645139 8.82441 0 11 0C12.4445 0 13.8749 0.284523 15.2095 0.837325C16.5441 1.39013 17.7567 2.20038 18.7782 3.22182C19.7996 4.24327 20.6099 5.4559 21.1627 6.79048C21.7155 8.12506 22 9.55546 22 11ZM18.1208 9.33548C18.1564 9.27263 18.1794 9.20336 18.1883 9.13163C18.1972 9.0599 18.1919 8.98712 18.1727 8.91745C18.1535 8.84777 18.1207 8.78256 18.0763 8.72556C18.0318 8.66855 17.9766 8.62085 17.9137 8.58519L11.2237 4.77681C11.1406 4.72929 11.0464 4.70429 10.9507 4.70429C10.8549 4.70429 10.7608 4.72929 10.6777 4.77681L7.46811 6.61639V5.37287C7.46774 5.25617 7.42122 5.14435 7.3387 5.06183C7.25618 4.97931 7.14437 4.93279 7.02767 4.93242H5.68271C5.56601 4.93279 5.4542 4.97931 5.37168 5.06183C5.28916 5.14435 5.24263 5.25617 5.24227 5.37287V7.89188L4.0307 8.58658C3.96351 8.61993 3.90385 8.66667 3.85538 8.72392C3.80692 8.78117 3.77067 8.84773 3.74887 8.9195C3.72707 8.99127 3.72017 9.06674 3.7286 9.14128C3.73704 9.21581 3.76062 9.28784 3.79791 9.35293C3.83519 9.41801 3.8854 9.47479 3.94543 9.51976C4.00546 9.56474 4.07406 9.59696 4.147 9.61446C4.21994 9.63195 4.29569 9.63435 4.36959 9.62149C4.44349 9.60864 4.51398 9.58081 4.57674 9.53972L10.9528 5.88695L17.3705 9.54111C17.4332 9.57704 17.5024 9.60023 17.5741 9.60934C17.6458 9.61845 17.7186 9.6133 17.7883 9.5942C17.8581 9.57509 17.9233 9.5424 17.9804 9.498C18.0374 9.4536 18.0851 9.39837 18.1208 9.33548ZM16.7036 10.4276L10.9542 7.1541L5.24366 10.4276V16.6313C5.24402 16.7478 5.29035 16.8594 5.37257 16.9418C5.45479 17.0243 5.56625 17.071 5.68271 17.0717H16.2631C16.3798 17.0714 16.4916 17.0249 16.5741 16.9423C16.6567 16.8598 16.7032 16.748 16.7036 16.6313V10.4276ZM7.46811 11.2709H9.75648V13.5885H7.46811V11.2709ZM14.4777 13.5885H12.1893V11.2709H14.4777V13.5885Z"
                      fill="#D41E3E"
                    />
                  </svg>
                  <Title size="subtitle" color="red">
                    {dict.findUs}
                  </Title>
                </div>
                <Text color="white" opacity1 hoverColor="red" small bold wide>
                  ul. Sopocka 16, Wrocław
                </Text>
              </div>
            </div>
          </div>
          <div className="md:px-12 text-white flex-col md:flex-row flex-wrap justify-between flex items-center md:items-start md:text-start text-center md:gap-12 gap-4 mt-4">
            <div className="hidden md:block max-w-80">
              <Text wide>{dict.seasonDescription}</Text>
            </div>
            <div className=" whitespace-nowrap">
              <Text small bold center>
                {dict.navigation}
              </Text>
              <ul className="mt-1 md:mt-2">
                <FooterLink href="/">{dict.home}</FooterLink>
                <FooterLink href="/bolid">{dict.bolid}</FooterLink>
                <FooterLink href="/team">{dict.team}</FooterLink>
                <FooterLink href="/about">{dict.about}</FooterLink>
                <FooterLink href="/partners">{dict.partners}</FooterLink>
              </ul>
            </div>
            <div className=" whitespace-nowrap">
              <Text center small bold>
                {dict.headquarters}
              </Text>
              <ul className="mt-1 md:mt-2">
                <FooterLink onClick={handleMapClick}>{dict.address}</FooterLink>
                <FooterLink onClick={handleMapClick}>50-349 Wrocław</FooterLink>
                <FooterLink onClick={handlePhoneClick}>{dict.phone}</FooterLink>
                <FooterLink onClick={handleEmailClick}>{dict.email}</FooterLink>
              </ul>
            </div>
            <div className=" whitespace-nowrap">
              <Text center small bold>
                PWR Racing Team
              </Text>
              <ul className="mt-1 md:mt-2">
                <FooterLink href="/joinus">{dict.joinUs}</FooterLink>
                <FooterLink href="/partners/joinus">
                  {dict.becomePartner}
                </FooterLink>
              </ul>
            </div>
            <div className=" whitespace-nowrap">
              <Text center small bold>
                {dict.generalInfo}
              </Text>
              <ul className="mt-1 md:mt-2">
                <FooterLink href="/">{dict.privacyPolicy}</FooterLink>
                <FooterLink href="/">{dict.cookiesPolicy}</FooterLink>
                <FooterLink href="/">{dict.rodo}</FooterLink>
              </ul>
            </div>
          </div>
          <div className="w-full flex-col md:flex-row items-center gap-4 flex justify-between md:px-12 py-4 md:py-8">
            <div className="flex items-center gap-4">
              <SocialIcons
                href="https://www.facebook.com/PWRRacingTeam"
                icon={FaFacebookF}
                ariaLabel="Facebook"
              />
              <SocialIcons
                href="https://www.instagram.com/pwrracingteam/"
                icon={FaInstagram}
                ariaLabel="Instagram"
              />
              <SocialIcons
                href="https://www.linkedin.com/company/pwr-racing-team/posts/?feedView=all"
                icon={FaLinkedinIn}
                ariaLabel="LinkedIn"
              />
              <SocialIcons
                href="https://www.youtube.com/@PWRRacingTeam"
                icon={FaYoutube}
                ariaLabel="YouTube"
              />
            </div>
            <div className="flex gap-4 w-full md:w-1/3">
              <Button
                label={dict.recruitment}
                onClick={() => router.push(`/joinus`)}
              />
              <Button
                outline
                label={dict.becomePartner}
                onClick={() => router.push(`/partners/joinus`)}
              />
            </div>
          </div>
          <div
            className="
            w-full
            flex flex-col md:flex-row
            border-t-[1px]
            border-white
            md:px-12 md:py-6 py-3 justify-between items-center gap-2
          "
          >
            <Text color="white" center>
              {dict.createdBy}
            </Text>
            <Text color="white" center>
              {dict.allRightsReserved}
            </Text>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default FooterSection;
