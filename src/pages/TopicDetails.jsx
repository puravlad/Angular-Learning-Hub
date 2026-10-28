import { Link, useParams } from "react-router-dom";
import {
ArrowLeft,
BookOpen,
Code,
GraduationCap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getTopicById } from "../utils/topicStorage";

function TopicDetail() {
const { topicId } = useParams();

const [topic, setTopic] = useState(() => getTopicById(topicId));

useEffect(() => {
function refreshTopic() {
setTopic(getTopicById(topicId));
}


window.addEventListener("storage", refreshTopic);

return () => {
  window.removeEventListener("storage", refreshTopic);
};


}, [topicId]);

if (!topic) {
return (
<main className="page-container" style={{ padding: "40px" }}> <h1>Topic not found</h1> <p>Please select a valid learning topic.</p> <Link to="/topics">Back to Topics</Link> </main>
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
> <ArrowLeft size={18} />
Back to Topics </Link>


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
        style={{ verticalAlign: "middle", marginRight: "8px" }}
      />
      Learn the Concept
    </h2>

    <p style={{ lineHeight: "1.8", whiteSpace: "pre-wrap" }}>
      {topic.explanation || topic.content}
    </p>

    {topic.content && topic.explanation && (
      <>
        <h3>Study Material</h3>
        <p style={{ lineHeight: "1.8", whiteSpace: "pre-wrap" }}>
          {topic.content}
        </p>
      </>
    )}

    {topic.points?.length > 0 && (
      <>
        <h3>Important Points</h3>
        <ul style={{ lineHeight: "2" }}>
          {topic.points
            .filter((point) => point.trim())
            .map((point, index) => (
              <li key={index}>{point}</li>
            ))}
        </ul>
      </>
    )}
  </section>

  {topic.example && (
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
          style={{ verticalAlign: "middle", marginRight: "8px" }}
        />
        Code Example
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
        <code>{topic.example}</code>
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
