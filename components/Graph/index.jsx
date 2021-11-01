import { useMemo, memo } from "react";
import moment from "moment";
import { Skeleton } from "antd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useHomeContext } from "../../context/home.context";
import { Empty } from "antd";

const Graph = () => {
  const { isLoading, result } = useHomeContext();
  const data = useMemo(() => {
    return result?.map(({ date, amountInCents, tags, teams }) => {
      return {
        date: moment(date).format("YYYY/MM/DD"),
        amountInCents: amountInCents / 100,
        tags,
        teams,
      };
    });
  }, [result]);

  if (isLoading) {
    return <Skeleton active />;
  }

  if (result.length === 0) {
    return <Empty />;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart width={300} height={100} data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line
          dataKey="amountInCents"
          name="Amount ($)"
          stroke="#067df7"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default memo(Graph);
