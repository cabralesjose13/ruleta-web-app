// Lista de números posibles entre los que se puede seleccionar el ganador
const possibleWinningNumbers = [3, 13, 26, 30, 32, 33, 34, 41, 44, 47, 52, 56, 58, 60, 63, 66, 70, 72, 75, 78, 81, 84, 86, 89, 90, 92, 95, 97, 103, 105, 109, 113, 116, 119, 121, 123, 128, 130, 133, 138, 142, 147, 148, 152, 155, 163, 170, 173, 179, 187, 193, 196, 198, 202, 203, 205, 213, 226, 230, 231, 232, 233, 263, 271, 300];

// Función para generar un número aleatorio entre 1 y 300
function getRandomNumber() {
    return Math.floor(Math.random() * 300) + 1; // Generar un número entre 1 y 300
}

// Función para seleccionar un número ganador de la lista de números posibles
function getWinningNumber() {
    const randomIndex = Math.floor(Math.random() * possibleWinningNumbers.length);
    return possibleWinningNumbers[randomIndex];
}

// Función para simular el giro de la lotería
function spinLottery() {
    const ballContainer = document.getElementById('lotteryBallContainer');
    
    // Duración fija de la animación (20 segundos)
    const animationDuration = 20 * 1000;  // 20 segundos en milisegundos

    // Limpiar cualquier bola previa antes de iniciar la animación
    ballContainer.innerHTML = '';

    // Agregar bolas (números) a la "máquina"
    let balls = [];
    for (let i = 0; i < 10; i++) {  // Generamos 10 bolas por ejemplo
        const ball = document.createElement('div');
        ball.classList.add('lottery-ball');
        ball.textContent = getRandomNumber();
        ballContainer.appendChild(ball);
        balls.push(ball);  // Guardamos las bolas generadas
    }

    // Iniciar la animación de las bolas con la duración configurada (20 segundos)
    ballContainer.style.animation = `shakeBalls ${animationDuration / 1000}s ease-in-out`;

    // Deshabilitar el botón durante el giro
    document.querySelector('button').disabled = true;

    // Generar números aleatorios para cada bola durante la animación
    const updateBallNumbers = setInterval(() => {
        balls.forEach(ball => {
            ball.textContent = getRandomNumber();  // Asignar un nuevo número aleatorio
        });
    }, 200);  // Actualizamos cada 200ms

    // Después de la duración de la animación (20 segundos), mostrar el número ganador sin animación
    setTimeout(() => {
        // Obtener el número ganador de la lista de números posibles
        const lotteryNumber = getWinningNumber();

        // Cambiar el número de la última bola por el ganador de forma estática
        const lastBall = balls[balls.length - 1];
        lastBall.textContent = lotteryNumber;

        // Detener la animación de la bola (importante para hacerla estática)
        lastBall.style.animation = 'none';  // Detenemos la animación de la bola

        // Mostrar el número que salió en la lotería
        document.getElementById('lotteryResult').textContent = lotteryNumber;

        // Habilitar el botón nuevamente
        document.querySelector('button').disabled = false;

        // Detener la actualización de los números
        clearInterval(updateBallNumbers);
    }, animationDuration);  // Usamos 20 segundos como duración
}
