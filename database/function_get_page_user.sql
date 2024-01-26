-- FUNCTION: public.get_list_users(integer, integer)

-- DROP FUNCTION IF EXISTS public.get_list_users(integer, integer);

CREATE OR REPLACE FUNCTION public.get_list_users(
	page_size integer,
	page_num integer)
	RETURNS Table ("ID" int, "Username"  varchar, "Name" varchar , "Email" varchar , "DOB" timestamp , "Role" char, "Permission" int)
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
	
BEGIN
    -- Your logic to fetch data based on page_size and page_num goes here
    -- This is just a placeholder, replace it with your actual query
    RETURN QUERY 
	SELECT u."ID" , u."Username" , u."Name",u."Email", u."DOB",  u."Role", u."Permission"
    FROM "Users" u
    LIMIT page_size
    OFFSET (page_num - 1) * page_size;
END;
$BODY$;

ALTER FUNCTION public.get_list_users(integer, integer)
    OWNER TO postgres;
Select * from  get_list_users(3,4);
