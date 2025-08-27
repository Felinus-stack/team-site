import { getTeamByFullName } from "@/app/actions/getTeamByName";
import Container from "@/app/components/Container";
import Text from "@/app/components/Text";
import Title from "@/app/components/Title";
import { getDictionary } from "../dictionaries";
import UserCard from "../team/[teamId]/UserCard";
import { sortRoles } from "../team/[teamId]/utils";
import { EmailAction, Admin } from "./emailAction";
import GoogleMapComponent from "./map";
import { FaWeixin, FaWeibo, FaLinkedin, FaGithub, FaPhone, FaEnvelope, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import { SiBilibili } from "react-icons/si";

interface Role {
  department: string;
  role: string;
  projectName: string;
}
interface TeamMember {
  name: string;
  surname: string;
  roles: Role[];
  currentRole: string;
  phoneNumber?: string | null;
  email?: string | null;
}

interface RoleHistory {
  [key: string]: Role[];
}

const getMembersData = async (names: string[]): Promise<TeamMember[]> => {
  const teamMembers: TeamMember[] = [];

  for (const member of names) {
    const [name, ...rest] = member.split(" ");
    const surname = rest.join(" ");
    const memberData = await getTeamByFullName(name, surname);
    if (memberData.length > 0) {
      const member = memberData[0];
      const currentRole =
        member.roles.find((role: Role) => role.projectName === "智能陪护")?.role ||
        "No current role";

      teamMembers.push({
        ...member,
        currentRole,
      });
    }
  }

  return teamMembers;
};

interface ContactUsProps {
  params: {
    lang: string;
  };
}

const ContactUs: React.FC<ContactUsProps> = async ({ params }) => {
  const language =
    params.lang === "ch" || params.lang === "en" ? params.lang : "en";
  const dict = await getDictionary(language);

  const mainMembers = await getMembersData([
    "paweł wójcik",
    "bartosz sobczak",
    "zuzanna kochanowska",
    "joanna popielewska",
  ]);

  const projectSupervisors = await getMembersData([
    "dr hab. inż. Anna Janicka",
    "dr hab. inż. Damian Derlukiewicz",
    "dr inż. Gustaw Sierzputowski",
  ]);

  const siteAdministration = await getMembersData([
    "dawid chmal",
    "maria kanczewska",
  ]);

  const roleHistory: RoleHistory = {};
  [...mainMembers, ...projectSupervisors, ...siteAdministration].forEach(
    (member) => {
      const memberFullName = `${member.name} ${member.surname}`;
      roleHistory[memberFullName] = sortRoles(
        member.roles.map((role) => ({
          role: role.role,
          projectName: role.projectName,
          department: role.department,
        }))
      );
    }
  );

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
          <div className="grid grid-cols-1 xl:grid-cols-4 sm:grid-cols-2 w-full gap-6">
            {mainMembers.map((member, index) => (
              <div key={index} className="flex flex-col gap-6 ">
                <UserCard
                  member={member}
                  teamId="智能陪护"
                  roleHistory={roleHistory}
                />
                <EmailAction
                  email={member.email || "pawel.wojcik.pwrrt@gmail.com"}
                />
                <EmailAction
                  email={member.phoneNumber || "pawel.wojcik.pwrrt@gmail.com"}
                />
              </div>
            ))}
          </div>
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
            <Text bold medium>
              {dict.contactUs.projectSupervisors}
            </Text>
            <div className="grid grid-cols-1 md:grid-cols-3 w-full md:w-3/4 gap-6">
              {projectSupervisors.map((member, index) => (
                <UserCard
                  key={index}
                  opiekun={true}
                  member={member}
                  teamId="智能陪护"
                  roleHistory={roleHistory}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col items-start md:items-center gap-4 md:gap-6">
            <Admin text={dict.contactUs.siteAdministration} />
            <div className="grid grid-cols-1 md:grid-cols-2 w-full md:w-1/2 gap-6">
              {siteAdministration.map((member, index) => (
                <UserCard
                  key={index}
                  member={member}
                  teamId="智能陪护"
                  roleHistory={roleHistory}
                />
              ))}
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
                 href="https://bilibili.com/" 
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
              其他联系信息
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
                    邮箱联系
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
