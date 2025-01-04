const addNewStd = async (stdName, stdId, stdPass) => {
  try {
    const response = await fetch("http://localhost:8050/admin/newStd", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ stdName, stdId, stdPass }),
      credentials: "include",
    });
    if (response.ok) {
      const result = await response.json();
      if (result.message === "success") {
        alert("student added success");
      } else {
        alert("student not added");
      }
    } else {
      console.log("error in add new student");
    }
  } catch (error) {
    console.error(error);
  }
};
const addNewFac = async (facName, facId, facPass) => {
  try {
    const response = await fetch("http://localhost:8050/admin/newFaculty", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ facName, facId, facPass }),
      credentials: "include",
    });
    if (response.ok) {
      const result = await response.json();
      if (result.message === "success") {
        alert("facylty added success");
      } else {
        alert("faculty not added");
      }
    } else {
      console.log("error in add new faculty");
    }
  } catch (error) {
    console.error(error);
  }
};

const approveRequest = async (reqId) => {
  try {
    const response = await fetch(
      `http://localhost:8050/admin/acceptReq/${reqId}`,
      {
        method: "PUT",
      }
    );
    if (response.ok) {
      const result = await response.json();
      return result;
    }
  } catch (error) {
    console.error(error);
  }
};
const rejectReq = async (reqId) => {
  try {
    const response = await fetch(
      `http://localhost:8050/admin/rejectReq/${reqId}`,
      {
        method: "PUT",
      }
    );
    if (response.ok) {
      const result = await response.json();
      return result;
    }
  } catch (error) {
    console.error(error);
  }
};

document.querySelector("#addNewUser").addEventListener("submit", async (e) => {
  e.preventDefault();
  const stdName = document.querySelector("#sName").value.trim();
  const stdId = document.querySelector("#sid").value.trim();
  const stdPass = document.querySelector("#sPass").value.trim();
  await addNewStd(stdName, stdId, stdPass);
});
document
  .querySelector("#addNewFaculty")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const facName = document.querySelector("#fName").value.trim();
    const facId = document.querySelector("#fid").value.trim();
    const facPass = document.querySelector("#fPass").value.trim();
    await addNewFac(facName, facId, facPass);
  });

const acceptBtns = document.querySelectorAll(".approve-request");
const rejectBtns = document.querySelectorAll(".reject-request");

acceptBtns.forEach((acceptBtn) => {
  acceptBtn.addEventListener("click", async (event) => {
    if (confirm("Are you sure to Accept this request")) {
      const result = await approveRequest(acceptBtn.getAttribute("data-reqId"));
      if (result?.message === "success") {
        const fullBoxContainer = event.target.closest(".full-box-container");
        if (fullBoxContainer) {
         
          fullBoxContainer.remove();
        }
        alert("approved success");
      } else {
        alert("approved failed");
      }
    } else {
      return;
    }
  });
});
rejectBtns.forEach((rejectBtn) => {
  rejectBtn.addEventListener("click", async (event) => {
    if (confirm("Are you sure to Reject this request")) {
      const result = await rejectReq(rejectBtn.getAttribute("data-reqId"));
      if (result?.message === "success") {
        const fullBoxContainer = event.target.closest(".full-box-container");
        if (fullBoxContainer) {
         
          fullBoxContainer.remove();
        }
        alert("Rejected success");
      } else {
        alert("rejected failed");
      }
    } else {
      return;
    }
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
