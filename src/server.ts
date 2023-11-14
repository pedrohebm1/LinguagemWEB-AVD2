import fastify from "fastify";
import { clientRoutes } from "./routes/client";
import { salesOrderRoutes } from "./routes/salesOrder";

const app = fastify();

app.register(clientRoutes);
app.register(salesOrderRoutes);

app.listen({
  port: 3333,
}).then(() => {
  console.log('HTTP Server running on port 3333')
})
