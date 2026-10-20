const itemInput = document.getElementById("item");
const findButton = document.getElementById("find");
const statusLine = document.getElementById("status");
const cardName = document.getElementById("card-name");
const cardPrice = document.getElementById("card-price");
const slipBody = document.getElementById("slip");
const foundFigure = document.getElementById("found");
const dearestFigure = document.getElementById("dearest");

const history = new Map();

function setStatus(message, type = "") {
  statusLine.textContent = message;
  statusLine.className = "status-line" + (type ? " " + type : "");
}

function clearCard() {
  cardName.textContent = "";
  cardPrice.textContent = "";
}

function renderSlip() {
  slipBody.replaceChildren();
  for (const [name, record] of history) {
    const row = document.createElement("tr");
    const nameCell = document.createElement("td");
    const priceCell = document.createElement("td");
    const timesCell = document.createElement("td");
    nameCell.textContent = name;
    priceCell.textContent = record.price;
    timesCell.textContent = record.times;
    row.append(nameCell, priceCell, timesCell);
    slipBody.appendChild(row);
  }
  if (history.size === 0) {
    const row = document.createElement("tr");
    row.className = "empty-row";
    const cell = document.createElement("td");
    cell.colSpan = 3;
    cell.textContent = "Your found items will appear here.";
    row.appendChild(cell);
    slipBody.appendChild(row);
  }
  foundFigure.textContent = history.size;
  const prices = Array.from(history.values(), (record) => record.price);
  dearestFigure.textContent = prices.length ? Math.max(...prices) : 0;
}

async function findItem() {
  const item = itemInput.value.trim().toLowerCase();
  if (!item) {
    setStatus("undefined");
    return;
  }

  findButton.disabled = true;
  setStatus("Loading…", "loading");

  try {
    const response = await fetch("/api/price?item=" + encodeURIComponent(item));
    const result = await response.json();

    if (response.status === 404) {
      clearCard();
      setStatus(item + " is not in the shop.", "error");
      return;
    }
    if (!response.ok) throw new Error("Request failed");

    cardName.textContent = result.item;
    cardPrice.textContent = result.price;
    const existing = history.get(result.item);
    if (existing) {
      existing.times += 1;
    } else {
      history.set(result.item, { price: result.price, times: 1 });
    }
    renderSlip();
    setStatus(result.item + ": Rs " + result.price);
  } catch (error) {
    clearCard();
    setStatus("The server is not answering.", "error");
  } finally {
    findButton.disabled = false;
  }
}

findButton.addEventListener("click", findItem);
itemInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") findItem();
});
renderSlip();
