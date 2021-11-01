import ImgLogo from "../../assets/logo.svg";
import Image from "next/image";
import styles from "./index.module.css";

const Header = () => {
  return (
    <nav className={styles.navContainer}>
      <Image src={ImgLogo} alt="logo" height={40} width={120} />
      <span>Expense Manager</span>
    </nav>
  );
};

export default Header;
