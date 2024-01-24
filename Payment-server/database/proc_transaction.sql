CREATE OR REPLACE PROCEDURE proc_transaction(
    sender_id INT, -- ID người gửi
    receiver_id INT, -- ID người nhận
    amount INT -- Số tiền gửi
)
LANGUAGE plpgsql
AS $$
BEGIN
    -- Trừ số dư của người gửi
    UPDATE "Account" SET "Balance" = "Balance" - amount WHERE "AccID" = sender_id;

    -- Cộng số dư cho người nhận
    UPDATE "Account" SET "Balance" = "Balance" + amount WHERE "AccID" = receiver_id;
END;
$$;