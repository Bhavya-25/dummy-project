"use client"


import { useState } from 'react';
import Head from 'next/head';

const topics = [
  "UPSC", "NEET", "JEE", "Personal Training", "Yoga", "Diet", "Zumba", "Weight Loss",
  "Eye Makeup", "Face Makeup", "Lip Makeup", "Nails Makeup", "Hair Styling",
  "Hair Oil & Masks", "Skin Care Masks", "Hair Supplements", "Sun Care",
  "Natural Remedies", "Acne", "Body Care", "Skin Supplements"
];

const occupations = [
  { label: "Student", icon: "🎓" },
  { label: "Working professional", icon: "💼" },
  { label: "Domestic worker", icon: "🧹" },
  { label: "Homemaker", icon: "🏠" },
  { label: "Other (Please specify here)", icon: "➕" }
];

const months = ["APR", "MAY", "JUN"];
const days = ["31", "01", "02"];
const years = ["2005", "2006", "2007"];

export default function InitialProfile() {
  const [step, setStep] = useState(1);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedOccupation, setSelectedOccupation] = useState("");
  const [dob, setDob] = useState({ month: "APR", day: "31", year: "2005" });

  const handleTopicSelect = (topic) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter(t => t !== topic));
    } else if (selectedTopics.length < 5) {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const handleNext = () => {
    if (step === 1 && selectedTopics.length === 0) {
      alert("Please select at least one topic.");
      return;
    }
    if (step === 2 && !selectedOccupation) {
      alert("Please select an occupation.");
      return;
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleOccupationSelect = (occupation) => {
    setSelectedOccupation(occupation);
  };

  const handleDobChange = (field, value) => {
    setDob({ ...dob, [field]: value });
  };

  return (
    <>
      <Head>
        <title>Learner Registration Flow</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          {step === 1 && (
            <div>
              <h1 className="text-2xl font-bold mb-2">What do you want to learn about or what interests you?</h1>
              <p className="text-sm text-gray-500 mb-4">(Pick any 5 to personalize your feed)</p>
              <div className="grid grid-cols-2 gap-3">
                {topics.map((topic) => (
                  <button
                    key={topic}
                    onClick={() => handleTopicSelect(topic)}
                    className={`py-2 px-4 rounded-full border ${
                      selectedTopics.includes(topic)
                        ? "bg-teal-500 text-white border-teal-500"
                        : "border-gray-300 text-gray-700"
                    }`}
                    disabled={!selectedTopics.includes(topic) && selectedTopics.length >= 5}
                  >
                    {topic}
                  </button>
                ))}
              </div>
              <button
                onClick={handleNext}
                className="mt-6 w-full py-3 bg-teal-500 text-white rounded-full"
              >
                Next
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <button onClick={handleBack} className="text-teal-500 mb-4">←</button>
              <h1 className="text-2xl font-bold mb-2">Tell us about yourself and your work.</h1>
              <p className="text-sm text-gray-500 mb-4">
                (Your occupation helps us ensure our learning resources are relevant and engaging for learners of all ages.)
              </p>
              <div className="space-y-3">
                {occupations.map((occupation) => (
                  <button
                    key={occupation.label}
                    onClick={() => handleOccupationSelect(occupation.label)}
                    className={`w-full py-3 rounded-full border flex items-center justify-center space-x-2 ${
                      selectedOccupation === occupation.label
                        ? "bg-teal-500 text-white border-teal-500"
                        : "border-gray-300 text-gray-700"
                    }`}
                  >
                    <span>{occupation.icon}</span>
                    <span>{occupation.label}</span>
                  </button>
                ))}
              </div>
              <button
                onClick={handleNext}
                className="mt-6 w-full py-3 bg-teal-500 text-white rounded-full"
              >
                Next
              </button>
            </div>
          )}

          {step === 3 && (
            <div>
              <button onClick={handleBack} className="text-teal-500 mb-4">←</button>
              <h1 className="text-2xl font-bold mb-2">Share your Birthday.</h1>
              <p className="text-sm text-gray-500 mb-4">
                (Your birth date will enhance our understanding as we tailor content to suit your age and learning preferences.)
              </p>
              <div className="flex space-x-3 mb-6">
                <select
                  value={dob.month}
                  onChange={(e) => handleDobChange("month", e.target.value)}
                  className="w-1/3 py-2 border rounded-lg text-center"
                >
                  {months.map((month) => (
                    <option key={month} value={month}>{month}</option>
                  ))}
                </select>
                <select
                  value={dob.day}
                  onChange={(e) => handleDobChange("day", e.target.value)}
                  className="w-1/3 py-2 border rounded-lg text-center"
                >
                  {days.map((day) => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
                <select
                  value={dob.year}
                  onChange={(e) => handleDobChange("year", e.target.value)}
                  className="w-1/3 py-2 border rounded-lg text-center"
                >
                  {years.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleNext}
                className="w-full py-3 bg-teal-500 text-white rounded-full flex items-center justify-center space-x-2"
              >
                <span>Say Hello to your Homepage</span>
                <span>→</span>
              </button>
            </div>
          )}

          {step === 4 && (
            <div>
              <h1 className="text-2xl font-bold mb-4">Welcome to Your Homepage!</h1>
              <p className="text-gray-700">
                You selected: {selectedTopics.join(", ")}<br />
                Occupation: {selectedOccupation}<br />
                DOB: {dob.month} {dob.day}, {dob.year}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}