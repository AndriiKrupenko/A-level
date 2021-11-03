// Перепишите пример ниже, используя if.
//------------------
// let color = prompt("Введите цвет","");
// switch (color){
//     case "red": document.write("<div style='background-color: red;'>красный</div>");
//     case "black": document.write("<div style='background-color: black; color: white;'>черный</div>");
//                 break;
//     case "blue": document.write("<div style='background-color: blue;'>синий</div>");
//     case "green": document.write("<div style='background-color: green;'>зеленый</div>");
//                 break;
//     default: document.write("<div style='background-color: gray;'>Я не понял</div>");
// }
//------------------

let color = prompt("Введите цвет","")

if (color == "red") {
    document.write("<div style='background-color: red;'>красный</div>")
    document.write("<div style='background-color: black; color: white;'>черный</div>")
} else if (color == "black") {
    document.write("<div style='background-color: black; color: white;'>черный</div>")
} else if (color == "blue") {
    document.write("<div style='background-color: blue;'>синий</div>")
    document.write("<div style='background-color: green;'>зеленый</div>")
} else if (color == "green") {
    document.write("<div style='background-color: green;'>зеленый</div>")
} else {
    document.write("<div style='background-color: gray;'>Я не понял</div>")
}
