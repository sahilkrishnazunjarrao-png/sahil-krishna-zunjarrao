import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserRole, AcademicYear, Student } from '../types';
import { DB } from '../db';

interface K6ScreenProps {
  user: { role: UserRole; year: AcademicYear };
}

interface K6Header {
  institute: string;
  semester: string;
  examPeriod: string;
  programme: string;
  course: string;
  courseCode: string;
  maxMarks: string;
  minMarks1: string;
  minMarks2: string;
  mpMax: string;
  asgnMax: string;
  otherMax: string;
  laMaxMarks: string;
}

const K6Screen: React.FC<K6ScreenProps> = ({ user }) => {
  const navigate = useNavigate();
  const [studentsData, setStudentsData] = useState<any[]>([]);
  const [headerData, setHeaderData] = useState<K6Header>({
    institute: '',
    semester: '',
    examPeriod: '',
    programme: '',
    course: '',
    courseCode: '',
    maxMarks: '30',
    minMarks1: '12',
    minMarks2: '12',
    mpMax: '10',
    asgnMax: '10',
    otherMax: '10',
    laMaxMarks: '25'
  });
  
  const isTeacher = user.role === UserRole.TEACHER;

  useEffect(() => {
    const students = DB.getStudentsByYear(user.year);
    const savedRecords = DB.getK6Records(user.year);
    const meta = DB.getK6Meta(user.year);

    if (meta) {
      setHeaderData(meta);
    }

    const merged = students.map(s => {
      const existing = savedRecords.find((r: any) => r.studentId === s.id);
      return {
        id: s.id,
        rollNo: existing?.rollNo || s.rollNo,
        enrollmentNo: existing?.enrollmentNo || s.enrollmentNo,
        examSeat: existing?.examSeat || s.examSeat,
        name: existing?.name || s.name,
        mp: existing?.microProject || 0,
        asgn: existing?.assignments || 0,
        other: existing?.otherActivities || 0
      };
    });
    setStudentsData(merged);
  }, [user.year]);

  const updateHeader = (field: keyof K6Header, val: string) => {
    if (!isTeacher) return;
    setHeaderData(prev => ({ ...prev, [field]: val }));
  };

  const updateStudentField = (index: number, field: string, val: string) => {
    if (!isTeacher) return;
    const newData = [...studentsData];
    newData[index][field] = val;
    setStudentsData(newData);
  };

  const updateMark = (index: number, field: 'mp' | 'asgn' | 'other', val: string) => {
    if (!isTeacher) return;
    // Basic validation based on current maxes
    const maxVal = field === 'mp' ? parseInt(headerData.mpMax) || 10 : 
                   field === 'asgn' ? parseInt(headerData.asgnMax) || 10 :
                   parseInt(headerData.otherMax) || 10;
                   
    const num = Math.min(maxVal, Math.max(0, parseInt(val) || 0));
    const newData = [...studentsData];
    newData[index][field] = num;
    setStudentsData(newData);
  };

  const calculateTotal = (s: any) => s.mp + s.asgn + s.other;

  const saveAll = () => {
    const records = studentsData.map(s => ({
      studentId: s.id,
      rollNo: s.rollNo,
      enrollmentNo: s.enrollmentNo,
      examSeat: s.examSeat,
      name: s.name,
      microProject: s.mp,
      assignments: s.asgn,
      otherActivities: s.other,
      total: calculateTotal(s),
      year: user.year
    }));
    DB.saveK6Records(records);
    DB.saveK6Meta(user.year, headerData);
    alert("K6 SLA Sheet Saved Successfully.");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-black">
      {/* App Header */}
      <header className="bg-green-700 text-white p-4 flex items-center justify-between sticky top-0 z-50 shadow-md print:hidden">
        <div className="flex items-center space-x-3">
          <button onClick={() => navigate('/')} className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div>
            <h1 className="text-sm font-black uppercase tracking-widest leading-none">Format K6</h1>
            <p className="text-[10px] text-green-100 font-bold uppercase mt-1">SLA Assessment Panel</p>
          </div>
        </div>
        {isTeacher && (
           <button onClick={saveAll} className="bg-white text-green-700 px-6 py-2 rounded-xl text-xs font-black uppercase shadow-lg active:scale-95 transition-transform">
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
              <h3 className="text-xl font-black uppercase tracking-tight mt-1 border-b-2 border-black inline-block px-4">SELF LEARNING ASSESSMENT (SLA)</h3>
              <p className="text-[12px] font-bold mt-1 text-gray-700">Micro project / Assignment / Activities for specific learning / skills development</p>
            </div>
            <div className="font-black text-2xl uppercase tracking-tighter w-24 text-right">Format K6</div>
          </div>

          {/* Header Section Replica */}
          <div className="grid grid-cols-12 gap-x-4 gap-y-6 text-[14px] px-2 mb-10 items-end font-semibold mt-8">
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
              <span className="whitespace-nowrap mr-2 font-bold">Maximum Marks:</span>
              <input className="header-input flex-1 text-center" value={headerData.maxMarks} onChange={(e) => updateHeader('maxMarks', e.target.value)} disabled={!isTeacher} />
            </div>
            <div className="col-span-4 flex items-center px-4">
              <span className="whitespace-nowrap mr-2 font-bold">Minimum Marks:</span>
              <input className="header-input flex-1 text-center" value={headerData.minMarks1} onChange={(e) => updateHeader('minMarks1', e.target.value)} disabled={!isTeacher} />
            </div>
            <div className="col-span-4 flex items-center">
              <span className="whitespace-nowrap mr-2 font-bold">Minimum Marks:</span>
              <input className="header-input flex-1 text-center" value={headerData.minMarks2} onChange={(e) => updateHeader('minMarks2', e.target.value)} disabled={!isTeacher} />
            </div>
          </div>

          {/* SLA Table */}
          <table className="w-full border-collapse border-[2.5px] border-black text-[13px]">
            <thead className="bg-gray-100 text-black">
              <tr>
                <th rowSpan={2} className="border-2 border-black p-3 w-16 text-center font-black">Roll No.</th>
                <th rowSpan={2} className="border-2 border-black p-3 w-32 text-center font-black">Enrollment No.</th>
                <th rowSpan={2} className="border-2 border-black p-3 w-32 text-center font-black uppercase">Exam Seat Number</th>
                <th rowSpan={2} className="border-2 border-black p-3 text-left font-black">Name of the Student</th>
                <th colSpan={3} className="border-2 border-black p-2 text-center font-black uppercase tracking-tight">SLA Activities</th>
                <th rowSpan={2} className="border-2 border-black p-3 w-48 text-center font-black leading-tight bg-green-50">
                  SLA Marks according to L-A Scheme<br/>
                  (Total of all SLA Activities)<br/>
                  (Max Marks <input className="bg-white border-b border-black w-8 text-center" value={headerData.laMaxMarks} onChange={(e) => updateHeader('laMaxMarks', e.target.value)} disabled={!isTeacher} />)
                </th>
                <th rowSpan={2} className="border-2 border-black p-3 w-32 text-center font-black">Signature of Student</th>
              </tr>
              <tr>
                <th className="border-2 border-black p-2 w-32 text-center font-black leading-none bg-white">
                  Micro project<br/>(out of <input className="w-6 text-center border-b border-black font-bold" value={headerData.mpMax} onChange={(e) => updateHeader('mpMax', e.target.value)} disabled={!isTeacher} />)
                </th>
                <th className="border-2 border-black p-2 w-32 text-center font-black leading-none bg-white">
                  Assignments<br/>(out of <input className="w-6 text-center border-b border-black font-bold" value={headerData.asgnMax} onChange={(e) => updateHeader('asgnMax', e.target.value)} disabled={!isTeacher} />)
                </th>
                <th className="border-2 border-black p-2 w-48 text-center font-black leading-tight bg-white">
                  Other Activities for specific learning<br/>(out of <input className="w-6 text-center border-b border-black font-bold" value={headerData.otherMax} onChange={(e) => updateHeader('otherMax', e.target.value)} disabled={!isTeacher} />)
                </th>
              </tr>
              {/* Mapping numbers row */}
              <tr className="bg-gray-200">
                <th className="border-2 border-black p-1 text-center font-black italic">1</th>
                <th className="border-2 border-black p-1 text-center font-black italic">2</th>
                <th className="border-2 border-black p-1 text-center font-black italic">3</th>
                <th className="border-2 border-black p-1 text-center font-black italic">4</th>
                <th className="border-2 border-black p-1 text-center font-black italic">5</th>
                <th className="border-2 border-black p-1 text-center font-black italic">6</th>
                <th className="border-2 border-black p-1 text-center font-black italic">7</th>
                <th className="border-2 border-black p-1 text-center font-black italic bg-green-100">7</th>
                <th className="border-2 border-black p-1 text-center font-black italic">7</th>
              </tr>
            </thead>
            <tbody>
              {studentsData.map((s, idx) => {
                const total = calculateTotal(s);
                return (
                  <tr key={s.id} className="h-14 hover:bg-green-50 transition-colors">
                    <td className="border-2 border-black p-0">
                      <input className="excel-input text-center font-black" value={s.rollNo} disabled={!isTeacher} onChange={(e) => updateStudentField(idx, 'rollNo', e.target.value)} />
                    </td>
                    <td className="border-2 border-black p-0">
                      <input className="excel-input text-center" value={s.enrollmentNo} disabled={!isTeacher} onChange={(e) => updateStudentField(idx, 'enrollmentNo', e.target.value)} />
                    </td>
                    <td className="border-2 border-black p-0">
                      <input className="excel-input text-center font-bold" value={s.examSeat} disabled={!isTeacher} onChange={(e) => updateStudentField(idx, 'examSeat', e.target.value)} />
                    </td>
                    <td className="border-2 border-black p-0 min-w-[200px]">
                      <input className="excel-input px-4 font-bold uppercase truncate" value={s.name} disabled={!isTeacher} onChange={(e) => updateStudentField(idx, 'name', e.target.value)} />
                    </td>
                    <td className="border-2 border-black p-0">
                      <input type="number" className="excel-input text-center font-black" value={s.mp === 0 && isTeacher ? '' : s.mp} disabled={!isTeacher} onChange={(e) => updateMark(idx, 'mp', e.target.value)} onFocus={(e) => e.target.select()} />
                    </td>
                    <td className="border-2 border-black p-0">
                      <input type="number" className="excel-input text-center font-black" value={s.asgn === 0 && isTeacher ? '' : s.asgn} disabled={!isTeacher} onChange={(e) => updateMark(idx, 'asgn', e.target.value)} onFocus={(e) => e.target.select()} />
                    </td>
                    <td className="border-2 border-black p-0">
                      <input type="number" className="excel-input text-center font-black" value={s.other === 0 && isTeacher ? '' : s.other} disabled={!isTeacher} onChange={(e) => updateMark(idx, 'other', e.target.value)} onFocus={(e) => e.target.select()} />
                    </td>
                    <td className="border-2 border-black text-center font-black bg-green-50 text-xl text-green-900 border-x-4 border-green-400">
                      {total}
                    </td>
                    <td className="border-2 border-black"></td>
                  </tr>
                );
              })}
              {/* Padding Rows */}
              {[...Array(10)].map((_, idx) => (
                <tr key={`empty-${idx}`} className="h-14">
                  <td className="border-2 border-black"></td>
                  <td className="border-2 border-black"></td>
                  <td className="border-2 border-black"></td>
                  <td className="border-2 border-black"></td>
                  <td className="border-2 border-black"></td>
                  <td className="border-2 border-black"></td>
                  <td className="border-2 border-black"></td>
                  <td className="border-2 border-black bg-green-50/50 border-x-4 border-green-400"></td>
                  <td className="border-2 border-black"></td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Note Footer Section */}
          <div className="mt-8 space-y-4">
            <div className="text-[12px] font-bold text-gray-800 space-y-1 bg-gray-50 p-4 border-l-4 border-black rounded-r-lg">
              <p className="font-black text-black text-sm mb-1 uppercase tracking-wider">Note:</p>
              <p>1. Fractional marks shall be rounded to next full number.</p>
              <p>2. Students may be given judicial mix of activities or some student maybe assigned a single activity such that it must be in proportion of allotted Self Learning hrs., skill requirement of a specific student and expected outcome.</p>
              <p>3. Fast learners maybe assigned somewhat challenging activities.</p>
              <p>4. Student who fail to submit their SLA shall be given zero marks.</p>
            </div>

            {/* Signature Section */}
            <div className="flex justify-between items-end mt-16 px-10">
              <div className="text-center w-64 space-y-8">
                <div className="border-b-2 border-black w-full h-8"></div>
                <div>
                  <p className="font-black uppercase text-xs">Signature of Faculty</p>
                  <p className="flex items-center mt-2">
                    <span className="mr-2 text-xs">Name:</span>
                    <input className="header-input flex-1 text-center" placeholder="Teacher Name" disabled={!isTeacher} />
                  </p>
                </div>
              </div>
              <div className="text-center w-64 space-y-8">
                <div className="border-b-2 border-black w-full h-8"></div>
                <div>
                  <p className="font-black uppercase text-xs">Signature of HoD</p>
                  <p className="flex items-center mt-2">
                    <span className="mr-2 text-xs">Name:</span>
                    <input className="header-input flex-1 text-center" placeholder="HoD Name" disabled={!isTeacher} />
                  </p>
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

      {/* Floating Action Button */}
      <div className="fixed bottom-10 right-10 flex flex-col space-y-4 print:hidden">
        <button 
           onClick={() => window.print()} 
           className="w-16 h-16 bg-green-600 text-white rounded-full shadow-2xl flex items-center justify-center text-3xl hover:bg-green-700 active:scale-90 transition-all border-4 border-white"
           title="Print / Save PDF"
        >
          🖨️
        </button>
      </div>
    </div>
  );
};

export default K6Screen;