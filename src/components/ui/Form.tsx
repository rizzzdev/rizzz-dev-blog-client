import Joi from "joi";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { FormEvent, ReactNode, useEffect } from "react";
import { toastAtom } from "./Toast";

interface InputProps {
  type?: string;
  name: string;
  text: string;
}

interface TextareaProps {
  name: string;
  text: string;
  minHeight?: number;
}

interface SelectProps {
  name: string;
  text: string;
  children: ReactNode;
}

interface OptionProps {
  text: string;
  value: string;
}

interface ButtonProps {
  text: string;
}

interface FormProps<T> {
  onSubmit: () => void;
  children: ReactNode;
  validationSchema?: Joi.ObjectSchema<T>;
}

export const initialFormData = {};

export const formDataAtom =
  atom<Record<string, string | null | undefined>>(initialFormData);

const Input = (props: InputProps) => {
  const { name, text, type } = props;
  const setFormData = useSetAtom(formDataAtom);
  const formData = useAtomValue(formDataAtom);

  return (
    <div className="w-full p-4 flex flex-col justify-center items-center gap-1 border-1 md:border-2 focus-within:border-2 md:focus-within:border-4 transition-all border-primary rounded-md text-sm md:text-lg">
      {formData[name] && (
        <label htmlFor={name} className="w-full text-primary font-bold">
          {text}
        </label>
      )}
      <input
        type={type ?? "text"}
        name={name}
        id={name}
        className="w-full  outline-none "
        placeholder={text}
        onChange={(event) => {
          setFormData((state) => ({ ...state, [name]: event.target.value }));
        }}
        value={formData[name] ?? ""}
      />
    </div>
  );
};

const Textarea = (props: TextareaProps) => {
  const { name, text, minHeight } = props;
  const setFormData = useSetAtom(formDataAtom);
  const formData = useAtomValue(formDataAtom);

  useEffect(() => {
    const textarea = document.getElementById(name);

    if (!textarea) {
      return;
    }

    const height = Number(textarea.style.height.split("px")[0]);
    const scrollHeight = textarea.scrollHeight;

    if (height < scrollHeight) {
      textarea!.style.height = scrollHeight + "px";
    }
  }, [formData, name]);

  return (
    <div className="w-full p-4 flex flex-col justify-center items-center gap-1 border-1 md:border-2 focus-within:border-2 md:focus-within:border-4 transition-all border-primary rounded-md text-sm md:text-lg">
      {formData[name] && (
        <label htmlFor={name} className="w-full text-primary font-bold">
          {text}
        </label>
      )}
      <textarea
        name={name}
        id={name}
        className="w-full  outline-none resize-none"
        style={{ minHeight: minHeight ?? 100 }}
        placeholder={text}
        onChange={(event) => {
          setFormData((state) => ({ ...state, [name]: event.target.value }));
        }}
        value={formData[name] ?? ""}
      />
    </div>
  );
};

const Select = (props: SelectProps) => {
  const { children, name, text } = props;

  const setFormData = useSetAtom(formDataAtom);
  const formData = useAtomValue(formDataAtom);

  return (
    <div className="w-full p-4 flex flex-col justify-center items-center gap-1 border-1 md:border-2 focus-within:border-2 md:focus-within:border-4 transition-all border-primary rounded-md text-sm md:text-lg">
      {formData[name] && (
        <label htmlFor={name} className="w-full text-primary font-bold">
          {text}
        </label>
      )}

      <select
        className={`w-full ${
          formData[name] ? "text-primary" : "text-[#a9a9a9]"
        } border-none appearance-none outline-none`}
        onChange={(event) => {
          setFormData((state) => ({ ...state, [name]: event.target.value }));
        }}
        value={formData[name] ?? ""}
      >
        <option value="" className="text-primary px-4">
          {text}
        </option>
        {children}
      </select>
    </div>
  );
};

const Option = (props: OptionProps) => {
  const { text, value } = props;

  return (
    <option value={value} className="text-primary px-4">
      {text}
    </option>
  );
};

const Button = (props: ButtonProps) => {
  const { text } = props;
  return (
    <button
      type="submit"
      className="w-full p-2 md:p-4 font-semibold bg-primary text-background rounded-md mt-8 cursor-pointer text-sm md:text-lg"
    >
      {text}
    </button>
  );
};

const Form = <T,>(props: FormProps<T>) => {
  const { onSubmit, children, validationSchema } = props;
  const formData = useAtomValue(formDataAtom) as unknown as T;
  const setFormData = useSetAtom(formDataAtom);
  const setToast = useSetAtom(toastAtom);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validationSchema) {
      onSubmit();
      return;
    }

    const { error } = validationSchema.validate(formData);
    if (error) {
      const message = error.details[0].message;
      setToast({
        isVisible: true,
        message,
        type: "failure",
      });
      return;
    }

    onSubmit();
    setFormData(initialFormData);
  };

  return (
    <form
      className="w-full flex flex-col justify-center items-center gap-2"
      onSubmit={handleSubmit}
    >
      {children}
    </form>
  );
};

Form.Input = Input;
Form.Textarea = Textarea;
Form.Select = Select;
Form.Option = Option;
Form.Button = Button;

export default Form;
