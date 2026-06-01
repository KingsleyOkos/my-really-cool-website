
    document.addEventListener('DOMContentLoaded', function () {
    // ===== PWA Install Button Functionality =====
    let deferredPrompt;
    const installButton = document.getElementById('install-button');

    window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (installButton) {
        installButton.style.display = 'inline-block';
    }
    });

    if (installButton) {
    installButton.addEventListener('click', async () => {
        installButton.style.display = 'none';
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log('User response to the install prompt:', outcome);
        deferredPrompt = null;
    });
    }

  
      // ===== Check PWA Standalone Mode =====
      if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
        document.title = "My Really Cool App";
        const heading = document.getElementById('site-heading');
        if (heading) {
          heading.textContent = "My Really Cool App";
        }
      }
  
      // ===== Email Link Device-Specific Handling =====
      var email = "contact.kingokos@gmail.com";
      var emailLink = document.getElementById('emailLink');
      if (emailLink) {
        if (/Mobi|Android/i.test(navigator.userAgent)) {
          emailLink.href = "mailto:" + email;
        } else {
          emailLink.href = "https://mail.google.com/mail/?view=cm&fs=1&to=" + email;
          emailLink.target = "_blank";
        }
      }
  
// ===== jQuery Ready: Initialize Slick Carousel =====
  $(document).ready(function () {
    
    async function loadAndInitializeCarousel() {
      const sliderContainer = $(".polaroid-slider");
      
      try {
        // 1. Fetch the JSON data
        const response = await fetch('data/photos.json');
        if (!response.ok) throw new Error('Failed to load photos');
        const photos = await response.json();
        const totalPhotos = photos.length;

        // 2. Build HTML strings
        let slidesHtml = '';
        
        photos.forEach((photo, index) => {
          // Create the counter string, e.g., "1/15"
          const counterText = `${index + 1}/${totalPhotos}`;
          
        slidesHtml += `
                <div class="polaroid-slide">
                  <img 
                    src="${photo.src}" 
                    class="polaroid-slider-image" 
                    alt="${photo.title}" 
                  />
                  
                  <div class="polaroid-caption">
                    <div class="caption-text">
                      <h4 class="kalam-bold">${photo.title}</h4>
                      <p class="kalam-regular">${photo.description}</p>
                    </div>
                    <div class="caption-counter kalam-regular">
                      ${counterText}
                    </div>
                  </div>
                </div>
              `;
            });

        // 3. Inject HTML
        sliderContainer.html(slidesHtml);

        // 4. Initialize Slick (Moved inside this function)
        initializeSlick();

      } catch (error) {
        console.error('Error loading photography:', error);
      }
    }

    function initializeSlick() {
      // Destroy if it already exists (useful for resize events)
      if ($(".polaroid-slider").hasClass('slick-initialized')) {
        $(".polaroid-slider").slick('unslick');
      }

      $(".polaroid-slider").slick({
        arrows: false,
        slidesToShow: 1,
        infinite: true,
        dots: false, // Turned off default dots
        lazyLoad: 'progressive',
        autoplay: true,
        autoplaySpeed: 8000,
        fade: false,
        cssEase: 'cubic-bezier(0.3, 0.7, 0.5, 0.95)',
        speed: 280,
        touchThreshold: 12
      });
    }

    // Run the load function
    loadAndInitializeCarousel();

    // Resize handler (Just re-inits the slider logic if needed)
    $(window).resize(function () {
      // Only re-init if images are already loaded
      if ($(".polaroid-slide").length > 0) {
         initializeSlick();
      }
    });
  });
  
    // ===== TYPING ANIMATION =====
    const aboutMeText = document.getElementById('about-me-text');
    const swapButton = document.getElementById('swap-button');

    if (aboutMeText && swapButton) {
    const textBlocks = [
        "Lover of Kiwis, Hater of Pandas.",
        "I was almost named Lesley",
        "I think science is pretty cool",
        "Stolen Dance is my favourite song",
        "I LOVE Capri Suns.",
        "I've hosted 3 award shows!",
        "Poetry goes hard",
        "Strength training is fun asf",
        "I collect vinyls",
        "Is maith liom Corcaigh",
        "Study electronics they said...",
        "I enjoy photography",
        "I owned a comic cartel in primary school",
        "Growing a funky afro & beard rn",
        "Midori is my favourite drink",
        "Midori and Club Lemon :)",
        "I was due to be born on Christmas day",
        "I ate 6 weetabix easily as a toddler",
        "Hozier is my favourite artist",
        "S/o to Midleton",
        "Lindsey is the GOAT",
        "Enjoy your day :)",
        "I've had malaria before, it's not fun...",
        "Baldur's Gate 3 is my favourite game",
        "My middle name is James",
        "My confirmation name is Andrew",
        "My first job was as a trainee surveyor",
        "I get sick like once a leap year",
        "We're so back",
        "It's over",
        "There's a cool story behind my surname",
        "Issac Newton and I have the same b-day",
        "How do I play piano help",
        "I think... I miss my wife",
        "Ní maith liom Baile Átha Cliath",
        "Have I mentioned that I dont like Dublin??",
        "All Together Now 2025 was amazing",
        "Don't drink blue smirnoff.",
        "Skating has disintegrated my vans",
        "Jollof rice slaps",
        "Adding Clash Royale experience to my CV"
    ];

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
        }
    }

    let shuffledBlocks = [...textBlocks];
    shuffleArray(shuffledBlocks);
    let currentIndex = 0;

    function typeWriter(newText) {
        let index = 0;
        let currentText = aboutMeText.textContent;
        swapButton.disabled = true;

        const backspaceInterval = setInterval(() => {
        if (currentText.length > 0) {
            currentText = currentText.slice(0, -1);
            aboutMeText.textContent = currentText;
        } else {
            clearInterval(backspaceInterval);
            const typingInterval = setInterval(() => {
            if (index < newText.length) {
                aboutMeText.textContent += newText.charAt(index);
                index++;
            } else {
                clearInterval(typingInterval);
                swapButton.disabled = false;
            }
            }, 35);
        }
        }, 25);
    }

    function swapText() {
        if (currentIndex >= shuffledBlocks.length) {
        shuffleArray(shuffledBlocks);
        currentIndex = 0;
        }
        const newText = shuffledBlocks[currentIndex];
        currentIndex++;
        typeWriter(newText);
    }

    swapText();
    swapButton.addEventListener('click', swapText);
    }

  
    // ===== PLAYLIST SWITCHING =====
    const playlists = document.querySelectorAll('.playlist');
    const prevButton = document.getElementById('prevPlaylist');
    const nextButton = document.getElementById('nextPlaylist');

    if (playlists.length > 0 && prevButton && nextButton) {
    let currentPlaylist = 0;

    function updatePlaylistDisplay() {
        playlists.forEach((playlist, index) => {
        playlist.classList.toggle('active', index === currentPlaylist);
        });
        prevButton.disabled = currentPlaylist === 0;
        nextButton.disabled = currentPlaylist === playlists.length - 1;
    }

    prevButton.addEventListener('click', () => {
        if (currentPlaylist > 0) {
        currentPlaylist--;
        updatePlaylistDisplay();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentPlaylist < playlists.length - 1) {
        currentPlaylist++;
        updatePlaylistDisplay();
        }
    });

    updatePlaylistDisplay();
    }

  
      // ===== Dynamic Preconnect for Spotify & Lazy Load IFRAMES =====
      // Dynamic Preconnect for Spotify
      const spotifyContainer = document.querySelector('.spotify-container');
      if (spotifyContainer) {
        const spotifyPreconnectObserver = new IntersectionObserver(
          (entries, observer) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                const link = document.createElement('link');
                link.rel = 'preconnect';
                link.href = 'https://open.spotify.com';
                link.crossOrigin = 'anonymous';
                document.head.appendChild(link);
                observer.disconnect(); // Run only once
              }
            });
          },
          { rootMargin: '800px' } 
        );
        spotifyPreconnectObserver.observe(spotifyContainer);
      }

      // ==== Lazy Load IFRAMES with IntersectionObserver ====
      const lazyIframes = document.querySelectorAll('.lazy-load-iframe');
      if ('IntersectionObserver' in window) {
        const iframeObserver = new IntersectionObserver(
          (entries, observer) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                const iframe = entry.target;
                // Directly swap the src without delay
                iframe.src = iframe.getAttribute('data-src');
                iframe.removeAttribute('data-src');
                observer.unobserve(iframe);
              }
            });
          },
          { rootMargin: "700px" }
        );
        lazyIframes.forEach(iframe => {
          iframeObserver.observe(iframe);
        });
      } else {
        // Fallback for browsers without IntersectionObserver support
        lazyIframes.forEach(iframe => {
          iframe.src = iframe.getAttribute('data-src');
          iframe.removeAttribute('data-src');
        });
      }
       
  
      // ===== MODAL Functionality =====
      var modal = document.getElementById('newsletter-modal');
      var bell = document.getElementById('notification-bell');
      var closeBtn = document.querySelector('.close');
      bell.addEventListener('click', function (e) {
        e.preventDefault();
        modal.style.display = 'flex';
        document.body.classList.add('modal-open');
      });
      closeBtn.addEventListener('click', function () {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
      });
      window.addEventListener('click', function (event) {
        if (event.target == modal) {
          modal.style.display = 'none';
          document.body.classList.remove('modal-open');
        }
      });
  
      // ===== Hamburger Menu =====
      var hamburgerToggle = document.getElementById('hamburger-toggle');
      var slidingMenu = document.getElementById('sliding-menu');
      var menuOverlay = document.getElementById('menu-overlay');
      var menuOpen = false;
      function openMenu() {
        var icon = hamburgerToggle.querySelector("i");
        icon.style.transform = "rotate(90deg)";
        setTimeout(function(){
          icon.classList.remove("fa-bars");
          icon.classList.add("fa-times");
          icon.style.transform = "rotate(0deg)";
        }, 300);
        slidingMenu.style.transform = "translateX(0)";
        menuOverlay.style.display = 'block';
        setTimeout(function(){
          menuOverlay.style.opacity = '1';
        }, 10);
        menuOpen = true;
        hamburgerToggle.blur();
      }
      function closeMenu() {
        var icon = hamburgerToggle.querySelector("i");
        icon.style.transform = "rotate(90deg)";
        setTimeout(function(){
          icon.classList.remove("fa-times");
          icon.classList.add("fa-bars");
          icon.style.transform = "rotate(0deg)";
        }, 300);
        slidingMenu.style.transform = "translateX(100%)";
        menuOverlay.style.opacity = '0';
        setTimeout(function(){
          menuOverlay.style.display = 'none';
        }, 500);
        menuOpen = false;
        hamburgerToggle.blur();
      }
      hamburgerToggle.addEventListener('click', function(e) {
        e.preventDefault();
        if (!menuOpen) {
          openMenu();
        } else {
          closeMenu();
        }
      });
      menuOverlay.addEventListener('click', function(){
        if (menuOpen) {
          closeMenu();
        }
      });
      document.querySelectorAll('#sliding-menu a').forEach(function(link) {
        link.addEventListener('click', function() {
          if (menuOpen) {
            closeMenu();
          }
        });
      });
  
    // ===== Watchlist and Search Functionality =====
    const tableBody = document.getElementById('theListBody');
    const toggleWatchedButton = document.getElementById('toggleWatched');
    const searchInput = document.getElementById('searchInput');

    if (tableBody && toggleWatchedButton && searchInput) {
    let watchlist = [
        // Section 1: Non-watched (sort alphabetically)
        { title: "Adventure Time", rating: null, watched: false },
        { title: "Back to the Future", rating: null, watched: false },
        { title: "Baki (2016)", rating: null, watched: false },
        { title: "Berserk 1997", rating: null, watched: false },
        { title: "Better Call Saul", rating: null, watched: false },
        { title: "BlackBerry", rating: null, watched: false},
        { title: "Blade Runner 2049", rating: null, watched: false },
        { title: "Breaking Bad", rating: null, watched: false },
        { title: "Brooklyn Nine-Nine", rating: null, watched: false },
        { title: "Castlevania", rating: null, watched: false },
        { title: "Chernobyl", rating: null, watched: false },
        { title: "Cowboy Be-Bop", rating: null, watched: false },
        { title: "Criminal Minds", rating: null, watched: false },
        { title: "Daredevil", rating: null, watched: false },
        { title: "Daredevil: Born Again", rating: null, watched: false },
        { title: "Die Hard", rating: null, watched: false },
        { title: "Dragonball", rating: null, watched: false },
        { title: "Fallout", rating: null, watched: false },
        { title: "Game of Thrones", rating: null, watched: false },
        { title: "Gravity Falls", rating: null, watched: false },
        { title: "How to Train your Dragon 3", rating: null, watched: false },
        { title: "Inception", rating: null, watched: false },
        { title: "Interstellar", rating: null, watched: false },
        { title: "JoJo's Bizarre Adventure", rating: null, watched: false },
        { title: "Joker 2", rating: null, watched: false },
        { title: "Killers of the Flower Moon", rating: null, watched: false },
        { title: "Loki", rating: null, watched: false },
        { title: "Long Story Short", rating: null, watched: false },
        { title: "Mamma Mia", rating: null, watched: false },
        { title: "Moon Knight", rating: null, watched: false },
        { title: "Pantheon", rating: null, watched: false },
        { title: "Parasite", rating: null, watched: false },
        { title: "Peaky Blinders", rating: null, watched: false },
        { title: "Princess Mononoke", rating: null, watched: false },
        { title: "Ratatouille", rating: null, watched: false },
        { title: "Saving Private Ryan", rating: null, watched: false },
        { title: "Scavengers Reign", rating: null, watched: false },
        { title: "Scott Pilgrim vs The World", rating: null, watched: false },
        { title: "Sex, Lies, and Videotape", rating: null, watched: false },
        { title: "Shōgun", rating: null, watched: false },
        { title: "Squid Game (S2)", rating: null, watched: false },
        { title: "Star Wars (Original Trilogy)", rating: null, watched: false },
        { title: "The Backrooms", rating: null, watched: false },
        { title: "The Big Bang Theory", rating: null, watched: false },
        { title: "The Boys", rating: null, watched: false },
        { title: "The Dark Knight", rating: null, watched: false },
        { title: "The Dark Knight Rises", rating: null, watched: false },
        { title: "The Drama", rating: null, watched: false },
        { title: "The Founder", rating: null, watched: false},
        { title: "The Godfather", rating: null, watched: false },
        { title: "The Godfather Part II", rating: null, watched: false },
        { title: "The Last of Us", rating: null, watched: false },
        { title: "The Legend of Korra", rating: null, watched: false },
        { title: "The Lord of the Rings", rating: null, watched: false },
        { title: "The Penguin", rating: null, watched: false },
        { title: "The Princess Bride", rating: null, watched: false },
        { title: "The Shawshank Redemption", rating: null, watched: false },
        { title: "The Sopranos", rating: null, watched: false },
        { title: "The Stolen Girl", rating: null, watched: false },
        { title: "The Theory of Everything", rating: null, watched: false },
        { title: "The Witcher: Nightmare of the Wolf", rating: null, watched: false },
        { title: "Vinland Saga", rating: null, watched: false },
        { title: "Whiplash", rating: null, watched: false },

        // Section 2: Watched shows
        { title: "Across The Spider-Verse", rating: 100, watched: true },
        { title: "Avatar the Last Airbender", rating: 100, watched: true },
        { title: "Into The Spider-Verse", rating: 99, watched: true },
        { title: "Bojack Horseman", rating: 98, watched: true },
        { title: "Severance", rating: 97, watched: true },
        { title: "Mob Psycho 100", rating: 96, watched: true},
        { title: "Adolescence", rating: 95, watched: true },
        { title: "Everything Everywhere All at Once", rating: 94, watched: true },
        { title: "Cyberpunk: Edgerunners", rating: 93, watched: true },
        { title: "Superman (2025)", rating: 92, watched: true},
        { title: "Arcane (S1)", rating: 91, watched: true },
        { title: "Project Hail Mary", rating: 90, watched: true },
        { title: "Black Mirror (S1-6)", rating: 89, watched: true},
        { title: "Invincible (S4)", rating: 88, watched: true },
        { title: "To Be Hero X", rating: 87, watched: true},
        { title: "Hamilton", rating: 86, watched: true },
        { title: "Invincible (S1)", rating: 85, watched: true },
        { title: "Joker (2019)", rating: 84, watched: true },
        { title: "Sinners", rating: 83, watched: true },
        { title: "How to Train your Dragon (2025)", rating: 82, watched: true },
        { title: "Puss in Boots: The Last Wish", rating: 81, watched: true },
        { title: "Love Death + Robots (S1-3)", rating: 80, watched: true},
        { title: "The Room", rating: 80, watched: true },
        { title: "Arcane (S2)", rating: 79, watched: true },
        { title: "Get Out", rating: 78, watched: true },
        { title: "The Batman", rating: 77, watched: true },
        { title: "Shutter Island", rating: 76, watched: true },
        { title: "Invincible (S3)", rating: 75, watched: true },
        { title: "Scott Pilgrim Takes Off", rating: 74, watched: true },
        { title: "The Incredibles", rating: 73, watched: true },
        { title: "The Amazing Digital Circus", rating: 72, watched: true },
        { title: "Saltburn", rating: 71, watched: true},
        { title: "Fantastic Four: First Steps", rating: 70, watched: true},
        { title: "All Quiet on the Western Front", rating: 70, watched: true },
        { title: "Squid Game (S1)", rating: 71, watched: true },
        { title: "How to Train Your Dragon", rating: 70, watched: true },
        { title: "Cunk on Earth", rating: 70, watched: true },
        { title: "Invincible (S2)", rating: 69, watched: true },
        { title: "Coraline", rating: 69, watched: true },
        { title: "The Nightmare Before Christmas", rating: 68, watched: true },
        { title: "Smiling Friends", rating: 67, watched: false},
        { title: "Pluribus", rating: 66, watched: false},
        { title: "Avengers: Infinity War", rating: 65, watched: true },
        { title: "Obsession", rating: 64, watched: true },
        { title: "The Hunger Games: Catching Fire", rating: 64, watched: true },
        { title: "Five Nights at Freddy's 1", rating: 63, watched: false},
        { title: "One Punch Man", rating: 62, watched: true },
        { title: "TMNT: Mutant Mayhem", rating: 61, watched: true},
        { title: "One Piece (Live Action)", rating: 60, watched: true },
        { title: "The Hunger Games", rating: 60, watched: true },
        { title: "Avengers: Endgame", rating: 59, watched: true },
        { title: "Mulan (1998)", rating: 58, watched: true },
        { title: "End of the F***ing World", rating: 57, watched: true },
        { title: "Into the Manosphere", rating: 56, watched: true },
        { title: "Wallace & Gromit: Vengeance Most Fowl", rating: 55, watched: true},
        { title: "Better Man", rating: 54, watched: true },
        { title: "Weapons", rating: 53, watched: true },
        { title: "Zootopia 2", rating: 52, watched: true },
        { title: "Pulp Fiction", rating: 51, watched: true },
        { title: "Lilo & Stitch (2025)", rating: 50, watched: true},
        { title: "Violet Evergarden", rating: 50, watched: true },
        { title: "The Boy and The Heron", rating: 49, watched: true },
        { title: "Indian Matchmaking", rating: 48, watched: true },
        { title: "Sex Education", rating: 47, watched: true },
        { title: "Primate", rating: 46, watched: true },
        { title: "Love Death + Robots (S4)", rating: 40, watched: true },
        { title: "Wuthering Heights (2026)", rating: 15, watched: true},
        { title: "Blue is the Warmest Color", rating: 0, watched: true},

        // Section 3: Newly watched
        { title: "Black Mirror (S7)", rating: null, watched: false}
    ];

    function sortWatchlist() {
        watchlist.sort((a, b) => {
        if (!a.watched && !b.watched) {
            return a.title.localeCompare(b.title);
        } else if (a.watched && b.watched) {
            const aRating = a.rating ?? 0;
            const bRating = b.rating ?? 0;
            return bRating - aRating;
        }
        return a.watched - b.watched;
        });
    }

    function renderWatchlist() {
        tableBody.innerHTML = '';
        if (viewWatchedOnly) {
        let watchedList = watchlist
            .filter(item => item.watched)
            .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        watchedList.forEach(item => {
            const row = document.createElement('tr');
            const titleCell = document.createElement('td');
            titleCell.textContent = item.title;
            const ratingCell = document.createElement('td');
            ratingCell.textContent = item.rating === null ? 'n/a' : item.rating;
            row.appendChild(titleCell);
            row.appendChild(ratingCell);
            tableBody.appendChild(row);
        });
        } else {
        sortWatchlist();
        watchlist.forEach(item => {
            const row = document.createElement('tr');
            const titleCell = document.createElement('td');
            titleCell.textContent = item.title;
            if (item.watched) {
            titleCell.classList.add('watched-show');
            }
            const ratingCell = document.createElement('td');
            ratingCell.textContent = item.rating === null ? 'n/a' : item.rating;
            row.appendChild(titleCell);
            row.appendChild(ratingCell);
            tableBody.appendChild(row);
        });
        }
    }

    let viewWatchedOnly = false;

    toggleWatchedButton.addEventListener('click', function() {
        viewWatchedOnly = !viewWatchedOnly;
        const icon = this.querySelector('i');
        if (icon) {
        if (viewWatchedOnly) {
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        } else {
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        }
        }
        renderWatchlist();
    });

    sortWatchlist();
    renderWatchlist();

    searchInput.addEventListener('input', function() {
        const filter = this.value.toUpperCase();
        const rows = tableBody.querySelectorAll('tr');
        rows.forEach(row => {
        const nameCell = row.cells[0];
        if (nameCell) {
            const txtValue = nameCell.textContent || nameCell.innerText;
            row.style.display = txtValue.toUpperCase().includes(filter) ? '' : 'none';
        }
        });
    });
    }


      /* === Spider‑Verse Countdown ===================================== */
      const countdownEl = document.getElementById('spiderverseCountdown');
      if (countdownEl) {
        const progressBar  = document.getElementById('progressBar');
        const releaseDate  = new Date('2027-06-04T20:00:00'); // 8 pm local
        const countingFrom = new Date('2025-04-01T03:23:20'); // fixed start

        function updateCountdown() {
          const now  = new Date();
          const left = releaseDate - now;            // ms remaining
          const span = releaseDate - countingFrom;   // total ms
          const done = now - countingFrom;           // ms elapsed

          const s   = Math.max(0, Math.floor(left / 1000));
          const d   = Math.floor(s / 86400);
          const h   = Math.floor((s % 86400) / 3600);
          const m   = Math.floor((s % 3600)  / 60);
          const sec = s % 60;

          countdownEl.querySelector('#days')   .textContent = d;
          countdownEl.querySelector('#hours')  .textContent = String(h).padStart(2,'0');
          countdownEl.querySelector('#minutes').textContent = String(m).padStart(2,'0');
          countdownEl.querySelector('#seconds').textContent = String(sec).padStart(2,'0');

          progressBar.style.width = `${Math.min(Math.max(done / span, 0), 1) * 100}%`;
        }

        updateCountdown();                 // first paint
        setInterval(updateCountdown, 1000); // every second
      }

      (function scheduleGlitch(){
        const heading = document.querySelector('.countdown-heading');
        if (!heading) return;

        // pick a random delay between 6s and 4s
        const delay = Math.random() * (5000 - 3000) + 3000;

        setTimeout(() => {
          // add the class to start the animation
          heading.classList.add('glitch-active');

          // remove it after 2.5s so it can fire fresh next time
          setTimeout(() => {
            heading.classList.remove('glitch-active');
            // schedule the next glitch
            scheduleGlitch();
          }, 2500);
        }, delay);
      })();
    });