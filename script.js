// Initial list of employee objects with name, department, and salary
let employees = [
  {name: "Neha soni", department: "HR", salary: 55000 },
  {name: "atharv mishra", department: "Engineering", salary: 72000 },
  {name: "keya patadiya", department: "Marketing", salary: 48000 },
  {name: "yatri shah", department: "Management", salary: 80000 },
  {name: "rohan patel", department: "Sales", salary: 60000 },
  {name: "ram soni", department: "HR", salary: 70000 },
  {name: "tapan adeshara", department: "Computer Engineer", salary: 72000 },
];

// When the window loads, render the table and the department summary
window.onload = () => {
  renderTable(); // Display employee data in the table
  generateDepartmentSummary(); // Calculate and display department-wise summary
};

// Function to render the employee table dynamically
function renderTable() {
  const tbody = document.querySelector("#employeeTable tbody");
  tbody.innerHTML = ""; // Clear existing rows

  // Iterate over employees and create table rows
  employees.forEach((emp, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${emp.name}</td>
      <td>${emp.department}</td>
      <td>${emp.salary}</td>
      <td><button onclick="deleteEmployee(${index})">Delete</button></td>
    `;

    tbody.appendChild(row); // Append each row to the table body
  });
}

// Function to handle adding a new employee from the form
function handleAdd() {
  const name = document.getElementById("nameInput").value;
  const department = document.getElementById("deptInput").value;
  const salary = parseFloat(document.getElementById("salaryInput").value);

  // Basic validation to ensure all fields are filled correctly
  if (!name || !department || isNaN(salary)) {
    alert("Please enter valid details.");
    return;
  }

  // Push new employee to the array
  employees.push({ name, department, salary });

  // Re-render the table and summary to reflect the new addition
  renderTable();
  generateDepartmentSummary();

  // Clear input fields after adding
  document.getElementById("nameInput").value = "";
  document.getElementById("deptInput").value = "";
  document.getElementById("salaryInput").value = "";
}

// Function to delete an employee by index
function deleteEmployee(index) {
  employees.splice(index, 1); // Remove employee from array
  renderTable(); // Update the table view
  generateDepartmentSummary(); // Recalculate and update summary
}

// Function to compute total employees, total salary and average salary by department
function generateDepartmentSummary() {
  const summary = {}; // Object to store department-wise summary

  // Group employees by department and calculate totals
  employees.forEach(emp => {
    const dept = emp.department;
    if (!summary[dept]) {
      summary[dept] = { count: 0, totalSalary: 0 };
    }
    summary[dept].count += 1;
    summary[dept].totalSalary += emp.salary;
  });

  // Calculate average salary for each department
  for (const dept in summary) {
    summary[dept].avgSalary = (summary[dept].totalSalary / summary[dept].count).toFixed(2);
  }

  // Render the computed summary to the DOM
  renderSummary(summary);
}

// Function to display the department-wise summary on the page
function renderSummary(summaryData) {
  const summaryContainer = document.getElementById("summary");
  summaryContainer.innerHTML = ""; // Clear previous summary output

  // Loop through summary object and create DOM elements
  for (const dept in summaryData) {
    const { count, totalSalary, avgSalary } = summaryData[dept];

    const row = document.createElement("div");
    row.className = "summary-row";
    row.innerHTML = `
      <strong>${dept} Department</strong><br>
      Total Employees: ${count} <br>
      Total Salary: ₹${totalSalary.toLocaleString()} <br>
      Average Salary: ₹${avgSalary} <br><hr>
    `;

    summaryContainer.appendChild(row); // Add summary block to the page
  }
}
