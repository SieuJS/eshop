CREATE OR REPLACE PROCEDURE proc_delete_user(
	IN username TEXT)
LANGUAGE 'plpgsql'
AS $BODY$
BEGIN
	DELETE FROM "Users" WHERE "Username" = username;
	DELETE FROM "Orders" WHERE "UserID" = (
		SELECT "ID" FROM "Users"
		WHERE "Username" = username);
END;
$BODY$;
ALTER PROCEDURE public.proc_delete_product(integer)
    OWNER TO postgres;
