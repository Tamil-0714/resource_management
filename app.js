const express = require("express");
const path = require("path");
const session = require("express-session");
const {
  ensureAuthenticated,
  ensureAdminAuthenticated,
  adminLogged,
  studentLogged,
  ensureStudentAuthenticated,
} = require("./middleware/middleware");

const {
  fetchReqInfo,
  addNewStd,
  addNewFac,
  fetchBookingDetaild,
  fetchResouceName,
  updateRequest,
  fetchBookedDetails,
  fetchResources,
  fetchStudentProfile,
  insertReqResource,
  fetchBookedDetailsWithId,
} = require("./DB/db");
const bcrypt = require("bcrypt");
const handleLogin = require("./routes/loginRoute");

const app = express();
const port = 8050;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session Configuration
app.use(
  session({
    secret: "iam_iron_man",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true, maxAge: 86400000 },
  })
);

app.get("/", (req, res) => {
  const pageData = {
    title: "Resourse managment System",
  };
  res.render("index.ejs", pageData);
});

app.get("/admin/login", adminLogged, (req, res) => {
  res.render("adminLogin", { style: undefined });
});

app.post("/admin/login", async (req, res) => {
  const { userName, password } = req.body;
  console.log(userName, password);
  if (userName && password) {
    await handleLogin(userName, password, "admin", async (result) => {
      if (result) {
        req.session.user = { userName, role: "admin" };
        return res.redirect("/admin/dashboard");
      } else {
        return res.render("adminLogin", { style: "border: 1px solid red;" });
      }
    });
  } else {
    return res.render("adminLogin", { style: "border: 1px solid red;" });
  }
});

// Function to fetch and format booked resources
const fetchAndFormatBooked = async (bookeds) => {
  return await Promise.all(
    bookeds.map(async (booked) => {
      if (booked.request_date) {
        const date = new Date(booked.request_date);
        booked.request_date = date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
      }
      try {
        const rows = await fetchResouceName(booked.resource_id);
        booked.resource_name =
          rows[0]?.resource_name || "Resource name not found";
      } catch (error) {
        console.error(
          `Error fetching resource name for ID ${booked.resource_id}:`,
          error
        );
        booked.resource_name = "Resource name not found";
      }
      return booked;
    })
  );
};

app.get("/admin/dashboard", ensureAdminAuthenticated, async (req, res) => {
  try {
    // Function to fetch and format bookings
    const fetchAndFormatBookings = async (bookingType) => {
      const bookings = await fetchBookingDetaild(bookingType);

      // Process all bookings concurrently
      return await Promise.all(
        bookings.map(async (booking) => {
          // Format the request date
          if (booking.request_date) {
            const date = new Date(booking.request_date);
            booking.request_date = date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            });
          }

          // Fetch resource name
          try {
            const rows = await fetchResouceName(booking.resource_id);
            booking.resource_name =
              rows[0]?.resource_name || "Resource name not found";
          } catch (error) {
            console.error(
              `Error fetching resource name for ID ${booking.resource_id}:`,
              error
            );
            booking.resource_name = "Resource name not found";
          }

          return booking;
        })
      );
    };
    const [bookingDetails, facBookingDetaild] = await Promise.all([
      fetchAndFormatBookings("student"),
      fetchAndFormatBookings("faculty"),
    ]);
    const bookedDetails = await fetchBookedDetails();
    const formattedBookedDetails = await fetchAndFormatBooked(bookedDetails);
    res.render("adminDashboard", {
      bookingDetails,
      facBookingDetaild,
      bookedDetails: formattedBookedDetails,
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).send("An error occurred while loading the dashboard");
  }
});

