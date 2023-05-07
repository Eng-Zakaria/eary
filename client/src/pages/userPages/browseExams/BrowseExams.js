import React, { useState, useEffect } from "react";
import Search from "./Search";
import ExamGrid from "./ExamGrid";

function BrowseExams() {
  const [exams, setExams] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch exams from database and update state
    fetch("/api/exams")
      .then((response) => response.json())
      .then((data) => setExams(data))
      .catch((error) => console.log(error));
  }, []);

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredExams = exams.filter((exam) =>
    exam.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Search onSearchQueryChange={handleSearchQueryChange} />

      <ExamGrid exams={filteredExams} />
    </div>
  );
}

export default BrowseExams;
