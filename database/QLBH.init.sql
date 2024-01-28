/*
 Target Server Type    : PostgreSQL
 Target Server Version : 90600
 File Encoding         : 65001
*/


-- ----------------------------
-- Table structure for Categories
-- ----------------------------
DROP TABLE IF EXISTS "Categories";
CREATE TABLE "Categories" (
  "CatID" serial NOT NULL,
  "CatName" varchar(50) NOT NULL
)
;

-- ----------------------------
-- Records of Categories
-- ----------------------------
BEGIN;
INSERT INTO "Categories" VALUES (DEFAULT, 'Sách');
INSERT INTO "Categories" VALUES (DEFAULT, 'Điện thoại');
INSERT INTO "Categories" VALUES (DEFAULT, 'Quần áo - Giày dép');
INSERT INTO "Categories" VALUES (DEFAULT, 'Máy tính');
INSERT INTO "Categories" VALUES (DEFAULT, 'Máy chụp hình');
INSERT INTO "Categories" VALUES (DEFAULT, 'Đồ trang sức');
INSERT INTO "Categories" VALUES (DEFAULT, 'Khác');
COMMIT;

-- ----------------------------
-- Table structure for OrderDetails
-- ----------------------------
DROP TABLE IF EXISTS "OrderDetails";
CREATE TABLE "OrderDetails" (
  "ID" serial NOT NULL,
  "OrderID" int4 NOT NULL,
  "ProductName" varchar(255) NOT NULL,
  "ProID" int4,
  "Quantity" int4 NOT NULL,
  "Price" numeric(19,4) NOT NULL,
  "Amount" numeric(19,4) NOT NULL
)
;

-- ----------------------------
-- Records of OrderDetails
-- ----------------------------
-- BEGIN;
-- INSERT INTO "OrderDetails" VALUES (1, 1, 'Freshwater Cultured Pearl', 1, 2, 1500000.0000, 3000000.0000);
-- INSERT INTO "OrderDetails" VALUES (2, 1, 'Pink Sapphire Sterling Silver', 2, 2, 300000.0000, 600000.0000);
-- INSERT INTO "OrderDetails" VALUES (3, 2, 'Freshwater Cultured Pearl', 1, 1, 1500000.0000, 1500000.0000);
-- INSERT INTO "OrderDetails" VALUES (4, 2, 'Pink Sapphire Sterling Silver', 2, 1, 300000.0000, 300000.0000);
-- COMMIT;

-- ----------------------------
-- Table structure for Orders
-- ----------------------------
DROP TABLE IF EXISTS "Orders";
CREATE TABLE "Orders" (
  "OrderID" serial NOT NULL,
  "OrderDate" timestamp NOT NULL,
  "UserID" int4 NOT NULL,
  "Total" numeric(19,4) NOT NULL,
	"Address" varchar(100),
	"Phone" varchar(50),
  "Status" varchar(10)
)
;

-- ----------------------------
-- Records of Orders
-- ----------------------------
-- BEGIN;
-- INSERT INTO "Orders" VALUES (1, '2014-03-14 00:00:00.000', 5, 3600000.0000);
-- INSERT INTO "Orders" VALUES (2, '2014-03-14 00:00:00.000', 5, 1800000.0000);
-- COMMIT;

-- ----------------------------
-- Table structure for Products
-- ----------------------------
DROP TABLE IF EXISTS "Products";
CREATE TABLE "Products" (
  "ProID" serial NOT NULL,
  "ProName" varchar(255) NOT NULL,
  "TinyDes" varchar(255) NOT NULL,
  "FullDes" text NOT NULL,
  "Price" numeric(19,4) NOT NULL,
  "CatID" int4 NOT NULL,
  "Quantity" int4 NOT NULL,
  "Image" text
)
;

-- ----------------------------
-- Table structure for Image of Products
-- ----------------------------
-- DROP TABLE IF EXISTS "ProductImages";
-- CREATE TABLE "ProductImages" (
--   "ProID" int4 NOT NULL,
--   "ImageUrl" text NOT NULL,

--   PRIMARY KEY ("ProID", "ImageUrl")
-- )
-- ;

