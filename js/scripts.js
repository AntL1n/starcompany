const loginButton = document.getElementById("login-button");
const formContainer = document.getElementById("form-container");
const formSteps = document.getElementById("form-steps");
const steps = formSteps.querySelectorAll(".step");
const circles = document.querySelectorAll("#progress-bar .circle");

formContainer.addEventListener("submit", (event) => {
  event.preventDefault();
});

steps.forEach((step, index) => {
  if (index !== 0) {
    step.style.display = "none";
  }
});

loginButton.addEventListener("click", () => {
  formContainer.style.display = "block";
  loginButton.style.display = "none";
});

const nextButtons = formSteps.querySelectorAll(".next-button");
const backButtons = formSteps.querySelectorAll(".back-button");
const errorContainer = document.getElementById("error-container");
errorContainer.style.display = "none";
const validateStep = async (step) => {
  const age = document.getElementById("age-select").value;
  const email = document.getElementById("email-input").value;
  const password = document.getElementById("password-input").value;
  const location = document.getElementById("location-input").value;

  const response = await fetch(
    "http://www.mocky.io/v2/5dfcef48310000ee0ed2c281",
    {
      method: "POST",
      body: JSON.stringify({ age, email, password, location }),
    }
  );

  const data = await response.json();

  const errors = data.errors;

  if (step === 2 && !age) {
    errorContainer.textContent = errors[0].message;
    errorContainer.style.display = "flex";
    return false;
  } else if (step === 3 && !location) {
    errorContainer.textContent = errors[3].message;
    errorContainer.style.display = "flex";
    return false;
  } else if (step === 4 && (!email || !validateEmail(email))) {
    errorContainer.textContent = errors[1].message;
    errorContainer.style.display = "flex";
    return false;
  } else if (step === 5 && !password) {
    errorContainer.textContent = errors[2].message;
    errorContainer.style.display = "flex";
    return false;
  }

  return true;
};

const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

nextButtons.forEach((button, index) => {
  button.addEventListener("click", async () => {
    const currentStep = index + 1;
    const isValid = await validateStep(currentStep);

    if (isValid) {
      formSteps.children[index].style.display = "none";
      formSteps.children[index + 1].style.display = "flex";

      circles[index]?.classList.remove("active");
      circles[index]?.classList.add("completed");
      circles[index + 1]?.classList.add("active");

      const errorContainer = document.getElementById("error-container");
      errorContainer.style.display = "none";
    }
  });
});

backButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    formSteps.children[index].style.display = "none";
    formSteps.children[index - 1].style.display = "flex";

    circles[index].classList.remove("completed");
    circles[index].classList.remove("active");
    circles[index - 1].classList.add("active");

    const errorContainer = document.getElementById("error-container");
    errorContainer.style.display = "none";
  });
});

const startButton = document.getElementById("step5-next");
startButton.addEventListener("click", async (event) => {
  event.preventDefault();
  const isValid = await validateStep(5);

  if (!isValid) {
    const errorContainer = document.getElementById("error-container");
    errorContainer.style.display = "flex";
  } else {
    const formContainer = document.getElementById("form-container");
    const loginForm = document.getElementById("login-form");
    formContainer.style.display = "none";
    loginForm.style.display = "flex";
  }
});

var x, i, j, l, ll, selElmnt, a, b, c;

x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;

  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);

  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function (e) {
      var y, i, k, s, h, sl, yl;
      s = this.parentNode.parentNode.getElementsByTagName("select")[0];
      sl = s.length;
      h = this.parentNode.previousSibling;
      for (i = 0; i < sl; i++) {
        if (s.options[i].innerHTML == this.innerHTML) {
          s.selectedIndex = i;
          h.innerHTML = this.innerHTML;
          y = this.parentNode.getElementsByClassName("same-as-selected");
          yl = y.length;
          for (k = 0; k < yl; k++) {
            y[k].removeAttribute("class");
          }
          this.setAttribute("class", "same-as-selected");
          break;
        }
      }
      h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function (e) {
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  var x,
    y,
    i,
    xl,
    yl,
    arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i);
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

document.addEventListener("click", closeAllSelect);
