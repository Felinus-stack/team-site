import Container from "@/app/components/Container";
import Text from "@/app/components/Text";
import Title from "@/app/components/Title";
import { getDictionary } from "../dictionaries";
import { Admin } from "./emailAction";
import ContactCategoryCard from "./ContactCategoryCard";
import GoogleMapComponent from "./map";
import { FaWeixin, FaWeibo, FaLinkedin, FaGithub } from "react-icons/fa";
import { SiBilibili } from "react-icons/si";

interface ContactUsProps {
  params: {
    lang: string;
  };
}

const ContactUs: React.FC<ContactUsProps> = async ({ params }) => {
  const language =
    params.lang === "ch" || params.lang === "en" ? params.lang : "en";
  const dict = await getDictionary(language);

  return (
    <div className="pt-[100px] md:pt-[120px]">
      <div className="absolute opacity-5 right-0">
        <h1 className="text-[15rem] font-extrabold text-black uppercase leading-none">
          {dict.contactUs.pageTitle}
        </h1>
      </div>
      <Container>
        <div className="w-full mb-12 flex flex-col items-center mt-16">
          <div className="mb-24 py-4 my-4 border-b-2 w-3/5 border-black text-center">
            <Title color="black">{dict.contactUs.writeToUs}</Title>
          </div>
          <div className="mb-8">
            <Text bold medium>
              {dict.contactUs.theyWillAnswer}
            </Text>
          </div>
          
          {/* 按问题类型分类的联系人展示 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 w-full gap-8">
            {dict.contactUs.questionCategories.map((category: any, index: number) => (
              <ContactCategoryCard 
                key={category.id} 
                category={category} 
              />
            ))}
          </div>
          
          {/* 添加分隔线 */}
          <div className="w-full border-t border-gray-200 mt-12"></div>
        </div>
      </Container>
      <div className="text-center mt-4 md:mt-12 mb-6">
        <Title color="black" size="medium">
          {dict.contactUs.whereToFindUs}
        </Title>
      </div>
      <GoogleMapComponent />
      <Container>
        <div className="grid grid-cols-1 w-full my-8 md:my-12 gap-12 md:gap-20">
          <div className="flex flex-col items-start md:items-center gap-4 md:gap-6">
            <Admin text={dict.contactUs.siteAdministration} />
            <div className="text-center">
              <Text>
                {dict.contactUs.siteAdminDescription}
              </Text>
            </div>
          </div>
        </div>
      </Container>

      <Container>
        <div className="grid grid-cols-1 w-full my-8 md:my-12 gap-12 md:gap-20">
          {/* 社交媒体 */}
          <div className="flex flex-col items-start md:items-center gap-4 md:gap-6">
            <Text bold medium>
              {dict.contactUs.socialMedia}
            </Text>
            <div className="flex gap-6 text-2xl">
              <a
                href="https://weixin.qq.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-customRed duration-300"
                title="微信"
              >
                <FaWeixin />
              </a>
              <a
                href="https://weibo.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-customRed duration-300"
                title="微博"
              >
                <FaWeibo />
              </a>
              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-customRed duration-300"
                title="LinkedIn"
              >
                <FaLinkedin />
              </a>
                             <a 
                 href="https://github.com/" 
                 target="_blank"
                 rel="noopener noreferrer"
                 className="text-black hover:text-customRed duration-300"
                 title="GitHub"
               >
                 <FaGithub />
               </a>
               <a 
                 href="https://space.bilibili.com/99622895" 
                 target="_blank"
                 rel="noopener noreferrer"
                 className="text-black hover:text-customRed duration-300"
                 title="Bilibili"
               >
                 <SiBilibili />
               </a>
            </div>
          </div>

          {/* 其他联系信息 */}
          <div className="flex flex-col items-start md:items-center gap-4 md:gap-6">
            <Text bold medium>
              {dict.contactUs.otherContactInfo}
            </Text>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-6 justify-items-center">
              <div className="text-center w-full max-w-md">
                <div className="mb-2">
                  <Text bold>
                    {dict.contactUs.officeHours}
                  </Text>
                </div>
                <Text>
                  {dict.contactUs.officeHoursText}
                </Text>
              </div>
              <div className="text-center w-full max-w-md">
                <div className="mb-2">
                  <Text bold>
                    {dict.contactUs.emergencyContact}
                  </Text>
                </div>
                <Text>
                  {dict.contactUs.emergencyPhone}
                </Text>
              </div>
              <div className="text-center w-full max-w-md">
                <div className="mb-2">
                  <Text bold>
                    {dict.contactUs.emailContact}
                  </Text>
                </div>
                <Text>
                  yuanjingteam@163.com
                </Text>
              </div>
              <div className="text-center w-full max-w-md">
                <div className="mb-2">
                  <Text bold>
                    {dict.contactUs.mailingAddress}
                  </Text>
                </div>
                <div className="whitespace-pre-line">
                  <Text>
                    {dict.contactUs.addressText}
                  </Text>
                </div>
              </div>
            </div>
          </div>

          {/* 常见问题 */}
          <div className="flex flex-col items-start md:items-center gap-4 md:gap-6">
            <Text bold medium>
              {dict.contactUs.faq}
            </Text>
            <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-6 justify-items-center">
              {dict.contactUs.faqItems.map((item: {question: string, answer: string}, index: number) => (
                <div key={index} className="text-center w-full max-w-md">
                  <div className="mb-2">
                    <Text bold>
                      {item.question}
                    </Text>
                  </div>
                  <Text>
                    {item.answer}
                  </Text>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ContactUs;
