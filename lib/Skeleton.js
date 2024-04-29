import React from "react";

const Skeleton = () => {
  return (
    <div className="mx-2 mb-5">
      <div className=" p-4 rounded-lg space-y-6">
        <div className="rounded-lg h-96 animate-pulse">
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
          
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Skeleton;
