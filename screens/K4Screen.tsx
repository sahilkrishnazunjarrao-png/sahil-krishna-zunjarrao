
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserRole, AcademicYear, Student } from '../types';
import { DB } from '../db';

interface K4ScreenProps {
  user: { role: UserRole; year: AcademicYear };
}

interface K4Header {
  institute: string;
  semester: string;
  examPeriod: string;
  programme: string;
  course: string;
  courseCode: string;
  examDate: string;
  maxMarks: string;
  minMarks: string;
  saSchemeMax: string;
  internalName: string;
  internalDesig: string;
  internalMobile: string;
  externalName: string;
  externalDesig: string;
  externalMobile: string;
}

const K4Screen: React.FC<K4ScreenProps> = ({ user }) => {
  const navigate = useNavigate();
  const [studentsData, setStudentsData] = useState<any[]>([]);
  const [headerData, setHeaderData] = useState<K4Header>({
    institute: '',
    semester: '',
    examPeriod: '',
    programme: '',
    course: '',
    courseCode: '',
    examDate: '',
    maxMarks: '25',
    minMarks: '10',
    saSchemeMax: '25',
    internalName: '',
    internalDesig: '',
    internalMobile: '',
    externalName: '',
    externalDesig: '',
    externalMobile: ''
  });
  
  const isTeacher = user.role === UserRole.TEACHER;

  useEffect(() => {
    const students = DB.getStudentsByYear(user.year);
    const savedRecords = DB.getK4Records(user.year);
    const meta = DB.getK4Meta(user.year);

    if (meta) {
      setHeaderData(meta);
    }

    const merged = students.map(s => {
      const existing = savedRecords.find((r: any) => r.studentId === s.id);
      return {
        id: s.id,
        enrollmentNo: existing?.enrollmentNo || s.enrollmentNo,
        examSeat: existing?.examSeat || s.examSeat,
        name: existing?.name || s.name,
        saMarks: existing?.saMarks || 0
      };
    });
    setStudentsData(merged);
  }, [user.year]);

  const updateHeader = (field: keyof K4Header, val: string) => {
    if (!isTeacher) return;
    setHeaderData(prev => ({ ...prev, [field]: val }));
  };

  const updateStudentField = (index: number, field: string, val: string) => {
    if (!isTeacher) return;
    const newData = [...studentsData];
    newData[index][field] = val;
    setStudentsData(newData);
  };

  const updateMarks = (index: number, val: string) => {
    if (!isTeacher) return;
    const max = parseInt(headerData.saSchemeMax) || 25;
    const num = Math.min(max, Math.max(0, parseInt(val) || 0));
    const newData = [...studentsData];
    newData[index].saMarks = num;
    setStudentsData(newData);
  };

  const saveAll = () => {
    const records = studentsData.map(s => ({
      studentId: s.id,
      enrollmentNo: s.enrollmentNo,
      examSeat: s.examSeat,
      name: s.name,
      saMarks: s.saMarks,
      year: user.year
    }));
    DB.saveK4Records(records);
    DB.saveK4Meta(user.year, headerData);
    alert("K4 Summative Assessment Sheet Saved Successfully.");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-black">
      {/* App Header */}
      <header className="bg-purple-800 text-white p-4 flex items-center justify-between sticky top-0 z-50 shadow-md print:hidden">
        <div className="flex items-center space-x-3">
          <button onClick={() => navigate('/')} className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div>
            <h1 className="text-sm font-black uppercase tracking-widest leading-none">Format K4</h1>
            <p className="text-[10px] text-purple-100 font-bold uppercase mt-1">Summative Assessment Panel</p>
          </div>
        </div>
        {isTeacher && (
           <button onClick={saveAll} className="bg-white text-purple-800 px-6 py-2 rounded-xl text-xs font-black uppercase shadow-lg active:scale-95 transition-transform">
             Save Sheet
           </button>
        )}
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto bg-gray-100 p-2 md:p-8 print:p-0">
        <div className="bg-white p-10 shadow-2xl border border-gray-300 min-w-[1100px] mx-auto print:border-none print:shadow-none text-black">
          
          <div className="flex justify-between items-start mb-6">
            <div className="w-24"></div>
            <div className="text-center flex-1">
              <h2 className="text-lg font-bold">Maharashtra State Board of Technical Education</h2>
              <h3 className="text-xl font-black uppercase tracking-tight mt-1 border-b-2 border-black inline-block px-4">SUMMATIVE ASSESSMENT OF PRACTICAL (SA-PR)</h3>
            </div>
            <div className="font-black text-2xl uppercase tracking-tighter w-24 text-right">Format K4</div>
          </div>

          {/* Dotted Header replica */}
          <div className="grid grid-cols-12 gap-x-4 gap-y-6 text-[14px] px-2 mb-10 items-end font-semibold mt-10">
            <div className="col-span-12 flex items-center">
              <span className="whitespace-nowrap mr-2">Institute Code and Name:</span>
              <input className="header-input flex-1" value={headerData.institute} onChange={(e) => updateHeader('institute', e.target.value)} disabled={!isTeacher} />
            </div>

            <div className="col-span-4 flex items-center">
              <span className="whitespace-nowrap mr-2">Academic Year:</span>
              <div className="flex-1 border-b-2 border-dotted border-black px-2 pb-1">{user.year}</div>
            </div>
            <div className="col-span-3 flex items-center px-4">
              <span className="whitespace-nowrap mr-2">Semester:</span>
              <input className="header-input flex-1" value={headerData.semester} onChange={(e) => updateHeader('semester', e.target.value)} disabled={!isTeacher} />
            </div>
            <div className="col-span-5 flex items-center">
              <span className="whitespace-nowrap mr-2">Exam: Winter / Summer</span>
              <input className="header-input flex-1" value={headerData.examPeriod} onChange={(e) => updateHeader('examPeriod', e.target.value)} disabled={!isTeacher} />
            </div>

            <div className="col-span-4 flex items-center">
              <span className="whitespace-nowrap mr-2">Programme:</span>
              <input className="header-input flex-1" value={headerData.programme} onChange={(e) => updateHeader('programme', e.target.value)} disabled={!isTeacher} />
            </div>
            <div className="col-span-4 flex items-center px-4">
              <span className="whitespace-nowrap mr-2">Course:</span>
              <input className="header-input flex-1" value={headerData.course} onChange={(e) => updateHeader('course', e.target.value)} disabled={!isTeacher} />
            </div>
            <div className="col-span-4 flex items-center">
              <span className="whitespace-nowrap mr-2">Course Code:</span>
              <input className="header-input flex-1" value={headerData.courseCode} onChange={(e) => updateHeader('courseCode', e.target.value)} disabled={!isTeacher} />
            </div>

            <div className="col-span-4 flex items-center">
              <span className="whitespace-nowrap mr-2 font-bold">Date of Examination:</span>
              <input className="header-input flex-1" type="date" value={headerData.examDate} onChange={(e) => updateHeader('examDate', e.target.value)} disabled={!isTeacher} />
            </div>
            <div className="col-span-4 flex items-center px-4">
              <span className="whitespace-nowrap mr-2 font-bold">Maximum Marks:</span>
              <input className="header-input flex-1 text-center" value={headerData.maxMarks} onChange={(e) => updateHeader('maxMarks', e.target.value)} disabled={!isTeacher} />
            </div>
            <div className="col-span-4 flex items-center">
              <span className="whitespace-nowrap mr-2 font-bold">Minimum Marks:</span>
              <input className="header-input flex-1 text-center" value={headerData.minMarks} onChange={(e) => updateHeader('minMarks', e.target.value)} disabled={!isTeacher} />
            </div>
          </div>

          {/* Assessment Table */}
          <table className="w-full border-collapse border-[2.5px] border-black text-[13px]">
            <thead className="bg-gray-100 text-black">
              <tr>
                <th className="border-2 border-black p-4 w-48 text-center font-black uppercase tracking-tight">Enrollment No.</th>
                <th className="border-2 border-black p-4 w-48 text-center font-black uppercase tracking-tight">Exam Seat Number</th>
                <th className="border-2 border-black p-4 text-left font-black uppercase tracking-tight">Name of the Student</th>
                <th className="border-2 border-black p-4 w-72 text-center font-black uppercase tracking-tighter leading-tight bg-purple-50">
                  Marks obtained in SA part of Practical as per L-A Scheme<br/>
                  (Max Marks <input className="w-8 border-b border-black bg-transparent text-center" value={headerData.saSchemeMax} onChange={(e) => updateHeader('saSchemeMax', e.target.value)} disabled={!isTeacher} />)
                </th>
              </tr>
            </thead>
            <tbody>
              {studentsData.map((s, idx) => (
                <tr key={s.id} className="h-14 hover:bg-purple-50/20 transition-colors">
                  <td className="border-2 border-black p-0 text-center">
                    <input className="excel-input text-center font-bold" value={s.enrollmentNo} disabled={!isTeacher} onChange={(e) => updateStudentField(idx, 'enrollmentNo', e.target.value)} />
                  </td>
                  <td className="border-2 border-black p-0 text-center">
                    <input className="excel-input text-center font-black" value={s.examSeat} disabled={!isTeacher} onChange={(e) => updateStudentField(idx, 'examSeat', e.target.value)} />
                  </td>
                  <td className="border-2 border-black p-0">
                    <input className="excel-input px-4 font-bold uppercase truncate" value={s.name} disabled={!isTeacher} onChange={(e) => updateStudentField(idx, 'name', e.target.value)} />
                  </td>
                  <td className="border-2 border-black p-0 bg-purple-50">
                    <input type="number" className="excel-input text-center text-xl font-black text-purple-900" value={s.saMarks === 0 && isTeacher ? '' : s.saMarks} disabled={!isTeacher} onChange={(e) => updateMarks(idx, e.target.value)} onFocus={(e) => e.target.select()} />
                  </td>
                </tr>
              ))}
              {/* Padding rows */}
              {[...Array(12)].map((_, idx) => (
                <tr key={`empty-${idx}`} className="h-14">
                  <td className="border-2 border-black"></td>
                  <td className="border-2 border-black"></td>
                  <td className="border-2 border-black"></td>
                  <td className="border-2 border-black bg-purple-50/50"></td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Footer Section */}
          <div className="mt-8">
            <p className="font-black italic text-sm">Note: Fractional marks shall be rounded to next full number.</p>
            
            <div className="flex justify-between items-start mt-20 px-6">
              {/* Internal Examiner */}
              <div className="w-1/2 pr-10">
                <div className="border-b-2 border-black w-full h-8 mb-4"></div>
                <div className="space-y-3">
                  <p className="font-black uppercase text-xs">Signature of Internal Examiner</p>
                  <div className="flex items-center text-xs">
                    <span className="w-24 font-bold">Name:</span>
                    <input className="header-input flex-1" value={headerData.internalName} onChange={(e) => updateHeader('internalName', e.target.value)} disabled={!isTeacher} />
                  </div>
                  <div className="flex items-center text-xs">
                    <span className="w-24 font-bold">Designation:</span>
                    <input className="header-input flex-1" value={headerData.internalDesig} onChange={(e) => updateHeader('internalDesig', e.target.value)} disabled={!isTeacher} />
                  </div>
                  <div className="flex items-center text-xs">
                    <span className="w-24 font-bold">Mobile No.:</span>
                    <input className="header-input flex-1" value={headerData.internalMobile} onChange={(e) => updateHeader('internalMobile', e.target.value)} disabled={!isTeacher} />
                  </div>
                </div>
              </div>

              {/* External Examiner */}
              <div className="w-1/2 pl-10 border-l-2 border-gray-100">
                <div className="border-b-2 border-black w-full h-8 mb-4"></div>
                <div className="space-y-3">
                  <p className="font-black uppercase text-xs">Signature of External Examiner</p>
                  <div className="flex items-center text-xs">
                    <span className="w-24 font-bold">Name:</span>
                    <input className="header-input flex-1" value={headerData.externalName} onChange={(e) => updateHeader('externalName', e.target.value)} disabled={!isTeacher} />
                  </div>
                  <div className="flex items-center text-xs">
                    <span className="w-24 font-bold">Designation:</span>
                    <input className="header-input flex-1" value={headerData.externalName} onChange={(e) => updateHeader('externalDesig', e.target.value)} disabled={!isTeacher} />
                  </div>
                  <div className="flex items-center text-xs">
                    <span className="w-24 font-bold">Mobile No.:</span>
                    <input className="header-input flex-1" value={headerData.externalMobile} onChange={(e) => updateHeader('externalMobile', e.target.value)} disabled={!isTeacher} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .header-input {
          border: none;
          border-bottom: 2px dotted black;
          padding: 2px 8px;
          background: transparent;
          font-weight: 800;
          color: black;
          outline: none;
        }
        .header-input:focus {
          border-bottom-style: solid;
          background: #fdfdfd;
        }
        .excel-input {
          color: #000 !important;
          -moz-appearance: textfield;
          font-weight: 800;
          width: 100%;
          height: 100%;
          border: none;
          background: transparent;
          outline: none;
          padding: 4px;
        }
        .excel-input:focus {
           background-color: rgba(254, 249, 195, 0.5);
        }
        .excel-input::-webkit-outer-spin-button,
        .excel-input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        
        @media print {
          body { background-color: white !important; }
          .min-h-screen { min-height: auto !important; }
          .p-2, .md:p-8 { padding: 0 !important; }
          .bg-gray-100 { background-color: white !important; }
          .shadow-2xl { box-shadow: none !important; }
          .print\:hidden { display: none !important; }
        }
      `}</style>

      {/* Floating print FAB */}
      <div className="fixed bottom-10 right-10 flex flex-col space-y-4 print:hidden">
        <button 
           onClick={() => window.print()} 
           className="w-16 h-16 bg-purple-700 text-white rounded-full shadow-2xl flex items-center justify-center text-3xl hover:bg-purple-800 active:scale-90 transition-all border-4 border-white"
           title="Print / Save PDF"
        >
          🖨️
        </button>
      </div>
    </div>
  );
};

export default K4Screen;
