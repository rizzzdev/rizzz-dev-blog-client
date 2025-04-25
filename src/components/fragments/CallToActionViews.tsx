import { ChatCircleDots, Eye, Star } from "@phosphor-icons/react";
import { useAtom } from "jotai";
import { useSearchParams } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { reactionsAtom } from "~/stores/reactionsStore";
import { starsAtom } from "~/stores/starsStore";
import { ArticleTypeExtends } from "~/types/articleType";

interface CallToActionViewListProps {
  icon: ReactNode;
  counter: number;
  hoverTitle: string;
}

interface CallToActionViewProps {
  article: ArticleTypeExtends;
  align?: "start" | "center";
}

const CallToActionViewList = (props: CallToActionViewListProps) => {
  const { icon, counter, hoverTitle } = props;
  return (
    <div className="flex justify-center  items-center gap-1" title={hoverTitle}>
      {icon}
      <p className="text-xs md:text-sm font-semibold">{counter}</p>
    </div>
  );
};

const CallToActionViews = (props: CallToActionViewProps) => {
  const { align, article } = props;
  const [stars, setStars] = useAtom(starsAtom);
  const [reactions, setReactions] = useAtom(reactionsAtom);

  const idParams = useSearchParams();
  const id = idParams.get("id");

  useEffect(() => {
    setStars(article.stars!);
    setReactions(article.reactions!);
  }, [article, setStars, setReactions]);

  return (
    <div
      className={`w-full flex ${
        align && align !== "start"
          ? "justify-center"
          : "justify-center  md:justify-start"
      } items-center gap-8`}
    >
      <CallToActionViewList
        hoverTitle="Pageviews"
        icon={
          <>
            <Eye size={32} weight="fill" className="hidden md:block" />
            <Eye size={24} weight="fill" className="md:hidden" />
          </>
        }
        counter={article?.pageviews?.length ?? 0}
      />
      <CallToActionViewList
        hoverTitle="Stars"
        icon={
          <>
            <Star size={32} weight="fill" className="hidden md:block" />
            <Star size={24} weight="fill" className="md:hidden" />
          </>
        }
        counter={id ? stars?.length : article?.stars?.length ?? 0}
      />
      <CallToActionViewList
        hoverTitle="Reactions"
        icon={
          <>
            <ChatCircleDots
              size={32}
              weight="fill"
              className="hidden md:block"
            />
            <ChatCircleDots size={24} weight="fill" className="md:hidden" />
          </>
        }
        counter={id ? reactions?.length : article?.reactions?.length ?? 0}
      />
    </div>
  );
};

export default CallToActionViews;
