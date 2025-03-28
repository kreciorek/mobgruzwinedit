v// Inicjalizacja zmiennych
const selector = document.querySelector(".selector_box");
const sexOptions = document.querySelectorAll(".selector_option");
let sex = "m";

// Obsługa rozwijanego menu
selector.addEventListener('click', () => {
    selector.classList.toggle("selector_open");
});

// Obsługa pól daty
document.querySelectorAll(".date_input").forEach((input) => {
    input.addEventListener('input', () => {
        document.querySelector(".date").classList.remove("error_shown");
    });
});

// Wybór płci
sexOptions.forEach((option) => {
    option.addEventListener('click', () => {
        sex = option.id;
        document.querySelector(".selected_text").textContent = option.textContent;
    });
});

// Obsługa przesyłania zdjęć
const upload = document.querySelector(".upload");
const imageInput = document.createElement("input");
imageInput.type = "file";
imageInput.accept = "image/*";

upload.addEventListener('click', () => {
    imageInput.click();
    upload.classList.remove("error_shown");
});

imageInput.addEventListener('change', async (event) => {
    if (!imageInput.files[0]) return;
    
    upload.classList.add("upload_loading");
    upload.classList.remove("upload_loaded", "error_shown");

    try {
        const imageBase64 = await convertToBase64(imageInput.files[0]);
        upload.setAttribute("data-image", imageBase64);
        upload.querySelector(".upload_uploaded").src = imageBase64;
        upload.classList.replace("upload_loading", "upload_loaded");
    } catch (error) {
        console.error("Błąd przetwarzania zdjęcia:", error);
        upload.classList.remove("upload_loading");
        upload.classList.add("error_shown");
    }
});

// Przycisk "Wejdź"
document.querySelector(".go").addEventListener('click', () => {
    const errors = validateForm();
    
    if (errors.length > 0) {
        showErrors(errors);
    } else {
        processFormData();
    }
});

// Funkcje pomocnicze
async function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

function validateForm() {
    const errors = [];
    const requiredFields = document.querySelectorAll("[required]");

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            errors.push(field.closest(".input_holder") || field);
        }
    });

    if (!upload.hasAttribute("data-image")) {
        errors.push(upload);
    }

    const dateValues = Array.from(document.querySelectorAll(".date_input"))
                          .map(input => input.value.trim());
    if (dateValues.some(val => !val) {
        errors.push(document.querySelector(".date"));
    }

    return errors;
}

function showErrors(errors) {
    errors.forEach(errorElement => {
        errorElement.classList.add("error_shown");
    });
    errors[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function processFormData() {
    const formData = {
        sex,
        image: upload.getAttribute("data-image"),
        birthday: Array.from(document.querySelectorAll(".date_input"))
                     .map(input => input.value)
                     .join("."),
        name: document.getElementById("name").value,
        surname: document.getElementById("surname").value,
        // ... inne pola formularza
    };

    // Zapisz dane w sessionStorage
    sessionStorage.setItem('userFormData', JSON.stringify(formData));
    
    // Przekieruj
    window.location.href = "id.html";
}

// Obsługa przewodnika
const guide = document.querySelector(".guide_holder");
if (guide) {
    guide.addEventListener('click', () => {
        guide.classList.toggle("unfolded");
    });
}
