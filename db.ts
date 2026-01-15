import { Student, Department, AcademicYear } from './types';

// Storage keys for local storage
const STORAGE_KEYS = {
  STUDENTS: 'msbte_students',
  DEPARTMENTS: 'msbte_departments',
  K3_RECORDS: 'msbte_k3_records',
  K3_META: 'msbte_k3_meta',
  K4_RECORDS: 'msbte_k4_records',
  K4_META: 'msbte_k4_meta',
  K5_RECORDS: 'msbte_k5_records',
  K5_META: 'msbte_k5_meta',
  K6_RECORDS: 'msbte_k6_records',
  K6_META: 'msbte_k6_meta',
};

// Data extracted from PDF (Roll Call of Fifth Sem IT 2025-26)
const thirdYearStudents: Student[] = [
  { id: 'it3-1', enrollmentNo: '23110220391', rollNo: '1', examSeat: '', name: 'AVHAD BHAVIKA SACHIN', year: AcademicYear.THIRD, departmentId: 'it' },
  { id: 'it3-2', enrollmentNo: '23110220392', rollNo: '2', examSeat: '', name: 'BARGAJE SIDDHESH BALIRAM', year: AcademicYear.THIRD, departmentId: 'it' },
  { id: 'it3-3', enrollmentNo: '23110220393', rollNo: '3', examSeat: '', name: 'BHAVARTHE LAVANYA VILAS', year: AcademicYear.THIRD, departmentId: 'it' },
  { id: 'it3-4', enrollmentNo: '23110220394', rollNo: '4', examSeat: '', name: 'BHOSALE ADITI ARVIND', year: AcademicYear.THIRD, departmentId: 'it' },
  { id: 'it3-5', enrollmentNo: '23110220396', rollNo: '5', examSeat: '', name: 'BODRE RIDDHI SANTOSH', year: AcademicYear.THIRD, departmentId: 'it' },
  { id: 'it3-6', enrollmentNo: '23110220397', rollNo: '6', examSeat: '', name: 'DABHADE CHAITRALI RAJESH', year: AcademicYear.THIRD, departmentId: 'it' },
  { id: 'it3-7', enrollmentNo: '23110220398', rollNo: '7', examSeat: '', name: 'DALVI JITESH KAILAS', year: AcademicYear.THIRD, departmentId: 'it' },
  { id: 'it3-8', enrollmentNo: '23110220399', rollNo: '8', examSeat: '', name: 'DAUND SAUNDARY RAJENDRA', year: AcademicYear.THIRD, departmentId: 'it' },
  { id: 'it3-9', enrollmentNo: '23110220400', rollNo: '9', examSeat: '', name: 'DHANDAK SIDDHESH VISHNU', year: AcademicYear.THIRD, departmentId: 'it' },
  { id: 'it3-10', enrollmentNo: '23110220401', rollNo: '10', examSeat: '', name: 'DHUMAL ANUSHKA DEEPAK', year: AcademicYear.THIRD, departmentId: 'it' },
  { id: 'it3-11', enrollmentNo: '23110220402', rollNo: '11', examSeat: '', name: 'GANGURDE KRUSHNA ANANDA', year: AcademicYear.THIRD, departmentId: 'it' },
  { id: 'it3-12', enrollmentNo: '23110220403', rollNo: '12', examSeat: '', name: 'GAVHANDE JAGDISH RAVINDRA', year: AcademicYear.THIRD, departmentId: 'it' },
  { id: 'it3-13', enrollmentNo: '23110220404', rollNo: '13', examSeat: '', name: 'GHANGHAV SAHIL SHARAD', year: AcademicYear.THIRD, departmentId: 'it' },
  { id: 'it3-14', enrollmentNo: '23110220405', rollNo: '14', examSeat: '', name: 'GHARAT DHANANJAY DASHARATH', year: AcademicYear.THIRD, departmentId: 'it' },
  { id: 'it3-15', enrollmentNo: '23110220406', rollNo: '15', examSeat: '', name: 'GHOLAP ADITYA SURESH', year: AcademicYear.THIRD, departmentId: 'it' },
  { id: 'it3-16', enrollmentNo: '23110220407', rollNo: '16', examSeat: '', name: 'GONDHALI KIRTI PRAMOD', year: AcademicYear.THIRD, departmentId: 'it' },
  { id: 'it3-17', enrollmentNo: '23110220408', rollNo: '17', examSeat: '', name: 'GUPTA SUDHANSU BALIRAM', year: AcademicYear.THIRD, departmentId: 'it' },
  { id: 'it3-18', enrollmentNo: '23110220409', rollNo: '18', examSeat: '', name: 'HANDGE ARJUN ASHOK', year: AcademicYear.THIRD, departmentId: 'it' },
  { id: 'it3-19', enrollmentNo: '23110220411', rollNo: '19', examSeat: '', name: 'HINDURAO SHREYA RAJESH', year: AcademicYear.THIRD, departmentId: 'it' },
  { id: 'it3-20', enrollmentNo: '23110220412', rollNo: '20', examSeat: '', name: 'INGOLE ADITYA ANIL', year: AcademicYear.THIRD, departmentId: 'it' },
  { id: 'it3-21', enrollmentNo: '23110220414', rollNo: '21', examSeat: '', name: 'JADHAV BHAVIKA HARISHCHANDRA', year: AcademicYear.THIRD, departmentId: 'it' },
  { id: 'it3-22', enrollmentNo: '23110220416', rollNo: '22', examSeat: '', name: 'KAMBLE ANANYA SHESHRAO', year: AcademicYear.THIRD, departmentId: 'it' },
  { id: 'it3-23', enrollmentNo: '23110220418', rollNo: '23', examSeat: '', name: 'KAPSE APEKSHA MADHUKAR', year: AcademicYear.THIRD, departmentId: 'it' },
  { id: 'it3-24', enrollmentNo: '23110220419', rollNo: '24', examSeat: '', name: 'KATHE SOHAM DAGADU', year: AcademicYear.THIRD, departmentId: 'it' },
  { id: 'it3-25', enrollmentNo: '23110220420', rollNo: '25', examSeat: '', name: 'KHAIRNAR RITESH MAHENDRA', year: AcademicYear.THIRD, departmentId: 'it' },
  { id: 'it3-26', enrollmentNo: '23110220421', rollNo: '26', examSeat: '', name: 'KUDAV MRUNAL HARISHCHANDRA', year: AcademicYear.THIRD, departmentId: 'it' },
  { id: 'it3-27', enrollmentNo: '23110220422', rollNo: '27', examSeat: '', name: 'LAWAND NIKHIL KISAN', year: AcademicYear.THIRD, departmentId: 'it' },
  { id: 'it3-28', enrollmentNo: '23110220423', rollNo: '28', examSeat: '', name: 'MADAV DISHA PRASAD', year: AcademicYear.THIRD, departmentId: 'it' },
  { id: 'it3-29', enrollmentNo: '23110220424', rollNo: '29', examSeat: '', name: 'MAGAR SONALI GANESH', year: AcademicYear.THIRD, departmentId: 'it' },
  { id: 'it3-30', enrollmentNo: '23110220425', rollNo: '30', examSeat: '', name: 'MANCHEKAR MAHESH DATTATRAY', year: AcademicYear.THIRD, departmentId: 'it' },
  { id: 'it3-31', enrollmentNo: '23110220426', rollNo: '31', examSeat: '', name: 'MESHRAM HIMANSHU GHANSHYAM', year: AcademicYear.THIRD, departmentId: 'it' },
  { id: 'it3-32', enrollmentNo: '23110220428', rollNo: '32', examSeat: '', name: 'NICHITE GAURAV SITARAM', year: AcademicYear.THIRD, departmentId: 'it' },
  { id: 'it3-33', enrollmentNo: '23110220429', rollNo: '33', examSeat: '', name: 'PADEKAR TEJAL HIRAMAN', year: AcademicYear.THIRD, departmentId: 'it' },
  { id: 'it3-34', enrollmentNo: '23110220430', rollNo: '34', examSeat: '', name: 'PANIGRAHY PRITIPARNA PRADEEP', year: AcademicYear.THIRD, departmentId: 'it' },
  { id: 'it3-35', enrollmentNo: '23110220431', rollNo: '35', examSeat: '', name: 'PARAB NEHA VIJAYBHARAT', year: AcademicYear.THIRD, departmentId: 'it' },
  { id: 'it3-36', enrollmentNo: '23110220432', rollNo: '36', examSeat: '', name: 'PARDESHI SHRUTI JITENDRA', year: AcademicYear.THIRD, departmentId: 'it' },
  { id: 'it3-37', enrollmentNo: '23110220433', rollNo: '37', examSeat: '', name: 'PAREKAR AMOL RAMA', year: AcademicYear.THIRD, departmentId: 'it' },
  { id: 'it3-38', enrollmentNo: '23110220434', rollNo: '38', examSeat: '', name: 'PATIL ATHARV NITIN', year: AcademicYear.THIRD, departmentId: 'it' },
  { id: 'it3-39', enrollmentNo: '23110220435', rollNo: '39', examSeat: '', name: 'PATIL MANSI MAHENDRA', year: AcademicYear.THIRD, departmentId: 'it' },
  { id: 'it3-40', enrollmentNo: '23110220437', rollNo: '40', examSeat: '', name: 'PATIL PARESH VIJAY', year: AcademicYear.THIRD, departmentId: 'it' },
  { id: 'it3-41', enrollmentNo: '23110220438', rollNo: '41', examSeat: '', name: 'PATIL SHREERAJ SHAILENDRASING', year: AcademicYear.THIRD, departmentId: 'it' },
  { id: 'it3-42', enrollmentNo: '23110220439', rollNo: '42', examSeat: '', name: 'PATIL TEJASWINI SARJERAO', year: AcademicYear.THIRD, departmentId: 'it' },
  { id: 'it3-43', enrollmentNo: '23110220440', rollNo: '43', examSeat: '', name: 'PATIL YASH TUKARAM', year: AcademicYear.THIRD, departmentId: 'it' },
  { id: 'it3-44', enrollmentNo: '23110220441', rollNo: '44', examSeat: '', name: 'RAUT ISHA VISHAL', year: AcademicYear.THIRD, departmentId: 'it' },
  { id: 'it3-45', enrollmentNo: '23110220442', rollNo: '45', examSeat: '', name: 'SHELAR YASH YOGESH', year: AcademicYear.THIRD, departmentId: 'it' },
  { id: 'it3-46', enrollmentNo: '23110220443', rollNo: '46', examSeat: '', name: 'SHELAVALE BHAVESH ASHOK', year: AcademicYear.THIRD, departmentId: 'it' },
  { id: 'it3-47', enrollmentNo: '23110220444', rollNo: '47', examSeat: '', name: 'SHIROSE ASMITA ARUN', year: AcademicYear.THIRD, departmentId: 'it' },
  { id: 'it3-48', enrollmentNo: '23110220445', rollNo: '48', examSeat: '', name: 'SINGH MANSI VINAYKUMAR', year: AcademicYear.THIRD, departmentId: 'it' },
  { id: 'it3-49', enrollmentNo: '23110220446', rollNo: '49', examSeat: '', name: 'TAYDE SONAM RAJESH', year: AcademicYear.THIRD, departmentId: 'it' },
  { id: 'it3-50', enrollmentNo: '23110220447', rollNo: '50', examSeat: '', name: 'THAKARE MAYUR VIJAY', year: AcademicYear.THIRD, departmentId: 'it' },
  { id: 'it3-51', enrollmentNo: '23110220449', rollNo: '51', examSeat: '', name: 'THORAT SANCHITA MILIND', year: AcademicYear.THIRD, departmentId: 'it' },
  { id: 'it3-52', enrollmentNo: '23110220450', rollNo: '52', examSeat: '', name: 'THORAT SIDDHESH RAJESH', year: AcademicYear.THIRD, departmentId: 'it' },
  { id: 'it3-53', enrollmentNo: '23110220451', rollNo: '53', examSeat: '', name: 'UMBERGONDE KRUPALI SANTOSH', year: AcademicYear.THIRD, departmentId: 'it' },
  { id: 'it3-54', enrollmentNo: '23110220452', rollNo: '54', examSeat: '', name: 'VANAMANE SURAKSHA DIPAKRAO', year: AcademicYear.THIRD, departmentId: 'it' },
  { id: 'it3-55', enrollmentNo: '23110220453', rollNo: '55', examSeat: '', name: 'VISHE KETAN MADHUKAR', year: AcademicYear.THIRD, departmentId: 'it' },
  { id: 'it3-56', enrollmentNo: '23110220454', rollNo: '56', examSeat: '', name: 'WAGH PRATIK MILIND', year: AcademicYear.THIRD, departmentId: 'it' },
  { id: 'it3-57', enrollmentNo: '23110220455', rollNo: '57', examSeat: '', name: 'YADAV DIVYA ARVIND', year: AcademicYear.THIRD, departmentId: 'it' },
  { id: 'it3-58', enrollmentNo: '23110220456', rollNo: '58', examSeat: '', name: 'ZUNJARRAO MIT MAHENDRA', year: AcademicYear.THIRD, departmentId: 'it' },
  { id: 'it3-59', enrollmentNo: '23110220457', rollNo: '59', examSeat: '', name: 'JADHAV YASH RAMESH', year: AcademicYear.THIRD, departmentId: 'it' },
  { id: 'it3-60', enrollmentNo: '24110220456', rollNo: '60', examSeat: '', name: 'PATIL DIPAK PANDIT', year: AcademicYear.THIRD, departmentId: 'it' },
  { id: 'it3-61', enrollmentNo: '24110220457', rollNo: '61', examSeat: '', name: 'KOKE SHUBHAM RATNAKAR', year: AcademicYear.THIRD, departmentId: 'it' },
  { id: 'it3-62', enrollmentNo: '24110220458', rollNo: '62', examSeat: '', name: 'INGALE DIVYA MAHADEV', year: AcademicYear.THIRD, departmentId: 'it' },
  { id: 'it3-63', enrollmentNo: '24110220459', rollNo: '63', examSeat: '', name: 'PATIL MAYUR CHINTAMAN', year: AcademicYear.THIRD, departmentId: 'it' },
  { id: 'it3-64', enrollmentNo: '24110220461', rollNo: '64', examSeat: '', name: 'SHUBHAM DATTATRAY MORE', year: AcademicYear.THIRD, departmentId: 'it' },
  { id: 'it3-65', enrollmentNo: '24110220462', rollNo: '65', examSeat: '', name: 'BEDRE MUKESH GYANOBA', year: AcademicYear.THIRD, departmentId: 'it' },
];

