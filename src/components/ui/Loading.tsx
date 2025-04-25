import Image from "next/image";

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