-- ----------------------------
-- Records of Products
-- ----------------------------
INSERT INTO "Products" VALUES (DEFAULT, 'Sách Thay Đổi Cuộc Sống Với Nhân Số Học - Lê Đỗ Quỳnh Hương', 'Thay Đổi Cuộc Sống Với Nhân Số HọcCuốn sách Thay đổi cuộc sống với Nhân số học là tác phẩm được chị Lê Đỗ Quỳnh Hương phát triển từ tác phẩm gốc “The Complete Book of Numerology” của tiến sỹ David A....', 'Sách Thay Đổi Cuộc Sống Với Nhân Số Học - Lê Đỗ Quỳnh Hương', 183520.0000, 1, 14863, 'https://salt.tikicdn.com/cache/280x280/ts/product/15/11/f8/56b303e000cb42faada663569fc5d7c9.jpg');
INSERT INTO "Products" VALUES (DEFAULT, 'Sách Nghệ Thuật Đàm Phán và Thương Lượng - Chiến Lược Cạnh Tranh Trong Kinh Doanh Mang Lại Thành Công Cho Doanh Nghiệp - V1174D', 'Nhà sách Nam Việt – Namvietbook xin trân trọng giới thiệu sách Nghệ Thuật Đàm Phán và Thương Lượng - Chiến Lược Cạnh Tranh Trong Kinh Doanh Mang Lại Thành Công Cho Doanh NghiệpNghệ Thuật Đàm Phán và...', 'Sách Nghệ Thuật Đàm Phán và Thương Lượng - Chiến Lược Cạnh Tranh Trong Kinh Doanh Mang Lại Thành Công Cho Doanh Nghiệp - V1174D', 250000.0000, 1, 6, 'https://salt.tikicdn.com/cache/280x280/ts/product/f8/e9/28/c097790b0298ebeadf7f7b61d2e9be01.jpg');
INSERT INTO "Products" VALUES (DEFAULT, 'Combo 2 Tác Phẩm Của Michael Sandel: Tiền Không Mua Được Gì + Phải Trái Đúng Sai - Tặng Kèm Bookmark Bamboo Books', 'Sách - Tiền Không Mua Được GìTrong cuốn sách này, Michael J. Sandel đặt ra một trong những câu hỏi về đạo đức quan trọng nhất của thời đại chúng ta: có vấn đề gì đang xảy ra với thế giới này khi mọi ...', 'Combo 2 Tác Phẩm Của Michael Sandel: Tiền Không Mua Được Gì + Phải Trái Đúng Sai - Tặng Kèm Bookmark Bamboo Books', 257600.0000, 1, 114, 'https://salt.tikicdn.com/cache/280x280/ts/product/b7/33/db/1b5b63561437107acaf498660f5819d0.jpg');
INSERT INTO "Products" VALUES (DEFAULT, 'Sách Sức Mạnh Của Ngôn Từ (Tái Bản 2022)', 'Sức Mạnh Của Ngôn TừSử dụng đúng ngôn từ để đạt hiệu quả giao tiếp cao nhất.Nếu bạn cũng giống như hàng triệu người thường ngồi lặng yên trong các cuộc họp, bỏ lỡ nhiều cơ hội thăng tiến, căng thẳng...', 'Sách Sức Mạnh Của Ngôn Từ (Tái Bản 2022)', 73900.0000, 1, 3839, 'https://salt.tikicdn.com/cache/280x280/media/catalog/producttmp/b3/d4/47/dc8a871968513bc4e912801307da89d8.jpg');
INSERT INTO "Products" VALUES (DEFAULT, 'Sách - Huấn Luyện Não Bộ Học Siêu Tốc: Đọc Nhanh - Nhớ Lâu - Hiểu Sâu - Phát Triển Bản Thân Mỗi Ngày - MCBooks', 'Sách - Huấn Luyện Não Bộ Học Siêu Tốc: Đọc Nhanh - Nhớ Lâu - Hiểu Sâu - Phát Triển Bản Thân Mỗi Ngày - MCBooks Lưu ý: Chỉ có sách chính hãng mới có thể quét mã QR-code để nhận các bản Audiobooks - S...', 'Sách - Huấn Luyện Não Bộ Học Siêu Tốc: Đọc Nhanh - Nhớ Lâu - Hiểu Sâu - Phát Triển Bản Thân Mỗi Ngày - MCBooks', 96600.0000, 1, 14, 'https://salt.tikicdn.com/cache/280x280/ts/product/8d/5a/3a/8c3ee880619aad89ddc67fde72729561.png');
INSERT INTO "Products" VALUES (DEFAULT, 'Bộ 4 Cuốn Sách Cẩm Nang Tuyệt Mật Của Phụ Nữ: Xé Vài Trang Thanh Xuân, Kế hoạch tự tin, Sống Kỷ Luật, Biết Kiềm Chế Và Sống An Nhiên Đời Bình Yên', 'Cẩm nang tuyệt mật của mọi phụ nữ chị em nhất định phải đọc 1 lần trong đời không bao giờ hối hận1. Sống Kỷ Luật, Biết Kiềm Chế, Đời Mới Vừa Ngầu Vừa SangCuốn sách như một bản tuyên ngôn cho những n...', 'Bộ 4 Cuốn Sách Cẩm Nang Tuyệt Mật Của Phụ Nữ: Xé Vài Trang Thanh Xuân, Kế hoạch tự tin, Sống Kỷ Luật, Biết Kiềm Chế Và Sống An Nhiên Đời Bình Yên', 481000.0000, 1, 14, 'https://salt.tikicdn.com/cache/280x280/ts/product/f7/33/9b/a7e9211eefd3cd70dfa4987a0a064e2b.jpg');
INSERT INTO "Products" VALUES (DEFAULT, 'Sách PACE Books - Mindfulness cho người mới bắt đầu (Mindfulness for Beginners) - Jon Kabat Zinn', 'Chúng ta có thể đang khao khát tìm kiếm sự trọn vẹn, trong khi thực tế thì sự trọn vẹn ấy đã hiện hữu ngay lúc này và nằm trọn trong tay ta. Thực hành mindfulness không chỉ đem đến cho ta cảm giác mãn...', 'Sách PACE Books - Mindfulness cho người mới bắt đầu (Mindfulness for Beginners) - Jon Kabat Zinn', 80750.0000, 1, 373, 'https://salt.tikicdn.com/cache/280x280/ts/product/11/e2/8c/cb780b4c2c929bbce2445be635f94e33.png');
INSERT INTO "Products" VALUES (DEFAULT, 'Sách Give And Take - Cho & Nhận (Tái Bản)', '“Cho và nhận” là quyển sách đặc biệt của Adam Grant. Từ thực tiễn giảng dạy của mình, Adam Grant – khi ấy đang là giáo sư trẻ nhất của ngôi trường Wharton danh giá – đã kiểm chứng nguyên nhân mang lại...', 'Sách Give And Take - Cho & Nhận (Tái Bản)', 87600.0000, 1, 899, 'https://salt.tikicdn.com/cache/280x280/media/catalog/producttmp/81/a3/5e/60770f2010385d475f97285201dbf8c4.jpg');
INSERT INTO "Products" VALUES (DEFAULT, 'Sống Kỷ Luật, Biết Kiềm Chế, Đời Mới Vừa Ngầu Vừa Sang - Sách Phát Triển Bản Thân', 'Cuốn sách như một bản tuyên ngôn cho những người phụ nữ muốn sống một cuộc đời mình mong muốn, được đúc kết lại bằng chính những câu chuyện để đời cùng trải nghiệm quý báu của tác giả Lương Sảng với 5...', 'Sống Kỷ Luật, Biết Kiềm Chế, Đời Mới Vừa Ngầu Vừa Sang - Sách Phát Triển Bản Thân', 140800.0000, 1, 16, 'https://salt.tikicdn.com/cache/280x280/ts/product/48/bd/f7/63739e1459da0dcaf44d634a2398a2c1.jpg');
INSERT INTO "Products" VALUES (DEFAULT, 'Không Phải Sói Nhưng Cũng Đừng Là Cừu -Tặng kèm bookmark 2 mặt', 'SÓI VÀ CỪU - BẠN KHÔNG TỐT NHƯ BẠN NGHĨ ĐÂU! Làn ranh của việc ngây thơ hay xấu xa đôi khi mỏng manh hơn bạn nghĩ. Bạn làm một việc mà mình cho là đúng, kết quả lại bị mọi người khiển trách. Bạn ủn...', 'Không Phải Sói Nhưng Cũng Đừng Là Cừu -Tặng kèm bookmark 2 mặt', 90000.0000, 1, 12360, 'https://salt.tikicdn.com/cache/280x280/media/catalog/producttmp/fe/a5/6f/2835d2d51b51e06ebb4c26b54ed2a536.png');
INSERT INTO "Products" VALUES (DEFAULT, 'Sách Thay Đổi Cuộc Sống Với Nhân Số Học - Lê Đỗ Quỳnh Hương', 'Thay Đổi Cuộc Sống Với Nhân Số HọcCuốn sách Thay đổi cuộc sống với Nhân số học là tác phẩm được chị Lê Đỗ Quỳnh Hương phát triển từ tác phẩm gốc “The Complete Book of Numerology” của tiến sỹ David A....', 'Sách Thay Đổi Cuộc Sống Với Nhân Số Học - Lê Đỗ Quỳnh Hương', 169700.0000, 1, 31435, 'https://salt.tikicdn.com/cache/280x280/media/catalog/producttmp/ea/63/08/382b8351042ddd4eef0d56d5f2679239.jpg');
INSERT INTO "Products" VALUES (DEFAULT, 'Combo Sách Kỹ Năng Sống Hay Dành Cho Tuổi Trẻ: Tuổi Trẻ Đáng Giá Bao Nhiêu + Đừng Lựa Chọn An Nhàn Khi Còn Trẻ - (Tặng Kèm Bookmark Thiết Kế)', 'Combo Sách Kỹ Năng Sống Hay Dành Cho Tuổi Trẻ: Tuổi Trẻ Đáng Giá Bao Nhiêu + Đừng Lựa Chọn An Nhàn Khi Còn Trẻ - (Tặng Kèm Bookmark Thiết Kế)Ai cũng biết rằng thanh xuân ngắn lắm! Nhưng thật sự mấy a...', 'Combo Sách Kỹ Năng Sống Hay Dành Cho Tuổi Trẻ: Tuổi Trẻ Đáng Giá Bao Nhiêu + Đừng Lựa Chọn An Nhàn Khi Còn Trẻ - (Tặng Kèm Bookmark Thiết Kế)', 170100.0000, 1, 21, 'https://salt.tikicdn.com/cache/280x280/ts/product/80/3b/e2/fc8ebacfec38cbe6d3254aec6b8d011b.jpg');
INSERT INTO "Products" VALUES (DEFAULT, 'Sách Để Thế Giới Biết Bạn Là Ai', 'Để Thế Giới Biết Bạn Là AiĐược xem là người khai sinh ra bộ môn khoa học về thành công, Napoleon Hill đã dành gần như trọn đời để phân tích, nghiên cứu, xây dựng và giảng dạy những triết lý, nguyên t...', 'Sách Để Thế Giới Biết Bạn Là Ai', 99000.0000, 1, 15, 'https://salt.tikicdn.com/cache/280x280/ts/product/b2/c6/51/b96b6ed75876b6ddda71504bcf82186a.jpg');
INSERT INTO "Products" VALUES (DEFAULT, 'Combo Phân Tích Chứng Khoán + Phương pháp đầu tư Warren Buffett (Bộ 2 cuốn sách kinh điển về đầu tư chứng khoán)', 'Phân Tích Chứng Khoán + Phương pháp đầu tư Warren Bufett (Combo 2 cuốn sách kinh điển về đầu tư chứng khoán)Combo gồm 2 cuốn sách kinh điển về đầu tư chứng khoán, đây là 2 cuốn sách của những người l...', 'Combo Phân Tích Chứng Khoán + Phương pháp đầu tư Warren Buffett (Bộ 2 cuốn sách kinh điển về đầu tư chứng khoán)', 648000.0000, 1, 84, 'https://salt.tikicdn.com/cache/280x280/ts/product/ac/2e/4a/81d106b7ecd5108833be22fb9c527d5b.jpg');
INSERT INTO "Products" VALUES (DEFAULT, 'Sách Bí Ẩn Của Não Phải (Tái Bản)', 'Cuốn sách là sự khám phá, đào sâu và cung cấp nhận thức rõ ràng hơn về các khả năng Não phải - những khả năng chưa hoàn toàn được đánh thức ở trẻ như: Tưởng tượng hình ảnh, Trực giác, Ghi nhớ, Tính to...', 'Sách Bí Ẩn Của Não Phải (Tái Bản)', 85000.0000, 1, 50, 'https://salt.tikicdn.com/cache/280x280/ts/product/9b/7f/b2/83a772053573b21e4ecf3f9816a4fd4d.jpg');
INSERT INTO "Products" VALUES (DEFAULT, 'Sách IRED Books - Tinh thần tự lực - Những tấm gương về phẩm hạnh và lòng kiên trì - Samuel Smiles', 'TINH THẦN TỰ LỰCNhững tấm gương về phẩm hạnh và lòng kiên trìSAMUEL SMILES (1812 – 1904) là nhà cải cách chính trị-văn hóa-xã hội lỗi lạc người Anh. Từ 1837, ông bắt đầu viết cho tờ Edinburgh Weekly...', 'Sách IRED Books - Tinh thần tự lực - Những tấm gương về phẩm hạnh và lòng kiên trì - Samuel Smiles', 148750.0000, 1, 232, 'https://salt.tikicdn.com/cache/280x280/ts/product/64/d4/1a/8047eb44d11ed42d65715fd57a156515.jpg');
INSERT INTO "Products" VALUES (DEFAULT, 'Sách The Best of Chicken Soup - Tuyển Tập Những Câu Chuyện Hay Nhất (Song Ngữ)(Tái Bản 2020) ', 'The Best Of Chicken Soup - Tuyển Tập Những Câu Chuyện Hay NhấtBộ sách Chicken Soup for the Soul đã mang đến cho bạn đọc nhiều câu chuyện cảm động, những câu chuyện có thể tưới mát tâm hồn và giúp cuộc...', 'Sách The Best of Chicken Soup - Tuyển Tập Những Câu Chuyện Hay Nhất (Song Ngữ)(Tái Bản 2020) ', 94000.0000, 1, 1315, 'https://salt.tikicdn.com/cache/280x280/media/catalog/producttmp/0b/d8/19/fae71aa7770cd85ab489eb002bc732f8.jpg');
INSERT INTO "Products" VALUES (DEFAULT, 'Sách Bí Ẩn Của Não Phải (Tái Bản)', 'Cuốn sách là sự khám phá, đào sâu và cung cấp nhận thức rõ ràng hơn về các khả năng Não phải - những khả năng chưa hoàn toàn được đánh thức ở trẻ như: Tưởng tượng hình ảnh, Trực giác, Ghi nhớ, Tính to...', 'Sách Bí Ẩn Của Não Phải (Tái Bản)', 85000.0000, 1, 50, 'https://salt.tikicdn.com/cache/280x280/ts/product/9b/7f/b2/83a772053573b21e4ecf3f9816a4fd4d.jpg');
INSERT INTO "Products" VALUES (DEFAULT, 'Combo 999 Lá Thư Gửi Cho Chính Mình - Tặng kèm bookmark (Trọn bộ 2 tập)', 'Combo 999 Lá Thư Gửi Cho Chính Mình - Trọn bộ 2 tập“999 lá thư gửi cho chính mình” là một tác phẩm đặc biệt đầy cảm hứng đến từ tác giả văn học mạng nổi tiếng Miêu Công Tử, mang một màu sắc riêng biệ...', 'Combo 999 Lá Thư Gửi Cho Chính Mình - Tặng kèm bookmark (Trọn bộ 2 tập)', 219300.0000, 1, 41, 'https://salt.tikicdn.com/cache/280x280/ts/product/2e/c6/a6/a555919afeb01514cfe054ed0167bb40.jpg');
INSERT INTO "Products" VALUES (DEFAULT, 'Combo 2 Cuốn Sách Hài Hước Vui Vẻ: Một Cuốn Sách Buồn… Cười ( Vui Vẻ Không Quạu Nha 2 ) + Vui Vẻ Không Quạu Nha', 'Bộ sách gồm 2 cuốn:1. Một Cuốn Sách Buồn… Cười ( Vui Vẻ Không Quạu Nha 2 ) “Tôi lúc 6 tuổi: Mẹ ơi, 25 tuổi con sẽ mua cho mẹ một căn nhà lớn và chiếc xe hơi!Tôi lúc 25 tuổi: Mẹ yêu, shipper đến rồi...', 'Combo 2 Cuốn Sách Hài Hước Vui Vẻ: Một Cuốn Sách Buồn… Cười ( Vui Vẻ Không Quạu Nha 2 ) + Vui Vẻ Không Quạu Nha', 125800.0000, 1, 308, 'https://salt.tikicdn.com/cache/280x280/ts/product/aa/fe/2f/7d35a7f3c16299b0a302fcf2810d217d.jpg');
INSERT INTO "Products" VALUES (DEFAULT, 'Combo Tuyệt Phẩm Của Tác Giả Văn Tình : Lấy Tình Thâm Mà Đổi Đầu Bạc + Khí Chất Bao Nhiêu, Hạnh Phúc Bấy Nhiêu + Bạn Đắt Giá Bao Nhiêu? + Không Tự Khinh Bỉ Không Tự Phí Hoài / BooksetMK (Bộ Sách Thay Đổi Tư Duy Không Chỉ Dành Cho Phái Đẹp)', 'Combo Tuyệt Phẩm Của Tác Giả Văn Tình : Lấy Tình Thân Mà Đổi Đầu Bạc + Khí Chất Bao Nhiêu, Hạnh Phúc Bấy Nhiêu + Bạn Đắt Giá Bao Nhiêu? + Không Tự Khinh Bỉ Không Tự Phí Hoài / BooksetMK (Bộ Sách Về Tu...', 'Combo Tuyệt Phẩm Của Tác Giả Văn Tình : Lấy Tình Thâm Mà Đổi Đầu Bạc + Khí Chất Bao Nhiêu, Hạnh Phúc Bấy Nhiêu + Bạn Đắt Giá Bao Nhiêu? + Không Tự Khinh Bỉ Không Tự Phí Hoài / BooksetMK (Bộ Sách Thay Đổi Tư Duy Không Chỉ Dành Cho Phái Đẹp)', 431320.0000, 1, 94, 'https://salt.tikicdn.com/cache/280x280/ts/product/b9/5a/af/1b9031652bb5ed97855b8554bf060020.jpg');
INSERT INTO "Products" VALUES (DEFAULT, 'Sách - Chữa Lành Đứa Trẻ Bên Trong Bạn', '       ( Tặng Postcard bốn mùa ngẫu nhiên )   Tác giả: Charles Whitfield   Ngày xuất bản: 03-2019   Kích thước: 15 x 23 cm   Loại bìa: Bìa mềm   Số trang: 249   ...', 'Sách - Chữa Lành Đứa Trẻ Bên Trong Bạn', 97290.0000, 1, 40, 'https://salt.tikicdn.com/cache/280x280/ts/product/d3/6f/68/696abb1a54d875e41f0316a572a722cf.jpg');
INSERT INTO "Products" VALUES (DEFAULT, 'Sách Quẳng Gánh Lo Đi Và Vui Sống (Khổ Nhỏ) (Tái Bản 2021)', 'Bất kỳ ai đang sống đều sẽ có những lo lắng thường trực về học hành, công việc, những hoá đơn, chuyện nhà cửa,… Cuộc sống không dễ dàng giải thoát bạn khỏi căng thẳng, ngược lại, nếu quá lo lắng, bạn ...', 'Sách Quẳng Gánh Lo Đi Và Vui Sống (Khổ Nhỏ) (Tái Bản 2021)', 46000.0000, 1, 702, 'https://salt.tikicdn.com/cache/280x280/ts/product/e2/3c/f0/4c84c86db01195b50665f23495a971d9.jpg');
INSERT INTO "Products" VALUES (DEFAULT, 'Combo Sách Tony Buzan (Sức mạnh của trí tuệ tâm linh + Sức mạnh của trí tuệ sáng tạo + Sức mạnh của trí tuệ xã hội)', 'Theo nghiên cứu của Tony Buzan, Trí tuệ Tâm linh là dạng trí thông minh quan trọng nhất, có sức mạnh chuyển hóa cuộc đời, thay đổi xã hội, thế giới và tiến trình lịch sử. Thông qua cuốn sách lần này, ...', 'Combo Sách Tony Buzan (Sức mạnh của trí tuệ tâm linh + Sức mạnh của trí tuệ sáng tạo + Sức mạnh của trí tuệ xã hội)', 139000.0000, 1, 13, 'https://salt.tikicdn.com/cache/280x280/ts/product/06/94/c5/67ae3f48e22e84547e5b8c70ae092bad.png');
INSERT INTO "Products" VALUES (DEFAULT, 'Đừng Chạy Theo Số Đông - Cuốn Sách Bạn Cần Đọc Trước Khi Quá Muộn', 'Nếu tất cả mọi người ai cũng làm chủ doanh nghiệp, thì ai sẽ đi làm thuê?Tôi.Bởi lúc đó họ sẽ phải đấu giá để có được tôi.Nhưng điều này không bao giờ xảy ra. Bởi ngay từ trong trứng đến lúc mọc cá...', 'Đừng Chạy Theo Số Đông - Cuốn Sách Bạn Cần Đọc Trước Khi Quá Muộn', 129800.0000, 1, 13887, 'https://salt.tikicdn.com/cache/280x280/ts/product/95/c5/71/f260011660001af960c42d7d2f1c5dc1.jpg');

