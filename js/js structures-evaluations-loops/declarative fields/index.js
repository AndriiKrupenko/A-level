// Как известно, элемент массива и объекта может быть любого типа данных JS, т. е. в коде может быть любое выражение, которое вычисляется в то или иное значение типа данных. А значит, мы можем применять функции для ввода данных типа confirm или prompt:
//Организуйте таким способом заполнение полей в объектах:
//Используйте приведение к числу, prompt и confirm в зависимости от типов данных.
//------------------

var notebook = {
    brand: prompt("Enter a brand"),
    type:  prompt("Enter a type"),
    model: prompt("Enter a model"),
    ram: +prompt("Enter a ram"),
    size: prompt("Enter a size"),
    weight: +prompt("Enter a weight"),
    resolution: {
        width: +prompt("Enter a width"),
        height: +prompt("Enter a height"),
    },
};

var phone = {
    brand: prompt("Enter a brand"),
    model: prompt("Enter a model"),
    ram: +prompt("Enter a ram"),
    color: prompt("Enter a color"),
};

var person = {
    name: prompt("Enter a name"),
    surname: prompt("Enter a surname"),
    married: confirm("married?"),
}