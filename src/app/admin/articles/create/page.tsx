"use client";

import Joi from "joi";
import { useAtomValue, useSetAtom } from "jotai";
import AdminHeader from "~/components/layout/admin/AdminHeader";
import AdminMain from "~/components/layout/admin/AdminMain";
import LoginAdminPage from "~/components/layout/admin/LoginAdminPage";
import Form, { formDataAtom, initialFormData } from "~/components/ui/Form";
import Loading from "~/components/ui/Loading";
import Toast, { toastAtom } from "~/components/ui/Toast";
import { useQueryAuthor } from "~/stores/authorStore";
import { RequestArticleType } from "../../../../types/articleType";
import { useMutationArticles } from "~/stores/articlesStore";

const CreateArticlesPage = () => {
  const formData = useAtomValue(formDataAtom) as unknown as RequestArticleType;
  const setFormData = useSetAtom(formDataAtom);

  // const authorData = useAtomValue(authorAtom);

  const validationSchema = Joi.object<RequestArticleType>({
    title: Joi.string().required(),
    description: Joi.string().required(),
    articleMarkdown: Joi.string().required(),
    imageUrl: Joi.string().optional(),
  });

  const authorQuery = useQueryAuthor();

  const articleMutation = useMutationArticles({ onSuccess: () => {} });

  const setToast = useSetAtom(toastAtom);
  const handleShowToast = () => {
    const isError = !articleMutation.isPending && articleMutation.isError;
    setToast({
      isVisible: !articleMutation.isPending ? true : false,
      message: isError
        ? `${articleMutation.error.message}`
        : "Create Article Successfully",
      type: isError ? "failure" : "success",
    });
  };

  const handleSubmit = () => {
    articleMutation.mutate({
      title: formData.title,
      description: formData.description,
      articleMarkdown: formData.articleMarkdown,
      imageUrl: formData.imageUrl,
      authorId: authorQuery.data.id!,
    });
    handleShowToast();

    if (!articleMutation.isPending && articleMutation.isSuccess) {
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
        <h1 className="text-xl md:text-2xl font-bold mb-4">Create Article</h1>
        <p className="w-full text-sm md:text-lg text-justify mb-16">
          Fill the form below to create new article!
        </p>
        <Form onSubmit={handleSubmit} validationSchema={validationSchema}>
          <Form.Input name="title" text="Title" />
          <Form.Input name="imageUrl" text="Image URL" />
          <Form.Textarea name="description" text="Description" />
          <Form.Textarea
            name="articleMarkdown"
            text="Article Markdown"
            minHeight={320}
          />
          <Form.Button text="SEND" />
        </Form>
        <Toast position="top-[28px] right-[28px]" />
      </AdminMain>
    </>
  );
};

export default CreateArticlesPage;
