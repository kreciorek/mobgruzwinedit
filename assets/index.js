var selector = document.querySelector(".selector_box");
selector.addEventListener('click', () => {
    selector.classList.toggle("selector_open");
});

document.querySelectorAll(".date_input").forEach((element) => {
    element.addEventListener('click', () => {
        document.querySelector(".date").classList.remove("error_shown");
    });
});

var sex = "m";

document.querySelectorAll(".selector_option").forEach((option) => {
    option.addEventListener('click', () => {
        sex = option.id;
        document.querySelector(".selected_text").textContent = option.textContent;
    });
});

// Obsługa przesyłania zdjęć
var upload = document.querySelector(".upload");
var imageInput = document.createElement("input");
imageInput.type = "file";
imageInput.accept = "image/*";

upload.addEventListener('click', () => {
    imageInput.click();
    upload.classList.remove("error_shown");
});

imageInput.addEventListener('change', (event) => {
    if (!imageInput.files[0]) return;
    
    upload.classList.add("upload_loading");
    upload.classList.remove("upload_loaded", "error_shown");

    // Wersja z Base64 (bez Imgur)
    const reader = new FileReader();
    reader.onload = (e) => {
        const imageBase64 = e.target.result;
        upload.setAttribute("selected", imageBase64);
        upload.querySelector(".upload_uploaded").src = imageBase64;
        upload.classList.remove("upload_loading");
        upload.classList.add("upload_loaded");
    };
    reader.readAsDataURL(imageInput.files[0]);
});

// Obsługa formularza
document.querySelector(".go").addEventListener('click', () => {
    var empty = [];
    var params = new URLSearchParams();

    // Walidacja pól
    params.set("sex", sex);
    
    if (!upload.hasAttribute("selected")) {
        empty.push(upload);
        upload.classList.add("error_shown");
    } else {
        params.set("image", upload.getAttribute("selected"));
    }

    // Data urodzenia
    var birthday = Array.from(document.querySelectorAll(".date_input"))
                        .map(input => input.value)
                        .join(".");
    if (birthday.includes("undefined") || birthday.split(".").some(v => !v)) {
        document.querySelector(".date").classList.add("error_shown");
        empty.push(document.querySelector(".date"));
    } else {
        params.set("birthday", birthday);
    }

    // Pozostałe pola
    document.querySelectorAll(".input_holder").forEach((element) => {
        var input = element.querySelector(".input");
        if (!input.value.trim()) {
            empty.push(element);
            element.classList.add("error_shown");
        } else {
            params.set(input.id, input.value);
        }
    });

    // Przekierowanie lub pokazanie błędów
    if (empty.length > 0) {
        empty[0].scrollIntoView({ behavior: 'smooth' });
    } else {
        // GWARANTOWANE PRZEKIEROWANIE
        const baseUrl = window.location.href.includes('github.io') 
            ? 'https://essatereza.github.io/gruzwinswag'
            : window.location.origin;
            
        window.location.href = `${baseUrl}/id.html?${params.toString()}`;
        
        console.log("Przekierowanie do:", `${baseUrl}/id.html?${params.toString()}`);
    }
});

// Funkcje pomocnicze
function isEmpty(value) {
    return !value || /^\s*$/.test(value);
}

// Obsługa przewodnika
var guide = document.querySelector(".guide_holder");
guide.addEventListener('click', () => {
    guide.classList.toggle("unfolded");
});
