import Header from "../layout/Header";
import Main from "../layout/Main";
import ArticleCard from "../ui/ArticleCard";
import { useQueryUser } from "~/stores/userStore";
import { articlesAtom, useQueryArticles } from "~/stores/articlesStore";
import Loading from "../ui/Loading";
import NewUserPage from "./NewUserPage";
import { useAtomValue } from "jotai";

interface ArticlesPageProps {
  searchQuery?: string;
}

const ArticlesPage = (props: ArticlesPageProps) => {
  const { searchQuery } = props;

  const articles = useAtomValue(articlesAtom);

  const userQuery = useQueryUser();
  const articlesQuery = useQueryArticles(searchQuery);

  const handleSuccess = () => {
    setTimeout(() => {
      userQuery.refetch();
    }, 3000);
  };

  if (userQuery.isFetching || articlesQuery.isFetching) {
    return <Loading />;
  }

  if (userQuery.isError) {
    return <NewUserPage onSuccess={handleSuccess} />;
  }

  return (
    <>
      <Header />
      <Main>
        <h1 className="text-2xl md:text-5xl font-bold mb-4">Latest Articles</h1>
        {!articles[0] && <p>No articles available!</p>}
        {articles[0] &&
          articles
            .filter((article) => !article.deletedAt)
            .map((article) => {
              return <ArticleCard article={article} key={article.id} />;
            })}
      </Main>
    </>
  );
};

export default ArticlesPage;
