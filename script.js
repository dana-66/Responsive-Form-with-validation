document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  let form = this;
  let valid = true;

  // Prevent multiple toast messages
  if (document.getElementById("toast").classList.contains("show")) {
    return;
  }

  // Reset all error messages
  form.querySelectorAll(".error").forEach(function (error) {
    error.style.display = "none";
  });

  // Validate all inputs and textareas
  form.querySelectorAll("input, textarea").forEach(function (input) {
    if (input.value.trim() === "") {
      let errorElement = input.nextElementSibling;
      if (errorElement && errorElement.classList.contains("error")) {
        errorElement.style.display = "block"; 
      }
      input.setAttribute("aria-invalid", "true");
      valid = false;
    }
  });

  // Validate query type (radio buttons)
  let queryTypeSelected = form.querySelector('input[name="queryType"]:checked');
  let queryTypeError = form.querySelector(".radio-btns .error"); 
  if (!queryTypeSelected) {
    if (queryTypeError) {
      queryTypeError.style.display = "block"; 
    }
    form.querySelectorAll('input[name="queryType"]').forEach((radio) => {
      radio.setAttribute("aria-invalid", "true");
    });
    valid = false;
  }

  // Validate consent checkbox
  let consent = document.getElementById("consent");
  if (!consent.checked) {
    let consentError = consent.closest(".ch").nextElementSibling;
    if (consentError && consentError.classList.contains("error")) {
      consentError.style.display = "block"; 
    }
    consent.setAttribute("aria-invalid", "true");
    valid = false;
  } else {
    consent.removeAttribute("aria-invalid");
  }

  // If valid, submit the form and clear it, else show custom validity messages
  if (valid) {
    showToast();
    form.querySelector('button[type="submit"]').disabled = true;
    setTimeout(() => {
      form.querySelector('button[type="submit"]').disabled = false;
    }, 3000);

    form.reset();
  } else {
    // Trigger custom validity messages
    form.querySelectorAll("input, textarea").forEach((input) => {
      if (!input.checkValidity()) {
        input.setCustomValidity("Please fill in this field."); // Custom message
        input.reportValidity();
      }
    });
  }
});

// Function to show toast message
function showToast() {
  let toast = document.getElementById("toast");
  toast.classList.add("show");
  setTimeout(function () {
    toast.classList.remove("show");
  }, 3000);
}

// Add event listeners to clear error messages when user types or selects a value
document.querySelectorAll("input, textarea").forEach(function (input) {
  input.addEventListener("input", function () {
    let errorElement = input.nextElementSibling;
    if (
      errorElement &&
      errorElement.classList.contains("error") &&
      input.value.trim() !== ""
    ) {
      errorElement.style.display = "none";
    }
    input.removeAttribute("aria-invalid");
  });
});

// Add event listeners to clear error messages when user selects a radio button (queryType)
document.querySelectorAll('input[name="queryType"]').forEach(function (input) {
  input.addEventListener("change", function () {
    let errorElement = input.closest(".radio-btns").querySelector(".error");
    if (errorElement && input.checked) {
      errorElement.style.display = "none";
    }
  });
});

// Add event listener to clear error message when consent checkbox is checked
document.getElementById("consent").addEventListener("change", function () {
  let errorElement = this.closest(".ch").nextElementSibling;
  if (errorElement && this.checked) {
    errorElement.style.display = "none";
  }
});
