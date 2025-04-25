import { ReactNode } from "react";

interface AdminMainProps {
  children: ReactNode;
  className?: string;
}

const AdminMain = (props: AdminMainProps) => {
  const { children, className } = props;
  return (
    <main
      className={`w-full min-h-screen py-12 pl-72 pr-12 bg-background text-primary relative ${className}`}
    >
      {children}
    </main>
  );
};

export default AdminMain;
