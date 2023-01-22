
import React from 'react'
import { useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios'
const Ask = () => {
  const [title , setTitle ] = useState("")
  const [description , setDescription ] = useState("")
  const [tags , setTags ] = useState("")
  const handleSubmit = (e) =>{
    e.preventDefault()
    const data = {
      title:title,
      mainQuestion:description
      // tags:tags.split(' ')
    }
    axios.post('http://localhost:5000/api/v1/questions',data).then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    
  }
  return (
    <>
    <Navbar/>
      <div class="intro">
        <h1 id="title-x">Enter The Question</h1>

      </div>
      <div class="container">

        <div class="input">
          <label class="name-label"><p>Title : </p>
            <input type="text" onChange={(e)=>{setTitle(e.target.value)}} id="name" placeholder="Enter the title" required />
          </label>
          <div class="comments">
            <p>Description :</p>
            <textarea id="text" onChange={(e)=>{setDescription(e.target.value)}} placeholder="Describe your Question"></textarea>
          </div>
          <label class="name-label"><p>Tags : </p>
            <input onChange={(e)=>{setTags(e.target.value)}} type="text" id="name" required />
          </label>


          <br />


          <br />
          <button id="submit" value="submit" onClick={handleSubmit}>Submit</button>

        </div>
      </div>

      </>

      )
}

      export default Ask
