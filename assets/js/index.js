const mobileMenuBtn = document.getElementById("mobile-menu-toggle");
const navLinksContainer = document.querySelector(".nav-links");
const navLinks = document.getElementsByClassName("nav-link");
const sections = document.querySelectorAll("section[id]");
const themeToggler = document.getElementById("theme-toggle-button");
const settingsToggler = document.getElementById("settings-toggle");
const settingsSidebar = document.getElementById("settings-sidebar");
const settingsSidebarClose = document.getElementById("close-settings");
const resettingButton = document.getElementById("reset-settings");
const themes = [
    {
        title: "Purple Blue",
        primary: "#6366f1",
        secondary: "#8b5cf6",
        accent: "#a855f7"
    },
    {
        title: "Pink Orange",
        primary: "#ec4899",
        secondary: "#f97316",
        accent: "#fb923c"
    },
    {
        title: "Green Emerald",
        primary: "#10b981",
        secondary: "#059669",
        accent: "#34d399"
    },
    {
        title: "Blue Cyan",
        primary: "#3b82f6",
        secondary: "#06b6d4",
        accent: "#22d3ee"
    },
    {
        title: "Red Rose",
        primary: "#ef4444",
        secondary: "#f43f5e",
        accent: "#fb7185"
    },
    {
        title: "Amber Orange",
        primary: "#f59e0b",
        secondary: "#ea580c",
        accent: "#fbbf24"

    }
]
const themeColorsGrid = document.getElementById("theme-colors-grid");
const themeGridButtons = themeColorsGrid.children
const fontButtons = document.querySelectorAll(".font-option")
setMode();

mobileMenuBtn.addEventListener("click", function () {
    navLinksContainer.classList.toggle("active");
    const isOpen = navLinksContainer.classList.contains("active");
    mobileMenuBtn.setAttribute("aria-expanded", isOpen);
});

let isScrollingByClick = false;
for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener("click", function () {
        isScrollingByClick = true;

    })
}

window.addEventListener("scroll", function () {
    if (isScrollingByClick) {
        return
    }

})

window.addEventListener("scrollend", function () {
    isScrollingByClick = false;
    let currentSectionID = "";
    for (let j = 0; j < sections.length; j++) {
        let rect = sections[j].getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
            currentSectionID = sections[j].getAttribute("id");
        }
    }
    for (let k = 0; k < navLinks.length; k++) {
        navLinks[k].classList.remove("active");
        if ("#" + currentSectionID === navLinks[k].getAttribute("href")) {
            navLinks[k].classList.add("active");
        }
    }
})

// SideBar functionalities

themeToggler.addEventListener("click", function () {
    document.querySelector("html").classList.toggle("dark");
    if (document.querySelector("html").classList.contains("dark")) {
        localStorage.setItem("mode", "dark")
    } else {
        localStorage.setItem("mode", "light")
    }
})

function setMode() {
    const mode = localStorage.getItem("mode");
    if (mode === null || mode === "dark") {
        document.documentElement.classList.add("dark");
    } else {
        document.documentElement.classList.remove("dark");
    }
}

settingsToggler.addEventListener("click", function () {
    settingsSidebar.classList.replace("translate-x-full", "translate-x-0");
    settingsToggler.style.right = "20rem"
})

settingsSidebarClose.addEventListener("click", function () {
    settingsSidebar.classList.replace("translate-x-0", "translate-x-full");
    settingsToggler.style.right = "0rem"
})

for (let i = 0; i < themes.length; i++) {
    let themeButton = document.createElement("button")
    themeButton.className = "w-12 h-12 rounded-full cursor-pointer transition-transform hover:scale-110 border-2 border-slate-200 dark:border-slate-700 hover:border-primary shadow-sm ";
    themeButton.title = `${themes[i].title}`;
    themeButton.setAttribute("data-primary", `${themes[i].primary}`);
    themeButton.setAttribute("data-secondary", `${themes[i].secondary}`);
    themeButton.style.background = `linear-gradient(135deg, ${themes[i].primary}, ${themes[i].secondary})`;
    themeButton.style.setProperty("--color-primary", themes[i].primary);
    themeColorsGrid.appendChild(themeButton);
}

for (let i = 0; i < themeGridButtons.length; i++) {
    themeGridButtons[i].addEventListener("click", function () {
        for (let j = 0; j < themeGridButtons.length; j++) {
            themeGridButtons[j].classList.remove("ring-2", "ring-primary", "ring-offset-2", "ring-offset-white", "dark:ring-offset-slate-900")
        }
        themeGridButtons[i].classList.add("ring-2", "ring-primary", "ring-offset-2", "ring-offset-white", "dark:ring-offset-slate-900")
        applyThemeOnPage(themes[i]);
    })
}

