
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  Code,
  GraduationCap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { fetchTopicById } from "../utils/topicApi";

function TopicDetail() {
  const { topicId } = useParams();

  const [topic, setTopic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch topic details from the backend.
  useEffect(() => {
    let cancelled = false;

    async function loadTopic() {
      setLoading(true);
      setError("");
      setTopic(null);

      try {
        const data = await fetchTopicById(topicId);

        if (!cancelled) {
          setTopic(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Unable to load topic details.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadTopic();

    return () => {
      cancelled = true;
    };
  }, [topicId]);

  // Loading state.
  if (loading) {
    return (
      <main
        className="page-container"
        style={{ padding: "40px", textAlign: "center" }}
      >
        <BookOpen size={32} color="#4f46e5" />
        <h2>Loading topic..</h2>
        <p>Please wait while we fetch the study material.</p>
      </main>
    );
  }

  // Error state.
  if (error) {
    return (
      <main
        className="page-container"
        style={{ padding: "40px" }}
      >
        <h1>Unable to load topic</h1>
        <p>{error}</p>
        <Link to="/topics">Back to Topics</Link>
      </main>
    );
  }

  // Topic not found.
  if (!topic) {
    return (
      <main
        className="page-container"
        style={{ padding: "40px" }}
      >
        <h1>Topic not found</h1>
        <p>Please select a valid learning topic.</p>
        <Link to="/topics">Back to Topics</Link>
      </main>
    );
  }

  return (
    <main
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "32px 20px",
        color: "#1e293b",
      }}
    >
      {/* Back navigation */}
      <Link
        to="/topics"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "28px",
          color: "#4f46e5",
          textDecoration: "none",
        }}
      >
        <ArrowLeft size={18} />
        Back to Topics
      </Link>

      {/* Topic heading */}
      <section
        style={{
          background: "#eef2ff",
          padding: "30px",
          borderRadius: "18px",
          marginBottom: "24px",
        }}
      >
        <GraduationCap size={38} color="#4f46e5" />

        <p style={{ color: "#4f46e5", fontWeight: "600" }}>
          ANGULARJS LEARNING HUB
        </p>

        <h1 style={{ fontSize: "36px", margin: "12px 0" }}>
          {topic.title}
        </h1>

        <p style={{ fontSize: "17px", lineHeight: "1.7" }}>
          {topic.description || "Explore this AngularJS topic."}
        </p>
      </section>

      {/* Explanation and study material */}
      <section
        style={{
          padding: "26px",
          border: "1px solid #e2e8f0",
          borderRadius: "16px",
          marginBottom: "24px",
        }}
      >
        <h2>
          <BookOpen
            size={22}
            style={{
              verticalAlign: "middle",
              marginRight: "8px",
            }}
          />
          Learn the Concept
        </h2>

        <p style={{ lineHeight: "1.8", whiteSpace: "pre-wrap" }}>
          {topic.explanation || "No explanation has been added yet."}
        </p>

        {topic.studyMaterial && (
          <>
            <h3>Study Material</h3>
            <p
              style={{
                lineHeight: "1.8",
                whiteSpace: "pre-wrap",
              }}
            >
              {topic.studyMaterial}
            </p>
          </>
        )}

        {/* Important points */}
        {topic.points?.length > 0 && (
          <>
            <h3>Important Points</h3>
            <ul style={{ lineHeight: "2" }}>
              {topic.points
                .filter(
                  (point) =>
                    typeof point === "string" && point.trim()
                )
                .map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
            </ul>
          </>
        )}
      </section>

      {/* Code example and expected output */}
      {topic.codeExample && (
        <section
          style={{
            background: "#0f172a",
            color: "#f8fafc",
            padding: "26px",
            borderRadius: "16px",
            marginBottom: "24px",
          }}
        >
          <h2>
            <Code
              size={22}
              style={{
                verticalAlign: "middle",
                marginRight: "8px",
              }}
            />
            Code Examples
          </h2>

          <pre
            style={{
              whiteSpace: "pre-wrap",
              overflowX: "auto",
              background: "#1e293b",
              padding: "20px",
              borderRadius: "10px",
              lineHeight: "1.7",
            }}
          >
            <code>{topic.codeExample}</code>
          </pre>

          {topic.output && (
            <>
              <h3>Expected Output</h3>
              <p
                style={{
                  background: "#dcfce7",
                  color: "#166534",
                  padding: "14px",
                  borderRadius: "8px",
                }}
              >
                {topic.output}
              </p>
            </>
          )}
        </section>
      )}

      {/* Bottom navigation */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <Link to="/topics" style={{ color: "#4f46e5" }}>
          All Topics
        </Link>

        <Link
          to="/quiz"
          style={{
            background: "#4f46e5",
            color: "white",
            padding: "12px 20px",
            borderRadius: "8px",
            textDecoration: "none",
          }}
        >
          Take a Quiz →
        </Link>
      </div>
    </main>
  );
}

export default TopicDetail;
