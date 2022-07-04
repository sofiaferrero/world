
// cosas que faltan: 
// que no salga siempre el ganaste, ver línea 41
// que secretWord tenga varios array y que cuando ganas puedas pasar al siguiente, o cuando reseteas
// que cuando reseteas no te cuente que seguis escribiendo en pressLetter

const keyboard = document.querySelector("#keyboard");
const grid = document.querySelector("#grid");
const keyboardLetters = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["enter","z", "x", "c", "v", "b", "n", "m", "delete"]
];

const listElements = [];
let myAnswer = [];
const secretWord = ["c", "o", "r", "r", "e", "c", "t",
                    // ["m", "o","r","n","i","n","g"],
                    // ["p", "l", "a", "n", "e", "t","s"],
                    // ["a", "n", "i", "m", "a", "l", "s"],
                    // ["a", "c", "t", "r", "e", "s", "s"]
                ];
let positions = [];
let attemps = 0;

const rows = [];
for (let row = 0; row < 5; row++){
    const list = document.createElement("ul");
    list.classList.add("grid-row");
    for(let column = 0; column < 7; column++){
        const listtItem = document.createElement("li");
        listtItem.classList.add("grid-item");
        listtItem.id = `${row}-${column}`;
        list.appendChild(listtItem);
    }
    rows.push(list);
}

grid.append(...rows);



keyboardLetters.map((letters) => {
    const list = document.createElement("ul");
    letters.map((letter) => {
        const listtItem = document.createElement("li");
        switch (letter){
            case "enter":
                listtItem.innerHTML = `
        <button onclick="checkWord()" id="${letter}">${letter}</button>
        `;
        break;
        case "delete":
            listtItem.innerHTML = `
        <button onclick="deleteLetter()" id="${letter}">${letter}</button>
        `;
        break;
        default:
            listtItem.innerHTML = `
        <button onclick="pressLetter()" id="${letter}">${letter}</button>
        `;
        break;
        }
        list.appendChild(listtItem);
    });
    listElements.push(list);
});

keyboard.append(...listElements);

const pressLetter = () => {
    const button = event.target;
    if (myAnswer.length < 7){
        const currentItem = document.getElementById(`${attemps}-${myAnswer.length}`);
        currentItem.textContent = button.textContent;
        myAnswer.push(button.id);
    } else {
        alert("Demasiadas letras...")
    }
}

const deleteLetter = () => {
    if (myAnswer.length === 0){
        alert ("No tienes nada escrito");
    }
    const item = document.getElementById(`${attemps}-${myAnswer.length - 1}`);
    item.textContent = "";
    myAnswer.pop();
}

const checkWord = () => {
    if (positions.every((positions) => positions === "green")){
        alert("ganaste!");
    }
    if (myAnswer.length === 7){
        if (attemps === 5){
            alert("yo no tienes intentos :(");
            return;
        }
        if (myAnswer.length === 7) {
            attemps += 1;
                for(let i = 0; i < 7; i++){
                    switch (true){
                    case myAnswer[i] === secretWord [i]:
                        positions.push("green");
                        break;
                    case secretWord.includes(myAnswer[i]):
                        positions.push("brown");
                        break;
                    default:
                        positions.push("grey");
                        break;
                    }
                }
        }
    console.log(positions);
    positions.map((color, id) => {
        const item = document.getElementById(`${attemps -1}-${id}`);
        item.classList.add(color);
    });
    myAnswer = [];
    positions = [];
    } else {
        alert(`Hey, tu respuesta tiene solo ${myAnswer.length} caracteres`);
    }
};

const reset = () => {
    event.target.disabled = true;   
    for (let row = 0; row < 5; row++){
        for(let column = 0; column < 7; column++){
            const item = document.getElementById(`${row}-${column}`);
            item.textContent = "";
            item.classList.remove("green");
            item.classList.remove("brown");
            item.classList.remove("grey");
        }
    }
    attemps = 0;
}