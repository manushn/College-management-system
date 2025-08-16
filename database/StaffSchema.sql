use nicetech;
CREATE TABLE staff (
     VARCHAR(50) PRIMARY KEY,
    prefix ENUM('Mr', 'Mrs', 'Miss') NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    date_of_birth DATE NOT NULL,
    photo_url TEXT,
    phone_number VARCHAR(15) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    personal_email VARCHAR(150),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    pincode VARCHAR(10),
    emergency_contact_name VARCHAR(100),
    emergency_contact_number VARCHAR(15),
    designation VARCHAR(100),
    department VARCHAR(100),
    role_type VARCHAR(50),
    employment_type ENUM('FullTime', 'PartTime', 'Contract'),
    reporting_manager VARCHAR(100),
    staff_status ENUM('active', 'leave', 'resigned') DEFAULT 'active',
    aadhar_number VARCHAR(12) UNIQUE,
    pan_number VARCHAR(10) UNIQUE,
    bank_account_number VARCHAR(20),
    bank_name VARCHAR(100),
    ifsc_code VARCHAR(11),
    salary DECIMAL(10,2),
    highest_qualification VARCHAR(100),
    specialization VARCHAR(100),
    role ENUM('staff', 'head') DEFAULT 'staff'
    joining_date DATE NOT NULL
    created_at 
);

SELECT * from staff;
SELECT username ,prefix, first_name,last_name,gender,photo_url,designation,department,staff_status from staff;

SELECT username FROM staff WHERE username LIKE "NI2025%" ORDER BY username DESC LIMIT 2;

SELECT * FROM staff where username = "NI20250001";
ALTER TABLE staff DROP COLUMN password;
ALTER TABLE staff MODIFY role ENUM('staff', 'head', 'admin') DEFAULT 'staff';

drop table users;
select * from users ;
