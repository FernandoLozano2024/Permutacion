// Función para calcular el factorial
function factorial(n) {
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
}

// Función para generar todas las permutaciones de un array
function permute(array) {
    let result = [];

    const permuteRecursively = (arr, m = []) => {
        if (arr.length === 0) {
            result.push(m);
        } else {
            for (let i = 0; i < arr.length; i++) {
                let curr = arr.slice();
                let next = curr.splice(i, 1);
                permuteRecursively(curr.slice(), m.concat(next));
            }
        }
    };

    permuteRecursively(array);
    return result;
}

// Función para verificar si dos permutaciones son circulares equivalentes
function areCircularlyEquivalent(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    let doubleArr1 = arr1.concat(arr1);
    return doubleArr1.join(' ').includes(arr2.join(' '));
}

// Función para eliminar permutaciones circulares equivalentes
function uniqueCircularPermutations(permutations) {
    let uniquePerms = [];

    permutations.forEach(perm => {
        if (!uniquePerms.some(uniquePerm => areCircularlyEquivalent(perm, uniquePerm))) {
            uniquePerms.push(perm);
        }
    });

    return uniquePerms;
}

// Función para crear una representación visual de una permutación en un círculo
function createCircleRepresentation(perm, index) {
    const circleContainer = document.createElement('div');
    circleContainer.className = 'circle';

    const circleLabel = document.createElement('div');
    circleLabel.textContent = `#${index + 1}`;
    circleLabel.style.position = 'absolute';
    circleLabel.style.top = '50%';
    circleLabel.style.left = '50%';
    circleLabel.style.transform = 'translate(-50%, -50%)';
    circleLabel.style.fontWeight = 'bold';
    circleContainer.appendChild(circleLabel);

    perm.forEach((_, i) => {
        const el = document.createElement('div');
        el.className = 'element';
        el.textContent = String.fromCharCode(65 + ((i + index) % perm.length)); // Ajustamos la posición de la letra para que empiece con "A"
        const angle = (360 / perm.length) * i;
        const x = 50 + 45 * Math.cos((angle - 90) * Math.PI / 180);
        const y = 50 + 45 * Math.sin((angle - 90) * Math.PI / 180);
        el.style.top = `${y}%`;
        el.style.left = `${x}%`;
        el.style.transform = 'translate(-50%, -50%)';
        circleContainer.appendChild(el);
    });

    return circleContainer;
}

// Función para manejar el cálculo y mostrar el resultado
function calculatePermutations() {
    const elements = [0, 1, 2, 3, 4, 5]; // Usamos números en lugar de letras
    const allPermutations = permute(elements);
    const circularPerms = uniqueCircularPermutations(allPermutations);

    document.getElementById('result').innerText = `Número de formas distintas de sentar a 6 personas en 6 lugares: ${circularPerms.length}`;

    const permutationsList = document.getElementById('permutations-list');
    permutationsList.innerHTML = '';
    circularPerms.forEach((perm, index) => {
        const listItem = document.createElement('li');
        listItem.innerText = `#${index + 1}: ${perm.map(element => String.fromCharCode(65 + element)).join(', ')}`; // Convertimos los números en letras
        permutationsList.appendChild(listItem);
    });

    const circleRepresentations = document.getElementById('circle-representations');
    circleRepresentations.innerHTML = '';
    circularPerms.forEach((perm, index) => {
        const circle = createCircleRepresentation(perm, index);
        circleRepresentations.appendChild(circle);
    });
}