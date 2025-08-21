"use client";

import Department from "./Department";
import BottomBar from "./BottomBar";

const DepartmentsSubsection = () => {
  return (
    <div>
      <div className=" grid-rows-2 relative border-none ">
        <div className=" grid grid-cols-1 md:grid-cols-3">
          <Department department="frontend" />
          <Department department="backend" />
          <Department department="product" />
        </div>
        <div className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
          <Department department="design" />
          <Department department="operates" />
          <Department department="mobile" />
          <Department department="algorithm" />
        </div>
      </div>
      <BottomBar />
    </div>
  );
};

export default DepartmentsSubsection;
