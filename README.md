# 🚀 EmployeRhManagement API

<p align="center">
  <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-v20-green?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js"></a>
  <a href="https://expressjs.com/"><img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js"></a>
  <a href="https://vercel.com/"><img src="https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel"></a>
  <a href="https://www.json.org/json-en.html"><img src="https://img.shields.io/badge/JSON-000000?style=for-the-badge&logo=json&logoColor=white" alt="JSON"></a>
</p>

Une API REST construite avec **Express.js** et déployée sur **Vercel**, permettant de gérer les employés et départements d’une entreprise **InnovateTech**.  
Elle offre un CRUD complet : **Ajouter, Afficher, Mettre à jour, Supprimer**.

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

## ✍️ Auteur

**Fadwa Mars**  
Développeuse Full-Stack | Passionnée par la gestion et le développement d’API  
[GitHub](https://github.com/fadwa-mars) | [LinkedIn](https://www.linkedin.com/in/marsfadwa)
