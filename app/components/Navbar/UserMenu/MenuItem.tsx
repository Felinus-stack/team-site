'use client';

interface MenuItemProps {
  onClick: () => void;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
  onClick,
  label
}) => {
  return (
    <div
      onClick={onClick}
      className="px-4
        py-3
        transition
        duration-300
        hover:text-white
      hover:border-customRed
      hover:bg-customRed
        font-semibold
    ">
      {label}
    </div>
  )
}

export default MenuItem;