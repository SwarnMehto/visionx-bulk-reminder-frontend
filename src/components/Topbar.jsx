export default function Topbar() {
  return (
    <div style={styles.topbar}>
      <input placeholder="Search campaigns..." style={styles.search} />

      <div style={styles.right}>
        🔔
        <div style={styles.avatar}>S</div>
      </div>
    </div>
  );
}

const styles = {
  topbar: {
    height: "70px",
    background: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
    borderBottom: "1px solid #eee",
  },
  search: {
    width: "300px",
    background: "#f3f4f6",
    border: "none",
  },
  right: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
  },
  avatar: {
    width: "35px",
    height: "35px",
    borderRadius: "50%",
    background: "#6366f1",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};