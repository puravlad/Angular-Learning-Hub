import { Link, useParams } from "react-router-dom";

function TopicDetail() {
  const { topicId } = useParams();

  const topicName = topicId
    .replaceAll("-", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

  return (
    <main className="page-container" style={{ padding: "40px" }}>
      <h1>{topicName}</h1>
      <p>Study material and examples will be added here.</p>
      <br />
      <Link to="/topics">Back to Topics</Link>
    </main>
  );
}

export default TopicDetail;