const loginSection = document.getElementById("login-section");
const dataSection = document.getElementById("data-section");
const tbody = document.getElementById("purchases-body");

function renderPurchases(purchases) {
  tbody.innerHTML = "";

  if (purchases.length === 0) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 6;
    cell.style.textAlign = "center";
    cell.textContent = "Nenhuma compra não finalizada.";
    row.appendChild(cell);
    tbody.appendChild(row);
    return;
  }

  purchases.forEach(p => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${p.id}</td>
      <td>${p.from}</td>
      <td>${p.to}</td>
      <td>${p.product}</td>
      <td>R$ ${p.value.toFixed(2)}</td>
      <td>${new Date(p.timestamp).toLocaleString("pt-BR")}</td>
      <td>
        <button class="action-btn confirm" onclick="confirmPurchase(${p.id})">✔️</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function fetchPurchasesWithToken(token) {
  return fetch("/api/v2/uncompletedPurchases", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
}

function tryLoadFromLocalStorage() {
  const savedToken = localStorage.getItem("admin_google_token");
  if (!savedToken) return;

  fetchPurchasesWithToken(savedToken)
    .then(async (res) => {
      if (!res.ok) throw new Error("Token inválido ou expirado");
      const purchases = await res.json();
      loginSection.style.display = "none";
      dataSection.style.display = "block";
      renderPurchases(purchases);
    })
    .catch(() => {
      localStorage.removeItem("admin_google_token");
      loginSection.style.display = "block";
      dataSection.style.display = "none";
    });
}

// Google Login Callback
function handleCredentialResponse(response) {
  const token = response.credential;
  localStorage.setItem("admin_google_token", token);

  fetchPurchasesWithToken(token)
    .then(async (res) => {
      if (!res.ok) throw new Error("Acesso não autorizado");
      const purchases = await res.json();
      loginSection.style.display = "none";
      dataSection.style.display = "block";
      renderPurchases(purchases);
    })
    .catch(err => {
      alert("Erro ao autenticar: " + err.message);
      console.error(err);
      localStorage.removeItem("admin_google_token");
    });
}

// Botões de ação
function confirmPurchase(id) {
  const token = localStorage.getItem("admin_google_token");
  if (!token) {
    alert("Token ausente. Faça login novamente.");
    return;
  }

  const confirmar = confirm("Tem certeza que deseja confirmar esta compra?");
  if (!confirmar) return;

  fetch("https://feira-de-jogos.dev.br/api/v2/confirmPurchase", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ purchaseId: id })
  })
    .then(async res => {
      const text = await res.text();
      if (!res.ok) throw new Error(text || "Erro desconhecido");
      alert("✔️ Compra confirmada com sucesso!");
      tryLoadFromLocalStorage();
    })
    .catch(err => {
      console.error("Erro ao confirmar compra:", err);
      alert("❌ Erro ao confirmar compra:\n" + err.message);
    });
}


window.addEventListener("DOMContentLoaded", () => {
  tryLoadFromLocalStorage();
});
