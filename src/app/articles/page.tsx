"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import ArticlePage from "~/components/pages/ArticlePage";
import ArticlesPage from "~/components/pages/ArticlesPage";

const ArticleWithId = () => {
  const idParams = useSearchParams();
  const id = idParams.get("id");

  if (!id) {
    return <ArticlesPage />;
  }

  return <ArticlePage articleId={id} />;
};

const Article = () => {
  return (
    <Suspense>
      <ArticleWithId />
    </Suspense>
  );
};

export default Article;
