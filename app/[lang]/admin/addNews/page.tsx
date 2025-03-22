// app/admin/addNews/page.tsx
"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Container from "@/app/components/Container";
import Title from "@/app/components/Title";
import Text from "@/app/components/Text";
import Button from "@/app/components/Button";
import { useAuth } from "@/app/context/Auth/AuthContext";

const AddNews = () => {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch("/api/auth/check");
      if (response.status !== 200) {
        console.log(response.status);
        // router.push("/admin");
      }
    };
    checkAuth();
  }, [router]);

  const handleLogout = () => {
    logout();
    router.push("/admin");
  };

  return (
    <Container>
      <div className="py-32 w-full flex justify-between">
        <Title color="black">Add News</Title>
        {isAuthenticated ? (
          <div className=" w-32">
            <Button label="Logout" onClick={handleLogout} />
          </div>
        ) : (
          <Text>You are not logged in.</Text>
        )}
      </div>
    </Container>
  );
};

export default AddNews;
