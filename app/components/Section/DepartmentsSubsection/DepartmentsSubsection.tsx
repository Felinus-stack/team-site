"use client";

import Department from "./Department";
import BottomBar from "./BottomBar";

const DepartmentsSubsection = () => {
  return (
    <div>
      <div className=" grid-rows-2 relative border-none ">
        <div className=" grid grid-cols-1 md:grid-cols-3">
          <Department department="mechanical" />
          <Department department="composites" />
          <Department department="marketing" />
        </div>
        <div className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
          <Department department="software" />
          <Department department="electrical" />
          <Department department="vehicle performance" />
          <Department department="business" />
        </div>
      </div>
      <BottomBar />
    </div>
  );
};

export default DepartmentsSubsection;
