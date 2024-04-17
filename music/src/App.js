import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";

const tempMusicData = [
  {
    id: 1,
    title: "Pantropiko",
    artist: "Bini",
    genre: "Pop",
  },
  {
    id: 2,
    title: "Alam mo ba girl?",
    artist: "Hev Abi",
    genre: "Hiphop",
  },
  {
    id: 3,
    title: "Selos",
    artist: "Shaira",
    genre: "Pop",
  },
  {
    id: 4,
    title: "Pantalan, Pt. 1",
    artist: "Kiyo",
    genre: "Rap",
  },
  {
    id: 5,
    title: "Dantay",
    artist: "Kiyo",
    genre: "Hiphop",
  },
  {
    id: 6,
    title: "Suicidal",
    artist: "Ynw Melly",
    genre: "Rap",
  },
  {
    id: 7,
    title: "Runaway",
    artist: "Kanye West",
    genre: "Hiphop",
  },
  {
    id: 8,
    title: "Tonight",
    artist: "FM Static",
    genre: "Alternative/Indie",
  },
  {
    id: 9,
    title: "Heaven Knows",
    artist: "Orange&Lemons",
    genre: "Pop",
  },
  {
    id: 10,
    title: "Selos",
    artist: "Shaira",
    genre: "Pop",
  },
  {
    id: 11,
    title: "Need You",
    artist: "Ex Battalion",
    genre: "Hiphop",
  },
  {
    id: 12,
    title: "City Girl",
    artist: "Shanti Dope",
    genre: "Hiphop",
  },
];
const tempPlaylist = [
  {
    id: 1,
    title: "Neneng B",
    artist: "Nik Makino",
    genre: "Rap",
    userRating: 5,
  },
  {
    id: 2,
    title: "Babaero",
    artist: "Hev Abi",
    genre: "Hiphop",
    userRating: 4,
  },
];

function App() {
  const [music, setMusic] = useState(tempMusicData);
  const [searchParam] = useState("title", "artist");
  const [query, setQuery] = useState("");
  const [playlist, setPlaylist] = useState(tempPlaylist);
  const handleAdd = (music) => {

    const isDuplicate = playlist.some((item) => item.id === music.id);

    if (!isDuplicate) {
      setPlaylist([...playlist, music]);
    } else {

      console.warn("Music already exists in playlist!");
    }
  };
  const handleSort = () => {
    setMusic([...music].sort((a, b) => a.title.localeCompare(b.title)));
  };
  

  return (
    <div>
      <NavBar query={query} setQuery={setQuery}>
        <button onClick={handleSort}>Sort by Title (A-Z)</button>
        <NumResult music={music} />
        <PlayResult playlist = {playlist} />
      </NavBar>
      <Main>
        <Box title="Music List">
          <Music
            music={music.filter((music) =>
              music.title.toLowerCase().includes(query.toLowerCase())
            )}
            handleAdd={handleAdd}
          />
        </Box>
        <Box title="Playlist">
          <Playlist playlist={playlist} setPlaylist={setPlaylist} />
          
        </Box>
      </Main>
    </div>
  );
}
function NavBar({ children, query, setQuery }) {
  return (
    <nav className="container">
      <Logo />
      <Search query={query} setQuery={setQuery} />
      {children}
    </nav>
  );
}

function Logo() {
  return <h1 style={{ textAlign: "center" }}>Music App</h1>;
}
function NumResult({ music }) {
  return (
    <p>
      Found <strong>{music.length}</strong> results
    </p>
  );
}
function PlayResult({playlist}){
  return(
    <p>
      Found <strong>{playlist.length}</strong> music in the playlist
    </p>
  )
}
function Search({ query, setQuery }) {
  return (
    <form classname="searchForm" onSubmit={(e) => e.preventDefault()}>
      <input
        className="search"
        id="search"
        role="searchbox"
        type="text"
        placeholder="Search music..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}

function Music({ music, handleAdd }) {
  return (
    <ul>
      {music.map((music) => (
        <li key={music.id}>
          {music.title} by {music.artist} ({music.genre})
          <FaHeart
            role="button"
            tabIndex="0"
            style={{ color: "red" }}
            onClick={() => handleAdd(music)} // Pass the entire music object
          />
        </li>
      ))}
    </ul>
  );
}

function Playlist({ playlist, setPlaylist }) {
  return (
    <ul>
      {playlist.map((music) => (
        <li key={music.id}>
          {music.title} by {music.artist}
          <span>⭐</span>
          <span>3</span>
        </li>
      ))}
    </ul>
  );
}

function Box({ children, title }) {
  return <div className="container">{children}</div>;
}
function Main({ children }) {
  return <div className="container">{children}</div>;
}

function Modal() {
  return <div></div>;
}

export default App;

//stateless component
//stateful component
//structural component
