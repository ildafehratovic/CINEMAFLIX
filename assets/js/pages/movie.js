document.addEventListener("DOMContentLoaded", () => {
  const featuredMovies = [
    {
      id: 1,
      image: "../assets/img/The Shawshank Redemption Poster.jpeg",
      title: "The Shawshank Redemption",
    },
    {
      id: 2,
      image: "../assets/img/The Godfather poster.jpeg",
      title: "The Godfather",
    },
    {
      id: 3,
      image: "../assets/img/The dark knight poster.jpeg",
      title: "The Dark Knight",
    },
    {
      id: 4,
      image: "../assets/img/Angry Men poster .jpeg",
      title: "12 Angry ",
    },
    {
      id: 5,
      image: "../assets/img/Schindler's List poster.jpeg",
      title: "Schindler's List",
    },
    {
      id: 6,
      image:
        "../assets/img/The Lord of the Rings - The Return of the King poster.jpeg",
      title: "The Lord of the Rings: The Return of the King",
    },
    {
      id: 7,
      image: "../assets/img/Pulp fiction fun fact poster.jpeg",
      title: "Pulp Fiction",
    },
    {
      id: 8,
      image:
        "../assets/img/The Lord of The Rings - The Fellowship of the Ring poster.jpeg.jpeg",
      title: "The Lord of the Rings: The Fellowship of the Ring",
    },
    {
      id: 9,
      image: "../assets/img/Forest Gump poster.jpeg",
      title: "Forrest Gump",
    },
    {
      id: 10,
      image: "../assets/img/Inception (2010) postrer.jpeg",
      title: "Inception",
    },
  ];

  async function loadMovies() {
    try {
      const response = await fetch(
        "https://vebdizajn-4.onrender.com/api/vebdizajn/filmovi",
      );
      const movies = await response.json();

      const container = document.getElementById("movies");
      const loading = document.getElementById("loading");
      loading.style.display = "none";

      const featuredMap = {};
      featuredMovies.forEach((movie) => {
        if (movie.title) {
          const normalizedTitle = movie.title.toLowerCase().trim();
          featuredMap[normalizedTitle] = movie.image;
        }
      });

      movies.forEach((movie) => {
        const card = document.createElement("div");
        card.className = "card";

        const img = document.createElement("img");
        let imageSrc = null;

        const featuredById = featuredMovies.find((fm) => fm.id === movie.id);
        if (featuredById) {
          imageSrc = featuredById.image;
        }

        if (!imageSrc && movie.Naziv) {
          const normalizedTitle = movie.Naziv.toLowerCase().trim();
          if (featuredMap[normalizedTitle]) {
            imageSrc = featuredMap[normalizedTitle];
          }
        }

        if (imageSrc) {
          img.src = imageSrc;
        } else if (movie.Slika) {
          img.src = movie.Slika;
        } else {
          img.src = "https://via.placeholder.com/400x350?text=No+Image";
        }

        img.alt = movie.Naziv;
        card.appendChild(img);

        const content = document.createElement("div");
        content.className = "card-content";

        const title = document.createElement("h2");
        title.className = "movie-title";
        title.textContent = movie.Naziv;
        content.appendChild(title);

        if (movie.GodinaIzdanja) {
          const year = document.createElement("span");
          year.className = "movie-year";
          year.textContent = movie.GodinaIzdanja;
          content.appendChild(year);
        }

        if (movie.Opis) {
          const desc = document.createElement("p");
          desc.className = "movie-desc";
          desc.textContent = movie.Opis;
          content.appendChild(desc);
        }

        card.appendChild(content);
        container.appendChild(card);
      });
    } catch (error) {
      document.getElementById("loading").textContent =
        "Failed to load movies 😢";
      console.error(error);
    }
  }

  loadMovies();
});
