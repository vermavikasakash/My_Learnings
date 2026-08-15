/*
| Priority | Topic                   | Interview value |
| -------- | ----------------------- | --------------- |
| 1        | Search + pagination     | ⭐⭐⭐⭐⭐           |
| 2        | Debounce + API calls    | ⭐⭐⭐⭐⭐           |
| 3        | Authentication (JWT)    | ⭐⭐⭐⭐⭐           |
| 4        | CRUD APIs               | ⭐⭐⭐⭐⭐           |
| 5        | File upload             | ⭐⭐⭐⭐            |
| 6        | Redux + async API calls | ⭐⭐⭐⭐            |
| 7        | Protected routes        | ⭐⭐⭐⭐            |
| 8        | WebSockets/chat         | ⭐⭐⭐             |
| 9        | Caching                 | ⭐⭐⭐             |
| 10       | Infinite scrolling      | ⭐⭐⭐             |
 */

// .Authentication , Protected routes
const auth = (req, res, next) => {
  // verify JWT

  next();
};

app.use(auth);
// Protected routes FE
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/login" />;
}

// ------- Search + pagination + Debounce API calls
const { search = "", page = 1, limit = 10 } = req.query;

const skip = (page - 1) * limit;

const filtered = products.filter((p) =>
  p.title.toLowerCase().includes(search.toLowerCase()),
);

const data = filtered.slice(skip, skip + limit);
// Debounce FE
const [query, setQuery] = useState("");
const [debounce, setDebounce] = useState("");

useEffect(() => {
  const timer = setTimeout(() => {
    setDebounce(query);
  }, 1000);

  return () => clearTimeout(timer);
}, [query]);

// Pagination FE
const btnCount = Math.ceil(total / limit);
{
  [...Array(btnCount)].map((_, i) => (
    <button key={i} onClick={() => pageHandler(i)}>
      {i + 1}
    </button>
  ));
}
// scroll pagination -Detect when the user reaches the bottom
// Virtualisation, Server-side pagination, Cache (slice current data)
useEffect(() => {
  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight)
      setPage((prev) => prev + 1);
  };

  window.addEventListener("scroll", handleScroll);

  return () => window.removeEventListener("scroll", handleScroll);
}, []);

// --------- File Upload (Multer)
const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.single("image"), (req, res) => {
  console.log(req.file);
});

// -----WebSocket Chat Basic
// Backend
const server = http.createServer(app);
const io = new Server(server, {cors:  "*"});

io.on("connection", (socket) => {

  socket.on("message", (message) => {
    io.emit("message", message);
  });
});

// Frontend
  useEffect(() => 
    socket.on("message", (data) => setMessages((prev) => [...prev, data]))
  , []);

  const sendMessage = () => {
    socket.emit("message", message);
  };

// ---------Cache
const cache = new Map();

if (cache.has(id)) return cache.get(id);

cache.set(id, data);

// Redux + Async API
export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const res = await fetch(url);
  return res.json();
});
