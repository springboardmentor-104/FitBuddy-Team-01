import FiRsUser from "./FiRsUser";
import styles from "./MenuBar1.module.css";

const MenuBar1 = () => {
  return (
    <div className={styles.menuBar}>
      <div className={styles.frameParent}>
        <div className={styles.memuWrapper}>
          <div className={styles.memu}>
            <button className={styles.fiRsAlignLeft}>
              <img
                className={styles.alignCenterIcon}
                alt=""
                src="/01-align-center.svg"
              />
            </button>
          </div>
        </div>
        <div className={styles.dashboardParent}>
          <div className={styles.dashboard}>
            <button className={styles.fiRsLayoutFluid}>
              <img
                className={styles.alignCenterIcon1}
                alt=""
                src="/01-align-center1.svg"
              />
            </button>
            <button className={styles.reportProblem}>History</button>
          </div>
          <div className={styles.viewLogs}>
            <img
              className={styles.fiRsNotebookIcon}
              alt=""
              src="/firsnotebook.svg"
            />
            <button className={styles.reportProblem}>Create goals</button>
          </div>
          <button className={styles.reportPorblem}>
            <button className={styles.fiRsDocumentSigned}>
              <img className={styles.vectorIcon} alt="" src="/vector.svg" />
            </button>
            <button className={styles.reportProblem}>Manage goals</button>
          </button>
          <div className={styles.viewLogs}>
            <FiRsUser />
            <button className={styles.reportProblem}>User Profile</button>
          </div>
        </div>
      </div>
      <div className={styles.logout}>
        <div className={styles.circleUser1Parent}>
          <img
            className={styles.fiRsNotebookIcon}
            alt=""
            src="/circleuser-1.svg"
          />
          <div className={styles.nomanAhmadParent}>
            <div className={styles.nomanAhmad}>Noman ahmad</div>
            <div className={styles.lastLoginedOct}>
              {" "}
              Last Logined Oct 22, 2023 1:31 PM
            </div>
          </div>
        </div>
        <img
          className={styles.fiRsSignOutAltIcon}
          alt=""
          src="/firssignoutalt.svg"
        />
      </div>
    </div>
  );
};

export default MenuBar1;
