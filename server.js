// Importing Express using ES Module syntax
import express from "express";
import { readFile } from "fs/promises"; // For reading JSON data asynchronously

const app = express();
const PORT = 8080;

// Serve static files from the 'public' directory
app.use(express.static("public"));

// Function to convert array to tree
function arrayToTree(categories, rootId = null) {
    const map = {};
    const roots = [];

    categories.forEach((category) => {
        map[category.categoryId] = { ...category, children: [] };
    });

    categories.forEach((category) => {
        const node = map[category.categoryId];
        if (category.parent === rootId) {
            roots.push(node);
        } else {
            if (map[category.parent]) {
                map[category.parent].children.push(node);
            }
        }
    });

    return roots;
}

// Define the route
app.get("/categories", async (req, res) => {
    try {
        // Read and parse the JSON file
        const data = await readFile("./categories.json", { encoding: "utf8" });
        const categories = JSON.parse(data);
        const tree = arrayToTree(categories, "root");
        res.json(tree);
    } catch (error) {
        console.error("Failed to load category data:", error);
        res.status(500).send("Server error");
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
