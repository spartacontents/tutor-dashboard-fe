import { useState, useEffect } from "react";
import './App.css';
import SearchBar from "./components/SearchBar";
import InfoCard from "./components/InfoCard";
import ContractTable from "./components/ContractTable";

// 기본으로 보여줄 튜터 정보
const defaultTutor = {
  name: "튜터명",
  skills: ["기본 기술 스택"],
  career: "기본 경력 정보",
  year: "기본 년차 정보",
  availableTime: "기본 활동 가능 시간",
  education: ["기본 교육 이력 1", "기본 교육 이력 2"],
  contracts: [],
};

// 테스트용 데이터 (API 연동 전 사용)
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
      { activity: "웹 개발", startDate: "2023-01-01", endDate: "2023-12-31", team: "Frontend Team", rating: "4.0" },
    ],
  },
  {
    id: 2,
    name: "홍길동",
    skills: ["Vue", "TypeScript"],
    career: "3년",
    year: "3년차",
    availableTime: "월-수, 14:00-18:00",
    education: "정보보안 학사",
    contracts: [],
  },
  {
    id: 3,
    name: "이순신",
    skills: [""],
    career: "",
    year: "7년차",
    availableTime: "월-금, 09:00-17:00",
    education: "소프트웨어 공학 석사",
    contracts: [
      { activity: "백엔드 개발", startDate: "2022-06-01", endDate: "2023-06-01", team: "Backend Team", rating: "4.5" },
    ],
  },
  {
    id: 4,
    name: "홍길동",
    skills: [""],
    career: "",
    year: "",
    availableTime: "월-금, 09:00-17:00",
    education: "",
    contracts: [
      { activity: "백엔드 개발", startDate: "2022-06-01", endDate: "2023-06-01", team: "Backend Team", rating: "4.5" },
    ],
  }
];

export default function App() {
  // API에서 불러올 데이터 저장 (초기값: 테스트 데이터)
  const [allTutors, setAllTutors] = useState(tutorData);
  const [searchResults, setSearchResults] = useState([defaultTutor]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchAttempted, setSearchAttempted] = useState(false);
  const [searchedName, setSearchedName] = useState(""); // 검색한 이름 저장
  const [loading, setLoading] = useState(false); // API 요청 상태

  // Fetch API: 튜터 데이터를 불러오는 함수
  const fetchTutors = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/tutors"); // API URL 변경 가능
      const data = await response.json();
      setAllTutors(data); // API에서 받아온 데이터로 업데이트
    } catch (error) {
      console.error("데이터 불러오기 오류:", error);
      setAllTutors(tutorData); // API 호출 실패 시 기본 데이터 사용
    }
    setLoading(false);
  };

  // 첫 마운트 시 API 호출
  useEffect(() => {
    fetchTutors();
  }, []);

  // 검색 함수
  const handleSearch = (name) => {
    if (!name.trim()) {
      setSearchAttempted(false);
      setSearchResults([defaultTutor]); // 검색어 없을 때 기본 튜터 정보 유지
      setSelectedIndex(0);
      return;
    }

    setSearchAttempted(true);
    setSearchedName(name);

    // 검색된 동명이인 포함된 리스트
    const results = allTutors.filter((tutor) => tutor.name.includes(name));
    setSearchResults(results.length > 0 ? results : []);
    setSelectedIndex(0);
  };

  // 이전 튜터 보기
  const handlePrev = () => {
    setSelectedIndex((prevIndex) => (prevIndex === 0 ? searchResults.length - 1 : prevIndex - 1));
  };

  // 다음 튜터 보기
  const handleNext = () => {
    setSelectedIndex((prevIndex) => (prevIndex === searchResults.length - 1 ? 0 : prevIndex + 1));
  };

  // 현재 선택된 튜터 정보
  const currentTutor = searchResults[selectedIndex];

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">튜터 관리 대시보드</h1>

      {/* 검색 바 */}
      <div className="search-bar">
        <SearchBar placeholder="튜터명을 입력하세요" onSearch={handleSearch} />
      </div>

      {/* API 로딩 중 표시 */}
      {loading && <p className="loading">데이터를 불러오는 중...</p>}

      {/* 검색을 했는데 결과가 없는 경우 */}
      {searchAttempted && searchResults.length === 0 && (
        <p className="no-result">검색 결과가 없습니다.</p>
      )}

      {/* 동명이인 안내 메시지 */}
      {searchResults.length > 1 && (
        <div className="multi-result">
          <p>"{searchedName}" 튜터님이 {searchResults.length}명 검색되었습니다.</p>
          <div className="navigation-buttons">
            <button onClick={handlePrev}>이전</button>
            <span>{selectedIndex + 1} / {searchResults.length}</span>
            <button onClick={handleNext}>다음</button>
          </div>
        </div>
      )}

      {/* 검색된 튜터 정보 표시 */}
      <div>
        <InfoCard title="튜터명" content={currentTutor?.name || "정보 없음"} />
        <InfoCard title="기술 스택" content={currentTutor?.skills?.join(", ") || "정보 없음"} />
        <InfoCard title="경력" content={currentTutor?.career || "정보 없음"} />
        <InfoCard title="년차" content={currentTutor?.year || "정보 없음"} />
        <InfoCard title="활동 가능 시간" content={currentTutor?.availableTime || "정보 없음"} />
        <InfoCard 
          title="교육 관련 경력"
          content={Array.isArray(currentTutor?.education) ? currentTutor.education.join(", ") : currentTutor?.education || "정보 없음"}
        />

        {/* 진행 활동(계약) 섹션 */}
        <div className="contract-section">
          <h3 className="text-xl font-bold mt-6">
            진행 활동(계약) 검색 결과 {currentTutor?.contracts?.length || 0}건
          </h3>

          {currentTutor?.contracts?.length > 0 ? (
            <ContractTable contracts={currentTutor.contracts} />
          ) : (
            <div className="no-contracts">
              {searchResults.length === 1 && searchResults[0] === defaultTutor 
                ? "계약 정보 안내" 
                : "계약 정보가 없습니다."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}