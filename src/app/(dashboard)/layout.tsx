import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import React from "react";
import { StudentProvider } from "./_context/StudentContext";

interface Props {
  children: React.ReactNode;
}

const layout = ({ children }: Props) => {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 flex-col  ">
            <div className="flex items-center gap-2 px-4 justify-between w-full mt-2">
              <SidebarTrigger className="-ml-1" />
            </div>
            <Separator />
          </header>
          <StudentProvider>{children}</StudentProvider>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
};

export default layout;
