
const STORAGE_KEY = "angularHubTopics";

// Default AngularJS learning materials.
// These are used only when no saved topics exist.
const defaultTopics = [
  {
    id: 1,
    title: "Expressions",
    description:
      "Learn how AngularJS expressions display and calculate values.",
    explanation:
      "AngularJS expressions display data and perform simple calculations in HTML. They are commonly written inside double curly braces.",
    content:
      "AngularJS expressions are used to display dynamic values in HTML.\n\nThey can display variables, perform mathematical calculations, and work with strings.\n\nExample:\n{{ 5 + 5 }}",
    example:
      '<div ng-app="">\n  <p>{{ 5 + 5 }}</p>\n</div>',
    output: "10",
    points: [
      "Expressions display values.",
      "They can perform mathematical calculations.",
      "Expressions are written inside {{ }}.",
    ],
  },
  {
    id: 2,
    title: "Directives",
    description: "Learn how AngularJS directives extend HTML.",
    explanation:
      "Directives are special AngularJS attributes that add behavior to HTML elements.",
    content:
      "AngularJS directives extend HTML with additional functionality.\n\nCommon directives include ng-app, ng-model, ng-bind, ng-repeat, and ng-if.",
    example:
      '<div ng-app="">\n  <input ng-model="name">\n  <p>Hello {{ name }}</p>\n</div>',
    output: "When you type a name, the paragraph displays Hello followed by that name.",
    points: [
      "Directives add behavior to HTML.",
      "ng-model connects input data.",
      "ng-repeat repeats HTML elements.",
    ],
  },
  {
    id: 3,
    title: "Controllers",
    description: "Learn how controllers manage application data.",
    explanation:
      "Controllers define data and functions that can be used by the view.",
    content:
      "An AngularJS controller manages application data and behavior.\n\nIt is created using the controller function and commonly uses $scope to expose data to the view.",
    example:
      'var app = angular.module("myApp", []);\n\napp.controller("myCtrl", function($scope) {\n  $scope.name = "Student";\n});',
    output: "The controller makes the name Student available to the view.",
    points: [
      "Controllers manage application data.",
      "$scope connects controller data with the view.",
      "Controllers can define functions.",
    ],
  },
  {
    id: 4,
    title: "Modules",
    description: "Understand how AngularJS applications are organized.",
    explanation:
      "A module is a container for an AngularJS application and its components.",
    content:
      "AngularJS modules organize an application.\n\nA module can contain controllers, directives, filters, and services.\n\nThe angular.module() method creates or retrieves a module.",
    example:
      'var app = angular.module("myApp", []);\n\napp.controller("myCtrl", function($scope) {\n  $scope.message = "Welcome";\n});',
    output: "The module contains the controller and its application logic.",
    points: [
      "Modules organize AngularJS applications.",
      "angular.module() creates or retrieves a module.",
      "Modules can contain controllers and services.",
    ],
  },
  {
    id: 5,
    title: "Filters",
    description: "Learn how to format data displayed to users.",
    explanation:
      "Filters format or transform data before displaying it in the view.",
    content:
      "AngularJS filters change how values appear in the view.\n\nExamples include uppercase, lowercase, currency, date, and number.",
    example:
      '<div ng-app="">\n  <p>{{ "hello" | uppercase }}</p>\n</div>',
    output: "HELLO",
    points: [
      "Filters format displayed values.",
      "The uppercase filter converts text to uppercase.",
      "The currency filter formats monetary values.",
    ],
  },
  {
    id: 6,
    title: "Forms",
    description: "Learn how to collect and validate user input.",
    explanation:
      "AngularJS forms collect user input and support validation.",
    content:
      "AngularJS provides form validation features.\n\nThe ng-model directive binds form fields to application data. AngularJS also provides validation states for forms and input fields.",
    example:
      '<div ng-app="">\n  <form name="myForm">\n    <input name="email" type="email" ng-model="email" required>\n  </form>\n</div>',
    output:
      "The email input is validated, and the field is required.",
    points: [
      "Forms collect user input.",
      "ng-model binds input values.",
      "AngularJS supports form validation.",
    ],
  },
];

// Load topics from localStorage.
// Use default topics only when no valid saved list exists.
export function getTopics() {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);

    if (savedData !== null) {
      const parsedData = JSON.parse(savedData);

      if (Array.isArray(parsedData)) {
        return parsedData;
      }

      console.error("Saved topics data is not an array.");
    }
  } catch (error) {
    console.error("Unable to load saved topics:", error);
  }

  return defaultTopics;
}

// Save the complete updated topic list.
export function saveTopics(topics) {
  if (!Array.isArray(topics)) {
    throw new Error("Topics must be an array.");
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(topics));

    // Confirm that the data was saved successfully.
    const savedData = localStorage.getItem(STORAGE_KEY);

    if (savedData === null) {
      throw new Error("Saved topics could not be read back.");
    }

    const parsedData = JSON.parse(savedData);

    if (!Array.isArray(parsedData)) {
      throw new Error("Saved topics data is invalid.");
    }

    return true;
  } catch (error) {
    console.error("Unable to save topics:", error);
    throw error;
  }
}

// Get one topic using its ID.
export function getTopicById(id) {
  const topics = getTopics();

  return topics.find(
    (topic) => String(topic.id) === String(id)
  );
}

// Return the default topics without changing saved content.
export function getDefaultTopics() {
  return defaultTopics;
}

