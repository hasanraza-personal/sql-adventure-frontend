/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const MCQContext = createContext();

const ContextProviderCustom = ({ children }) => {
  const originalQuiz = [
    // 1 - Question 1
    {
      type: "b",
      level: "1",
      question:
        "Which of the following is a characteristic of a relational database?",
      option: [
        "Hierarchical structure",
        "Tables with rows and columns",
        "No structured format",
        "File-based storage",
      ],
      selectedOption: [],
      correctOption: ["Tables with rows and columns"],
      remainingOption: [
        "Hierarchical structure",
        "Tables with rows and columns",
        "No structured format",
        "File-based storage",
      ],
      score: 0,
      time: "",
      attempt: 0,
    },
    // 1 - Question 2
    {
      type: "b",
      level: "1",
      question: "Which SQL command is used to create a new table?",
      options: ["CREATE", "INSERT", "UPDATE", "ALTER"],
      selectedOption: [],
      correctOption: ["CREATE"],
      remainingOption: ["CREATE", "INSERT", "UPDATE", "ALTER"],
      score: 0,
      time: "",
      attempt: 0,
    },
    // 1 - Question 3
    {
      type: "b",
      level: "1",
      question: "Which of the following is NOT a type of database model?",
      options: ["Hierarchical", "Relational", "Network", "Sequential"],
      selectedOption: [],
      correctOption: ["Sequential"],
      remainingOption: ["Hierarchical", "Relational", "Network", "Sequential"],
      score: 0,
      time: "",
      attempt: 0,
    },
    // 1 - Question 4
    {
      type: "b",
      level: "1",
      question: "What does ACID stand for in DBMS?",
      options: [
        "Atomicity, Consistency, Isolation, Durability",
        "Access, Control, Integrity, Distribution",
        "Automated, Consistent, Interoperable, Dynamic",
        "Authorization, Concurrency, Isolation, Dependability",
      ],
      selectedOption: [],
      correctOption: ["Atomicity, Consistency, Isolation, Durability"],
      remainingOption: [
        "Atomicity, Consistency, Isolation, Durability",
        "Access, Control, Integrity, Distribution",
        "Automated, Consistent, Interoperable, Dynamic",
        "Authorization, Concurrency, Isolation, Dependability",
      ],
      score: 0,
      time: "",
      attempt: 0,
    },
    // 1- Question 5
    {
      type: "b",
      level: "1",
      question: "Which of the following is a primary key?",
      options: [
        "A unique column that identifies each row",
        "A column that allows NULL values",
        "A key that is always auto-incremented",
        "A key that is used for sorting data",
      ],
      selectedOption: [],
      correctOption: ["A unique column that identifies each row"],
      remainingOption: [
        "A unique column that identifies each row",
        "A column that allows NULL values",
        "A key that is always auto-incremented",
        "A key that is used for sorting data",
      ],
      score: 0,
      time: "",
      attempt: 0,
    },
    // // 2 - Question 1
    // {
    //   type: "b",
    //   level: "2",
    //   question:
    //     "Which SQL statement is used to remove all records from a table without deleting its structure?",
    //   option: ["DELETE", "DROP", "TRUNCATE", "REMOVE"],
    //   selectedOption: [],
    //   correctOption: ["TRUNCATE"],
    //   remainingOption: ["DELETE", "DROP", "TRUNCATE", "REMOVE"],
    //   score: 0,
    //   time: "",
    //   attempt: 0,
    // },
    // // 2 - Question 2
    // {
    //   type: "b",
    //   level: "2",
    //   question: "Which normal form removes partial dependency?",
    //   options: ["1NF", "2NF", "3NF", "BCNF"],
    //   selectedOption: [],
    //   correctOption: ["2NF"],
    //   remainingOption: ["1NF", "2NF", "3NF", "BCNF"],
    //   score: 0,
    //   time: "",
    //   attempt: 0,
    // },
    // // 2 - Question 3
    // {
    //   type: "b",
    //   level: "2",
    //   question: "What is the purpose of the GROUP BY clause in SQL?",
    //   options: [
    //     "To group data based on a condition",
    //     "To filter results",
    //     "To aggregate data based on column values",
    //     "To sort data",
    //   ],
    //   selectedOption: [],
    //   correctOption: ["To aggregate data based on column values"],
    //   remainingOption: [
    //     "To group data based on a condition",
    //     "To filter results",
    //     "To aggregate data based on column values",
    //     "To sort data",
    //   ],
    //   score: 0,
    //   time: "",
    //   attempt: 0,
    // },
    // // 2 - Question 4
    // {
    //   type: "b",
    //   level: "2",
    //   question:
    //     "In SQL, which function is used to count the number of rows in a table?",
    //   options: ["COUNT()", "SUM()", "AVG()", "MAX()"],
    //   selectedOption: [],
    //   correctOption: ["COUNT()"],
    //   remainingOption: ["COUNT()", "SUM()", "AVG()", "MAX()"],
    //   score: 0,
    //   time: "",
    //   attempt: 0,
    // },
    // // 2 - Question 5
    // {
    //   type: "b",
    //   level: "2",
    //   question:
    //     "Which SQL constraint ensures that values in a column are unique?",
    //   options: ["CHECK", "UNIQUE", "NOT NULL", "DEFAULT"],
    //   selectedOption: [],
    //   correctOption: ["UNIQUE"],
    //   remainingOption: ["CHECK", "UNIQUE", "NOT NULL", "DEFAULT"],
    //   score: 0,
    //   time: "",
    //   attempt: 0,
    // },
    // // 3 - Question 1
    // {
    //   type: "a",
    //   level: "3",
    //   question:
    //     "Write an SQL query to retrieve all records of employees whose salary is greater than 50,000.",
    //   option: [
    //     "SELECT",
    //     "*",
    //     "FROM",
    //     "Employees",
    //     "WHERE",
    //     "Salary",
    //     ">",
    //     "50000;",
    //   ],
    //   selectedOption: [],
    //   correctOption: [
    //     "SELECT",
    //     "*",
    //     "FROM",
    //     "Employees",
    //     "WHERE",
    //     "Salary",
    //     ">",
    //     "50000;",
    //   ],
    //   remainingOption: [
    //     "SELECT",
    //     "*",
    //     "FROM",
    //     "Employees",
    //     "WHERE",
    //     "Salary",
    //     ">",
    //     "50000;",
    //   ],
    //   score: 0,
    //   time: "",
    //   attempt: 0,
    // },
    // // 3 - Question 2
    // {
    //   type: "a",
    //   level: "3",
    //   question:
    //     "Write an SQL query to display the name and department of employees sorted in ascending order of their names.",
    //   options: [
    //     "SELECT",
    //     "Name,",
    //     "Department",
    //     "FROM",
    //     "Employees",
    //     "ORDER",
    //     "BY",
    //     "Name",
    //     "ASC;",
    //   ],
    //   selectedOption: [],
    //   correctOption: [
    //     "SELECT",
    //     "Name,",
    //     "Department",
    //     "FROM",
    //     "Employees",
    //     "ORDER",
    //     "BY",
    //     "Name",
    //     "ASC;",
    //   ],
    //   remainingOption: [
    //     "SELECT",
    //     "Name,",
    //     "Department",
    //     "FROM",
    //     "Employees",
    //     "ORDER",
    //     "BY",
    //     "Name",
    //     "ASC;",
    //   ],
    //   score: 0,
    //   time: "",
    //   attempt: 0,
    // },
    // // 3 - Question 3
    // {
    //   type: "a",
    //   level: "3",
    //   question:
    //     "Write an SQL query to find the total number of employees in each department.",
    //   options: [
    //     "SELECT",
    //     "Department",
    //     ",",
    //     "COUNT(*)",
    //     "FROM",
    //     "Employees",
    //     "GROUP",
    //     "BY",
    //     "Department;",
    //   ],
    //   selectedOption: [],
    //   correctOption: [
    //     "SELECT",
    //     "Department",
    //     ",",
    //     "COUNT(*)",
    //     "FROM",
    //     "Employees",
    //     "GROUP",
    //     "BY",
    //     "Department;",
    //   ],
    //   remainingOption: [
    //     "SELECT",
    //     "Department",
    //     ",",
    //     "COUNT(*)",
    //     "FROM",
    //     "Employees",
    //     "GROUP",
    //     "BY",
    //     "Department;",
    //   ],
    //   score: 0,
    //   time: "",
    //   attempt: 0,
    // },
    // // 3 - Question 4
    // {
    //   type: "a",
    //   level: "3",
    //   question:
    //     "Write an SQL query to find the highest salary in the Employee table.",
    //   options: ["SELECT", "MAX(Salary)", "FROM", "Employees;"],
    //   selectedOption: [],
    //   correctOption: ["SELECT", "MAX(Salary)", "FROM", "Employees;"],
    //   remainingOption: ["SELECT", "MAX(Salary)", "FROM", "Employees;"],
    //   score: 0,
    //   time: "",
    //   attempt: 0,
    // },
    // // 3 - Question 5
    // {
    //   type: "a",
    //   level: "3",
    //   question:
    //     "Write an SQL query to fetch all employees who joined in the year 2022.",
    //   options: [
    //     "SELECT",
    //     "*",
    //     "FROM",
    //     "Employees",
    //     "WHERE",
    //     "YEAR(JoinDate)",
    //     "=",
    //     "2022;",
    //   ],
    //   selectedOption: [],
    //   correctOption: [
    //     "SELECT",
    //     "*",
    //     "FROM",
    //     "Employees",
    //     "WHERE",
    //     "YEAR(JoinDate)",
    //     "=",
    //     "2022;",
    //   ],
    //   remainingOption: [
    //     "SELECT",
    //     "*",
    //     "FROM",
    //     "Employees",
    //     "WHERE",
    //     "YEAR(JoinDate)",
    //     "=",
    //     "2022;",
    //   ],
    //   score: 0,
    //   time: "",
    //   attempt: 0,
    // },
    // // 4 - Question 1
    // {
    //   type: "a",
    //   level: "4",
    //   question:
    //     "Find employees who earn more than the average salary in the Employee table.",
    //   option: [
    //     "SELECT",
    //     "*",
    //     "FROM",
    //     "Employees",
    //     "WHERE",
    //     "Salary",
    //     ">",
    //     "(SELECT AVG(Salary) FROM Employees);",
    //   ],
    //   selectedOption: [],
    //   correctOption: [
    //     "SELECT",
    //     "*",
    //     "FROM",
    //     "Employees",
    //     "WHERE",
    //     "Salary",
    //     ">",
    //     "(SELECT AVG(Salary) FROM Employees);",
    //   ],
    //   remainingOption: [
    //     "SELECT",
    //     "*",
    //     "FROM",
    //     "Employees",
    //     "WHERE",
    //     "Salary",
    //     ">",
    //     "(SELECT AVG(Salary) FROM Employees);",
    //   ],
    //   score: 0,
    //   time: "",
    //   attempt: 0,
    // },
    // // 4 - Question 2
    // {
    //   type: "a",
    //   level: "4",
    //   question: "Write a query to display department-wise maximum salary.",
    //   options: [
    //     "SELECT",
    //     "Department",
    //     ",",
    //     "MAX(Salary)",
    //     "FROM",
    //     "Employees",
    //     "GROUP",
    //     "BY",
    //     "Department;",
    //   ],
    //   selectedOption: [],
    //   correctOption: [
    //     "SELECT",
    //     "Department",
    //     ",",
    //     "MAX(Salary)",
    //     "FROM",
    //     "Employees",
    //     "GROUP",
    //     "BY",
    //     "Department;",
    //   ],
    //   remainingOption: [
    //     "SELECT",
    //     "Department",
    //     ",",
    //     "MAX(Salary)",
    //     "FROM",
    //     "Employees",
    //     "GROUP",
    //     "BY",
    //     "Department;",
    //   ],
    //   score: 0,
    //   time: "",
    //   attempt: 0,
    // },
    // // 4 - Question 3
    // {
    //   type: "a",
    //   level: "4",
    //   question: "Find employees who do not belong to the 'HR' department.",
    //   options: [
    //     "SELECT",
    //     "*",
    //     "FROM",
    //     "Employees",
    //     "WHERE",
    //     "Department",
    //     "<>",
    //     "'HR';",
    //   ],
    //   selectedOption: [],
    //   correctOption: [
    //     "SELECT",
    //     "*",
    //     "FROM",
    //     "Employees",
    //     "WHERE",
    //     "Department",
    //     "<>",
    //     "'HR';",
    //   ],
    //   remainingOption: [
    //     "SELECT",
    //     "*",
    //     "FROM",
    //     "Employees",
    //     "WHERE",
    //     "Department",
    //     "<>",
    //     "'HR';",
    //   ],
    //   score: 0,
    //   time: "",
    //   attempt: 0,
    // },
    // // 4 - Question 4
    // {
    //   type: "a",
    //   level: "4",
    //   question:
    //     "Find duplicate records in an Employee table based on the 'Email' field.",
    //   options: [
    //     "SELECT",
    //     "Email,",
    //     "COUNT(*) FROM",
    //     "Employees",
    //     "GROUP",
    //     "BY",
    //     "Email",
    //     "HAVING",
    //     "COUNT(*)",
    //     ">",
    //     "1;",
    //   ],
    //   selectedOption: [],
    //   correctOption: [
    //     "SELECT",
    //     "Email,",
    //     "COUNT(*) FROM",
    //     "Employees",
    //     "GROUP",
    //     "BY",
    //     "Email",
    //     "HAVING",
    //     "COUNT(*)",
    //     ">",
    //     "1;",
    //   ],
    //   remainingOption: [
    //     "SELECT",
    //     "Email,",
    //     "COUNT(*) FROM",
    //     "Employees",
    //     "GROUP",
    //     "BY",
    //     "Email",
    //     "HAVING",
    //     "COUNT(*)",
    //     ">",
    //     "1;",
    //   ],
    //   score: 0,
    //   time: "",
    //   attempt: 0,
    // },
    // // 4 - Question 5
    // {
    //   type: "a",
    //   level: "4",
    //   question: "Write an SQL query to find the second highest salary.",
    //   options: [
    //     "SELECT",
    //     "MAX(Salary)",
    //     "FROM",
    //     "Employees",
    //     "WHERE",
    //     "Salary",
    //     "<",
    //     "(SELECT MAX(Salary) FROM Employees);",
    //   ],
    //   selectedOption: [],
    //   correctOption: [
    //     "SELECT",
    //     "MAX(Salary)",
    //     "FROM",
    //     "Employees",
    //     "WHERE",
    //     "Salary",
    //     "<",
    //     "(SELECT MAX(Salary) FROM Employees);",
    //   ],
    //   remainingOption: [
    //     "SELECT",
    //     "MAX(Salary)",
    //     "FROM",
    //     "Employees",
    //     "WHERE",
    //     "Salary",
    //     "<",
    //     "(SELECT MAX(Salary) FROM Employees);",
    //   ],
    //   score: 0,
    //   time: "",
    //   attempt: 0,
    // },
    // // 5 - Question 1
    // {
    //   type: "a",
    //   level: "5",
    //   question:
    //     "Find the name of the employee who earns the highest salary in each department.",
    //   option: [
    //     "SELECT",
    //     "Name,",
    //     "Department,",
    //     "Salary",
    //     "FROM",
    //     "Employees",
    //     "WHERE",
    //     "(Department, Salary)",
    //     "IN",
    //     "(SELECT Department, MAX(Salary) FROM Employees GROUP BY Department);",
    //   ],
    //   selectedOption: [],
    //   correctOption: [
    //     "SELECT",
    //     "Name,",
    //     "Department,",
    //     "Salary",
    //     "FROM",
    //     "Employees",
    //     "WHERE",
    //     "(Department, Salary)",
    //     "IN",
    //     "(SELECT Department, MAX(Salary) FROM Employees GROUP BY Department);",
    //   ],
    //   remainingOption: [
    //     "SELECT",
    //     "Name,",
    //     "Department,",
    //     "Salary",
    //     "FROM",
    //     "Employees",
    //     "WHERE",
    //     "(Department, Salary)",
    //     "IN",
    //     "(SELECT Department, MAX(Salary) FROM Employees GROUP BY Department);",
    //   ],
    //   score: 0,
    //   time: "",
    //   attempt: 0,
    // },
    // // 5 - Question 2
    // {
    //   type: "a",
    //   level: "5",
    //   question:
    //     "Write a query to fetch the employee(s) with the lowest salary.",
    //   options: [
    //     "SELECT",
    //     "*",
    //     "FROM",
    //     "Employees",
    //     "WHERE",
    //     "Salary",
    //     "=",
    //     "(SELECT MIN(Salary) FROM Employees);",
    //   ],
    //   selectedOption: [],
    //   correctOption: [
    //     "SELECT",
    //     "*",
    //     "FROM",
    //     "Employees",
    //     "WHERE",
    //     "Salary",
    //     "=",
    //     "(SELECT MIN(Salary) FROM Employees);",
    //   ],
    //   remainingOption: [
    //     "SELECT",
    //     "*",
    //     "FROM",
    //     "Employees",
    //     "WHERE",
    //     "Salary",
    //     "=",
    //     "(SELECT MIN(Salary) FROM Employees);",
    //   ],
    //   score: 0,
    //   time: "",
    //   attempt: 0,
    // },
    // // 5 - Question 3
    // {
    //   type: "a",
    //   level: "5",
    //   question:
    //     "Find employees whose salary is higher than their department's average salary.",
    //   options: [
    //     "SELECT",
    //     "*",
    //     "FROM",
    //     "Employees",
    //     "E",
    //     "WHERE",
    //     "Salary",
    //     ">",
    //     "(SELECT AVG(Salary) FROM Employees WHERE Department = E.Department);",
    //   ],
    //   selectedOption: [],
    //   correctOption: [
    //     "SELECT",
    //     "*",
    //     "FROM",
    //     "Employees",
    //     "E",
    //     "WHERE",
    //     "Salary",
    //     ">",
    //     "(SELECT AVG(Salary) FROM Employees WHERE Department = E.Department);",
    //   ],
    //   remainingOption: [
    //     "SELECT",
    //     "*",
    //     "FROM",
    //     "Employees",
    //     "E",
    //     "WHERE",
    //     "Salary",
    //     ">",
    //     "(SELECT AVG(Salary) FROM Employees WHERE Department = E.Department);",
    //   ],
    //   score: 0,
    //   time: "",
    //   attempt: 0,
    // },
    // // 5 - Question 4
    // {
    //   type: "a",
    //   level: "5",
    //   question: "Retrieve department names with at least 5 employees.",
    //   options: [
    //     "SELECT",
    //     "Department FROM",
    //     "Employees",
    //     "GROUP",
    //     "BY",
    //     "Department",
    //     "HAVING",
    //     "COUNT(*)",
    //     ">=",
    //     "5",
    //   ],
    //   selectedOption: [],
    //   correctOption: [
    //     "SELECT",
    //     "Department FROM",
    //     "Employees",
    //     "GROUP",
    //     "BY",
    //     "Department",
    //     "HAVING",
    //     "COUNT(*)",
    //     ">=",
    //     "5",
    //   ],
    //   remainingOption: [
    //     "SELECT",
    //     "Department FROM",
    //     "Employees",
    //     "GROUP",
    //     "BY",
    //     "Department",
    //     "HAVING",
    //     "COUNT(*)",
    //     ">=",
    //     "5",
    //   ],
    //   score: 0,
    //   time: "",
    //   attempt: 0,
    // },
    // // 5 - Question 5
    // {
    //   type: "a",
    //   level: "5",
    //   question:
    //     "Write a query to check if an Employee table has duplicate employee names.",
    //   options: [
    //     "SELECT",
    //     "Name,",
    //     "COUNT(*)",
    //     "FROM",
    //     "Employees",
    //     "GROUP",
    //     "BY",
    //     "Name",
    //     "HAVING",
    //     "COUNT(*) >",
    //     "1;",
    //   ],
    //   selectedOption: [],
    //   correctOption: [
    //     "SELECT",
    //     "Name,",
    //     "COUNT(*)",
    //     "FROM",
    //     "Employees",
    //     "GROUP",
    //     "BY",
    //     "Name",
    //     "HAVING",
    //     "COUNT(*) >",
    //     "1;",
    //   ],
    //   remainingOption: [
    //     "SELECT",
    //     "Name,",
    //     "COUNT(*)",
    //     "FROM",
    //     "Employees",
    //     "GROUP",
    //     "BY",
    //     "Name",
    //     "HAVING",
    //     "COUNT(*) >",
    //     "1;",
    //   ],
    //   score: 0,
    //   time: "",
    //   attempt: 0,
    // },
    // // 6 - Question 1
    // {
    //   type: "a",
    //   level: "6",
    //   question:
    //     "Write an SQL query to create a table Departments with columns: DeptID (Primary Key), DeptName, Location.",
    //   option: [
    //     "CREATE",
    //     "TABLE",
    //     "Departments",
    //     "(",
    //     "DeptID",
    //     "INT PRIMARY KEY,",
    //     "DeptName VARCHAR(50),",
    //     "Location VARCHAR(50)",
    //     ");",
    //   ],
    //   selectedOption: [],
    //   correctOption: [
    //     "CREATE",
    //     "TABLE",
    //     "Departments",
    //     "(",
    //     "DeptID",
    //     "INT PRIMARY KEY,",
    //     "DeptName VARCHAR(50),",
    //     "Location VARCHAR(50)",
    //     ");",
    //   ],
    //   remainingOption: [
    //     "CREATE",
    //     "TABLE",
    //     "Departments",
    //     "(",
    //     "DeptID",
    //     "INT PRIMARY KEY,",
    //     "DeptName VARCHAR(50),",
    //     "Location VARCHAR(50)",
    //     ");",
    //   ],
    //   score: 0,
    //   time: "",
    //   attempt: 0,
    // },
    // // 6 - Question 2
    // {
    //   type: "a",
    //   level: "6",
    //   question:
    //     "Write an SQL query to insert a new employee with details (ID: 101, Name: 'John Doe', Department: 'IT', Salary: 60000).",
    //   options: [
    //     "INSERT",
    //     "INTO",
    //     "Employees",
    //     "(ID, Name, Department, Salary)",
    //     "VALUES",
    //     "(101, 'John Doe', 'IT', 60000);",
    //   ],
    //   selectedOption: [],
    //   correctOption: [
    //     "INSERT",
    //     "INTO",
    //     "Employees",
    //     "(ID, Name, Department, Salary)",
    //     "VALUES",
    //     "(101, 'John Doe', 'IT', 60000);",
    //   ],
    //   remainingOption: [
    //     "INSERT",
    //     "INTO",
    //     "Employees",
    //     "(ID, Name, Department, Salary)",
    //     "VALUES",
    //     "(101, 'John Doe', 'IT', 60000);",
    //   ],
    //   score: 0,
    //   time: "",
    //   attempt: 0,
    // },
    // // 6 - Question 3
    // {
    //   type: "a",
    //   level: "6",
    //   question:
    //     "Write an SQL query to create a view named HighSalaryEmployees that displays employees earning more than 70,000.",
    //   options: [
    //     "CREATE",
    //     "VIEW",
    //     "HighSalaryEmployees",
    //     "AS",
    //     "SELECT",
    //     "*",
    //     "FROM",
    //     "Employees",
    //     "WHERE",
    //     "Salary",
    //     ">",
    //     "70000;",
    //   ],
    //   selectedOption: [],
    //   correctOption: [
    //     "CREATE",
    //     "VIEW",
    //     "HighSalaryEmployees",
    //     "AS",
    //     "SELECT",
    //     "*",
    //     "FROM",
    //     "Employees",
    //     "WHERE",
    //     "Salary",
    //     ">",
    //     "70000;",
    //   ],
    //   remainingOption: [
    //     "CREATE",
    //     "VIEW",
    //     "HighSalaryEmployees",
    //     "AS",
    //     "SELECT",
    //     "*",
    //     "FROM",
    //     "Employees",
    //     "WHERE",
    //     "Salary",
    //     ">",
    //     "70000;",
    //   ],
    //   score: 0,
    //   time: "",
    //   attempt: 0,
    // },
    // // 6 - Question 4
    // {
    //   type: "a",
    //   level: "6",
    //   question:
    //     "Write an SQL query to update the salary of employees in the 'Finance' department by 10%.",
    //   options: [
    //     "UPDATE",
    //     "Employees",
    //     "SET",
    //     "Salary",
    //     "=",
    //     "Salary * 1.10",
    //     "WHERE",
    //     "Department =",
    //     "'Finance';",
    //   ],
    //   selectedOption: [],
    //   correctOption: [
    //     "UPDATE",
    //     "Employees",
    //     "SET",
    //     "Salary",
    //     "=",
    //     "Salary * 1.10",
    //     "WHERE",
    //     "Department =",
    //     "'Finance';",
    //   ],
    //   remainingOption: [
    //     "UPDATE",
    //     "Employees",
    //     "SET",
    //     "Salary",
    //     "=",
    //     "Salary * 1.10",
    //     "WHERE",
    //     "Department =",
    //     "'Finance';",
    //   ],
    //   score: 0,
    //   time: "",
    //   attempt: 0,
    // },
    // // 6 - Question 5
    // {
    //   type: "a",
    //   level: "6",
    //   question:
    //     "Write an SQL query to delete employees who have not been assigned to any department.",
    //   options: [
    //     "DELETE",
    //     "FROM",
    //     "Employees",
    //     "WHERE",
    //     "Department",
    //     "IS",
    //     "NULL;",
    //   ],
    //   selectedOption: [],
    //   correctOption: [
    //     "DELETE",
    //     "FROM",
    //     "Employees",
    //     "WHERE",
    //     "Department",
    //     "IS",
    //     "NULL;",
    //   ],
    //   remainingOption: [
    //     "DELETE",
    //     "FROM",
    //     "Employees",
    //     "WHERE",
    //     "Department",
    //     "IS",
    //     "NULL;",
    //   ],
    //   score: 0,
    //   time: "",
    //   attempt: 0,
    // },
  ];
  const [quizData, setQuizData] = useState(originalQuiz);

  const value = {
    quizData,
    setQuizData,
  };

  return <MCQContext.Provider value={value}>{children}</MCQContext.Provider>;
};

export default ContextProviderCustom;
