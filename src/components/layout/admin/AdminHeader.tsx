import { Book, FolderOpen, House, User, Users } from "@phosphor-icons/react";
import Link from "next/link";
import { ReactNode } from "react";
import Logo from "~/components/fragments/Logo";

interface MenuListProps {
  icon: ReactNode;
  text: string;
  link: string;
}
const MenuList = (props: MenuListProps) => {
  const { icon, link, text } = props;
  return (
    <Link
      href={link}
      className="w-full p-2 flex justify-start items-center gap-2 bg-background text-primary rounded-md"
    >
      {icon}
      {text}
    </Link>
  );
};

const Menu = () => {
  return (
    <nav className="w-full flex flex-col justify-center items-center gap-2">
      <MenuList
        icon={<House size={24} weight="fill" />}
        text="Home"
        link={"/admin"}
      />
      <MenuList
        icon={<Users size={24} weight="fill" />}
        text="Users"
        link={"/admin/users"}
      />
      <MenuList
        icon={<User size={24} weight="fill" />}
        text="Authors"
        link={"/admin/authors"}
      />
      <MenuList
        icon={<Book size={24} weight="fill" />}
        text="Articles"
        link={"/admin/articles"}
      />
      <MenuList
        icon={<FolderOpen size={24} weight="fill" />}
        text="Series"
        link={"/admin/series"}
      />
    </nav>
  );
};

const AdminHeader = () => {
  return (
    <header className="w-60 h-screen bg-primary p-4 fixed top-0 left-0 z-[99]">
      <Logo className="pt-4 pb-8" />
      <Menu />
    </header>
  );
};

export default AdminHeader;