app.post("/admin/newStd", ensureAdminAuthenticated, async (req, res) => {
  const { stdName, stdId, stdPass } = req.body;
  if (stdName && stdId && stdPass) {
    bcrypt.hash(stdPass, 10, async (err, hash) => {
      if (err) {
        console.error("error in hashing");
        return res.status(500).send("internal server error ");
      }
      const rows = await addNewStd(stdName, stdId, hash);
      if (rows?.affectedRows === 1) {
        res.status(200).json({ message: "success" });
      } else {
        res.status(300).json({ message: "id is already exist" });
      }
    });
  } else {
    res.status(300).json({ message: "invalid data" });
  }
});
app.post("/admin/newFaculty", ensureAdminAuthenticated, async (req, res) => {
  const { facName, facId, facPass } = req.body;
  if (facName && facId && facPass) {
    bcrypt.hash(facPass, 10, async (err, hash) => {
      if (err) {
        console.error("error in hashing");
        return res.status(500).send("internal server error ");
      }
      const rows = await addNewFac(facName, facId, hash);
      if (rows?.affectedRows === 1) {
        res.status(200).json({ message: "success" });
      } else {
        res.status(300).json({ message: "id is already exist" });
      }
    });
  } else {
    res.status(300).json({ message: "invalid data" });
  }
});

app.put("/admin/acceptReq/:id", ensureAdminAuthenticated, async (req, res) => {
  const reqId = req.params.id;
  try {
    const rows = await updateRequest(reqId, "approved");
    if (rows.affectedRows === 1) {
      res.status(200).json({ message: "success" });
    } else {
      res.status(200).json({ message: "failed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server error" });
  }
});
app.put("/admin/rejectReq/:id", ensureAdminAuthenticated, async (req, res) => {
  const reqId = req.params.id;
  try {
    const rows = await updateRequest(reqId, "rejected");
    if (rows.affectedRows === 1) {
      res.status(200).json({ message: "success" });
    } else {
      res.status(200).json({ message: "failed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server error" });
  }
});

app.get("/student/login", studentLogged, (req, res) => {
  res.render("studentLogin", { style: undefined });
});

app.post("/student/login", async (req, res) => {
  const { userName, password } = req.body;
  console.log(userName, password);
  if (userName && password) {
    await handleLogin(userName, password, "student", async (result) => {
      if (result) {
        req.session.user = { userName, role: "student" };
        return res.redirect("/student/dashboard");
      } else {
        return res.render("studentLogin", { style: "border: 1px solid red;" });
      }
    });
  } else {
    return res.render("studentLogin", { style: "border: 1px solid red;" });
  }
});

app.get("/student/dashboard", ensureStudentAuthenticated, async (req, res) => {
  const bookedDetails = await fetchBookedDetailsWithId(
    req.session.user.userName
  );
  const formattedBookedDetails = await fetchAndFormatBooked(bookedDetails);
  const pageData = {
    resources: await fetchResources(),
    profile: await fetchStudentProfile(req.session.user.userName),
    bookedDetails: formattedBookedDetails,
    statusClassMap: {
      pending: "sts-pending",
      approved: "sts-approved",
      rejected: "sts-rejected",
    },
  };
  console.log(pageData);

  res.render("studentDashboard", pageData);
});

app.post(
  "/student/bookResourse",
  ensureStudentAuthenticated,
  async (req, res) => {
    try {
      const { resourceId, resourceDate, description } = req.body;

      // Validate request body
      if (!resourceId || !resourceDate || !description) {
        return res.status(400).json({ message: "All fields are required" });
      }

      // Validate date format (YYYY-MM-DD)
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(resourceDate)) {
        return res
          .status(400)
          .json({ message: "Invalid date format. Use YYYY-MM-DD." });
      }

      // Ensure resource name is valid (replace this with your actual resource name validation logic)

      // Attempt to insert the booking request
      const rows = await insertReqResource(
        resourceId,
        req.session.user.userName,
        resourceDate,
        description,
        "pending",
        "student"
      );

      // Check the result of the insertion
      if (rows.affectedRows === 1) {
        return res.status(200).json({
          message: "Resource booking request submitted successfully.",
        });
      } else {
        throw new Error(
          "Failed to insert booking request. Please try again later."
        );
      }
    } catch (error) {
      console.error("Error processing booking request:", error);

      // Handle known errors
      if (error.code === "ER_BAD_FIELD_ERROR") {
        return res
          .status(500)
          .json({ message: "Database error: Invalid field name." });
      }

      // General fallback error handler
      return res.status(500).json({
        message: "An unexpected error occurred. Please try again later.",
      });
    }
  }
);

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    res.clearCookie("connect.sid");
    res.redirect("/");
  });
});

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});
