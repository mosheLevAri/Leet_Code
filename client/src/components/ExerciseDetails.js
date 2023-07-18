import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CodeMirror from "@uiw/react-codemirror";
import { java } from "@codemirror/lang-java";

const ExerciseDetails = () => {
  const params = useParams();
  const [ExecriseData, setExecriseData] = useState();
  const [code, setCode] = useState();

  useEffect(getLanguage, [params.id]);
  function getLanguage() {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    console.log(params.id);
    axios
      .get(`http://localhost:3000/exercises/${params.id}`, { headers })
      .then((result) => {
        setExecriseData(result.data[0]);
        console.log(result.data);
      })
      .catch((err) => console.log(err));
  }
  const [showSolution, setShowSolution] = useState(false);

  const onChange = React.useCallback((value, viewUpdate) => {
    setCode(value);
    // console.log("value:", value);
  }, []);

  const submitCode = () => {

    try {
      const res = axios.post('http://localhost:3000/java', code)

      console.log(res);
      
    } catch (error) {
      console.log(error);
    }

  };

  const toggleSolution = () => {
    setShowSolution((prevShowSolution) => !prevShowSolution);
  };

  return (
    <div className="exercisePage">
      {ExecriseData ? (
        <div className="ExecriseQuestion">
          <h3>{ExecriseData.description}</h3>
          <p>Difficulty: {ExecriseData.difficulty}</p>
          <p>Category: {ExecriseData.category}</p>
          <p>Duration: {ExecriseData.duration} minutes</p>

          <div className="details-wrapper">
            <h3>Question:</h3>
            <pre>
              <p>{ExecriseData.question.details}</p>
            </pre>
          </div>
          <h3>Examples:</h3>
          {ExecriseData.question.exemplesCode.map((example, index) => (
            <pre key={index}>
              <code>{example}</code>
            </pre>
          ))}

          {showSolution && (
            <div>
              <h4>Solution:</h4>
              <p>{ExecriseData.question.solution}</p>
            </div>
          )}
          <br></br>
          <button onClick={toggleSolution}>
            {showSolution ? "Hide Solution" : "Show Solution"}
          </button>
        </div>
      ) : (
        <div className="Loader">one second</div>
      )}
      <div>
        <h1>Online Editor</h1>
        <div className="top-20 bottom-40 left-10 width-100% ">
          <CodeMirror
            value={code}
            height="70vh"
            width="55vw"
            theme="dark"
            extensions={[java()]}
            onChange={onChange}
          />
          <div className="border-2 bg-green-500" onClick={submitCode}>
            Submit
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseDetails;
