const url = "http://localhost:3000/";

// Delete USer Data
const deleteUrlPage = window.location.href;
const deleteUrlPageParams = new URLSearchParams(window.location.search);

const userDeleteId = Number(deleteUrlPageParams.get("user_id"));

console.log(userDeleteId);
async function deleteUserDataFromServer() {
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userDeleteId,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return "Error deleting user: " + error.message;
  }
}

deleteUserDataFromServer();
alert("Data berhasil dihapus");
window.location.href = "service.html";
