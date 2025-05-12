import Image from "next/image";
import Link from "next/link";
import AuthorDetails from "../fragments/AuthorDetails";
import CallToActionViews from "../fragments/CallToActionViews";
import { ArticleTypeExtends } from "~/types/articleType";

interface ArticleCardProps {
  article: ArticleTypeExtends;
}

const ArticleCard = (props: ArticleCardProps) => {
  const { title, author, description, createdAt, id, imageUrl, series } =
    props.article;
  return (
    <Link
      href={`/articles?id=${id}`}
      className="w-full h-fit flex justify-center items-center border-2 border-primary p-8 rounded-lg gap-8 mb-4 cursor-pointer"
    >
      <div className="flex-1 flex h-full flex-col justify-center items-center">
        <h3 className="w-full text-xl md:text-3xl font-bold text-justify mb-1">
          {title}
        </h3>
        <AuthorDetails
          authorName={author?.fullName ?? ""}
          createdAt={createdAt!}
          seriesName={
            series?.seriesName && !series?.deletedAt ? series.seriesName : "-"
          }
        />
        <p className="w-full text-sm md:text-lg text-justify mt-4 mb-8">
          {description}
        </p>
        <CallToActionViews article={props.article} />
      </div>
      {imageUrl && (
        <Image
          alt="articles-image"
          src={imageUrl}
          className="w-1/4 object-cover hidden md:block"
          width={1000}
          height={1000}
        />
      )}
    </Link>
  );
};

export default ArticleCard;
