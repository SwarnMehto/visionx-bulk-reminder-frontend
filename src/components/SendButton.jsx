"use client";

export default function SendButton() {
  return (
    <button className="btn" style={styles.btn}>
      🚀 Launch Campaign
    </button>
  );
}

const styles = {
  btn: {
    width: "100%",
    background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
    color: "white",
    fontWeight: "bold",
  },
};