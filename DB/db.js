const e = require("express");
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "TooJoo_1967",
  database: "resource_mangement",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function queryDB(sql, params) {
  const connection = await pool.promise().getConnection(); // Get a connection from the pool
  try {
    const [rows] = await connection.query(sql, params);
    return rows;
  } catch (error) {
    throw error;
  } finally {
    connection.release(); // Release the connection back to the pool
  }
}

async function fetchCred(id, flag) {
  try {
    let query;
    switch (flag) {
      case "admin":
        query = "SELECT * FROM admin WHERE id = ?";
        break;
      case "faculty":
        query = "SELECT * FROM faculty WHERE faculty_id = ?";
        break;
      case "student":
        query = "SELECT * FROM student WHERE student_id = ?";
        break;
    }
    const params = [id];
    const rows = await queryDB(query, params);
    console.log("this is rows : ", rows);

    return rows;
  } catch (error) {
    console.error(error);
  }
}

async function addNewStd(stdName, stdId, stdPass) {
  try {
    const query = "INSERT INTO student VALUES(?, ?, ?)";
    const params = [stdId, stdPass, stdName];
    const rows = await queryDB(query, params);
    return rows;
  } catch (error) {
    console.error(error);
  }
}
async function addNewFac(facName, facId, facPass) {
  try {
    const query = "INSERT INTO faculty VALUES(?, ?, ?)";
    const params = [facId, facPass, facName];
    const rows = await queryDB(query, params);
    return rows;
  } catch (error) {
    console.error(error);
  }
}
async function fetchBookingDetaild(flag) {
  try {
    let query;
    if (flag === "student") {
      query =
        "SELECT * FROM resource_booking_request WHERE faculty_id IS NULL AND status = 'pending' ";
    } else if (flag === "faculty") {
      query =
        "SELECT * FROM resource_booking_request WHERE student_id IS NULL AND status = 'pending' ";
    }
    const params = [];
    const rows = await queryDB(query, params);
    return rows;
  } catch (error) {
    console.error(error);
  }
}
async function fetchResouceName(resourceId) {
  try {
    const query = "SELECT * FROM resources WHERE resource_id = ?";
    const params = [resourceId];
    const rows = await queryDB(query, params);

    return rows;
  } catch (error) {
    console.error(error);
  }
}
async function fetchResources() {
  try {
    const query = "SELECT * FROM resources";
    const params = [];
    const rows = await queryDB(query, params);
    return rows;
  } catch (error) {
    console.error(error);
  }
}
async function fetchStudentProfile(stdId) {
  try {
    const query = "SELECT * FROM student where student_id = ?";
    const params = [stdId];
    const rows = await queryDB(query, params);
    return rows;
  } catch (error) {
    console.error(error);
  }
}
async function fetchResources() {
  try {
    const query = "SELECT * FROM resources";
    const params = [];
    const rows = await queryDB(query, params);
    return rows;
  } catch (error) {
    console.error(error);
  }
}
async function fetchBookedDetails() {
  try {
    const query = "SELECT * FROM resource_booking_request WHERE status = ?";
    const params = ["approved"];
    const rows = await queryDB(query, params);
    return rows;
  } catch (error) {
    console.error(error);
  }
}
async function fetchBookedDetailsWithId(stdId) {
  try {
    const query = "SELECT * FROM resource_booking_request WHERE student_id = ?";
    const params = [stdId];
    const rows = await queryDB(query, params);
    return rows;
  } catch (error) {
    console.error(error);
  }
}

async function updateRequest(reqId, status) {
  try {
    const query =
      "UPDATE resource_booking_request SET status = ? WHERE booking_id = ?";
    const params = [status, reqId];
    const rows = await queryDB(query, params);
    return rows;
  } catch (error) {
    console.error(error);
  }
}
async function insertReqResource(
  resource_id,
  id,
  request_date,
  description,
  status,
  flag
) {
  let query;
  try {
    if (flag === "student") {
      query =
        "INSERT INTO resource_booking_request(resource_id,student_id,request_date,description,status) VALUES(?, ?, ?, ?, ?)";
    } else if (flag === "faculty") {
      query =
        "INSERT INTO resource_booking_request(resource_id,faculty_id,request_date,description,status) VALUES(?, ?, ?, ?, ?)";
    }
    const params = [resource_id, id, request_date, description, status];
    const rows = await queryDB(query, params);
    return rows;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  fetchCred,
  addNewStd,
  addNewFac,
  fetchBookingDetaild,
  fetchResouceName,
  updateRequest,
  fetchBookedDetails,
  fetchStudentProfile,
  fetchResources,
  insertReqResource,
  fetchBookedDetailsWithId,
};
