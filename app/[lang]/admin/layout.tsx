// 管理员布局组件
"use client";

import { ReactNode, useEffect } from "react";
import { AuthProvider } from "@/app/context/Auth/AuthContext";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  useEffect(() => {
    document.body.classList.add("admin-active");
    return () => document.body.classList.remove("admin-active");
  }, []);

  return (
    <AuthProvider>
      <div className="admin-layout">{children}</div>
    </AuthProvider>
  );
};

export default AdminLayout;
