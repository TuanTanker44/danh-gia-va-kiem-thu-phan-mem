(function () {
  const TICKETS_DATA_URL = "tickets.json";
  const USERS_DATA_URL = "users.json";
  const USERS_MIRROR_KEY = "usersMirror";

  const loggedInUser = sessionStorage.getItem("loggedInUser");
  if (!loggedInUser) {
    window.location.href = "index.html";
    return;
  }

  let ticketsData = null;
  let users = [];

  const welcomeText = document.getElementById("welcomeText");
  const logoutLink = document.getElementById("logoutLink");
  const ticketTypeSelect = document.getElementById("ticketType");
  const ruleText = document.getElementById("ruleText");
  const ecTableBody = document.querySelector("#ecTable tbody");
  const bvTableBody = document.querySelector("#bvTable tbody");
  const bookingForm = document.getElementById("bookingForm");
  const fromTimeInput = document.getElementById("fromTime");
  const toTimeInput = document.getElementById("toTime");
  const timeError = document.getElementById("timeError");
  const priceLine = document.getElementById("priceLine");
  const buyBtn = document.getElementById("buyBtn");
  const statusMessage = document.getElementById("statusMessage");
  const mirrorSection = document.getElementById("mirrorSection");
  const mirrorOutput = document.getElementById("mirrorOutput");
  const copyMirrorBtn = document.getElementById("copyMirrorBtn");
  const resetMirrorBtn = document.getElementById("resetMirrorBtn");

  welcomeText.textContent = "Xin chào, " + loggedInUser;

  logoutLink.addEventListener("click", function (event) {
    event.preventDefault();
    sessionStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
  });

  function timeToMinutes(hhmm) {
    const parts = hhmm.split(":");
    return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
  }

  function isInWindows(minutes, windows) {
    return windows.some(function (w) {
      return minutes >= timeToMinutes(w.start) && minutes < timeToMinutes(w.end);
    });
  }

  function isPeak(minutes) {
    return isInWindows(minutes, ticketsData.peakWindows);
  }

  function findTicketType(id) {
    return ticketsData.ticketTypes.find(function (t) {
      return t.id === id;
    });
  }

  function showStatus(message, type) {
    statusMessage.textContent = message;
    statusMessage.className = "status-message" + (type ? " " + type : "");
  }

  function renderTicketTypeOptions() {
    ticketTypeSelect.innerHTML = "";
    ticketsData.ticketTypes.forEach(function (t) {
      const option = document.createElement("option");
      option.value = t.id;
      option.textContent = t.name + " (" + t.price.toLocaleString("vi-VN") + " đ)";
      ticketTypeSelect.appendChild(option);
    });
  }

  function renderTicketTypeDetails() {
    const ticketType = findTicketType(ticketTypeSelect.value);
    ruleText.textContent = ticketType.rule;

    ecTableBody.innerHTML = "";
    ticketType.equivalenceClasses.forEach(function (ec) {
      const row = document.createElement("tr");
      row.innerHTML =
        "<td>" + ec.id + "</td><td>" + ec.range + "</td><td>" + ec.description + "</td><td>" + ec.expected + "</td>";
      ecTableBody.appendChild(row);
    });

    bvTableBody.innerHTML = "";
    ticketType.boundaryValues.forEach(function (bv) {
      const row = document.createElement("tr");
      row.innerHTML = "<td>" + bv.value + "</td><td>" + bv.expected + "</td>";
      bvTableBody.appendChild(row);
    });
  }

  function evaluateBooking() {
    timeError.textContent = "";

    const fromValue = fromTimeInput.value;
    const toValue = toTimeInput.value;

    if (!fromValue || !toValue) {
      priceLine.textContent = "Giá vé: --";
      buyBtn.disabled = true;
      return null;
    }

    const fromMinutes = timeToMinutes(fromValue);
    const toMinutes = timeToMinutes(toValue);

    if (toMinutes <= fromMinutes) {
      timeError.textContent = "Giờ về phải sau Giờ đi.";
      priceLine.textContent = "Giá vé: --";
      buyBtn.disabled = true;
      return null;
    }

    const ticketType = findTicketType(ticketTypeSelect.value);
    const mustBeStandard = isPeak(fromMinutes) || isPeak(toMinutes);

    if (ticketType.id === "savings" && mustBeStandard) {
      timeError.textContent =
        "Giờ đi hoặc Giờ về rơi vào khung giờ cao điểm, chỉ được mua Vé thường cho chuyến này.";
      priceLine.textContent = "Giá vé: --";
      buyBtn.disabled = true;
      return null;
    }

    priceLine.textContent = "Giá vé: " + ticketType.price.toLocaleString("vi-VN") + " đ";
    buyBtn.disabled = false;
    return { ticketType: ticketType, from: fromValue, to: toValue };
  }

  function loadUsersMirror() {
    const raw = localStorage.getItem(USERS_MIRROR_KEY);
    return raw ? JSON.parse(raw) : null;
  }

  function saveUsersMirror() {
    localStorage.setItem(USERS_MIRROR_KEY, JSON.stringify(users, null, 2));
  }

  function showMirrorOutput() {
    mirrorSection.hidden = false;
    mirrorOutput.value = JSON.stringify(users, null, 2);
  }

  async function loadUsers() {
    const mirror = loadUsersMirror();
    if (mirror) {
      users = mirror;
      return;
    }
    const response = await fetch(USERS_DATA_URL);
    if (!response.ok) {
      throw new Error("HTTP " + response.status);
    }
    users = await response.json();
  }

  bookingForm.addEventListener("submit", function (event) {
    event.preventDefault();
    showStatus("", "");

    const booking = evaluateBooking();
    if (!booking) {
      return;
    }

    const user = users.find(function (u) {
      return u.username === loggedInUser;
    });

    if (!user) {
      showStatus("Không tìm thấy tài khoản " + loggedInUser + " trong dữ liệu users.json.", "error");
      return;
    }

    if (!Array.isArray(user.tickets)) {
      user.tickets = [];
    }

    user.tickets.push({
      type: booking.ticketType.id,
      typeName: booking.ticketType.name,
      from: booking.from,
      to: booking.to,
      price: booking.ticketType.price,
      purchasedAt: new Date().toISOString()
    });

    saveUsersMirror();
    showMirrorOutput();
    showStatus(
      "Mua vé thành công! " + booking.ticketType.name + " - " + booking.ticketType.price.toLocaleString("vi-VN") + " đ",
      "success"
    );
  });

  [ticketTypeSelect].forEach(function (el) {
    el.addEventListener("change", function () {
      renderTicketTypeDetails();
      evaluateBooking();
    });
  });

  [fromTimeInput, toTimeInput].forEach(function (el) {
    el.addEventListener("change", evaluateBooking);
  });

  copyMirrorBtn.addEventListener("click", function () {
    navigator.clipboard.writeText(mirrorOutput.value).then(function () {
      showStatus("Đã sao chép nội dung users.json vào clipboard.", "success");
    });
  });

  resetMirrorBtn.addEventListener("click", async function () {
    localStorage.removeItem(USERS_MIRROR_KEY);
    await loadUsers();
    mirrorSection.hidden = true;
    showStatus("Đã đặt lại dữ liệu mô phỏng về đúng users.json gốc.", "success");
  });

  async function init() {
    try {
      const response = await fetch(TICKETS_DATA_URL);
      if (!response.ok) {
        throw new Error("HTTP " + response.status);
      }
      ticketsData = await response.json();
      renderTicketTypeOptions();
      renderTicketTypeDetails();
      await loadUsers();
    } catch (err) {
      showStatus(
        "Không thể tải dữ liệu (tickets.json / users.json). Hãy mở trang qua một local server.",
        "error"
      );
    }
  }

  init();
})();
