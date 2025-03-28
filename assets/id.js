
var params = new URLSearchParams(window.location.search);

document.querySelector(".login").addEventListener('click', () => {
    toId(); // Zmienione z toHome() na toId()
});

var welcome = "Dzień dobry!";
var hours = new Date().getHours();
if (hours >= 18 || hours < 4) {
    welcome = "Dobry wieczór!";
}
document.querySelector(".welcome").innerHTML = welcome;

// POPRAWIONE: Funkcja przekierowania do /id
function toId() {
    // Pobierz bazowy URL (https://essatereza.github.io/gruzwinswag)
    const baseUrl = window.location.origin + '/gruzwinswag';
    
    // Przekieruj do /id z parametrami
    window.location.href = `${baseUrl}/id/?${params.toString()}`;
    
    console.log("Przekierowanie do:", `${baseUrl}/id/?${params.toString()}`);
}

// Optymalizacja: Uproszczona obsługa hasła
var input = document.querySelector(".password_input");
var original = "";
var eye = document.querySelector(".eye");

input.addEventListener("keypress", (event) => {
    if (event.key === 'Enter') {
        document.activeElement.blur();
        toId(); // Dodane automatyczne przekierowanie po Enter
    }
});

input.addEventListener("input", () => {
    const value = input.value;
    original = value; // Zawsze aktualizuj oryginalne hasło
    
    if (!eye.classList.contains("eye_close")) {
        input.value = '•'.repeat(value.length);
    }
});

// Optymalizacja: Przycisk pokaż/ukryj hasło
eye.addEventListener('click', () => {
    eye.classList.toggle("eye_close");
    input.value = eye.classList.contains("eye_close") ? original : '•'.repeat(original.length);
});

// Funkcja pomocnicza
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}
    return new Promise(resolve => setTimeout(resolve, time));
}
