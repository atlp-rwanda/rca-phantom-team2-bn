-- Initial PostgreSQL 15.2 setup dump

DELIMITER ;

CREATE TABLE IF NOT EXISTS "public"."Permissions" (
    "id" uuid NOT NULL,
    "name" character varying(255) NOT NULL,
    "description" character varying(255) NOT NULL,
    "operations" character varying(255)[] DEFAULT '{}' NOT NULL,
    "modelName" character varying(255) NOT NULL,
    "createdAt" timestamptz NOT NULL,
    "updatedAt" timestamptz NOT NULL,
    CONSTRAINT "Permissions_name_key" UNIQUE ("name"),
    CONSTRAINT "Permissions_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

CREATE TABLE IF NOT EXISTS "public"."Roles" (
    "id" uuid NOT NULL,
    "name" character varying(255) NOT NULL,
    "description" character varying(255) NOT NULL,
    "createdAt" timestamptz NOT NULL,
    "updatedAt" timestamptz NOT NULL,
    CONSTRAINT "Roles_name_key" UNIQUE ("name"),
    CONSTRAINT "Roles_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

CREATE TABLE IF NOT EXISTS "public"."Users" (
    "id" uuid NOT NULL,
    "firstName" character varying(255) NOT NULL,
    "lastName" character varying(255) NOT NULL,
    "email" character varying(255) NOT NULL,
    "password" character varying(255) NOT NULL,
    "resetPasswordToken" character varying(255),
    "resetPasswordExpires" timestamptz,
    "roleId" uuid,
    "createdAt" timestamptz NOT NULL,
    "updatedAt" timestamptz NOT NULL,
    CONSTRAINT "Users_email_key" UNIQUE ("email"),
    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

CREATE TABLE IF NOT EXISTS "public"."Buses" (
    "id" uuid NOT NULL,
    "type" character varying(255) NOT NULL,
    "plateNumber" character varying(255) NOT NULL,
    "regNumber" character varying(255) NOT NULL,
    "model" character varying(255) NOT NULL,
    "manufacturer" character varying(255) NOT NULL,
    "numOfSeats" integer DEFAULT '0' NOT NULL,
    "availbleSeats" integer DEFAULT '0' NOT NULL,
    "status" character varying(255) DEFAULT 'STOPPED' NOT NULL,
    "createdAt" timestamptz NOT NULL,
    "updatedAt" timestamptz NOT NULL,
    CONSTRAINT "Buses_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "Buses_plateNumber_key" UNIQUE ("plateNumber"),
    CONSTRAINT "Buses_regNumber_key" UNIQUE ("regNumber")
) WITH (oids = false);

CREATE TABLE IF NOT EXISTS "public"."Locations" (
    "id" uuid NOT NULL,
    "name" character varying(255) NOT NULL,
    "latitude" numeric NOT NULL,
    "longitude" numeric NOT NULL,
    "createdAt" timestamptz NOT NULL,
    "updatedAt" timestamptz NOT NULL,
    CONSTRAINT "Locations_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

CREATE TABLE IF NOT EXISTS "public"."Routes" (
    "id" uuid NOT NULL,
    "name" character varying(255) NOT NULL,
    "origin" uuid NOT NULL,
    "destination" uuid NOT NULL,
    "createdAt" timestamptz NOT NULL,
    "updatedAt" timestamptz NOT NULL,
    CONSTRAINT "Routes_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

CREATE TABLE IF NOT EXISTS "public"."RolePermissions" (
    "id" uuid NOT NULL,
    "roleId" uuid NOT NULL,
    "permissionId" uuid NOT NULL,
    "createdAt" timestamptz NOT NULL,
    "updatedAt" timestamptz NOT NULL,
    CONSTRAINT "RolePermissions_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

CREATE TABLE IF NOT EXISTS "public"."BusDrivers" (
    "id" uuid NOT NULL,
    "busId" uuid NOT NULL,
    "driverId" uuid NOT NULL,
    "createdAt" timestamptz NOT NULL,
    "updatedAt" timestamptz NOT NULL,
    CONSTRAINT "BusDrivers_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

CREATE TABLE IF NOT EXISTS "public"."RouteBuses" (
    "id" uuid NOT NULL,
    "routeId" uuid NOT NULL,
    "busId" uuid NOT NULL,
    "createdAt" timestamptz NOT NULL,
    "updatedAt" timestamptz NOT NULL,
    CONSTRAINT "RouteBuses_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "Permissions" ("id", "name", "description", "operations", "modelName", "createdAt", "updatedAt") VALUES
('c2de474e-01fd-4082-a54d-990be31597e4',	'MANAGE_ROLES',	'Manage (create, view, update, delete) the roles',	'{CREATE,UPDATE,VIEW,DELETE}',	'Role',	'2023-03-27 10:45:21.375+00',	'2023-03-27 10:45:21.375+00'),
('60a6fb26-ae67-4c1d-b187-c3678bb5e917',	'MANAGE_PERMISSIONS',	'Manage (create, view, update, delete) the permissions',	'{CREATE,UPDATE,VIEW,DELETE}',	'Permission',	'2023-03-27 10:46:32.575+00',	'2023-03-27 10:46:32.575+00'),
('8f8da2e1-fa99-4534-b30f-45a9d0a1d6b5',	'MANAGE_BUSES',	'Manage (create, view, update, delete) the buses',	'{CREATE,UPDATE,VIEW,DELETE}',	'Bus',	'2023-05-01 15:09:16.163+00',	'2023-05-01 15:09:16.163+00'),
('800bb629-3e66-40a9-9978-882680a6345f',	'CONTROL_BUSES',	'Control (update) the buses',	'{UPDATE}',	'Bus',	'2023-05-01 15:11:05.428+00',	'2023-05-01 15:11:05.428+00'),
('16e23b24-6be8-4d62-adaf-7972b7ed0011',	'MANAGE_LOCATIONS',	'Manage (create, view, update, delete) the locations',	'{CREATE,UPDATE,VIEW,DELETE}',	'Location',	'2023-05-01 15:12:27.42+00',	'2023-05-01 15:12:27.42+00'),
('d4e24f66-605b-4257-a467-0ac9d7609331',	'MANAGE_ROUTES',	'Manage (create, view, update, delete) the routes',	'{CREATE,UPDATE,VIEW,DELETE}',	'Route',	'2023-05-01 15:14:37.749+00',	'2023-05-01 15:14:37.749+00'),
('4ed544f4-f1f0-4f20-a08b-332c89a2a00c',	'MANAGE_ROLE_PERMISSIONS',	'Manage (grant and revoke) the role permissions',	'{CREATE,DELETE}',	'Role',	'2023-03-27 10:48:36.125+00',	'2023-03-27 10:48:36.125+00');

INSERT INTO "Roles" ("id", "name", "description", "createdAt", "updatedAt") VALUES
('bc9d37c1-8ab4-46cd-9658-2a3c9ee2b30e',	'DRIVER',	'A driver of a vehicle (bus)',	'2023-03-27 10:33:37.754+00',	'2023-03-27 10:33:37.754+00'),
('49a9ca43-3f90-417f-8cfd-7f1df030a5e0',	'OPERATOR',	'A person in charge of managing drivers, routes and buses',	'2023-03-27 10:35:58.979+00',	'2023-03-27 10:35:58.979+00'),
('a76c8d6b-0f30-4238-8988-03f8ef04a6ab',	'ADMINISTRATOR',	'A super user with all permissions. In charge of register and remove both drivers & operators.',	'2023-03-27 10:38:14.29+00',	'2023-03-27 10:38:14.29+00');

INSERT INTO "RolePermissions" ("id", "roleId", "permissionId", "createdAt", "updatedAt") VALUES
('8b3ae085-7d48-4f0e-8a0a-997a47c80ede',	'a76c8d6b-0f30-4238-8988-03f8ef04a6ab',	'c2de474e-01fd-4082-a54d-990be31597e4',	'2023-03-31 15:17:06.776+00',	'2023-03-31 15:17:06.776+00'),
('85da5697-5ff0-473c-82fc-40bc3d24bffb',	'a76c8d6b-0f30-4238-8988-03f8ef04a6ab',	'60a6fb26-ae67-4c1d-b187-c3678bb5e917',	'2023-03-31 15:17:44.262+00',	'2023-03-31 15:17:44.262+00'),
('4cd544f4-f1f0-4f20-a0ab-332c89a2a00b',	'a76c8d6b-0f30-4238-8988-03f8ef04a6ab',	'4ed544f4-f1f0-4f20-a08b-332c89a2a00c',	'2023-04-03 15:05:15.298872+00',	'2023-04-03 15:05:15.298872+00'),
('84b2c552-0657-4262-a095-7ca501094c9a',	'a76c8d6b-0f30-4238-8988-03f8ef04a6ab',	'8f8da2e1-fa99-4534-b30f-45a9d0a1d6b5',	'2023-05-01 15:26:56.17+00',	'2023-05-01 15:26:56.17+00'),
('e923e355-85ce-4d57-9177-50d2f128f6e0',	'a76c8d6b-0f30-4238-8988-03f8ef04a6ab',	'16e23b24-6be8-4d62-adaf-7972b7ed0011',	'2023-05-01 15:28:00.844+00',	'2023-05-01 15:28:00.844+00'),
('cab26d69-d67a-46ff-ba17-32b638862149',	'a76c8d6b-0f30-4238-8988-03f8ef04a6ab',	'd4e24f66-605b-4257-a467-0ac9d7609331',	'2023-05-01 15:29:24.1+00',	'2023-05-01 15:29:24.1+00'),
('615d1fcb-66e9-4400-ac7b-3ff05ff82afb',	'bc9d37c1-8ab4-46cd-9658-2a3c9ee2b30e',	'800bb629-3e66-40a9-9978-882680a6345f',	'2023-05-01 15:31:32.918+00',	'2023-05-01 15:31:32.918+00'),
('3aaf5e8d-fde9-4192-ab1d-8af34f34e798',	'49a9ca43-3f90-417f-8cfd-7f1df030a5e0',	'8f8da2e1-fa99-4534-b30f-45a9d0a1d6b5',	'2023-05-01 15:33:30.826+00',	'2023-05-01 15:33:30.826+00'),
('07eb9457-4c64-4a1f-87db-fb8dfb61c3c7',	'49a9ca43-3f90-417f-8cfd-7f1df030a5e0',	'16e23b24-6be8-4d62-adaf-7972b7ed0011',	'2023-05-01 15:34:01.879+00',	'2023-05-01 15:34:01.879+00'),
('5efd1ed3-0d7d-44ae-88e7-c6b83031e18a',	'49a9ca43-3f90-417f-8cfd-7f1df030a5e0',	'd4e24f66-605b-4257-a467-0ac9d7609331',	'2023-05-01 15:34:32.638+00',	'2023-05-01 15:34:32.638+00');

INSERT INTO "Users" ("id", "firstName", "lastName", "email", "password", "resetPasswordToken", "resetPasswordExpires", "roleId", "createdAt", "updatedAt") VALUES
('39e5e72a-2680-4ae3-80f1-46d7a8b41b13',	'John',	'Doe',	'admin@phantom.com',	'$2b$10$WA415l13.up/6pobE.7.POhFaW8gDeNo4vbq7JT8uomfwKIRgkqgG',	NULL,	NULL,	'a76c8d6b-0f30-4238-8988-03f8ef04a6ab',	'2023-03-27 19:03:08.536+00',	'2023-03-27 19:03:08.536+00'),
('49e5e72a-2680-4be3-70f1-46d7a8b41b14',	'John',	'Doe',	'driver@phantom.com',	'$2b$10$WA415l13.up/6pobE.7.POhFaW8gDeNo4vbq7JT8uomfwKIRgkqgG',	NULL,	NULL,	'bc9d37c1-8ab4-46cd-9658-2a3c9ee2b30e',	'2023-05-01 14:49:04.423854+00',	'2023-05-01 14:49:04.423854+00'),
('29e5e72a-2680-3ee3-70f1-16d7a8b41b22',	'John',	'Doe',	'operator@phantom.com',	'$2b$10$WA415l13.up/6pobE.7.POhFaW8gDeNo4vbq7JT8uomfwKIRgkqgG',	NULL,	NULL,	'49a9ca43-3f90-417f-8cfd-7f1df030a5e0',	'2023-05-01 14:50:23.263376+00',	'2023-05-01 14:50:23.263376+00');

DELIMITER //

CREATE OR REPLACE FUNCTION create_constraint_if_not_exists (t_name text, c_name text, constraint_sql text) RETURNS void AS $BODY$ BEGIN
  IF NOT EXISTS (
    SELECT constraint_name
    FROM information_schema.constraint_column_usage
    WHERE constraint_name = LOWER(c_name)
  ) THEN EXECUTE 'ALTER TABLE "public"."' || t_name || '" ADD CONSTRAINT ' || LOWER(c_name) || ' ' || constraint_sql;
END IF;
END;
$BODY$ LANGUAGE plpgsql VOLATILE; //

DELIMITER ;

SELECT create_constraint_if_not_exists('RolePermissions', 'RolePermissions_permissionId_fkey', 'FOREIGN KEY ("permissionId") REFERENCES "Permissions"(id) NOT DEFERRABLE');

SELECT create_constraint_if_not_exists('RolePermissions', 'RolePermissions_roleId_fkey', 'FOREIGN KEY ("roleId") REFERENCES "Roles"(id) NOT DEFERRABLE');

SELECT create_constraint_if_not_exists('Users', 'Users_roleId_fkey', 'FOREIGN KEY ("roleId") REFERENCES "Roles"(id) ON UPDATE SET NULL ON DELETE SET NULL NOT DEFERRABLE');

SELECT create_constraint_if_not_exists('BusDrivers', 'BusDrivers_busId_fkey', 'FOREIGN KEY ("busId") REFERENCES "Buses"(id) NOT DEFERRABLE');

SELECT create_constraint_if_not_exists('BusDrivers', 'BusDrivers_driverId_fkey', 'FOREIGN KEY ("driverId") REFERENCES "Users"(id) NOT DEFERRABLE');

SELECT create_constraint_if_not_exists('RouteBuses', 'RouteBuses_busId_fkey', 'FOREIGN KEY ("busId") REFERENCES "Buses"(id) NOT DEFERRABLE');

SELECT create_constraint_if_not_exists('RouteBuses', 'RouteBuses_routeId_fkey', 'FOREIGN KEY ("routeId") REFERENCES "Routes"(id) NOT DEFERRABLE');

SELECT create_constraint_if_not_exists('Routes', 'Routes_destination_fkey', 'FOREIGN KEY (destination) REFERENCES "Locations"(id) ON UPDATE CASCADE ON DELETE CASCADE NOT DEFERRABLE');

SELECT create_constraint_if_not_exists('Routes', 'Routes_origin_fkey', 'FOREIGN KEY (origin) REFERENCES "Locations"(id) ON UPDATE CASCADE ON DELETE CASCADE NOT DEFERRABLE');

-- End. Contributor: @degide