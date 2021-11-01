import { useMemo } from "react";
import { Statistic } from "antd";
import Filters from "../Filters";
import Graph from "../Graph";
import { useHomeContext } from "../../context/home.context";
import styles from "./index.module.css";

const Home = () => {
  const { isLoading, result } = useHomeContext();
  const totalSpent = useMemo(() => {
    let totalValue = 0;
    for (let item of result) {
      totalValue += item?.amountInCents;
    }
    return totalValue / 10;
  }, [result]);

  return (
    <div className={styles.container}>
      <div className={styles.filterContainer}>
        <Statistic
          title="Spent"
          value={totalSpent}
          loading={isLoading}
          suffix="$"
        />
        <Filters />
      </div>
      <Graph />
    </div>
  );
};

export default Home;
