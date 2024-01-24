const orderM = require('../models/order.m')
const orderDetailM = require('../models/orderDetail.m')
const jwt = require('jsonwebtoken')
const jwtSecondKey = process.env.JWT_SECOND

module.exports = {
  placeOrder: async (req, res, next) => {
    try {
      const date = new Date().toString().split(' GMT')[0];
      const userId = req.userData.userId;
      const products = req.body.products;
      const total = req.body.total;
      const address = req.body.info.address;
      const phone = req.body.info.phone;

      //Thêm token để gửi đến server phụ
      try {
        token = jwt.sign(
          {
            userId: userId,
            amount: total
          },
          jwtSecondKey,
          { expiresIn: "1h" }
        );
      } catch (err) {
        console.error(err)
        const error = new HttpError(
          'Something wrong when add jwt', 500
        );
        return next(error);
      }
      //Gọi fetch kiểm tra bên server phụ
      const checkPayment = await fetch('http://localhost:5001/api/trans', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      if (!checkPayment.ok) {
        return res.status(checkPayment.status || 401).json({ isSuccess: false });
      }
      try {
        const orderid = await orderM.insert(date, userId, total, address, phone);
        for (const product of products) {
          let item = new orderDetailM(orderid, product);
          await orderDetailM.insert(item);
        }
      }
      catch (e) {
        console.log(e);
        return res.status(402).json({ isSuccess: false, message: "Lỗi khi thêm dữ liệu" });
      }

      res.status(200).json({ isSuccess: true });
    }
    catch (e) {
      console.log(e);
    }
  },
  getAllOrders: async (req, res, next) => {
    const userId = req.userData.userId;
    //console.log("userid in getAllOrders func", userId);
    const orders = await orderM.getByUserId(userId);
    ///console.log("orders in controller get all func", orders);
    res.json({
      orders: orders
    });
  },
  getDetail: async (req, res, next) => {
    const orderId = req.params.orderId;
    console.log("orderID in get detail func", orderId);
    const details = await orderDetailM.getAllDetails(orderId);
    res.json({
      detail: details
    })
  }
}