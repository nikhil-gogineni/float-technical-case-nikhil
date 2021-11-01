import { DatePicker } from "antd";
import { Menu, Dropdown, Button } from "antd";
import { useHomeContext } from "../../context/home.context";
import styles from "./index.module.css";

const { RangePicker } = DatePicker;
const dateFormat = "YYYY/MM/DD";

const renderDropdown = (options, onChange) => (
  <Menu className={styles.menuContainer}>
    {options?.map((item) => {
      return (
        <Menu.Item key={item} onClick={() => onChange(item)}>
          {item}
        </Menu.Item>
      );
    })}
  </Menu>
);

const Filters = () => {
  const {
    tags,
    teams,
    setSelectedTeam,
    setSelectedTag,
    selectedTeam,
    selectedTag,
    selectedDate,
    setSelectedDate,
  } = useHomeContext();

  return (
    <div className={styles.container}>
      <div>
        <label>Tag</label>
        <Dropdown
          overlay={renderDropdown(tags, setSelectedTag)}
          placement="bottomLeft"
        >
          <Button className={styles.menuContainer}>
            {selectedTag || "All"}
          </Button>
        </Dropdown>
      </div>
      <div>
        <label>Team</label>
        <Dropdown
          overlay={renderDropdown(teams, setSelectedTeam)}
          placement="bottomLeft"
        >
          <Button className={styles.menuContainer}>
            {selectedTeam || "All"}
          </Button>
        </Dropdown>
      </div>
      <div>
        <label>Date</label>
        <RangePicker
          value={selectedDate}
          onCalendarChange={setSelectedDate}
          format={dateFormat}
        />
      </div>
    </div>
  );
};

export default Filters;
