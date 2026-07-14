// 管理员添加新闻页面
"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import Container from "@/app/components/Container";
import Title from "@/app/components/Title";
import Text from "@/app/components/Text";
import Button from "@/app/components/Button";
import Input from "@/app/components/Inputs/Input";
import Textarea from "@/app/components/Inputs/Textarea";
import { useAuth } from "@/app/context/Auth/AuthContext";
import { getAuthorizationHeaders, publicApiBaseUrl } from "@/app/libs/auth-client";

const AddNews = () => {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const params = useParams();
  const lang = (params?.lang as string) || "ch";
  const [isChecking, setIsChecking] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [contentItems, setContentItems] = useState<string[]>(['']);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      title: '',
      shortDescription: '',
      longDescription: '',
      duration: 5,
      logo: '/images/logo-czarne.svg',
      mainImage: '/images/placeholder.jpg',
    }
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${publicApiBaseUrl}/api/auth/me`, {
          headers: getAuthorizationHeaders(),
        });
        if (response.status !== 200) {
          console.log("Authentication failed, redirecting to admin");
          router.push(`/${lang}/admin`);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        router.push(`/${lang}/admin`);
      } finally {
        setIsChecking(false);
      }
    };
    
    checkAuth();
  }, [router, lang]);

  const handleLogout = () => {
    logout();
    router.push(`/${lang}/admin`);
  };

  const addContentItem = () => {
    setContentItems([...contentItems, '']);
  };

  const removeContentItem = (index: number) => {
    if (contentItems.length > 1) {
      const newItems = contentItems.filter((_, i) => i !== index);
      setContentItems(newItems);
    }
  };

  const updateContentItem = (index: number, value: string) => {
    const newItems = [...contentItems];
    newItems[index] = value;
    setContentItems(newItems);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    try {
      const newsData = {
        ...data,
        duration: parseInt(data.duration) || 5,
        content: contentItems
          .filter(item => item.trim() !== '')
          .map(text => ({ text }))
      };

      const response = await fetch(`${publicApiBaseUrl}/api/news`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthorizationHeaders(),
        },
        body: JSON.stringify(newsData),
      });

      if (response.ok) {
        toast.success('新闻创建成功！');
        reset();
        setContentItems(['']);
        router.push(`/${lang}/news`);
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || '创建新闻失败');
      }
    } catch (error) {
      console.error('Error creating news:', error);
      toast.error('创建新闻时发生错误');
    } finally {
      setIsLoading(false);
    }
  };

  if (isChecking) {
    return (
      <Container>
        <div className="py-32 w-full flex justify-center">
          <Text>检查认证状态...</Text>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="py-32 w-full">
        <div className="flex justify-between items-center mb-8">
          <Title color="black">添加新闻</Title>
          {isAuthenticated ? (
            <div className="w-32">
              <Button label="退出登录" onClick={handleLogout} />
            </div>
          ) : (
            <Text>您未登录</Text>
          )}
        </div>

        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              id="title"
              label="新闻标题 *"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />

            <Textarea
              id="shortDescription"
              label="简短描述 *"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              rows={3}
            />

            <Textarea
              id="longDescription"
              label="详细描述 *"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              rows={6}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                id="duration"
                label="阅读时长 (分钟)"
                type="number"
                disabled={isLoading}
                register={register}
                errors={errors}
              />

              <Input
                id="logo"
                label="Logo 路径"
                disabled={isLoading}
                register={register}
                errors={errors}
              />
            </div>

            <Input
              id="mainImage"
              label="主图片路径"
              disabled={isLoading}
              register={register}
              errors={errors}
            />

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Text>新闻内容段落</Text>
                <Button
                  label="添加段落"
                  onClick={addContentItem}
                  disabled={isLoading}
                />
              </div>

              {contentItems.map((item, index) => (
                <div key={index} className="flex gap-2 items-start">
                  <div className="flex-1">
                    <textarea
                      value={item}
                      onChange={(e) => updateContentItem(index, e.target.value)}
                      placeholder={`段落 ${index + 1}`}
                      disabled={isLoading}
                      rows={2}
                      className="w-full p-3 border-2 border-neutral-300 rounded-md outline-none focus:border-black transition disabled:opacity-70"
                    />
                  </div>
                  {contentItems.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeContentItem(index)}
                      disabled={isLoading}
                      className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition disabled:opacity-70"
                    >
                      删除
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-4 pt-6">
              <Button
                label={isLoading ? "创建中..." : "创建新闻"}
                onClick={handleSubmit(onSubmit)}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => router.push(`/${lang}/admin`)}
                disabled={isLoading}
                className="px-6 py-3 border-2 border-neutral-300 rounded-md hover:border-black transition disabled:opacity-70"
              >
                取消
              </button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default AddNews;
