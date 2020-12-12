export interface Job {
  id: number;
  name: string;
}

export interface JobAssignment {
  jobId: number;
  startYear: number;
  endYear?: number | null;
}

export interface Employee {
  firstName: string;
  lastName: string;
  jobAssignments: JobAssignment[];
  birthYear: number;
  location: string;
}

var jobs: Job[] = [
  {
    id: 1001,
    name: "Product Owner"
  },
  {
    id: 1002,
    name: "Software Developer"
  },
  {
    id: 1003,
    name: "Sr. Software Developer"
  },
  {
    id: 1004,
    name: "UX Designer"
  }
];

var employees: Employee[] = [
  {
    firstName: "Chris",
    lastName: "Quan",
    jobAssignments: [
      {
        jobId: 1003,
        startYear: 2020,
        endYear: 2020
      },
      {
        jobId: 1002,
        startYear: 1999,
        endYear: 2019
      }
    ],
    birthYear: 2020,
    location: "Toronto"
  },
  {
    firstName: "Emily",
    lastName: "Yeung",
    jobAssignments: [
      {
        jobId: 1001,
        startYear: 2000,
        endYear: null
      }
    ],
    birthYear: 2020,
    location: "Glasgow"
  },
  {
    firstName: "Scott",
    lastName: "Thornton",
    jobAssignments: [
      {
        jobId: 1004,
        startYear: 2010,
        endYear: 2018
      }
    ],
    birthYear: 2020,
    location: "Toronto"
  }
];

async function wait(ms: number) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

const API = {
  /**
   * Returns a list of all employees in the system.
   */
  async getAllEmployees(): Promise<Employee[]> {
    await wait(1000);
    return Promise.resolve(employees);
  },
  /**
   * Returns a list of all jobs in the system.
   */
  async getAllJobs(): Promise<Job[]> {
    await wait(1000);
    return Promise.resolve(jobs);
  }
};

export default API;