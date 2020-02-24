const express = require("express");

const server = express();

// Necessário para receber json por post
server.use(express.json());

// Mock de armazenamento de dados de projetos em memória
const projectsData = new Map();
Map.prototype.toArray = function() {
    return [...this.values()];
};

// Listar todos os projetos
server.get("/projects", (req, res) => {
    return res.json(projectsData.toArray());
});

// Criar projeto
server.post("/projects", (req, res) => {
    const { id, title } = req.body;

    projectsData.set(id, {id, title});

    return res.json(projectsData.toArray());
});

// Editar projeto
server.put("/projects/:id", (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const projectData = projectsData.get(id);
    projectData.title = title;
    projectsData.set(id, projectData);

    return res.json(projectsData.toArray());
});

// Deletar projeto
server.delete("/projects/:id", (req, res) => {
    const { id } = req.params;

    projectsData.delete(id);

    return res.json(projectsData.toArray());
});

// Deletar projeto
server.post("/projects/:id/tasks", (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const projectData = projectsData.get(id);
    if(!projectData.tasks) {
        projectData.tasks = [];        
    }
    projectData.tasks.push(title);
    projectsData.set(id, projectData);

    return res.json(projectsData.toArray());
});

server.listen(3000);
