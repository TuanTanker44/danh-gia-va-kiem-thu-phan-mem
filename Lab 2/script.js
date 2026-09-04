(function () {
  const USERNAME_MIN = 6;
  const USERNAME_MAX = 20;
  const PASSWORD_MIN = 6;
  const PASSWORD_MAX = 25;
  const MAX_FAILED_ATTEMPTS = 5;
  const LOCK_DURATION_MS = 15 * 60 * 1000; // 15 phút

  const USERS_DATA_URL = "users.json";

  const STORAGE_FAILED_ATTEMPTS = "failedAttempts";
  const STORAGE_LOCK_UNTIL = "lockUntil";

  let users = [];
  let usersLoaded = false;

  const form = document.getElementById("loginForm");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const usernameError = document.getElementById("usernameError");
  const passwordError = document.getElementById("passwordError");
  const loginBtn = document.getElementById("loginBtn");
  const lockHint = document.getElementById("lockHint");
  const statusMessage = document.getElementById("statusMessage");

  function getFailedAttempts() {
    return parseInt(localStorage.getItem(STORAGE_FAILED_ATTEMPTS) || "0", 10);
  }

  function setFailedAttempts(count) {
    localStorage.setItem(STORAGE_FAILED_ATTEMPTS, String(count));
  }

  function getLockUntil() {
    const value = localStorage.getItem(STORAGE_LOCK_UNTIL);
    return value ? parseInt(value, 10) : null;
  }

  function setLockUntil(timestamp) {
    localStorage.setItem(STORAGE_LOCK_UNTIL, String(timestamp));
  }

  function clearLock() {
    localStorage.removeItem(STORAGE_LOCK_UNTIL);
    localStorage.removeItem(STORAGE_FAILED_ATTEMPTS);
  }

  function isLocked() {
    const lockUntil = getLockUntil();
    if (!lockUntil) return false;
    if (Date.now() >= lockUntil) {
      // Đã hết thời gian khóa -> tự động mở khóa
      clearLock();
      return false;
    }
    return true;
  }

  function applyLockedUI(locked) {
    lockHint.hidden = !locked;
    loginBtn.disabled = locked || !usersLoaded;
    usernameInput.disabled = locked;
    passwordInput.disabled = locked;
  }

  async function loadUsers() {
    try {
      const response = await fetch(USERS_DATA_URL);
      if (!response.ok) {
        throw new Error("HTTP " + response.status);
      }
      users = await response.json();
      usersLoaded = true;
      refreshLockUI();
    } catch (err) {
      showStatus(
        "Không thể tải dữ liệu tài khoản (users.json). Hãy mở trang qua một local server thay vì mở file trực tiếp.",
        "error"
      );
    }
  }

  function showStatus(message, type) {
    statusMessage.textContent = message;
    statusMessage.className = "status-message" + (type ? " " + type : "");
  }

  function clearFieldError(input, errorEl) {
    input.classList.remove("invalid");
    errorEl.textContent = "";
  }

  function setFieldError(input, errorEl, message) {
    input.classList.add("invalid");
    errorEl.textContent = message;
  }

  function validateUsername(value) {
    if (value.length === 0) {
      return "Vui lòng nhập tài khoản.";
    }
    if (value.length < USERNAME_MIN || value.length > USERNAME_MAX) {
      return `Tài khoản phải có từ ${USERNAME_MIN} đến ${USERNAME_MAX} ký tự.`;
    }
    return "";
  }

  function validatePassword(value) {
    if (value.length === 0) {
      return "Vui lòng nhập mật khẩu.";
    }
    if (value.length < PASSWORD_MIN || value.length > PASSWORD_MAX) {
      return `Mật khẩu phải có từ ${PASSWORD_MIN} đến ${PASSWORD_MAX} ký tự.`;
    }
    return "";
  }

  function refreshLockUI() {
    applyLockedUI(isLocked());
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    showStatus("", "");

    if (isLocked()) {
      applyLockedUI(true);
      return;
    }

    if (!usersLoaded) {
      showStatus("Dữ liệu tài khoản chưa sẵn sàng, vui lòng thử lại.", "error");
      return;
    }

    const username = usernameInput.value;
    const password = passwordInput.value;

    const usernameMsg = validateUsername(username);
    const passwordMsg = validatePassword(password);

    if (usernameMsg) {
      setFieldError(usernameInput, usernameError, usernameMsg);
    } else {
      clearFieldError(usernameInput, usernameError);
    }

    if (passwordMsg) {
      setFieldError(passwordInput, passwordError, passwordMsg);
    } else {
      clearFieldError(passwordInput, passwordError);
    }

    if (usernameMsg || passwordMsg) {
      return;
    }

    const matchedUser = users.find(function (user) {
      return user.username === username && user.password === password;
    });

    if (matchedUser) {
      clearLock();
      showStatus("Đăng nhập thành công!", "success");
      return;
    }

    const failedAttempts = getFailedAttempts() + 1;

    if (failedAttempts >= MAX_FAILED_ATTEMPTS) {
      setLockUntil(Date.now() + LOCK_DURATION_MS);
      setFailedAttempts(0);
      applyLockedUI(true);
      showStatus("", "");
    } else {
      setFailedAttempts(failedAttempts);
      const remaining = MAX_FAILED_ATTEMPTS - failedAttempts;
      showStatus(
        `Sai tài khoản hoặc mật khẩu. Bạn còn ${remaining} lần thử.`,
        "error"
      );
    }
  });

  [usernameInput, passwordInput].forEach(function (input) {
    input.addEventListener("input", function () {
      if (input === usernameInput) clearFieldError(usernameInput, usernameError);
      if (input === passwordInput) clearFieldError(passwordInput, passwordError);
    });
  });

  refreshLockUI();
  // Kiểm tra định kỳ để tự mở khóa ngay khi hết 15 phút mà không cần tải lại trang
  setInterval(refreshLockUI, 1000);
  loadUsers();
})();
