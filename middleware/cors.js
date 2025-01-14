export function cors(handler) {
  return async (req, res) => {
    // Set CORS headers
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Origin", "*"); // Replace * with your domain in production
    res.setHeader("Access-Control-Allow-Methods", "GET,DELETE,PATCH,POST,PUT");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
    );

    // Handle OPTIONS request
    if (req.method === "OPTIONS") {
      res.status(200).end();
      return;
    }

    // Forward to actual handler
    return handler(req, res);
  };
}
