"use client";

import { useSearchParams } from "next/navigation";
import ArticlesPage from "~/components/pages/ArticlesPage";

export default function Search() {
  const searchParams = useSearchParams();
  const searchKeyword = searchParams.get("keyword");

  return <ArticlesPage searchQuery={searchKeyword ?? ""} />;
}
