import { ChatCircleDots, Star } from "@phosphor-icons/react";
import { useAtomValue, useSetAtom } from "jotai";
import { ReactNode, useEffect } from "react";
import { starsAtom, useMutationStars } from "~/stores/starsStore";
import Form, { formDataAtom, initialFormData } from "../ui/Form";
import { articleAtom } from "~/stores/articleStore";
import { reactionsAtom, useMutationReactions } from "~/stores/reactionsStore";
import { userAtom } from "~/stores/userStore";
import { RequestReactionType } from "~/types/reactionType";
import Joi from "joi";
import Toast, { toastAtom } from "../ui/Toast";
import CallToActionViews from "./CallToActionViews";
import { dateParser, timeParser } from "~/libs/datetimeParser";

interface CallToActionListProps {
  icon: ReactNode;
  onClick: () => void;
  text: string;
}

const ActionList = (props: CallToActionListProps) => {
  const { icon, text, onClick } = props;
  return (
    <div
      className="w-full flex justify-center items-center gap-2 md:gap-4 text-background bg-primary p-2 md:p-4 hover:font-bold cursor-pointer rounded-lg"
      onClick={onClick}
    >
      {icon}
      <p className="text-xs md:text-lg">{text}</p>
    </div>
  );
};

const Actions = () => {
  const article = useAtomValue(articleAtom);
  const user = useAtomValue(userAtom);
  const formData = useAtomValue(formDataAtom) as unknown as RequestReactionType;
  const setFormData = useSetAtom(formDataAtom);
  const setStars = useSetAtom(starsAtom);
  const setReactions = useSetAtom(reactionsAtom);
  const setToast = useSetAtom(toastAtom);

  const starsMutation = useMutationStars();
  const reactionsMutation = useMutationReactions();

  const validationSchema = Joi.object<RequestReactionType>({
    reactionText: Joi.string().trim().min(2).empty(" ").required(),
  });

  console.log(formData);
  console.log(reactionsMutation);

  useEffect(() => {
    setStars(article.stars!);
    setReactions(article.reactions!);
  }, [article, setStars, setReactions]);

  // useEffect(() => {
  //   if (!starsMutation.isPending && starsMutation.isSuccess) {
  //     setStars((state) => [...state, starsMutation.data]);
  //   }
  // }, [setStars, starsMutation]);

  // useEffect(() => {
  //   if (!reactionsMutation.isPending && reactionsMutation.isSuccess) {
  //     setReactions((state) => [...state, reactionsMutation.data]);
  //   }
  // }, [setReactions, reactionsMutation]);

  const handleClickStar = async () => {
    await starsMutation.mutate({
      articleId: article.id!,
      userId: user.id!,
    });

    setStars((state) => [...state, starsMutation.data!]);

    setToast({
      type: "success",
      isVisible: true,
      message: `You have given +1 star to this article.`,
    });
  };

  const handleClickReaction = () => {
    const textarea = document.getElementById("reactionText");
    textarea?.focus();
  };

  const handleSubmitReaction = async () => {
    await reactionsMutation.mutate({
      userId: user.id!,
      articleId: article.id!,
      reactionText: formData.reactionText,
    });

    setFormData(initialFormData);
    setToast({
      type: "success",
      isVisible: true,
      message: `You have given a reaction to this article.`,
    });
  };

  return (
    <div className="w-full flex flex-col justify-center items-center gap-14 mt-14">
      <div className="w-full flex justify-center items-center gap-4">
        <ActionList
          icon={
            <>
              <Star size={32} weight="fill" className="hidden md:block" />
              <Star size={24} weight="fill" className="md:hidden" />
            </>
          }
          text="Give Stars"
          onClick={handleClickStar}
        />
        <ActionList
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
          text="Give Reactions"
          onClick={handleClickReaction}
        />
      </div>
      <Form onSubmit={handleSubmitReaction} validationSchema={validationSchema}>
        <Form.Textarea name="reactionText" text="Your Reaction" />
        <Form.Button text="SUBMIT" />
      </Form>
      <Toast />
    </div>
  );
};

interface ReactionListProps {
  userFullname: string;
  reactionText: string;
  date: Date;
}

const ReactionList = (props: ReactionListProps) => {
  const { userFullname, reactionText, date } = props;

  return (
    <div className="w-full flex flex-col justify-center items-center gap-2 p-4 border-1 md:border-2 rounded-md text-sm md:text-lg">
      <h3 className="w-full font-bold">{userFullname}</h3>
      <p className="w-full text-justify">{reactionText}</p>
      <p className="w-full text-right text-xs md:text-sm mt-3 font-semibold">
        {`${dateParser(date)} at ${timeParser(date)}`}
      </p>
    </div>
  );
};

const Reactions = () => {
  const reactions = useAtomValue(reactionsAtom);

  return (
    <div className="w-full flex flex-col justify-center items- mt-14">
      <h2 className="w-full text-xl md:text-3xl font-bold mb-4">
        Reactions ({reactions.length})
      </h2>
      <div className="w-full flex flex-col justify-center items- gap-2">
        {reactions.length === 0 ? (
          <p>No reactions for this article!</p>
        ) : (
          reactions
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .map((reaction) => {
              console.log(reaction.createdAt);
              return (
                <ReactionList
                  key={reaction.id!}
                  reactionText={reaction?.reactionText}
                  date={reaction.createdAt}
                  userFullname={reaction.user!.fullName}
                />
              );
            })
        )}
      </div>
    </div>
  );
};

const CallToAction = () => {
  const article = useAtomValue(articleAtom);

  return (
    <div className="w-full flex flex-col justify-center items-center gap-4">
      <CallToActionViews align="center" article={article} />
      <Actions />
      <Reactions />
    </div>
  );
};

export default CallToAction;
