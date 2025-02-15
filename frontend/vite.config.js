import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server:{port:5173}
// })
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://full-stack-mern-856n.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
