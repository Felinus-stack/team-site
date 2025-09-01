"use client";
//专门为团队页面设计的时间轴组件
import Slider from "@/app/components/Section/ProjectSection/Slider";

interface ParamsParamsClientSlider {
  teamId: string;
  language?: "ch" | "en";
  onChangeProject?: (projectName: string) => void;
}
const ClientSlider: React.FC<ParamsParamsClientSlider> = ({ 
  teamId, 
  language = "ch", 
  onChangeProject 
}) => {
  return (
    <Slider 
      currentProject={teamId} 
      language={language} 
      darkMode
      onChangeProject={onChangeProject}
    />
  );
};

export default ClientSlider;
