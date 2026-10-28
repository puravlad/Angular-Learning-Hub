
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
import "../styles/topics.css";

function Topics() {
  const topics = [
    {
      id: 1,
      title: "Expressions",
      description:
        "Learn how to display values and perform calculations in AngularJS.",
      icon: Code,
      level: "Beginner",
      lessons: 4,
    },
    {
      id: 2,
      title: "Directives",
      description:
        "Understand ng-model, ng-repeat, ng-if and other important directives.",
      icon: Layers,
      level: "Beginner",
      lessons: 6,
    },
    {
      id: 3,
      title: "Controllers",
      description:
        "Learn how controllers manage application data and behavior.",
      icon: Settings,
      level: "Intermediate",
      lessons: 4,
    },
    {
      id: 4,
      title: "Modules",
      description:
        "Understand how to create and organize an AngularJS application.",
      icon: BookOpen,
      level: "Beginner",
      lessons: 3,
    },
    {
      id: 5,
      title: "Filters",
      description:
        "Learn to format text, numbers, dates and filter displayed data.",
      icon: Filter,
      level: "Intermediate",
      lessons: 4,
    },
    {
      id: 6,
      title: "Forms",
      description:
        "Practice form handling, ng-model and basic form validation.",
      icon: ClipboardList,
      level: "Intermediate",
      lessons: 5,
    },
  ];

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
            <h3>{topics.length}</h3>
            <p>Learning Topics</p>
          </div>
        </div>

        <div className="summary-card">
          <Code size={25} />
          <div>
            <h3>
              {topics.reduce((total, topic) => total + topic.lessons, 0)}
            </h3>
            <p>Planned Lessons</p>
          </div>
        </div>
      </div>

      <div className="topics-grid">
        {topics.map((topic) => {
          const Icon = topic.icon;

          return (
            <div className="topic-card" key={topic.id}>
              <div className="topic-card-top">
                <div className="topic-icon">
                  <Icon size={25} />
                </div>

                <span className="topic-level">{topic.level}</span>
              </div>

              <h2>{topic.title}</h2>

              <p className="topic-description">{topic.description}</p>

              <div className="topic-card-footer">
                <span>{topic.lessons} lessons</span>

               <Link
                to={`/topics/${topic.id}`}
                className="topic-link">
                Explore <ArrowRight size={16} />
</Link>
              </div>
            </div>
          );
        })}
      </div>

      <div className="topics-bottom">
        <div>
          <h2>Ready to test your knowledge?</h2>
          <p>Complete a quiz and check your AngularJS understanding.</p>
        </div>

        <Link to="/quiz" className="quiz-button">
          Start Quiz <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}

export default Topics;

