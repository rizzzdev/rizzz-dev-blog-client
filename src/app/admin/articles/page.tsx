"use client";

import Link from "next/link";
import AdminHeader from "~/components/layout/admin/AdminHeader";
import AdminMain from "~/components/layout/admin/AdminMain";
import LoginAdminPage from "~/components/layout/admin/LoginAdminPage";
import Loading from "~/components/ui/Loading";
import { useMutationArticle, useQueryArticles } from "~/stores/articlesStore";
import { useQueryAuthor } from "~/stores/authorStore";
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

const CreateArticle = () => {
  return (
    <div className="w-full flex justify-end items-center mb-4">
      <div className="w-1/4 flex justify-end text-lg">
        <LinkHref href="/admin/articles/create" text="Create Article" />
      </div>
    </div>
  );
};

const ArticlesTable = () => {
  const articlesQuery = useQueryArticles();
  const articleMutation = useMutationArticle({
    type: "delete",
    onSuccess: articlesQuery.refetch,
  });

  const handleDelete = (id: string) => {
    articleMutation.mutate({
      id,
    });
  };

  return (
    <table className="w-full table-auto">
      <thead className="w-full">
        <tr className="w-full border-y-2 border-primary">
          <th className="w-[5%] p-8 text-center">No.</th>
          <th className="w-[25%] p-8 text-center">Title</th>
          <th className="w-[35%] p-8 text-center">Description</th>
          <th className="w-[15%] p-8 text-center">Link</th>
          <th className="w-[20%] p-8 text-center">Options</th>
        </tr>
      </thead>
      <tbody className="w-full">
        {articlesQuery.data
          ?.filter((article) => !article.deletedAt)
          ?.map((article, index) => {
            return (
              <tr
                className="w-full border-y-2 border-primary text-sm"
                key={article.id}
              >
                <td className="w-[5%] p-2 text-center">{index + 1}</td>
                <td className="w-[25%] p-2 text-justify">{article.title}</td>
                <td className="w-[40%] p-2 text-justify">
                  {article.description}
                </td>
                <td className="w-[10%] p-2 text-center">
                  <LinkHref
                    href={`/articles?id=${article.id}`}
                    text="Click Here!"
                  />
                </td>
                <td className="w-[20%] p-2 text-center">
                  <div className="w-full flex flex-col justify-center items-center gap-1">
                    <LinkHref
                      href={`/admin/articles/update?id=${article.id}`}
                      text="Update Article"
                    />
                    <LinkHref
                      href={``}
                      onClick={() => handleDelete(article.id!)}
                      text="Delete Article"
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

const AdminArticlesPage = () => {
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
        <h1 className="text-xl md:text-2xl font-bold mb-4">Posts Page</h1>
        <p className="w-full text-sm md:text-lg text-justify mb-16">
          This is posts page!
        </p>
        <CreateArticle />
        <ArticlesTable />
      </AdminMain>
    </>
  );
};

export default AdminArticlesPage;