const initialStudents: Student[] = [
  { id: '1', enrollmentNo: '2100456211', rollNo: '101', examSeat: 'S21001', name: 'Rahul Sharma', year: AcademicYear.FIRST, departmentId: 'comp' },
  { id: '2', enrollmentNo: '2100456212', rollNo: '102', examSeat: 'S21002', name: 'Sneha Patil', year: AcademicYear.FIRST, departmentId: 'comp' },
  { id: '3', enrollmentNo: '2100456213', rollNo: '103', examSeat: 'S21003', name: 'Amit Verma', year: AcademicYear.SECOND, departmentId: 'comp' },
  ...thirdYearStudents
];

const defaultDepartments: Department[] = [
  { id: 'comp', name: 'Computer Engineering', code: 'CO', hodName: 'Prof. Satish Mane' },
  { id: 'it', name: 'Information Technology', code: 'IF', hodName: 'Dr. V. B. Kulkarni' },
];

// Database abstraction layer
export const DB = {
  // Initialize database with default data if empty
  init: () => {
    if (!localStorage.getItem(STORAGE_KEYS.STUDENTS)) {
      localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(initialStudents));
    }
    if (!localStorage.getItem(STORAGE_KEYS.DEPARTMENTS)) {
      localStorage.setItem(STORAGE_KEYS.DEPARTMENTS, JSON.stringify(defaultDepartments));
    }
  },

  getStudentsByYear: (year: AcademicYear): Student[] => {
    const students: Student[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.STUDENTS) || '[]');
    return students.filter(s => s.year === year);
  },

  getDepartments: (): Department[] => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.DEPARTMENTS) || '[]');
  },

  // Generic helper for fetching year-specific assessment data
  getRecords: (key: string, year: string) => {
    const all = JSON.parse(localStorage.getItem(key) || '[]');
    return all.filter((r: any) => r.year === year);
  },

  // Generic helper for saving year-specific assessment data
  saveRecords: (key: string, records: any[]) => {
    const all = JSON.parse(localStorage.getItem(key) || '[]');
    if (records.length === 0) return;
    const year = records[0].year;
    const filtered = all.filter((r: any) => r.year !== year);
    localStorage.setItem(key, JSON.stringify([...filtered, ...records]));
  },

  // Generic helper for meta info (Institute, Programme, etc.)
  getMeta: (key: string, year: string) => {
    const all = JSON.parse(localStorage.getItem(key) || '{}');
    return all[year];
  },

  saveMeta: (key: string, year: string, meta: any) => {
    const all = JSON.parse(localStorage.getItem(key) || '{}');
    all[year] = meta;
    localStorage.setItem(key, JSON.stringify(all));
  },

  // K3 Methods
  getK3Records: (year: string) => DB.getRecords(STORAGE_KEYS.K3_RECORDS, year),
  saveK3Records: (records: any[]) => DB.saveRecords(STORAGE_KEYS.K3_RECORDS, records),
  getK3Meta: (year: string) => DB.getMeta(STORAGE_KEYS.K3_META, year),
  saveK3Meta: (year: string, meta: any) => DB.saveMeta(STORAGE_KEYS.K3_META, year, meta),

  // K4 Methods
  getK4Records: (year: string) => DB.getRecords(STORAGE_KEYS.K4_RECORDS, year),
  saveK4Records: (records: any[]) => DB.saveRecords(STORAGE_KEYS.K4_RECORDS, records),
  getK4Meta: (year: string) => DB.getMeta(STORAGE_KEYS.K4_META, year),
  saveK4Meta: (year: string, meta: any) => DB.saveMeta(STORAGE_KEYS.K4_META, year, meta),

  // K5 Methods
  getK5Records: (year: string) => DB.getRecords(STORAGE_KEYS.K5_RECORDS, year),
  saveK5Records: (records: any[]) => DB.saveRecords(STORAGE_KEYS.K5_RECORDS, records),
  getK5Meta: (year: string) => DB.getMeta(STORAGE_KEYS.K5_META, year),
  saveK5Meta: (year: string, meta: any) => DB.saveMeta(STORAGE_KEYS.K5_META, year, meta),

  // K6 Methods
  getK6Records: (year: string) => DB.getRecords(STORAGE_KEYS.K6_RECORDS, year),
  saveK6Records: (records: any[]) => DB.saveRecords(STORAGE_KEYS.K6_RECORDS, records),
  getK6Meta: (year: string) => DB.getMeta(STORAGE_KEYS.K6_META, year),
  saveK6Meta: (year: string, meta: any) => DB.saveMeta(STORAGE_KEYS.K6_META, year, meta),
};