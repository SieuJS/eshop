DROP TABLE IF EXISTS "UsersGoogle";
CREATE TABLE "UsersGoogle" (
  "Sub" varchar(50) NOT NULL PRIMARY KEY,
  "Name" varchar(50) NOT NULL,
  "Email" varchar(50) NOT NULL,
  "DOB" timestamp NOT NULL,
  "Role" varchar(10) NOT NULL
);