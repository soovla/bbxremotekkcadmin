const express = require("express");
const app = express();

app.use(express.json());

// Jogadores online
let players = {};

// Comandos enviados pelo painel
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

/* --- TESTE --- */
app.get("/", (req, res) => {
    res.send("API do Painel Roblox funcionando!");
});

app.listen(10000, () => {
    console.log("Servidor rodando na porta 10000");
});
