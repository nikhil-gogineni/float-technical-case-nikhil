const getTeams = (req, res) => {
  return res.status(200).json(["Marketing", "Engineering", "Sales"]);
};

export default function handler(req, res) {
  getTeams(req, res);
}
