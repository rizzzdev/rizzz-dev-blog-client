import Markdown from "markdown-to-jsx";
import Header from "../layout/Header";
import Main from "../layout/Main";
import Image from "next/image";
// import CallToActions from "../fragments/CallToActions";
import { useQueryArticle } from "~/stores/articleStore";
import Loading from "../ui/Loading";
import NewUserPage from "./NewUserPage";
import { usePageviewMutation } from "~/stores/pageviewStore";
import { useEffect, useRef } from "react";
import { useQueryUser } from "~/stores/userStore";
import AuthorDetails from "../fragments/AuthorDetails";
import CallToActionViews from "../fragments/CallToActionViews";
import CallToActions from "../fragments/CallToActions";

interface ArticlePageProps {
  articleId: string;
  // onSuccess: () => void;
}

const ArticlePage = (props: ArticlePageProps) => {
  const { articleId } = props;

  const articleQuery = useQueryArticle(articleId!);
  const userQuery = useQueryUser();

  const pageviewMutation = usePageviewMutation(articleQuery.refetch);
  const isPageviewFetched = useRef(false);

  useEffect(() => {
    const isReady =
      !articleQuery.isFetching &&
      articleQuery.isSuccess &&
      !userQuery.isFetching &&
      userQuery.isSuccess &&
      !isPageviewFetched.current;
    if (isReady) {
      isPageviewFetched.current = true;

      pageviewMutation.mutate({
        userId: userQuery.data.id!,
        articleId: articleQuery.data.id!,
      });
    }
  }, [pageviewMutation, articleQuery, userQuery, isPageviewFetched]);

  const handleSuccess = () => {
    setTimeout(() => {
      userQuery.refetch();
    }, 3000);
  };

  if (
    articleQuery.isFetching ||
    pageviewMutation.isPending ||
    userQuery.isFetching
  ) {
    return <Loading />;
  }

  if (userQuery.isError) {
    return <NewUserPage onSuccess={handleSuccess} />;
  }

  return (
    <>
      <Header />
      <Main>
        <div className="w-full md:w-4/5 h-full mx-auto">
          <h1 className="w-full text-justify text-4xl md:text-5xl font-extrabold">
            {articleQuery.data.title ?? ""}
          </h1>
          <AuthorDetails
            authorName={articleQuery.data?.author?.fullName ?? ""}
            createdAt={articleQuery.data.createdAt!}
            seriesName={articleQuery.data.series?.seriesName}
          />
          <CallToActionViews align="center" article={articleQuery.data} />
          <div className="w-full h-1 bg-primary my-8"></div>
          <div
            className="w-full flex flex-col justify-center items-center"
            id="post"
          >
            {articleQuery.data.imageUrl && (
              <Image
                alt="post-image"
                src={articleQuery.data.imageUrl}
                className="w-full object-cover mb-10"
                width={1000}
                height={1000}
              />
            )}

            <Markdown className="w-full">
              {articleQuery.data.articleMarkdown}
            </Markdown>
          </div>
          <div className="w-full h-1 bg-primary my-8"></div>
          <CallToActions />
        </div>
      </Main>
    </>
  );
};

export default ArticlePage;
