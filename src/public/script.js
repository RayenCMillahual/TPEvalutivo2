const form = document.getElementById('loginForm');

if (form) {
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const formData = new FormData(form); // Extraer los datos del formulario
        const formObject = {};

        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        const remember = form.querySelector('input[name="remember"]').checked;

        const { user, password } = formObject;
        console.log({ user, password, remember });
        console.log(`Usuario: ${user}, Contraseña: ${password}, Recordarme: ${remember}`);
    });
}
