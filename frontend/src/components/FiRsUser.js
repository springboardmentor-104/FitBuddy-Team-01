import styles from "./FiRsUser.module.css";

const FiRsUser = () => {
  return (
    <button className={styles.fiRsUser}>
      <img
        className={styles.alignCenterIcon}
        alt=""
        src="/01-align-center2.svg"
      />
    </button>
  );
};

export default FiRsUser;
