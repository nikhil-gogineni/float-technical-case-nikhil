const getTags = (req, res) => {
  return res.status(200).json(["Meal", "Client", "Office Space"]);
};

export default function handler(req, res) {
  getTags(req, res);
}
