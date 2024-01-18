-- PROCEDURE: public.proc_delete_product(integer)

-- DROP PROCEDURE IF EXISTS public.proc_delete_product(integer);

CREATE OR REPLACE PROCEDURE public.proc_delete_product(
	IN p_id integer)
LANGUAGE 'plpgsql'
AS $BODY$
BEGIN
	DELETE FROM "Products" WHERE "ProID" = p_id;
END;
$BODY$;
ALTER PROCEDURE public.proc_delete_product(integer)
    OWNER TO postgres;
