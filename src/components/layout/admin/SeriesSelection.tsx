import Form from "~/components/ui/Form";
import { useQuerySeries } from "~/stores/seriesStore";

const SeriesSelection = () => {
  const seriesQuery = useQuerySeries();

  return (
    <Form.Select name="seriesId" text="Series">
      {seriesQuery.data
        ?.filter((series) => !series.deletedAt)
        ?.map((series) => (
          <Form.Option
            key={series.id}
            text={series.seriesName}
            value={series.id!}
          />
        ))}
    </Form.Select>
  );
};

export default SeriesSelection;
