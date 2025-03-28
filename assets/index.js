// Inicjalizacja zmiennych
const selector = document.querySelector(".selector_box");
const sexOptions = document.querySelectorAll(".selector_option");
let sex = "m";

// Obsługa rozwijanego menu płci
selector?.addEventListener('click', () => {
    selector.classList.toggle("selector_open");
});

// Reset błędów przy wprowadzaniu daty
document.querySelectorAll(".date_input").forEach(input => {
    input.addEventListener('input', () => {
        document.querySelector(".date").classList.remove("error_shown");
    });
});

// Wybór płci
sexOptions.forEach(option => {
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

upload?.addEventListener('click', () => {
    imageInput.click();
    upload.classList.remove("error_shown");
});

imageInput.addEventListener('change', async (event) => {
    if (!imageInput.files[0]) return;
    
    upload.classList.add("upload_loading");
    upload.classList.remove("upload_loaded", "error_shown");

    try {
        // Wersja z Imgur
        const formData = new FormData();
        formData.append("image", imageInput.files[0]);
        
        const response = await fetch('https://api.imgur.com/3/image', {
            method: 'POST',
            headers: {
                'Authorization': 'Client-ID c8c28d402435402'
            },
            body: formData
        });
        
        const data = await response.json();
        
        if (data.success) {
            const url = data.data.link;
            upload.setAttribute("data-image", url);
            upload.querySelector(".upload_uploaded").src = url;
            upload.classList.replace("upload_loading", "upload_loaded");
        } else {
            throw new Error(data.data?.error || "Upload failed");
        }
    } catch (error) {
        console.error("Błąd przesyłania:", error);
        upload.classList.remove("upload_loading");
        upload.classList.add("error_shown");
        alert("Błąd przesyłania zdjęcia. Spróbuj ponownie.");
    }
});

// Przycisk "Wejdź"
document.querySelector(".go")?.addEventListener('click', () => {
    const errors = validateForm();
    
    if (errors.length > 0) {
        showErrors(errors);
    } else {
        processFormData();
    }
});

// Funkcje pomocnicze
function validateForm() {
    const errors = [];
    const requiredFields = document.querySelectorAll("[required]");

    // Sprawdź wymagane pola
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            errors.push(field.closest(".input_holder") || field);
        }
    });

    // Sprawdź zdjęcie
    if (!upload?.hasAttribute("data-image")) {
        errors.push(upload);
    }

    // Sprawdź datę urodzenia
    const dateValues = Array.from(document.querySelectorAll(".date_input"))
                          .map(input => input.value.trim());
    if (dateValues.some(val => !val)) {
        errors.push(document.querySelector(".date"));
    }

    return errors;
}

function showErrors(errors) {
    errors.forEach(errorElement => {
        errorElement?.classList.add("error_shown");
    });
    
    if (errors[0]) {
        errors[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function processFormData() {
    const formData = {
        sex,
        image: upload.getAttribute("data-image"),
        birthday: Array.from(document.querySelectorAll(".date_input"))
                     .map(input => input.value)
                     .join("."),
        // Pobierz wartości wszystkich pól
        ...Object.fromEntries(
            Array.from(document.querySelectorAll(".input"))
                .filter(input => input.id)
                .map(input => [input.id, input.value])
        )
    };

    // Zapisz dane w sessionStorage
    sessionStorage.setItem('userFormData', JSON.stringify(formData));
    
    // Przekieruj do strony docelowej
    window.location.href = "id.html";
}

// Obsługa przewodnika
const guide = document.querySelector(".guide_holder");
guide?.addEventListener('click', () => {
    guide.classList.toggle("unfolded");
});
