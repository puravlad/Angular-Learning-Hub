
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Code,
  Layers,
  Settings,
  Filter,
  ClipboardList,
  ArrowRight,
} from "lucide-react";

import { fetchTopics } from "../utils/topicApi";
import "../styles/topics.css";

const topicIcons = {
  Expressions: Code,
  Directives: Layers,
  Controllers: Settings,
  Modules: BookOpen,
  Filters: Filter,
  Forms: ClipboardList,
};

const topicLevels = {
  Expressions: "Beginner",
  Directives: "Beginner",
  Controllers: "Intermediate",
  Modules: "Beginner",
  Filters: "Intermediate",
  Forms: "Intermediate",
};

const lessonCounts = {
  Expressions: 4,
  Directives: 6,
  Controllers: 4,
  Modules: 3,
  Filters: 4,
  Forms: 5,
};

function Topics() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadTopics() {
      try {
        const data = await fetchTopics();
        setTopics(data);
        setError("");
      } catch (err) {
        setError(
          "Unable to load topics. Please check that the backend server is running."
        );
      } finally {
        setLoading(false);
      }
    }

    loadTopics();
  }, []);

  const totalLessons = topics.reduce(
    (total, topic) =>
      total + (lessonCounts[topic.title] || 0),
    0
  );

  return (
    <div className="topics-page">
      <header className="topics-header">
        <div>
          <p className="topics-label">LEARNING LIBRARY</p>
          <h1>AngularJS Topics</h1>
          <p className="topics-subtitle">
            Learn AngularJS concepts one step at a time.
          </p>
        </div>

        <Link to="/quiz" className="quiz-button">
          Take a Quiz <ArrowRight size={18} />
        </Link>
      </header>

      <div className="topics-summary">
        <div className="summary-card">
          <BookOpen size={25} />
          <div>
            <h3>{loading ? "..." : topics.length}</h3>
            <p>Learning Topics</p>
          </div>
        </div>

        <div className="summary-card">
          <Code size={25} />
          <div>
            <h3>{loading ? "..." : totalLessons}</h3>
            <p>Planned Lessons</p>
          </div>
        </div>
      </div>

      {loading && (
        <p>Loading topics from MongoDB...</p>
      )}

      {error && (
        <div role="alert">
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && topics.length === 0 && (
        <p>No topics found. Please add topics from the admin panel.</p>
      )}

      {!loading && !error && (
        <div className="topics-grid">
          {topics.map((topic) => {
            const Icon = topicIcons[topic.title] || BookOpen;

            return (
              <div className="topic-card" key={topic._id}>
                <div className="topic-card-top">
                  <div className="topic-icon">
                    <Icon size={25} />
                  </div>

                  <span className="topic-level">
                    {topicLevels[topic.title] || "Beginner"}
                  </span>
                </div>

                <h2>{topic.title}</h2>

                <p className="topic-description">
                  {topic.description}
                </p>

                <div className="topic-card-footer">
                  <span>
                    {lessonCounts[topic.title] || 0} lessons
                  </span>

                  <Link
                    to={`/topics/${topic._id}`}
                    className="topic-link"
                  >
                    Explore <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="topics-bottom">
        <div>
          <h2>Ready to test your knowledge?</h2>
          <p>
            Complete a quiz and check your AngularJS understanding.
          </p>
        </div>

        <Link to="/quiz" className="quiz-button">
          Start Quiz <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}

export default Topics;
