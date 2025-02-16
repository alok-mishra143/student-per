import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="w-full h-4" />
      <Skeleton className="w-full h-96" />
      <Skeleton className="w-full h-96" />
    </div>
  );
};

export default Loading;
