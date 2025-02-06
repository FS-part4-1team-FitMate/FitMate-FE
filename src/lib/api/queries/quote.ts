import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Quote } from "@/types/quote";
import { acceptQuote, getQuote, rejectQuote } from "../quoteService";

// 견적 상세 조회
export const useGetQuote = (quoteId: string) => {
  return useQuery<Quote>(["quote-detail", quoteId], () => getQuote(quoteId), {
    enabled: !!quoteId,
  });
};

// 견적 확정
export const useQuoteAccept = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (quoteId: string) => acceptQuote(quoteId),
    onSuccess: () => {
      toast.success("견적이 확정되었습니다.");
      router.push("/user/my-lesson/active-lesson");
    },
    onError: (err) => {
      console.error("견적 확정 실패", err);
      toast.error("견적 확정에 실패하였습니다.");
    },
  });
};

// 견적 반려
export const useQuoteRejection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (quoteId: string) => rejectQuote(quoteId),
    onSuccess: () => {
      toast.success("견적이 반려되었습니다.");
      queryClient.invalidateQueries(["my-lesson"]);
    },
    onError: (err) => {
      console.error("견적 반려 실패", err);
      toast.error("견적 반려에 실패하였습니다.");
    },
  });
};
