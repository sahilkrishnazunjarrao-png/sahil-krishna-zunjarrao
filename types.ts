
export enum UserRole {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER'
}

export enum AcademicYear {
  FIRST = 'First Year',
  SECOND = 'Second Year',
  THIRD = 'Third Year'
}

export interface Student {
  id: string;
  enrollmentNo: string;
  rollNo: string;
  examSeat: string;
  name: string;
  year: AcademicYear;
  departmentId: string;
}

export interface Department {
  id: string;
  name: string;
  code: string;
  hodName: string;
}

export interface K3Record {
  id: string;
  studentId: string;
  marks: number[]; // 1 to 12 experiments
  totalMarks: number;
  convertedMarks: number;
  academicYear: string;
  semester: string;
  courseCode: string;
}

export interface K4Record {
  id: string;
  studentId: string;
  saMarks: number;
  academicYear: string;
  semester: string;
  courseCode: string;
}

export interface K5Record {
  id: string;
  studentId: string;
  test1: number;
  test2: number;
  average: number;
  academicYear: string;
  semester: string;
  courseCode: string;
}

export interface K6Record {
  id: string;
  studentId: string;
  microProject: number;
  assignments: number;
  otherActivities: number;
  total: number;
  convertedSla: number;
  academicYear: string;
  semester: string;
  courseCode: string;
}
