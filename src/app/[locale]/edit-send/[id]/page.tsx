import React from "react";
import Navbar from "@/components/Navbar/Navbar";
import EditSend from "@/pages/Profile/EditSend";

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
        <EditSend id={id} /> 
      </div>
    </div>
  );
}

export default Page;
