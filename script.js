var shoppingList = {
    shoppingDone: [],
    shopping: [],
    shoppingTodo: [],
    arr : [1,3,4, 'be'],

    addShopping: function(shopping){
        this.shopping.push({
            shoppingText: shopping,
            completed: false
        });
    },

    completedShopping: function(position) {
        this.shopping[position].completed = true;

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

    // shoppingLeftTodo: function () {
    //     if (this.shopping.length === 0) {
    //
    //     }
    //     return this.shoppingTodo.length
    // }
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
    }
};


var view = {
    displayShopping: function(allList){
        var allList = allList;
        var shoppingUl = document.querySelector('ul');
        shoppingUl.textContent = '';

            allList.forEach(function(itemToShop, position){
            var shoppingLi = document.createElement('li');
            var liDiv = document.createElement('div');
            liDiv.className = 'liDiv';
            var liInput = document.createElement('input');
            liInput.type = 'checkbox';
            liInput.className = 'checkbox';
            var liLabel = document.createElement('label');
            liLabel.className = 'checkbox-label';
            var liButton = document.createElement('button');
            liButton.className = 'delectLi';
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

        var itemsLeft = document.getElementById('itemsLeft');
        itemsLeft.textContent = shoppingList.shoppingTodo.length + ' items left';
        shoppingList.activeShopping();

    },

    showCompletedItems : function () {
        // shoppingList.shopping.forEach(function(completedItem){
        //
        // });
        shoppingList.completedShopping
    },

    setUpEventListener: function () {
        var that = this;
        var shoppingListUl = document.querySelector('ul');

        shoppingListUl.addEventListener('click', function(event){
            var checkInput = event.target;
            if(event.target.checked === true) {
                shoppingList.completedShopping(event.path[2].id);
            }
        });

        var inputField = document.getElementById('shoppingText');

        inputField.addEventListener('keypress', function (event) {
            if (event.keyCode === 13) {
                if(shoppingText.value === '') {
                    alert('please enter a item name');
                } else {
                    shoppingList.addShopping(shoppingText.value);
                    shoppingText.value = '';
                    that.displayShopping(shoppingList.shopping);
                }
            }
        })
    }

}

view.setUpEventListener();
