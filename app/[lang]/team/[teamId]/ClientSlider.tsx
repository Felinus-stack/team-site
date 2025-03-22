"use client";

import Slider from "@/app/components/Section/BolidSection/Slider";

interface ParamsParamsClientSlider {
  teamId: string;
}
const ClientSlider: React.FC<ParamsParamsClientSlider> = ({ teamId }) => {
  return <Slider currentBolid={teamId} darkMode></Slider>;
};

export default ClientSlider;
