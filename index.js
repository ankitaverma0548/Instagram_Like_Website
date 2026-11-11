const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4 : uuidv4 } = require('uuid');
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

app.use(express.urlencoded({extended : true}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id : uuidv4(),
        username : "Ankita_verma",
        image : "https://images.unsplash.com/photo-1778655692015-e81ae03e7888?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8ODB8fHxlbnwwfHx8fHw%3D",
        caption : "#Cute_baby #Cute_photo",
    },
    {
        id : uuidv4(),
        username : "Ankit_kumar",
        image : "https://images.unsplash.com/photo-1778704839167-7a45dfda9c6b?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Nzh8fHxlbnwwfHx8fHw%3D",
        caption : "#awesome view",
    },
    {
        id : uuidv4(),
        username : "Saniya_kumari",
        image : "https://images.unsplash.com/photo-1778593952650-a94ce40be350?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8ODJ8fHxlbnwwfHx8fHw%3D",
        caption : "#old_photo #old memory",
    },
];
app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/posts", (req, res) => {
    let { username, image, caption } = req.body;
    let id = uuidv4();
    posts.push( {id, username, image, caption});
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newImage =  req.body.image;
    let newCaption = req.body.caption;
    let post = posts.find((p) => id === p.id);
    post.image = newImage;
    post.caption = newCaption;
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", { post });
});

app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
});

app.listen(port, () => {
    console.log(`Listening at port ${port}`);
});


