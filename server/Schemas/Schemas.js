// schemas.js

const schemas = {
  users: `
    CREATE TABLE IF NOT EXISTS users (
      username VARCHAR(255) PRIMARY KEY,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(100) NOT NULL
    );
  `,
  staff: `
    CREATE TABLE IF NOT EXISTS staff (
      username VARCHAR(50) PRIMARY KEY,
      staff_code CHAR(4) UNIQUE NOT NULL,
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
      joining_date DATE NOT NULL,
      role ENUM('staff', 'head','admin','accountant') DEFAULT 'staff',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      updated_by VARCHAR(50)
    );
  `,
  department: `
    CREATE TABLE IF NOT EXISTS department (
      dep_id BIGINT PRIMARY KEY,
      dep_name VARCHAR(255) NOT NULL,
      dep_hod VARCHAR(255),
      dep_hodid VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `,
  courses: `
    CREATE TABLE IF NOT EXISTS courses (
      course_id BIGINT PRIMARY KEY AUTO_INCREMENT,
      course_code VARCHAR(20) NOT NULL,
      course_name VARCHAR(255) NOT NULL,
      course_type VARCHAR(50) NOT NULL,
      credit INT NOT NULL,
      dep_id BIGINT NOT NULL,
      dep_name VARCHAR(255),
      staff_name VARCHAR(255) NOT NULL,
      staff_id VARCHAR(255) NOT NULL,
      sem INT NOT NULL,
      regulation SMALLINT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (dep_id) REFERENCES department(dep_id),
      FOREIGN KEY (staff_id) REFERENCES staff(username),
      INDEX(course_code),
      INDEX(sem),
      INDEX(dep_id),
      INDEX(course_type),
      INDEX(regulation)
    );
  `,
  timetable: `
    CREATE TABLE IF NOT EXISTS timetable (
      id INT AUTO_INCREMENT PRIMARY KEY,
      dep VARCHAR(100) NOT NULL,
      hall_no VARCHAR(10) NOT NULL,
      sem INT NOT NULL,
      division VARCHAR(10) NOT NULL,
      wef DATE NOT NULL,
      status ENUM('active','inactive') DEFAULT 'active',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

      rd1cd1 VARCHAR(50) NOT NULL, rd1cd2 VARCHAR(50) NOT NULL, rd1cd3 VARCHAR(50) NOT NULL,
      rd1cd4 VARCHAR(50) NOT NULL, rd1cd5 VARCHAR(50) NOT NULL, rd1cd6 VARCHAR(50) NOT NULL, rd1cd7 VARCHAR(50) NOT NULL,
      rs1cs1 VARCHAR(10) NOT NULL, rs1cs2 VARCHAR(10) NOT NULL, rs1cs3 VARCHAR(10) NOT NULL,
      rs1cs4 VARCHAR(10) NOT NULL, rs1cs5 VARCHAR(10) NOT NULL, rs1cs6 VARCHAR(10) NOT NULL, rs1cs7 VARCHAR(10) NOT NULL,

      rd2cd1 VARCHAR(50) NOT NULL, rd2cd2 VARCHAR(50) NOT NULL, rd2cd3 VARCHAR(50) NOT NULL,
      rd2cd4 VARCHAR(50) NOT NULL, rd2cd5 VARCHAR(50) NOT NULL, rd2cd6 VARCHAR(50) NOT NULL, rd2cd7 VARCHAR(50) NOT NULL,
      rs2cs1 VARCHAR(10) NOT NULL, rs2cs2 VARCHAR(10) NOT NULL, rs2cs3 VARCHAR(10) NOT NULL,
      rs2cs4 VARCHAR(10) NOT NULL, rs2cs5 VARCHAR(10) NOT NULL, rs2cs6 VARCHAR(10) NOT NULL, rs2cs7 VARCHAR(10) NOT NULL,

      rd3cd1 VARCHAR(50) NOT NULL, rd3cd2 VARCHAR(50) NOT NULL, rd3cd3 VARCHAR(50) NOT NULL,
      rd3cd4 VARCHAR(50) NOT NULL, rd3cd5 VARCHAR(50) NOT NULL, rd3cd6 VARCHAR(50) NOT NULL, rd3cd7 VARCHAR(50) NOT NULL,
      rs3cs1 VARCHAR(10) NOT NULL, rs3cs2 VARCHAR(10) NOT NULL, rs3cs3 VARCHAR(10) NOT NULL,
      rs3cs4 VARCHAR(10) NOT NULL, rs3cs5 VARCHAR(10) NOT NULL, rs3cs6 VARCHAR(10) NOT NULL, rs3cs7 VARCHAR(10) NOT NULL,

      rd4cd1 VARCHAR(50) NOT NULL, rd4cd2 VARCHAR(50) NOT NULL, rd4cd3 VARCHAR(50) NOT NULL,
      rd4cd4 VARCHAR(50) NOT NULL, rd4cd5 VARCHAR(50) NOT NULL, rd4cd6 VARCHAR(50) NOT NULL, rd4cd7 VARCHAR(50) NOT NULL,
      rs4cs1 VARCHAR(10) NOT NULL, rs4cs2 VARCHAR(10) NOT NULL, rs4cs3 VARCHAR(10) NOT NULL,
      rs4cs4 VARCHAR(10) NOT NULL, rs4cs5 VARCHAR(10) NOT NULL, rs4cs6 VARCHAR(10) NOT NULL, rs4cs7 VARCHAR(10) NOT NULL,

      rd5cd1 VARCHAR(50) NOT NULL, rd5cd2 VARCHAR(50) NOT NULL, rd5cd3 VARCHAR(50) NOT NULL,
      rd5cd4 VARCHAR(50) NOT NULL, rd5cd5 VARCHAR(50) NOT NULL, rd5cd6 VARCHAR(50) NOT NULL, rd5cd7 VARCHAR(50) NOT NULL,
      rs5cs1 VARCHAR(10) NOT NULL, rs5cs2 VARCHAR(10) NOT NULL, rs5cs3 VARCHAR(10) NOT NULL,
      rs5cs4 VARCHAR(10) NOT NULL, rs5cs5 VARCHAR(10) NOT NULL, rs5cs6 VARCHAR(10) NOT NULL, rs5cs7 VARCHAR(10) NOT NULL
    );
  `,
};

module.exports = schemas;