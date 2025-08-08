import express from "express";
import { ExpressAuth } from "@auth/express";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { env } from "@/env";
import { prisma } from "@/lib/prisma";

const app = express();

app.use(
  "/auth/*routes",
  ExpressAuth({
    providers: [],
    adapter: PrismaAdapter(prisma),
  })
);

app.listen(env.PORT, () => {
  console.log(`App listening on port: ${env.PORT}`);
});
