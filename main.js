import { app, BrowserWindow } from "electron";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import url from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function CreateMainWindow() {
  const mainWindow = new BrowserWindow({
    title: "ABM Business",
    width: 1000, // Initial width
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.cjs"),
    },
  });
  mainWindow.maximize();

  // Load the index.html file from the correct directory
  const startUrl = url.format({
    pathname: path.join(__dirname, "index.html"),
    protocol: "file:",
    slashes: true,
  });

  mainWindow.loadURL("http://localhost:3000"); // Load the index.html file
  mainWindow.webContents.openDevTools();
}

app.whenReady().then(async () => {
  try {
    CreateMainWindow();
  } catch (error) {
    console.error("Error during initialization:", error);
  }
});

// Ensure the app closes correctly
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    CreateMainWindow();
  }
});