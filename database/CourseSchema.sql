use nicetech;
CREATE TABLE department (
  dep_id BIGINT PRIMARY KEY ,
  dep_name VARCHAR(255) NOT NULL,
  dep_hod VARCHAR(255),
  dep_hodid VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
select * from department;
TRUNCATE table department;
drop table department;

CREATE TABLE courses (
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
truncate table courses;
drop table courses;

DELETE FROM courses WHERE course_id=9;
    