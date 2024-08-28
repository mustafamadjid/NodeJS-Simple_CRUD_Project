const url = "http://localhost:3000/";

// Update User Data
const currentUrlPage = window.location.href;
const urlPageParams = new URLSearchParams(window.location.search);

const currentUserId = Number(urlPageParams.get("user_id"));
const currentUserName = urlPageParams.get("user_name");
const currentUserAge = Number(urlPageParams.get("user_age"));
const currentUserEmail = urlPageParams.get("user_email");
const currentUserAddress = urlPageParams.get("user_address");
const currentUserPhone = urlPageParams.get("user_phone");

const userName = document.getElementById("user_name");
const userAge = document.getElementById("user_age");
const userEmail = document.getElementById("user_email");
const userAddress = document.getElementById("user_address");
const userPhone = document.getElementById("user_phone");

console.log(
  currentUserId,
  currentUserName,
  currentUserAge,
  currentUserEmail,
  currentUserAddress,
  currentUserPhone
);

userName.value = currentUserName;
userAge.value = currentUserAge;
userEmail.value = currentUserEmail;
userAddress.value = currentUserAddress;
userPhone.value = currentUserPhone;

const updateForm = document.getElementById("update-form");

async function updateUserData() {
  const formData = new FormData(updateForm);

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: currentUserId,
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

updateForm.addEventListener("submit", function (event) {
  event.preventDefault();
  if (confirm("Apakah anda yakin ingin mengubah data?")) {
    updateUserData();
    updateForm.reset();
  }
});
