//  /src/controllers/carts.controller.js


import CartService from "../services/cart.service.js"

const cartService = new CartService()

class CartController {



  async createEmptyCart(req, res) {
    const { userID } = req.body;
    if (!userID) {
      return res.status(400).json({ status: "error", message: "Falta el ID de usuario" });
    }
  
    try {
      const result = await cartService.createCart(userID, []);
      return res.status(201).json({ status: "success", payload: result });
    } catch (error) {
      return res.status(500).json({ status: "error", message: error.message });
    }
  }

  async createCartWithProducts(req, res) {
    const { userID, products } = req.body;
    if (!userID || !Array.isArray(products) || !products.length) {
      return res.status(400).json({ status: "error", message: "Missing fields" });
    }

    try {
      const result = await cartService.createCart(userID, products);
      return res.status(201).json({ status: "success", payload: result });
    } catch (error) {
      return res.status(500).json({ status: "error", message: error.message });
    }
  }

  async getCarts(req, res) {
    try {
      const carts = await cartService.getAllCarts();
      res.json({ status: "success", carts });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  }

  async getCartById(req, res) {
    try {
      const cart = await cartService.getCartById(req.params.id);
      if (!cart) {
        return res.status(404).json({ status: "error", message: "Cart not found" });
      }
      res.json({ status: "success", cart });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  }



  async getCurrentCart(req, res) {
    try {
      const user = req.user;

      if (!user.cart) {
        return res.status(404).json({ result: "error", message: "Usuario no tiene carrito asociado" });
      }

      const cart = await cartService.getCartById(user.cart);

      if (!cart) {
        return res.status(404).json({ result: "error", message: "Carrito no encontrado" });
      }

      res.json({ result: "ok", payload: cart });
    } catch (error) {
      res.status(500).json({ result: "error", message: error.message });
    }
  }

  async updateCart(req, res) {
    const cartID = req.params.id;
    const updateData = req.body;

    try {
      const updated = await cartService.updateCart(cartID, updateData);
      res.json({ status: "success", message: "Cart updated", result: updated });
    } catch (error) {
      res.status(400).json({ status: "error", message: error.message });
    }
  }

  async addProductToCart(req, res) {
    const cartID = req.params.id;
    const productData = req.body;

    if (!productData) {
      return res.status(400).json({ status: "error", message: "Falta el ID del producto" });
    }

    try {
      const result = await cartService.addProductToCart(cartID, productData);
      res.json({ status: "success", message: "Product added", result });
    } catch (error) {
      res.status(400).json({ status: "error", message: error.message });
    }
  }


  async addProductToCartByParams(req, res) {
    const { cid, pid } = req.params;  
    try {
      const result = await cartService.addProductById(cid, pid);
      res.json({ result: "ok", payload: result });
    } catch (error) {
      res.status(400).json({ result: "error", message: error.message });
    }
  }

  async updateProductQuantity(req, res) {
    const cartID = req.params.id;
    const { productNum, quantity } = req.body;

    if (!productNum || quantity === undefined) {
      return res.status(400).json({ status: "error", message: "Missing productNum or quantity" });
    }

    try {
      const result = await cartService.updateProductQuantity(cartID, productNum, quantity);
      res.json({ status: "success", message: "Product quantity updated", result });
    } catch (error) {
      res.status(400).json({ status: "error", message: error.message });
    }
  }


async deleteProductFromCart(req, res) {
  const { id: cartId, num } = req.params;

  try {
    const parsedNum = parseInt(num);
    if (isNaN(parsedNum)) {
      return res.status(400).json({ result: "error", message: "Número de producto inválido" });
    }

    const updatedCart = await cartService.removeProductFromCart(cartId, parsedNum);
    res.json({ result: "ok", payload: updatedCart });
  } catch (error) {
    res.status(500).json({ result: "error", message: error.message });
  }
}

  async deleteCart(req, res) {
    try {
      const result = await cartService.deleteCart(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(404).json({ status: "error", message: error.message });
    }
  }


  
}


export default CartController;
