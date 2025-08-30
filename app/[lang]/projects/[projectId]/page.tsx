// import { getProjectByProjectId } from "@/app/actions/getProjectByProjectId"; // 暂时不使用数据库
import Container from "@/app/components/Container";
import ProjectSectionFinal from "@/app/components/Section/ProjectSection/ProjectSectionFinal";
import Text from "@/app/components/Text";
import Title from "@/app/components/Title";
import Image from "next/image";
import { getDictionary } from "../../dictionaries";
import { getEnglishFileName } from "@/app/utils/projectMapping";

interface Iparams {
  lang: string;
  projectId?: string;
}

type Locale = "ch" | "en";

const ProjectPage = async ({ params }: { params: Iparams }) => {
  const { lang, projectId } = params;
  const currentLocale = lang === "ch" || lang === "en" ? lang : "en";

  const dict = await getDictionary(currentLocale);
  const projectIdValue = projectId ?? "智能陪护";
  // 使用静态数据 - 不依赖数据库
  const project = {
    year: "2025",
    name: projectIdValue,
    parts: [
      { 
        partName: "智能控制系统", 
        description: "采用先进的人工智能算法，实现智能化控制和决策。系统具备自主学习能力，能够根据实际应用场景不断优化控制策略，提高系统整体性能和用户体验。集成了多种传感器数据融合技术，确保控制决策的准确性和实时性。" 
      },
      { 
        partName: "传感器网络", 
        description: "部署高精度多类型传感器网络，实现对环境参数的全方位监测。包括温度、湿度、光照、运动等多维度数据采集，支持实时数据传输和边缘计算处理。传感器采用低功耗设计，支持长期稳定运行。" 
      },
      { 
        partName: "通信模块", 
        description: "基于最新的5G/WiFi6技术，构建高速稳定的通信网络。支持多协议兼容，确保与各类设备的无缝连接。采用端到端加密技术，保障数据传输安全。具备网络自愈能力，在网络中断时能够自动切换备用链路。" 
      },
      { 
        partName: "用户界面", 
        description: "设计简洁直观的用户交互界面，支持多平台访问（Web、移动端、桌面应用）。采用响应式设计，适配各种屏幕尺寸。集成语音控制和手势识别功能，提供多元化的交互方式。界面支持个性化定制，满足不同用户的使用习惯。" 
      },
      { 
        partName: "数据分析", 
        description: "构建强大的数据分析引擎，采用机器学习和深度学习算法对收集的数据进行智能分析。能够识别数据模式、预测趋势、发现异常情况。提供可视化的数据报表和实时监控面板，帮助用户快速理解系统状态和性能指标。" 
      },
      { 
        partName: "安全防护", 
        description: "实施多层次的安全防护体系，包括物理安全、网络安全、数据安全等方面。采用区块链技术确保数据不可篡改，支持多因子身份认证，实现精细化的权限管理。定期进行安全漏洞扫描和渗透测试，确保系统安全稳定运行。" 
      }
    ]
  };

  return (
    <div className="flex flex-col pt-[100px]">
      <ProjectSectionFinal
        dict={dict.projectSection}
        language={currentLocale}
        presetProject={projectIdValue}
      />
      {/* 项目成果展示 - 正在开发中 */}
      <div className=" w-full" id="achievements">
        {/* <Container>
          <div className="flex flex-col w-full py-8 md:py-16">
            <Title size="big" color="black">
              项目成果展示
            </Title>
            
            <div className="flex justify-center items-center py-16">
              <div className="bg-gray-100 rounded-lg p-12 text-center max-w-md">
                <div className="text-6xl mb-4">🚧</div>
                <Title size="small" color="gray">正在开发中</Title>
                <div className="mt-4">
                  <Text color="gray">此功能正在紧张开发中，敬请期待...</Text>
                </div>
              </div>
            </div>
          </div>
        </Container> */}
      </div>
      {/* 项目详细内容 - 正在开发中 */}
      <div className="w-full bg-gray-50 py-16">
        <Container>
          <div className="flex justify-center items-center py-16">
            <div className="bg-white rounded-lg p-12 text-center max-w-lg shadow-lg">
              <div className="text-6xl mb-6">⚙️</div>
              <Title size="big" color="gray">项目详情正在完善中</Title>
              <div className="mt-6">
                <Text color="gray">我们正在努力完善项目的详细介绍和技术文档</Text>
                <Text color="gray">更多精彩内容即将呈现，敬请期待...</Text>
              </div>
              <div className="mt-8">
                <div className="flex justify-center space-x-2">
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default ProjectPage;
