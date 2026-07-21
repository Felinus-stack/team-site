"use client";

import { useState, useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter, usePathname } from "next/navigation";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useAuth } from "@/app/context/Auth/AuthContext";
import { parseAuthResponse, publicApiBaseUrl } from "@/app/libs/auth-client";

import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../Inputs/Input";

type LoginDictionary = {
  loginModal: {
    title: string;
    welcomeBack: string;
    loginToAccount: string;
    email: string;
    password: string;
    continue: string;
    noAccount: string;
    register: string;
    loginSuccess: string;
    loginFailed: string;
  };
};

const LoginModal = () => {
  const router = useRouter();
  const pathname = usePathname();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const { login } = useAuth(); // Use the login function from the AuthContext
  const [isLoading, setIsLoading] = useState(false);
  const [dict, setDict] = useState<LoginDictionary | null>(null);

  // 获取当前语言
  const currentLang = pathname?.split('/')[1] || 'en';
  const isChineseLang = currentLang === 'ch';

  // 加载字典
  useEffect(() => {
    const loadDictionary = async () => {
      try {
        const dictModule = await import(`@/app/[lang]/dictionaries/${isChineseLang ? 'ch' : 'en'}.json`);
        setDict(dictModule.default as LoginDictionary);
      } catch (error) {
        console.error('Failed to load dictionary:', error);
        // 如果加载失败，使用默认英文文本
        setDict({
          loginModal: {
            title: "Login",
            welcomeBack: "Welcome back",
            loginToAccount: "Login to your account!",
            email: "Email",
            password: "Password",
            continue: "Continue",
            noAccount: "Don't have an account?",
            register: "Register",
            loginSuccess: "Logged in",
            loginFailed: "Login failed"
          }
        });
      }
    };
    
    loadDictionary();
  }, [isChineseLang]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${publicApiBaseUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email, password: data.password }),
      });
      const result = parseAuthResponse(await response.json());
      if (!response.ok || !result) {
        toast.error(dict?.loginModal.loginFailed ?? "Login failed");
        return;
      }
      login(result.token);
      toast.success(dict?.loginModal.loginSuccess ?? "Logged in");
      loginModal.onClose();
      router.push(`/${currentLang}/admin/addNews`);
    } catch {
      toast.error(dict?.loginModal.loginFailed ?? "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  // 如果字典还没有加载，显示加载状态
  if (!dict) {
    return (
      <Modal
        disabled={true}
        isOpen={loginModal.isOpen}
        title="Loading..."
        actionLabel="Loading..."
        onClose={loginModal.onClose}
        onSubmit={() => {}}
        body={<div className="flex justify-center p-4">加载中...</div>}
      />
    );
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading 
        title={dict.loginModal.welcomeBack} 
        subtitle={dict.loginModal.loginToAccount} 
      />
      <Input
        id="email"
        label={dict.loginModal.email}
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        type="password"
        label={dict.loginModal.password}
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      {/* 暂时注释掉OAuth登录功能 - 待开发完成后启用 */}
      {/* 
      <Button
        outline
        label={dict.loginModal.continueWithGoogle}
        icon={FcGoogle}
        onClick={() => handleOAuthSignIn('google')}
        disabled={isLoading}
      />
      <Button
        outline
        label={dict.loginModal.continueWithGithub}
        icon={AiFillGithub}
        onClick={() => handleOAuthSignIn('github')}
        disabled={isLoading}
      />
      */}
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="justify-center flex flex-row items-center gap-2">
          <div>{dict.loginModal.noAccount}</div>
          <div
            onClick={registerModal.onOpen}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            {dict.loginModal.register}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title={dict.loginModal.title}
      actionLabel={dict.loginModal.continue}
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
