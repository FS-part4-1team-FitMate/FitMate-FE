import { useState } from "react"

export default function Sort() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const option = ["리뷰 많은 순", "평점 높은 순", "경력 높은 순", "확정 횟수 많은 순"];
    
      const handleOptionClick = () => {
        setIsOpen(false);
      };
    
      return (
        <div>
          <p>{label}</p>
          <div>
            <div onToggle={()=>setIsOpen((prev) => !prev)}>
              <p>{`${label}을 선택하세요`}</p>
              <Image src={arrowDown} width={28} height={28} alt="아래 화살표" />
            </div>
            {isOpen && (
              <div>
                {option.map((option, index) => (
                  <div
                    key={index}
                    onClick={() => handleOptionClick(option)}
                  >
                    <p>{option}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
    )
}