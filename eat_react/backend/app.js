import fs from "node:fs/promises";
import bodyParser from "body-parser";
import express from "express";
import jwt from "jsonwebtoken"; 
import multer from "multer";

const app = express();

const SECRET_KEY = "your_secret_key";

const createJSONToken = (email) => {
    return jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });
  };

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); // allow all domains
    res.setHeader("Access-Control-Allow-Methods", "GET, PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  
    next();
  });

//   const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, "uploads/"); // Pasta onde as imagens serão salvas
//     },
//     filename: (req, file, cb) => {
//       cb(null, Date.now() + path.extname(file.originalname)); // Nome único
//     },
//   });
  
//   const upload = multer({ storage });

//   const dishesFile = path.join(_dirname, "dishes.jason");

 // ----------------------------------------------------------------------------- 

    app.post("/signup", async (req, res) => {
        const fileContent = await fs.readFile("./data/users.json");
        const users = JSON.parse(fileContent);
    
        const newUser = req.body;
        users.push(newUser);
    
        await fs.writeFile("./data/users.json", JSON.stringify(users, null, 2));
        res.status(200).json({ message: "User Inserted!" });
    });

    app.get("/users", async (req, res) => {
        const fileContent = await fs.readFile("./data/users.json");
        const users = JSON.parse(fileContent);
        res.status(200).json({ users });
    });

    app.post("/login", async (req, res) => {
        const fileContent = await fs.readFile("./data/users.json");
        const users = JSON.parse(fileContent);
    
        const email = req.body.email;
        const password = req.body.password;
    
        const login = users.find((u) => u.email === email && u.password === password);
    
            if (!login) {
            return res.status(422).json({
                message: "E-mail or password incorrect!",
                errors: { credentials: "E-mail or password incorrect!" },
            });
            }
    
            if (login) {
            const token = createJSONToken(email);
        
            const userData = {token: token, name: login.name, role: login.role};
    
            res.json(userData);
            }
    });

//---------------------------------------------------------------------------------------------------------

app.post("/dishes", async (req, res) => {
    const fileContent = await fs.readFile("./data/dishes.json");
    const dishes = JSON.parse(fileContent);

    const newDish = req.body;
    dishes.push(newDish);

    await fs.writeFile("./data/dishes.json", JSON.stringify(dishes, null, 2));
    res.status(200).json({ message: "New dish inserted!" });
});

app.get("/dishes", async (req, res) => {
    const fileContent = await fs.readFile("./data/dishes.json");
    const dishes = JSON.parse(fileContent);
    res.status(200).json({ dishes });
  });
  

// -----------------------------------------------------------------------------------------------------
app.use((req, res, next) => {
    if (req.method === "OPTIONS") {
      return next();
    }
    res.status(404).json({ message: "404 - Not Found" });
  });
  
app.listen(1974);