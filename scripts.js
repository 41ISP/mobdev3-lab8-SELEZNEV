const songsContainer = document.querySelector(".tracks-list");
const statsContainer = document.querySelector(".stats");

async function fetchData() {
    try {
        const response = await fetch("https://kitek.ktkv.dev/songs.json");
        const songs = await response.json();

        let totalRuntime = 0;

        songs.forEach((item, index) => {
            const { track } = item;
            const { name, artists, album, duration_ms, popularity } = track;

            const authors = artists.map(a => a.name).join(", ");
            const duration = (duration_ms / 60000).toFixed(2);

            songsContainer.innerHTML += `
                <li class="track-item">
                    <div class="track-number">${index + 1}</div>
                    <div class="track-main">
                        <img class="album-art" src="${album.images[0].url}" alt="${album.name}">
                        <div class="track-info">
                            <div class="track-name">${name}</div>
                            <div>${authors}</div>
                            <div>${album.name}</div>
                        </div>
                    </div>
                    <div class="track-meta">
                        <div class="duration">${duration}</div>
                        <div class="popularity">♪ ${popularity}</div>
                    </div>
                </li>
            `;

            totalRuntime += duration_ms;
        });

        // Подсчет общей длительности
        const totalHours = Math.floor(totalRuntime / 3600000);
        const totalMinutes = Math.floor((totalRuntime % 3600000) / 60000);

        statsContainer.innerHTML = `
            <h5 class="total-duration">
                Треков: ${songs.length} | Общая длительность: ${totalHours} ч ${totalMinutes} мин
            </h5>
        `;
    } catch (err) {
        console.error("Ошибка загрузки данных:", err);
    }
}

fetchData();