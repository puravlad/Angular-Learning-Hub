
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  Save,
  RotateCcw,
  CheckCircle,
  AlertCircle,
  PlusCircle,
  Trash2,
} from "lucide-react";

import {
  fetchTopics,
  createTopic,
  updateTopic,
  deleteTopic,
} from "../utils/topicApi";

import "../styles/admin-content.css";

const emptyForm = {
  title: "",
  description: "",
  explanation: "",
  content: "",
  example: "",
  output: "",
  points: "",
};

function createFormData(topic) {
  return {
    title: topic.title ?? "",
    description: topic.description ?? "",
    explanation: topic.explanation ?? "",
    content: topic.studyMaterial ?? topic.content ?? "",
    example: topic.codeExample ?? topic.example ?? "",
    output: topic.output ?? "",
    points: Array.isArray(topic.points)
      ? topic.points.join("\n")
      : topic.points ?? "",
  };
}

function AdminContent() {
  const [topics, setTopics] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [formData, setFormData] = useState({ ...emptyForm });
  const [isNew, setIsNew] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // Display messages to the admin.
  function showMessage(text, type = "error") {
    setMessage(text);
    setMessageType(type);
  }

  // Load topics from MongoDB.
  async function loadTopics(preferredId = "") {
    setLoading(true);

    try {
      const data = await fetchTopics();
      const loadedTopics = Array.isArray(data) ? data : [];

      setTopics(loadedTopics);

      const selectedTopic =
        loadedTopics.find(
          (topic) => String(topic._id) === String(preferredId)
        ) || loadedTopics[0];

      if (selectedTopic) {
        setSelectedId(selectedTopic._id);
        setFormData(createFormData(selectedTopic));
        setIsNew(false);
      } else {
        setSelectedId("");
        setFormData({ ...emptyForm });
        setIsNew(false);
      }

      setMessage("");
    } catch (error) {
      showMessage(
        error.message ||
          "Could not load topics. Check that the backend is running."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTopics();
  }, []);

  // Select an existing topic.
  function handleTopicChange(event) {
    const id = event.target.value;

    const topic = topics.find(
      (item) => String(item._id) === id
    );

    if (topic) {
      setSelectedId(topic._id);
      setFormData(createFormData(topic));
      setIsNew(false);
      setMessage("");
    }
  }

  // Start creating a new topic.
  function handleAddNew() {
    setSelectedId("");
    setFormData({ ...emptyForm });
    setIsNew(true);
    setMessage("");
  }

  // Update fields while typing.
  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setMessage("");
  }

  // Convert form fields into the backend's schema.
  function prepareTopicData() {
    return {
      title: formData.title.trim(),
      description: formData.description.trim(),
      explanation: formData.explanation.trim(),
      studyMaterial: formData.content,
      codeExample: formData.example,
      output: formData.output,
      points: formData.points
        .split("\n")
        .map((point) => point.trim())
        .filter(Boolean),
    };
  }

  // Create or update a topic in MongoDB.
  async function handleSave(event) {
    event.preventDefault();

    if (!formData.title.trim()) {
      showMessage("Topic title cannot be empty.");
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      const topicData = prepareTopicData();

      if (isNew) {
        const createdTopic = await createTopic(topicData);

        await loadTopics(createdTopic._id);
        showMessage("New topic added successfully!", "success");
      } else {
        if (!selectedId) {
          showMessage("Please select a topic first.");
          return;
        }

        await updateTopic(selectedId, topicData);

        await loadTopics(selectedId);
        showMessage("Learning material updated successfully!", "success");
      }
    } catch (error) {
      showMessage(error.message || "Unable to save changes.");
    } finally {
      setSaving(false);
    }
  }

  // Discard unsaved edits and reload from MongoDB.
  async function handleReset() {
    if (isNew) {
      setFormData({ ...emptyForm });
      setMessage("");
      return;
    }

    await loadTopics(selectedId);
    showMessage("Saved content reloaded from MongoDB.", "success");
  }

  // Delete the selected topic.
  async function handleDelete() {
    if (isNew || !selectedId) {
      showMessage("Select an existing topic to delete.");
      return;
    }

    const topic = topics.find(
      (item) => String(item._id) === String(selectedId)
    );

    if (!topic) {
      showMessage("Topic not found.");
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete "${topic.title}"? This cannot be undone.`
    );

    if (!confirmed) return;

    setSaving(true);
    setMessage("");

    try {
      await deleteTopic(selectedId);
      await loadTopics();
      showMessage("Topic deleted successfully.", "success");
    } catch (error) {
      showMessage(error.message || "Unable to delete topic.");
    } finally {
      setSaving(false);
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
          <p>
            Add a topic or select an existing topic to edit its content.
          </p>
        </div>

        {loading ? (
          <p>Loading topics from MongoDB...</p>
        ) : (
          <>
            <div className="admin-content-actions">
              <button
                type="button"
                className="admin-save-button"
                onClick={handleAddNew}
                disabled={saving}
              >
                <PlusCircle size={17} />
                Add New Topic
              </button>
            </div>

            {!isNew && topics.length === 0 ? (
              <p>No topics found. Click Add New Topic to create one.</p>
            ) : null}

            {!isNew && topics.length > 0 ? (
              <div className="admin-form-group">
                <label htmlFor="topic-select">Select Topic</label>

                <select
                  id="topic-select"
                  value={selectedId}
                  onChange={handleTopicChange}
                >
                  {topics.map((topic) => (
                    <option key={topic._id} value={topic._id}>
                      {topic.title}
                    </option>
                  ))}
                </select>
              </div>
            ) : null}

            <form onSubmit={handleSave}>
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
                <button
                  type="submit"
                  className="admin-save-button"
                  disabled={saving}
                >
                  <Save size={17} />
                  {saving
                    ? "Saving..."
                    : isNew
                      ? "Create Topic"
                      : "Save Changes"}
                </button>

                <button
                  type="button"
                  className="admin-reset-button"
                  onClick={handleReset}
                  disabled={saving}
                >
                  <RotateCcw size={17} />
                  Reset
                </button>

                {!isNew && selectedId && (
                  <button
                    type="button"
                    className="admin-reset-button"
                    onClick={handleDelete}
                    disabled={saving}
                  >
                    <Trash2 size={17} />
                    Delete Topic
                  </button>
                )}
              </div>
            </form>
          </>
        )}

        {message && (
          <div
            className={`admin-content-message ${messageType}`}
            role="status"
          >
            {messageType === "success" ? (
              <CheckCircle size={18} />
            ) : (
              <AlertCircle size={18} />
            )}
            <span>{message}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminContent;
