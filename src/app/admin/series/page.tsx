"use client";

import Link from "next/link";
import AdminHeader from "~/components/layout/admin/AdminHeader";
import AdminMain from "~/components/layout/admin/AdminMain";
import LoginAdminPage from "~/components/layout/admin/LoginAdminPage";
import Loading from "~/components/ui/Loading";
import { useQueryAuthor } from "~/stores/authorStore";
import { useMutationSeries, useQuerySeries } from "~/stores/seriesStore";
// import { ArticleTypeExtends } from "~/types/articleType";

// interface ArticlesTableProps {
//   articles: ArticleTypeExtends[];
// }

const LinkHref = ({
  href,
  text,
  onClick,
}: {
  href: string;
  text: string;
  onClick?: () => void;
}) => {
  return (
    <Link
      href={href}
      className="w-full p-1 bg-primary text-background rounded-md hover:font-bold text-center"
      onClick={onClick}
    >
      {text}
    </Link>
  );
};

const CreateSeries = () => {
  return (
    <div className="w-full flex justify-end items-center mb-4">
      <div className="w-1/4 flex justify-end text-lg">
        <LinkHref href="/admin/series/create" text="Create Series" />
      </div>
    </div>
  );
};

const SeriesTable = () => {
  const seriesQuery = useQuerySeries();
  const seriesMutation = useMutationSeries({
    type: "delete",
    onSuccess: seriesQuery.refetch,
  });

  const handleDelete = (id: string) => {
    seriesMutation.mutate({
      id,
    });
  };

  return (
    <table className="w-full table-auto">
      <thead className="w-full">
        <tr className="w-full border-y-2 border-primary">
          <th className="w-[5%] p-8 text-center">No.</th>
          <th className="w-[65%] p-8 text-center">Series Name</th>
          <th className="w-[30%] p-8 text-center">Options</th>
        </tr>
      </thead>
      <tbody className="w-full">
        {seriesQuery.data
          ?.filter((series) => !series.deletedAt)
          ?.map((series, index) => {
            return (
              <tr
                className="w-full border-y-2 border-primary text-sm"
                key={series.id}
              >
                <td className="w-[5%] p-2 text-center">{index + 1}</td>
                <td className="w-[65%] p-2 text-justify">
                  {series.seriesName}
                </td>
                <td className="w-[30%] p-2 text-center">
                  <div className="w-full flex flex-col justify-center items-center gap-1">
                    <LinkHref
                      href={`/admin/series/update?id=${series.id}`}
                      text="Update Series"
                    />
                    <LinkHref
                      href={``}
                      onClick={() => handleDelete(series.id!)}
                      text="Delete Series"
                    />
                  </div>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

const AdminSeriesPage = () => {
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
        <h1 className="text-xl md:text-2xl font-bold mb-4">Series Page</h1>
        <p className="w-full text-sm md:text-lg text-justify mb-16">
          This is series page!
        </p>
        <CreateSeries />
        <SeriesTable />
      </AdminMain>
    </>
  );
};

export default AdminSeriesPage;
