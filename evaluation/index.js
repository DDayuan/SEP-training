const API = (() => {
  const URL = "http://localhost:3000";
  const getCart = () => {
    // define your method to get cart data
    return fetch(`${URL}/cart`).then(data => data.json());
  };

  const getInventory = () => {
    // define your method to get inventory data
    return fetch(`${URL}/inventory`).then(data=> data.json());
  };

  const addToCart = (inventoryItem) => {
    // define your method to add an item to cart
    return fetch(`${URL}/cart`, {
      method: "POST",
      body: JSON.stringify(inventoryItem),
      headers: {
          "Content-Type": "application/json",
      },
  }).then((data) => data.json()).console.log("added")
    .catch(error => console.error("Error adding to cart:", error));
  };

  const updateCart = (id, newAmount) => {
    // define your method to update an item in cart
    return fetch(`${URL}/cart/${id}`, {
      method: "PATCH",
      body: JSON.stringify({amount:newAmount}),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to update cart item.");
      }
    });
  };

  const deleteFromCart = (id) => {
    // define your method to delete an item in cart
    return fetch(`${URL}/cart/${id}`, { method: "DELETE" }).then((data) => data.json());
  };

  const checkout = () => {
    // you don't need to add anything here
    return getCart().then((data) =>
      Promise.all(data.map((item) => deleteFromCart(item.id)))
    );
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

API.getInventory().then(data => console.log(data));
//API.addToCart("apple").then(data => console.log(data));
API.getCart().then(data => console.log(data));
const Model = (() => {
  // implement your logic for Model
  class State {
    #onChange;
    // #onChangeCart;
    #inventory;
    #cart;
    constructor() {
      this.#inventory = [];
      this.#cart = [];
      this.#onChange = () => {};
    }
    get cart() {
      return this.#cart;
    }

    get inventory() {
      return this.#inventory;
    }

    set cart(newCart) {
      console.log("setter")
      this.#cart = newCart;

      //update view
      this.#onChange(this.#cart, this.#inventory);
    }
    set inventory(newInventory) {
      this.#inventory = newInventory;
      //update view
      this.#onChange(this.#cart, this.#inventory);
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
  const checkoutBtn = document.querySelector(".checkout-btn");
  //const inventoryContainer = document.querySelector(".inventory-container ul");
  const renderInventoryList = (inventory, addToCartHandler, updateAmountHandler) => {
    const inventoryContainer = document.querySelector(".inventory-container ul");
    inventoryContainer.innerHTML = "";

    inventory.forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <div class="item">
          <span>${item.content}</span>
          <div class="quantity">
            <button class="minus-btn">-</button>
            <input type="text" class="amount-input" value="1" readonly />
            <button class="plus-btn">+</button>
          </div>
          <button class="add-to-cart-btn">Add to Cart</button>
        </div>
      `;

      const addToCartBtn = li.querySelector(".add-to-cart-btn");
      addToCartBtn.addEventListener("click", () => addToCartHandler(item));

      const minusBtn = li.querySelector(".minus-btn");
      minusBtn.addEventListener("click", () => {
        const input = li.querySelector(".amount-input");
        let amount = parseInt(input.value);
        if (amount > 1) {
          amount--;
          input.value = amount;
          updateAmountHandler(item.id, amount);
        }
      });

      const plusBtn = li.querySelector(".plus-btn");
      plusBtn.addEventListener("click", () => {
        const input = li.querySelector(".amount-input");
        let amount = parseInt(input.value);
        amount++;
        input.value = amount;
        updateAmountHandler(item.id, amount);
      });

      inventoryContainer.appendChild(li);
    });
  };

  const renderCartList = (cart, deleteFromCartHandler) => {
    const cartContainer = document.querySelector(".cart-container");
    cartContainer.innerHTML = "";
    cart.forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = `
      <div class="item">
        <span>${item.content}</span>
        <div class="quantity">${item.amount}</div>
        <button class="delete-btn">Delete</button>
      </div>
    `;
    const deleteBtn = li.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => deleteFromCartHandler(item.id));

    cartContainer.appendChild(li);
    });
  }
  return {
    renderInventoryList,
    renderCartList,
  };
})();

const Controller = ((model, view) => {
  // implement your logic for Controller
  const state = new model.State();

  const init = () => {
    console.log("start init")
    model.getInventory().then((inventory) => {
      state.inventory = inventory;
      view.renderInventoryList(state.inventory, handleAddToCart, handleUpdateAmount);
    })
    model.getCart().then((cart) => {
      state.cart = cart;
      console.log("render cart")
      view.renderCartList(state.cart, handleDelete);
    })
  };
  const handleUpdateAmount = () => {
    
  };
  const handleAddToCart = (item) => {
    const cartItemForNow = state.cart.find((cartItem) => cartItem.id === item.id);
    const amountAdd = document.querySelector(`li[data-id="${item.id}"] .amount-input`);
    
    if (amountAdd) {
      const amount = parseInt(amountAdd.value);
  
      if (cartItemForNow) {
        console.log("adding old")
        const newAmount = cartItemForNow.amount + amount;
        model.updateCart(cartItemForNow.id, newAmount).then(() => {
          state.cart = state.cart.map((cartItem) => {
            if (cartItem.id === cartItemForNow.id) {
              return { ...cartItem, amount: newAmount };
            }
            return cartItem;
          });
          //view.renderCartList(state.cart, handleDelete);
        });
      } else {
        console.log("adding new")
        const cartItem = {
          id: item.id,
          content: item.content,
          amount: amount,
        };
        model.addToCart(cartItem).then(() => {
          state.cart = [...state.cart, cartItem];
          //view.renderCartList(state.cart, handleDelete);
        });
      }
    }
  };
  

  const handleDelete = (id) => {
    model.deleteFromCart(id).then(()=> {
      state.cart = state.cart.filter((cartItem) => cartItem.id !== id);
      //view.renderCartList(state.cart, handleDelete);
    })
  };

  const handleCheckout = () => {
    model.checkout().then(()=>{
      state.cart = [];
      //view.renderCartList(state.cart, handleDelete);
    })
  };
  const bootstrap = () => {
    init();
    
    state.subscribe = (() => {
      view.renderInventoryList(state.inventory, handleAddToCart, handleUpdateAmount);
      view.renderCartList(state.cart, handleDelete);
    })
    const checkoutBtn = document.querySelector(".checkout-btn");
    checkoutBtn.addEventListener("click", handleCheckout);
  };
  return {
    bootstrap,
  };
})(Model, View);

Controller.bootstrap();
