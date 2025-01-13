import Button from "../Common/Button";
import CardContainer from "../Common/Card/CardContainer";
import TrainerInfo from "../Common/Card/TrainerInfo/TrainerInfo";

export default function SimpleCard({ item }: { item: any }) {
    return (
        <CardContainer width="100%" gap="2.4rem">
            <TrainerInfo
                name={item.name}
            />
            <p className="text-sm text-gray-500">이사일 2024.07.01</p>
            <p className="text-sm text-gray-500">견적가 210,000원</p>
            <Button 
                onClick={}
            />
        </CardContainer>
    )
}