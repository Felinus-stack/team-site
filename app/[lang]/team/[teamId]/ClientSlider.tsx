"use client";

import Slider from "@/app/components/Section/ProjectSection/Slider";

interface ParamsParamsClientSlider {
  teamId: string;
}
const ClientSlider: React.FC<ParamsParamsClientSlider> = ({ teamId }) => {
  return <Slider currentProject={teamId} darkMode></Slider>;
};

export default ClientSlider;
