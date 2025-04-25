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

interface ButtonProps {
  text: string;
}

interface FormProps<T> {
  onSubmit: () => void;
  children: ReactNode;
  validationSchema?: Joi.ObjectSchema<T>;
}

export const initialFormData = {};

export const formDataAtom = atom<Record<string, string>>(initialFormData);

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
Form.Button = Button;

export default Form;
