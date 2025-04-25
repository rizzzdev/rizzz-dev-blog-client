"use client";

import AdminHeader from "~/components/layout/admin/AdminHeader";
import AdminMain from "~/components/layout/admin/AdminMain";
import LoginAdminPage from "~/components/layout/admin/LoginAdminPage";
import Loading from "~/components/ui/Loading";
import { useQueryAuthor } from "~/stores/authorStore";

const AdminHomePage = () => {
  const authorQuery = useQueryAuthor();

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
        <h1 className="text-xl md:text-2xl font-bold mb-4">Home Page</h1>
        <p className="w-full text-sm md:text-lg text-justify mb-16">
          This is home page!
        </p>
      </AdminMain>
    </>
  );
};

export default AdminHomePage;
