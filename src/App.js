import { useState } from "react";
import SearchBar from "./components/SearchBar";
import InfoCard from "./components/InfoCard";
import ContractTable from "./components/ContractTable";

const tutorData = [
  {
    id: 1,
    name: "홍길동",
    skills: ["JavaScript", "React", "Node.js"],
    career: "5년",
    year: "5년차",
    availableTime: "월-금, 10:00-18:00",
    education: "컴퓨터공학 학사",
    contracts: [
      {
        activity: "웹 개발",
        startDate: "2023-01-01",
        endDate: "2023-12-31",
        team: "Frontend Team",
        recommendation: "YES",
      },
      {
        activity: "모바일 앱 개발",
        startDate: "2024-01-01",
        endDate: "2024-12-31",
        team: "Mobile Team",
        recommendation: "YES",
      },
    ],
  },
  {
    id: 2,
    name: "이순신",
    skills: ["Python", "Django"],
    career: "3년",
    year: "3년차",
    availableTime: "월-수, 14:00-18:00",
    education: "정보보안 학사",
    contracts: [
      {
        activity: "백엔드 API 개발",
        startDate: "2022-05-01",
        endDate: "2022-12-31",
        team: "Backend Team",
        recommendation: "NO",
      },
    ],
  },
];
  

export default function App () {
    const [searchResult, setSearchResult] = useState(null);

    const handleSearch = (name) => {
        const result = tutorData.find((tutor) => tutor.name && tutor.name.includes (name));
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
                    <InfoCard title="기술 스택" content={searchResult.skills?.join(", ") || "정보 없음"} />
                    <InfoCard title="경력" content={searchResult.career} />
                    <InfoCard title="년차" content={searchResult.year} />
                    <InfoCard title="활동 가능 시간" content={searchResult.availableTime} />
                    <InfoCard title="교육 관련 경력" content={searchResult.education} />

                    <h3 className="text-xl font-bold mt-6">
                      진행 활동(계약) 검색 결과 {searchResult?.contracts?.length || 0}건
                    </h3>
                    
                    {/* 계약 정보가 있을 때만 테이블 출력 */}
                      {searchResult?.contracts.length > 0 ? (
                        <ContractTable contracts={searchResult.contracts} />
                      ) : (
                        <p className="text-center"> 계약 정보가 없습니다. </p>
                      )}
                </div>
            ) : (
                <p>검색 결과가 없습니다.</p>
            )}
        </div>
    );
}