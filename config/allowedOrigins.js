const allowedOrigins = [
  //* Add deployment website url when deploying
  "http://localhost:5173",
  "https://lobanggowhere-client.vercel.app",
  "https://lobanggowhere-client.vercel.app/:path",
  "https://lobanggowhere-client.vercel.app/*",
  "https://lobanggowhere-client.vercel.app/login",
];

module.exports = allowedOrigins;
