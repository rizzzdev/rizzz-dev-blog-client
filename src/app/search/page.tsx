"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import ArticlesPage from "~/components/pages/ArticlesPage";

export default function Search() {
  const searchParams = useSearchParams();
  const searchKeyword = searchParams.get("keyword");

  return (
    <Suspense>
      <ArticlesPage searchQuery={searchKeyword ?? ""} />;
    </Suspense>
  );
}
