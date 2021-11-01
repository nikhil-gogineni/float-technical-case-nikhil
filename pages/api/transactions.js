import moment from "moment";
import data from "./mockData";

const getTransactions = async (req, res) => {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const { tag, team, start_date, end_date } = req.query;
  const finalData = data.filter(({ date, tags, teams }) => {
    if (tag && !tags?.find((t) => t === tag)) {
      return false;
    }
    if (team && !teams.find((t) => t === team)) {
      return false;
    }
    if (start_date && !moment(start_date).isSameOrBefore(date)) {
      return false;
    }
    if (end_date && !moment(end_date).isSameOrAfter(date)) {
      return false;
    }
    return true;
  });
  return res.status(200).json(finalData);
};

export default function handler(req, res) {
  getTransactions(req, res);
}
