import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Local development proxy for Vercel API routes
const apiPlugin = () => ({
  name: 'api-plugin',
  configureServer(server) {
    server.middlewares.use('/api/activity', async (req, res) => {
      try {
        // Load env vars into process.env to simulate Vercel
        const env = loadEnv(server.config.mode, process.cwd(), '');
        Object.assign(process.env, env);

        const handler = await import('./api/activity.js');
        // Mock Vercel res methods
        res.status = (code) => {
          res.statusCode = code;
          return res;
        };
        res.json = (data) => {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(data));
        };
        await handler.default(req, res);
      } catch (err) {
        console.error("API Plugin Error:", err);
        res.statusCode = 500;
        res.end(JSON.stringify({ error: err.message }));
      }
    });
  }
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), apiPlugin()],
});
