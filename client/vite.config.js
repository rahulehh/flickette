import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dotenv from "dotenv";

dotenv.config();

// disable error highlighting for "process"
// eslint-disable-next-line no-undef
const apiProxyAddress = process.env.VITE_API_PROXY;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": apiProxyAddress,
    },
  },
});
