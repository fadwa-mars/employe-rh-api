const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(express.json());
app.use(cors());

// Chemins vers les fichiers JSON
const employeesPath = path.join(__dirname, "..", "data", "employees.json");
const departmentsPath = path.join(__dirname, "..", "data", "departments.json");

// Charger les données
let employees = JSON.parse(fs.readFileSync(employeesPath, "utf8"));
let departments = JSON.parse(fs.readFileSync(departmentsPath, "utf8"));

// 🔍 GET all employees
app.get("/employees", (req, res) => {
  res.json(employees);
});

// 🔍 GET employee by matricule
app.get("/employees/:matricule", (req, res) => {
  const employee = employees.find(e => e.matricule === req.params.matricule);
  if (!employee) return res.status(404).json({ error: "Employé non trouvé" });
  res.json(employee);
});

// ➕ POST new employee
app.post("/employees", (req, res) => {
  const { nom, prenom, poste, departement, salaire, dateEmbauche, email, telephone } = req.body;
  const newEmployee = {
    matricule: uuidv4(),
    nom,
    prenom,
    poste,
    departement,
    salaire,
    dateEmbauche,
    email,
    telephone
  };
  employees.push(newEmployee);
  fs.writeFileSync(employeesPath, JSON.stringify(employees, null, 2));
  res.status(201).json(newEmployee);
});

// ✏️ PUT update employee
app.put("/employees/:matricule", (req, res) => {
  const index = employees.findIndex(e => e.matricule === req.params.matricule);
  if (index === -1) return res.status(404).json({ error: "Employé non trouvé" });

  employees[index] = { ...employees[index], ...req.body };
  fs.writeFileSync(employeesPath, JSON.stringify(employees, null, 2));
  res.json(employees[index]);
});

// ❌ DELETE employee
app.delete("/employees/:matricule", (req, res) => {
  const index = employees.findIndex(e => e.matricule === req.params.matricule);
  if (index === -1) return res.status(404).json({ error: "Employé non trouvé" });

  const deleted = employees.splice(index, 1);
  fs.writeFileSync(employeesPath, JSON.stringify(employees, null, 2));
  res.json(deleted[0]);
});

// 📁 GET all departments
app.get("/departments", (req, res) => {
  res.json(departments);
});

// 📁 GET department by ID
app.get("/departments/:id", (req, res) => {
  const dept = departments.find(d => d.id === req.params.id);
  if (!dept) return res.status(404).json({ error: "Département non trouvé" });
  res.json(dept);
});

// ✅ Exporter l’app pour Vercel
module.exports = app;