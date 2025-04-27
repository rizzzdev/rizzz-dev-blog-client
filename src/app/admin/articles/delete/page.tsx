"use client";

import { useSetAtom } from "jotai";
import LoginAdminPage from "~/components/layout/admin/LoginAdminPage";
import Loading from "~/components/ui/Loading";
import Toast, { toastAtom } from "~/components/ui/Toast";
import { useQueryAuthor } from "~/stores/authorStore";
import { useMutationArticle } from "~/stores/articlesStore";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";
import { useQueryArticle } from "~/stores/articleStore";

const DeleteArticle = () => {
  const router = useRouter();
  const idParams = useSearchParams();
  const id = idParams.get("id");
  const isPushRef = useRef(false);

  useEffect(() => {
    if (!id && !isPushRef.current) {
      isPushRef.current = true;
      router.push("/admin/articles");
    }
  }, [id, router]);

  const authorQuery = useQueryAuthor();
  const articleQuery = useQueryArticle(id!);

  const articleMutation = useMutationArticle({
    type: "delete",
  });

  const setToast = useSetAtom(toastAtom);

  const isMutatedRef = useRef(false);

  useEffect(() => {
    const handleShowToast = () => {
      const isError = !articleMutation.isPending && articleMutation.isError;
      setToast({
        isVisible: !articleMutation.isPending ? true : false,
        message: isError
          ? `${articleMutation.error.message}`
          : "Delete Article Successfully",
        type: isError ? "failure" : "success",
      });
    };

    articleMutation.mutate({
      id: articleQuery.data.id!,
    });

    // if (
    //   !articleMutation.isPending &&
    //   articleMutation.isSuccess &&
    //   !isMutatedRef.current
    // ) {
    isMutatedRef.current = true;
    handleShowToast();
    console.log("dihapus");

    router.push("/admin/articles");
    // }
  }, [articleMutation, articleQuery, router, setToast]);

  if (authorQuery.isFetching) {
    return <Loading />;
  }

  if (authorQuery.isError) {
    return <LoginAdminPage onSuccess={authorQuery.refetch} />;
  }

  return (
    <>
      <Toast />
    </>
  );
};

const DeleteArticlePage = () => {
  return (
    <Suspense>
      <DeleteArticle />
    </Suspense>
  );
};

export default DeleteArticlePage;
