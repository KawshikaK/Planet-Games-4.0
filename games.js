const toggleBtn = document.getElementById('toggleBtn');
const navLinks = document.getElementById('navLinks');

toggleBtn.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

function updateSummary() {
    const tableBody = document.querySelector("#summaryTable tbody");
    tableBody.innerHTML = "";
    let total = 0;

    document.querySelectorAll("input[type='number']").forEach(input => {
        const quantity = parseInt(input.value);
        const price = parseFloat(input.getAttribute("data-price"));
        if (quantity > 0) {
            const itemName = input.name;
            const itemTotal = quantity * price;
            total += itemTotal;

            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${itemName}</td>
                <td>${quantity}</td>
                <td>$${itemTotal.toFixed(2)}</td>
            `;
            tableBody.appendChild(row);
        }
    });

    document.getElementById("totalPrice").textContent = `$${total.toFixed(2)}`;
}

// Update summary in real time
document.querySelectorAll("input[type='number']").forEach(input => {
    input.addEventListener("input", updateSummary);
});

// Add to Cart for accessories
document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", function (e) {
        e.preventDefault();
        const name = this.getAttribute("data-name");
        const price = parseFloat(this.getAttribute("data-price"));

        // Check if there's already an input for this item
        let input = document.querySelector(`input[name="${name}"]`);
        if (!input) {
            // Create hidden input if not already present
            input = document.createElement("input");
            input.type = "number";
            input.name = name;
            input.setAttribute("data-price", price);
            input.value = 0;
            input.min = 0;
            input.style.display = "none";
            document.body.appendChild(input);
        }

        input.value = parseInt(input.value) + 1;
        updateSummary();
    });
});

// Save current order to localStorage as favorite
function saveFavorites() {
    const formData = {};
    document.querySelectorAll("input[type='number']").forEach(input => {
        formData[input.name] = input.value;
    });
    localStorage.setItem("favoriteOrder", JSON.stringify(formData));
    alert("Favorite order saved!");
}

// Store selected items and go to checkout
function goToCheckout() {
    const summary = [];

    document.querySelectorAll("input[type='number']").forEach(input => {
        const quantity = parseInt(input.value);
        const price = parseFloat(input.getAttribute("data-price"));
        if (quantity > 0) {
            summary.push({ name: input.name, quantity, price });
        }
    });

    if (summary.length === 0) {
        alert("Please add at least one item to your order.");
        return;
    }

    localStorage.setItem("summaryItems", JSON.stringify(summary));
    window.location.href = "order.html";
}
