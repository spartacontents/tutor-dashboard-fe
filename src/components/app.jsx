import { useState } from "react";
import SearchBar from "./SearchBar";
import InfoCard from "./InfoCard";
import ContractTable from "./ContractTable";

const tutorData = [
    {
      id: 1,
      name: "홍길동",
      skills: ["JavaScript", "React", "Node.js"],
      career: "5년",
      education: "컴퓨터공학 학사",
      contract: {
        startDate: "2023-01-01",
        endDate: "2023-12-31",
        team: "Frontend Team",
        recommendation: "YES",
      },
    },
    {
      id: 2,
      name: "이순신",
      skills: ["Python", "Django"],
      career: "3년",
      education: "정보보안 학사",
      contract: {
        startDate: "2022-05-01",
        endDate: "2022-12-31",
        team: "Backend Team",
        recommendation: "NO",
      },
    },
  ];
  

export default function App () {
    const [searchResult, setSearchResult] = useState(null);

    const handleSearch = (name) => {
        const result = tutorData.find((tutor) => tutor.name === name);
        setSearchResult(result || null);
};

    return (
        <div className="p-4 space-y-6">
            <h1 className="text-2xl font-bold mb-4">튜터 관리 대시보드</h1>

            {/* 검색 필드 */}
            <SearchBar placeholder="튜터명을 입력하세요" onSearch={handleSearch} />

            {/* 검색 결과가 있으면 표시 */}
            {searchResult ? (
                <div>
                    <InfoCard title="기술 스택" content={searchResult.skills.join(", ")} />
                    <InfoCard title="경력" content={searchResult.career} />
                    <InfoCard title="교육 관련 경력" content={searchResult.education} />
                    <ContractTable contract={searchResult.contract} />
                </div>
            ) : (
                <p>검색 결과가 없습니다.</p>
            )}
        </div>
    );
}