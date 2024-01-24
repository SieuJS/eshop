CREATE OR REPLACE PROCEDURE proc_save_trans(
    sender_id INT, -- ID người gửi
    receiver_id INT, -- ID người nhận
    order_id INT,
    amount INT, -- Số tiền gửi
    sta INT
)
LANGUAGE plpgsql
AS $$
DECLARE
    -- Khai báo biến
    sta_string VARCHAR(50);
BEGIN

    IF sta == 0 THEN
        sta_string := 'Fail';
    ELSE
        sta_string := 'Success';
    END IF;

    -- Ghi log giao dịch
    INSERT INTO "Transaction" ("AccID", "Amount", "OrderID", "Status", "Date")
    VALUES (sender_id, -amount, order_id, sta_string, CURRENT_TIMESTAMP);

    INSERT INTO "Transaction" ("AccID", "Amount", "OrderID", "Status", "Date")
    VALUES (receiver_id, amount, order_id, sta_string , CURRENT_TIMESTAMP);
END;
$$;