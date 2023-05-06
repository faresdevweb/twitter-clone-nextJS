export default async function handler(req, res) {
    if (req.method === "GET") {
      const response = await fetch('http://localhost:5000/tweets?_sort=id&_order=desc');
      const data = await response.json()
      res.status(200).json({ tweets: data || [] });
    } else {
      res.status(405).json({ message: "Error fetching tweets in database from api/getTweets" });
    }
}
  