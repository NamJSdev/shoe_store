import { Sidebar } from "@/components/sidebar";
import { useEffect } from "react";
const DashboardLayout = (props: { children: React.ReactNode }) => {
  return (
    <div>
      <Sidebar />
      <main className="mx-5 mt-16 sm:ml-[300px] sm:mt-3">{props.children}</main>
    </div>
  );
};

export default DashboardLayout;
