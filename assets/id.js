
var params = new URLSearchParams(window.location.search);

document.querySelector(".login").addEventListener('click', () => {
    toHome();
});

// Powitanie zależne od godziny
var welcome = "Dzień dobry!";
var hours = new Date().getHours();
if (hours >= 18 || hours < 4) {
    welcome = "Dobry wieczór!";
}
document.querySelector(".welcome").innerHTML = welcome;

// POPRAWIONE: Funkcja przekierowania dla gruzwinswag
function toHome() {
    const baseUrl = window.location.origin + '/gruzwinswag';
    window.location.href = `${baseUrl}/home/?${params.toString()}`;
}

// Obsługa pola hasła
var input = document.querySelector(".password_input");
var original = "";
var eye = document.querySelector(".eye");

// Enter zatwierdza hasło
input.addEventListener("keypress", (event) => {
    if (event.key === 'Enter') {
        document.activeElement.blur();
        toHome();
    }
});

// Optymalizacja: Maskowanie hasła
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