function setTheme() {
    let selectedTheme = JSON.parse(localStorage.getItem("selectedTheme"));

    if (!selectedTheme) {
        applyThemeOnPage(themes[0]);
    } else {
        applyThemeOnPage(selectedTheme);
    }
}
function applyThemeOnPage(theme) {
    for (let i = 0; i < themeGridButtons.length; i++) {
        if (themeGridButtons[i].getAttribute("data-primary") === theme.primary) {
            for (let j = 0; j < themeGridButtons.length; j++) {
                themeGridButtons[j].classList.remove("ring-2", "ring-primary", "ring-offset-2", "ring-offset-white", "dark:ring-offset-slate-900")
            }
            themeGridButtons[i].classList.add("ring-2", "ring-primary", "ring-offset-2", "ring-offset-white", "dark:ring-offset-slate-900")
            break;
        }
    }
    document.documentElement.style.setProperty("--color-primary", theme.primary);
    document.documentElement.style.setProperty("--color-secondary", theme.secondary);
    document.documentElement.style.setProperty("--color-accent", theme.accent);
    localStorage.setItem("selectedTheme", JSON.stringify(theme))
}

setTheme();

for (let i = 0; i < fontButtons.length; i++) {
    fontButtons[i].addEventListener("click", function () {
        for (let j = 0; j < fontButtons.length; j++) {
            fontButtons[j].classList.remove("active", "border-primary", "bg-slate-50", "dark:bg-slate-800")
            fontButtons[j].classList.add("border-slate-200", "dark:border-slate-700")
            fontButtons[j].setAttribute("aria-checked", 'false')
        }
        fontButtons[i].classList.remove("border-slate-200", "dark:border-slate-700")
        fontButtons[i].classList.add("active", "border-primary", "bg-slate-50", "dark:bg-slate-800")
        fontButtons[i].setAttribute("aria-checked", "true")


        let fontType = fontButtons[i].getAttribute("data-font");
        applyFontOnPage(fontType)
    })
}

function applyFontOnPage(fontType) {
    document.body.classList.remove("font-alexandria", "font-tajawal", "font-cairo");
    document.body.classList.add(`font-${fontType}`);
    localStorage.setItem("fontFamily", JSON.stringify(fontType))

}

function setFont() {
    if (!localStorage.getItem("fontFamily")) {
        localStorage.setItem("fontFamily", JSON.stringify("tajawal"));
    }
    document.body.classList.add(`font-${JSON.parse(localStorage.getItem("fontFamily"))}`)
    for (let i = 0; i < fontButtons.length; i++) {
        for (let j = 0; j < fontButtons.length; j++) {
            fontButtons[j].classList.remove("active", "border-primary", "bg-slate-50", "dark:bg-slate-800")
            fontButtons[j].classList.add("border-slate-200", "dark:border-slate-700")
            fontButtons[j].setAttribute("aria-checked", 'false')
        }
        if (fontButtons[i].getAttribute("data-font") == JSON.parse(localStorage.getItem("fontFamily"))) {
            fontButtons[i].classList.remove("border-slate-200", "dark:border-slate-700")
            fontButtons[i].classList.add("active", "border-primary", "bg-slate-50", "dark:bg-slate-800")
            fontButtons[i].setAttribute("aria-checked", "true")
            break
        }
    }
}
setFont();

// reseting button

function applyDefaultFont() {
    for (let j = 0; j < fontButtons.length; j++) {
        fontButtons[j].classList.remove("active", "border-primary", "bg-slate-50", "dark:bg-slate-800")
        fontButtons[j].classList.add("border-slate-200", "dark:border-slate-700")
        fontButtons[j].setAttribute("aria-checked", 'false')
    }
    for (let i = 0; i < fontButtons.length; i++) {
        if (fontButtons[i].getAttribute("data-font") === "tajawal") {
            fontButtons[i].classList.remove("border-slate-200", "dark:border-slate-700")
            fontButtons[i].classList.add("active", "border-primary", "bg-slate-50", "dark:bg-slate-800")
            fontButtons[i].setAttribute("aria-checked", "true")
        }
    }
    applyFontOnPage("tajawal")
}

