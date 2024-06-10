'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card";
import { DialogTitle, DialogDescription, DialogHeader, DialogContent, DialogFooter, Dialog } from "@/components/ui/dialog";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";

// Course 인터페이스 정의
interface Course {
  title: string; //과목이름 
  semester: string;//학기
  nessel: string;// 전선/전필
  professor: string; // 교수명 
  description: string; //설명
  difficulty: string; //난이도 
  credits: number;   // 학점 
  prerequisites: string; // 선수과목 =>  연계과목 
  details: string[];//자세히 보기에 들어감
  year: number; // 학년 정보 추가(카드에 표시되지는 않음 )
}

const Home = ({ handleViewCourses, handleViewTrack, handleViewContact }: { handleViewCourses: () => void, handleViewTrack: () => void, handleViewContact: () => void }) => (
  <section className="w-full py-12 md:py-24 lg:py-32 bg-[#0072C6]">
    <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10 text-white">
      <div className="space-y-3">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Code Compass</h2>
        <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          강원대학교 컴퓨터공학과 학생들의 수강신청에 있어서 도움을 주기 위해서 만들었음.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="flex flex-col items-center justify-center space-y-2">
          <BookIcon className="w-12 h-12" />
          <h3 className="text-lg font-semibold">전공 강좌</h3>
          <p className="text-gray-200 text-sm">All about 강원대 컴퓨터공학부 courses</p>
          <Button variant="outline" className="text-blue-400" onClick={handleViewCourses}>
            View Courses
          </Button>
        </div>
        <div className="flex flex-col items-center justify-center space-y-2">
          <CompassIcon className="w-12 h-12" />
          <h3 className="text-lg font-semibold">진로 트랙</h3>
          <p className="text-gray-200 text-sm">취업해야겠지?.</p>
          <Button variant="outline" className="text-blue-400" onClick={handleViewTrack}>
            View Track
          </Button>
        </div>
        <div className="flex flex-col items-center justify-center space-y-2">
          <PhoneIcon className="w-12 h-12" />
          <h3 className="text-lg font-semibold">연락처</h3>
          <p className="text-gray-200 text-sm">전화는 부담되니 문자남겨주세요.</p>
          <Button variant="outline" className="text-blue-400" onClick={handleViewContact}>
            Contact
          </Button>
        </div>
      </div>
    </div>
  </section>
);

function CompassIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}

interface PhoneIconProps extends React.SVGProps<SVGSVGElement> {}

