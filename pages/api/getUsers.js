export default async function handler(req, res) {
    if (req.method === "GET") {
      const storedUsers = JSON.parse(localStorage.getItem("users"));
      res.status(200).json({ users: storedUsers || [] });
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
}
  