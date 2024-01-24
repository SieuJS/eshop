-- Tạo hàm trigger
CREATE OR REPLACE FUNCTION update_product_quantity()
RETURNS TRIGGER AS $$
BEGIN
  -- Giảm giá trị quantity trong bảng Products tương ứng với proid từ bảng OrderDetails
  UPDATE "Products"
  SET "Quantity" = "Quantity" - NEW."Quantity"
  WHERE "ProID" = NEW."ProID";

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Tạo trigger cho sự kiện INSERT trên bảng OrderDetails
CREATE TRIGGER order_details_insert_trigger
AFTER INSERT ON "OrderDetails"
FOR EACH ROW
EXECUTE FUNCTION update_product_quantity();