const orderM = require('../models/order.m')
const orderDetailM = require('../models/orderDetail.m')
const jwt = require('jsonwebtoken')
const jwtSecondKey = process.env.JWT_SECOND
require('dotenv').config()
const paymentServerURL = process.env.PAYMENT_SERVER_HOST

module.exports = {
  placeOrder: async (req, res, next) => {
    try {
      const date = new Date().toString().split(' GMT')[0];
      const userId = req.userData.userId;
      const products = req.body.products;
      const total = req.body.total;
      const address = req.body.info.address;
      const phone = req.body.info.phone;

      //Thêm vào bảng 
      var orderid;
      try {
        orderid = await orderM.insert(date, userId, total, address, phone, 'pending');
      }
      catch (e) {
        console.log(e);
        return res.status(502).json({ isSuccess: false, message: "Lỗi khi thêm dữ liệu" });
      }
      //Thêm token để gửi đến server phụ
      try {
        token = jwt.sign(
          {
            userId: userId,
            amount: total,
            orderID: orderid
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
      //add order with pending status

      //Gọi fetch kiểm tra bên server phụ
      try {
        const checkPayment = await fetch(paymentServerURL + '/api/trans', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
        if (!checkPayment.ok) {
          return res.status(checkPayment.status || 401).json({ isSuccess: false });
        }
        //Nếu server phụ trả về thành công, thực hiện update status của đơn hàng và thêm sản phẩm vào order detail
        for (const product of products) {
          let item = new orderDetailM(orderid, product);
          await orderDetailM.insert(item);
        }
        await orderM.updateStatus(orderid, 'success');

        res.status(200).json({ isSuccess: true });
      }
      catch (e) {
        if (e.message == "fetch failed") {  //Nếu server phụ bị lỗi, không thể fetch
          res.status(503).json({ isPending: true }) //Trả về người dùng nội dung: đơn hàng đang được xử lý

          //Fetch liên tục đến khi server Payment hoạt động trở lại
          let response;
          let reconnect = setInterval(async () => {
            try {
              response = await fetch(paymentServerURL);

              //Nếu server hoạt động trở lại
              if (response) {
                clearInterval(reconnect)    //Xóa interval
                const pendingOrders = await orderM.getAllPending(); //Lấy toàn bộ đơn hàng pending
                const orderIDs = pendingOrders.map(item => {
                  return item.OrderID
                })

                //Tạo token với dữ liệu là các orderid của các đơn hàng pending
                if (pendingOrders.length !== 0) {
                  var newToken;
                  try {
                    newToken = jwt.sign(
                      {
                        orderids: orderIDs
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

                  try {
                    //Fetch đến server Payment để lấy các trans có orderid nằm trong danh sách orderid trên
                    fetch(paymentServerURL + '/api/trans/get-trans-by-orderid', {
                      method: 'GET',
                      headers: {
                        'Authorization': `Bearer ${newToken}`,
                        'Content-Type': 'application/json',
                      },
                    })
                      .then(res => {
                        return res.json()
                      })
                      .then(trans => {
                        if (trans) {
                          //Trước tiên ta chuyển tất cả các order đang pending sang trạng thái fail
                          pendingOrders.forEach(async order => {
                            await orderM.updateStatus(order.OrderID,'fail');
                          })

                          //Sau đó chuyển tất cả các order có trans = success, tức là đã thực hiện trans về trạng thái success
                          trans.forEach(async tran => {
                            if (tran.Status == "success") {
                              await orderM.updateStatus(tran.OrderID, 'success');
                              for (const product of products) {
                                let item = new orderDetailM(orderid, product);
                                await orderDetailM.insert(item);
                              }
                            }
                          });
                        }
                      })
                  }
                  catch (e) {

                  }
                }
              }
            }
            catch (error) {

            }
          }, 5000)
        }
      }
    }
    catch (e) {
      console.log(e)
      res.status(502).json({ isSuccess: false, message: "LOI HE THONG" });
    }
  },
  getOrdersHandler: async (req, res, next) => {
    const userId = req.userData.userId;
    ///console.log("query page in orders controller", req.query.page);
    if (!req.query.page) {
      const orders = await orderM.getByUserId(userId);
      res.json({
        total_pages: 1,
        total: orders.length,
        orders: orders
      });
      return;
    }
    const page = parseInt(req.query.page);
    const per_page = parseInt(req.query.per_page);
    const offset = (page - 1) * per_page;
    const data = await orderM.getByPage(userId, offset, per_page);
    const totalRow = await orderM.getTotalByUserId(userId);
    console.log("total row", totalRow);
    res.json({
      total_pages: Math.ceil(totalRow / per_page),
      total: totalRow,
      orders: data
    })
  },
  getDetail: async (req, res, next) => {
    const orderId = req.params.orderId;
    //console.log("orderID in get detail func", orderId);
    const details = await orderDetailM.getAllDetails(orderId);
    res.json({
      detail: details
    })
  }
}