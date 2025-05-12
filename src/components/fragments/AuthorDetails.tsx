import {
  CalendarBlank,
  Clock,
  FolderOpen,
  Pencil,
} from "@phosphor-icons/react";
import { ReactNode } from "react";
import { dateParser, timeParser } from "~/libs/datetimeParser";

interface AuthorDetailListProps {
  icon: ReactNode;
  text: string;
  hoverTitle: string;
}

interface AuthorDetailsProps {
  authorName: string;
  createdAt: Date;
  seriesName: string;
}

const AuthorDetailList = (props: AuthorDetailListProps) => {
  const { icon, text, hoverTitle } = props;
  return (
    <div
      className="w-full flex justify-center  items-center gap-2 font-semibold"
      title={hoverTitle}
    >
      {icon}
      <p className="w-full text-xs md:text-sm">{text}</p>
    </div>
  );
};

const AuthorDetails = (props: AuthorDetailsProps) => {
  const { authorName, createdAt, seriesName } = props;

  return (
    <div className="w-full flex flex-col justify-center items-center mb-4">
      <AuthorDetailList
        hoverTitle="Author Name"
        icon={
          <>
            <Pencil size={32} weight="fill" className="hidden md:block" />
            <Pencil size={24} weight="fill" className="md:hidden" />
          </>
        }
        text={authorName}
      />
      <AuthorDetailList
        hoverTitle="Date of Article Created"
        icon={
          <>
            <CalendarBlank
              size={32}
              weight="fill"
              className="hidden md:block"
            />
            <CalendarBlank size={24} weight="fill" className="md:hidden" />
          </>
        }
        text={dateParser(createdAt)!}
      />
      <AuthorDetailList
        hoverTitle="Date of Article Created"
        icon={
          <>
            <Clock size={32} weight="fill" className="hidden md:block" />
            <Clock size={24} weight="fill" className="md:hidden" />
          </>
        }
        text={timeParser(createdAt)!}
      />
      <AuthorDetailList
        hoverTitle="Article Series"
        icon={
          <>
            <FolderOpen size={32} weight="fill" className="hidden md:block" />
            <FolderOpen size={24} weight="fill" className="md:hidden" />
          </>
        }
        text={seriesName}
      />
    </div>
  );
};

export default AuthorDetails;
