// Inicjalizacja po załadowaniu strony
document.addEventListener('DOMContentLoaded', function() {
    // Elementy DOM
    const userPhoto = document.getElementById('userPhoto');
    const displayName = document.getElementById('displayName');
    const displaySurname = document.getElementById('displaySurname');
    const displayBirthday = document.getElementById('displayBirthday');
    const displaySex = document.getElementById('displaySex');
    const backButton = document.getElementById('backButton');
    const errorMessage = document.getElementById('errorMessage');

    // Pobierz dane z sessionStorage
    try {
        const savedData = sessionStorage.getItem('userFormData');
        
        if (savedData) {
            const formData = JSON.parse(savedData);

            // Wyświetl dane
            if (formData.image) {
                userPhoto.src = formData.image;
                userPhoto.style.display = 'block';
            }

            displayName.textContent = formData.name || 'Nie podano';
            displaySurname.textContent = formData.surname || 'Nie podano';
            
            // Formatowanie daty urodzenia
            if (formData.birthday) {
                const [day, month, year] = formData.birthday.split('.');
                displayBirthday.textContent = `${day}.${month}.${year}`;
            }

            displaySex.textContent = formData.sex === 'm' ? 'Mężczyzna' : 'Kobieta';

            // Dodatkowe pola
            const fieldsToDisplay = [
                'nationality', 'familyName', 'fathersFamilyName', 
                'mothersFamilyName', 'birthPlace', 'countryOfBirth',
                'adress1', 'adress2', 'city'
            ];

            fieldsToDisplay.forEach(field => {
                const element = document.getElementById(field);
                if (element) {
                    element.textContent = formData[field] || 'Nie podano';
                }
            });

            // Wyświetl aktualną datę
            const currentDate = new Date();
            document.getElementById('currentDate').textContent = 
                currentDate.toLocaleDateString('pl-PL');

            // Wyczyść dane po użyciu
            sessionStorage.removeItem('userFormData');
        } else {
            showError("Brak danych. Proszę wypełnić formularz.");
            setTimeout(() => window.location.href = 'index.html', 3000);
        }
    } catch (error) {
        console.error('Błąd przetwarzania danych:', error);
        showError("Wystąpił błąd. Przekierowanie...");
        setTimeout(() => window.location.href = 'index.html', 3000);
    }

    // Obsługa przycisku powrotu
    if (backButton) {
        backButton.addEventListener('click', function() {
            // Dodatkowe czyszczenie jeśli potrzebne
            window.location.href = 'index.html';
        });
    }

    // Funkcja wyświetlania błędów
    function showError(message) {
        if (errorMessage) {
            errorMessage.textContent = message;
            errorMessage.style.display = 'block';
        }
    }

    // Animacja ładowania - ukryj po załadowaniu danych
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.display = 'none';
    }
});
