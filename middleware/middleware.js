// Protect Routes
function ensureAdminAuthenticated(req, res, next) {
  if (req?.session?.user?.role === "admin") {
    return next();
  } else {
    return res.redirect("/admin/login");
  }
}
function adminLogged(req, res, next) {
  if (req?.session?.user?.role === "admin") {
    res.redirect("/admin/dashboard");
  } else {
    next();
  }
}
function facultyLogged(req, res, next) {
  if (req?.session?.user?.role === "faculty") {
    return res.redirect("/faculty/dashboard");
  } else {
    return next();
  }
}
function studentLogged(req, res, next) {
  if (req?.session?.user?.role === "student") {
    return res.redirect("/student/dashboard");
  } else {
    return next();
  }
}
function ensureFacultyAuthenticated(req, res, next) {
  if (req?.session?.user?.role === "faculty") {
    return next();
  } else {
    return res.redirect("/faculty/login");
  }
}
function ensureStudentAuthenticated(req, res, next) {
  if (req?.session?.user?.role === "student") {
    return next();
  } else {
    return res.redirect("/student/login");
  }
}
module.exports = {
  ensureFacultyAuthenticated,
  ensureAdminAuthenticated,
  ensureStudentAuthenticated,
  adminLogged,
  facultyLogged,
  studentLogged,
};