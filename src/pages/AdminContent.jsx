import { useState } from "react";
import { Link } from "react-router-dom";
import { Save, ArrowLeft } from "lucide-react";
import "../styles/admin-content.css";

const defaultTopics = [
  {
    id: 1,
    title: "Expressions",
    content:
      "AngularJS expressions are used to display dynamic values in HTML.\n\nExample:\n<p>{{ 5 + 5 }}</p>\n\nOutput: 10",
  },
  {
    id: 2,
    title: "Directives",
    content:
      "Directives extend HTML with AngularJS functionality.\n\nExample:\n<p ng-repeat=\"item in items\">{{ item }}</p>\n\nCommon directives include ng-model, ng-repeat and ng-if.",
  },
  {
    id: 3,
    title: "Controllers",
    content:
      "Controllers manage application data and behavior.\n\nExample:\napp.controller('myCtrl', function($scope) {\n  $scope.name = 'Student';\n});",
  },
  {
    id: 4,
    title: "Modules",
    content:
      "An AngularJS module organizes application components.\n\nExample:\nvar app = angular.module('myApp', []);",
  },
  {
    id: 5,
    title: "Filters",
    content:
      "Filters format the values displayed to users.\n\nExample:\n{{ name | uppercase }}\n\nThis displays the name in uppercase.",
  },
  {
    id: 6,
    title: "Forms",
    content:
      "AngularJS supports form handling and validation.\n\nExample:\n<input type=\"text\" ng-model=\"username\" required>\n\nUse ng-model to connect input fields to application data.",
  },
];

function getSavedTopics() {
  try {
    const saved = localStorage.getItem("angularHubTopics");
    return saved ? JSON.parse(saved) : defaultTopics;
  } catch {
    return defaultTopics;
  }
}

function AdminContent() {
  const [topics, setTopics] = useState(getSavedTopics);
  const [selectedId, setSelectedId] = useState(1);
  const [message, setMessage] = useState("");

  const selectedTopic = topics.find(
    (topic) => topic.id === Number(selectedId)
  );

  function handleChange(field, value) {
    setTopics((previousTopics) =>
      previousTopics.map((topic) =>
        topic.id === Number(selectedId)
          ? { ...topic, [field]: value }
          : topic
      )
    );

    setMessage("");
  }

  function saveContent(event) {
    event.preventDefault();

    if (!selectedTopic.title.trim() || !selectedTopic.content.trim()) {
      setMessage("Please enter both a title and study material.");
      return;
    }

    try {
      localStorage.setItem("angularHubTopics", JSON.stringify(topics));
      setMessage("Study material updated successfully!");
    } catch {
      setMessage("Unable to save. Please check your browser storage.");
    }
  }

  return (
    <div className="admin-content-page">
      <Link to="/dashboard" className="admin-back-link">
        <ArrowLeft size={18} /> Back to Dashboard
      </Link>

      <div className="admin-content-header">
        <p className="admin-eyebrow">ADMIN PANEL</p>
        <h1>Update Learning Content</h1>
        <p>Edit AngularJS topics and save the updated study material.</p>
      </div>

      <form className="admin-editor" onSubmit={saveContent}>
        <label htmlFor="topic">Select Topic</label>

        <select
          id="topic"
          value={selectedId}
          onChange={(event) => {
            setSelectedId(Number(event.target.value));
            setMessage("");
          }}
        >
          {topics.map((topic) => (
            <option key={topic.id} value={topic.id}>
              {topic.title}
            </option>
          ))}
        </select>

        <label htmlFor="title">Topic Title</label>

        <input
          id="title"
          type="text"
          value={selectedTopic.title}
          onChange={(event) => handleChange("title", event.target.value)}
          required
        />

        <label htmlFor="content">Study Material</label>

        <textarea
          id="content"
          rows="12"
          value={selectedTopic.content}
          onChange={(event) => handleChange("content", event.target.value)}
          placeholder="Enter study material here..."
          required
        />

        <p className="admin-editor-note">
          Your changes are saved in this browser. MongoDB integration can be
          added later.
        </p>

        <button type="submit" className="admin-save-button">
          <Save size={18} /> Save Changes
        </button>

        {message && (
          <p className="admin-save-message" role="status">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

export default AdminContent;

