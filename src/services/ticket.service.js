//     /src/services/ticket.service.js

import TicketRepository from "../repositories/ticket.repository.js";
import { v4 as uuidv4 } from "uuid";

import ProductService from "./product.service.js"; // para consultar y actualizar productos
import { checkStock } from "../utils/stockChecker.js";

const ticketRepo = new TicketRepository();

const productService = new ProductService();

class TicketService {

  async doSale(cart, userEmail) {
    if (!cart || !cart.products || cart.products.length === 0) {
      throw new Error("El carrito está vacío o no es válido");
    }

    // 1. Validar stock para todos los productos
  for (const item of cart.products) {
    const hasStock = await checkStock(item.num, item.quantity);
    if (!hasStock) {
      const product = await productService.getByProductNum(item.num);
      throw new Error(`Stock insuficiente para el producto ${product.title} con num ${item.num}`);
    }
  }


    // 2. Si pasamos la validación, restamos el stock
    for (const item of cart.products) {
      const { num, quantity } = item;
      const product = await productService.getByProductNum(num);

      // Actualizar stock restando cantidad
      const nuevoStock = product.stock - quantity;

      await productService.updateProduct(product._id, { stock: nuevoStock });
    }

    // 3. Calcular monto total
    let totalAmount = 0;
    for (const item of cart.products) {
      totalAmount += item.price * item.quantity;
    }

    // 4. Armar productos para ticket (podés copiar lo que ya tenés)
    const ticketProducts = cart.products.map(p => ({
      num: p.num,
      title: p.title,
      price: p.price,
      quantity: p.quantity
    }));

    // 5. Crear ticket
    const ticketData = {
      code: uuidv4(),
      purchaser: userEmail,
      amount: totalAmount,
      products: ticketProducts
    };

    const ticket = await ticketRepo.create(ticketData);

    if (!ticket) {
      throw new Error("No se pudo crear el ticket");
    }

    return ticket;
  }
}

export default TicketService;