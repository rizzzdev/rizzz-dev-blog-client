"use client";

import Joi from "joi";
import { useAtomValue, useSetAtom } from "jotai";
import AdminHeader from "~/components/layout/admin/AdminHeader";
import AdminMain from "~/components/layout/admin/AdminMain";
import LoginAdminPage from "~/components/layout/admin/LoginAdminPage";
import Form, { formDataAtom, initialFormData } from "~/components/ui/Form";
import Loading from "~/components/ui/Loading";
import Toast, { toastAtom } from "~/components/ui/Toast";
import { usePostAuthor, useQueryAuthor } from "~/stores/authorStore";
import { RequestAuthorType } from "~/types/authorType";

const CreateAuthorPage = () => {
  const formData = useAtomValue(formDataAtom) as unknown as RequestAuthorType;
  const setFormData = useSetAtom(formDataAtom);

  const validationSchema = Joi.object<RequestAuthorType>({
    fullName: Joi.string()
      .trim()
      .min(6)
      .pattern(/^[A-Za-z ]+$/)
      .required()
      .messages({
        "any.required": "Full Name wajib diisi!",
        "string.trim": "Full Name tidak boleh kosong!",
        "string.empty": "Full Name tidak boleh kosong!",
        "string.min": "Full Name minimal 6 karakter!",
        "string.pattern.base":
          "Full Name hanya boleh menggunakan huruf dan spasi!",
      }),
    authorId: Joi.string().trim().min(8).alphanum().required().messages({
      "any.required": "Author ID wajib diisi!",
      "string.trim": "Author ID tidak boleh kosong!",
      "string.empty": "Author ID tidak boleh kosong!",
      "string.alphanum": "Author ID hanya boleh mengandung angka dan huruf!",
      "string.min": "Author ID minimal 8 karakter!",
    }),
    password: Joi.string().min(8).alphanum().required().messages({
      "any.required": "Password wajib diisi!",
      "string.trim": "Password tidak boleh kosong!",
      "string.empty": "Password tidak boleh kosong!",
      "string.alphanum": "Password hanya boleh mengandung angka dan huruf!",
      "string.min": "Password minimal 8 karakter!",
    }),
  });

  const authorQuery = useQueryAuthor();

  const authorPostMutation = usePostAuthor({
    onSuccess: () => {},
  });

  const setToast = useSetAtom(toastAtom);
  const handleShowToast = () => {
    const isError = !authorPostMutation.isPending && authorPostMutation.isError;
    setToast({
      isVisible: !authorPostMutation.isPending ? true : false,
      message: isError
        ? `${authorPostMutation.error.message}`
        : "Create Author Successfully",
      type: isError ? "failure" : "success",
    });
  };

  const handleSubmit = () => {
    authorPostMutation.mutate({
      authorId: formData.authorId,
      fullName: formData.fullName,
      password: formData.password,
    });
    console.log(authorPostMutation.error);
    handleShowToast();

    if (!authorPostMutation.isPending && authorPostMutation.isSuccess) {
      setFormData(initialFormData);
    }
  };

  if (authorQuery.isFetching) {
    return <Loading />;
  }

  if (authorQuery.isError) {
    return <LoginAdminPage onSuccess={authorQuery.refetch} />;
  }

  return (
    <>
      <AdminHeader />
      <AdminMain className="flex flex-col justify-center items-start">
        <h1 className="text-xl md:text-2xl font-bold mb-4">Create Author</h1>
        <p className="w-full text-sm md:text-lg text-justify mb-16">
          Fill the form below to create new Author!
        </p>
        <Form onSubmit={handleSubmit} validationSchema={validationSchema}>
          <Form.Input name="fullName" text="Full Name" />
          <Form.Input name="authorId" text="Author ID" />
          <Form.Input name="password" text="Password" />
          <Form.Button text="Kirim" />
        </Form>
        <Toast position="top-[28px] right-[28px]" />
      </AdminMain>
    </>
  );
};

export default CreateAuthorPage;
