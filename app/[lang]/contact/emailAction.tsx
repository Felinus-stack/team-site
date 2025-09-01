"use client";

import Text from "@/app/components/Text";
import toast from "react-hot-toast";
import { FaEnvelope, FaArrowRight } from "react-icons/fa";
import { useHandleNavigation } from "@/app/components/NavigationHandler";

interface EmailActionProps {
  email: string;
}

const EmailAction: React.FC<EmailActionProps> = ({ email }) => {
  const handleMail = () => {
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
          toast.success(`E-mail skopiowany do schowka! ${email}`);
        })
        .catch((err) => {
          toast.error("Nie udało się skopiować maila.");
        });
    }
  };

  return (
    <span
      onClick={handleMail}
      className="group flex items-center pl-1 text-customRed tracking-tighter cursor-pointer"
    >
      <FaEnvelope className="mr-2" size="18px" />
      <Text color="black" hoverColor="red">
        {email}
      </Text>
    </span>
  );
};

interface AdmingProps {
  text: string;
}
const Admin: React.FC<AdmingProps> = ({ text }) => {
  const handleNavigation = useHandleNavigation("/admin");

  return (
    <div 
      onClick={handleNavigation} 
      className="cursor-pointer inline-flex items-center gap-2 group"
    >
      <div className="relative">
        <Text bold medium color="black" hoverColor="red">
          {text}
        </Text>
        <div className="absolute left-0 bottom-0 w-0 h-0.5 bg-customRed group-hover:w-full transition-all duration-300 ease-in-out"></div>
      </div>
      <FaArrowRight 
        className="text-black group-hover:text-customRed transition-all duration-300 group-hover:translate-x-1 group-hover:animate-none" 
        style={{
          animation: "wiggle 2s ease-in-out infinite"
        }}
        size={16} 
      />
      <style jsx>{`
        @keyframes wiggle {
          0%, 100% { transform: translateX(0px); }
          25% { transform: translateX(-2px); }
          75% { transform: translateX(2px); }
        }
      `}</style>
    </div>
  );
};

export { EmailAction, Admin };
