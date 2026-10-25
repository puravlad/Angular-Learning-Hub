import { Link } from "react-router-dom";
import {
  BookOpen,
  LayoutDashboard,
  FileQuestion,
  LogOut,
  GraduationCap,
  Users,
  PlusCircle,
  ArrowRight,
  Pencil,
} from "lucide-react";

import "../styles/admin.css";

function AdminDashboard() {
  return (
    <div className="admin-layout">
      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <div className="admin-brand-icon">
            <GraduationCap size={25} />
          </div>

          <div>
            <h2>AngularJS Hub</h2>
            <p>Admin Portal</p>
          </div>
        </div>

        <p className="admin-menu-label">ADMIN MENU</p>

        <nav className="admin-navigation">
          <Link to="/admin" className="admin-nav-link active">
            <LayoutDashboard size={18} />
            Dashboard
          </Link>

          <Link to="/topics" className="admin-nav-link">
            <BookOpen size={18} />
            Study Materials
          </Link>

          <Link to="/admin-content" className="admin-nav-link">
            <Pencil size={18} />
            Update Content
          </Link>

          <Link to="/quiz" className="admin-nav-link">
            <FileQuestion size={18} />
            Quizzes
          </Link>
        </nav>

        <div className="admin-sidebar-bottom">
          <Link to="/login" className="admin-nav-link">
            <LogOut size={18} />
            Logout
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="admin-main">
        <header className="admin-header">
          <div>
            <p className="admin-eyebrow">ADMINISTRATION</p>
            <h1>Admin Dashboard</h1>
            <p>Manage your learning platform and study materials.</p>
          </div>

          <div className="admin-avatar">A</div>
        </header>

        {/* WELCOME BANNER */}
        <section className="admin-welcome">
          <div>
            <span className="admin-welcome-label">ADMINISTRATOR</span>

            <h2>Welcome to your workspace!</h2>

            <p>
              Organize AngularJS lessons, manage learning topics,
              and keep study materials updated.
            </p>

            <Link to="/topics" className="admin-primary-button">
              View Study Materials <ArrowRight size={16} />
            </Link>
          </div>

          <GraduationCap className="admin-welcome-icon" size={100} />
        </section>

        {/* SUMMARY CARDS */}
        <section className="admin-stats">
          <article className="admin-stat-card">
            <div className="admin-stat-icon purple">
              <BookOpen size={23} />
            </div>

            <div>
              <p>Learning Topics</p>
              <h2>06</h2>
              <span>Available topics</span>
            </div>
          </article>

          <article className="admin-stat-card">
            <div className="admin-stat-icon blue">
              <Users size={23} />
            </div>

            <div>
              <p>Student Accounts</p>
              <h2>--</h2>
              <span>Backend integration pending</span>
            </div>
          </article>

          <article className="admin-stat-card">
            <div className="admin-stat-icon green">
              <FileQuestion size={23} />
            </div>

            <div>
              <p>Quiz Section</p>
              <h2>06</h2>
              <span>Planned quizzes</span>
            </div>
          </article>
        </section>

        {/* MANAGEMENT SECTION */}
        <section className="admin-management">
          <div className="admin-section-heading">
            <div>
              <p className="admin-eyebrow">QUICK ACTIONS</p>
              <h2>Manage Learning Content</h2>
            </div>
          </div>

          <div className="admin-action-grid">
            {/* STUDY MATERIALS */}
            <article className="admin-action-card">
              <div className="admin-action-icon">
                <BookOpen size={25} />
              </div>

              <h3>Study Materials</h3>

              <p>
                View the available AngularJS topics and their
                learning material.
              </p>

              <Link to="/topics">
                View Topics <ArrowRight size={15} />
              </Link>
            </article>

            {/* UPDATE CONTENT */}
            <article className="admin-action-card">
              <div className="admin-action-icon blue">
                <PlusCircle size={25} />
              </div>

              <h3>Update Content</h3>

              <p>
                Edit topic titles and update AngularJS study
                materials from one place.
              </p>

              <Link to="/admin-content">
                Update Materials <ArrowRight size={15} />
              </Link>
            </article>

            {/* QUIZ MANAGEMENT */}
            <article className="admin-action-card">
              <div className="admin-action-icon green">
                <FileQuestion size={25} />
              </div>

              <h3>Quiz Management</h3>

              <p>
                Open the quiz section to review the learning
                assessment page.
              </p>

              <Link to="/quiz">
                Open Quizzes <ArrowRight size={15} />
              </Link>
            </article>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="admin-footer">
          <span>© 2026 AngularJS Learning Hub</span>
          <span>Administrator Workspace</span>
        </footer>
      </main>
    </div>
  );
}

export default AdminDashboard;

