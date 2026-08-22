// Local API simulation - replaces backend API calls for GitHub Pages deployment
import { products } from '../data/products.js';
import { deliveryOptions } from '../data/deliveryOptions.js';
import { defaultCart } from '../data/cart.js';
import { defaultOrders } from '../data/orders.js';

// Simulate network delay
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

// In-memory state (persists during session)
let cart = [...defaultCart];
let orders = [...defaultOrders];

// Helper: find product by ID
const findProduct = (id) => products.find(p => p.id === id);

// Helper: generate order ID
const generateId = () => crypto.randomUUID();

// Products API
export const productsApi = {
  async getAll(search = '') {
    await delay();
    if (!search) return [...products];
    const term = search.toLowerCase();
    return products.filter(p => 
      p.name.toLowerCase().includes(term) ||
      p.keywords.some(k => k.toLowerCase().includes(term))
    );
  },

  async getById(id) {
    await delay();
    const product = findProduct(id);
    if (!product) throw new Error('Product not found');
    return { ...product };
  }
};

// Cart API
export const cartApi = {
  async get(expand = false) {
    await delay();
    if (!expand) return [...cart];
    return cart.map(item => ({
      ...item,
      product: findProduct(item.productId)
    }));
  },

  async add(productId, quantity = 1) {
    await delay();
    const product = findProduct(productId);
    if (!product) throw new Error('Product not found');
    
    const existing = cart.find(item => item.productId === productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ productId, quantity, deliveryOptionId: '1' });
    }
    return cartApi.get(true);
  },

  async update(productId, quantity) {
    await delay();
    const item = cart.find(i => i.productId === productId);
    if (!item) throw new Error('Cart item not found');
    if (quantity <= 0) {
      cart = cart.filter(i => i.productId !== productId);
    } else {
      item.quantity = quantity;
    }
    return cartApi.get(true);
  },

  async remove(productId) {
    await delay();
    cart = cart.filter(i => i.productId !== productId);
    return cartApi.get(true);
  },

  async updateDeliveryOption(productId, deliveryOptionId) {
    await delay();
    const item = cart.find(i => i.productId === productId);
    if (!item) throw new Error('Cart item not found');
    item.deliveryOptionId = deliveryOptionId;
    return cartApi.get(true);
  }
};

// Delivery Options API
export const deliveryOptionsApi = {
  async getAll() {
    await delay();
    return [...deliveryOptions];
  }
};

// Orders API
export const ordersApi = {
  async getAll(expand = false) {
    await delay();
    if (!expand) return [...orders].sort((a, b) => b.orderTimeMs - a.orderTimeMs);
    return orders.map(order => ({
      ...order,
      products: order.products.map(op => ({
        ...op,
        product: findProduct(op.productId)
      }))
    })).sort((a, b) => b.orderTimeMs - a.orderTimeMs);
  },

  async getById(id, expand = false) {
    await delay();
    const order = orders.find(o => o.id === id);
    if (!order) throw new Error('Order not found');
    if (!expand) return { ...order };
    return {
      ...order,
      products: order.products.map(op => ({
        ...op,
        product: findProduct(op.productId)
      }))
    };
  },

  async create() {
    await delay(500);
    if (cart.length === 0) throw new Error('Cart is empty');
    
    // Calculate totals
    let totalCostCents = 0;
    const orderProducts = cart.map(item => {
      const product = findProduct(item.productId);
      const deliveryOption = deliveryOptions.find(d => d.id === item.deliveryOptionId);
      const estimatedDeliveryTimeMs = Date.now() + (deliveryOption?.deliveryDays || 7) * 24 * 60 * 60 * 1000;
      totalCostCents += product.priceCents * item.quantity + (deliveryOption?.priceCents || 0);
      return {
        productId: item.productId,
        quantity: item.quantity,
        estimatedDeliveryTimeMs
      };
    });

    const newOrder = {
      id: generateId(),
      orderTimeMs: Date.now(),
      totalCostCents,
      products: orderProducts
    };

    orders.unshift(newOrder);
    cart = []; // Clear cart after order
    return newOrder;
  }
};

// Payment Summary API
export const paymentSummaryApi = {
  async get() {
    await delay();
    const cartItems = await cartApi.get(true);
    let subtotalCents = 0;
    let shippingCents = 0;
    
    cartItems.forEach(item => {
      subtotalCents += item.product.priceCents * item.quantity;
      const deliveryOption = deliveryOptions.find(d => d.id === item.deliveryOptionId);
      shippingCents += deliveryOption?.priceCents || 0;
    });

    const totalCents = subtotalCents + shippingCents;
    const taxCents = Math.round(totalCents * 0.1);
    const grandTotalCents = totalCents + taxCents;

    return {
      subtotalCents,
      shippingCents,
      taxCents,
      totalCents: grandTotalCents,
      itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0)
    };
  }
};

// Reset API (for testing)
export const resetApi = {
  async reset() {
    await delay();
    cart = [...defaultCart];
    orders = [...defaultOrders];
    return { success: true };
  }
};