
const API_URL = "http://localhost:5000/api/topics";

// Get all topics from MongoDB.
export async function fetchTopics() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Unable to load topics.");
  }

  return response.json();
}

// Get one topic by its MongoDB ID.
export async function fetchTopicById(id) {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Unable to load this topic.");
  }

  return response.json();
}

// Add a new topic to MongoDB.
export async function createTopic(topicData) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(topicData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to create topic.");
  }

  return data;
}

// Update an existing topic in MongoDB.
export async function updateTopic(id, topicData) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(topicData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to update topic.");
  }

  return data;
}

// Delete a topic from MongoDB.
export async function deleteTopic(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.message || "Unable to delete topic.");
  }

  return true;
}
