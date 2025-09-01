"use client";

import Image from "next/image";
import Title from "./Title";
import Text from "./Text";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type NewsCardProps = {
  id: string;
  title: string;
  short_description: string;
  long_description?: string;
  length_time?: number;
  logo: string;
  main_image: string;
  whiteMode?: boolean;
  onDelete?: () => void; // 添加删除回调函数
};

const NewsCard: React.FC<NewsCardProps> = ({
  id,
  title,
  short_description,
  long_description,
  length_time,
  logo,
  main_image,
  whiteMode,
  onDelete,
}) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  // 检查是否是管理员
  const isAdmin = session?.user;

  const handleDeleteClick = async (e: React.MouseEvent) => {
    e.preventDefault(); // 阻止链接跳转
    e.stopPropagation(); // 阻止事件冒泡
    setShowConfirmDialog(true);
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/news/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('新闻删除成功！');
        setShowConfirmDialog(false);
        if (onDelete) {
          onDelete(); // 调用父组件的回调函数
        }
        router.refresh(); // 刷新页面
      } else {
        const errorText = await response.text();
        toast.error(errorText || '删除失败');
      }
    } catch (error) {
      toast.error('删除失败，请重试');
      console.error('Delete error:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const cancelDelete = () => {
    setShowConfirmDialog(false);
  };

  return (
    <>
      <Link href={`/news/${id}`} passHref>
        <div className="group h-[26rem] md:h-[34rem] rounded-md flex flex-col overflow-hidden cursor-pointer">
          <div className="h-full relative overflow-hidden">
            <Image
              src={main_image}
              alt={"test"}
              fill
              style={{ objectFit: "cover" }}
              className="group-hover:scale-105 duration-500 ease-in-out"
            />
            
            {/* 管理员删除按钮 */}
            {isAdmin && (
              <button
                onClick={handleDeleteClick}
                className="absolute top-2 right-2 w-8 h-8 bg-red-600  text-red rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 shadow-lg"
                title="删除新闻"
              >
                ❌
              </button>
            )}
          </div>
          <div
            className={` ${
              whiteMode ? "bg-neutral-200" : "bg-neutral-200"
            } w-full px-5 py-4 flex flex-col`}
          >
            <Text color="black" small wide bold opacity1 center>
              {title}
            </Text>
            <div className="mb-3 mt-1 md:mb-4 md:mt-2 flex-1">
              <div 
                className="text-sm leading-relaxed text-black overflow-hidden"
                style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical' as const,
                  maxHeight: '4.5em'
                }}
              >
                {short_description.length > 150 
                  ? `${short_description.substring(0, 150)}...` 
                  : short_description}
              </div>
            </div>
            <div className="flex justify-between">
              <Image alt="Logo" height={40} width={80} src={logo} />
              <Text color="gray">{length_time} 分钟阅读</Text>
            </div>
          </div>
        </div>
      </Link>

      {/* 确认删除对话框 */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              确认删除
            </h3>
            <p className="text-gray-600 mb-6">
              您确定要删除新闻 `{title}` 吗？此操作无法撤销。
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                disabled={isDeleting}
              >
                取消
              </button>
              <button
                onClick={confirmDelete}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition-colors disabled:opacity-50"
              >
                {isDeleting ? '删除中...' : '确认删除'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewsCard;