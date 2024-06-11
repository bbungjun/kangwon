'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card";
import { DialogTitle, DialogDescription, DialogHeader, DialogContent, DialogFooter, Dialog } from "@/components/ui/dialog";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import '../styles/globals.css';
import Head from 'next/head';



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

import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

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
