// SCROLLING


document.querySelectorAll('.scroll-section').forEach(section => {
  const scrollContainer = section.querySelector('.card-scroll-wrapper');
  const scrollRightBtn = section.querySelector('.scroll-right');
  const scrollLeftBtn = section.querySelector('.scroll-left');

  scrollRightBtn.addEventListener('click', () => {
    scrollContainer.scrollLeft += 300;
  });

  scrollLeftBtn.addEventListener('click', () => {
    scrollContainer.scrollLeft -= 300;
  });
});





//SONGS


const tracks = [
  {
    name: "A Thousand Years",
    artist: "Christina Perri",
    image: "images/Christina Perri - A Thousand Years.jpg",
    path: "music/Christina Perri - A Thousand Years.mp3",
    playlist: "DREAM"
  },
  {
    name: "Human",
    artist: "Christina Perri",
    image: "images/Christina Perri - Human.jpg",
    path: "music/Christina Perri - Human.mp3",
    playlist: "GREEN"
  },
  {
    name: "Remember Me",
    artist: "Christina Perri",
    image: "images/christina perri - remember me.png",
    path: "music/christina perri - remember me.mp3",
    playlist: "GREEN"
  },
  {
    name: "Oceans",
    artist: "Hillsong United",
    image: "images/Hillsong UNITED - Oceans.jpg",
    path: "music/Hillsong UNITED - Oceans.mp3",
    playlist: "DREAM"
  },
  {
    name: "A Year Ago",
    artist: "James Arthur",
    image: "images/JAMES ARTHUR - A Year Ago.jpg",
    path: "music/JAMES ARTHUR - A Year Ago.mp3",
    playlist: "GREEN"
  },
  {
    name: "Impossible",
    artist: "James Arthur",
    image: "images/JAMES ARTHUR - Impossible.jpg",
    path: "music/JAMES ARTHUR - Impossible.mp3",
    playlist: "DREAM"
  },
  {
    name: "Say You Won't Let Go",
    artist: "James Arthur",
    image: "images/JAMES ARTHUR - Say You Won_t Let Go.jpg",
    path: "music/JAMES ARTHUR - Say You Won_t Let Go.mp3",
    playlist: "DARK"
  },
  {
    name: "Train Wreck",
    artist: "James Arthur",
    image: "images/JAMES ARTHUR -Train Wreck.jpg",
    path: "music/JAMES ARTHUR -Train Wreck.mp3",
    playlist: "NINJA"
  },
  {
    name: "Abacus",
    artist: "Shahmen",
    image: "images/SHAHMEN - Abacus.jpg",
    path: "music/SHAHMEN - Abacus.mp3",
    playlist: "DARK"
  },
  {
    name: "Dirt",
    artist: "Shahmen",
    image: "images/SHAHMEN - Dirt.jpg",
    path: "music/SHAHMEN - Dirt.mp3",
    playlist: "DARK"
  },
  {
    name: "Down Upside",
    artist: "Shahmen",
    image: "images/SHAHMEN - Down Upside.jpg",
    path: "music/SHAHMEN - Down Upside.mp3",
    playlist: "NINJA"
  },
  {
    name: "Mark",
    artist: "Shahmen",
    image: "images/SHAHMEN - Mark.jpg",
    path: "music/SHAHMEN - Mark.mp3",
    playlist: "WARRIOR"
  },
  {
    name: "Poison",
    artist: "Shahmen",
    image: "images/SHAHMEN - Poison.jpg",
    path: "music/SHAHMEN - Poison.mp3",
    playlist: "WARRIOR"
  },
  {
    name: "Van Gogh's Crows",
    artist: "Shahmen",
    image: "images/SHAHMEN - Van Gogh-s Crows.jpg",
    path: "music/SHAHMEN - Van Gogh_s Crows.mp3",
    playlist: "NINJA"
  },
  {
    name: "Circles",
    artist: "Post Malone",
    image: "images/post-malone - circles.jpg",
    path: "music/Post Malone - Circles.mp3",
    playlist: "DREAM"
  },
  {
    name: "Better Now",
    artist: "Post Malone",
    image: "images/post-malone - better now.jpg",
    path: "music/Post Malone - Better Now.mp3",
    playlist: "GREEN"
  },
  {
    name: "Wow",
    artist: "Post Malone",
    image: "images/post-malone - wow.jpg",
    path: "music/Post Malone - Wow.mp3",
    playlist: "BALANCE"
  },
  {
    name: "Swim",
    artist: "Chase Atlantic",
    image: "images/chase atlantic swim.jpg",
    path: "music/Chase Atlantic - SWIM.mp3",
    playlist: "BALANCE"
  },
  {
    name: "Heaven And Back",
    artist: "Chase Atlantic",
    image: "images/chase atlantic - heaven and back.jpg",
    path: "music/Chase Atlantic - HEAVEN AND BACK.mp3",
    playlist: "DREAM"
  }
];





