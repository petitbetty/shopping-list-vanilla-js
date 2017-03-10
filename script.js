var shoppingList = {
    shoppingDone: [],
    shopping: [],
    shoppingTodo: [],

    addShopping: function(shopping){
        this.shopping.push({
            shoppingText: shopping,
            completed: false
        });
    },

    completedShopping: function(position) {
        this.shopping[position].completed = true;

    },

    uncheckShopping: function (position) {
        this.shopping[position].completed = false;
    },

    allCompletedShopping: function() {
        this.shoppingDone = [];
        //Try to change for with forEach loop
        for (var i = 0; i < this.shopping.length; i++) {
            if( this.shopping[i].completed === true ) {
                this.shoppingDone.push(this.shopping[i]);
            }
        }
    },

    activeShopping: function () {
        this.shoppingTodo = [];
        //Try to change for with forEach loop
        for (var i = 0; i < this.shopping.length; i++) {
            if( this.shopping[i].completed === false ) {
                this.shoppingTodo.push(this.shopping[i]);
            }
        }
    },

    shoppingLeftTodo: function () {
        var count = 0;
        this.shopping.forEach(function(itemToShop) {
            if ( itemToShop.completed === false ) {
                count++;
            }
        });
        return count;
    },

    deleteShoppingItem: function (position) {
        this.shopping.splice(position, 1);
    },

    clearAllCompleted: function () {
        var that = this;
        this.shopping.forEach(function (itemToShop, position) {
            if ( itemToShop.completed === true ) {
                that.deleteShoppingItem(position);
            }
        });
    }
};



var handlers = {
    completedShopping: function () {
        shoppingList.allCompletedShopping();

        view.displayShopping(shoppingList.shoppingDone);
    },

    activeShopping: function () {
        shoppingList.activeShopping();
        view.displayShopping(shoppingList.shoppingTodo);
    },

    allShopping: function() {
        view.displayShopping(shoppingList.shopping);
    },

    deleteShoppingItem: function () {
        shoppingList.shopping.forEach(function (itemToShop, position) {
            shoppingList.deleteShoppingItem(position);
        });
        view.displayShopping(shoppingList.shopping);
    },

    clearAllCompleted: function () {
        shoppingList.clearAllCompleted();
        view.toggleButtons();
        view.displayShopping(shoppingList.shopping);

    }
};


var view = {
    displayShopping: function(allList){
        var allList = allList;
        var shoppingUl = document.getElementById('shoppingListUl');
        shoppingUl.textContent = '';

        allList.forEach(function(itemToShop, position){

            var shoppingLi = document.createElement('li');
            var liDiv = document.createElement('div');
            liDiv.className = 'liDiv';
            var liInput = document.createElement('input');
            liInput.type = 'checkbox';
            if (itemToShop.completed === true) {
                liInput.checked = 'checked';
            }
            liInput.id = 'checkbox_'+ position;
            var liLabel = document.createElement('label');
            liLabel.className = 'checkbox-label';
            var liButton = document.createElement('button');
            liButton.className = 'deleteLi';
            liButton.textContent = 'X';
            liLabel.textContent = itemToShop.shoppingText;
            liLabel.appendChild(liButton);
            liDiv.appendChild(liInput);
            liDiv.appendChild(liLabel);
            shoppingLi.appendChild(liDiv);
            shoppingLi.id = position;
            shoppingLi.className = 'shoppingListItem';
            shoppingUl.appendChild(shoppingLi);
        });

    },

    showNotCompletedItems : function () {
        var itemsLeft = document.getElementById('itemsLeft');
        itemsLeft.textContent = shoppingList.shoppingLeftTodo() + ' items left';
    },

    showCompletedItems : function () {
        shoppingList.completedShopping
    },

    toggleButtons: function () {
        var hideAndShow = document.getElementById('hideAndShow');
        var mc = shoppingList.shoppingLeftTodo();
        if (hideAndShow.className === 'toggleButtonsSection') {
            hideAndShow.className = 'displayButtons';
        } else if (hideAndShow.className === 'displayButtons' && shoppingList.shoppingLeftTodo() === 0)  {
            hideAndShow.className = 'toggleButtonsSection';
        }
    },

    setUpEventListener: function () {
        var that = this;
        var shoppingListUl = document.getElementById('shoppingListUl');
        var inputField = document.getElementById('shoppingText');


        shoppingListUl.addEventListener('click', function(event){
            var eventTarget = event.target;

            if(eventTarget.checked === true) {
                shoppingList.completedShopping(event.path[2].id);
                that.showNotCompletedItems();
                eventTarget.nextSibling.className ='label-underline';
            } else if(eventTarget.checked === false) {
                shoppingList.uncheckShopping(event.path[2].id);
                that.showNotCompletedItems();
                eventTarget.nextSibling.className ='checkbox-label';

            }

            if(eventTarget.className === 'deleteLi') {
                shoppingList.deleteShoppingItem(eventTarget.parentNode.parentNode.parentNode.id);
                that.showNotCompletedItems();
                that.displayShopping(shoppingList.shopping);
                that.toggleButtons();
            }
        });

        inputField.addEventListener('keypress', function (event) {
            if (event.keyCode === 13) {
                if(shoppingText.value === '') {
                    alert('please enter a item name');
                } else {
                    shoppingList.addShopping(shoppingText.value);
                    shoppingText.value = '';
                    that.displayShopping(shoppingList.shopping);
                    that.showNotCompletedItems();
                }
                that.toggleButtons();
            }
        })
    }
}

view.setUpEventListener();
