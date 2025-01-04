document.getElementById("bookingForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const resource = document.getElementById("resource").value;
  const requestDate = document.getElementById("requestDate").value;
  const description = document.getElementById("description").value;

  if (!resource || !requestDate || !description) {
    alert("fill all fields");
    return;
  }

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(requestDate)) {
    alert("Invalid date format. Use YYYY-MM-DD.");
    return;
  }

  const data = {
    resourceId: resource,
    resourceDate: requestDate,
    description,
  };

  fetch("http://localhost:8050/student/bookResourse", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        alert("Resource booked successfuly");
        document.getElementById("bookingForm").reset();
      } else {
        alert("Failed to book resource");
      }
    })
    .catch((error) => {
      console.error(error);
      alert("Somethign went wrong");
    });
});

document.getElementById("logout-button").addEventListener("click", async () => {
  try {
    const response = await fetch("http://localhost:8050/logout", {
      method: "POST",
      credentials: "include", // Include session cookies
    });

    if (response.ok) {
      window.location.href = "/"; // Redirect to login after logout
    } else {
      alert("Error logging out");
    }
  } catch (error) {
    console.error("Error logging out:", error);
  }
});
