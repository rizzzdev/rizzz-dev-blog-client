import { ReactNode } from "react";

interface MainProps {
  children: ReactNode;
  className?: string;
}

const Main = (props: MainProps) => {
  const { children, className } = props;
  return (
    <main
      className={`w-full min-h-screen pt-28 md:pt-36 px-4 md:px-8 pb-4 md:pb-8 bg-background text-primary ${className}`}
    >
      {children}
    </main>
  );
};

export default Main;
