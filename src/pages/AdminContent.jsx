import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  Save,
  RotateCcw,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

import {
  getTopics,
  saveTopics,
} from "../utils/topicStorage";

import "../styles/admin-content.css";

function AdminContent() {
  const [topics, setTopics] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    explanation: "",
    content: "",
    example: "",
    output: "",
    points: "",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // Load saved topics when the page opens.
  useEffect(() => {
    const loadedTopics = getTopics();

    setTopics(loadedTopics);

    if (loadedTopics.length > 0) {
      setSelectedId(String(loadedTopics[0].id));
      setFormData(createFormData(loadedTopics[0]));
    }
  }, []);

  // Convert a topic into editable form values.
  function createFormData(topic) {
    return {
      title: topic.title ?? "",
      description: topic.description ?? "",
      explanation: topic.explanation ?? "",
      content: topic.content ?? "",
      example: topic.example ?? "",
      output: topic.output ?? "",
      points: Array.isArray(topic.points)
        ? topic.points.join("\n")
        : topic.points ?? "",
    };
  }

  // Load the selected topic into the form.
  function handleTopicChange(event) {
    const id = event.target.value;
    setSelectedId(id);
    setMessage("");

    const selectedTopic = topics.find(
      (topic) => String(topic.id) === id
    );

    if (selectedTopic) {
      setFormData(createFormData(selectedTopic));
    } else {
      setFormData({
        title: "",
        description: "",
        explanation: "",
        content: "",
        example: "",
        output: "",
        points: "",
      });
    }
  }

  // Update form values while typing.
  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setMessage("");
  }

  // Save updated material to localStorage.
  function handleSave(event) {
    event.preventDefault();

    if (!selectedId) {
      setMessage("Please select a topic first.");
      setMessageType("error");
      return;
    }

    if (!formData.title.trim()) {
      setMessage("Topic title cannot be empty.");
      setMessageType("error");
      return;
    }

    const updatedTopics = topics.map((topic) => {
      if (String(topic.id) !== selectedId) {
        return topic;
      }

      return {
        ...topic,
        title: formData.title.trim(),
        description: formData.description,
        explanation: formData.explanation,
        content: formData.content,
        example: formData.example,
        output: formData.output,
        points: formData.points
          .split("\n")
          .map((point) => point.trim())
          .filter(Boolean),
      };
    });

    try {
      // Save the complete updated topic list.
      saveTopics(updatedTopics);

      // Read it back to confirm it was stored.
      const savedTopics = getTopics();

      const savedTopic = savedTopics.find(
        (topic) => String(topic.id) === selectedId
      );

      if (!savedTopic || savedTopic.title !== formData.title.trim()) {
        throw new Error("Saved content could not be verified.");
      }

      setTopics(savedTopics);
      setMessage("Learning material saved successfully!");
      setMessageType("success");
    } catch (error) {
      console.error("Unable to save learning material:", error);
      setMessage(
        "Could not save changes. Check the browser console for details."
      );
      setMessageType("error");
    }
  }

  // Restore the currently selected topic from saved storage.
  function handleReset() {
    const savedTopics = getTopics();

    setTopics(savedTopics);

    const selectedTopic = savedTopics.find(
      (topic) => String(topic.id) === selectedId
    );

    if (selectedTopic) {
      setFormData(createFormData(selectedTopic));
      setMessage("Loaded the currently saved content.");
      setMessageType("success");
    }
  }

  return (
    <div className="admin-content-page">
      <div className="admin-content-header">
        <div className="admin-content-heading">
          <div className="admin-content-icon">
            <BookOpen size={26} />
          </div>

          <div>
            <h1>Update Learning Content</h1>
            <p>
              Manage AngularJS topics and update the study materials
              available to students.
            </p>
          </div>
        </div>

        <Link to="/admin-dashboard" className="admin-back-button">
          <ArrowLeft size={17} />
          Back to Dashboard
        </Link>
      </div>

      <div className="admin-content-card">
        <div className="admin-content-card-heading">
          <h2>Study Material Editor</h2>
          <p>Select a topic, edit its content, and save your changes.</p>
        </div>

        {topics.length === 0 ? (
          <div className="admin-content-empty">
            <AlertCircle size={22} />
            <p>No topics were found. Check your topicStorage.js file.</p>
          </div>
        ) : (
          <form onSubmit={handleSave}>
            <div className="admin-form-group">
              <label htmlFor="topic-select">Select Topic</label>

              <select
                id="topic-select"
                value={selectedId}
                onChange={handleTopicChange}
                required
              >
                {topics.map((topic) => (
                  <option key={topic.id} value={String(topic.id)}>
                    {topic.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="admin-form-group">
              <label htmlFor="title">Topic Title</label>

              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter topic title"
                required
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="description">Short Description</label>

              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter a short description"
                rows={3}
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="explanation">Topic Explanation</label>

              <textarea
                id="explanation"
                name="explanation"
                value={formData.explanation}
                onChange={handleChange}
                placeholder="Explain the topic in simple language"
                rows={5}
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="content">Study Material</label>

              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Enter the complete study material"
                rows={8}
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="example">Code Example</label>

              <textarea
                id="example"
                name="example"
                value={formData.example}
                onChange={handleChange}
                placeholder="Enter an AngularJS code example"
                rows={7}
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="output">Expected Output</label>

              <textarea
                id="output"
                name="output"
                value={formData.output}
                onChange={handleChange}
                placeholder="Enter the expected output"
                rows={3}
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="points">
                Important Points (one point per line)
              </label>

              <textarea
                id="points"
                name="points"
                value={formData.points}
                onChange={handleChange}
                placeholder="Enter one important point per line"
                rows={5}
              />
            </div>

            <div className="admin-content-actions">
              <button type="submit" className="admin-save-button">
                <Save size={17} />
                Save Changes
              </button>

              <button
                type="button"
                className="admin-reset-button"
                onClick={handleReset}
              >
                <RotateCcw size={17} />
                Reset
              </button>
            </div>

            {message && (
              <div className={`admin-content-message ${messageType}`} role="status">
                {messageType === "success" ? (
                  <CheckCircle size={18} />
                ) : (
                  <AlertCircle size={18} />
                )}
                <span>{message}</span>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
}

export default AdminContent;

