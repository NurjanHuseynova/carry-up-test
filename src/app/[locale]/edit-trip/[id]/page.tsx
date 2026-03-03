import React from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar/Navbar";
import EditTrip from "@/components/Profile/EditTrip";

interface PageProps {
    params: {
      id: string;
    };
  }
  

  const Page: React.FC<PageProps> = async ({ params }) => {
    const { id } = params;

  return (
    <div>
      <Navbar />
      <div className="custom_container">
        <EditTrip id={id} /> 
      </div>
    </div>
  );
}

export default Page;