// LIBRARY


const playNowButtons = document.querySelectorAll('.playnow');

playNowButtons.forEach((btn, index) => {
  btn.setAttribute('data-index', index); 

  btn.addEventListener('click', (e) => {
    currentTrackIndex = parseInt(e.currentTarget.getAttribute('data-index'));
    loadTrack(currentTrackIndex);
    playTrack();
    updatePlayNowIcons();
    
    
    playbar.classList.add('visible');
  });
});

function updatePlayNowIcons() {
  document.querySelectorAll('.playnow span').forEach((icon, i) => {
    icon.textContent = i === currentTrackIndex && isPlaying ? 'graphic_eq' : 'play_circle';
  });
}





// PLAYBAR


const playbar = document.querySelector('.playbar');
const audio = new Audio();
let currentTrackIndex = 0;
let isPlaying = false;
let isRandom = false;
let isRepeat = false;
let isMuted = false;
let updateTimer;


const trackImage = playbar.querySelector('.cover');
const trackTitle = playbar.querySelector('.track-title');
const trackArtist = playbar.querySelector('.track-artist');
const playPauseBtn = playbar.querySelector('.playpause-button span');
const progressBar = playbar.querySelector('.progress-bar');
const currentTimeEl = playbar.querySelector('.current.time');
const totalTimeEl = playbar.querySelector('.total.time');
const volumeBar = playbar.querySelector('.volume-bar');
const volumeBtn = playbar.querySelector('.volume-button span');

function loadTrack(index) {
  clearInterval(updateTimer);
  resetValues();

  audio.src = tracks[index].path;
  trackImage.src = tracks[index].image;
  trackTitle.textContent = tracks[index].name;
  trackArtist.textContent = tracks[index].artist;
  audio.load();

  updateTimer = setInterval(updateProgress, 500);
audio.removeEventListener("ended", handleTrackEnd); 
audio.addEventListener("ended", handleTrackEnd);


  totalTimeEl.textContent = "0:00";
}

function handleTrackEnd() {
  if (isRepeat) {
    audio.currentTime = 0;
    playTrack();
  } else if (isRandom) {
    currentTrackIndex = Math.floor(Math.random() * tracks.length);
    loadTrack(currentTrackIndex);
    playTrack();
  } else {
    nextTrack();
  }
}

function resetValues() {
  progressBar.value = 0;
  currentTimeEl.textContent = "0:00";
}

function playpauseTrack() {
  if (isPlaying) pauseTrack();
  else playTrack();
}

function playTrack() {
  audio.play();
  isPlaying = true;
  playPauseBtn.textContent = "pause";
  updatePlayNowIcons();
}

function pauseTrack() {
  audio.pause();
  isPlaying = false;
  playPauseBtn.textContent = "play_arrow";
  updatePlayNowIcons();
}

function nextTrack() {
  currentTrackIndex = isRandom
    ? Math.floor(Math.random() * tracks.length)
    : (currentTrackIndex + 1) % tracks.length;
  loadTrack(currentTrackIndex);
  playTrack();
}

function prevTrack() {
  currentTrackIndex =
    (currentTrackIndex - 1 + tracks.length) % tracks.length;
  loadTrack(currentTrackIndex);
  playTrack();
}

function repeatTrack() {
  isRepeat = !isRepeat;
  playbar.querySelector('.repeat-button').classList.toggle('active', isRepeat);
}

function randomTrack() {
  isRandom = !isRandom;
  playbar.querySelector('.random-button').classList.toggle('active', isRandom);
}


function seekTo() {
  let seekTime = (progressBar.value / 100) * audio.duration;
  audio.currentTime = seekTime;
}

function updateProgress() {
  if (!isNaN(audio.duration)) {
    let progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
    currentTimeEl.textContent = formatTime(audio.currentTime);
    totalTimeEl.textContent = formatTime(audio.duration);
  }
}

function formatTime(sec) {
  let min = Math.floor(sec / 60);
  let secRem = Math.floor(sec % 60);
  return `${min}:${secRem < 10 ? '0' : ''}${secRem}`;
}

