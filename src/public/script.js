// Verificar que el formulario con id 'loginForm' existe antes de añadir el listener
const form = document.getElementById('loginForm');

// Si el formulario existe, se añade el evento 'submit'
if (form) {
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Evitar el comportamiento predeterminado del formulario

        const formData = new FormData(form); // Extraer los datos del formulario
        const formObject = {};

        formData.forEach((value, key) => {
            formObject[key] = value; // Guardar cada par clave-valor del formulario
        });

        // Obtener el valor del checkbox 'remember' usando .checked
        const remember = form.querySelector('input[name="remember"]').checked;

        const { user, password } = formObject; // Desestructurar solo usuario y contraseña

        // Mostrar los datos capturados en la consola
        console.log({ user, password, remember });
        console.log(`Usuario: ${user}, Contraseña: ${password}, Recordarme: ${remember}`);

        // Aquí puedes agregar lógica adicional si lo necesitas
    });
}
