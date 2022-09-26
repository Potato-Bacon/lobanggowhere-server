const allowedOrigins = [
  //* Add deployment website url when deploying
  "http://localhost:5173",
  "lobanggowhere-client.vercel.app",
  "http://lobanggowhere-client.vercel.app",
  "https://lobanggowhere-client.vercel.app",
  "https://lobanggowhere-client.vercel.app/:path",
  "https://lobanggowhere-client.vercel.app/*",
  "https://lobanggowhere-client.vercel.app/login",
];

module.exports = allowedOrigins;
