const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid"); // pour générer matricule automatiquement

const app = express();
app.use(express.json());
app.use(cors());

// Charger les données
const employeesPath = path.join(__dirname, "..", "data", "employees.json");
const departmentsPath = path.join(__dirname, "..", "data", "departments.json");

let employees = JSON.parse(fs.readFileSync(employeesPath, "utf8"));
let departments = JSON.parse(fs.readFileSync(departmentsPath, "utf8"));

// Route racine
app.get("/", (req, res) => {
  res.send("Employees API — RH Management 🚀");
});

// Tous les employés
app.get("/employees", (req, res) => {
  res.json(employees);
});

// Détail d’un employé par matricule
app.get("/employees/:matricule", (req, res) => {
  const { matricule } = req.params;
  const employee = employees.find(e => e.matricule === matricule);
  if (!employee) return res.status(404).json({ error: "Employé non trouvé" });
  res.json(employee);
});

// Ajouter un employé (matricule généré automatiquement)
app.post("/employees", (req, res) => {
  const newEmployee = { matricule: uuidv4(), ...req.body };
  employees.push(newEmployee);
  fs.writeFileSync(employeesPath, JSON.stringify(employees, null, 2));
  res.status(201).json(newEmployee);
});

// Tous les départements
app.get("/departments", (req, res) => {
  res.json(departments);
});

// Détail d’un département par id
app.get("/departments/:id", (req, res) => {
  const { id } = req.params;
  const dept = departments.find(d => d.id === id);
  if (!dept) return res.status(404).json({ error: "Département non trouvé" });
  res.json(dept);
});

// Exporter pour Vercel
module.exports = app;