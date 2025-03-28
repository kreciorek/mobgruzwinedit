
// Pobierz parametry z URL (np. ?name=Jan)
var params = new URLSearchParams(window.location.search);

// Ustaw powitanie w zależności od godziny
var welcome = "Dzień dobry!";
var hours = new Date().getHours();
if (hours >= 18 || hours < 4) {
    welcome = "Dobry wieczór!";
}
document.querySelector(".welcome").innerHTML = welcome;

// Przekierowanie do /home z parametrami
function toHome() {
    // Poprawiona ścieżka dla GitHub Pages
    location.href = '/cvvmiki.github.io/home?' + params.toString();
}

// Obsługa kliknięcia przycisku "Zaloguj się"
document.querySelector(".login").addEventListener('click', () => {
    toHome();
});

// Obsługa hasła (kropki i pokazywanie tekstu)
var input = document.querySelector(".password_input");
var original = "";
var eye = document.querySelector(".eye");

// Enter zatwierdza hasło
input.addEventListener("keypress", (event) => {
    if (event.key === 'Enter') {
        document.activeElement.blur();
        toHome(); // Dodane automatyczne przekierowanie po Enter
    }
});

// Maskowanie hasła kropkami
input.addEventListener("input", () => {
    var value = input.value;
    if (value.length < original.length) {
        original = original.slice(0, -1);
    } else {
        original += value.slice(-1);
    }

    if (!eye.classList.contains("eye_close")) {
        input.value = '•'.repeat(value.length);
    }
});

// Przycisk "oko" (pokaz/ukryj hasło)
eye.addEventListener('click", () => {
    eye.classList.toggle("eye_close");
    input.value = eye.classList.contains("eye_close") ? original : '•'.repeat(original.length);
});

// Funkcja pomocnicza do opóźnienia
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}
