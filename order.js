const toggleBtn = document.getElementById('toggleBtn');
const navLinks = document.getElementById('navLinks');

toggleBtn.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

document.addEventListener("DOMContentLoaded", () => {
    const summaryData = JSON.parse(localStorage.getItem("summaryItems")) || [];
    const tableBody = document.querySelector("#orderTable tbody");
    let total = 0;

    summaryData.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>$${(item.quantity * item.price).toFixed(2)}</td>
        `;
        total += item.quantity * item.price;
        tableBody.appendChild(row);
    });

    document.getElementById("finalTotal").textContent = `$${total.toFixed(2)}`;
});

document.getElementById("paymentForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const form = e.target;
    const allFilled = [...form.elements].every(el => el.type !== "submit" && el.value.trim() !== "");

    if (!allFilled) {
        alert("Please fill in all fields correctly.");
        return;
    }

    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3); // 3 days from now

    document.getElementById("checkout-form").style.display = "none";
    document.getElementById("order-review").style.display = "none";
    const message = `Your order has been placed successfully! Expected delivery date: ${deliveryDate.toDateString()}`;
    document.getElementById("messageText").textContent = message;
    document.getElementById("confirmationMessage").style.display = "block";
});
