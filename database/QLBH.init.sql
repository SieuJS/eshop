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
INSERT INTO "Categories" VALUES (DEFAULT, 'Máy chụp hình');
INSERT INTO "Categories" VALUES (DEFAULT, 'Quần áo - Giày dép');
INSERT INTO "Categories" VALUES (DEFAULT, 'Máy tính');
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
BEGIN;
INSERT INTO "OrderDetails" VALUES (1, 1, 'Freshwater Cultured Pearl', 1, 2, 1500000.0000, 3000000.0000);
INSERT INTO "OrderDetails" VALUES (2, 1, 'Pink Sapphire Sterling Silver', 2, 2, 300000.0000, 600000.0000);
INSERT INTO "OrderDetails" VALUES (3, 2, 'Freshwater Cultured Pearl', 1, 1, 1500000.0000, 1500000.0000);
INSERT INTO "OrderDetails" VALUES (4, 2, 'Pink Sapphire Sterling Silver', 2, 1, 300000.0000, 300000.0000);
COMMIT;

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
	"Phone" varchar(50)
)
;

-- ----------------------------
-- Records of Orders
-- ----------------------------
BEGIN;
INSERT INTO "Orders" VALUES (1, '2014-03-14 00:00:00.000', 5, 3600000.0000);
INSERT INTO "Orders" VALUES (2, '2014-03-14 00:00:00.000', 5, 1800000.0000);
COMMIT;

-- ----------------------------
-- Table structure for Products
-- ----------------------------
DROP TABLE IF EXISTS "Products";
CREATE TABLE "Products" (
  "ProID" serial NOT NULL,
  "ProName" varchar(255) NOT NULL,
  "TinyDes" varchar(80) NOT NULL,
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
INSERT INTO "Products" VALUES (DEFAULT, 'Bộ quần áo thể thao nam FASVIN AT22511.HN chất vải mềm nhẹ co giãn thoải mái', 'Đồ mặc nhà nam - Bộ ngắn', 'Đồ mặc nhà nam - Bộ ngắn', 419000.0000, 4, 2, 'https://salt.tikicdn.com/cache/280x280/ts/product/aa/7b/0e/c8c5e3e7411464a4a545af34e0b54817.jpg');
INSERT INTO "Products" VALUES (DEFAULT, 'Bộ quần áo thể thao nam Fasvin AB22494.HN mềm mại co giãn thoải mái', 'Đồ mặc nhà nam - Bộ ngắn', 'Đồ mặc nhà nam - Bộ ngắn', 299000.0000, 4, 1, 'https://salt.tikicdn.com/cache/280x280/ts/product/07/f5/57/89dc4e45a4ed0775f827a54fd82d23ac.jpg');
INSERT INTO "Products" VALUES (DEFAULT, 'Bộ Quần Áo Nam Thể Thao Viền Tay Cao Cấp thời Trang ZERO', 'Đồ mặc nhà nam - Bộ ngắn', 'Đồ mặc nhà nam - Bộ ngắn', 209000.0000, 4, 89, 'https://salt.tikicdn.com/cache/280x280/ts/product/ec/55/2c/b61717e898d62e12c8140946c48d3b59.jpg');
INSERT INTO "Products" VALUES (DEFAULT, ' QUẦN ÁO THỂ THAO NAM    BỘ HÈ CHO NAM NỮ IN CHỮ FULUA ĐỒ CẶP ĐÔI 2020', 'Đồ mặc nhà nam - Bộ ngắn', 'Đồ mặc nhà nam - Bộ ngắn', 96000.0000, 4, 247, 'https://salt.tikicdn.com/cache/280x280/ts/product/e5/3e/08/58819ea7d03d498089bb8f0d79ad41fb.jpg');
INSERT INTO "Products" VALUES (DEFAULT, 'Bộ Quần Áo Thể Thao Nam Kẻ Sọc Thời Trang Cao Cấp VICERO', 'Đồ mặc nhà nam - Bộ dài', 'Đồ mặc nhà nam - Bộ dài', 209000.0000, 4, 334, 'https://salt.tikicdn.com/cache/280x280/ts/product/20/38/99/0e217708fc72d56becccf08fdac0a0d8.jpg');
INSERT INTO "Products" VALUES (DEFAULT, 'BỘ QUẦN ÁO THỂ THAO , bộ quần áo nam ,BỘ ĐỒ NAM CHẤT THUN LẠNH MÀU ĐEN , ĐỎ , TRẮNG', 'Đồ mặc nhà nam - Bộ ngắn', 'Đồ mặc nhà nam - Bộ ngắn', 97000.0000, 4, 48, 'https://salt.tikicdn.com/cache/280x280/ts/product/f1/2d/32/989dc86ee7309836d2f894b49e184d64.jpg');
INSERT INTO "Products" VALUES (DEFAULT, 'Bộ quần áo nam mùa hè chất vải nỉ polyster co giãn, mềm mịn, thoải mái phong cách trẻ trung B767', 'Đồ mặc nhà nam - Bộ ngắn', 'Đồ mặc nhà nam - Bộ ngắn', 349000.0000, 4, 4, 'https://salt.tikicdn.com/cache/280x280/ts/product/c2/a4/df/f1aac6bb20e5b10f72c3ddeeef43f9ec.jpg');
INSERT INTO "Products" VALUES (DEFAULT, 'Bộ Quần Áo Nam SE60', 'Đồ mặc nhà nam - Bộ ngắn', 'Đồ mặc nhà nam - Bộ ngắn', 282000.0000, 4, 27, 'https://salt.tikicdn.com/cache/280x280/ts/product/98/99/6c/4199a493e675cd32a6959a21059d6a11.jpg');
INSERT INTO "Products" VALUES (DEFAULT, 'Bộ Quần Áo Nam Thể Thao Cộc Tay Hoa Văn', 'Đồ ngủ, đồ mặc nhà nam', 'Đồ ngủ, đồ mặc nhà nam', 109000.0000, 4, 268, 'https://salt.tikicdn.com/cache/280x280/ts/product/f1/f6/15/2aee870b81c410dc3f17be70787caead.jpg');
INSERT INTO "Products" VALUES (DEFAULT, 'Bộ quần áo nam, set đồ nam Houston thời trang, chất thun cotton cao cấp - FORMEN SHOP- FMPS222', 'Đồ mặc nhà nam - Bộ ngắn', 'Đồ mặc nhà nam - Bộ ngắn', 259000.0000, 4, 20, 'https://salt.tikicdn.com/cache/280x280/ts/product/22/2a/c0/8481b417efc46ed9e9405d36c78338ae.jpg');
INSERT INTO "Products" VALUES (DEFAULT, 'Áo lót nam cao cấp GOKING, áo thun ba lỗ nam 100% cotton thoáng mát, thấm hút mồ hôi, khử mùi, kháng khuẩn', 'Đồ mặc nhà nam - Bộ ngắn', 'Đồ mặc nhà nam - Bộ ngắn', 139000.0000, 4, 178, 'https://salt.tikicdn.com/cache/280x280/ts/product/ad/af/b1/a72891d2ac7504fa740a785bb0a19e22.jpg');
INSERT INTO "Products" VALUES (DEFAULT, 'Bộ quần áo thể thao nam FASVIN AB22501.HN chất vải mềm nhẹ co giãn thoải mái', 'Đồ mặc nhà nam - Bộ ngắn', 'Đồ mặc nhà nam - Bộ ngắn', 419000.0000, 4, 2, 'https://salt.tikicdn.com/cache/280x280/ts/product/02/49/62/e29417170f181f175445857e192e4e80.jpg');

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