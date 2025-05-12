import { useMutation, useQuery } from "@tanstack/react-query";
import { atom, useAtom } from "jotai";
import axiosInstance from "~/libs/axiosInstance";
import { ApiResponseType } from "~/types/apiResponseType";
import { RequestSeriesType, SeriesTypeExtends } from "~/types/seriesType";

const initialSeries: SeriesTypeExtends[] = [];
const initialSeriesSingular: SeriesTypeExtends = {
  articles: [],
  createdAt: new Date(),
  seriesName: "",
};

export const SeriesAtom = atom<SeriesTypeExtends[]>(initialSeries);
export const SeriesSingularAtom = atom<SeriesTypeExtends>(
  initialSeriesSingular
);

export const useQuerySeries = () => {
  const [series, setSeries] = useAtom(SeriesAtom);

  return useQuery({
    initialData: series,
    queryKey: ["series"],
    queryFn: async () => {
      const response = await axiosInstance.get<
        ApiResponseType<SeriesTypeExtends[]>
      >(`/series`);
      setSeries(response.data.data!);
      return response.data.data;
    },
  });
};

export const useQuerySeriesSingular = (id: string) => {
  const [series, setSeries] = useAtom(SeriesSingularAtom);

  return useQuery({
    initialData: series,
    queryKey: ["seriesSingular"],
    queryFn: async () => {
      const response = await axiosInstance.get<
        ApiResponseType<SeriesTypeExtends>
      >(`/series/${id}`);
      setSeries(response.data.data!);
      return response.data.data;
    },
  });
};

interface MutationArticle {
  onSuccess?: () => void;
  type: "create" | "update" | "delete";
}

type MutationSeriesBody = Partial<{ id: string } & RequestSeriesType>;

export const useMutationSeries = (args: MutationArticle) => {
  const createMutation = async (body: MutationSeriesBody) => {
    const response = await axiosInstance.post<
      ApiResponseType<SeriesTypeExtends>
    >("/series", {
      seriesName: body.seriesName,
    });
    return response.data.data;
  };

  const deleteMutation = async (body: MutationSeriesBody) => {
    const response = await axiosInstance.delete<
      ApiResponseType<SeriesTypeExtends>
    >(`/series/${body.id}`);
    return response.data.data;
  };

  const updateMutation = async (body: MutationSeriesBody) => {
    const response = await axiosInstance.patch<
      ApiResponseType<SeriesTypeExtends>
    >(`/series/${body.id}`, {
      seriesName: body.seriesName,
    });
    return response.data.data;
  };

  const mutationFn = (() => {
    switch (args.type) {
      case "create":
        return createMutation;
      case "delete":
        return deleteMutation;
      case "update":
        return updateMutation;
    }
  })();

  return useMutation({
    mutationFn,
    onSuccess: args.onSuccess,
  });
};
