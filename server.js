const express = require("express");
const cors = require("cors");
const ip = require("ip");
const fs = require("fs");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, "data.json");

// Set up Swagger servers to use relative path (works on Local, Network, and Render)
swaggerDocument.servers = [
    {
        url: "/",
        description: "Current Server (Local/Render/Network)"
    }
];

// Middleware
app.use(cors());
app.use(express.json()); // Parsing JSON request bodies

// Swagger Documentation Route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Helper function to read data from JSON file
const readData = () => {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, "[]", "utf8");
    }
    const data = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading data:", error);
    return [];
  }
};

// Helper function to write data to JSON file
const writeData = (data) => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    console.error("Error writing data:", error);
  }
};

// GET endpoint to fetch all items
app.get("/api/items/all", (req, res) => {
  const data = readData();
  res.json(data);
});

// GET endpoint to fetch a single item by ID
app.get("/api/items/get/:id", (req, res) => {
  const data = readData();
  const item = data.find((i) => i.id === req.params.id);

  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

// POST endpoint to create a new item
app.post('/api/items/create', (req, res) => {
    const { title, description, status } = req.body;
    
    if (!title || !description || !status) {
        return res.status(400).json({ message: 'Title, description, and status are required' });
    }

    const data = readData();
    
    // Auto-increment ID based on the highest existing ID
    const maxId = data.reduce((max, item) => {
        const itemId = parseInt(item.id, 10);
        return !isNaN(itemId) && itemId > max ? itemId : max;
    }, 0);
    
    const newItem = {
        id: (maxId + 1).toString(),
        title,
        description,
        status
    };

    data.push(newItem);
    writeData(data);

    res.status(201).json(newItem);
});

// PUT endpoint to update an existing item
app.put("/api/items/update/:id", (req, res) => {
  const { title, description, status } = req.body;
  const data = readData();
  const index = data.findIndex((i) => i.id === req.params.id);

  if (index !== -1) {
    data[index] = {
      ...data[index],
      title: title || data[index].title,
      description: description || data[index].description,
      status: status || data[index].status,
    };

    writeData(data);
    res.json(data[index]);
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

// DELETE endpoint to remove all items
app.delete('/api/items/delete-all', (req, res) => {
    writeData([]);
    res.json({ message: 'Barcha ma\'lumotlar muvaffaqiyatli o\'chirildi' });
});

// DELETE endpoint to remove an item
app.delete("/api/items/delete/:id", (req, res) => {
  const data = readData();
  const index = data.findIndex((i) => i.id === req.params.id);

  if (index !== -1) {
    const deletedItem = data.splice(index, 1);
    writeData(data);
    res.json({ message: "Item successfully deleted", item: deletedItem[0] });
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Backend server is running on:`);
    console.log(`- Local:   http://localhost:${PORT}`);
    console.log(`- Network: http://${ip.address()}:${PORT}`);
});
