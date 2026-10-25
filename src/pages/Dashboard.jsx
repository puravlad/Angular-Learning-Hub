import { Link, useNavigate } from "react-router-dom";
import {
  BookOpen,
  LayoutDashboard,
  FileQuestion,
  LogOut,
  Code,
  Layers,
  Users,
  Filter,
  FileText,
  ArrowRight,
  GraduationCap,
} from "lucide-react";

import "../styles/dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const topics = [
    {
      id: 1,
      name: "Expressions",
      description: "Learn AngularJS expressions with examples.",
      icon: <Code size={22} />,
      color: "purple",
      lessons: 4,
    },
    {
      id: 2,
      name: "Directives",
      description: "Understand ng-model, ng-repeat, and more.",
      icon: <Layers size={22} />,
      color: "blue",
      lessons: 5,
    },
    {
      id: 3,
      name: "Controllers",
      description: "Learn how controllers manage application data.",
      icon: <Users size={22} />,
      color: "green",
      lessons: 4,
    },
    {
      id: 4,
      name: "Modules",
      description: "Understand AngularJS modules.",
      icon: <BookOpen size={22} />,
      color: "orange",
      lessons: 3,
    },
    {
      id: 5,
      name: "Filters",
      description: "Learn how to format and filter data.",
      icon: <Filter size={22} />,
      color: "purple",
      lessons: 3,
    },
    {
      id: 6,
      name: "Forms",
      description: "Learn form handling and validation.",
      icon: <FileText size={22} />,
      color: "blue",
      lessons: 4,
    },
  ];

  return (
    <div className="dashboard-layout">
      {/* SIDEBAR */}
      <aside className="dashboard-sidebar">
        <div className="dashboard-brand">
          <div className="dashboard-brand-icon">
            <GraduationCap size={25} />
          </div>

          <div>
            <h2>AngularJS Hub</h2>
            <p>Learn AngularJS easily</p>
          </div>
        </div>

        <p className="sidebar-label">MAIN MENU</p>

        <nav className="sidebar-navigation">
          <Link to="/dashboard" className="sidebar-link active">
            <LayoutDashboard size={18} />
            Dashboard
          </Link>

          <Link to="/topics" className="sidebar-link">
            <BookOpen size={18} />
            Topics
          </Link>

          <Link to="/quiz" className="sidebar-link">
            <FileQuestion size={18} />
            Quiz
          </Link>
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-help-card">
            <div className="help-icon">
              <BookOpen size={20} />
            </div>

            <h3>Keep Learning!</h3>
            <p>Practice regularly to improve your AngularJS skills.</p>

            <button onClick={() => navigate("/topics")}>
              Explore Topics <ArrowRight size={14} />
            </button>
          </div>

          <Link to="/login" className="sidebar-link logout-link">
            <LogOut size={18} />
            Logout
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="dashboard-main">
        {/* TOP BAR */}
        <header className="dashboard-topbar">
          <div>
            <p className="topbar-date">STUDENT LEARNING PORTAL</p>
            <h2>Student Dashboard</h2>
          </div>

          <div className="topbar-actions">
            <div className="student-avatar">S</div>
          </div>
        </header>

        {/* WELCOME BANNER */}
        <section className="dashboard-welcome">
          <div className="welcome-content">
            <span className="welcome-badge">
              <GraduationCap size={14} />
              YOUR LEARNING JOURNEY
            </span>

            <h1>
              Learn AngularJS
              <br />
              <span>step by step.</span>
            </h1>

            <p>
              Explore concepts, study code examples, and test your
              knowledge with interactive quizzes.
            </p>

            <button
              className="welcome-button"
              onClick={() => navigate("/topics")}
            >
              Explore Topics <ArrowRight size={16} />
            </button>
          </div>

          <div className="welcome-illustration">
            <div className="illustration-circle">
              <GraduationCap size={75} />
            </div>

            <div className="floating-card floating-card-one">
              <BookOpen size={16} />
              Learn
            </div>

            <div className="floating-card floating-card-two">
              <FileQuestion size={16} />
              Practice
            </div>
          </div>
        </section>

        {/* STATISTICS */}
        <section className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-icon stat-purple">
              <BookOpen size={21} />
            </div>

            <div>
              <p>Learning Topics</p>
              <h2>06</h2>
              <span>Topics to explore</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon stat-blue">
              <FileText size={21} />
            </div>

            <div>
              <p>Available Lessons</p>
              <h2>23</h2>
              <span>Learn at your pace</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon stat-green">
              <FileQuestion size={21} />
            </div>

            <div>
              <p>Available Quizzes</p>
              <h2>06</h2>
              <span>Test your knowledge</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon stat-orange">
              <GraduationCap size={21} />
            </div>

            <div>
              <p>Your Learning</p>
              <h2>Start</h2>
              <span>Begin your journey</span>
            </div>
          </div>
        </section>

        {/* TOPICS */}
        <section className="dashboard-topics-section">
          <div className="section-heading">
            <div>
              <p className="section-eyebrow">LEARNING MATERIAL</p>
              <h2>Start Learning</h2>
              <p>Choose a topic and begin learning AngularJS.</p>
            </div>

            <button
              className="view-all-button"
              onClick={() => navigate("/topics")}
            >
              View All Topics <ArrowRight size={15} />
            </button>
          </div>

          <div className="dashboard-topic-grid">
            {topics.map((topic) => (
              <article className="dashboard-topic-card" key={topic.id}>
                <div className={`topic-icon-box ${topic.color}`}>
                  {topic.icon}
                </div>

                <span className="topic-lesson-count">
                  {topic.lessons} lessons
                </span>

                <h3>{topic.name}</h3>

                <p>{topic.description}</p>

                <button
                  className="topic-start-button"
                  onClick={() => navigate(`/topics/${topic.id}`)}
                >
                  Start Learning <ArrowRight size={14} />
                </button>
              </article>
            ))}
          </div>
        </section>

        {/* QUIZ BANNER */}
        <section className="continue-learning-card">
          <div className="continue-icon">
            <FileQuestion size={24} />
          </div>

          <div className="continue-text">
            <h3>Ready to test yourself?</h3>
            <p>
              Take a quiz to check your understanding of AngularJS concepts.
            </p>
          </div>

          <button onClick={() => navigate("/quiz")}>
            Start Quiz <ArrowRight size={15} />
          </button>
        </section>

        {/* FOOTER */}
        <footer className="dashboard-footer">
          <span>© 2026 AngularJS Learning Hub</span>
          <span>Learn • Practice • Improve</span>
        </footer>
      </main>
    </div>
  );
}

export default Dashboard;