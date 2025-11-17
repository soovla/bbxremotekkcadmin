const API = "https://SEU-SITE-RENDER.onrender.com"; // coloque o link quando publicar

async function carregarJogadores() {
    const r = await fetch(API + "/players");
    const players = await r.json();

    const container = document.getElementById("players");
    const search = document.getElementById("search").value.toLowerCase();

    container.innerHTML = "";

    Object.values(players)
        .filter(p => p.name.toLowerCase().includes(search))
        .forEach(p => {
            container.innerHTML += `
                <div class="player">
                    <div class="name">${p.name}</div>
                    <div class="id">UserId: ${p.userId}</div>

                    <div style="display:flex;justify-content:space-between;">
                        <button class="btn kick" onclick="sendCmd('kick',${p.userId})">Kick</button>
                        <button class="btn ban" onclick="sendCmd('ban',${p.userId})">Ban</button>
                    </div>
                </div>
            `;
        });
}

async function sendCmd(action, userId) {
    await fetch(API + "/command", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ action, userId })
    });

    alert(action.toUpperCase() + " enviado para " + userId);
}

setInterval(carregarJogadores, 1000);
document.getElementById("search").addEventListener("input", carregarJogadores);
