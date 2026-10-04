import type { Project } from "../types";

export const branches = ["CSE / IT", "AI / ML / Data Science", "ECE / EEE", "Mechanical", "Civil", "Other"];
export const experienceLevels = ["Beginner — little/no coding", "Some Python", "Built ML/AI projects before"];
export const interests = ["Productivity", "Computer Vision", "Healthcare", "Finance", "Sustainability", "Career / Resume", "Automation", "Data / Analytics"];

const [beginner, python, experienced] = experienceLevels;
const [cse, ai, ece, mechanical, civil, other] = branches;

export const projects: Project[] = [
  {
    id: "resume-screener", title: "AI Resume Screener",
    description: "Compare a sample resume with a job description and turn missing skills into a practical improvement checklist.",
    branches: [cse, ai, other], interests: ["Career / Resume"], experienceLevels: [beginner, python],
    difficulty: "Beginner", buildTime: 55, stack: ["Python", "Streamlit", "Text scoring"],
    learningOutcomes: ["Extract useful signals from text", "Design a transparent matching score", "Build a simple project interface"],
    workshopRelevance: "Build a starter resume comparison tool with a guided template and sample data in one session.",
  },
  {
    id: "study-planner", title: "Smart Study Planner",
    description: "Turn subjects, deadlines and available hours into a focused weekly study plan that you can adjust.",
    branches: [cse, ece, mechanical, civil, other], interests: ["Productivity"], experienceLevels: [beginner, python],
    difficulty: "Beginner", buildTime: 45, stack: ["Python", "Streamlit", "Scheduling rules"],
    learningOutcomes: ["Structure a practical planning problem", "Apply simple prioritization rules", "Create an editable study dashboard"],
    workshopRelevance: "A small, guided planning prototype introduces the workflow behind intelligent assistants.",
  },
  {
    id: "plant-detector", title: "Plant Disease Detector",
    description: "Explore how a pre-trained image model distinguishes healthy leaves from sample plant diseases.",
    branches: [ai, ece, mechanical, civil], interests: ["Computer Vision", "Sustainability"], experienceLevels: [python, experienced],
    difficulty: "Guided intermediate", buildTime: 60, stack: ["Python", "Pre-trained image model", "Streamlit"],
    learningOutcomes: ["Prepare image inputs", "Run pre-trained model inference", "Explain confidence and model limitations"],
    workshopRelevance: "Use prepared leaf images and a ready-made model; training a new model is outside the workshop scope.",
  },
  {
    id: "expense-insights", title: "Expense Insight Assistant",
    description: "Group sample expenses, spot spending patterns and create a clear monthly overview.",
    branches: [cse, ai, mechanical, other], interests: ["Finance", "Data / Analytics"], experienceLevels: [beginner, python],
    difficulty: "Beginner", buildTime: 50, stack: ["Python", "Pandas", "Streamlit"],
    learningOutcomes: ["Clean a small expense dataset", "Classify transactions with simple rules", "Explain patterns using useful charts"],
    workshopRelevance: "Start with synthetic transactions and build a financial data exploration demo, with no bank connection.",
  },
  {
    id: "review-detector", title: "Fake Review Detector",
    description: "Use a prepared text classifier to flag review patterns and explain why a prediction may be uncertain.",
    branches: [cse, ai], interests: ["Data / Analytics", "Automation"], experienceLevels: [python, experienced],
    difficulty: "Guided intermediate", buildTime: 60, stack: ["Python", "Scikit-learn", "Streamlit"],
    learningOutcomes: ["Convert text into model features", "Inspect sample classifier predictions", "Understand false positives"],
    workshopRelevance: "Use a prepared classifier and small sample set to focus on the prediction-to-interface workflow.",
  },
  {
    id: "campus-faq", title: "Campus FAQ Assistant",
    description: "Find useful answers in a tiny campus FAQ using transparent keyword similarity and a simple search interface.",
    branches: [cse, ece, civil, other], interests: ["Automation", "Productivity"], experienceLevels: [beginner, python],
    difficulty: "Beginner", buildTime: 45, stack: ["Python", "Streamlit", "Text similarity"],
    learningOutcomes: ["Organize a small knowledge source", "Rank answers by text similarity", "Handle questions with no useful match"],
    workshopRelevance: "Build a local answer-finding prototype with a ready-to-use FAQ; no external chatbot API is needed.",
  },
  {
    id: "energy-predictor", title: "Energy Usage Predictor",
    description: "Explore sample electricity consumption and use a small prepared regression model to estimate usage.",
    branches: [ece, mechanical, civil], interests: ["Sustainability", "Data / Analytics"], experienceLevels: [python, experienced],
    difficulty: "Guided intermediate", buildTime: 60, stack: ["Python", "Pandas", "Scikit-learn"],
    learningOutcomes: ["Choose useful prediction inputs", "Read a regression model's output", "Compare predictions with a baseline"],
    workshopRelevance: "Use a clean synthetic dataset and guided notebook to make the first prediction within an hour.",
  },
  {
    id: "image-classifier", title: "Everyday Image Classifier",
    description: "Teach a tiny browser-based demo to recognize a few everyday objects using prepared examples.",
    branches: [cse, ai, ece, other], interests: ["Computer Vision"], experienceLevels: [beginner],
    difficulty: "Beginner", buildTime: 45, stack: ["Teachable Machine", "Browser", "Sample images"],
    learningOutcomes: ["Choose image classes", "Test predictions on new examples", "Recognize bias in a small dataset"],
    workshopRelevance: "A guided no-code image experiment makes computer vision approachable for first-time builders.",
  },
  {
    id: "interview-generator", title: "Interview Question Generator",
    description: "Turn role and skill choices into a useful practice set with a structured answer checklist.",
    branches: [cse, ai, ece, mechanical, civil, other], interests: ["Career / Resume"], experienceLevels: [beginner, python, experienced],
    difficulty: "Beginner", buildTime: 50, stack: ["Python", "Streamlit", "Prompt templates"],
    learningOutcomes: ["Design structured prompts", "Create reusable question templates", "Evaluate the relevance of generated output"],
    workshopRelevance: "Build the interface using a sample question bank and learn where model-generated answers would fit.",
  },
  {
    id: "dataset-copilot", title: "Dataset Insight Copilot",
    description: "Load a small CSV, inspect missing values and surface the first useful patterns in a compact dashboard.",
    branches: [cse, ai, mechanical, civil], interests: ["Data / Analytics"], experienceLevels: [python, experienced],
    difficulty: "Guided intermediate", buildTime: 55, stack: ["Python", "Pandas", "Streamlit"],
    learningOutcomes: ["Profile an unfamiliar dataset", "Choose meaningful summary statistics", "Turn analysis into a reusable interface"],
    workshopRelevance: "Follow a prepared starter template from a raw sample CSV to a small data explorer.",
  },
  {
    id: "maintenance-demo", title: "Predictive Maintenance Demo",
    description: "Inspect synthetic sensor readings and flag unusual machine behavior before it becomes a problem.",
    branches: [mechanical, ece], interests: ["Automation", "Data / Analytics"], experienceLevels: [python, experienced],
    difficulty: "Guided intermediate", buildTime: 60, stack: ["Python", "Pandas", "Anomaly scoring"],
    learningOutcomes: ["Read a small sensor time series", "Build a simple anomaly baseline", "Explain a maintenance alert"],
    workshopRelevance: "A guided simulation connects engineering knowledge to an accessible anomaly detection workflow.",
  },
  {
    id: "sustainability-evaluator", title: "Sustainability Idea Evaluator",
    description: "Compare campus sustainability ideas across effort, potential impact and available evidence.",
    branches: [civil, mechanical, ece, other], interests: ["Sustainability"], experienceLevels: [beginner, python],
    difficulty: "Beginner", buildTime: 45, stack: ["Python", "Streamlit", "Weighted scoring"],
    learningOutcomes: ["Define a transparent decision rubric", "Normalize different comparison criteria", "Communicate uncertainty in an estimate"],
    workshopRelevance: "Build a rule-based starting point for an AI-assisted decision tool using sample campus ideas.",
  },
  {
    id: "wellness-patterns", title: "Wellness Pattern Explorer",
    description: "Explore fictional sleep and activity logs to reveal daily patterns in a friendly visual dashboard.",
    branches: [cse, ai, ece, mechanical, civil, other], interests: ["Healthcare"], experienceLevels: [beginner, python, experienced],
    difficulty: "Beginner", buildTime: 50, stack: ["Python", "Pandas", "Streamlit"],
    learningOutcomes: ["Handle a small synthetic wellness dataset", "Find associations without claiming causation", "Present patterns with responsible labels"],
    workshopRelevance: "Use fictional data for an educational healthcare-themed prototype; it does not diagnose or advise on treatment.",
  },
];
