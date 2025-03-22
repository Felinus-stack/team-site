"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginModal from "@/app/components/modals/LoginModal";
import JoinusSection from "@/app/components/Section/JoinusSection/JoinusSection";
import { useAuth } from "@/app/context/Auth/AuthContext";

interface AdminPageClientProps {
  dict: {
    title: string;
    buttonRecruitment: string;
    buttonPartner: string;
  };
}

const AdminPageContent: React.FC<AdminPageClientProps> = ({ dict }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/admin/addNews");
    }
  }, [isAuthenticated, router]);

  return (
    <>
      <JoinusSection dict={dict} sizeBig />
      <LoginModal />
    </>
  );
};

const AdminPageClient: React.FC<AdminPageClientProps> = (props) => {
  return <AdminPageContent {...props} />;
};

export default AdminPageClient;
