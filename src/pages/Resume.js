import "./Resume.css";

const key_qualifications =
  "•	COMPUTER SCIENCE SKILLS Machine Learning (TensorFlow Keras), Algorithms, OOP,  MySQL, C, C++, C# " +
  ", JAVA,  VISUAL BASIC, Python, Bash Script, LINQ, SQL, Unity, basic TCP/IP, basic HTML/CSS & Javascript, programming." +
  "•	Github pages included in projects page." +
  "•	PRIOR SECURITY CLEARANCE, 	LEADERSHIP,	MULTI LINGUAL." +
  "•	MANAGEMENT EXPERIENCE,	CRASH TRAINING/ EXP,	ADR/HAZ MATERIAL TRANSPORT AND STORAGE QUALIFICATIONS & EXPERIENCE." +
  "•	7 LEVEL, RED X QUALAFIED.";

const employment_CS = "";
const employment_AF = "";
const education =
  "•	Bachelors of Science Computer Science. School: UCCS \n" +
  "•	Associates of Science degree from Pikes Peak Community College (PPCC). \n" +
  "•	Associates of General Studies from Pikes Peak Community College (PPCC). \n" +
  "•	Currently attending UCCS Computer Science program on track for receipt of a Bachelors Degree in 2020. \n" +
  "•	61/64 Credits required for Associates in AVIATION MAINTENANCE TECHNOLOGY \n" +
  "•	Airmen leadership school See EXPERIENCE. \n" +
  "•	ADR shipping certified. \n";

function Resume() {
  return (
    <>
      <body className="resume-page">
        <h1>Resume</h1>
        <h2>Sumary</h2>
        <p>
          Computer Science Major & Software Engineer/Developer, and Aircraft
          Maintainer. “OPEN TO OPPORTUNITIES”.
        </p>
        <h3>Key Qualifications</h3>
        <p>{key_qualifications}</p>
        <h4>Experience:</h4>
        <p>{}</p>
        <h5>EMPLOYMENT HISTORY</h5>
        <p>{employment_CS}</p>
        <p>{employment_AF}</p>
        <h6>EDUCATION</h6>
        <p>{education}</p>
      </body>
    </>
  );
}

export default Resume;
