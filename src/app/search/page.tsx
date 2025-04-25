"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import ArticlesPage from "~/components/pages/ArticlesPage";

const ArticleSearch = () => {
  const searchParams = useSearchParams();
  const searchKeyword = searchParams.get("keyword");

  return <ArticlesPage searchQuery={searchKeyword ?? ""} />;
};

export default function SearchPage() {
  return (
    <Suspense>
      <ArticleSearch />
    </Suspense>
  );
}
