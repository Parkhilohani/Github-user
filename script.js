const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".searchbtn");

async function getGithubProfile(username) {
    const profile = document.querySelector("#profile");
    if (!username) {
        profile.innerHTML = "<p>Enter the user name</p>";
        return;
    }

    const profileUrl = `https://api.github.com/users/${username}`;
    const reposUrl = `https://api.github.com/users/${username}/repos`;

    try {
        const profileResponse = await fetch(profileUrl);
        const profileData = await profileResponse.json();

        if (profileResponse.status === 404) {
            profile.innerHTML = "<p>User not found</p>";
            return;
        }

        const reposResponse = await fetch(reposUrl);
        const reposData = await reposResponse.json();

        // Sort repos by stars and take top 3
        const topRepos = reposData
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .slice(0, 3);

        let reposHTML = "<h3>Top 3 Repositories:</h3><ul>";
        topRepos.forEach(repo => {
            reposHTML += `
                <ul>
                    <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                    ⭐ ${repo.stargazers_count}
                </ul>`;
        });
        reposHTML += "</ul>";

        profile.innerHTML = `
            <h2>Name: ${profileData.name || "N/A"}</h2>
            <p>Bio: ${profileData.bio || "Bio not available"}</p>
            <img src="${profileData.avatar_url}" alt="Avatar image" width="100">
            <p>Created at: ${new Date(profileData.created_at).toDateString()}</p>
            <p>Updated at: ${new Date(profileData.updated_at).toDateString()}</p>
            <p>Public Repos: ${profileData.public_repos}</p>
            <a href="${profileData.html_url}" target="_blank">Visit Profile</a>
            ${reposHTML}
        `;
    } catch (error) {
        console.error(error);
        profile.innerHTML = "<p>Error fetching data</p>";
    }
}

searchBtn.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        getGithubProfile(searchBox.value.trim());
    }
});
searchBtn.addEventListener("click", () => {
    getGithubProfile(searchBox.value.trim());
});
