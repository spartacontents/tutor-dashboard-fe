import { useState } from "react";
import './App.css';
import SearchBar from "./components/SearchBar";
import InfoCard from "./components/InfoCard";
import ContractTable from "./components/ContractTable";

//튜터 데이터 배열
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
        rating: "4.0",
      },
      {
        activity: "모바일 앱 개발",
        startDate: "2024-01-01",
        endDate: "2024-12-31",
        team: "Mobile Team",
        rating: "4.8",
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
        rating: "3.0",
      },
    ],
  },
  {
    id: 3,
    name: "김민수",
    skills: ["React", "TypeScript", "Node.js", "Express", "MongoDB"],
    career: "5년차",
    availableTime: "평일 18:00-22:00, 주말 10:00-18:00",
    education: [
      "코딩 부트캠프 멘토 (2년)",
      "대학교 프로그래밍 강의 조교 (1년)",
      "온라인 코딩 튜터 (3년)"
    ],
    contracts: [
      {
        activity: "웹 개발 기초 과정 강의",
        startDate: "2023.01.15",
        endDate: "2023.03.30",
        team: "코딩 아카데미",
        rating: "4.8",
      },
      {
        activity: "React 심화 과정 멘토링",
        startDate: "2023.04.10",
        endDate: "2023.06.20",
        team: "테크 에듀",
        rating: "4.5",
      },
      {
        activity: "프로젝트 기반 학습 코치",
        startDate: "2023.07.05",
        endDate: "2023.09.15",
        team: "코드랩",
        rating: "4.7",
      },
    ],
  },
];

export default function App() {
  // 검색된 결과를 저장하는 상태
  const [searchResult, setSearchResult] = useState(null);

  // 사용자가 검색을 시도했는지 여부를 저장하는 상태
  const [searchAttempted, setSearchAttempted] = useState(false); // 상태 정의


  // 검색 함수
  const handleSearch = (name) => {
    setSearchAttempted(true); // 검색 시도 여부를 ture로 변경
    const result = tutorData.find((tutor) => tutor.name && tutor.name.includes(name));
    setSearchResult(result || null); // 검색 결과가 없으면 null로 설정
  };

  return (
    <div className="dashboard-container">
       {/* 대시보드 제목 */}
      <h1 className="dashboard-title">튜터 관리 대시보드</h1>

      {/* 검색 바 */}
      <div className="search-bar">
        <SearchBar placeholder="튜터명을 입력하세요" onSearch={handleSearch} />
      </div>

      {/* 검색 결과가 있으면 표시 */}
      {searchResult ? (
        <div>
          <InfoCard title="기술 스택" content={searchResult.skills?.join(", ") || "정보 없음"} />
          <InfoCard title="경력" content={searchResult.career} />
          <InfoCard title="년차" content={searchResult.year} />
          <InfoCard title="활동 가능 시간" content={searchResult.availableTime} />

          {/* 교육 관련 경력 처리 (배열일 경우와 문자열일 경우 처리) */}
          <InfoCard
            title="교육 관련 경력"
            content={
              Array.isArray(searchResult.education)
                ? searchResult.education.join(", ") //배열이면 join으로 문자열 변환
                : searchResult.education // 아니면 그대로 출력
            }
          />

          {/* 계약 섹션 */}
          <div className="contract-section">
            <h3 className="text-xl font-bold mt-6">
              진행 활동(계약) 검색 결과 {searchResult?.contracts?.length || 0}건
            </h3>

            {/* 계약 정보가 있을 때만 테이블 출력 */}
            {searchResult?.contracts?.length > 0 ? (
              <ContractTable contracts={searchResult.contracts} />
            ) : (
              <div className="no-contracts">
                계약 정보가 없습니다.
              </div>
            )}
          </div>
        </div>
      ) : (
        // 검색 시도를 했을 때만 메시지 표시
        searchAttempted && <p>검색 결과가 없습니다.</p>
      )}
    </div>
  );
}