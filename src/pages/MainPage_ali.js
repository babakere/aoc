import React from "react";
import "../ali.css";
import { Button, LeadParagraph, InputField, ErrorText, Paragraph,H5, Heading, H1, H2, OrderedList, ListItem,} from "govuk-react";
import { useState } from "react";
import picture1 from "../images/1.jpg"
import picture2 from "../images/2.jpg"
import picture4 from "../images/4.jpg"
import picture9 from "../images/9.jpg"
import picture10 from "../images/10.jpg"
import picture11 from "../images/11.jpg"
import picture12 from "../images/12.png"



function MainPage() {  {/*This line defines a function component named MainPage*/}

{/*These lines use the useState hook to create state variables for the component.
  The variables are phone, fullname, message, email, and submitted, and their initial values are empty strings or false.*/}
  const [phone, setPhone] = useState("");
  const [fullname, setFullname] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  {/*This line defines a function named handleSubmit that will be called when the form is submitted.*/}
  const handleSubmit = (e) => {  
    e.preventDefault(); 
    setSubmitted(true)
    if (!phone &&     
      !fullname &&
      !message &&
      !email ) {   {/*If none of the form fields have been filled out, nothing happens.*/}
     
    } else {
      // Handle form submission here
      console.log("Form submitted");
    }

  };
  return (
    <div className="main-page" >
     <LeadParagraph className="par">

      <H2>Access fast online AOC GP services</H2>
      We are providing system that enable people to book appiontment across England.<br/>
      Register in just three easy steps:<br/>                                                                         
  <OrderedList>
        <ListItem>
            Click register online
        </ListItem>
        <ListItem>
            Fill out your Details
        </ListItem>
        <ListItem>
            Access all our online GP services
        </ListItem>
</OrderedList>
<Button className="button">Login</Button>
<Button className="button">Register</Button>
    </LeadParagraph>

  <div><br/>
      <H1>AboutUs</H1>
        <div className="grid1">
            <img  className="picture" src={picture1}></img>
            <img className="picture" src={picture2}></img>
            <img className="picture" src={picture4}></img>
        </div>
        <div className="grid">
          <div className="box">
          <Heading size="S">Experienced Doctor</Heading>
            <p className="Paragrapgh">Our doctors are highly trained and experienced professionals<br/>
                                      who possess the necessary knowledge and skills to provide patients<br/>
                                      with accurate and up-to-date information about vaccination.</p>
          </div>
          <div className="box">
            <Heading size="S">Ensuring the safety & efficacy of vaccines</Heading>
            <p className="Paragrapgh">our doctors conduct thorough laboratory testing to ensure <br/>
                          that the vaccine is safe and effective.</p>
          </div>
          <div className="box">
            <Heading size="S">Expert Guidance and Support for Vaccinations</Heading>
            <p className="Paragrapgh">Our doctors are knowledgeable about the different types of vaccines available<br/>
                                      including those for children and adults,<br/> 
                                      and can provide guidance on the appropriate vaccination schedule for each individual.</p>
          </div>
        </div>

    <div> {/*Vaccination LOGo*/}
      <img className="vac"src={picture12}></img>
    </div>
  </div>
     
      <Heading size="L" >Location</Heading>  {/*This is the location part*/}
        <div className="Location" >
          <img src={picture11}></img>
          <p ><Heading size="M" >Nearst Tube Station</Heading>
          <H5 size="S">Great Portland Street Station:</H5> Euston Rd,London NW1<br/>
          <H5 size="S">Goodge Street Station:</H5>75 Tottenham Ct Rd, London W1P 9PA<br/>
          <H5 size="S">Warren Street Station</H5>London NW1 3AA<br/>
            <a class="btn btn-primary btn-sm" href="https://goo.gl/maps/H9QVf2e62ohUFhzo9?coh=178571&entry=tt" target="_blank" title="View the surgery location on a Google map">view map</a> 
          </p>        
        </div>
      <Heading size="L">Testimonials</Heading>  {/*This is the testimonials part*/}
        <div className="feedback">
          <div className="box1">
            <H5>Testemonial-1</H5>
          <p>"A wonderful GP practice, the best I've ever been registered with in UK.<br></br>
              Supportive and proactive doctor, excellent nurses and that rarity: kind and effiecent...."</p>
          </div>
          <div className="box1">  {/*the css have been applied to make the paragraph nice*/}
          <H5>Testemonial-2</H5>
          <p>"Good experience with friendly receptionst and doctor. "</p>
          </div>
          <div className="box1">
          <H5>Testemonial-3</H5>
          <p>"I love the surgery and the staff are not given enough respect<br/>
              so they're always  professional plus proficient.<br/>  
              Try to answer calls and patients at the same time then you will understand the process.<br/>
              Keep up the good work and thank  you for giving me what I need"</p>
          </div>
        </div>
      
    
        <Heading>Blog</Heading>
        <div className="blog">
          <img className="picture"src={picture9}></img>
          <img className="picture"src={picture10}></img>
          
          <div className="blog1">
            <H5>Post-Vaccination Health Guidelines</H5>
            <p>Stay vigilant: Continue to follow recommended health guidelines such as wearing<br/>
               a mask and practicing social distancing even after vaccination<br/>
              until the pandemic is under control.</p>
          </div>
           <div className="blog1">
              <H5>Consult your Doctor before Vaccination</H5>
              <p>Talk to your healthcare provider: If you have any medical conditions or concerns,<br/>
                  talk to your healthcare provider before getting vaccinated.</p>
           </div>
        </div>
     
       
        <div className="contact"> 
          <Heading size="M">Contact Us</Heading>
        <InputField 
                type="text"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}>FullName</InputField>
        {/*This line displays an error message within an ErrorText component if variable is falsy (empty string or null) and submitted is true.*/}
        {!fullname && submitted?(<ErrorText>Required</ErrorText>):null}  
        <InputField
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}>PhoneNumber</InputField>
                {!phone && submitted?(<ErrorText>Required</ErrorText>):null}
        <InputField 
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}>Email</InputField>
                {!email && submitted?(<ErrorText>Required</ErrorText>):null}
         </div> 
        <div>
          <H1 size="S">Message</H1>
          <textarea  onChange={(e) => setMessage(e.target.value)}></textarea>
          {!message && submitted?(<ErrorText>Required</ErrorText>):null}
        </div>
        {/*This line creates a Button component with an onClick handler that calls the handleSubmit function when the button is clicked.*/}
        <Button  onClick={(e) => handleSubmit(e)}>Submit</Button>
        <br/>
        <Button buttonShadowColour="#f49938">
        <a href="#ok">Back To Top</a>
        </Button>

    </div>
  );
}

export default MainPage;
