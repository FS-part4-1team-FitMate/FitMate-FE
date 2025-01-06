import CardContainer from "@/components/Common/Card/CardContainer";
import TrainerInfo from "@/components/Common/Card/TrainerInfo";

export default function Home() {
  return (
    <div className="flex bg-pink-200 m-10 p-10">
      <CardContainer>
        <TrainerInfo />
      </CardContainer>
    </div>
  );
}
