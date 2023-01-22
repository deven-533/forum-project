import React from "react";
import "./qu.css";
import Editor from "./Editor";
import { useState } from "react";
import Navbar from "./Navbar";

const ans = {
  title:
    "How to use JSON object generassssted from SQL Server to populate HTML elements?",
  time: "today",
  Viewed: "2 times",
  question: `
    In my SQL query PHP I have: <?php      $mstr_ID = $_GET['MF_ID'];     $sql = "select hospital, patient_id from masterfileaccess where masterfile_id = " . $mstr_ID . "FOR JSON PATH";     $patLookup = sqlsrv_query($conn,$sql);     $row = sqlsrv_fetch_array($patLookup, SQLSRV_FETCH_ASSOC);     echo json_encode($row);     sqlsrv_free_stmt($patLookup);     sqlsrv_close($conn);  ?>  
In my javascript function I have:
function chooseThisPatient(id,name){      const mstrID = name.substring(2);     const xhttp = new XMLHttpRequest();     xhttp.onload = function() {     const res = JSON.parse(xhttp.responseText);          alert(res)        // what do I do here to access the JSON file?     }     let phpfile = "cardiac/phps/cardiacGetPatientData.php?MF_ID=" + mstrID;     xhttp.open("GET", phpfile);     xhttp.send();  } 
When I run the select on SQL Management Studio, I get: [{"hospital":"Good Hospital","patient_id":"12345678"}]  
When I run chooseThisPatient() withOUT the JSON.parse, alert(res) gives me: {"JSON_F52E2B61-18A1-11d1-B105-008-5F49916B":"[{\"hospital\":\"Good Hospital\",\"patient_id\":\"12345678\"}]"}  
When I run chooseThisPatient() WITH the JSON.parse, alert(res) gives me: Object object
I have tried xhttp.responseXML, res[x] (where x is 0-10) - this gives me single characters '[','{','', etc. Have tried res.hospital (undefined), res['hospital'] (undefined), res.key, res.key(), res.key[0], res.keys, Object.keys(res), Object.keys(res[0], all without being able to see what the JSON is holding.
What I would LIKE to happen is to be able to put the JSON object in a loop and update HTML elements, something like: for( x in res){      const key = x.key;     const value = x[key];     document.getElementById(key).innerHTML = value;  }  
    `,

  label: ["javascript", "html", "css", "sql", "php"],
};

const QuestionMap = () => {
    const [value,setValue] = useState(false);
    const handleonclick = () => {
        setValue(true);
    }
  return (
    <>
    <Navbar/>
    <div className="main-container">
      <div className="main-heading">
        <div className="head">
          <div>{ans.title}</div>
        </div>
        <div className="status">
          <div className="status-text">
            <label>Asked </label>
            <span>{ans.time}</span>
          </div>
          <div className="status-text">
            <label>Viewed </label>
            <span>{ans.Viewed}</span>
          </div>
        </div>

        <div className="space"></div>
        <div className="space"></div>
        <div className="main-question">
          <div className="question-qs">
            <div className="upvote">
              <button>T</button>
              <span className="count">2</span>
            </div>
            <div className="real-question">
              <div className="main-question">{ans.question}</div>
              <div className="main-label">
                {ans.label.map((item) => {
                  return <span  className='tagq'>{item}</span>;
                })}
              </div>
            </div>
          </div>
          <div className="metrix">
        
          </div>
        </div>
        
        <div className="top-heading-comm" onClick={handleonclick}>
            <span >Add comment</span>
        </div>

        {
          value ?
          <> 
            <div className="editor-question">
                <Editor />
            </div> 
            <button className="submit-button">Submit</button>
            </>
            : null
          }

        <div className="top-heading">
          <div className="answer-heading">{28} Answers</div>
        </div>


        <div className="answer-question">
          <div className="question-qs">
            <div className="upvote">
              <button>T</button>
              <span className="count">2</span>
            </div>
            <div className="real-question">
              <div className="main-question">{ans.question}</div>
              <div className="main-label">
                {ans.label.map((item) => {
                  return <span  className='tagq'>{item}</span>;
                })}
              </div>
            </div>
          </div>
          <div className="metrix">
            
          </div>
          </div>

          <div className="editor-question">
            <Editor />
          </div>
          <button className="submit-button">Submit</button>
            
        </div>  
    </div>
                </>

  );
};

export default QuestionMap;
