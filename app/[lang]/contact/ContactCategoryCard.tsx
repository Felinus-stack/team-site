"use client";

import Text from "@/app/components/Text";
import { FaEnvelope, FaPhone, FaUser } from "react-icons/fa";
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
    expertise: string[];
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
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-300 group">
      {/* 类别标题部分 */}
      <div className="flex items-start mb-4">
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
      <div className="border-t border-gray-200 pt-3">
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
        <div className="space-y-2 mb-3">
          <div 
            className="flex items-center cursor-pointer hover:bg-gray-50 p-1.5 rounded-md transition-all duration-200 group/contact"
            onClick={() => handleEmailClick(category.contact.email)}
          >
            <FaEnvelope className="text-customRed mr-2 flex-shrink-0 group-hover/contact:scale-110 transition-transform duration-200" size="12px" />
            <div className="group-hover/contact:text-customRed transition-colors duration-200 truncate">
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

        {/* 专业领域 */}
        <div>
          <div className="mb-2">
            <Text extrasmall bold color="black">
              专业领域：
            </Text>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {category.contact.expertise.map((skill, index) => {
              // 为每个技能标签分配不同的颜色
              const colors = [
                'bg-blue-100 text-blue-700 hover:bg-blue-500 hover:text-white',
                'bg-green-100 text-green-700 hover:bg-green-500 hover:text-white',
                'bg-purple-100 text-purple-700 hover:bg-purple-500 hover:text-white',
                'bg-orange-100 text-orange-700 hover:bg-orange-500 hover:text-white',
                'bg-pink-100 text-pink-700 hover:bg-pink-500 hover:text-white',
                'bg-indigo-100 text-indigo-700 hover:bg-indigo-500 hover:text-white'
              ];
              const colorClass = colors[index % colors.length];
              
              return (
                <span 
                  key={index}
                  className={`${colorClass} px-2 py-0.5 rounded-full text-xs font-medium transition-all duration-300 cursor-default shadow-sm hover:shadow-md`}
                >
                  {skill}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCategoryCard;
