import { MagnifyingGlass } from "@phosphor-icons/react";
import Logo from "../fragments/Logo";
import { useAtom } from "jotai";
import { formDataAtom, initialFormData } from "../ui/Form";
import { useRouter } from "next/navigation";

const Header = () => {
  const [formData, setFormData] = useAtom(formDataAtom);
  const router = useRouter();

  const handleSubmit = () => {
    router.push(`/search?keyword=${formData.search}`);
    setFormData(initialFormData);
  };
  return (
    <header className="w-full h-24 md:h-28 py-2 md:py-4 px-8 md:px-12 bg-primary flex justify-center items-center gap-4 fixed top-0 left-0 shadow-sm shadow-slate-700">
      <div className="w-fit md:w-1/6">
        <Logo />
      </div>
      <div className="flex-1 flex justify-end items-center">
        <form
          className="w-2/3 md:w-1/3 bg-background rounded-sm md:rounded-lg  flex justify-center items-center"
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit();
          }}
        >
          <input
            type="text"
            className="w-full h-10 p-3 md:p-4 outline-none text-primary text-sm md:text-md"
            placeholder="Search..."
            onChange={(event) => {
              setFormData((state) => ({
                ...state,
                search: event.target.value,
              }));
            }}
            value={formData.search ?? ""}
          />
          <MagnifyingGlass
            size={24}
            className="text-primary cursor-pointer md:hidden"
            weight="bold"
            onClick={handleSubmit}
          />
          <MagnifyingGlass
            size={28}
            className="text-primary cursor-pointer hidden md:block"
            weight="bold"
            onClick={handleSubmit}
          />
        </form>
      </div>
    </header>
  );
};

export default Header;
