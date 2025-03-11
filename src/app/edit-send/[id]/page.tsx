import React from "react";
import Navbar from "@/components/Navbar/Navbar";
import EditSend from "@/pages/Profile/EditSend";

interface PageProps {
  params: Promise<{
      id: string;
  }>;
}

const Page: React.FC<PageProps> = async ({ params }) => {
  const { id } = await params; 

  return (
      <div>
          <Navbar />
          <div className="custom_container">
              <EditSend id={id} />
          </div>
      </div>
  );
};

export default Page;

