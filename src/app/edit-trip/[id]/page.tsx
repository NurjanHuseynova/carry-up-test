import React from "react";
import { useRouter } from "next/router";
import EditTrip from "@/pages/Profile/EditTrip";
import Navbar from "@/components/Navbar/Navbar";

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
        <EditTrip id={id} /> 
      </div>
    </div>
  );
}

export default Page;
