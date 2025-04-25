"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import ArticlePage from "~/components/pages/ArticlePage";
import ArticlesPage from "~/components/pages/ArticlesPage";

const Article = () => {
  const idParams = useSearchParams();
  const id = idParams.get("id");

  if (!id) {
    return <ArticlesPage />;
  }

  return (
    <Suspense>
      <ArticlePage articleId={id} />;
    </Suspense>
  );
};

export default Article;
