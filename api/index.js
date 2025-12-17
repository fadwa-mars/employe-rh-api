const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

// Chemins vers les fichiers JSON
const employeesPath = path.join(__dirname, "..", "data", "employees.json");
const departmentsPath = path.join(__dirname, "..", "data", "departments.json");

// Charger les données
let employees = [];
let departments = [];

try {
  employees = JSON.parse(fs.readFileSync(employeesPath, "utf8"));
} catch (e) {
  employees = [];
}

try {
  departments = JSON.parse(fs.readFileSync(departmentsPath, "utf8"));
} catch (e) {
  departments = [];
}

// Helper: détection Vercel (serverless -> pas d’écriture disque)
const isServerless = !!process.env.VERCEL;

// 🔹 Générateur de matricule incrémenté
function generateMatricule() {
  const nums = employees
    .map(e => {
      const match = e.matricule?.match(/^EMP(\d+)$/);
      return match ? parseInt(match[1], 10) : null;
    })
    .filter(n => n !== null);

  const next = (nums.length ? Math.max(...nums) : 0) + 1;
  return `EMP${String(next).padStart(3, "0")}`;
}

// Racine
app.get("/", (req, res) => {
  res.send("Employees API — RH Management 🚀");
});

// GET all employees
app.get("/employees", (req, res) => {
  res.json(employees);
});

// GET employee by matricule
app.get("/employees/:matricule", (req, res) => {
  const employee = employees.find(e => e.matricule === req.params.matricule);
  if (!employee) return res.status(404).json({ error: "Employé non trouvé" });
  res.json(employee);
});

// POST new employee (matricule auto)
app.post("/employees", (req, res) => {
  const { nom, prenom, poste, departement, salaire, dateEmbauche, email, telephone } = req.body;

  // Validation basique
  const missing = [];
  if (!nom) missing.push("nom");
  if (!prenom) missing.push("prenom");
  if (!poste) missing.push("poste");
  if (!departement) missing.push("departement");
  if (!email) missing.push("email");
  if (missing.length) return res.status(400).json({ error: "Champs requis manquants", fields: missing });

  const newEmployee = {
    matricule: generateMatricule(), // ✅ auto incrémenté
    nom,
    prenom,
    poste,
    departement,
    salaire: salaire ?? null,
    dateEmbauche: dateEmbauche ?? null,
    email,
    telephone: telephone ?? null
  };

  employees.push(newEmployee);

  if (!isServerless) {
    try {
      fs.writeFileSync(employeesPath, JSON.stringify(employees, null, 2));
    } catch (e) {
      console.error("Erreur écriture fichier:", e);
    }
  }

  res.status(201).json(newEmployee);
});

// PUT update employee
app.put("/employees/:matricule", (req, res) => {
  const index = employees.findIndex(e => e.matricule === req.params.matricule);
  if (index === -1) return res.status(404).json({ error: "Employé non trouvé" });

  // 🔹 Empêcher modification du matricule
  const { matricule, ...updates } = req.body;
  employees[index] = { ...employees[index], ...updates };

  if (!isServerless) {
    try {
      fs.writeFileSync(employeesPath, JSON.stringify(employees, null, 2));
    } catch (e) {
      console.error("Erreur écriture fichier:", e);
    }
  }

  res.json(employees[index]);
});

// DELETE employee
app.delete("/employees/:matricule", (req, res) => {
  const index = employees.findIndex(e => e.matricule === req.params.matricule);
  if (index === -1) return res.status(404).json({ error: "Employé non trouvé" });

  const deleted = employees.splice(index, 1);

  if (!isServerless) {
    try {
      fs.writeFileSync(employeesPath, JSON.stringify(employees, null, 2));
    } catch (e) {
      console.error("Erreur écriture fichier:", e);
    }
  }

  res.json(deleted[0]);
});

// GET all departments
app.get("/departments", (req, res) => {
  res.json(departments);
});

// GET department by ID
app.get("/departments/:id", (req, res) => {
  const dept = departments.find(d => d.id === req.params.id);
  if (!dept) return res.status(404).json({ error: "Département non trouvé" });
  res.json(dept);
});

// Info persistance
app.get("/_info", (req, res) => {
  res.json({
    serverless: isServerless,
    persistence: isServerless
      ? "In-memory only on Vercel. Use a database for real persistence."
      : "JSON file writes enabled locally."
  });
});

module.exports = app;
