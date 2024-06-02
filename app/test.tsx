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
  title: string; //과목이름 
  professor: string; // 교수명 
  description: string; //설명
  difficulty: string; //난이도 
  credits: number;   // 학점 
  prerequisites: string; // 선수과목 =>  연계과목 
  details: string[];//자세히 보기에 들어감
  year: number; // 학년 정보 추가(카드에 표시되지는 않음 )
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
      title: "컴퓨터 개론",
      professor: "김향미",
      year: 1, //학년 정보 추가 
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
      title: "자바프로그래밍1",
      professor: "하진영",
      year: 2, //학년 정보 추가 
      description: "자바 언어에 관하여 학습합니다.",
      credits: 3,
      difficulty: " 중 ",
      prerequisites: "자바2, 자료구조, 데이터베이스 프로그래밍, 실전코딩",
      details: [
        "핵심 내용: 자바는 전 세계적으로 많이 사용되는 프로그래밍 언어 중 하나로, 수업에서는 자바 프로그램을 실행하는 방법, 기본 문법(예 : 변수 선언, 조건문, 반복문 등) 을 배우고, 간단한 프로그램을 작성해 보는 실습을 합니다.  ex) 자바 언어로 계산기를 만들거나 하는 식",
        "수업 방식: 이론 + 실습, 주1회 이론수업, 1회 실습",
        "사용 언어: 자바"
      ],
    },
    {
      title: "자바프로그래밍1",
      professor: "하진영",
      year: 3, //학년 정보 추가 
      description: "자바 언어에 관하여 학습합니다.",
      credits: 3,
      difficulty: " 중 ",
      prerequisites: "자바2, 자료구조, 데이터베이스 프로그래밍, 실전코딩",
      details: [
        "핵심 내용: 자바는 전 세계적으로 많이 사용되는 프로그래밍 언어 중 하나로, 수업에서는 자바 프로그램을 실행하는 방법, 기본 문법(예 : 변수 선언, 조건문, 반복문 등) 을 배우고, 간단한 프로그램을 작성해 보는 실습을 합니다.  ex) 자바 언어로 계산기를 만들거나 하는 식",
        "수업 방식: 이론 + 실습, 주1회 이론수업, 1회 실습",
        "사용 언어: 자바"
      ],
    },
     {
      title: "자바프로그래밍1",
      professor: "하진영",
      year: 3, //학년 정보 추가 
      description: "자바 언어에 관하여 학습합니다.",
      credits: 3,
      difficulty: " 중 ",
      prerequisites: "자바2, 자료구조, 데이터베이스 프로그래밍, 실전코딩",
      details: [
        "핵심 내용: 자바는 전 세계적으로 많이 사용되는 프로그래밍 언어 중 하나로, 수업에서는 자바 프로그램을 실행하는 방법, 기본 문법(예 : 변수 선언, 조건문, 반복문 등) 을 배우고, 간단한 프로그램을 작성해 보는 실습을 합니다.  ex) 자바 언어로 계산기를 만들거나 하는 식",
        "수업 방식: 이론 + 실습, 주1회 이론수업, 1회 실습",
        "사용 언어: 자바"
      ],
    },
    
    
    // 다른 강의들도 추가

  ];

  const filteredCourses = courses.filter(course =>
    selectedYears.length === 0 || selectedYears.includes(course.year)
  );

  const getCardColor = (year: number) => {
    switch (year) {
      case 1:
        return "bg-blue-100"; // 1학년 과목 카드 색상
      case 2:
        return "bg-green-100"; // 2학년 과목 카드 색상
      case 3:
        return "bg-yellow-100"; // 3학년 과목 카드 색상
      case 4:
        return "bg-red-100"; // 4학년 과목 카드 색상
      default:
        return "bg-white"; // 기본 카드 색상
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
          <Link className="hover:underline" href="#">
            홈
          </Link>
          <Link className="hover:underline" href="#">
            전공 강좌
          </Link>
          <Link className="hover:underline" href="#">
            진로 트랙
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
          ))}
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
