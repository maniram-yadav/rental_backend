const { successResponse, errorResponse } = require('../utils/response');
const { isValidDate ,getDayDifference} = require('../utils/util');
const Cart = require('../models/Cart');

//get cart
exports.getCart = async (req, res) => {
  try {
    console.log(req.params.userId)
    const cart = await Cart.findOne({ userId: req.params.userId }).populate('items.propertyId');
    if (!cart) {
      return errorResponse(res, 404, 'Cart not found');
    }
    successResponse(res, 200, cart);
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};

// Add item to cart
exports.addToCart = async (req, res) => {
  try {
    const maxLength = 10;
    const { userId, propertyId, startTime,endTime, pricePerDay } = req.body;
    
    if(!isValidDate(startTime) && !isValidDate(endTime)){
      errorResponse(res, 404, "Invalid Date Format");
    }
    const days = getDayDifference(startTime.substring(0, maxLength),
        endTime.substring(0, maxLength));
    if(days<0) {
         errorResponse(res, 404, "Start Date is greater than End Date");
    }
    console.log(days);
    
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      
      cart = new Cart({ userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(item => item.propertyId.toString() === propertyId);

    if (itemIndex > -1) {
      cart.items[itemIndex].startTime = startTime;
      cart.items[itemIndex].endTime = endTime;
      cart.items[itemIndex].pricePerDay = pricePerDay;
    } else {
      cart.items.push({ propertyId, startTime,endTime, pricePerDay });
    }

    
    await cart.save();
    successResponse(res, 200, cart);
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};

// Update cart item date
exports.updateCartItem = async (req, res) => {
  try {
    const maxLength = 10;
    const { userId, propertyId, startTime,endTime, pricePerDay } = req.body;
    
    if(!startTime || !endTime) {
            return errorResponse(res, 404, 'Invalid Date provided');
    }
    
    if(!isValidDate(startTime) && !isValidDate(endTime)){
      errorResponse(res, 404, "Invalid Date Format");
    }
    const days = getDayDifference(startTime.substring(0, maxLength),
        endTime.substring(0, maxLength));
    if(days<0) {
         errorResponse(res, 404, "Start Date is greater than End Date");
    }
    console.log(days);
    

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return errorResponse(res, 404, 'Cart not found');
    }

    const itemIndex = cart.items.findIndex(item => item.propertyId.toString() === propertyId);
    if (itemIndex === -1) {
      return errorResponse(res, 404, 'Item not found in cart');
    }

    cart.items[itemIndex].startTime = startTime;
    cart.items[itemIndex].endTime = endTime;
    cart.items[itemIndex].pricePerDay = pricePerDay;
    
    await cart.save();
    successResponse(res, 200, cart);
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
  try {
    const { userId, propertyId } = req.params;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return errorResponse(res, 404, 'Cart not found');
    }

    const itemIndex = cart.items.findIndex(item => item.propertyId.toString() === propertyId);
    if (itemIndex === -1) {
      return errorResponse(res, 404, 'Item not found in cart');
    }

    cart.items.splice(itemIndex, 1);
    await cart.save();
    successResponse(res, 200, cart);
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};

// Clear cart
exports.clearCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return errorResponse(res, 404, 'Cart not found');
    }

    cart.items = [];
    await cart.save();
    successResponse(res, 200, cart);
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};