INSERT INTO "Products" VALUES (DEFAULT, 'Điện thoại AI Samsung Galaxy S24 Ultra 12GB/256GB, Camera 200MP Zoom 100x, S Pen- Vàng- Hàng Chính Hãng', 'Điện thoại Samsung Galaxy S24 Ultra 5G- Hàng chính hãng...', 'Điện thoại AI Samsung Galaxy S24 Ultra 12GB/256GB, Camera 200MP Zoom 100x, S Pen- Vàng- Hàng Chính Hãng', 33950000.0000, 2, 0, 'https://salt.tikicdn.com/cache/280x280/ts/product/c1/77/a8/81aeda13c278a2f63f5cd870fd5bbdf0.jpg');
INSERT INTO "Products" VALUES (DEFAULT, 'Điện thoại AI Samsung Galaxy S24 8GB/256GB, Camera 50MP, Màn hình 6.2"- Đen- Hàng Chính Hãng', 'Điện thoại Samsung Galaxy S24 5G - Hàng chính hãng ...', 'Điện thoại AI Samsung Galaxy S24 8GB/256GB, Camera 50MP, Màn hình 6.2"- Đen- Hàng Chính Hãng', 22950000.0000, 2, 0, 'https://salt.tikicdn.com/cache/280x280/ts/product/dd/42/2a/0fd4a1752fde36e4dd09b9a0f60f71b3.jpg');
INSERT INTO "Products" VALUES (DEFAULT, 'Điện thoại Xiaomi Redmi Note 12 Pro 4G (8GB/256GB) - Hàng chính hãng', 'Hãng Xiaomi đã tiếp tục cho ra mắt mẫu điện thoại mới của mình trong năm 2023 với tên gọi Xiaomi Redmi Note 12 Pro 4G (8GB/256GB) được định hình là dòng sản phẩm thuộc phân khúc tầm trung, sở hữu nhiề...', 'Điện thoại Xiaomi Redmi Note 12 Pro 4G (8GB/256GB) - Hàng chính hãng', 6890000.0000, 2, 17, 'https://salt.tikicdn.com/cache/280x280/ts/product/24/59/f4/03c863a1c506e64d22ef3da252144d9e.png');
INSERT INTO "Products" VALUES (DEFAULT, 'Điện thoại Samsung Galaxy Z Flip 5 - Hàng chính hãng', 'Màn hình ngoài Flex Window 3.4''''. Thiết kế nhỏ gọn vừa túi.Cùng gặp gỡ Flex Window 3.4 inch - màn hình ngoài đa năng được sinh ra để bạn thể hiện cá tính. Với bản lề Flex được tái thiết kế, giờ đây G...', 'Điện thoại Samsung Galaxy Z Flip 5 - Hàng chính hãng', 22590000.0000, 2, 21, 'https://salt.tikicdn.com/cache/280x280/media/catalog/producttmp/92/42/ef/b0102b7a6a08bdf6ef10f83cae970bab.jpg');
INSERT INTO "Products" VALUES (DEFAULT, 'Điện thoại Samsung Galaxy Z Fold 5 - Hàng chính hãng', 'Màn hình chính 7,6 Inch cực đạiThiết kế màn hình tuyệt mỹ mở ra một trải nghiệm xem mãn nhãn chưa từng có. Bản lề Flex được nâng cấp thiết kế, dễ dàng gập theo ý muốn. Mỏng hơn, dễ dàng cầm chắc Sams...', 'Điện thoại Samsung Galaxy Z Fold 5 - Hàng chính hãng', 36990000.0000, 2, 9, 'https://salt.tikicdn.com/cache/280x280/ts/product/cc/2c/95/74c8319f7c8efe4a4bd141e052f93aec.jpg');
INSERT INTO "Products" VALUES (DEFAULT, 'Điện thoại AI Samsung Galaxy S24+ 12GB/256GB, Camera 50MP, Màn hình 6.7"- Xám- Hàng Chính Hãng', 'Điện thoại Samsung Galaxy S24 Plus 5G - Hàng chính hãng...', 'Điện thoại AI Samsung Galaxy S24+ 12GB/256GB, Camera 50MP, Màn hình 6.7"- Xám- Hàng Chính Hãng', 26950000.0000, 2, 0, 'https://salt.tikicdn.com/cache/280x280/ts/product/5a/63/cb/636ff58d7fd87d1defc77a6642d62245.jpg');
INSERT INTO "Products" VALUES (DEFAULT, 'Điện Thoại TCL 40SE (4GB/128GB) - Hàng Chính Hãng', 'Điện thoại di động TCL 40 SE, trải nghiệm chất lượng tốt nhất trong tầm giáLà một thiết bị công nghệ được đánh giá cao của TCL hiện nay, trong mức giá hấp dẫn, TCL 40 SE đã đem đến nhiều cải tiến vượ...', 'Điện Thoại TCL 40SE (4GB/128GB) - Hàng Chính Hãng', 2590000.0000, 2, 4, 'https://salt.tikicdn.com/cache/280x280/ts/product/a9/76/c2/82f164b5128c7d9a1155d5552e17f6c1.png');
INSERT INTO "Products" VALUES (DEFAULT, 'Điện Thoại TCL 408 (4GB/128GB) - Hàng Chính Hãng', 'Điện thoại thông minh TCL 408 được phát hành vào ngày 5 tháng 1 năm 2023, để hướng đến phân khúc khách hàng bình dân. Nó được trang bị màn hình 6,6 inch, chipset Helio G25 Mighty Hyper Engine, RAM 4GB...', 'Điện Thoại TCL 408 (4GB/128GB) - Hàng Chính Hãng', 2250000.0000, 2, 9, 'https://salt.tikicdn.com/cache/280x280/media/catalog/producttmp/cf/f4/45/dd7c8448685e6f4bd90f75b993263670.png');
INSERT INTO "Products" VALUES (DEFAULT, 'Điện thoại Samsung Galaxy Z Flip 4 (8GB/128GB)', 'Nhỏ gọn trong lòng bàn tay của bạnSamsung Galaxy Z Flip4 sở hữu ngoại hình bắt trend với các cạnh được gia công phẳng một cách tinh tế. Ra mắt với 4 phiên bản màu sắc giúp người dùng có thêm nhiều sự...', 'Điện thoại Samsung Galaxy Z Flip 4 (8GB/128GB)', 22200000.0000, 2, 309, 'https://salt.tikicdn.com/cache/280x280/media/catalog/producttmp/a9/88/5a/dc9c34208b445bfa0bdf2fb6651d0330.png');

INSERT INTO "Products" VALUES (DEFAULT, 'Bộ quần áo thể thao nam FASVIN AB23570.HN chất vải mềm nhẹ co giãn thoải mái', '=> Bộ thể thao nam cộc tay Fasvin được chế tạo tại nhà máy của FASVIN với quy trình thu hóa nghiệm ngặt. Các sản phẩm đều được những người thợ lâu năm trong nghề làm ra một cách cẩn thận và chắc ch...', 'Bộ quần áo thể thao nam FASVIN AB23570.HN chất vải mềm nhẹ co giãn thoải mái', 429000.0000, 3, 6, 'https://salt.tikicdn.com/cache/280x280/ts/product/d7/4e/5e/0063467c52c031c3f743544eb6b1af47.jpg');
INSERT INTO "Products" VALUES (DEFAULT, 'Bộ quần áo thể thao nam FASVIN AT21455.HN chất vải mềm nhẹ co giãn thoải mái', '=> Bộ thể thao nam cộc tay Fasvin được chế tạo tại nhà máy của FASVIN với quy trình thu hóa nghiệm ngặt. Các sản phẩm đều được những người thợ lâu năm trong nghề làm ra một cách cẩn thận và chắc ch...', 'Bộ quần áo thể thao nam FASVIN AT21455.HN chất vải mềm nhẹ co giãn thoải mái', 319000.0000, 3, 1, 'https://salt.tikicdn.com/cache/280x280/ts/product/92/2c/96/c463bd67968f667d3db350317ebfc12f.jpg');
INSERT INTO "Products" VALUES (DEFAULT, 'Bộ quần áo nam Fasvin AT22505.HN chất vải thun mềm mát co giãn phù hợp thể thao hay mặc nhà', 'Bộ quần áo nam FASVIN AT22505.HN chất vải thun mềm mát co giãn phù hợp thể thao hay mặc nhà được chế tạo tại nhà máy của FASVIN với quy trình thu hóa nghiệm ngặt. Các sản phẩm đều được những người thợ...', 'Bộ quần áo nam Fasvin AT22505.HN chất vải thun mềm mát co giãn phù hợp thể thao hay mặc nhà', 199000.0000, 3, 14, 'https://salt.tikicdn.com/cache/280x280/ts/product/24/fe/af/cc40c51116fcc68b137412741eba08e9.jpg');
INSERT INTO "Products" VALUES (DEFAULT, 'Bộ quần áo thể thao nam Fasvin AT20290.HN chất vải mềm nhẹ co giãn thoải mái', '=> Bộ thể thao nam cộc tay Fasvin được chế tạo tại nhà máy của FASVIN với quy trình thu hóa nghiệm ngặt. Các sản phẩm đều được những người thợ lâu năm trong nghề làm ra một cách cẩn thận và chắc ch...', 'Bộ quần áo thể thao nam Fasvin AT20290.HN chất vải mềm nhẹ co giãn thoải mái', 169000.0000, 3, 2, 'https://salt.tikicdn.com/cache/280x280/ts/product/4c/5e/4c/88ff38339b5ac3ebf0a4b0d7a4c5e66a.jpg');
INSERT INTO "Products" VALUES (DEFAULT, 'Bộ Quần Áo Thể Thao Nam Kẻ Sọc Thời Trang Cao Cấp VICERO', 'Bộ Quần Áo Thể Thao Nam Kẻ Sọc Thời Trang Cao Cấp VICERO------------------------------------ THÔNG TIN CHI TIẾT Chất liệu: Cotton 100%Màu sắc: Xám trắng-Đen-Xanh than-Xám đậmThương hiệ...', 'Bộ Quần Áo Thể Thao Nam Kẻ Sọc Thời Trang Cao Cấp VICERO', 209000.0000, 3, 334, 'https://salt.tikicdn.com/cache/280x280/ts/product/20/38/99/0e217708fc72d56becccf08fdac0a0d8.jpg');
INSERT INTO "Products" VALUES (DEFAULT, 'Quần Áo Thể Thao, Sét Bộ Thể Thao Nam DINKBHAYS, Bộ Đồ Thể Thao Nam Chất Đẹp, Đồ bộ thể thao nam, set quần áo thể thao nam nữ mặc nhà Unisex tay ngắn phong cách Ulzzang, Set Bộ Quần Áo Thể Thao Nam Mùa hè Co Dãn, SÉT ĐỒ BỘ THỂ THAO MẶC NHÀ, đồ bộ mặc nhà ', '*Quần Áo Thể Thao, Sét Bộ Thể Thao Nam DINKBHAYS, Bộ Đồ Thể Thao Nam Chất Đẹp, Đồ bộ thể thao nam, set quần áo thể thao nam nữ mặc nhà Unisex tay ngắn phong cách Ulzzang, Set Bộ Quần Áo Thể Thao Nam M...', 'Quần Áo Thể Thao, Sét Bộ Thể Thao Nam DINKBHAYS, Bộ Đồ Thể Thao Nam Chất Đẹp, Đồ bộ thể thao nam, set quần áo thể thao nam nữ mặc nhà Unisex tay ngắn phong cách Ulzzang, Set Bộ Quần Áo Thể Thao Nam Mùa hè Co Dãn, SÉT ĐỒ BỘ THỂ THAO MẶC NHÀ, đồ bộ mặc nhà ', 99000.0000, 3, 137, 'https://salt.tikicdn.com/cache/280x280/ts/product/a5/22/37/f696b06a8f6027aefcaf55934ea098a3.jpg');
INSERT INTO "Products" VALUES (DEFAULT, 'Bộ Quần Áo Nam Thể Thao Cộc Tay Hoa Văn', 'Bộ Quần Áo Nam Thể Thao Cộc Tay Hoa Văn khỏe khoắn, năng động Thông tin chi tiết sản phẩm Bộ Quần Áo Nam Thể Thao Cộc Tay Hoa Văn- Kích thước: 2 size L,XL form từ 55 - 70kg mặc vừa- Chất liệu: chấ...', 'Bộ Quần Áo Nam Thể Thao Cộc Tay Hoa Văn', 109000.0000, 3, 268, 'https://salt.tikicdn.com/cache/280x280/ts/product/f1/f6/15/2aee870b81c410dc3f17be70787caead.jpg');
INSERT INTO "Products" VALUES (DEFAULT, 'Bộ Quần Áo Nam Dài Tay 5S FASHION (4 Màu), Chất Nỉ Cotton Dày Dặn, Phom Slimfit, Trơn Basic, Màu Sắc Dễ Mặc (BNI23400)', ' * ƯU ĐÃI KHI MUA TẠI 5S:- Click “Theo dõi” shop để nhận ngay VOUCHER giảm giá.- Nhận hàng đánh giá 5* kèm hình ảnh sản phẩm và video, nhắn tin cho 5S ngay để nhận QUÀ nhé!** Cảm ơn quý khác...', 'Bộ Quần Áo Nam Dài Tay 5S FASHION (4 Màu), Chất Nỉ Cotton Dày Dặn, Phom Slimfit, Trơn Basic, Màu Sắc Dễ Mặc (BNI23400)', 550000.0000, 3, 8, 'https://salt.tikicdn.com/cache/280x280/ts/product/69/7b/e0/c1321c01155a6c7f634238c86957e0a5.jpg');
INSERT INTO "Products" VALUES (DEFAULT, ' QUẦN ÁO THỂ THAO NAM    BỘ HÈ CHO NAM NỮ IN CHỮ FULUA ĐỒ CẶP ĐÔI 2020', '       mẫu mới QUẦN ÁO THỂ THAO NAM   Thông tin sảm phẩm    Bộ Đồ Thể Thao Nam ; Nan nữ đều mặc được    chất vải mè thể thao mềm mịn thoáng mát, form đẹp hình chụp sp thật tại Shop   + Chất li...', ' QUẦN ÁO THỂ THAO NAM    BỘ HÈ CHO NAM NỮ IN CHỮ FULUA ĐỒ CẶP ĐÔI 2020', 96000.0000, 3, 247, 'https://salt.tikicdn.com/cache/280x280/ts/product/e5/3e/08/58819ea7d03d498089bb8f0d79ad41fb.jpg');

INSERT INTO "Products" VALUES (DEFAULT, 'Laptop Giá Rẻ Dell Vostro V3591 i3 1005G1/8GB/256GB/Intel UHD Graphics/Win 10  Hàng Chính Hãng', 'Màn hình15.6 inch, 1920 x 1080 Pixels, 60 Hz, Anti-glare LED-backlitCPUIntel, Core i3, 1005G1RAMDDR4, 2666 MHzỔ cứngSSD 256 GBĐồ họaIntel UHD GraphicsHệ điều hànhWindows 10...', 'Laptop Giá Rẻ Dell Vostro V3591 i3 1005G1/8GB/256GB/Intel UHD Graphics/Win 10  Hàng Chính Hãng', 5690500.0000, 4, 0, 'https://salt.tikicdn.com/cache/280x280/ts/product/7a/a7/a3/a921b18fadd850b72c425352fef20f1b.png');
INSERT INTO "Products" VALUES (DEFAULT, 'DELL LATITUDE E3510 (I5-102104U/ RAM 16GB/ 256GB SSD NVME/ 15.6 INCH FULL HD) Hàng Chính Hãng', 'Ổ cứng256GB M2 NVMERam16GB DDR4CPUi5-102104UTốc độ CPU1.60GHzCard màn hìnhIntegrated Intel UHDĐĩa quangKo cóCổng kết nốiBluetooth : Bluetooth 5.0 HDMI : (1x) HDMI 1.4 Outpu...', 'DELL LATITUDE E3510 (I5-102104U/ RAM 16GB/ 256GB SSD NVME/ 15.6 INCH FULL HD) Hàng Chính Hãng', 7742500.0000, 4, 0, 'https://salt.tikicdn.com/cache/280x280/ts/product/e1/37/82/71029b2714d170637fa91f08e1a1f3d3.jpg');
INSERT INTO "Products" VALUES (DEFAULT, 'Laptop Acer Aspire A315 58 35AG i3 1115G4/4GB/256GB/15.6"F/Win11/(NX.ADDSV.00B)/Bạc - Hàng chính hãng', 'Laptop Acer Aspire A315 58 35AG i3 1115G4 là chiếc laptop laptop học tập - văn phòng sở hữu CPU gen 11 tiên tiến đến từ nhà Intel, đáp ứng tốt các nhu cầu cơ bản trên Office cũng như giải trí, lướt we...', 'Laptop Acer Aspire A315 58 35AG i3 1115G4/4GB/256GB/15.6"F/Win11/(NX.ADDSV.00B)/Bạc - Hàng chính hãng', 10700000.0000, 4, 21, 'https://salt.tikicdn.com/cache/280x280/ts/product/42/a0/7f/144ba2cc58259b73e5fb8260d7cf9d11.jpg');
INSERT INTO "Products" VALUES (DEFAULT, 'Laptop Lenovo V14 G2 ITL 82KA00WGVN | Core i5 1135G7 | 8GB | 256GB | 14" FHD | Dos | Hàng Chính hãng', 'CPU11th Generation Intel Tiger Lake Core i5 _ 1135G7 Processor (2.40 GHz, 8M Cache, Up to 4.20 GHz)Memory8GB Soldered DDR4-3200 (8GB Onboard, Free 1 Slot)Hard Disk256GB PCIe NVMe M.2 SSDVGAInte...', 'Laptop Lenovo V14 G2 ITL 82KA00WGVN | Core i5 1135G7 | 8GB | 256GB | 14" FHD | Dos | Hàng Chính hãng', 11150000.0000, 4, 6, 'https://salt.tikicdn.com/cache/280x280/ts/product/2b/5f/9e/9af64241a953d596cb3ae7d71f9ebb0e.jpg');
INSERT INTO "Products" VALUES (DEFAULT, 'Laptop HP 15s-fq2712TU 7C0X2PA (Core i3 1115G4/ 8GB/ 256GB SSD/ Intel UHD Graphics/ 15.6inch Full HD/ Windows 11 Home/ Bạc/ Vỏ nhựa) - Hàng Chính Hãng', 'Hãng sản xuất Laptop HPTên sản phẩmHP 15s-fq2712TU 7C0X2PANhóm sản phẩmLaptop văn phòng, Laptop sinh viêBộ vi xử lý Bộ vi xử lýIntel Core i3-1115G4 Tốc độupto 4.10 GHz, ...', 'Laptop HP 15s-fq2712TU 7C0X2PA (Core i3 1115G4/ 8GB/ 256GB SSD/ Intel UHD Graphics/ 15.6inch Full HD/ Windows 11 Home/ Bạc/ Vỏ nhựa) - Hàng Chính Hãng', 11680000.0000, 4, 4, 'https://salt.tikicdn.com/cache/280x280/ts/product/ed/00/ca/11457ca1bbca34ac81cf826e4899a017.png');
INSERT INTO "Products" VALUES (DEFAULT, 'Laptop Dell Latitude 3590  Core i5 7200U- Ram 8GB- 128GB SSD Ổ cứng -Màn hình 15-6 inch BH 6 thang - Hàng chính hãng', 'THÔNG SỐ KỸ THUẬTCPUIntel Core i5-7200URAM8 GB RAM DDR4 2400MHzĐộ Phân Giải1920×1080Màn Hình15.6 inchVGAsearch Intel HD Graphics 620Ổ CứngSSD 256GB /  ssd 128gbXuất xứNhậtPIN/Battery5 cell...', 'Laptop Dell Latitude 3590  Core i5 7200U- Ram 8GB- 128GB SSD Ổ cứng -Màn hình 15-6 inch BH 6 thang - Hàng chính hãng', 6048000.0000, 4, 5, 'https://salt.tikicdn.com/cache/280x280/ts/product/88/ff/11/8d0d4cff064fb5214b69c446554c5050.png');
INSERT INTO "Products" VALUES (DEFAULT, 'Laptop HP 14s fq1080AU R3 5300U/4GB/256GB/Win10 (4K0Z7PA) - Hàng chính hãng', 'HP 14s fq1080AU R3 (4K0Z7PA) là dòng laptop HP cơ bản đáp ứng những nhu cầu đơn giản hằng ngày cho người dùng với thiết kế gọn gàng và cấu hình ổn định.Ngoại hình trang nhã, mang tính di động caoĐượ...', 'Laptop HP 14s fq1080AU R3 5300U/4GB/256GB/Win10 (4K0Z7PA) - Hàng chính hãng', 8520000.0000, 4, 1, 'https://salt.tikicdn.com/cache/280x280/ts/product/f3/8b/b5/52640f81b197a2e829b57442c718ced4.png');
INSERT INTO "Products" VALUES (DEFAULT, 'Laptop Dell Vostro 3530 (V3530-i7U085W11GRD2) |Core i7 _ 1355U | 8GB | 512GB SSD PCIe |MX550 2GB| 15.6 inch Full HD 120Hz | Win 11 _ OFFICE 2021| Hàng Chính Hãng', 'Laptop Dell Vostro 3530 i7 (V3530-i7U085W11GRD2) là một sản phẩm cao cấp của Dell, được trang bị nhiều tính năng ấn tượng. Với hệ điều hành Windows 11 Home và Microsoft Office Home and Student 2021, b...', 'Laptop Dell Vostro 3530 (V3530-i7U085W11GRD2) |Core i7 _ 1355U | 8GB | 512GB SSD PCIe |MX550 2GB| 15.6 inch Full HD 120Hz | Win 11 _ OFFICE 2021| Hàng Chính Hãng', 22990000.0000, 4, 1, 'https://salt.tikicdn.com/cache/280x280/ts/product/14/a9/46/091f0cebeea5c32e44a7b573b6d1f18f.jpg');
INSERT INTO "Products" VALUES (DEFAULT, 'Laptop HP ProBook 450 G9 (6M0Z8PA) (i7-1255U | 8GB | 512GB | Intel Iris Xe Graphics | 15.6'' FHD | Win 11) Hàng chính hãng', 'THÔNG TIN SẢN PHẨMThông số HP ProBook 450 G9 (6M0Z8PA)• CPU Intel Core i7-1255U 1.7GHz up to 4.7GHz 12MB• RAM 8GB (8x1) DDR4 3200MHz (2x SO-DIMM socket, up to 32GB SDRAM)• Ổ cứng 512 GB PCIe NVMe ...', 'Laptop HP ProBook 450 G9 (6M0Z8PA) (i7-1255U | 8GB | 512GB | Intel Iris Xe Graphics | 15.6'' FHD | Win 11) Hàng chính hãng', 25590000.0000, 4, 1, 'https://salt.tikicdn.com/cache/280x280/ts/product/3e/f0/21/ae9b1a135805c91d8dfeb10e468ae9fb.jpg');

INSERT INTO "Products" VALUES (DEFAULT, 'Máy Ảnh Canon Powershot G7X Mark II – Đen – Hàng Chính Hãng', 'Thiết kế nhỏ gọnMáy Ảnh Canon Powershot G7X Mark II là dòng máy ảnh du lịch với thiết kế vô cùng nhỏ gọn, có thể nằm gọn trong lòng bàn tay, cho phép bạn bỏ vào túi trong những lúc di chuyển. Chiếc m...', 'Máy Ảnh Canon Powershot G7X Mark II – Đen – Hàng Chính Hãng', 14290000.0000, 5, 285, 'https://salt.tikicdn.com/cache/280x280/media/catalog/producttmp/45/43/15/7d2691f9a486846634da6fba483e0dea.jpg');
INSERT INTO "Products" VALUES (DEFAULT, 'Máy Ảnh Canon EOS 3000D + Lens EF-S 18 - 55mm III - Hàng Chính hãng', 'Mang đến trải nghiệm tinh túy cho người mới bắt đầuMáy ảnh Canon EOS 3000D được sản xuất nhằm hướng đến đối tượng người dùng mới tiếp cận DSLR, bên cạnh một mức giá vừa phải cùng nhiều điểm thiết kế...', 'Máy Ảnh Canon EOS 3000D + Lens EF-S 18 - 55mm III - Hàng Chính hãng', 12480000.0000, 5, 501, 'https://salt.tikicdn.com/cache/280x280/ts/product/2f/d8/6e/4e20005bc3c5c646ac2daf0ad7dddc2b.jpg');
INSERT INTO "Products" VALUES (DEFAULT, 'Máy Ảnh Canon EOS 3000D + Lens EF-S 18 - 55mm III - Hàng Chính Hãng (Tặng Kèm Thẻ Nhờ Và Túi Đựng Máy Ảnh)', 'Mang đến trải nghiệm tinh túy cho người mới bắt đầuMáy ảnh Canon EOS 3000D được sản xuất nhằm hướng đến đối tượng người dùng mới tiếp cận DSLR, bên cạnh một mức giá vừa phải cùng nhiều điểm thiết kế...', 'Máy Ảnh Canon EOS 3000D + Lens EF-S 18 - 55mm III - Hàng Chính Hãng (Tặng Kèm Thẻ Nhờ Và Túi Đựng Máy Ảnh)', 13490000.0000, 5, 14, 'https://salt.tikicdn.com/cache/280x280/ts/product/9e/0f/e0/c0a732874a13d8795587d50f96de6259.jpg');
INSERT INTO "Products" VALUES (DEFAULT, 'Máy In Ảnh Canon SELPHY CP1300 Wifi', 'Thiết kế hiện đại và dễ sử dụng, giao diện người dùng thân thiện.Máy in ảnh Canon Selphy CP1300 sẽ là người bạn đồng hành tuyệt vời của bạn trong những kỳ nghỉ cùng gia đình, tiệc tùng hoặc các cuộc ...', 'Máy In Ảnh Canon SELPHY CP1300 Wifi', 3390000.0000, 5, 623, 'https://salt.tikicdn.com/cache/280x280/ts/product/d9/d5/ab/c8ea1f58b1d4b802f334dda4b5ab7a29.jpg');
INSERT INTO "Products" VALUES (DEFAULT, 'Máy Ảnh Canon Powershot G7X Mark II - Đen (Tặng Kèm Thẻ Nhớ Và Túi Đựng Máy Ảnh) - Hàng Chính Hãng', 'Thiết kế nhỏ gọnMáy Ảnh Canon Powershot G7X Mark II là dòng máy ảnh du lịch với thiết kế vô cùng nhỏ gọn, có thể nằm gọn trong lòng bàn tay, cho phép bạn bỏ vào túi trong những lúc di chuyển. Chiếc m...', 'Máy Ảnh Canon Powershot G7X Mark II - Đen (Tặng Kèm Thẻ Nhớ Và Túi Đựng Máy Ảnh) - Hàng Chính Hãng', 14490000.0000, 5, 1, 'https://salt.tikicdn.com/cache/280x280/ts/product/aa/e1/d2/722fdfff8dd63378a5498fa471b659a2.jpg');
INSERT INTO "Products" VALUES (DEFAULT, 'Máy In Ảnh Đa năng Canon MG3670', 'Thiết kế tối ưu, tích hợp nhiều chức năngMáy In Ảnh Đa năng Canon MG3670 với thiết kế tối ưu, tích hợp nhiều chức năng: in, scan, copy trong cùng 1 máy in, giúp cho người dùng sử dụng linh hoạt, đáp...', 'Máy In Ảnh Đa năng Canon MG3670', 2800000.0000, 5, 12, 'https://salt.tikicdn.com/cache/280x280/ts/product/14/61/15/8d145ac423aedbb84e878f6090da5ac8.jpg');
INSERT INTO "Products" VALUES (DEFAULT, 'Máy Scan Canon Lide 400 - Hàng Chính Hãng', 'Máy Scan Canon Lide 400 - Hàng Chính Hãng hỗ trợ giao diện kết nối mới nhất USB Type-C cho phép gắn vào dễ dàng ở bất kỳ hướng nào. Máy quét sử dụng điện và truyền tải dữ liệu thông qua một đường dây ...', 'Máy Scan Canon Lide 400 - Hàng Chính Hãng', 2680000.0000, 5, 257, 'https://salt.tikicdn.com/cache/280x280/media/catalog/producttmp/0e/b4/ce/933397ce1ad1ccff8af981f33fb4f348.jpg');
INSERT INTO "Products" VALUES (DEFAULT, 'Máy in 4 màu đa chức năng Canon Pixma G3020 - Hàng chính hãng', 'PIXMA G3020Máy in phun đa chức năng tiếp mực liên tục có Kết nối không dây với công suất in lớnThiết kế để in ấn khối lượng lớn, máy in đa năng 3-trong-1 có kết nối không dây kết hợp chi phí hợp l...', 'Máy in 4 màu đa chức năng Canon Pixma G3020 - Hàng chính hãng', 6828000.0000, 5, 4, 'https://salt.tikicdn.com/cache/280x280/ts/product/bb/68/da/cfa1d6489aaef11e2429ae066eef4dc1.png');
INSERT INTO "Products" VALUES (DEFAULT, 'Máy In Laser Đơn Năng Canon LBP 2900 - Hàng chính hãng', 'Tốc độ in cực nhanhVới Máy In Laser Đơn Năng Canon LBP 2900, bạn sẽ không phải tốn quá nhiều thời gian cho việc in ấn. Bạn sẽ có ngay bản in đầu tiên chỉ sau 9.3 giây mà vẫn đảm bảo chất lượng ổn địn...', 'Máy In Laser Đơn Năng Canon LBP 2900 - Hàng chính hãng', 3790000.0000, 5, 4759, 'https://salt.tikicdn.com/cache/280x280/ts/product/71/8d/3e/e46fa3004f3eaf3411247a4ca51aa0ac.png');

INSERT INTO "Products" VALUES (DEFAULT, 'Kệ Đựng Mỹ Phẩm Đồ Trang Điểm Trang Sức 4 Tầng Ngăn Kéo Tiện Dụng', '- Kệ Đựng Mỹ Phẩm Đồ Trang Điểm Trang Sức 4 Tầng Ngăn Kéo Tiện Dụng là sản phẩm không những tiện dụng mà còn làm đẹp thêm không gian phòng ngủ đặc biệt là bàn trang điểm của bạn.- Thiết kế vô cùng ti...', 'Kệ Đựng Mỹ Phẩm Đồ Trang Điểm Trang Sức 4 Tầng Ngăn Kéo Tiện Dụng', 66000.0000, 6, 44, 'https://salt.tikicdn.com/cache/280x280/ts/product/79/fa/d4/b507bd7b22e42b481035d40cdae89cf2.jpg');
INSERT INTO "Products" VALUES (DEFAULT, 'Hộp Đựng Trang Sức Bọc Da Hai Tầng Có Khóa - Hộp Đựng Nữ Trang Cao Cấp', 'Hộp Đựng Trang Sức Phụ Kiện Bọc Da Hai Tầng Có Khóa - Hộp Đựng Nữ Trang Cao CấpThông tin kỹ thuật+ Chất liệu: Bên ngoài - Da PU, bên trong - Nhung+ Hộp bọc da PU sang trọng, lịch lãm, kiểu dáng cla...', 'Hộp Đựng Trang Sức Bọc Da Hai Tầng Có Khóa - Hộp Đựng Nữ Trang Cao Cấp', 280250.0000, 6, 40, 'https://salt.tikicdn.com/cache/280x280/ts/product/7b/86/e6/41337d931244626259425906635be2c0.jpg');
INSERT INTO "Products" VALUES (DEFAULT, 'Bộ trang sức Ngọc Trai Thiên Nhiên T4 Mix Bảo Ngọc Jewelry  (Freesize) ', '- Bạc S925 Italy Cao Cấp- Ngọc Trai Nuôi Cấy Nước Ngọt Tự Nhiên- Kích Thước Hạt Ngọc: 6 - 7 Ly- Chiều dài : dây 45cm( chưa gồm mặt dây) , lắc tay có thể mix theo ý tùy chỉnh- Kích thước: Nhẫn free...', 'Bộ trang sức Ngọc Trai Thiên Nhiên T4 Mix Bảo Ngọc Jewelry  (Freesize) ', 1950000.0000, 6, 18, 'https://salt.tikicdn.com/cache/280x280/ts/product/1a/8e/9e/d235c9f1f0a7c6e58760857f42e301f4.jpg');
INSERT INTO "Products" VALUES (DEFAULT, 'Hộp Đựng Trang Sức Nữ Trang Cỡ Lớn Da Cao Cấp', 'Hộp Đựng Trang Sức Nữ Trang Cỡ Lớn Da Cao CấpGiải pháp cho các nàng có nhiều nữ trang nhưng không biết để đâu cho hết. Hộp Đựng Trang Sức Nữ Trang Cỡ Lớn Da Cao Cấp sẽ là hộp đựng trang sức du...', 'Hộp Đựng Trang Sức Nữ Trang Cỡ Lớn Da Cao Cấp', 142500.0000, 6, 107, 'https://salt.tikicdn.com/cache/280x280/ts/product/95/5b/1c/4c148bdddcd75388924d7eefb29a577c.jpg');
INSERT INTO "Products" VALUES (DEFAULT, 'Kệ Đựng Mỹ Phẩm Đồ Trang Điểm Trang Sức 4 Tầng Ngăn Kéo Tiện Dụng', 'Tên sản phẩm: Kệ Mỹ Phẩm 4 Tầng Ngăn KéoChất liệu: Nhựa PP cao cấpKích thước: 24 x 17 x 27cm (Dài x Sâu x Cao )Màu sắc: Màu Trắng, Màu Hồng PhấnĐặc điểm sản phẩmKệ mỹ phẩm 4 tầng có thiết kế đ...', 'Kệ Đựng Mỹ Phẩm Đồ Trang Điểm Trang Sức 4 Tầng Ngăn Kéo Tiện Dụng', 115000.0000, 6, 0, 'https://salt.tikicdn.com/cache/280x280/ts/product/a7/8f/19/286966a4ee7bc1641a67b30a2109841b.jpg');
INSERT INTO "Products" VALUES (DEFAULT, 'Kệ Đựng Mỹ Phẩm Đồ Trang Điểm Trang Sức 4 Tầng Ngăn Kéo', '- Kệ Đựng Mỹ Phẩm Đồ Trang Điểm Trang Sức 4 Tầng Ngăn Kéo Tiện Dụng là sản phẩm không những tiện dụng mà còn làm đẹp thêm không gian phòng ngủ đặc biệt là bàn trang điểm của bạn.- Thiết kế vô cùng ti...', 'Kệ Đựng Mỹ Phẩm Đồ Trang Điểm Trang Sức 4 Tầng Ngăn Kéo', 190000.0000, 6, 77, 'https://salt.tikicdn.com/cache/280x280/ts/product/79/fa/d4/b507bd7b22e42b481035d40cdae89cf2.jpg');
INSERT INTO "Products" VALUES (DEFAULT, 'Kệ Đựng Mỹ Phẩm Đồ Trang Điểm Trang Sức 4 Tầng Ngăn Kéo Tiện Dụng', '- Kệ Đựng Mỹ Phẩm Đồ Trang Điểm Trang Sức 4 Tầng Ngăn Kéo Tiện Dụng là sản phẩm không những tiện dụng mà còn làm đẹp thêm không gian phòng ngủ đặc biệt là bàn trang điểm của bạn.- Thiết kế vô cùng ti...', 'Kệ Đựng Mỹ Phẩm Đồ Trang Điểm Trang Sức 4 Tầng Ngăn Kéo Tiện Dụng', 156000.0000, 6, 108, 'https://salt.tikicdn.com/cache/280x280/ts/product/79/fa/d4/b507bd7b22e42b481035d40cdae89cf2.jpg');
INSERT INTO "Products" VALUES (DEFAULT, 'Hộp đựng đồ trang sức, tăm bông, đựng son đa năng, chất liệu mica', 'Hộp đựng đồ đa năng có nắpVới công dụng đa năng vừa tô điểm cho góc trang điểm, khay hộp đựng cọ có nắp đậy chống bụi bẩn....', 'Hộp đựng đồ trang sức, tăm bông, đựng son đa năng, chất liệu mica', 75050.0000, 6, 6, 'https://salt.tikicdn.com/cache/280x280/ts/product/0f/ce/e2/e78a7b1a767166a0ee88ddd0d117b139.png');
INSERT INTO "Products" VALUES (DEFAULT, 'Hộp đựng cọ trang điểm, hộp đựng đồ trang sức trong suốt kèm hạt +Tặng kèm dây cột tóc - Hộp đựng cọ trang điểm có nắp hình lục giác 12x22 cm-Hộp đựng cọ trang điểm có nắp đậy kèm hạt ngọc trai', 'Hộp đựng cọ trang điểm có nắp đậy kèm hạt trang trí hình lục giác được thiết kế dạng vuông đứng chắc chắn, kèm các hạt tạo sự sang trọng quý phái cho bàn trang điểm.Chất liệu nhựa acrylic cao cấp tr...', 'Hộp đựng cọ trang điểm, hộp đựng đồ trang sức trong suốt kèm hạt +Tặng kèm dây cột tóc - Hộp đựng cọ trang điểm có nắp hình lục giác 12x22 cm-Hộp đựng cọ trang điểm có nắp đậy kèm hạt ngọc trai', 170050.0000, 6, 42, 'https://salt.tikicdn.com/cache/280x280/ts/product/8b/79/28/e070406b48f25cae931f5478e5e15b49.png');
INSERT INTO "Products" VALUES (DEFAULT, 'Hộp Tròn Đựng Trang Sức 2 Tầng Có Gương Sang Trọng, Chất Da PU Mềm Mại, Độ Bền Cao', 'Hộp tròn đựng trang sức 2 tầng có gương.Phần bọc bền ngoài hộp là da PU mềm mại, dễ lau chùi và bảo quản, có độ bền cao hơn da thường. Phần bền trong là lớp lót bằng nhung dày, êm, chống sốc.Kích ...', 'Hộp Tròn Đựng Trang Sức 2 Tầng Có Gương Sang Trọng, Chất Da PU Mềm Mại, Độ Bền Cao', 254000.0000, 6, 2, 'https://salt.tikicdn.com/cache/280x280/ts/product/3c/6b/26/caa127d68651528b430850ac2248708b.jpg');
INSERT INTO "Products" VALUES (DEFAULT, 'Kệ mỹ phẩm để bàn tủ đựng đồ trang điểm đồ trang sức hộp đựng mỹ phẩm bằng gỗ nhựa composite kèm gương trang điểm cao cấp KMP5 - Tặng kèm băng đô trang điểm thời trang bằng lụa màu ngẫu nhiên', 'Phụ liệu tóc, kem dưỡng da, nước hoa, mỹ phẩm, đồng hồ, trang sức, phụ kiệất cả đều được lên kệ vào ngăn cho không gian làm đẹp của chị em trông thật gọn gàng và sang trọng !Gương trang điểm cho hìn...', 'Kệ mỹ phẩm để bàn tủ đựng đồ trang điểm đồ trang sức hộp đựng mỹ phẩm bằng gỗ nhựa composite kèm gương trang điểm cao cấp KMP5 - Tặng kèm băng đô trang điểm thời trang bằng lụa màu ngẫu nhiên', 235000.0000, 6, 107, 'https://salt.tikicdn.com/cache/280x280/ts/product/4e/c2/f8/a23a2f1f8524163a0ab4c7ab5cff67db.jpg');
INSERT INTO "Products" VALUES (DEFAULT, 'Kệ đựng mỹ phẩm, để đồ trang điểm, đồ trang sức, kệ gỗ để bàn kèm gương trang điểm cao cấp - Tặng kèm móc khóa khung hình thời trang', 'Kệ đựng mỹ phẩm, để đồ trang điểm, đồ trang sức, kệ gỗ để bàn kèm gương trang điểm cao cấp - Tặng kèm móc khóa khung hình sang trọng...', 'Kệ đựng mỹ phẩm, để đồ trang điểm, đồ trang sức, kệ gỗ để bàn kèm gương trang điểm cao cấp - Tặng kèm móc khóa khung hình thời trang', 125000.0000, 6, 5, 'https://salt.tikicdn.com/cache/280x280/ts/product/c8/18/7f/3bfe9dd7524e1e7d47ec7f7f5b4dea14.jpg');
INSERT INTO "Products" VALUES (DEFAULT, 'Hộp đựng đồ nắp rời Doday xuất Hàn', 'Hộp đựng đồ đa năng, sử dụng để đựng quần áo, sách vở, chăn màn, đồ dùng cá nhân vvCHI TIẾT SẢN PHẨMChất liệu: vải không dệt + bìa giấyMàu sắc: beige sáng, nâuKích thước : Dài 45cm x Rộng 33cm x Cao...', 'Hộp đựng đồ nắp rời Doday xuất Hàn', 128200.0000, 6, 67, 'https://salt.tikicdn.com/cache/280x280/ts/product/e9/37/35/21cff7d610284ad10304b457dc134cf4.png');
INSERT INTO "Products" VALUES (DEFAULT, 'Thùng đựng đồ đa năng kiếm ghế ngồi gấp gọn 110L cỡ đại Châu Âu CA05 - Thùng gỗ bọc vải Oxford cao cấp chắc chắn có thể làm ghế ngồi, trang trí nhà cửa D Danido', 'Thùng đựng đồ đa năng kiêm ghế ngồi gấp gọnXuất khẩu Châu Âu CA05 Thùng gỗ bọc vải Oxford cao cấp chắc chắn có thể làm ghế ngồiChính hãng D DanidoKích thước size L = 39 x 40 x 40cm = 62 LitSize X...', 'Thùng đựng đồ đa năng kiếm ghế ngồi gấp gọn 110L cỡ đại Châu Âu CA05 - Thùng gỗ bọc vải Oxford cao cấp chắc chắn có thể làm ghế ngồi, trang trí nhà cửa D Danido', 268000.0000, 6, 46, 'https://salt.tikicdn.com/cache/280x280/ts/product/30/c8/d6/de23312a3b76e9cdf8563a00abf725fd.jpg');
INSERT INTO "Products" VALUES (DEFAULT, 'Hộp Đựng Trang Sức Mini Hình Tròn Cực Xinh', 'Kệ đựng phụ kiện trang sức có gươngThiết kế tinh tế sang trọng bắt mắtChất Liệu: nhựa cao cấpKích thước: 11x12.5x12.5Cộng dụng: giúp trang sức của bạn trở nên ngăn nắp và gọn gàng hơà dể tìm kiếm....', 'Hộp Đựng Trang Sức Mini Hình Tròn Cực Xinh', 129000.0000, 6, 1, 'https://salt.tikicdn.com/cache/280x280/ts/product/c3/d3/b7/6f7f2205a07e23d928fa4eb6ffde9b38.png');
INSERT INTO "Products" VALUES (DEFAULT, 'Combo 2 hộp chia ngăn sắp xếp quần áo Mai Anh House - hộp đựng đồ chất liệu cao cấp, phong cách Nhật Bản sang trọng', 'Combo 2 hộp chia ngăn sắp xếp quần áo Mai Anh House - hộp đựng đồ chất liệu cao cấp, phong cách Nhật Bản sang trọngKích thước: 38x25x20cmChất liệu: Vải không dệt cao cấp dày 80gsm, khung làm bằng gi...', 'Combo 2 hộp chia ngăn sắp xếp quần áo Mai Anh House - hộp đựng đồ chất liệu cao cấp, phong cách Nhật Bản sang trọng', 194700.0000, 6, 289, 'https://salt.tikicdn.com/cache/280x280/ts/product/67/97/b3/f943c1528e194b65faf556966de79ea0.jpg');
INSERT INTO "Products" VALUES (DEFAULT, 'Kệ đựng đồ trang sức nhiều tầng/ kệ đựng mỹ phẩm mẫu mới dáng bo tròn', 'Kệ Đựng Đồ Trang Điểm Bo Góc – Makeup 2 Tầng Size L– Thiết kế thông minh; đẹp; sang trọng– Vật liệu nhựa cao cấp; an toàn; siêu bền– với 3 tầng 2 ngăn kéo tiện dụng– Chất liệu: Nhựa cao cấp– Kích thư...', 'Kệ đựng đồ trang sức nhiều tầng/ kệ đựng mỹ phẩm mẫu mới dáng bo tròn', 64500.0000, 6, 69, 'https://salt.tikicdn.com/cache/280x280/ts/product/8b/05/a6/949ace9b0a1290b3fa88b673cdf96b75.jpg');
INSERT INTO "Products" VALUES (DEFAULT, 'Hộp Đựng Đồ Trang Sức Bằng Da pu', 'Công dụng:Đựng trang sức như nhẫn, lắc, dây chuyền, vòng tay, đồng hồƯu điểm:- Thiết kế sang trọng, tô điểm thêm bàn trang điểm của bạn- Hộp chia làm nhiều tầng, nhiều ngăn, thuận tiện việc sắp xếp...', 'Hộp Đựng Đồ Trang Sức Bằng Da pu', 265000.0000, 6, 62, 'https://salt.tikicdn.com/cache/280x280/ts/product/01/76/88/0db2b6acf55aae6b5c9cd1e805f58b8e.jpg');
INSERT INTO "Products" VALUES (DEFAULT, 'Hộp đựng đồ trang sức nhung lớn 2 ngăn cao cấp', 'Thông tin sản phẩm Tên Sản Phẩm : Hộp đựng đồ trang sức nhung lớn cao cấp 2 ngăn tiện dụng - Hộp có 02 ngăn chính rộng rãi giúp bạn sắp xếp, bảo quản vật dụng một cách hợp lý, gọn gàng. - Thiết kế đặ...', 'Hộp đựng đồ trang sức nhung lớn 2 ngăn cao cấp', 220000.0000, 6, 33, 'https://salt.tikicdn.com/cache/280x280/ts/product/44/6a/c7/55d421515fd9489d02a3d223be78e699.jpg');
INSERT INTO "Products" VALUES (DEFAULT, 'Kệ Đựng Mỹ Phẩm Đồ- Kệ Trang Điểm- Kệ Trang Sức 4 Tầng Ngăn Kéo Tiện Dụng- Kệ mini', 'Tên sản phẩm: Kệ Đựng Mỹ Phẩm Đồ- Kệ Trang Điểm- Kệ Trang Sức 4 Tầng Ngăn Kéo Tiện Dụng Kích thước sản phẩm: W 23 x H 27 x R 17 cm ( Dài x Sâu x Cao ) Kích thước hộp: 29 x 18.5 x 22 cm .Chất liệu:...', 'Kệ Đựng Mỹ Phẩm Đồ- Kệ Trang Điểm- Kệ Trang Sức 4 Tầng Ngăn Kéo Tiện Dụng- Kệ mini', 130000.0000, 6, 23, 'https://salt.tikicdn.com/cache/280x280/ts/product/67/09/c5/18a48c515568272964f9b5c2240cc46e.jpg');
INSERT INTO "Products" VALUES (DEFAULT, '[COMBO 2 HỘP] Hộp đựng đồ trang sức bằng nhựa chia 10 ngăn tiện dụng', 'Sản phẩm : hộp đựng trang sức.Chất liệu : nhựa.Thiết kế : 10 ngăn.Kích thước : 13cm * 7cm * 2cm.Trọng lượng : 100g....', '[COMBO 2 HỘP] Hộp đựng đồ trang sức bằng nhựa chia 10 ngăn tiện dụng', 14900.0000, 6, 28, 'https://salt.tikicdn.com/cache/280x280/ts/product/a9/d5/81/605b9f2aa0945c9c2af4024f284a5f00.png');
INSERT INTO "Products" VALUES (DEFAULT, 'Kệ đựng mỹ phẩm tủ mỹ phẩm kệ đựng đồ trang điểm trang sức KM96 bằng gỗ nhiều màu SANG TRỌNG', 'Phụ liệu tóc, kem dưỡng da, nước hoa, mỹ phẩm, đồng hồ, trang sức, phụ kiện tất cả đều được lên kệ vào ngăn cho không gian làm đẹp của chị em trông thật gọn gàng và sang trọng !Gương trang điểm cho h...', 'Kệ đựng mỹ phẩm tủ mỹ phẩm kệ đựng đồ trang điểm trang sức KM96 bằng gỗ nhiều màu SANG TRỌNG', 305000.0000, 6, 13, 'https://salt.tikicdn.com/cache/280x280/ts/product/e0/90/5b/56a441d04059405aab9346044a2b5091.jpg');
INSERT INTO "Products" VALUES (DEFAULT, 'Hộp đựng đồ trang sức nhung lớn 2 tầng', 'Thông tin sản phẩmTên Sản Phẩm : Hộp đựng đồ trang sức nhung lớn cao cấp 2 ngăn tiện dụng - Hộp có 02 ngăn chính rộng rãi giúp bạn sắp xếp, bảo quản vật dụng một cách hợp lý, gọn gàng. - Thiết kế đặc...', 'Hộp đựng đồ trang sức nhung lớn 2 tầng', 210000.0000, 6, 12, 'https://salt.tikicdn.com/cache/280x280/ts/product/29/94/7b/a38b4624c6626d8275556f2153fd5837.jpg');
INSERT INTO "Products" VALUES (DEFAULT, ' Hộp đựng đồ trang sức bông Tai Cao Cấp Tặng kèm dao cạo lông mày hàn quốc tiện lợi', 'Là phụ nữ, phụ kiện như nhẫn, vòng tay, hoa tai  là không thể thiếu chiếc hộp đựng trang sức để bảo quản các món đồ xinh xinh không bị thất lạc Thiết kế trẻ trung, năng độngMàu sắc trang nhã, hợp th...', ' Hộp đựng đồ trang sức bông Tai Cao Cấp Tặng kèm dao cạo lông mày hàn quốc tiện lợi', 217000.0000, 6, 11, 'https://salt.tikicdn.com/cache/280x280/ts/product/85/0a/3e/fe679a8baf5e17cdf3e3c85e5719dcd2.jpg');
INSERT INTO "Products" VALUES (DEFAULT, 'Khay hộp đựng đồ lưu trữ để bàn sang trọng - Khay đựng mỹ phẩm đồ trang điểm trong suốt cao cấp giả Pha Lê', ' -Khay đựng mỹ phẩm đồ trang điểm trong suốt cao cấp giả Pha Lê, Khay hộp đựng đồ lưu trữ để bàn sang trọng- Chất liệu: Nhựa ABS - PET trong suốt- Kích thước : 26cm  x 19cm x 10cm-Xuất xứ : Trung ...', 'Khay hộp đựng đồ lưu trữ để bàn sang trọng - Khay đựng mỹ phẩm đồ trang điểm trong suốt cao cấp giả Pha Lê', 100000.0000, 6, 6, 'https://salt.tikicdn.com/cache/280x280/ts/product/57/d3/f7/8064129eea1dc69bafbc66894c333cd9.jpg');

-- ----------------------------
-- Table structure for Users
-- ----------------------------
DROP TABLE IF EXISTS "Users";
CREATE TABLE "Users" (
  "ID" serial NOT NULL,
  "Username" varchar(50) NOT NULL,
  "Password" varchar(255),
  "Name" varchar(50) NOT NULL,
  "Email" varchar(50) NOT NULL,
  "DOB" timestamp NOT NULL,
  "Role" char(50) NOT NULL,
  "Permission" int4 NOT NULL
);

BEGIN;
INSERT INTO "Users" VALUES (DEFAULT, 'adminshop', '$2a$10$PmSVg5k75sjwaCPso.lrjOtsrlIJ4Jc8STxnmbPCd0wg2A.kS2fPK', 'Admin', 'admin@admin.com', '2024-01-02 00:00:00', 'admin', 1);
COMMIT;

DROP Table If Exists "Carts" ;
Create Table "Carts" (
	"CartID" serial NOT NULL , 
	"UID" int4 NOT NULL,
	Primary Key ("CartID")
);

DROP Table If Exists "ProductsInCart" ;
Create Table "ProductsInCart" (
	"CartID" int4 NOT NULL ,
	"ProID" int4,
	"Quan" int4 ,
	Primary Key ("CartID", "ProID")
);
-- ----------------------------
-- Primary Key structure for table Categories
-- ----------------------------
ALTER TABLE "Categories" ADD CONSTRAINT "PK__Categori__6A1C8ADAD0441F0D" PRIMARY KEY ("CatID") WITH (fillfactor=80);

-- ----------------------------
-- Primary Key structure for table OrderDetails
-- ----------------------------
ALTER TABLE "OrderDetails" ADD CONSTRAINT "PK__OrderDet__3214EC27F3093BAB" PRIMARY KEY ("ID") WITH (fillfactor=80);

-- ----------------------------
-- Primary Key structure for table Orders
-- ----------------------------
ALTER TABLE "Orders" ADD CONSTRAINT "PK__Orders__C3905BAF65A79C3A" PRIMARY KEY ("OrderID") WITH (fillfactor=80);

-- ----------------------------
-- Primary Key structure for table Products
-- ----------------------------
ALTER TABLE "Products" ADD CONSTRAINT "PK__Products__620295F0C6E31B96" PRIMARY KEY ("ProID") WITH (fillfactor=80);

-- ----------------------------
-- Primary Key structure for table Users
-- ----------------------------
ALTER TABLE "Users" ADD CONSTRAINT "PK__Users__2910CFA5E0B78CF8" PRIMARY KEY ("ID") WITH (fillfactor=80);

-- ----------------------------
-- Foreign Keys structure for table OrderDetails
-- ----------------------------
ALTER TABLE "OrderDetails" ADD CONSTRAINT "FK_Pro" FOREIGN KEY ("ProID") REFERENCES "Products" ("ProID");
ALTER TABLE "OrderDetails" ADD CONSTRAINT "FK_O" FOREIGN KEY ("OrderID") REFERENCES "Orders" ("OrderID");

-- ----------------------------
-- Foreign Keys structure for table Products
-- ----------------------------
ALTER TABLE "Products" ADD CONSTRAINT "FK_Cat" FOREIGN KEY ("CatID") REFERENCES "Categories" ("CatID");

--
Alter table "ProductsInCart" ADD Constraint "FK_Pro_Cart" Foreign key ("ProID") References "Products" ("ProID");
Alter table "ProductsInCart" Add COnstraint "FK_Cart_Pro" Foreign key ("CartID") References "Carts" ("CartID");
Alter table "Carts" Add constraint "FK_Cart_User" Foreign key ("UID") references "Users" ("ID");  