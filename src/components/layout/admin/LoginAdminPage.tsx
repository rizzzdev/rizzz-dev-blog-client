import Joi from "joi";
import { useAtomValue, useSetAtom } from "jotai";
import Logo from "~/components/fragments/Logo";
import Form, { formDataAtom } from "~/components/ui/Form";
import Toast, { toastAtom } from "~/components/ui/Toast";
import { usePostSession } from "~/stores/sessionStore";
import { RequestSessionType } from "~/types/sessionType";

interface LoginAdminPageProps {
  onSuccess: () => void;
}

const LoginAdminPage = (props: LoginAdminPageProps) => {
  const { onSuccess } = props;
  const sessionMutation = usePostSession({ onSuccess });

  const formData = useAtomValue(formDataAtom) as unknown as RequestSessionType;
  const validationSchema = Joi.object<RequestSessionType>({
    authorId: Joi.string().required(),
    password: Joi.string().required(),
  });

  const setToast = useSetAtom(toastAtom);
  const handleShowToast = () => {
    const isError = !sessionMutation.isPending && sessionMutation.isError;
    setToast({
      isVisible: !sessionMutation.isPending ? true : false,
      message: isError ? `${sessionMutation.error.message}` : "Login success.",
      type: isError ? "failure" : "success",
    });
  };

  const handleSubmit = () => {
    sessionMutation.mutate(formData);
    handleShowToast();
  };

  return (
    <main className="w-full min-h-screen flex justify-center items-center">
      <div className="w-2/3 border-4 border-primary p-8 flex flex-col justify-center items-center rounded-xl text-primary">
        <Logo reverseColor className="mb-8" />
        <h1 className="w-full text-xl md:text-2xl font-bold mb-2">
          Login Author
        </h1>
        <p className="w-full text-sm md:text-lg text-justify mb-16">
          Fill the form below to Login Author!
        </p>
        <Form onSubmit={handleSubmit} validationSchema={validationSchema}>
          <Form.Input name="authorId" text="Author ID" />
          <Form.Input name="password" text="Password" />
          <Form.Button text="Login" />
          <Toast />
        </Form>
      </div>
    </main>
  );
};

export default LoginAdminPage;
