"use client";

import { useSearchParams } from "next/navigation";
import ArticlePage from "~/components/pages/ArticlePage";
import ArticlesPage from "~/components/pages/ArticlesPage";

const Article = () => {
  const idParams = useSearchParams();
  const id = idParams.get("id");

  if (!id) {
    return <ArticlesPage />;
  }

  return <ArticlePage articleId={id} />;
};

export default Article;
