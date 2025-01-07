import { HorizontalLine } from "@/components/Common/Card/Line";
import TrainerInfo from "@/components/Common/Card/TrainerInfo/TrainerInfo";

export default function DetailTrainer() {
  return (
    <div className="flex justify-between mt-[5.6rem] ml-[26rem] mr-[23.4rem]">
      <div className="flex flex-col gap-16">
        <TrainerInfo
          rating={3}
          reviewCount={24}
          experience={4}
          lessonCount={54}
          isFavorited={true}
          favoriteCount={12}
        />
        <HorizontalLine />
        <div>
          <h1>상세설명</h1>
          <p>description</p>
        </div>
        <HorizontalLine />
        <div>
          <h1>제공 서비스</h1>
          <p>스포츠</p>
        </div>
        <HorizontalLine />
        <div>
          <h1>서비스 가능 지역</h1>
          <p>서울</p>
          <p>경기</p>
        </div>
        <HorizontalLine />
        <div>평점 및 리뷰 들어갈 부분</div>
      </div>
      <div>
        <div>
          <h1>김코드 강사님에게 지정 견적을 요청해보세요</h1>
          <button>기사님 찜하기</button>
          <button>지정 견적 요청하기</button>
        </div>
      </div>
    </div>
  );
}
