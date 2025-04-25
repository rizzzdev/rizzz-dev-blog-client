import Link from "next/link";

interface LogoProps {
  className?: string;
  reverseColor?: boolean;
}

const Logo = (props: LogoProps) => {
  const { className, reverseColor } = props;
  return (
    <Link
      className={`w-fit md:w-full flex flex-col justify-center items-center ${
        reverseColor ? "text-primary" : "text-background"
      } gap-1 ${className}`}
      href="/"
    >
      <h3 className="w-full text-2xl md:text-4xl font-bold text-center pt-4">
        <span
          className={`${
            reverseColor
              ? "bg-primary text-background"
              : "bg-background text-primary"
          } p-[1px] `}
        >
          Rizzz.
        </span>
        Dev
      </h3>
      <p className="w-full p-[1px] text-sm md:text-md text-center font-bold">
        blog
      </p>
    </Link>
  );
};

export default Logo;
