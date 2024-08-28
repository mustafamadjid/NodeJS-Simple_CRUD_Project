const url = "http://localhost:3000/";

// Add New User Data
const form = document.getElementById("form-data");
async function addNewUserData() {
  const formData = new FormData(form);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_name: formData.get("user_name"),
        user_age: formData.get("user_age"),
        user_email: formData.get("user_email"),
        user_address: formData.get("user_address"),
        user_phone: formData.get("user_phone"),
      }),
    });

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error adding data:", error);
  }
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  if (confirm("Apakah anda yakin ingin menambahkan data?")) {
    addNewUserData();
    updateForm.reset();
  }
});
