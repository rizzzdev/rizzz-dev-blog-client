import Image from "next/image";
import Main from "../layout/Main";
import Header from "../layout/Header";

const Loading = () => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-background">
      <Image
        src={"/loading.gif"}
        width={1000}
        height={1000}
        className="w-1/6 aspect-square"
        alt="loading"
      />
    </div>
  );
};

export default Loading;
