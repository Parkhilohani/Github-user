const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".searchbtn");

async function getGithubProfile(username){
    const Url = `https://api.github.com/users/${username}`;
    const repoUrl = `https://api.github.com/users/${username}/repos`;
    const profile = document.querySelector("#profile");
    if(!username){
        profile.innerHTML = "<p>Enter the user name</p>";
        return;
    }

    try{
        const response = await fetch(Url);
        console.log(response);
        let data = await response.json();
        console.log(data);

        if(response.status == 404){
            profile.innerHTML = "<p>User not found</p>"
        }else{
            profile.innerHTML = 
            `<h2>Name :${data.name}</h2>
            <p>Bio:${data.bio || "bio not available"}</p>
            <img src="${data.avatar_url}" alt="Avatar image" width="100">
            <p>Created at :${new Date(data.created_at).toDateString()}</p>
            <p>Updated at :${new Date(data.updated_at).toDateString()}</p>
            <p>Public repo :${data.public_repos}</p>
            <a href="${data.html_url}" target="_blank">Visit Profile</a>`
        }
    }catch(error){
        profile.innerHTML = "<p>Error fetching data</p>";
    }
}
searchBtn.addEventListener("keypress", (e) => {
    if(e.key == "Enter"){
        getGithubProfile(searchBox.value.trim());
    }
})
searchBtn.addEventListener("click", () => {
    getGithubProfile(searchBox.value.trim());
});