import { Hono } from 'hono'
import { connectDB } from './config/db'
import postModel from './model/post.model';

const app = new Hono()

connectDB("mongodb://mongo1:27017,mongo2:27017,mongo3:27017/mydb?replicaSet=rs0&readPreference=secondary");

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.post("/post/create", async (c) => {
  const { text } = await c.req.json();

  if (!text) {
    return c.json({ error: "Text is required" }, 400);
  }

  const post = new postModel({ text });
  try {
    await post.save();
    return c.json({ message: "Post created successfully", post }, 201);
  } catch (error) {
    console.error("Error creating post:", error);
    return c.json({ error: "Failed to create post" }, 500);
  }
});

app.get("/posts", async (c) => {
  try {
    const posts = await postModel.find()
    return c.json(posts, 200);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return c.json({ error: "Failed to fetch posts" }, 500);
  }
});

export default app
