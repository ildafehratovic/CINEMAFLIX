        // Render movies
        function renderMovies(filter = 'all') {
            const movieGrid = document.getElementById('movieGrid');
            const filteredMovies = filter === 'all' ? movies : movies.filter(m => m.category === filter);
            
            movieGrid.innerHTML = filteredMovies.map(movie => `
                <div class="col-lg-4 col-md-6 fade-in">
                    <div class="movie-card">
                        <img src="${movie.imageThumbnail}" alt="${movie.title}" class="movie-img">
                        <div class="movie-info">
                            <h3 class="movie-title">${movie.title}</h3>
                            <p class="movie-year">${movie.releaseYear} | ${movie.category} | ${movie.runtime}</p>
                            <div class="movie-rating">
                                <span class="rating-badge">IMDb: ${movie.imdbRating}</span>
                                <span class="rating-badge">RT: ${movie.rottenTomatoesRating}%</span>
                            </div>
                            <p class="movie-description">${movie.shortDescription}</p>
                            <button class="btn btn-watch">Watch Now</button>
                        </div>
                    </div>
                </div>
            `).join('');

            // Trigger fade-in animation
            setTimeout(() => {
                document.querySelectorAll('.fade-in').forEach(el => {
                    if (isInViewport(el)) {
                        el.classList.add('visible');
                    }
                });
            }, 100);
        }

        // Filter buttons
        document.querySelectorAll('.btn-filter').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.btn-filter').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                renderMovies(this.dataset.filter);
            });
        });

        // Scroll animations
        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }

        function checkScroll() {
            document.querySelectorAll('.fade-in').forEach(el => {
                if (isInViewport(el)) {
                    el.classList.add('visible');
                }
            });
        }

        window.addEventListener('scroll', checkScroll);
        window.addEventListener('load', () => {
            renderMovies();
            checkScroll();
        });

        // Smooth scroll for nav links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
   