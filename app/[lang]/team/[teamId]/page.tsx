"use client";

import { getTeamByProject } from "@/app/actions/getTeamByProject";
import Container from "@/app/components/Container";
import SecondaryButton from "@/app/components/SecondaryButton";
import Title from "@/app/components/Title";
import Image from "next/image";
import ClientSlider from "./ClientSlider";
import UserCard from "./UserCard";
import { sortRoles } from "./utils";
import { useEffect, useState } from "react";

interface Iparams {
  teamId?: string;
}

const TeamPage = ({ params }: { params: Iparams }) => {
  const [team, setTeam] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const teamId = params.teamId ?? "RT13e";

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const teamData = await getTeamByProject(teamId);
        setTeam(teamData);
      } catch (error) {
        console.error('Error fetching team:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, [teamId]);

  interface Member {
    name: string;
    surname: string;
    currentRole: string;
    phoneNumber?: string;
    email?: string;
  }

  interface RoleHistoryItem {
    role: string;
    projectName: string;
    department: string;
  }

  interface MembersByDepartment {
    [key: string]: Member[];
  }

  interface RoleHistory {
    [key: string]: RoleHistoryItem[];
  }

  const membersByDepartment: MembersByDepartment = {};
  const roleHistory: RoleHistory = {};

  team.forEach((member: any) => {
    const memberFullName = `${member.name} ${member.surname}`;

    member.roles.forEach((role: any) => {
      if (!roleHistory[memberFullName]) {
        roleHistory[memberFullName] = [];
      }
      roleHistory[memberFullName].push({
        role: role.role,
        projectName: role.projectName,
        department: role.department,
      });

      if (role.projectName === teamId) {
        if (!membersByDepartment[role.department]) {
          membersByDepartment[role.department] = [];
        }
        let departmentMember = membersByDepartment[role.department].find(
          (m) => `${m.name} ${m.surname}` === memberFullName
        );
        if (!departmentMember) {
          departmentMember = {
            name: member.name,
            surname: member.surname,
            phoneNumber: member.phoneNumber ?? "", // Default value for phoneNumber
            email: member.email ?? "", // Default value for email
            currentRole: role.role,
          } as Member;
          membersByDepartment[role.department].push(departmentMember);
        }
      }
    });
  });

  for (const memberFullName in roleHistory) {
    roleHistory[memberFullName] = sortRoles(roleHistory[memberFullName]);
  }

  const departmentOrder = [
    "management",
    "product",
    "backend",
    "design",
    "operates",
    "frontend",
    "mobile",
    "workshop",
    "drivers",
    "opiekun naukowy",
  ];

  const sortedDepartments = Object.keys(membersByDepartment).sort((a, b) => {
    const aIndex = departmentOrder.indexOf(a);
    const bIndex = departmentOrder.indexOf(b);

    if (a === "opiekun naukowy") return 1;
    if (b === "opiekun naukowy") return -1;

    if (aIndex === -1 && bIndex === -1) return a.localeCompare(b);
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;

    return aIndex - bIndex;
  });

  if (loading) {
    return (
      <div className="relative bg-neutral-950 pt-32 pb-12">
        <div className="flex items-center justify-center h-64">
          <div className="text-white">加载中...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-neutral-950 pt-32 pb-12">
      <div className="relative overflow-hidden">
        <ClientSlider teamId={teamId} />

        {/* 项目团队展示区域 */}
        <div className="relative py-16 animate-fade-in">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/team/Bg.jpeg"
              alt="团队背景"
              layout="fill"
              objectFit="cover"
              quality={50}
              style={{ filter: "grayscale(100%)" }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-80"></div>
          </div>
          <Container>
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 md:gap-20">
              <div className="flex-1">
                <Title size="subtitle" color="gray">
                  {decodeURIComponent(teamId)} 项目团队
                </Title>
                <Title size="big" color="white">
                  认识项目团队成员
                </Title>
                <div className="my-6">
                  <p className="text-white text-opacity-70 text-xs sm:text-base sm:leading-5">
                    这个项目由来自不同部门的优秀成员组成，每个成员都在各自的专业领域发挥重要作用，共同推动项目的成功实施。
                  </p>
                </div>
                <div className="mt-4">
                  <p className="text-white text-opacity-60 text-xs">
                    团队成员总数: {Object.values(membersByDepartment).reduce((acc, members) => acc + members.length, 0)} 人
                  </p>
                  <p className="text-white text-opacity-60 text-xs">
                    涉及部门: {sortedDepartments.length} 个
                  </p>
                  <div className="mt-4">
                    <button 
                      className="px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white text-sm rounded-lg transition-all duration-300"
                      onClick={() => {
                        // 滚动到第一个部门
                        const firstDepartment = document.querySelector('[data-department]');
                        if (firstDepartment) {
                          firstDepartment.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                    >
                      查看全部成员
                    </button>
                  </div>
                </div>
              </div>
                             <div className="flex gap-4 flex-1 justify-end">
                 {/* 根据当前项目显示对应的团队照片 */}
                 {(() => {
                   // 项目对应的团队照片映射 
                   const projectTeamPhotos: { [key: string]: { src: string; alt: string; title: string } } = {
                     "智能陪护": { src: "/images/team/team1.jpeg", alt: "智能陪护团队", title: "智能陪护团队" },
                     "新乡市卡口车辆防疫管理系统": { src: "/images/team/team2.jpeg", alt: "防疫系统团队", title: "防疫系统团队" },
                     "新生报道系统": { src: "/images/team/team3.jpeg", alt: "新生系统团队", title: "新生系统团队" },
                     "无人车定位跟踪系统": { src: "/images/team/team4.jpg", alt: "无人车团队", title: "无人车团队" },
                     "网格化管理系统": { src: "/images/team/team5.jpg", alt: "网格化团队", title: "网格化团队" },
                     "统战管理系统": { src: "/images/team/team6.jpg", alt: "统战系统团队", title: "统战系统团队" },
                     "场所工作人员管理界面": { src: "/images/team/team7.jpg", alt: "场所管理团队", title: "场所管理团队" },
                     "XXX市信访预警系统": { src: "/images/team/team8.jpg", alt: "信访系统团队", title: "信访系统团队" }
                   };

                   // 解码 teamId 以正确匹配项目名称
                   const decodedTeamId = decodeURIComponent(teamId);
                   
                   // 获取当前项目的团队照片，如果没有则使用默认照片
                   const currentProjectPhoto = projectTeamPhotos[decodedTeamId] || { 
                     src: "/images/team/team1.jpeg", 
                     alt: "团队照片", 
                     title: "团队照片" 
                   };

                   return (
                     <div className="w-[550px] h-[350px] md:h-[350px]  relative group cursor-pointer overflow-hidden rounded-lg">
                       <Image
                         src={currentProjectPhoto.src}
                         alt={currentProjectPhoto.alt}
                         layout="fill"
                         objectFit="cover"
                         className="rounded-lg transition-transform duration-500 group-hover:scale-110"
                       />
                       <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-lg"></div>
                       <div className="absolute bottom-2 left-2 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                         {currentProjectPhoto.title}
                       </div>
                     </div>
                   );
                 })()}
                

              </div>
            </div>
          </Container>
        </div>

        <div className="pt-10">
          {sortedDepartments.map((department, depIndex) => (
            <div key={department} className="" data-department={department}>
              <div
                className={`absolute opacity-5 ${
                  depIndex % 2 === 0 ? "left-0" : "right-0"
                }`}
              >
                <h1 className="text-[15rem] font-extrabold text-white uppercase leading-none">
                  {department === "management" ? "Team" : department}
                </h1>
              </div>
              <Container>
                <div
                  className={`${
                    department === "management"
                      ? " grid-cols-1 lg:grid-cols-2"
                      : "grid-cols-1"
                  } grid my-8 align-middle justify-center gap-8 lg:gap-16 w-full`}
                >
                  <div className=" order-2 lg:order-1">
                    <div className="flex flex-col items-center">
                      <div className="uppercase text-center my-6 p-2 px-20 border-white border-b-2">
                        <Title color="white">
                          {department === "management" ? decodeURIComponent(teamId) : department}
                        </Title>
                      </div>
                    </div>
                    <div
                      key={department}
                      className={`${
                        department === "management"
                          ? " grid-cols-1 sm:grid-cols-2"
                          : " grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                      } grid my-4 gap-6`}
                    >
                      {membersByDepartment[department]
                        .sort((a, b) => {
                          const isLeaderA = a.currentRole
                            .toLowerCase()
                            .includes("leader");
                          const isLeaderB = b.currentRole
                            .toLowerCase()
                            .includes("leader");
                          if (isLeaderA && !isLeaderB) return -1;
                          if (!isLeaderA && isLeaderB) return 1;
                          if (isLeaderA && isLeaderB) return 0;
                          return a.name.localeCompare(b.name);
                        })
                        .map((member, index) => (
                          <UserCard
                            key={index}
                            member={member}
                            teamId={teamId}
                            roleHistory={roleHistory}
                          />
                        ))}
                    </div>
                  </div>
                  {department === "management" && (
                    <div className="flex flex-col justify-center order-1">
                      <div className="relative">
                        <div className=" absolute">
                          <SecondaryButton
                            darkMode
                            to={`/projects/${params.teamId}`}
                            buttonText={`查看项目 ${params.teamId}`}
                          />
                        </div>

                        <Image
                          src={`/images/projects/${params.teamId}/${params.teamId}.png`}
                          alt="project"
                          width={700}
                          height={551}
                          objectFit="cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </Container>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
