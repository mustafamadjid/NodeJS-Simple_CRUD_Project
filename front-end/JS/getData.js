const url = "http://localhost:3000/";

// Get User Data

const table = document.getElementById("table-body");

async function getUserDataFromServer() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

getUserDataFromServer().then(function (response) {
  if (response) {
    const rows = response.data
      .map((data) => {
        return `
        <tr>
          <td>${data.user_id}</td>
          <td>${data.user_name}</td>
          <td>${data.user_age}</td>
          <td>${data.user_email}</td>
          <td>${data.user_address}</td>
          <td>${data.user_phone}</td>
          <td>
          <a href="update-form.html?user_id=${data.user_id}&user_name=${data.user_name}&user_age=${data.user_age}&user_email=${data.user_email}&user_address=${data.user_address}&user_phone=${data.user_phone}">
          <button type="button" id="edit" class="edit-btn manage-btn"> Edit</button></a>
          
          <a href="delete-response.html?user_id=${data.user_id}"><button type = "button" id="delete" class = "delete-btn manage-btn" onclick="return confirm('Apakah anda yakin ingin menghapus data?')">Delete</button></a>
          
          </td>

        </tr>`;
      })
      .join("");
    table.innerHTML = rows;
  }
});
