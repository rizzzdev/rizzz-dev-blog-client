import Header from "../layout/Header";
import Main from "../layout/Main";
import { useMutationUser } from "~/stores/userStore";
import { useAtomValue, useSetAtom } from "jotai";
import Form, { formDataAtom, initialFormData } from "../ui/Form";
import { RequestUserType } from "~/types/userType";
import Joi from "joi";
import Toast, { toastAtom } from "../ui/Toast";
import { useEffect } from "react";

interface NewUserPageProps {
  onSuccess: () => void;
}

const NewUserPage = (props: NewUserPageProps) => {
  const { onSuccess } = props;

  const userMutation = useMutationUser(onSuccess);
  const setToast = useSetAtom(toastAtom);

  const formData = useAtomValue(formDataAtom) as unknown as RequestUserType;
  const setFormData = useSetAtom(formDataAtom);
  const validationSchema = Joi.object<RequestUserType>({
    fullName: Joi.string().trim().min(6).required().messages({
      "string.empty": "Full Name tidak boleh kosong",
      "string.min": "Full Name minimal 1 karakter",
      "any.required": "Full Name wajib diisi",
    }),
  });

  useEffect(() => {
    const success =
      !userMutation.isPending &&
      userMutation.isSuccess &&
      !userMutation.isError &&
      !userMutation.error;

    if (success) {
      setToast({
        isVisible: true,
        message: `Welcome to Rizzz.Dev Blog, ${formData.fullName}`,
        type: "success",
      });

      setFormData(initialFormData);
      return;
    }

    if (userMutation.error?.message) {
      setToast({
        isVisible: true,
        message: userMutation.error!.message,
        type: "failure",
      });
    }
  }, [formData, userMutation, setToast, setFormData]);

  const handleSubmit = () => {
    userMutation.mutate(formData);
  };

  return (
    <>
      <Header />
      <Main className="flex justify-center items-center flex-col">
        <h1 className="w-full text-xl md:text-3xl font-bold mb-4">
          Welcome, New User!
        </h1>
        <p className="w-full text-sm md:text-lg text-justify mb-16 flex flex-col gap-1">
          Welcome to the Rizzz.Dev Blog — a dedicated platform established to
          transform thoughts into written form, functioning as a medium of
          documentation for the author and intended to provide valuable insights
          and perspectives for its readers.
          <span className="font-semibold">
            Please enter your full name to continue accessing the Rizzz.Dev
            Blog. Thank you.
          </span>
        </p>
        <Form onSubmit={handleSubmit} validationSchema={validationSchema}>
          <Form.Input name="fullName" text="Full Name" />
          <Form.Button text="SUBMIT" />
        </Form>
        <Toast />
      </Main>
    </>
  );
};

export default NewUserPage;