function PhoneIcon(props: PhoneIconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

const Courses = ({ courses, handleOpenDialog, selectedYears, handleCheckboxChange, groupedCourses, getCardColor }: { courses: any, handleOpenDialog: any, selectedYears: number[], handleCheckboxChange: (year: number) => void, groupedCourses: { [key: number]: any[] }, getCardColor: (year: number) => string }) => (
  <div>
    <h1 className="text-3xl font-bold mb-8">컴퓨터 공학과 전공 강좌</h1>
    <div className="flex flex-col space-y-2 mb-4">
      <Label>학년 선택:</Label>
      {[1, 2, 3, 4].map(year => (
        <div key={year} className="flex items-center space-x-2">
          <input
            type="checkbox"
            id={`year-${year}`}
            checked={selectedYears.includes(year)}
            onChange={() => handleCheckboxChange(year)}
          />
          <Label htmlFor={`year-${year}`}>{year}학년</Label>
        </div>
      ))}
    </div>
    {Object.keys(groupedCourses).map(year => (
      <div key={year} className="mb-8">
        <h2 className="text-2xl font-bold mb-4">{year}학년 과목</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {groupedCourses[parseInt(year)].map((course, index) => (
            <Card key={index} className={`max-w-sm ${getCardColor(course.year)}`}>
              <CardHeader>
                <CardTitle>{course.title}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <span className="font-medium">교수:</span> {course.professor}
                  </div>
                  <div>
                    <span className="font-medium">학기:</span> {course.semester}
                  </div>
                  <div>
                    <span className="font-medium">전선/전필:</span> {course.nessel}
                  </div>
                  <div>
                    <span className="font-medium">학점:</span> {course.credits}
                  </div>
                  <div>
                    <span className="font-medium">난이도:</span> {course.difficulty}
                  </div>
                  <div>
                    <span className="font-medium">연계 과목:</span> {course.prerequisites}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline" onClick={() => handleOpenDialog(course)}>
                  자세히 보기
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    ))}
  </div>
);

const Career = () => (
  <div>
    <h1 className="text-3xl font-bold mb-8">진로 트랙</h1>
    <p>업데이트</p>
  </div>
);

const Contact = () => (
  <div>
    <h1 className="text-3xl font-bold mb-8">연락처</h1>
    <p>여기는 연락처 페이지입니다.</p>
  </div>
);

export default function Component() {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedYears, setSelectedYears] = useState<number[]>([]);
  const [activeMenu, setActiveMenu] = useState<string>("홈");

  const handleOpenDialog = (course: Course) => {
    setSelectedCourse(course);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCourse(null);
  };

  const handleCheckboxChange = (year: number) => {
    setSelectedYears(prevSelectedYears =>
      prevSelectedYears.includes(year)
        ? prevSelectedYears.filter(y => y !== year)
        : [...prevSelectedYears, year]
    );
  };

  const handleViewCourses = () => {
    setActiveMenu("전공 강좌");
  };

  const handleViewTrack = () => {
    setActiveMenu("진로 트랙");
  };

  const handleViewContact = () => {
    setActiveMenu("연락처");
  };


  const courses: Course[] = [
    {
      title: "컴퓨터 개론",
      semester: " 1학기",
      nessel: "학문기초 ",
      professor: "김향미" ,
      year: 1,
      description: "컴퓨터의 기본 시스템 소프트웨어인 운영체제에 대해 기능, 구조 및 구현방법을 학습한다.",
      credits: 3,
      difficulty: " 중 ",
      prerequisites: "전반적인 컴퓨터 공학 과목",
      details: [
        "핵심 내용: 컴퓨터가 무엇인지, 어떻게 작동하는지에 대한 전반적인 이해를 돕습니다. 컴퓨터의 역사부터 시작해, 내부의 하드웨어 구성 요소들(예: CPU, 메모리, 저장공간) 이 어떻게 상호작용하는지, 소프트웨어가 어떤 역할을 하는지 설명합니다. 또한, 컴퓨터 과학의 여러 분야(프로그래밍, 네트워킹, 데이터베이스 등)에 대한 기초 개념을 소개해, 이후 과목에서 배우게 될 내용들을 미리 개괄적으로 다룹니다.",
        "수업 방식: 이론 중심, 일주일에 1일.",
        "사용 언어 : x "
      ],
      
      
    },
    {
      title: "자바 1",
      semester: "1학기",
      nessel: "학문기초",
      professor: "하진영",
      year: 1, // 학년 정보 추가
      description: "자바 프로그램을 실행하는 방법과 기본 문법을 배우고, 간단한 프로그램을 작성해 보는 수업입니다.",
      credits: 3,
      difficulty: "하",
      prerequisites: "없음",
      details: [
      "핵심 내용: 자바는 전 세계적으로 많이 사용되는 프로그래밍 언어 중 하나로, 수업에서는 자바 프로그램을 실행하는 방법, 기본 문법(예: 변수 선언, 조건문, 반복문 등)을 배우고, 간단한 프로그램을 작성해 보는 실습을 합니다. ex) 자바 언어로 계산기를 만들거나 하는 식",
      "수업 방식: 이론 + 실습, 일주일에 2일.",
      "사용 언어: 자바",
      "연계 과목: 자바2, 자료구조, 데이터베이스 프로그래밍, 실전코딩",
      "자격증 연계: OCPJP"
      ],
      },
      {
        title: "C언어",
        semester: "2학기",
        nessel: "학문기초",
        professor: "지수환",
        year: 1, // 학년 정보 추가
        description: "C프로그램을 작성하고 실행하는 방법과 기본 문법을 배우고, 포인터와 같은 중요한 개념도 다루는 수업입니다.",
        credits: 3,
        difficulty: "하",
        prerequisites: "없음",
        details: [
        "핵심 내용: C언어는 시스템 소프트웨어 개발에 많이 사용되는 프로그래밍 언어로, 수업에서는 C프로그램을 작성하고 실행하는 방법, 기본 문법(예: 변수, 연산자, 조건문, 반복문 등)을 배우고, 포인터와 같은 중요한 개념도 다룹니다. ex) 문자열 조작, 간단한 포인터를 이용한 실습을 통해 C언어의 기초를 익힙니다.",
        "수업 방식: 이론 + 실습, 일주일에 2일.",
        "사용 언어: C",
        "연계 과목: 자료구조, 알고리즘",
        "자격증 연계: 없음"
        ],
        },
        {
          title: "자바 2",
          semester: "2학기",
          nessel: "학문기초",
          professor: "이헌길",
          year: 2, // 학년 정보 추가
          description: "자바1에서 배운 내용을 심화하여, 더 복잡한 자바프로그램을 작성하는 방법을 배우는 수업입니다.",
          credits: 3,
          difficulty: "중",
          prerequisites: "자바 1",
          details: [
          "핵심 내용: 자바1에서 배운 내용을 심화하여, 더 복잡한 자바프로그램을 작성하는 방법을 배웁니다. 객체지향 프로그래밍 개념(클래스, 객체, 상속 등)을 배우고, 여러 개의 파일로 구성된 큰 프로그램을 작성하는 방법도 다룹니다. ex) 여러 개의 클래스가 상호작용하는 간단한 응용 프로그램을 작성해 보는 실습을 통해 자바의 심화 개념을 익힙니다.",
          "수업 방식: 이론 + 실습, 일주일에 2일.",
          "사용 언어: 자바",
          "연계 과목: 자료구조, 데이터베이스 프로그래밍, 실전코딩",
          "자격증 연계: OCPJP"
          ],
    },
     {
      title: "논리회로",
      semester: "1학기",
      nessel: "전공선택",
      professor: "최창렬",
      year: 2, // 학년 정보 추가
      description: "컴퓨터 내부에서 정보가 어떻게 처리되는지에 대한 기초적인 개념을 다루는 수업입니다.",
      credits: 3,
      difficulty: "중",
      prerequisites: "없음",
      details: [
      "핵심 내용: 이 강의는 컴퓨터 내부에서 정보가 어떻게 처리되는지에 대한 기초적인 개념을 다룹니다. 컴퓨터는 0과 1로 이루어진 2진수를 사용하여 데이터를 처리하는데, 논리회로는 이러한 2진수를 처리하는 기본적인 전자 회로입니다. 수업에서는 AND, OR, NOT 같은 기본적인 논리 게이트가 어떻게 작동하는지 배우고, 이러한 게이트를 조합하여 더 복잡한 회로를 설계하는 방법도 다룹니다.",
      "수업 방식: 이론 중심, 일주일에 2일.",
      "사용 언어: 없음",
      "연계 과목: 컴퓨터 구조",
      "자격증 연계: 없음"
      ],
      },
      {
    title: "이산수학",
    semester: "1학기",
    nessel:  "전공선택",
         professor: "권호연",
         year: 2, // 학년 정보 추가
         description: "컴퓨터 공학에서 필수적인 수학적 개념들을 다루는 수업입니다.",
         credits: 3,
         difficulty: "중",
         prerequisites: "없음",
         details: [
         "핵심 내용: 이 강의는 컴퓨터 공학에서 필수적인 수학적 개념들을 다룹니다. 여기에는 집합론, 그래프 이론, 조합론, 논리 등이 포함됩니다. 이산수학은 실제로는 수학적인 문제를 해결하기 위해 컴퓨터 프로그램을 작성하는 데 필요한 이론적 기초를 제공합니다. 예를 들어, 수업에서는 그래프를 사용하여 최단 경로를 찾는 알고리즘을 배우고, 이를 파이썬 프로그래밍 언어로 구현해 보는 과제를 수행하게 됩니다.",
       "수업 방식: 이론 + 프로그래밍 과제.",
       "사용 언어: 파이썬",
        "연계 과목: 알고리즘",
        "자격증 연계: 없음"
        ],
        },
        {
       title: "자료구조",
       semester: "1학기",
       nessel:  "전공필수",
       professor: "최황규",
       year: 2, // 학년 정보 추가
       description: "데이터를 효율적으로 저장하고 관리하는 방법을 다루는 수업입니다.",
       credits: 3,
     difficulty: "중",
     prerequisites: "없음",
     details: [
     "핵심 내용: 이 강의는 데이터를 효율적으로 저장하고 관리하는 방법을 다룹니다. 자료구조는 데이터를 조직하는 다양한 방법을 의미합니다. 수업에서는 리스트, 배열, 스택, 큐, 트리 등의 기본적인 자료구조를 배우고, 이러한 자료구조를 사용하여 문제를 해결하는 방법도 다룹니다. 예를 들어, 데이터를 정렬하거나 검색하는 프로그램을 작성하는 방법을 배우게 됩니다.",
     "수업 방식: 이론 중심, 일주일에 2일.",
     "사용 언어: 파이썬",
     "연계 과목: 알고리즘",
     "자격증 연계: 없음"
     ],
     },
     {
    title: "선형대수학",
    semester: "1학기",
    nessel: "전공선택",
    professor: "이구연",
    year: 2, // 학년 정보 추가
    description: "선형대수학의 기초 개념을 다루는 수업입니다.",
    credits: 3,
    difficulty: "중",
    prerequisites: "없음",
    details: [
    "핵심 내용: 이 강의는 선형대수학의 기초 개념을 다룹니다. 선형대수학은 벡터와 행렬을 사용하여 다양한 문제를 해결하는 수학의 한 분야입니다. 수업에서는 행렬을 사용하여 방정식을 푸는 방법, 벡터의 개념, 그리고 이러한 개념들이 컴퓨터 공학에서 어떻게 사용되는지를 배우게 됩니다. 예를 들어, 여러 변수 간의 관계를 분석하거나, 이미지를 변환하는 데 필요한 수학적 도구를 배우게 됩니다.",
    "수업 방식: 이론 + 문제풀이.",
    "사용 언어: 없음",
    "연계 과목: 없음",
    "자격증 연계: 없음"
     ],
   },
   {
    title: "리눅스프로그래밍",
    semester: "1학기",
    nessel:  "전공선택",
    professor: "김용석",
    year: 2, // 학년 정보 추가
    description: "리눅스 운영체제에서 프로그래밍을 배우는 과목입니다.",
    credits: 3,
    difficulty: "중",
    prerequisites: "없음",
    details: [
     "핵심 내용: 이 강의는 리눅스 운영체제에서 프로그래밍을 배우는 과목입니다. 리눅스는 많은 서버와 개발 환경에서 사용되는 중요한 운영체제입니다. 수업에서는 리눅스의 기본 명령어, 쉘 스크립트를 작성하는 방법, 그리고 C와 어셈블리어를 사용하여 리눅스 환경에서 프로그램을 작성하는 방법을 배웁니다. 예를 들어, 파일을 관리하거나 프로세스를 제어하는 간단한 프로그램을 작성해 봅니다.",
     "수업 방식: 강의 + 실습.",
     "사용 언어: C, 어셈블리어",
     "연계 과목: 시스템프로그래밍, 운영체제",
     "자격증 연계: RHCSA, LPIC, 리눅스마스터"
     ],
     },
     {
     title: "웹프로그래밍",
     semester: "1학기",
     nessel:  "전공선택",
     professor: "한미현, 김아욱",
     year: 2, // 학년 정보 추가
     description: "웹 사이트를 만드는 방법을 배우는 수업입니다.",
     credits: 3,
     difficulty: "중",
     prerequisites: "없음",
     details: [
     "핵심 내용: 이 강의는 웹 사이트를 만드는 방법을 다룹니다. 수업에서는 HTML을 사용하여 웹 페이지의 구조를 만들고, CSS를 사용하여 페이지를 스타일링하며, 자바스크립트를 사용하여 페이지에 동적인 기능을 추가하는 방법을 배웁니다. 예를 들어, 사용자 입력을 받아 처리하거나, 버튼을 눌렀을 때 페이지의 내용이 변경되는 간단한 웹 애플리케이션을 만들어 봅니다.",
     "수업 방식: 이론 + 실습.",
     "사용 언어: 자바스크립트, CSS, HTML",
     "연계 과목: 데이터베이스, 문제해결 프로그래밍",
     "자격증 연계: 웹 마스터 전문가"
     ],
     },
     {
  title: "고급파이썬프로그래밍",
  semester: "1학기",
  nessel:  "전공선택",
  professor: "이창기",
  year: 3, // 학년 정보 추가
  description: "파이썬의 고급 기능과 라이브러리를 다루는 수업입니다.",
  credits: 3,
  difficulty: "중",
  prerequisites: "없음",
  details: [
  "핵심 내용: 이 강의는 파이썬의 고급 기능과 라이브러리를 다룹니다. 수업에서는 파이썬의 고급 문법, 다양한 데이터 구조, 라이브러리(예: NumPy, Pandas)를 사용하여 복잡한 문제를 해결하는 방법을 배웁니다. 예를 들어, 대규모 데이터를 처리하거나, 복잡한 수학적 계산을 수행하는 프로그램을 작성해 봅니다.",
  "수업 방식: 이론 + 실습.",
  "사용 언어: 파이썬",
  "연계 과목: 자료구조, 알고리즘, 데이터분석프로그래밍",
  "자격증 연계: PCAP, 파이썬 마스터"
  ],
  },
  {
 title: "모바일 프로그래밍",
 semester: "2학기",
 nessel:  "전공선택",
 professor: "김아욱",
 year: 3, // 학년 정보 추가
 description: "안드로이드 플랫폼을 사용하여 모바일 애플리케이션을 개발하는 방법을 배우는 수업입니다.",
 credits: 3,
 difficulty: "중",
 prerequisites: "없음",
 details: [
 "핵심 내용: 이 강의는 모바일 애플리케이션 개발을 다룹니다. 주로 안드로이드 플랫폼을 사용하여 앱을 만드는 방법을 배우게 됩니다. 수업에서는 안드로이드 스튜디오를 사용하여 앱의 기본적인 구조를 만들고, UI를 디자인하며, 다양한 기능을 구현하는 방법을 배웁니다. 예를 들어, 간단한 메모장 앱이나 계산기 앱을 만들어 봅니다.",
 "수업 방식: 이론 + 실습 + 과제.",
 "사용 언어: 자바",
 "연계 과목: 소프트웨어공학, 인공지능",
 "자격증 연계: 모바일앱 개발 전문가, OCJP"
 ],
 },
 {
  title: "전공영어",
  semester: "2학기",
  nessel:  "전공선택",
  professor: "김아욱",
  year: 3, // 학년 정보 추가
  description: "취업에 필요한 영어 능력을 향상시키는 수업입니다.",
  credits: 3,
  difficulty: "중",
  prerequisites: "없음",
  details: [
  "핵심 내용: 이 강의는 취업에 필요한 영어 능력을 향상시키는 것을 목표로 합니다. 수업에서는 이력서 작성, 인터뷰 준비, 영어 프레젠테이션 등을 연습하게 됩니다. 예를 들어, 자신의 기술과 경험을 영어로 설명하는 연습을 합니다.",
  "수업 방식: 취업 관련 활용 영어.",
  "사용 언어: 영어",
  "연계 과목: 없음",
  "자격증 연계: 없음"
  ],
  },
  {
  title: "알고리즘",
  semester: "2학기",
  nessel:  "전공선택",
  professor: "김용석, 김도형",
  year: 3, // 학년 정보 추가
  description: "효율적인 프로그램 작성을 위한 알고리즘을 다루는 수업입니다.",
  credits: 3,
  difficulty: "상",
  prerequisites: "자료구조",
  details: [
  "핵심 내용: 이 강의는 효율적인 프로그램 작성을 위한 알고리즘을 다룹니다. 알고리즘은 문제를 해결하기 위한 단계적인 절차입니다. 수업에서는 다양한 알고리즘(예: 정렬, 탐색, 그래프 알고리즘 등)의 기본 개념과 이를 구현하는 방법을 배우게 됩니다. 예를 들어, 데이터를 정렬하거나 특정 값을 찾는 알고리즘을 배우고 이를 프로그래밍 언어로 구현해 봅니다.",
  "수업 방식: 이론 중심, 일주일에 2일.",
  "사용 언어: C, 파이썬, 자바, C++",
  "연계 과목: 자료구조, 인공지능",
  "자격증 연계: 정보처리기사"
    ],
    },
  {
  title: "문제해결프로그래밍",
  semester: "2학기",
  nessel: "전공선택",
  professor: "하진영",
  year: 3, // 학년 정보 추가
  description: "실제 문제를 해결하기 위해 프로그래밍을 사용하는 방법을 배우는 수업입니다.",
  credits: 3,
  difficulty: "중",
  prerequisites: "없음",
  details: [
  "핵심 내용: 이 강의는 실제 문제를 해결하기 위해 프로그래밍을 사용하는 방법을 다룹니다. 수업에서는 다양한 문제를 해결하기 위한 전략과 이를 구현하는 방법을 배우게 됩니다. 예를 들어, 특정 조건을 만족하는 경로를 찾거나, 데이터를 효율적으로 처리하는 프로그램을 작성해 봅니다.",
  "수업 방식: 이론 + 실습 + 주차별 과제.",
  "사용 언어: 자바, C",
  "연계 과목: 자료구조, 알고리즘",
  "자격증 연계: SW 개발자 자격증, SW테스트 전문가 자격증"
  ],
  },
  {
  title: "시스템 프로그래밍",
  semester: "2학기",
  nessel:  "전공선택",
  professor: "송원준",
  year: 3, // 학년 정보 추가
  description: "시스템 소프트웨어를 작성하는 방법을 배우는 수업입니다.",
  credits: 3,
  difficulty: "상",
  prerequisites: "리눅스프로그래밍",
  details: [
  "핵심 내용: 이 강의는 시스템 소프트웨어를 작성하는 방법을 다룹니다. 시스템 소프트웨어는 컴퓨터 하드웨어와 상호작용하는 프로그램입니다. 수업에서는 어셈블리 언어를 사용하여 하드웨어의 동작 원리를 배우고, 운영체제의 기능을 활용하는 방법을 다룹니다. 예를 들어, 메모리 관리나 프로세스 제어와 관련된 프로그램을 작성해 봅니다.",
  "수업 방식: 이론 + 프로그래밍 과제.",
  "사용 언어: C, 어셈블리어",
  "연계 과목: 리눅스프로그래밍, 운영체제",
  "자격증 연계: 리눅스 마스터, 정보처리기사"
   ],
   },
   {
   title: "마이크로프로세서",
  semester: "2학기",
  nessel:  "전공선택",
  professor: "김용석",
  year: 3, // 학년 정보 추가
  description: "컴퓨터 시스템의 핵심 구성요소인 마이크로프로세서(CPU)에 대해 배우는 수업입니다.",
  credits: 3,
  difficulty: "중",
  prerequisites: "운영체제",
  details: [
  "핵심 내용: 이 강의는 컴퓨터 시스템의 핵심 구성요소인 마이크로프로세서(CPU)에 대해 배웁니다. 마이크로프로세서는 컴퓨터의 두뇌로, 모든 연산과 작업을 처리합니다. 수업에서는 마이크로프로세서가 어떻게 작동하는지, 어셈블리 언어와 C 언어를 사용하여 프로그래밍하는 방법을 배웁니다. 예를 들어, 컴퓨터가 명령을 처리하고, 데이터를 이동시키고, 장치를 제어하는 방법을 학습합니다. 또한, ARM과 X86 같은 다양한 종류의 프로세서에 대해 배우며, 각각의 특성과 차이점을 이해합니다.",
  "수업 방식: 이론 중심, 일주일에 2일.",
  "사용 언어: C, 어셈블리어",
  "연계 과목: 없음",
  "자격증 연계: 임베디드 소프트웨어 개발 전문가, 컴퓨터 시스템응용 기술사"
  ],
  },
  {
   title: "데이터 분석 프로그래밍",
   semester: "2학기",
   nessel:  "전공선택",
   professor: "최현수",
   year: 3, // “학년 정보 추가”,
   description: "데이터 분석에 널리 사용되는 파이썬 프로그래밍 언어를 배우는 수업입니다.",
   credits: 3,
   difficulty: "중",
   prerequisites: "없음",
   details: [
   "핵심 내용: 이 강의는 데이터 분석에 널리 사용되는 파이썬 프로그래밍 언어를 배우는 것을 목표로 합니다. 파이썬은 사용하기 쉽고 강력한 기능을 제공하는 언어로, 데이터 분석에서 많이 사용됩니다. 수업에서는 파이썬의 기본 문법을 배우고, 데이터 분석에 필수적으로 사용되는 여러 도구(numpy, pandas, sklearn)의 사용법을 학습합니다.",
  "데이터 분석 도구",
  "numpy : 수치 데이터를 효율적으로 처리할 수 있는 라이브러리",
  "pandas : 테이블 형태의 데이터를 다루는 데 유용한 라이브러리",
  "sklearn : 기계 학습과 데이터 분석을 위한 다양한 도구를 제공",
  "데이터 시각화 : 데이터를 그래프로 시각적으로 표현하는 방법을 배운다.",
  "데이터 전처리 : 데이터를 분석하기 전에 필요한 정리 및 변환 작업을 수행한다.",
  "기초적인 데이터 분석 방법",
  "회귀분석 : 데이터를 사용해 예측 모델을 만드는 방법",
  "분류 : 데이터를 그룹별로 나누는 방법",
  "자격증 연계 : 데이터 분석 준전문가(ADsP), 데이터 전문가(DAP)"
 
  ],
   
  },
  {
   title: "운영체제",
   semester: "1학기",
   nessel:  "전공필수",
   professor: "정인범",
   year: 3, // 학년 정보 추가
   description: "컴퓨터의 기본 시스템 소프트웨어인 운영체제에 대해 기능, 구조 및 구현방법을 학습한다",
   credits: 3 ,
   difficulty: "상",
   prerequisites: "자료구조,컴퓨터구조, 소프트웨어공학",
   details: [
   "핵심내용: 이 강의는 컴퓨터의 운영체제(OS)에 대해 다룹니다. 운영체제는 컴퓨터 하드웨어와 소프트웨어 자원을 관리하고, 프로그램들이 효율적으로 실행될 수 있도록 도와주는 중요한 시스템 소프트웨어입니다. 수업에서는 운영체제의 기본 기능(예: 메모리 관리, 프로세스 관리, 파일 시스템, 입출력 시스템 등)과 구조를 배우고, 운영체제가 어떻게 자원을 관리하고 프로그램을 실행하는지를 학습합니다. 예를 들어, 운영체제가 메모리를 어떻게 할당하고 관리하는지, 여러 프로그램이 동시에 실행될 때 어떻게 처리하는지 등을 배운다.",
   "수업 방식: 조교님의 이론 강의",
   "사용 언어 : C",
   "자격증 연계: 정보처리기사"
    ],
  },
  {
   title: "운영체제",
   semester: "1학기",
   nessel:  "전공필수",
   professor: "김용",
   year: 3, // 학년 정보 추가
   description: "컴퓨터의 기본 시스템 소프트웨어인 운영체제에 대해 기능, 구조 및 구현방법을 학습한다",
   credits: 3 ,
   difficulty: "상",
   prerequisites: "자료구조,컴퓨터구조, 소프트웨어공학",
   details: [
   
   "핵심내용: 이 강의는 컴퓨터의 운영체제(OS)에 대해 다룹니다. 운영체제는 컴퓨터 하드웨어와 소프트웨어 자원을 관리하고, 프로그램들이 효율적으로 실행될 수 있도록 도와주는 중요한 시스템 소프트웨어입니다. 수업에서는 운영체제의 기본 기능(예: 메모리 관리, 프로세스 관리, 파일 시스템, 입출력 시스템 등)과 구조를 배우고, 운영체제가 어떻게 자원을 관리하고 프로그램을 실행하는지를 학습합니다. 예를 들어, 운영체제가 메모리를 어떻게 할당하고 관리하는지, 여러 프로그램이 동시에 실행될 때 어떻게 처리하는지 등을 배운다.",
   "수업 방식:  이론 수업 + 매주 요약 과제",
   "사용 언어 : C,  자바, 어셈블리어",
   "자격증 연계: 정보처리기사"
   ]
   },
   {
    title: "데이터통신",
    semester: "1학기",
    nessel:  "전공선택",
    professor: "최미정",
    year: 3, // 학년 정보 추가
    description: "디지털 데이터 통신의 7단계 과정과 각 단계에서 사용되는 기술과 방법을 학습한다.",
    credits: 3 ,
    difficulty: "상",
    prerequisites: "컴퓨터네트워크",
    details: [
    
    "핵심내용: 이 강의는 컴퓨터 네트워크의 기초 개념을 다룹니다. 데이터통신은 컴퓨터 간에 데이터를 전송하는 방법과 기술을 다룬다. 수업에서는 네트워크의 7계층 모델(OSI 모델)을 배우고, 각 계층이 하는 역할과 주요 프로토콜에 대해 학습한다. 예를 들어, 인터넷에서 데이터를 주고받을 때 사용하는 IP 주소, TCP/UDP 프로토콜, 네트워크 장비(라우터, 스위치 등)의 역할 등을 배우게 된다. 또한 와이어샤크라는 네트워크 분석 도구를 사용하여 실제 네트워크 트래픽을 분석하는 실습도 진행다.",
    "수업 방식: 이론 강의 + 와이어샤크 실습 과제",
    "사용 언어 : 없음",
    "자격증 연계: 정보처리기사, 정보통신기사, ADsP(데이터 분석 준전문가)"
    ]
    },
    {
      title: "사물인터넷실습",
      semester: "1학기",
      nessel:  "전공선택",
      professor: "정인범",
      year: 3, // 학년 정보 추가
      description: "아두이노를 사용한 사물인터넷 구성 및 실습을 학습한다.",
      credits: 3 ,
      difficulty: "중",
      prerequisites: "C언어, 리눅스 프로그래밍, 임베디드시스템",
      details: [
      "핵심내용: 이 강의는 사물인터넷(IoT) 시스템을 설계하고 구현하는 방법을 다룬다. 사물인터넷은 인터넷에 연결된 장치들이 데이터를 주고받고 상호작용하는 시스템을 의미한다. 수업에서는 아두이노와 같은 마이크로컨트롤러를 사용하여 다양한 센서와 액추에이터를 제어하는 방법을 배운다. 예를 들어, 온도 센서를 사용하여 온도를 측정하고, LED를 켜고 끄는 등의 실습을 통해 IoT 시스템을 구현한다.",
      "수업 방식: 이론 강의 + 실습",
      "사용 언어 : 없음",
      "자격증 연계: IoT지식능력검정시험 "
      
      ],
      
      },
      {
        title: "컴퓨터시스템보안",
        semester: "1학기",
        nessel:  "전공선택",
        professor: "이헌길",
        year: 3, // 학년 정보 추가
        description: "컴퓨터 및 네트워크에서 보안에 관한 지식을 학습한다.",
        credits: 3 ,
        difficulty: "상",
        prerequisites: "운영체제, 데이터베이스, 컴퓨터프로그래밍, 컴퓨터네트워크",
        details: [
        "핵심내용:  이 강의는 컴퓨터 시스템의 보안에 대해 다룬다. 컴퓨터 시스템 보안은 시스템과 데이터를 보호하는 방법을 연구하는 분야이다. 수업에서는 다양한 보안 위협(예: 해킹, 바이러스, 악성코드 등)에 대해 배우고, 이러한 위협으로부터 시스템을 보호하기 위한 기술과 방법을 학습한다. 예를 들어, 암호화 기술, 인증 방법, 네트워크 보안, 접근 제어 등의 개념을 배우고, 이를 적용하여 시스템을 안전하게 보호하는 방법을 학습한다.",
        "수업 방식: 이론 강의 ",
        "사용 언어 : 없음",
        "자격증 연계: 정보보안기사, CISSP, CISA "
        
        ],
        
        },
        
        {
          title: "컴퓨터구조",
          semester: "2학기",
          nessel:  "전공필수",
          professor: "이상민",
          year: 3, // 학년 정보 추가
          description: "컴퓨터의 구성, 프로그램 실행의 기본 원리를 학습한다.",
          credits: 3 ,
          difficulty: "상",
          prerequisites: "시스템프로그래밍, 리눅스프로그래밍, 운영체제",
          details: [
          "핵심내용: 이 강의는 컴퓨터 하드웨어의 구조와 동작 원리를 다룬다. 컴퓨터 구조는 CPU, 메모리, 저장장치 등의 하드웨어 구성 요소들이 어떻게 상호작용하는지를 연구하는 분야이다. 수업에서는 CPU의 동작 원리, 명령어 처리 과정, 메모리 계층 구조, 입출력 시스템 등에 대해 배우게 된다. 예를 들어, 프로그램이 어떻게 메모리에 저장되고 실행되는지, CPU가 명령어를 어떻게 처리하는지 등을 학습한다.",
          "수업 방식: 이론 강의 + 발표 ",
          "사용 언어 : 없음",
          "자격증 연계:  정보처리기사, 컴퓨터구조기사, 전자계산기조직응용기사"
          
          ],
          
          },
          
          {
          title: "데이터베이스",
          semester: "2학기",
          nessel:  "전공선택",
          professor: "문양세",
          year: 3, // 학년 정보 추가
          description: "데이터베이스의 기본 개념, 모델, 언어에 대해 학습한다. 이론을 바탕으로 SQL 프로그래밍을 진행한다.",
          credits: 3 ,
          difficulty: "중",
          prerequisites: "선수: 자료구조 / 후속: 데이터베이스프로그래밍",
          details: [
          "핵심내용:  이 강의는 데이터베이스 시스템의 기본 개념과 SQL(Structured Query Language) 프로그래밍을 다룬다. 데이터베이스는 대량의 데이터를 효율적으로 저장하고 관리하는 시스템이다. 수업에서는 데이터베이스 모델링, 관계형 데이터베이스, SQL을 사용한 데이터 조작 등을 배우게 된다. 예를 들어, 고객 정보나 제품 정보를 저장하고 관리하는 데이터베이스를 설계하고, SQL을 사용하여 데이터를 삽입, 수정, 삭제, 검색하는 방법을 학습한다.",
          "수업 방식: 강의 + SQL 실습 ",
          "사용 언어 : 없음",
          "자격증 연계:  정보처리기사, SQLD, ADsP "
          
          ],
          
          },
          {
            title: "디지털영상처리",
            semester: "2학기",
            nessel:  "전공선택",
            professor: "김윤",
            year: 3, // 학년 정보 추가
            description: " 사진과 영상을 더 선명하게 만들고, 잃어버린 정보를 복구하며, 저장 공간을 줄이고, 이미지 속 물체를 인식하는 기술을 학습한다. ",
            credits: 3 ,
            difficulty: "중",
            prerequisites: "선수: 기본수학 / 후속 : 컴퓨터비전",
            details: [
            "핵심내용:  이 강의는 디지털 영상 처리 기술을 다룬다. 디지털 영상 처리는 디지털 이미지나 비디오를 분석하고 변환하는 기술이다. 수업에서는 이미지 필터링, 엣지 검출, 색상 변환 등의 기본 개념과 알고리즘을 배우고, C++을 사용하여 이러한 알고리즘을 구현하는 실습을 진행한다. 예를 들어, 디지털 이미지를 필터링하여 노이즈를 제거하거나, 엣지 검출 알고리즘을 사용하여 이미지의 경계를 추출하는 방법을 학습한다.",
            "수업 방식:  이론 + 실습 ",
            "사용 언어 : c++",
            "자격증 연계:  디지털영상편집 1급"
            
            ],
            
            },
            
            {
            title: "인공지능",
            semester: "2학기",
            nessel:  "전공선택",
            professor: "최형진",
            year: 3, // 학년 정보 추가
            description: " 인공지능의 제반 주제에 대해 학습한다. ",
            credits: 3 ,
            difficulty: "중",
            prerequisites: "없음",
            details: [
            "핵심내용: 이 강의는 인공지능(AI)의 기초 개념과 기술을 다룬다. 인공지능은 컴퓨터가 인간처럼 생각하고 학습할 수 있도록 만드는 기술이다. 수업에서는 인공지능의 역사, 기본 원리, 다양한 AI 기술(예: 기계학습, 자연어 처리, 컴퓨터 비전 등)을 배우고, 이러한 기술이 실제로 어떻게 적용되는지 학습한다. 예를 들어, 기계학습 알고리즘을 사용하여 데이터를 분석하고 예측하는 방법을 배우고, 이를 활용한 다양한 응용 사례를 학습한다. ",
            "수업 방식:  이론 강의 + 토론 ",
            "사용 언어 : 없음",
            "자격증 연계:  없음"
            
            ],
            
            },
            {
              title: "임베디드시스템",
              semester: "2학기",
              nessel:  "전공선택",
              professor: "정인범",
              year: 3, // 학년 정보 추가
              description: " 세탁기, 스마트폰, 자동차 등에 들어있는 임베디드 형태의 컴퓨터 시스템에 대한 기본적 구조와 동작에 대해 학습한다. ",
              credits: 3 ,
              difficulty: "중",
              prerequisites: "C프로그래밍, 리눅스프로그래밍, 사물인터넷실습, 운영체제",
              details: [
              "핵심내용: 이 강의는 임베디드 시스템의 기초 개념과 설계 방법을 다룬다. 임베디드 시스템은 특정 기능을 수행하기 위해 설계된 컴퓨터 시스템으로, 자동차, 가전제품, 의료기기 등 다양한 장치에 사용된다. 수업에서는 마이크로컨트롤러의 기본 원리, 임베디드 시스템 설계 방법, C 프로그래밍을 사용한 임베디드 소프트웨어 개발 등을 배우게 된다. 예를 들어, 라즈베리 파이를 사용하여 간단한 임베디드 시스템을 설계하고 구현하는 실습을 진행한다.",
              "수업 방식:  이론 강의 + 실습 ",
              "사용 언어 : C",
              "자격증 연계: 임베디드 소프트웨어 개발 전문가, 임베디드 기사, 정보처리기사"
              
              ],
              
              },
              
              {
              title: "컴퓨터네트워크",
              semester: "2학기",
              nessel:  "전공선택",
              professor: "최미정",
              year: 3, // 학년 정보 추가
              description: " 데이터 통신 강의와 이어서 컴퓨터 통신망의 상위 계층 기술과 방법에 대해 학습한다. ",
              credits: 3 ,
              difficulty: "중",
              prerequisites: "데이터통신",
              details: [
              "핵심내용: 이 강의는 컴퓨터 네트워크의 기초 개념과 기술을 다룬다. 컴퓨터 네트워크는 여러 대의 컴퓨터가 데이터를 주고받을 수 있도록 연결된 시스템이다. 수업에서는 네트워크 프로토콜, 네트워크 장비(라우터, 스위치 등), 인터넷의 구조와 동작 원리 등을 배우게 된다. 예를 들어, 인터넷에서 데이터를 전송하는 방법, IP 주소 체계, 네트워크 보안 등의 주제를 학습한다.",
              "수업 방식:  이론 강의 ",
              "사용 언어 : 없음",
              "자격증 연계: 정보처리기사, 정보통신기사"
              
              ],
              
              },
              {
                title: "컴퓨터애니메이션",
                semester: "2학기",
                nessel:  "전공선택",
                professor: "김종민",
                year: 3, // 학년 정보 추가
                description: " 컴퓨터가 사람처럼 이미지를 보고 이해할 수 있게 만드는 기술을 학습한다. ",
                credits: 3 ,
                difficulty: "중",
                prerequisites: "파이썬프로그래밍, 벡터 연산 및 선형대수학",
                details: [
                "이 강의는 컴퓨터 애니메이션의 기초 이론과 중요한 연구 주제를 다룬다. 컴퓨터 애니메이션은 캐릭터나 물체를 컴퓨터를 이용해 움직이는 기술이다.",
                "- 이론 강의",
                "- 모션 캡쳐: 실제 사람의 움직임을 기록하고, 이를 컴퓨터 애니메이션에 적용하는 기술이다. 예를 들어, 배우의 움직임을 기록하여 애니메이션 캐릭터가 같은 동작을 하게 할 수 있다.",
                "- 얼굴 애니메이션: 캐릭터의 얼굴 표정을 자연스럽게 만드는 기술이다. 얼굴 근육의 움직임을 시뮬레이션하여 다양한 표정을 구현한다.",
                "- 역기구학: 캐릭터의 손이나 발 같은 특정 부분의 위치를 지정하면, 나머지 관절의 움직임을 계산하여 자연스러운 자세를 만드는 기술이다.딥러닝 기반 캐릭터 애니메이션: 인공지능 기술을 이용하여 캐릭터의 움직임을 학습하고 생성하는 방법이다.",
                "- 과제",
                "- 이론에서 배운 내용을 바탕으로 간단한 컴퓨터 애니메이션을 프로그래밍 과제를 통해 직접 구현해 본다. 파이썬을 사용하여 애니메이션의 기본 개념을 코드로 작성해보는 실습을 진행한다.",
                "수업 방식:  이론 강의  ",
                "사용 언어 : 파이썬",
                "자격증 연계: 그래픽스 기술사, 멀티미디어콘텐츠 제작전문가"
                
                ],
                
                },
                
                {
                title: "기계학습",
                semester: "1학기",
                nessel:  "전공선택",
                professor: "이창기",
                year: 4, // 학년 정보 추가
                description: " 데이터를 이용해 컴퓨터가 스스로 학습하고 예측을 수행하는 기술에 대해 학습한다. ",
                credits: 3 ,
                difficulty: "상",
                prerequisites: "파이썬, 데이터분석프로그래밍, 알고리즘, 자료구조, 선형대수학 ",
                details: [ 
                "이 강의는 기계학습에 대해 다룬다. 기계학습은 컴퓨터가 데이터를 분석하고 학습하여 스스로 개선할 수 있는 능력을 기르는 기술이다. 수업에서는 다양한 기계학습 모델(예: K-최근접 이웃, 결정 트리, 서포트 벡터 머신, 통계 모델, 딥러닝 등)의 이론적 배경을 배우고, 오픈 소스 툴킷을 사용하여 실제 문제를 해결하는 방법을 실습한다. 예를 들어, 데이터를 분석하여 패턴을 찾고 예측 모델을 만드는 프로젝트를 수행다.",
                "수업 방식:  이론 강의 ",
                "사용 언어 : 없음",
                "자격증 연계: 데이터 분석 준전문가(ADsP) , TensorFlow Developer Certificate, AWS Certified Machine Learning - Specialty"
                
                ],
                
                },
                
                {
                title: "데이터베이스프로그래밍",
                semester: "1학기",
                nessel:  "전공선택",
                professor: "김진호",
                year: 4, // 학년 정보 추가
                description: " 데이터를 효율적으로 저장, 조회, 수정, 삭제할 수 있는 방법과 시스템을 구축하는 기술을 배운다. ",
                credits: 3 ,
                difficulty: "중",
                prerequisites: "데이터베이스",
                details: [ 
                "이 강의는 Spring 프레임워크를 사용하여 데이터베이스를 프로그래밍하는 방법을 다룬다. Spring은 자바 기반의 프레임워크로, 효율적인 데이터베이스 연동과 웹 애플리케이션 개발에 사용된다. 수업에서는 데이터베이스 설계, SQL 쿼리 작성, 데이터베이스와의 연동 방법 등을 배우고, 이를 실습 과제를 통해 직접 구현해본다. 예를 들어, 웹 애플리케이션에서 데이터베이스를 이용하여 사용자 정보를 저장하고 관리하는 프로젝트를 수행한다.",
                "수업 방식:  이론 강의 + 실습 과제",
                "사용 언어 : 자바",
                "자격증 연계: DAsP, DAP"
                
                ],
                
                },
                {
                  title: "소프트웨어공학",
                  semester: "1학기",
                  nessel:  "전공선택",
                  professor: "정인범",
                  year: 4, // 학년 정보 추가
                  description: " 소프트웨어 개발에 필요한 기술을 학습한다. ",
                  credits: 3 ,
                  difficulty: "중",
                  prerequisites: "C, 리눅스 프로그래밍",
                  details: [ 
                  "이 강의는 소프트웨어 개발 과정에서 사용되는 이론과 원칙을 다룬다. 소프트웨어공학은 대규모 소프트웨어 시스템을 체계적이고 효율적으로 개발하기 위한 방법론을 연구하는 분야이다. 수업에서는 소프트웨어 개발 생명주기, 요구사항 분석, 설계, 구현, 테스트, 유지보수 등의 과정을 배우고, 소프트웨어 프로젝트 관리 기법도 학습한다. 예를 들어, 소프트웨어 개발 프로젝트에서 팀원들과 협력하여 요구사항을 정의하고, 시스템 설계를 작성하는 과제를 수행한다",
                  "수업 방식:  이론 강의  ",
                  "사용 언어 : C",
                  "자격증 연계: 정보처리기사, 소프트웨어 개발 보안 전문가, PMP"
                  ],
                  
                  },
                  
                  {
                  title: "인간컴퓨터상호작용",
                  semester: "1학기",
                  nessel:  "전공선택",
                  professor: "최우혁",
                  year: 4, // 학년 정보 추가
                  description: " 사용자와 컴퓨터간의 효율적인 상호작용을 위한 디자인 기법과 원리를 학습한다. ",
                  credits: 3 ,
                  difficulty: "중",
                  prerequisites: "없음",
                  details: [ 
                  "이 강의는 인간과 컴퓨터가 상호작용하는 방법을 연구한다. 인간컴퓨터상호작용(HCI)은 사용자가 컴퓨터 시스템이나 프로그램을 사용할 때의 경험을 개선하기 위한 이론과 기술을 다룬다. 수업에서는 사용자 인터페이스 설계 원칙, 사용성 평가 방법 등을 배우고, 팀 프로젝트를 통해 실제로 사용자가 편리하게 사용할 수 있는 시스템을 설계한다. 예를 들어, 사용자 중심의 웹사이트나 애플리케이션을 설계하고, 프로토타입을 제작하여 사용자 테스트를 진행한다.",
                  "수업 방식:  이론 + 팀플  ",
                  "사용 언어 : 없음",
                  "자격증 연계: 없음"
                  
                  ],
                  
                  },
                  
                  {
                  title: "캡스톤디자인1,2",
                  semester: "1학기,2학기",
                  nessel:  "전공선택(선택이나 1학기,2학기 중 하나는 무조건 수강해야한다)",
                  professor: " ",
                  year: 4, // 학년 정보 추가
                  description: " ",
                  credits: 3 ,
                  difficulty: " ",
                  prerequisites: "없음",
                  details: [ 
                  " 이 강의는 학생들이 실제 프로젝트를 수행하면서 실무 능력을 키우는 것을 목표로 한다. 학생들은 팀을 이루어 아이디어를 도출하고, 프로젝트를 계획하고, 구현하며, 최종 결과물을 발표한다. 프로젝트 주제는 학생들이 직접 선택하며, 교수님의 지도를 받는다. 예를 들어, 소프트웨어 애플리케이션, 하드웨어 시스템, 융합 프로젝트 등 다양한 분야의 프로젝트를 수행하게 된다.",
                  "수업 방식:  학생 프로젝트 진행  ",
                  "사용 언어 : 없음",
                  "자격증 연계: 없음"
                  
                  ],
                  
                  },

                  {
                    title: "컴퓨터비전",
                    semester: "1학기",
                    nessel:  "전공선택",
                    professor: "김윤",
                    year: 4, // 학년 정보 추가
                    description: " ",
                    credits: 3 ,
                    difficulty: "상",
                    prerequisites: "C++, 디지털영상처리",
                    details: [ 
                    "이 강의는 컴퓨터 비전 기술을 다룬다. 컴퓨터 비전은 컴퓨터가 디지털 이미지를 분석하고 이해하는 기술이다. 수업에서는 이미지 처리, 객체 인식, 이미지 분할, 영상 추적 등의 기법을 배우고, C++을 사용하여 이러한 기법들을 구현하는 실습을 진행한다. 예를 들어, 컴퓨터가 사진 속 얼굴을 인식하거나, 동영상에서 움직이는 물체를 추적하는 프로그램을 작성한다.",
                    "수업 방식:  이론 강의 + 실습  ",
                    "사용 언어 : c++",
                    "자격증 연계: 딥러닝 전문가 "
                    
                    ],
                    
                    },
                    {
                      title: "실전코딩",
                      semester: "1학기",
                      nessel:  "전공선택",
                      professor: "김승남",
                      year: 4, // 학년 정보 추가
                      description: "자바 프로그래밍을 쉽게 할 수 있도록 하는 도구인 스프링 프레임워크의 기본 구조와 중요한 개념을 예제를 통해 학습한다. ",
                      credits: 3 ,
                      difficulty: "중",
                      prerequisites: "자바1,2 ",
                      details: [ 
                      "이 강의는 Spring 프레임워크를 사용한 실제 코딩을 다룹니다. 수업에서는 Spring의 기본 개념과 핵심 기능을 배우고, 이를 실습을 통해 직접 구현해 봅니다. 예를 들어, 웹 애플리케이션을 개발하면서 데이터베이스와 연동하고, 사용자 인증 기능을 추가하는 등의 실습을 진행합니다. 학생들은 매주 주어진 예제와 과제를 통해 실무에서 필요한 코딩 능력을 키우게 됩니다.",
                      "수업 방식:  이론 강의 + 실습  ",
                      "사용 언어 : 자바(Spring)",
                      "자격증 연계: DAsP, DAP "
                      
                      ],
                      
                      },
                      {
                        title: "영상통신",
                        semester: "2학기",
                        nessel:  "전공선택",
                        professor: "김만배",
                        year: 4, // 학년 정보 추가
                        description: "영상 데이터 통신 및 압축에 필요한 기술을 학습한다.  ",
                        credits: 3 ,
                        difficulty: "중",
                        prerequisites: "컴퓨터그래픽스",
                        details: [ 
                        "이 강의는 영상 통신 기술을 다룬다. 영상 통신은 디지털 영상을 압축하고 전송하는 기술이다. 수업에서는 JPEG, MPEG 등 영상 압축 포맷의 원리와 알고리즘을 배우고, 이를 수학적으로 이해한다. 예를 들어, 이미지나 동영상을 압축하여 저장 공간을 절약하고, 네트워크를 통해 효율적으로 전송하는 방법을 학습한다. 수업에서는 관련된 수학 공식과 알고리즘을 깊이 있게 다룬다.",
                        "수업 방식:  이론 강의 ",
                        "사용 언어 : C++",
                        "자격증 연계: 정보통신기사, 방송통신기사 "
                        
                        ],
                        
                        },
                        {
                          title: "정보검색",
                          semester: "2학기",
                          nessel:  "전공선택",
                          professor: "이창기",
                          year: 4, // 학년 정보 추가
                          description: "정보검색의 기본 개념과 원리에 대해 학습하고 다양한 검색 모델에 대해 학습한다.  ",
                          credits: 3 ,
                          difficulty: "중",
                          prerequisites: "자료구조, 알고리즘, 데이터베이스 ",
                          details: [ 
                          "이 강의는 정보검색 시스템의 기본 개념과 원리를 다룬다. 정보검색은 대량의 데이터에서 사용자가 원하는 정보를 효율적으로 찾는 기술이다. 수업에서는 검색 엔진의 작동 원리, 검색 알고리즘, 검색 모델 등을 배우고, 다양한 검색 기술을 학습한다. 예를 들어, 텍스트 데이터를 분석하고 색인화하여 검색 결과를 빠르게 제공하는 방법을 배운다. 온라인 수업과 대면 수업을 통해 이론을 배우고, 실습을 통해 이를 적용한다.",
                          "수업 방식:  블렌디드 수업 ",
                          "사용 언어 : 없음",
                          "자격증 연계: 검색엔진 최적화 전문가 자격증 "
                          
                          ],
                          
                          },
                          {
                            title: "자연어처리",
                            semester: "2학기",
                            nessel:  "전공선택",
                            professor: "이창기",
                            year: 4, 
                            description: "데이터 분석을 위해 컴퓨터가 사람의 언어를 이해하고 처리하는 방법을 학습한다. ",
                            credits: 3 ,
                            difficulty: "상",
                            prerequisites: "자료구조, 알고리즘",
                            details: [ 
                            "이 강의는 자연어처리(NLP) 기술을 다룬다. 자연어처리는 컴퓨터가 인간의 언어를 이해하고 처리하는 기술이다. 수업에서는 텍스트 분석, 언어 모델링, 감정 분석, 번역 등의 기법을 배우고, 이러한 기법들을 실제로 구현하는 방법을 학습한다. 예를 들어, 텍스트 데이터를 분석하여 감정을 분류하거나, 자동 번역 시스템을 개발하는 과제를 수행한다.",
                            "수업 방식:  이론 강의 + 간단한 과제",
                            "사용 언어 : 없음",
                            "자격증 연계: SAS Certified Specialist in Natural Language "
                            
                            ],
                            
                            },
                            
                            {
                            title: "컴퓨터공학특론",
                            semester: "2학기",
                            nessel:  "전공선택",
                            professor: " ",
                            year: 4,
                            description: "컴퓨터공학 분야 최신 연구 동향 및 전문 기술 학습한다. ",
                            credits: 3 ,
                            difficulty: " ",
                            prerequisites: "없음",
                            details: [ 
                            " 특강 및 전문가 초청 세미나를 통해 컴퓨터공학 분양의 최신 연구 동향과 전문 기술에 대한 정보를 학습한다.",
                            "수업 방식:  이론 강의 ",
                            "사용 언어 : 없음",
                            "자격증 연계: 없음 "
                            
                            ],
                            
                            },
                            
                            
                        
   //과목추가
  ];

  const filteredCourses = courses.filter(course =>
    selectedYears.length === 0 || selectedYears.includes(course.year)
  );

  const getCardColor = (year: number) => {
    switch (year) {
      case 1:
        return "bg-blue-100";
      case 2:
        return "bg-green-100";
      case 3:
        return "bg-yellow-100";
      case 4:
        return "bg-red-100";
      default:
        return "bg-white";
    }
  };

  const groupedCourses = filteredCourses.reduce((acc, course) => {
    (acc[course.year] = acc[course.year] || []).push(course);
    return acc;
  }, {} as { [key: number]: Course[] });

  return (
    <div className="flex flex-col min-h-[100dvh] dark:bg-gray-900 dark:text-white">
      <header className="bg-[#0072C6] text-white py-4 px-6 flex items-center justify-between">
        <Link className="flex items-center gap-2" href="#">
          <BookIcon className="h-6 w-6" />
          <span className="text-lg font-semibold">CODECOMPASS</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <button className="hover:underline" onClick={() => setActiveMenu("홈")}>
            홈
          </button>
          <button className="hover:underline" onClick={() => setActiveMenu("전공 강좌")}>
            전공 강좌
          </button>
          <button className="hover:underline" onClick={() => setActiveMenu("진로 트랙")}>
            진로 트랙
          </button>
          <button className="hover:underline" onClick={() => setActiveMenu("연락처")}>
            연락처
          </button>
        </nav>
        <Button className="md:hidden" size="icon" variant="outline">
          <MenuIcon className="h-6 w-6" />
          <span className="sr-only">탐색 메뉴 토글</span>
        </Button>
      </header>
      <main className="flex-1 py-12 px-4 md:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          {activeMenu === "홈" && <Home handleViewCourses={handleViewCourses} handleViewTrack={handleViewTrack} handleViewContact={handleViewContact} />}
          {activeMenu === "전공 강좌" && <Courses courses={courses} handleOpenDialog={handleOpenDialog} selectedYears={selectedYears} handleCheckboxChange={handleCheckboxChange} groupedCourses={groupedCourses} getCardColor={getCardColor} />}
          {activeMenu === "진로 트랙" && <Career />}
          {activeMenu === "연락처" && <Contact />}
        </div>
      </main>
      <footer className="bg-[#0072C6] text-white py-6 px-4 md:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <BookIcon className="h-6 w-6" />
            <span className="text-lg font-semibold">CODECOMPASS</span>
          </div>
          <div className="text-sm">COPYRIGHT (C) 2024 BY CODECOMPASS TEAM. ALL RIGHTS RESERVED</div>
          <div className="text-sm">
            <Link className="hover:underline" href="#">
              문의하기
            </Link>
          </div>
        </div>
      </footer>
      {selectedCourse && (
        <Dialog open={openDialog} onOpenChange={handleCloseDialog}>
          <DialogContent className="p-6 bg-white rounded-lg shadow-lg dark:bg-gray-900 dark:text-white max-w-2xl w-full">
            <DialogHeader>
              <DialogTitle>{selectedCourse.title}</DialogTitle>
              <DialogDescription>{selectedCourse.description}</DialogDescription>
            </DialogHeader>
            <div className="space-y-2">
              <div>
                <span className="font-medium">과목 특징:</span>
                <ul className="list-disc pl-4">
                  {selectedCourse.details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleCloseDialog}>닫기</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

function BookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
