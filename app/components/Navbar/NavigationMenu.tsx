"use client";

import NavItem from "./NavItem";

interface NavigationMenuProps {
  dict: {
    home: string;
    bolid: string;
    team: string;
    about: string;
    partners: string;
    news: string;
    contact: string;
  };
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ dict }) => {
  return (
    <nav className="nav-responsive ml-16">
      <ul className="flex space-x-4 h-full">
        <NavItem to="/">{dict.home}</NavItem>
        <NavItem to="/bolid/RT14e">{dict.bolid}</NavItem>
        <NavItem to="/team/RT14e">{dict.team}</NavItem>
        <NavItem to="/about">{dict.about}</NavItem>
        <NavItem to="/partners">{dict.partners}</NavItem>
        <NavItem to="/news">{dict.news}</NavItem>
        <NavItem to="/contact">{dict.contact}</NavItem>
      </ul>
    </nav>
  );
};

export default NavigationMenu;
