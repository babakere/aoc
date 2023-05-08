import React from "react";
import "../ali.css";
import { Button, LeadParagraph, InputField, ErrorText} from "govuk-react";
import { useState } from "react";
import picture1 from "../images/1.jpg"
import picture2 from "../images/2.jpg"
import picture4 from "../images/4.jpg"
import picture9 from "../images/9.jpg"
import picture10 from "../images/10.jpg"
import picture11 from "../images/11.jpg"
import picture12 from "../images/12.png"

// import { Panel } from "govuk-react";
// import ButtonToTop from "./backToTop"

// import Image from "./";

function MainPage() {

  const [phone, setPhone] = useState("");
  const [fullname, setFullname] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true)
    if (!phone &&
      !fullname &&
      !message &&
      !email ) {
     
    } else {
      // Handle form submission here
      console.log("Form submitted");
    }

  };
  return (
    <div className="main-page" >
      <div className="welcome" >

    <LeadParagraph className="par">We are providing system that enable people to book appiontment across England.<br/>
                                  <h2>Access fast online AOC GP services</h2>
                                  Your health should alwyas be your Top priority and concern,regardless of how busy your schedule is.<br/>

                                   </LeadParagraph>
                                   <p><h3>Register in just three easy steps:<br/>
                                              1- Click register online<br/>
                                              2- Fill out your Details<br/>
                                              3- Access all our online GP services
                                              </h3></p>
    <Button className="button">Login</Button>
    <Button className="button">Register</Button>
    {/* <Panel title="panel">This is my panel</Panel> */}

      {/*<button class="govuk-button" data-module="govuk-button">
        {" "}
        Save and continue
      </button>*/}
      </div>
      <section>
      <h1>AboutUs</h1>
      <div>
        <div className="grid1">
        <img  className="picture" src={picture1}></img>
            {/* <img src={picture}  ></img> */}
            {/* <img src={Image}></img> */}
            <img className="picture" src={picture2}></img>
            <img className="picture" src={picture4}></img>
        </div>
        <div className="grid">
          {/* title */}
          
          <div className="box">
          <p>Dog</p>
            <p className="Paragrapgh">ghghsgdjgfasjhgjahajh<br/>sagfajsghfajhgfjhgasdf<br/> hxjhsfhgakjdghjkhgkjghf</p>
          </div>
          <div className="box">

            <p>c-dog</p>
            <p className="Paragrapgh">ghghsgdjgfasjhgjahajh<br/>sagfajsghfajhgfjhgasdf<br/> hxjhsfhgakjdghjkhgkjghf</p>
          </div>
          <div className="box">

            <p>B-dog</p>
            <p className="Paragrapgh">ghghsgdjgfasjhgjahajh<br/>sagfajsghfajhgfjhgasdf<br/> hxjhsfhgakjdghjkhgkjghf</p>
          </div>
          {/* paragraph */}  
        </div>

        {/* <img className="hos"src="https://www.rbht.nhs.uk/sites/default/files/Images/Harefield%20Hospital%203%20v2.jpg"></img> */}
        <di>
          <img className="vac"src={picture12}></img>
        </di>
      </div>
      </section>
        <h1>Location</h1>
      <section>
        <div className="Location">
          <img className="picture" src={picture11}></img>
          <p className="hs"><h1>Nearst Tube Station</h1><h4>Great Portland Street Station:</h4> Euston Rd,London NW1<br/><h4>Goodge Street Station:</h4>75 Tottenham Ct Rd, London W1P 9PA<br/><h4>Warren Street Station
: </h4>London NW1 3AA<br/></p>        
        </div>
      </section>
      {/* <section>
      <h3>AOC Surgery</h3>
        <div className="big">
          <p>hadshfasgfjagsdja</p>
          <img className="porn" src="https://www.cdc.gov/healthypets/images/pets/cute-dog-headshot.jpg?_=42445"></img>
        </div>
      </section> */}
      <section>
        <h1>Testimonials</h1>
        <div className="feedback">
          <div className="box1">
          <p>"A wonderful GP practice, the best I've ever been registered with in UK.<br></br>
              Supportive and proactive doctor, excellent nurses and that rarity: kind and effiecent...."</p>
          </div>
          <div className="box1">
          <p>"Good experience with friendly receptionst and doctor. "</p>
          </div>
          <div className="box1">
          <p>"I love the surgery and the staff are not given enough respect<br/>
              so they're always  professional plus proficient.<br/>  
              Try to answer calls and patients at the same time then you will understand the process.<br/>
              Keep up the good work and thank  you for giving me what I need"</p>
          </div>
         
        </div>
      </section>
      <section>
        <h1>Blog</h1>
        <div className="blog">
          <img className="picture"src={picture9}></img>
          <img className="picture"src={picture10}></img>
          
          
          <div className="blog1">
            <p>Post-Vaccination Health Guidelines</p>
            <p>Stay vigilant: Continue to follow recommended health guidelines such as wearing<br/>
               a mask and practicing social distancing even after vaccination<br/>
                until the pandemic is under control.</p>
          </div>
           <div className="blog1">
              <p>Consult your healthcare provider before vaccination</p>
              <p>Talk to your healthcare provider: If you have any medical conditions or concerns,<br/>
                  talk to your healthcare provider before getting vaccinated.</p>
           </div>
         
        </div>
      </section>
      <section>
        <h1>Contact Us</h1>
      <div className="contact">
        <InputField className="Field"
                type="text"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}>FullName</InputField>
        {!fullname && submitted?(<ErrorText>Required</ErrorText>):null}
        <InputField className="Field"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}>PhoneNumber</InputField>
                {!phone && submitted?(<ErrorText>Required</ErrorText>):null}
        <InputField className="Field"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}>Email</InputField>
                {!email && submitted?(<ErrorText>Required</ErrorText>):null}
        </div>
        <div>
          <h5>Message</h5>
          <textarea onChange={(e) => setMessage(e.target.value)}></textarea>
          {!message && submitted?(<ErrorText>Required</ErrorText>):null}
        </div>
        <Button onClick={(e) => handleSubmit(e)}>Submit</Button>
      </section>
<a href="#ok">Back To Top</a>
      {/* <ButtonToTop>top</ButtonToTop> */}
    </div>
  );
}

export default MainPage;
