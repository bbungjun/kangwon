'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card";
import { DialogTitle, DialogDescription, DialogHeader, DialogContent, DialogFooter, Dialog } from "@/components/ui/dialog";
import { RadioGroup } from "@/components/ui/radio-group";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";

// Course 인터페이스 정의
interface Course {
  title: string;
  professor: string;
  description: string;
  difficulty: string;
  credits: number;
  prerequisites: string;
  details: string[];
  year: number; // 학년 정보 추가
}

export default function Component() {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedYears, setSelectedYears] = useState<number[]>([]);

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

  const courses: Course[] = [
    {
      title: "운영체제 I",
      professor: "정인범",
      description: "컴퓨터의 기본 시스템 소프트웨어인 운영체제에 대해 기능, 구조 및 구현방법을 학습한다.",
      credits: 3,
      difficulty: " 중 ",
      prerequisites: "데이터 베이스, 자료구조, 컴퓨터구조",
      details: [
        "컴퓨터의 기본 시스템 소프트웨어인 운영체제에 대해 기능, 구조 및 구현방법을 학습한다.",
        "관련 자격증: 정보처리기사",
      ],
      year: 1, // 학년 정보 추가
    },
    {
      title: "데이터 통신",
      professor: "최미정",
      description: "데이터 통신에 적용되는 7계층 구조의 역할과 기술에 대해 학습한다.",
      credits: 3,
      difficulty: " 중 ",
      prerequisites: "컴퓨터 프로그래밍 I",
      details: [
        "핵심 학습 내용:이 강의는 컴퓨터 네트워크의 기초 개념을 다룹니다. 데이터통신은 컴퓨터 간에 데이터를 전송하는 방법과 기술을 다룹니다. 수업에서는 네트워크의 7계층 모델(OSI 모델)을 배우고, 각 계층이 하는 역할과 주요 프로토콜에 대해 학습합니다. 예를 들어, 인터넷에서 데이터를 주고받을 때 사용하는 IP 주소, TCP/UDP 프로토콜, 네트워크 장비(라우터, 스위치 등)의 역할 등을 배우게 됩니다. 또한 와이어샤크라는 네트워크 분석 도구를 사용하여 실제 네트워크 트래픽을 분석하는 실습도 진행합니다.",
        "수업방식: 100% 책(컴퓨터 네트워킹 하향식 접근)을 통한 이론 강의와 학기 당 한 번 정도의 와이어샤크 실습 과제",
        "관련 자격증: 정보처리기사, 정보통신기사, ADsP(데이터 분석 준전문가)",
      ],
      year: 2, // 학년 정보 추가
    },
    {
      title: "사물인터넷실습",
      professor: "정인범",
      description: "아두이노를 사용한 사물인터넷 구성 및 실습을 학습한다.",
      credits: 3,
      difficulty: " 중 ",
      prerequisites: "",
      details: [
        "수업방식: 이론 강의 보다는 매 시간 실습을 통해 수업을 진행한다.",
        "관련 자격증:  IoT지식능력검정시험",
        "사용언어: C"
      ],
      year:3
    },
    {
      title: "데이터베이스",
      professor: "문양세",
      description: "데이터베이스의 기본 개념, 모델, 언어에 대해 학습한다. 이론을 바탕으로 SQL 프로그래밍을 진행한다.",
      credits: 3,
      difficulty: " 중 ",
      prerequisites: "데이터베이스프로그래밍",
      details: [
        "수업방식: 강의 위주의 수업을 진행하되 일부는 SQL실습을 포함한다. 학기 당 4번의 SQL 실습 과제가 부여된다.",
        "관련 자격증: 정보처리기사, SQLD (SQL Developer),ADsP (Associate Data Scientist)",
        
        
      ],
      year:2
    },{
      title: "디지털 영상처리",
      professor: "김윤",
      description: "디지털 영상으로부터 원하는 정보를 얻기 위한 처리에 대해 학습한다.",
      credits: 3,
      difficulty: " 중 ",
      prerequisites: "컴퓨터비전, 인공지능",
      details: [
        "수업방식: 이론+실습, 매주 복습용 실습 과제가 부여된다.",
        "관련 자격증: 디지털영상편집 1급"
        
      ],
      year:3
      
    },{
      title: "임베디드시스템",
      professor: "정인범",
      description: "세탁기, 스마트폰, 자동차 등에 들어있는 임베디드 형태의 컴퓨터 시스템에 대한 기본적 구조와 동작에 대해 학습한다.",
      credits: 3,
      difficulty: " 중 ",
      prerequisites: "사물인터넷실습, 운영체제",
      details: [
        "수업방식: 이론수업과 실습을 병행한다. 매주 실습 과제가 부여된다.(라즈베리 파이)",
        "관련 자격증: 정보터리기사, 컴퓨터구조기사, 전자계산기조직응용기사"
        
      ],
      year:4
    },{
      title: "컴퓨터 네트워크",
      professor: "최미정",
      description: "데이터통신 강의와 이어서 컴퓨터 통신망의 상위 계층 프로토콜에 대해 학습한다.",
      credits: 3,
      difficulty: " 중 ",
      prerequisites: "데이터 통신",
      details: [
        "수업방식: 이론 위주의 수업을 진행한다. 학기 당 문제풀이 과제가 있음",
        "관련 자격증: 정보터리기사, 컴퓨터구조기사, 전자계산기조직응용기사"
        
      ],
      year:2
    },
    {
      title: "컴퓨터비전",
      professor: "김윤",
      description: "인공지능에게 시각적 정보를 제공하고, 인간이 보고 판단하는 능력을 구현하는 기술에 대해 학습한다.",
      credits: 3,
      difficulty: " 중 ",
      prerequisites: "디지털영상처리",
      details: [
        "수업방식: 이론+실습, 매주 복습용 실습 과제가 부여된다.",
        "관련 자격증: ."
        
      ],
      year:3
    },
    
    // 다른 강의들도 추가

  ];

  const filteredCourses = courses.filter(course =>
    selectedYears.length === 0 || selectedYears.includes(course.year)
  );

  return (
    <div className="flex flex-col min-h-[100dvh] dark:bg-gray-900 dark:text-white">
      <header className="bg-[#0072C6] text-white py-4 px-6 flex items-center justify-between">
        <Link className="flex items-center gap-2" href="#">
          <BookIcon className="h-6 w-6" />
          <span className="text-lg font-semibold">CODECOMPASS</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link className="hover:underline" href="#">
            홈
          </Link>
          <Link className="hover:underline" href="#">
            전공 강좌
          </Link>
          <Link className="hover:underline" href="#">
            교수진
          </Link>
          <Link className="hover:underline" href="#">
            연구 분야
          </Link>
          <Link className="hover:underline" href="#">
            연락처
          </Link>
        </nav>
        <Button className="md:hidden" size="icon" variant="outline">
          <MenuIcon className="h-6 w-6" />
          <span className="sr-only">탐색 메뉴 토글</span>
        </Button>
      </header>
      <main className="flex-1 py-12 px-4 md:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
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
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCourses.map((course, index) => (
              <Card key={index} className="max-w-sm">
                <CardHeader>
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium">교수:</span>
                      {course.professor}
                    </div>
                    <div>
                      <span className="font-medium">학점:</span>
                      {course.credits}
                    </div>
                    <div>
                      <span className="font-medium">난이도:</span>
                      {course.difficulty}
                    </div>
                    <div>
                      <span className="font-medium">연계 과목:</span>
                      {course.prerequisites}
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
