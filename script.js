var shoppingList = {
    shopping: [],

    addShopping: function(shopping){
        this.shopping.push({
            shoppingText: shopping,
            completed: false
        });
        console.log(this.shopping);
    },

    completedShopping: function () {

    },
    activeShopping: function () {

    },

    AllShopping: function (position, shoppingItem) {
        this.shopping[position] = shoppingItem;
        console.log(this.shopping);
    },

    clearDoneShopping: function () {

    },

    toggleAll: function () {

    }

};

var handlers = {
    addShopping: function(){
        var shoppingText = document.getElementById('shoppingText');
        if(shoppingText.value === '') {
            alert('please enter a item name');
        } else {
            shoppingList.addShopping(shoppingText.value);
            shoppingText.value = '';
            view.displayShopping();
        }
    },

    deleteShopping: function () {

    }
};

var view = {
    displayShopping: function(){
        var shoppingUl = document.querySelector('ul');
        shoppingUl.textContent = '';
        shoppingList.shopping.forEach(function(itemToShop){
            var shoppingLi = document.createElement('li');
            var liDiv = document.createElement('div');
            var liInput = document.createElement('input');
            liInput.type = 'checkbox';
            var liLabel = document.createElement('label');
            liLabel.textContent = itemToShop.shoppingText;
            liDiv.appendChild(liInput);
            liDiv.appendChild(liLabel);
            shoppingLi.appendChild(liDiv);
            shoppingUl.appendChild(shoppingLi);

        });
    }
}
