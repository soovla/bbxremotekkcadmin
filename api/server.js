const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());

// 1) SERVIR PAINEL HTML ESTÁTICO
app.use(express.static(path.join(__dirname, "public")));

// Jogadores online
let players = {};
let commands = [];

/* --- ROBLOX ENVIA ENTRADA / SAÍDA --- */
app.post("/updatePlayers", (req, res) => {
    const data = req.body;

    if (data.event === "join") {
        players[data.userId] = data;
    } 
    else if (data.event === "leave") {
        delete players[data.userId];
    }

    res.json({ ok: true });
});

/* --- PAINEL PEDE LISTA DE PLAYERS --- */
app.get("/players", (req, res) => {
    res.json(players);
});

/* --- PAINEL ENVIA COMANDO (kick/ban) --- */
app.post("/command", (req, res) => {
    commands.push(req.body);
    res.json({ ok: true });
});

/* --- ROBLOX BUSCA COMANDOS --- */
app.get("/commands", (req, res) => {
    const result = [...commands];
    commands = [];
    res.json(result);
});

/* --- SE A ROTA NÃO EXISTE, DEVOLVE O INDEX.HTML (SPA fallback) --- */
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(10000, () => {
    console.log("Servidor rodando na porta 10000");
});
