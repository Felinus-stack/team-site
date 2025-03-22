import { getTeamByBolid } from "@/app/actions/getTeamByBolid";
import Container from "@/app/components/Container";
import SecondaryButton from "@/app/components/SecondaryButton";
import Title from "@/app/components/Title";
import Image from "next/image";
import ClientSlider from "./ClientSlider";
import UserCard from "./UserCard";
import { sortRoles } from "./utils";

interface Iparams {
  teamId?: string;
}

const TeamPage = async ({ params }: { params: Iparams }) => {
  const teamId = params.teamId ?? "RT13e";
  const team = await getTeamByBolid(teamId);

  interface Member {
    name: string;
    surname: string;
    currentRole: string;
    phoneNumber?: string;
    email?: string;
  }

  interface RoleHistoryItem {
    role: string;
    bolidName: string;
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

  team.forEach((member) => {
    const memberFullName = `${member.name} ${member.surname}`;

    member.roles.forEach((role) => {
      if (!roleHistory[memberFullName]) {
        roleHistory[memberFullName] = [];
      }
      roleHistory[memberFullName].push({
        role: role.role,
        bolidName: role.bolidName,
        department: role.department,
      });

      if (role.bolidName === teamId) {
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
    "marketing",
    "composites",
    "software",
    "electrical",
    "mechanical",
    "vehicle performance",
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

  return (
    <div className="relative bg-neutral-950 pt-32 pb-12">
      <div className="relative overflow-hidden">
        <ClientSlider teamId={teamId} />

        <div className="pt-10">
          {sortedDepartments.map((department, depIndex) => (
            <div key={department} className="">
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
                          {department === "management" ? teamId : department}
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
                            to={`/bolid/${params.teamId}`}
                            buttonText={`Do bolidu ${params.teamId}`}
                          />
                        </div>

                        <Image
                          src={`/images/bolid/${params.teamId}/${params.teamId}.png`}
                          alt="bolid"
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
