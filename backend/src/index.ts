import { Hono } from "hono";
import { userRouter } from "./routes/user";
import { blogRouter } from "./routes/blog";
// initializing string
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.route("/api/v1/user",userRouter);
app.route("/api/v1/blog",blogRouter);


//global middleware
// app.use("/api/v1/blog/*", async (c, next) => {
  // get the header
  // verify the header
  // if it is correct then proceed
  // if not then i'll return the error status code
//   const header = c.req.header("authorization") || "";
//   const token = header.split("")[1];
//   const response = await verify(header, c.env.JWT_SECRET);
//   if (response.id) {
//     next();
//   } else {
//     c.status(403);
//     return c.json({ error: "unauthorized access " });
//   }
// });





export default app;
