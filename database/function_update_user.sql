-- FUNCTION: public.update_user(integer, text, text, text, text, date)

-- DROP FUNCTION IF EXISTS public.update_user(integer, text, text, text, text, date);

CREATE OR REPLACE FUNCTION public.update_user(
	user_id integer,
	newusername text DEFAULT NULL::text,
	newpassword text DEFAULT NULL::text,
	newname text DEFAULT NULL::text,
	newemail text DEFAULT NULL::text,
	newdob date DEFAULT NULL::date)
    RETURNS TABLE(id integer, username varchar(50)) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
BEGIN
    UPDATE "Users"
	SET
        "Username" = COALESCE(newUsername,  "Username"),
        "Password" = COALESCE(newPassword, "Password"),
        "Name" = COALESCE(newName, "Name"),
        "Email" = COALESCE(newEmail, "Email"),
		"DOB" = COALESCE(newDOB, "DOB")
    WHERE "ID" = user_id;
	RETURN QUERY SELECT "ID", "Username" FROM "Users" WHERE "ID" = user_id;
END;
$BODY$;

ALTER FUNCTION public.update_user(integer, text, text, text, text, date)
    OWNER TO postgres;
