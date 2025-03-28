// Follow the README.md to set up the rest of this file.

document.addEventListener("DOMContentLoaded", () => {
    const genreSelect = document.getElementById("genre-selector");
    const ratingSelect = document.getElementById("rating-selector");
    const table = document.querySelector("table");
    const alertBox = document.querySelector(".alert");
    const tbody = table.querySelector("tbody");

    genreSelect.addEventListener("change", updateMovies);
    ratingSelect.addEventListener("change", updateMovies);

    updateMovies(); // Load movies on page load

    async function updateMovies() {
        const genre = genreSelect.value;
        const rating = ratingSelect.value;

        try {
            const movies = await fetchMovies(genre, rating);

            // Sort movies by rating from low to high
            movies.sort((a, b) => a.rating - b.rating);

            // Show/hide based on movie count
            if (movies.length === 0) {
                table.classList.add("d-none");
                alertBox.classList.remove("d-none");
            } else {
                table.classList.remove("d-none");
                alertBox.classList.add("d-none");
                insertMoviesIntoTable(tbody, movies);
            }
        } catch (err) {
            console.error("Error fetching movies:", err.message);
            alertBox.classList.remove("d-none");
            table.classList.add("d-none");
        }
    }
});

/*
 *  fetchMovies
 *  Uses URLSearchParams, URL, Headers, and Request.
 */
async function fetchMovies(genre = null, rating = null) {
    const url = new URL("/api/movies", window.location.origin);
    const params = new URLSearchParams();

    if (genre) params.append("genre", genre);
    if (rating) params.append("rating", rating);

    url.search = params.toString();

    const headers = new Headers({
        "Accept": "application/json"
    });

    const request = new Request(url, {
        method: "GET",
        headers: headers
    });

    const response = await fetch(request);

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
}

/*
 *  insertMoviesIntoTable
 *  Populates <tbody> with movie rows.
 */
function insertMoviesIntoTable(tbody, movies) {
    tbody.innerHTML = ""; // Clear previous results

    movies.forEach(movie => {
        const row = tbody.insertRow();

        // Insert cells for movie attributes
        const titleCell = row.insertCell();
        const genreCell = row.insertCell();
        const releaseDateCell = row.insertCell(); // Single cell for release date
        const directorCell = row.insertCell();
        const ratingCell = row.insertCell();

        titleCell.textContent = movie.title;
        genreCell.textContent = movie.genre;

        // Format release date (Unix timestamp) to "yyyy-mm-dd , hh:mm:ss am/pm"
        const releaseDate = new Date(movie.release_date * 1000);
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
        };
        const formattedDateTime = releaseDate.toLocaleString('en-US', options);
        const [datePart, timePart] = formattedDateTime.split(', ');
        const [month, day, year] = datePart.split('/');
        const isoDate = `${year}-${month}-${day}`;
        releaseDateCell.textContent = `${isoDate} , ${timePart}`; // Single assignment

        directorCell.textContent = movie.director;
        ratingCell.textContent = movie.rating;


        // Apply row color based on rating
        const rating = parseFloat(movie.rating);


        // if a movie is rated two or below, make this row red
        if (movie.rating <= 2) row.classList.add("table-danger");
        // if this movie is rated higher than two but less than or equal to five, make this row orange
        else if (movie.rating > 2 && movie.rating <= 5) row.classList.add("table-warning");
        // if this movie is rated higher than five but less than or equal to 8, make this row blue
        else if (movie.rating > 5 && movie.rating <= 8) row.classList.add("table-info");
        // if this movie is rated higher than eight, make this row green
        else if (movie.rating > 8) row.classList.add("table-success");
    });
}
