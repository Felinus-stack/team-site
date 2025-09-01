"use client";

import Text from "@/app/components/Text";
import { FaEnvelope, FaPhone, FaUser, FaInfoCircle } from "react-icons/fa";
import { HiUsers, HiCode, HiCollection, HiQuestionMarkCircle } from "react-icons/hi";
import { HiHandRaised } from "react-icons/hi2";
import toast from "react-hot-toast";

interface ContactCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  contact: {
    name: string;
    role: string;
    email: string;
    phone: string;
  };
}

interface ContactCategoryCardProps {
  category: ContactCategory;
}

const ContactCategoryCard: React.FC<ContactCategoryCardProps> = ({ category }) => {
  // 图标映射 - 使用更友好的圆形背景设计
  const getIcon = (iconName: string) => {
    const iconSize = 18;
    const iconElement = (() => {
      switch (iconName) {
        case "FaUsers":
          return <HiUsers size={iconSize} className="text-white" />;
        case "FaHandshake":
          return <HiHandRaised size={iconSize} className="text-white" />;
        case "FaCode":
          return <HiCode size={iconSize} className="text-white" />;
        case "FaProjectDiagram":
          return <HiCollection size={iconSize} className="text-white" />;
        case "FaQuestionCircle":
          return <HiQuestionMarkCircle size={iconSize} className="text-white" />;
        default:
          return <HiQuestionMarkCircle size={iconSize} className="text-white" />;
      }
    })();

    // 根据不同图标类型使用不同的背景色
    const getBackgroundColor = () => {
      switch (iconName) {
        case "FaUsers":
          return "bg-blue-500";
        case "FaHandshake":
          return "bg-green-500";
        case "FaCode":
          return "bg-purple-500";
        case "FaProjectDiagram":
          return "bg-orange-500";
        case "FaQuestionCircle":
          return "bg-indigo-500";
        default:
          return "bg-gray-500";
      }
    };

    return (
      <div className={`w-10 h-10 rounded-full ${getBackgroundColor()} flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300`}>
        {iconElement}
      </div>
    );
  };

  const handleEmailClick = (email: string) => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      window.location.href = `mailto:${email}`;
    } else {
      navigator.clipboard
        .writeText(email)
        .then(() => {
          toast.success(`邮箱已复制到剪贴板: ${email}`);
        })
        .catch((err) => {
          toast.error("复制邮箱失败");
        });
    }
  };

  const handlePhoneClick = (phone: string) => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      window.location.href = `tel:${phone}`;
    } else {
      navigator.clipboard
        .writeText(phone)
        .then(() => {
          toast.success(`电话号码已复制到剪贴板: ${phone}`);
        })
        .catch((err) => {
          toast.error("复制电话号码失败");
        });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-5 hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-300 group h-full">
      {/* 类别标题部分 */}
      <div className="flex items-start mb-3">
        <div className="mr-3 flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
          {getIcon(category.icon)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="mb-1">
            <Text bold small color="black">
              {category.title}
            </Text>
          </div>
          <div className="leading-relaxed">
            <Text extrasmall color="gray">
              {category.description}
            </Text>
          </div>
        </div>
      </div>

      {/* 联系人信息部分 */}
      <div className="border-t border-gray-200 pt-3 flex-1 flex flex-col">
        <div className="flex items-start mb-3">
          <FaUser className="text-customRed mr-2 mt-0.5 flex-shrink-0" size="14px" />
          <div className="flex-1 min-w-0">
            <div className="mb-0.5">
              <Text bold extrasmall color="black">
                {category.contact.name}
              </Text>
            </div>
            <Text extrasmall color="gray">
              {category.contact.role}
            </Text>
          </div>
        </div>

        {/* 联系方式 */}
        <div className="space-y-1.5 mb-3 flex-1">
          <div 
            className="flex items-center cursor-pointer hover:bg-gray-50 p-1.5 rounded-md transition-all duration-200 group/contact"
            onClick={() => handleEmailClick(category.contact.email)}
          >
            <FaEnvelope className="text-customRed mr-2 flex-shrink-0 group-hover/contact:scale-110 transition-transform duration-200" size="12px" />
            <div className="group-hover/contact:text-customRed transition-colors duration-200 break-all min-w-0 flex-1">
              <Text extrasmall color="black">
                {category.contact.email}
              </Text>
            </div>
          </div>
          <div 
            className="flex items-center cursor-pointer hover:bg-gray-50 p-1.5 rounded-md transition-all duration-200 group/contact"
            onClick={() => handlePhoneClick(category.contact.phone)}
          >
            <FaPhone className="text-customRed mr-2 flex-shrink-0 group-hover/contact:scale-110 transition-transform duration-200" size="12px" />
            <div className="group-hover/contact:text-customRed transition-colors duration-200">
              <Text extrasmall color="black">
                {category.contact.phone}
              </Text>
            </div>
          </div>
        </div>

        {/* 添加温馨提示 - 固定在底部 */}
        <div className="bg-gray-50 rounded-lg p-2.5 border border-gray-100 mt-auto">
          <div className="flex items-center justify-center">
            <FaInfoCircle className="text-blue-500 mr-1.5 flex-shrink-0" size="11px" />
            <Text extrasmall color="gray">
              点击可复制到剪贴板
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCategoryCard;
