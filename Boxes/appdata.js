class ListBinding {
    constructor(element) {
        this.ulElement = element;

        this.textArray = [];
    }
    
    static createList (text) {
        const li = document.createElement('li');

        li.innerHTML = text;

        return li;
    }

    update () {
        while(this.ulElement.firstChild) {
            this.ulElement.removeChild(this.ulElement.firstChild);
        }

        for (const i of this.textArray) {
            this.ulElement.appendChild(ListBinding.createList(i));                        
        }
    }

    add (text) {
        this.textArray.push(text);
        this.update();
    }

    remove (index) {
        this.textArray.splice(index, 1);
        this.update();
    }
}

const myList = document.querySelector('.myList');
const listBinding = new ListBinding(myList);

function addToList () {
    const userInput = document.getElementById('userInput').value; 

    listBinding.add(userInput);

    
}

function listRemoval () {
    const listRemover = document.getElementById('listRemover').value;

    listBinding.remove(listRemover);
}

function buttonClicked () {
    listBinding.add('Hello!');
}
