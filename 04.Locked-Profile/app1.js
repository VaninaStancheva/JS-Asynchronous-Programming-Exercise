document.addEventListener("DOMContentLoaded", async () => {
    const main = document.getElementById("main");

    try {
        // Fetch user data
        const response = await fetch("http://localhost:3030/jsonstore/advanced/profiles");
        const data = await response.json();

        // Iterate over each user and create profile cards
        Object.values(data).forEach((user, index) => {
            main.appendChild(createProfileCard(user, index + 1));
        });
    } catch (err) {
        console.error("Failed to fetch profiles:", err);
    }
});

function createProfileCard(user, index) {
    // Create profile card elements
    const profileCard = document.createElement("div");
    profileCard.className = "profile";

    profileCard.innerHTML = `
        <img src="./iconProfile2.png" class="userIcon">
        <label>Lock</label>
        <input type="radio" name="user${index}Locked" value="lock" checked>
        <label>Unlock</label>
        <input type="radio" name="user${index}Locked" value="unlock">
        <br>
        <hr>
        <label>Username</label>
        <input type="text" name="user${index}Username" value="${user.username}" disabled readonly>
        <div id="user${index}HiddenFields" class="hidden">
            <hr>
            <label>Email:</label>
            <input type="email" name="user${index}Email" value="${user.email}" disabled readonly>
            <label>Age:</label>
            <input type="text" name="user${index}Age" value="${user.age}" disabled readonly>
        </div>
        <button>Show more</button>
    `;

    // Add functionality to the Show more/Hide it button
    const button = profileCard.querySelector("button");
    const hiddenFields = profileCard.querySelector(`#user${index}HiddenFields`);
    const lockRadio = profileCard.querySelector(`input[name="user${index}Locked"][value="lock"]`);
    const unlockRadio = profileCard.querySelector(`input[name="user${index}Locked"][value="unlock"]`);

    button.addEventListener("click", () => {
        if (unlockRadio.checked) {
            if (hiddenFields.classList.contains("hidden")) {
                hiddenFields.classList.remove("hidden");
                button.textContent = "Hide it";
            } else {
                hiddenFields.classList.add("hidden");
                button.textContent = "Show more";
            }
        }
    });

    return profileCard;
}