let resetSettings = () => {
    applyThemeOnPage(themes[0]);
    applyDefaultFont()
    settingsSidebar.classList.replace("translate-x-0", "translate-x-full");
    settingsToggler.style.right = "0rem"
}

resettingButton.addEventListener("click", () => {
    resetSettings();
})

// Portofolio section
const portfolioButtons = document.querySelectorAll(".portfolio-filter");
const portfolioItems = document.querySelectorAll(".portfolio-item")
const tabsActiveClasses = ["active", "bg-linear-to-r", "from-primary", "to-secondary", "text-white", "hover:shadow-lg", "hover:shadow-primary/50"]
const tabsInactiveClasses = ["bg-white", "dark:bg-slate-800", "text-slate-600", "dark:text-slate-300", "hover:bg-slate-100", "dark:hover:bg-slate-700", "border", "border-slate-300", "dark:border-slate-700"]
portfolioItems.forEach(item => {
    item.style.transition = "opacity 0.3s , transform 0.3s"
})
portfolioButtons.forEach((button) => {
    button.addEventListener("click", () => {
        portfolioButtons.forEach((btn) => {
            btn.classList.remove(...tabsActiveClasses);
            btn.classList.add(...tabsInactiveClasses);
        });
        button.classList.remove(...tabsInactiveClasses);
        button.classList.add(...tabsActiveClasses);
        let filter = button.getAttribute("data-filter");

        portfolioItems.forEach(item => {
            item.style.transition = "opacity 0.3s, transform 0.3s";
            item.style.opacity = "0";
            item.style.transform = "scale(0.8)";
        });
        setTimeout(() => {
            portfolioItems.forEach(item => {
                if (filter === "all" || filter === item.getAttribute("data-category")) {
                    item.style.display = "block";
                } else {
                    item.style.display = "none";
                }
            });
            setTimeout(() => {
                portfolioItems.forEach(item => {
                    if (filter === "all" || filter === item.getAttribute("data-category")) {
                        item.style.opacity = "1";
                        item.style.transform = "scale(1)";
                    }
                });
            }, 20); // for not displaying the mutual cards immedietly 
        }, 300);
    });
});

// Carousel part
const testimonialsCarousel = document.getElementById("testimonials-carousel");
const testimonialCards = document.querySelectorAll(".testimonial-card");
const nextTestimonial = document.getElementById("next-testimonial");
const prevTestimonial = document.getElementById("prev-testimonial");
const indicators = document.querySelectorAll(".carousel-indicator");
let currentIndex = 0;

function updateCarousel() {
    let cardsNum = window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3;
    let cardPercentage = 100 / cardsNum;
    testimonialsCarousel.style.transform = `translateX(${currentIndex * cardPercentage}%)`
    updateIndicators();
}

function updateIndicators() {
    indicators.forEach((dot) => {
        let index = Number(dot.getAttribute("data-index"));
        if (index === currentIndex) {
            dot.classList.add("active", "bg-accent", "scale-125");
            dot.classList.remove("bg-slate-400", "dark:bg-slate-600");
        } else {
            dot.classList.remove("active", "bg-accent", "scale-125");
            dot.classList.add("bg-slate-400", "dark:bg-slate-600");
        }
    })
}
nextTestimonial.addEventListener("click", () => {
    let cardsNum = window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3;
    let maxIndex = testimonialCards.length - cardsNum;
    if (currentIndex < maxIndex) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    updateCarousel();
})
prevTestimonial.addEventListener("click", () => {
    let cardsNum = window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3;
    let maxIndex = testimonialCards.length - cardsNum;
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = maxIndex;
    }
    updateCarousel();
})
indicators.forEach((dot) => {
    dot.addEventListener("click", () => {
        currentIndex = Number(dot.getAttribute("data-index"));
        updateCarousel();
    })
})

updateCarousel();

