# 🚀 EmployeRhManagement API

[![Node.js](https://img.shields.io/badge/Node.js-v20-green)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-4.x-yellow)](https://expressjs.com/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-blue)](https://vercel.com/)

Une API REST construite avec **Express.js** et déployée sur **Vercel**, permettant de gérer les employés et départements d’une entreprise **InnovateTech**.  
Elle supporte un CRUD complet : **Ajouter, Afficher, Mettre à jour, Supprimer**.

---

## 📂 Structure des Fichiers
employe-rh-api/ <br>
│ <br>
├─ api/ <br>
│ └─ index.js # Code Express avec routes CRUD <br>
├─ data/ <br>
│ ├─ employees.json # Liste des employés <br>
│ └─ departments.json # Liste des départements <br>
├─ package.json # Configuration du projet <br>
└─ vercel.json # Configuration pour Vercel <br>
---

## 🔗 Endpoints 

### 👥 Employés

| Méthode | Endpoint                   | Description                  |
|---------|----------------------------|------------------------------|
| GET     | `/employees`               | Récupérer tous les employés |
| GET     | `/employees/:matricule`    | Récupérer un employé par matricule |
| POST    | `/employees`               | Ajouter un employé           |
| PUT     | `/employees/:matricule`    | Mettre à jour un employé     |
| DELETE  | `/employees/:matricule`    | Supprimer un employé         |

### 🏢 Départements

| Méthode | Endpoint             | Description                   |
|---------|--------------------|-------------------------------|
| GET     | `/departments`      | Récupérer tous les départements |
| GET     | `/departments/:id`  | Récupérer un département par ID |
| POST    | `/departments`      | Ajouter un département         |
| PUT     | `/departments/:id`  | Mettre à jour un département   |
| DELETE  | `/departments/:id`  | Supprimer un département       |

---
## 🛠 Technologies Utilisées

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)  
[![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)  
[![JSON](https://img.shields.io/badge/JSON-000000?style=for-the-badge&logo=json&logoColor=white)](https://www.json.org/json-en.html)  
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

---
## ✍️ Auteur
Fadwa Mars - Développeuse Full-Stack | Passionnée par la gestion et le développement d’API
---