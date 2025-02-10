import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Quote, QuoteData } from "@/types/quote";
import { rejectedLesson } from "../lessonService";
import { acceptQuote, getQuote, rejectQuote, sendQuote } from "../quoteService";

// 견적 상세 조회
export const useGetQuote = (quoteId: string) => {
  return useQuery<Quote>(["quote-detail", quoteId], () => getQuote(quoteId), {
    enabled: !!quoteId,
  });
};

// 견적 보내기 (트레이너)
export const useSendQuote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (quoteData: QuoteData) => sendQuote(quoteData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-lesson"] });
      toast.success("견적을 전송하였습니다.");
    },
    onError: (error: any) => {
      console.error("견적 전송에 실패하였습니다.", error.message);
      toast.error("견적 전송에 실패하였습니다.");
    },
  });
};

// 견적 반려 (트레이너)
export const useRejectedQuote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      lessonId,
      directQuoteRequestId,
      rejectionReason,
    }: {
      lessonId: string;
      directQuoteRequestId: string;
      rejectionReason: string;
    }) => rejectedLesson(lessonId, directQuoteRequestId, rejectionReason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["received-request"] });
      toast.success("요청을 반려하였습니다.");
    },
    onError: (error: any) => {
      console.error("요청 반려에 실패하였습니다.", error.message);
      toast.error("요청 반려에 실패하였습니다.");
    },
  });
};

// 견적 확정 (유저)
export const useQuoteAccept = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (quoteId: string) => acceptQuote(quoteId),
    onSuccess: () => {
      toast.success("견적이 확정되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["my-lesson"] });
      router.push("/user/my-lesson/active-lesson");
    },
    onError: (err) => {
      console.error("견적 확정 실패", err);
      toast.error("견적 확정에 실패하였습니다.");
    },
  });
};

// 견적 반려 (유저)
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