function setVolume() {
  audio.volume = volumeBar.value / 100;
  volumeBtn.textContent = audio.volume === 0 ? "volume_off" : "volume_up";
}

playbar.querySelector('.playpause-button').addEventListener('click', playpauseTrack);
playbar.querySelector('.next-button').addEventListener('click', nextTrack);
playbar.querySelector('.prev-button').addEventListener('click', prevTrack);
playbar.querySelector('.repeat-button').addEventListener('click', repeatTrack);
playbar.querySelector('.random-button').addEventListener('click', randomTrack);
playbar.querySelector('.progress-bar').addEventListener('input', seekTo);
playbar.querySelector('.volume-bar').addEventListener('input', setVolume);
playbar.querySelector('.volume-button').addEventListener('click', () => {
  isMuted = !isMuted;
  audio.muted = isMuted;
  volumeBtn.textContent = isMuted ? "volume_off" : "volume_up";
});


loadTrack(currentTrackIndex);


const expandBtn = playbar.querySelector('.expand-button');

expandBtn.addEventListener('click', () => {
  const isExpanded = playbar.classList.toggle('expanded');
 
  expandBtn.querySelector('span').textContent = isExpanded ? "close_fullscreen" : "open_in_full";
});


document.querySelectorAll('.songs .card').forEach(card => {
  const playBtn = card.querySelector('.play');

  playBtn.addEventListener('click', () => {
    const title = card.querySelector('h2').textContent.trim();
    const artist = card.querySelector('p').textContent.trim();

    const trackIndex = tracks.findIndex(track => 
      track.name === title && track.artist === artist
    );

    if (trackIndex !== -1) {
      currentTrackIndex = trackIndex;
      loadTrack(currentTrackIndex);
      playTrack();
      playbar.classList.add('visible');
    } else {
      console.warn("Track not found:", title, artist);
    }
  });
});





//ARTISTS


const artistBackgrounds = [
  {
    artist: 'James Arthur',
    coverImage: 'images/james_arthur_cover.jpg'
  },
  {
    artist: 'Christina Perri',
    coverImage: 'images/christina perri - cover.jpg'
  },
  {
    artist: 'Hillsong United',
    coverImage: 'images/Hillsong United - cover.webp'
  },
  {
    artist: 'Shahmen',
    coverImage: 'images/SHAHMEN - cover.jpg'
  },
  {
    artist: 'Post Malone',
    coverImage: 'images/post-malone cover.jpg'
  },
  {
    artist: 'Chase Atlantic',
    coverImage: 'images/chase atlantic cover.jpeg'
  }
];


const artistExploreButtons = document.querySelectorAll('.explore-artist');
const artistSongListContainer = document.querySelector('.artist-song-list-container');

artistExploreButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const artistName = btn.getAttribute('data-artist');

    
    const artistTracks = tracks.filter(track => track.artist === artistName);

   
    if (artistTracks.length) {
      const artistData = artistBackgrounds.find(a => a.artist === artistName);
      const backgroundImage = artistData ? artistData.coverImage : '';
      const songListHTML = `
        
        <div class="section-title" style="background-image: url('${backgroundImage}')">
        <button class="back-to-home"><span class="material-symbols-outlined">arrow_back</span></button>
        <h1>${artistName}</h1>
        </div>
        <div class="song-list">
        ${artistTracks.map((track, i) => `
          <ul>
              <li>
                <div class ="track-info">
                  <div class="number">${i + 1}</div>
                  <img src="${track.image}" alt="${track.name}" class="cover">
                  <div class="track-details">
                    <h2>${track.name}</h2>
                    <p>${track.artist}</p>
                  </div>
                </div>
                <div class="playnow" data-index="${tracks.indexOf(track)}">
                  <span class="material-symbols-outlined">play_circle</span>
                </div>
              </li>
          </ul>
          `).join('')}
        </div>
      `;

      artistSongListContainer.innerHTML = songListHTML;

      
      document.querySelector('.landing').classList.add('hidden');
      artistSongListContainer.classList.remove('hidden');

     
      artistSongListContainer.querySelectorAll('.playnow').forEach(playBtn => {
        playBtn.addEventListener('click', (e) => {
          currentTrackIndex = parseInt(e.currentTarget.getAttribute('data-index'));
          loadTrack(currentTrackIndex);
          playTrack();
          playbar.classList.add('visible');
          updatePlayNowIcons();
        });
      });
    } else {
      artistSongListContainer.innerHTML = `<p>No tracks found for ${artistName}.</p>`;
    }
  });
});

