// app/admin/AdminLayout.tsx
"use client";

import { ReactNode } from "react";
import { AuthProvider } from "@/app/context/Auth/AuthContext";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <AuthProvider>
      <div className="admin-layout">{children}</div>
    </AuthProvider>
  );
};

export default AdminLayout;
