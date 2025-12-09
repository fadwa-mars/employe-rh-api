const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

// Charger les données
const employees = require("../data/employees.json");
const departments = require("../data/departments.json");

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

// Lancer le serveur localement
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