document.addEventListener('click', (e) => {
  if (e.target.closest('.back-to-home')) {  
    artistSongListContainer.classList.add('hidden');
    document.querySelector('.landing').classList.remove('hidden');
  }
});





//PLAYLISTS


const playlistBackgrounds = [
  { playlist: 'DARK', coverImage: 'playlist/dark-cover.jpg' },
  { playlist: 'NINJA', coverImage: 'playlist/ninja1.png' },
  { playlist: 'GREEN', coverImage: 'playlist/green-cover.png' },
  { playlist: 'DREAM', coverImage: 'playlist/dream-cover.jpg' },
  { playlist: 'WARRIOR', coverImage: 'playlist/samurai1.jpg' },
  { playlist: 'BALANCE', coverImage: 'playlist/home.jpg' }
];

const playlistButtons = document.querySelectorAll('.explore-playlist');

playlistButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const playlistName = btn.getAttribute('data-playlist');

    const playlistTracks = tracks.filter(track => track.playlist === playlistName);
    const background = playlistBackgrounds.find(bg => bg.playlist === playlistName);
    const coverImage = background ? background.coverImage : '';

    if (playlistTracks.length) {
      const playlistHTML = `
        
        <div class="section-title" style="background-image: url('${coverImage}')">
          <button class="back-to-home"><span class="material-symbols-outlined">arrow_back</span></button>
          <h1>${playlistName}</h1>
        </div>

        <div class="song-list">
          ${playlistTracks.map((track, i) => `
            <ul>
              <li>
                <div class="track-info">
                  <div class="number">${i + 1}</div>
                  <img src="${track.image}" alt="${track.name}" class="cover">
                  <div class="track-details">
                    <h2>${track.name}</h2>
                    <p>${track.artist}</p>
                  </div>
                </div>
                <div class="playnow" data-index="${tracks.indexOf(track)}">
                  <span class="material-symbols-outlined">play_circle</span>
                </div>
              </li>
            </ul>
          `).join('')}
        </div>
      `;

      artistSongListContainer.innerHTML = playlistHTML;

      document.querySelector('.landing').classList.add('hidden');
      artistSongListContainer.classList.remove('hidden');

      artistSongListContainer.querySelectorAll('.playnow').forEach(playBtn => {
        playBtn.addEventListener('click', (e) => {
          currentTrackIndex = parseInt(e.currentTarget.getAttribute('data-index'));
          loadTrack(currentTrackIndex);
          playTrack();
          playbar.classList.add('visible');
          updatePlayNowIcons();
        });
      });
    } else {
      artistSongListContainer.innerHTML = `<p>No tracks found for ${playlistName}.</p>`;
    }
  });
});





// SEARCH BOX 


document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".search-box input");

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase().trim();

    if (query === "") {
      showAllCards(".playlists");
      showAllCards(".songs");
      showAllCards(".artists");
      restoreHeadings();
    } else {
      filterCards(".playlists", query);
      filterCards(".songs", query);
      filterCards(".artists", query);
      updateHeadings();
    }
  });

  function filterCards(sectionSelector, query) {
    const section = document.querySelector(sectionSelector);
    const cards = section.querySelectorAll(".card");

    let hasVisible = false;
    cards.forEach(card => {
      const keywords = card.getAttribute("data-name").toLowerCase();
      const match = keywords.includes(query);
      card.style.display = match ? "block" : "none";
      if (match) hasVisible = true;
    });

    section.style.display = hasVisible ? "block" : "none";
  }

  function showAllCards(sectionSelector) {
    const section = document.querySelector(sectionSelector);
    section.style.display = "block";
    section.querySelectorAll(".card").forEach(card => {
      card.style.display = "block";
    });
  }

  function updateHeadings() {
    document.querySelectorAll(".landing .head h1").forEach(h1 => {
      if (!h1.dataset.original) {
        h1.dataset.original = h1.textContent;
      }
      h1.textContent = h1.textContent.replace("Popular ", "");
    });
  }

  function restoreHeadings() {
    document.querySelectorAll(".landing .head h1").forEach(h1 => {
      if (h1.dataset.original) {
        h1.textContent = h1.dataset.original;
      }
    });
  }
});





/* MENU */

document.querySelector('.menu-toggle').addEventListener('click', () => {
  document.querySelector('.left').classList.add('open');
});

document.querySelector('.close-sidebar').addEventListener('click', () => {
  document.querySelector('.left').classList.remove('open');
});
