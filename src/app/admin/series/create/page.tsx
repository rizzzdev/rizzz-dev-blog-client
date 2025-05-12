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
import { useRouter } from "next/navigation";
import { RequestSeriesType } from "~/types/seriesType";
import { useMutationSeries } from "~/stores/seriesStore";

const CreateSeriesPage = () => {
  const formData = useAtomValue(formDataAtom) as unknown as RequestSeriesType;
  const setFormData = useSetAtom(formDataAtom);

  // const authorData = useAtomValue(authorAtom);

  const validationSchema = Joi.object<RequestSeriesType>({
    seriesName: Joi.string().required(),
  });

  const authorQuery = useQueryAuthor();

  const seriesMutation = useMutationSeries({
    type: "create",
  });

  const router = useRouter();

  const setToast = useSetAtom(toastAtom);
  const handleShowToast = () => {
    const isError = !seriesMutation.isPending && seriesMutation.isError;
    setToast({
      isVisible: !seriesMutation.isPending ? true : false,
      message: isError
        ? `${seriesMutation.error.message}`
        : "Create Series Successfully",
      type: isError ? "failure" : "success",
    });
  };

  const handleSubmit = () => {
    seriesMutation.mutate({
      seriesName: formData.seriesName,
    });
    handleShowToast();

    if (!seriesMutation.isPending && seriesMutation.isSuccess) {
      setFormData(initialFormData);
    }

    router.push("/admin/series");
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
        <h1 className="text-xl md:text-2xl font-bold mb-4">Create Series</h1>
        <p className="w-full text-sm md:text-lg text-justify mb-16">
          Fill the form below to create new series!
        </p>
        <Form onSubmit={handleSubmit} validationSchema={validationSchema}>
          <Form.Input name="seriesName" text="Series Name" />
          <Form.Button text="SEND" />
        </Form>
        <Toast position="top-[28px] right-[28px]" />
      </AdminMain>
    </>
  );
};

export default CreateSeriesPage;
