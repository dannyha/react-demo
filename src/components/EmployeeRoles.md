Employee Roles component example:

```tsx
<EmployeeRoles
    jobs={[
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
    ]}
    roles={{
        1001: {
            id: 1001,
            name: "Product Owner"
        },
        1002: {
            id: 1002,
            name: "Software Developer"
        },
        1003: {
            id: 1003,
            name: "Sr. Software Developer"
        },
        1004: {
            id: 1004,
            name: "UX Designer"
        }
    }}
/>
```