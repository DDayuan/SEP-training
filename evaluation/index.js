const API = (() => {
  const URL = 'http://localhost:3000';
  const getCart = async () => {
    const response = await fetch(URL + '/cart');
    const jsonData = await response.json();
    return jsonData;
  };

  const getInventory = async () => {
    // define your method to get inventory data
    const response = await fetch(URL + '/inventory');
    const jsonData = await response.json();
    for (let i = 0; i < jsonData.length; i++) {
      jsonData[i]['amount'] = 1;
    }
    return jsonData;
  };

  const addToCart = async (inventoryItem) => {
    // define your method to add an item to cart
    const response = await fetch(URL + '/cart', {
      method: 'POST',
      body: JSON.stringify(inventoryItem),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const jsonData = await response.json();
    return jsonData;
  };

  const updateCart = async (id, newAmount) => {
    // define your method to update an item in cart
    const response = await fetch(URL + '/cart/' + id, {
      method: 'PATCH',
      body: JSON.stringify({ amount: newAmount }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const jsonData = await response.json();
    return jsonData;
  };

  const deleteFromCart = async (id) => {
    // define your method to delete an item in cart
    const response = await fetch(URL + '/cart/' + id, {
      method: 'DELETE',
    });

    const jsonData = await response.json();
    return jsonData;
  };

  const checkout = async () => {
    const cartItems = await getCart();
    await Promise.all(cartItems.map((item) => deleteFromCart(item.id)));
    const updatedCart = await getCart();
    return updatedCart;
  };

  return {
    getCart,
    updateCart,
    getInventory,
    addToCart,
    deleteFromCart,
    checkout,
  };
})();

const Model = (() => {
  // implement your logic for Model
  class State {
    #onChange;
    #inventory;
    #cart;
    constructor() {
      this.#inventory = [];
      this.#cart = [];
    }
    get cart() {
      return this.#cart;
    }

    get inventory() {
      return this.#inventory;
    }

    set cart(newCart) {
      this.#cart = newCart;
      //update view
      this.#onChange();
    }
    set inventory(updatedInventory) {
      this.#inventory = updatedInventory;
      //update view
      this.#onChange();
    }

    subscribe(cb) {
      this.#onChange = cb;
    }
  }
  const {
    getCart,
    updateCart,
    getInventory,
    addToCart,
    deleteFromCart,
    checkout,
  } = API;
  return {
    State,
    getCart,
    updateCart,
    getInventory,
    addToCart,
    deleteFromCart,
    checkout,
  };
})();

const View = (() => {
  // implement your logic for View
  const checkoutBtn = document.querySelector('.checkout-btn');
  const inventoryContainer = document.querySelector('.inventory-container ul');
  const cartContainer = document.querySelector('.cart-container ul');

  const renderInventory = (inventory) => {
    let inventoryTemp = '';
    inventory.forEach((item) => {
      const liTemp = `<li item-id="${item.id}"><span>${item.content}</span> 
      <button class="minus-btn">-</button> <span>${item.amount}</span> 
      <button class="plus-btn">+</button>
      <button class="add-to-cart">add to cart</button></li>`;
      inventoryTemp += liTemp;
    });
    inventoryContainer.innerHTML = inventoryTemp;
  };

  const renderCart = (cart) => {
    let cartTemp = '';
    cart.forEach((item) => {
      const content = item.content;
      const amount = item.amount;
      const liTemp = `<li class="cart-item" item-id="${item.id}">
            <span>${content} x ${amount}</span>
            <button class="delete">delete</button></li>`;
      cartTemp += liTemp;
    });
    cartContainer.innerHTML = cartTemp;
  };
  const addToCartBtn = document.querySelector(".plus-btn")
  const deleBtn = document.querySelector(".minus-btn")
  return { 
    checkoutBtn, 
    inventoryContainer, 
    cartContainer, 
    renderInventory, 
    renderCart, 
    addToCartBtn,
    deleBtn
  };
})();

const Controller = ((model, view) => {
  // implement your logic for Controller
  const state = new model.State();

  const init = () => {
    model.getInventory().then((data) => {
      //console.log(data);
      console.log("init inventory")
      state.inventory = data;
      //view.renderInventory(state.inventory);
    });

    model.getCart().then((data) => {
      console.log("init cart")
      state.cart = data;
      //view.renderInventory(state.cart);
    });
  };
  const handleUpdateAmount = () => {
    view.inventoryContainer.addEventListener('click', (event) => {
      if (event.target.className !== 'minus-btn' && event.target.className !== 'plus-btn') return;
  
      const id = event.target.parentNode.getAttribute('item-id');
      const updatedInventory = [...state.inventory];
  
      const itemIndex = updatedInventory.findIndex((item) => item.id === +id);
      if (itemIndex !== -1) {
        const item = updatedInventory[itemIndex];
        if (event.target.className === 'minus-btn') {
          if (item.amount > 0) {
            item.amount--;
          }
        } else if (event.target.className === 'plus-btn') {
          item.amount++;
        }
  
        state.inventory = updatedInventory;
      }
    });
  };
  

  const handleAddToCart = () => {
    view.inventoryContainer.addEventListener('click', async (event) => {
      if (event.target.className !== 'add-to-cart') return;
      const id = event.target.parentNode.getAttribute('item-id');
      const updatedCart = [...state.cart];
      const inventoryItem = Object.assign({}, state.inventory.find((item) => item.id === +id));
      const cartItemIndex = state.cart.findIndex((item) => item.id === +id);
  
      if (cartItemIndex !== -1) {
        const cartItem = state.cart[cartItemIndex];
        await model.updateCart(+id, inventoryItem.amount + cartItem.amount);
        model.getCart().then((data) => {
          state.cart = data;
        });
      } else if (inventoryItem) {
        await model.addToCart(inventoryItem);
        updatedCart.push(inventoryItem);
        state.cart = updatedCart;
      }
    });
  };
  

  const handleDelete = () => {
    view.cartContainer.addEventListener('click', async (event) => {
      if (event.target.className !== 'delete') return;
      const id = event.target.parentNode.getAttribute('item-id');
      await model.deleteFromCart(+id);
      state.cart = state.cart.filter((item) => item.id !== +id);
    });
  };
  

  const handleCheckout = () => {
    view.checkoutBtn.addEventListener('click', () => {
      model.checkout().then(() => {

        model.getCart().then((data) => {
          state.cart = data;
        });
      });
    });
  };
  const bootstrap = () => {
    init();
    handleUpdateAmount();
    handleAddToCart();
    handleDelete();
    handleCheckout();
    state.subscribe(() => {
      view.renderInventory(state.inventory);
      view.renderCart(state.cart);
    });
  };
  return {
    bootstrap,
  };
})(Model, View);

Controller.bootstrap();