// Form
const nameInput = document.getElementById("full-name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const detailsInput = document.getElementById("project-details");
const form = document.querySelector("form");
const submitButton = document.querySelector("form button");
const customSelects = document.querySelectorAll(".custom-select");

customSelects.forEach((select) => {
    const wrapper = select.parentElement;
    const optionsList = wrapper.querySelector(".custom-options");
    const selectedText = select.querySelector(".selected-text");
    const options = optionsList.querySelectorAll(".custom-option");

    select.addEventListener("click", () => {
        optionsList.classList.toggle("hidden");
        const isOpen = !optionsList.classList.contains("hidden");
        select.setAttribute("aria-expanded", isOpen);
    })

    options.forEach((option) => {
        option.addEventListener("click", () => {
            selectedText.textContent = option.getAttribute("data-value");
            selectedText.classList.remove("text-slate-500", "dark:text-slate-400");
            selectedText.classList.add("text-slate-800", "dark:text-white");
            optionsList.classList.add("hidden");
            select.setAttribute("aria-expanded", false);
        })
    })
})

document.addEventListener("click", (e) => {
    customSelects.forEach((select) => {
        const wrapper = select.parentElement;
        const optionsList = wrapper.querySelector(".custom-options");
        if (!wrapper.contains(e.target)) {
            optionsList.classList.add("hidden");
            select.setAttribute("aria-expanded", false);
        }
    })
})

let nameError = document.createElement("p");
let emailError = document.createElement("p");
let phoneError = document.createElement("p");
let detailsError = document.createElement("p");

nameError.className = "error-message text-red-400 text-sm mt-1";
emailError.className = "error-message text-red-400 text-sm mt-1";
phoneError.className = "error-message text-red-400 text-sm mt-1";
detailsError.className = "error-message text-red-400 text-sm mt-1";

let validateName = () => {
    if (nameInput.value.trim() === "") {
        nameError.textContent = "يرجى إدخال الاسم الكامل"
        nameInput.after(nameError)
        return false
    } else {
        nameError.remove()
        return true
    }
}

let validateEmail = () => {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;
    if (emailInput.value.trim() === "" || !emailRegex.test(emailInput.value.trim())) {
        emailError.textContent = "يرجى إدخال البريد الإلكتروني"
        emailInput.after(emailError)
        return false
    } else {
        emailError.remove()
        return true
    }
}

let validatPhoneNumber = () => {
    var phoneRegex = /^((\+?20)0?|0)(10|11|12|15)\d{8}$/;
    if (phoneInput.value.trim() !== "" && !phoneRegex.test(phoneInput.value.trim())) {
        phoneError.textContent = "يرجى إدخال رقم هاتف صحيح"
        phoneInput.after(phoneError)
        return false
    } else {
        phoneError.remove()
        return true
    }
}

let validateDetails = () => {
    if (detailsInput.value.trim().length < 10) {
        if (detailsInput.value.trim().length >= 1 && detailsInput.value.trim().length < 10) {
            detailsError.textContent = "يرجى إدخال المزيد من التفاصيل"
        } else if (detailsInput.value.trim().length === 0) {
            detailsError.textContent = "يرجى إدخال تفاصيل المشروع"
        }
        detailsInput.after(detailsError)
        return false
    } else {
        detailsError.remove()
        return true
    }
}

let showSuccessPopup = () => {
    const popup = document.createElement("div");
    popup.className = "fixed inset-0 flex items-center justify-center z-50 bg-slate-950/80 backdrop-blur-sm";
    popup.innerHTML = `
      <div class="bg-slate-800 rounded-2xl p-8 max-w-md mx-4 text-center border border-slate-700 shadow-2xl">
        <div class="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <i class="fa-solid fa-check text-4xl text-white"></i>
        </div>
        <h3 class="text-2xl font-bold mb-3">تم إرسال رسالتك بنجاح!</h3>
        <p class="text-slate-400 mb-6">شكراً لتواصلك. سأرد عليك في أقرب وقت ممكن.</p>
        <button class="success-popup-close bg-gradient-to-r from-primary to-secondary px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300">
          حسناً
        </button>
      </div>
    `;
    document.body.appendChild(popup);

    popup.querySelector(".success-popup-close").addEventListener("click", () => {
        popup.remove();
    });

    setTimeout(() => {
        if (popup.parentNode) {
            popup.remove();
        }
    }, 5000);
}

form.addEventListener("submit", (e) => {
    e.preventDefault()

    let isNameValid = validateName()
    let isEmailValid = validateEmail()
    let isPhoneValid = validatPhoneNumber()
    let isDetailsValid = validateDetails()

    if (isNameValid && isEmailValid && isDetailsValid && isPhoneValid) {
        showSuccessPopup();
        form.reset();

    }
})

// go up button
const scrollToTopBtn = document.getElementById("scroll-to-top");

window.addEventListener("scroll", function () {
    if (window.scrollY > 400) {
        scrollToTopBtn.classList.remove("opacity-0", "invisible");
        scrollToTopBtn.classList.add("opacity-100", "visible");
    } else {
        scrollToTopBtn.classList.add("opacity-0", "invisible");
        scrollToTopBtn.classList.remove("opacity-100", "visible");
    }
});

scrollToTopBtn.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});