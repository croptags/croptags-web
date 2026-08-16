import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../../supabase"; 

export const TreeDetail = () => {
  const { id } = useParams();
  const [tree, setTree] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTree = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch the tree by its 8-character Nano ID
        const { data, error: supabaseError } = await supabase
          .from("trees")
          .select("*, farms(name)") 
          .eq("id", id)
          .single();

        if (supabaseError) throw supabaseError;
        setTree(data);
      } catch (err) {
        console.error("Error fetching tree:", err.message);
        setError("Tree record not found");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchTree();
  }, [id]);

  if (loading) {
    return (
      <div style={styles.page}>
        <div style={styles.loadingBox}>
          <div style={styles.spinner}></div>
          <p style={styles.subtext}>Verifying tag with CropTags…</p>
        </div>
      </div>
    );
  }

  if (error || !tree) {
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <div style={styles.errorIcon}>⚠️</div>
          <h2 style={styles.errorTitle}>Unregistered Tag</h2>
          <p style={styles.subtext}>
            Tag <strong>#{id}</strong> is not yet registered or active in the orchard system.
          </p>
          <Link to="/" style={styles.secondaryButton}>Go to Home</Link>
        </div>
      </div>
    );
  }

  const isHealthy = tree.status === "healthy";

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        
        {/* Brand Header */}
        <div style={styles.brandHeader}>
          <span style={styles.brandName}>CropTags</span>
          <span style={styles.brandTagline}>Orchard Traceability</span>
        </div>

        {/* Tree Identification Badge */}
        <div style={styles.treeHero}>
          <div style={styles.tagBadge}>{tree.label || "No Label"}</div>
          <h1 style={styles.treeTitle}>{tree.variety || "Durian Tree"}</h1>
          <p style={styles.treeSub}>Tag ID: <span style={styles.mono}>{tree.id}</span></p>
        </div>

        {/* Info Card */}
        <div style={styles.card}>
          <div style={styles.row}>
            <span style={styles.label}>Farm / Estate</span>
            <span style={styles.value}>{tree.farms?.name || "Independent Orchard"}</span>
          </div>

          <div style={styles.row}>
            <span style={styles.label}>Status</span>
            <span
              style={{
                ...styles.statusBadge,
                backgroundColor: isHealthy ? "#E8F5E9" : "#FFF3E0",
                color: isHealthy ? "#00804D" : "#E65100",
                borderColor: isHealthy ? "#A5D6A7" : "#FFE082",
              }}
            >
              <span style={{
                ...styles.statusDot,
                backgroundColor: isHealthy ? "#00804D" : "#E65100"
              }}></span>
              {isHealthy ? "Healthy & Active" : "Under Attention"}
            </span>
          </div>

          <div style={styles.row}>
            <span style={styles.label}>Date Planted</span>
            <span style={styles.value}>
              {tree.dateplanted
                ? new Date(tree.dateplanted).toLocaleDateString("en-MY", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : "Recorded upon planting"}
            </span>
          </div>

          {tree.block && (
            <div style={{ ...styles.row, borderBottom: "none" }}>
              <span style={styles.label}>Orchard Block</span>
              <span style={styles.value}>Block {tree.block}</span>
            </div>
          )}
        </div>

        {/* Trust & Verification Footer */}
        <div style={styles.footer}>
          <div style={styles.trustBadge}>
            ✓ Verified Physical Metal Tag
          </div>
          <p style={styles.footerText}>
            This page provides origin transparency for harvested durians.
          </p>
        </div>

      </div>
    </div>
  );
};

// Inline styles for rapid testing without needing an external CSS file yet
const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#F4F4F2",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "24px 16px",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    color: "#1C2024",
  },
  container: {
    width: "100%",
    maxWidth: "420px",
  },
  brandHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "16px",
    borderBottom: "1px solid #E5E5E2",
    marginBottom: "24px",
  },
  brandName: {
    fontWeight: "800",
    fontSize: "18px",
    letterSpacing: "-0.02em",
    color: "#00804D",
  },
  brandTagline: {
    fontSize: "12px",
    color: "#71767B",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    fontWeight: "600",
  },
  treeHero: {
    textAlign: "center",
    marginBottom: "20px",
  },
  tagBadge: {
    display: "inline-block",
    backgroundColor: "#1C2024",
    color: "#F1FF62",
    padding: "6px 14px",
    borderRadius: "20px",
    fontFamily: "monospace",
    fontWeight: "700",
    fontSize: "15px",
    letterSpacing: "0.08em",
    marginBottom: "10px",
  },
  treeTitle: {
    fontSize: "26px",
    fontWeight: "700",
    letterSpacing: "-0.02em",
    margin: "0 0 4px",
  },
  treeSub: {
    fontSize: "13px",
    color: "#71767B",
    margin: 0,
  },
  mono: {
    fontFamily: "monospace",
    fontWeight: "600",
    color: "#1C2024",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: "16px",
    padding: "8px 20px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
    border: "1px solid #EBEBEA",
    marginBottom: "20px",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 0",
    borderBottom: "1px solid #F0F0EE",
  },
  label: {
    fontSize: "13px",
    color: "#71767B",
    fontWeight: "500",
  },
  value: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#1C2024",
  },
  statusBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "700",
    border: "1px solid",
  },
  statusDot: {
    width: "7px",
    height: "7px",
    borderRadius: "50%",
  },
  footer: {
    textAlign: "center",
    marginTop: "24px",
  },
  trustBadge: {
    display: "inline-block",
    fontSize: "12px",
    fontWeight: "600",
    color: "#00804D",
    backgroundColor: "#E8F5E9",
    padding: "6px 12px",
    borderRadius: "20px",
    marginBottom: "8px",
  },
  footerText: {
    fontSize: "11px",
    color: "#8E9297",
    margin: 0,
  },
  loadingBox: {
    textAlign: "center",
    padding: "60px 20px",
  },
  spinner: {
    width: "32px",
    height: "32px",
    border: "3px solid #E0E0DE",
    borderTop: "3px solid #00804D",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
    margin: "0 auto 16px",
  },
  errorIcon: {
    fontSize: "36px",
    marginBottom: "12px",
  },
  errorTitle: {
    fontSize: "18px",
    fontWeight: "700",
    marginBottom: "8px",
  },
  secondaryButton: {
    display: "inline-block",
    marginTop: "16px",
    padding: "10px 18px",
    backgroundColor: "#1C2024",
    color: "#FFF",
    borderRadius: "8px",
    textDecoration: "none",
    fontSize: "13px",
    fontWeight: "600",
  },
};
