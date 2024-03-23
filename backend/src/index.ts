import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";
import { parseSigned } from "hono/utils/cookie";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();
//global middleware
app.use("/api/v1/blog/*", async (c, next) => {
  // get the header
  // verify the header
  // if it is correct then proceed
  // if not then i'll return the error status code
  const header = c.req.header("authorization") || "";
  const token = header.split("")[1]
  const response = await verify(header, c.env.JWT_SECRET);
  if (response.id) {
    next();
  } else {
    c.status(403);
    return c.json({ error: "unauthorized access " });
  }
});
// c is basically  the req and res .
app.post("/api/v1/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const user = await prisma.user.create({
    data: {
      email: body.email,
      password: body.password,
    },
  });

  const token = await sign({ id: user.id }, c.env.JWT_SECRET);

  return c.json({
    jwt: token,
  });
});

app.post("/api/v1/signin", async (c) => {
  const prisma = new PrismaClient({
    //@ts-ignore
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
      password: body.password,
    },
  });

  if (!user) {
    c.status(403);
    return c.json({ error: "user not found " });
  }

  const token = await sign({ id: user.id }, c.env.JWT_SECRET);
  return c.json({ jwt: token });
});

app.post("/api/v1/blog", (c) => {
  return c.text("signup route ");
});
app.put("/api/v1/blog", (c) => {
  return c.text("signup route ");
});
// dynamic parameter
app.get("/api/v1/blog/:id", (c) => {
  return c.text("signup route ");
});

export default app;
