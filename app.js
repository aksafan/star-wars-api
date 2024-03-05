renderStarWarsCharachtersPage();

async function renderStarWarsCharachtersPage() {
    const sWPeopleData = await getSWPeople();
    await renderStarWarsCharachtersList(sWPeopleData.results);
    await renderPagination(sWPeopleData.previous, sWPeopleData.next);
}

async function renderStarWarsCharachtersList(list) {
    let content = document.querySelector('.content');
    content.innerHTML = "";

    await list.forEach(async person => {
        content.innerHTML = content.innerHTML += `<div class="person">
                                                    <h2>${person.name}</h2>
                                                    <div id="${person.uid}">
                                                    <button class="show-profile-button" onclick="renderProfileInfo(${person.uid});">Show profile</button>
                                                    </div>
                                                </div>`;
    });
}

async function renderPagination(prevLink, nextLink) {
    let buttons = document.querySelector('.buttons');
    buttons.innerHTML = "";
    if (prevLink) {
        renderPaginationButton("Previous", prevLink);
    }

    if (nextLink) {
        renderPaginationButton("Next", nextLink)
    }
}

async function renderProfileInfo(id) {
    let profile = await getSWPersonById(id);
    let properties = profile.result.properties;
    let profileBlock = document.getElementById(id);
    profileBlock.innerHTML = "";
    profileBlock.innerHTML = `<div>
                                <p>Height: ${properties.height}</p>
                                <p>Mass: ${properties.mass}</p>
                                <p>Hair color: ${properties.hair_color}</p>
                                <p>Skin color: ${properties.skin_color}</p>
                                <p>Eye color: ${properties.eye_color}</p>
                                <p>Birth year: ${properties.birth_year}</p>
                                <p>Gender: ${properties.gender}</p>
                            </div>`;
    profileBlock.append(html)
}

async function renderPaginationButton(text, apiUrl) {
    let buttons = document.querySelector('.buttons');
    const button = document.createElement("button");
    button.innerHTML = text;
    button.className = "pagination";
    button.addEventListener("click", async function () {
        const sWPeopleData = await getSWPeople(apiUrl);
        renderStarWarsCharachtersList(sWPeopleData.results);
        renderPagination(sWPeopleData.previous, sWPeopleData.next);

    })
    buttons.append(button);
}

async function getSWPeople(url = 'https://www.swapi.tech/api/people?page=1&limit=10') {
    return await getData(url);
}

async function getSWPersonById(id) {
    const url = `https://www.swapi.tech/api/people/${id}`;

    return await getData(url);
}

async function getData(url) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('There was a problem with the fetch operation');
    }
    const data = await response.json();

    return data;
}