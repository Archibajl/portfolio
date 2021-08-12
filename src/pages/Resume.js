import "./Resume.css";

const key_qualifications = (
  <text>
    • COMPUTER SCIENCE SKILLS: <br />
    -Programming languages: OOP, MySQL, C, C++, C# , JAVA, VISUAL BASIC, Python,
    Bash Script.
    <br />
    -Secondary Skills: Machine Learning (TensorFlow Keras), Algorithms, LINQ,
    SQL/MySQL, Unity, basic TCP/IP.
    <br />
    -Web-Developer skills: self-taught HTML/CSS & Javascript, programming;
    Related: React, React-bootstrap.
    <br />
    • Github pages included in projects page.
    <br />
    • Other Skills: PRIOR SECURITY CLEARANCE, LEADERSHIP, MULTI-LINGUAL.
    <br />
    • MANAGEMENT EXPERIENCE, CRASH TRAINING/ EXP, ADR/HAZ MATERIAL TRANSPORT AND
    STORAGE QUALIFICATIONS & EXPERIENCE.
    <br />• 7 LEVEL, RED X QUALAFIED.
  </text>
);

const employment_CS = "";
const employment_AF = "";

const education = (
  <text>
    • Bachelors of Science Computer Science. School: UCCS <br />
    • Associates of Science degree from Pikes Peak Community College (PPCC).
    <br />
    • Associates of General Studies from Pikes Peak Community College (PPCC).
    <br />
    • 61/64 Credits required for Associates in AVIATION MAINTENANCE TECHNOLOGY.
    <br />
    • Airmen leadership school See EXPERIENCE. <br />• ADR shipping certified.
  </text>
);
const cSExp = (
  <text>
    Machine Learning (Artificial Neural Networks) – Semester work on Neural
    Networks, some experience using CNN, ANN, and LSTM Neural Network models.
    Other involving Data shaping and manipulation. Tensorflow Keras, genism
    glove & word2vec word processing.
    <br />
    Database Systems – Some experience writing MySQL database creation and
    queries, in Databases, tables, and row/column creation.
    <br />
    Operating Systems – Experience in navigating and editing the Linux kernel
    and other components, includes command line software installations,
    navigation, gcc, automated script writing, and kernel editing. Minor
    Experience with command line in windows CMD prompt, much more experience
    running and debugging third party open-source programs.
    <br />
    Unity game dev – Produced Card games for projects, involving screen change,
    design, movement functionality, and event sequences.
    <br />
    C++ - 3 semesters in C++ programming language, I can code some C++ programs
    mostly using command prompt and work with general text files, Linked lists,
    Classes, ect.
    <br />
    C# - 1 semester in C# programming language, I can code general C# programs
    proficient in using the .NET framework both windows forms based programs and
    console programs. Includes use of Lists, Abstract classes, Interfaces,
    Threading, Linq & Lambda, some TCP/ network/port communication, and Xamil.
    Produced Enigma encode, forms applications, command prompt text games, and
    others.
    <br />
    C- 3 semester of C programming, can work with Linked Lists, pipe lining,
    strings, and other problems related to C++.
    <br />
    Python – Can preform all basic tasks in Python programming language, worked
    with TensorFlow, Keras, SK-Learn, and others.
    <br />
    Java – Experience writing and linking programs in Java using classes, lists,
    on Eclipse, and Visual Studio IDEs, Debug, ect. Includes basic knowledge and
    work involving JavaScript.
    <br />
    Html, CSS, Javascript- Minor experience making web pages includes use of
    HTML and CSS, also includes basic knowledge of Javascript.
    <br />
    BASH/ Shell scripting - Can perform general commands/modifications, general
    !binbash scripts, directory searches, alias, global and local variables,
    Ubuntu based software instillation/update, and logical volume management,
    gcc.
    <br />
    Visual Basic - 1 semester in basic Visual Basic forms-based programs, can
    code general Visual Basic programs. Includes Text file storage, Lambda, SQL,
    and Database usage.
    <br />
    Architectural Languages - Can program some architectural language programs,
    can use MIPS somewhat but prefer X86.
  </text>
);

const acftExp = (
  <text>
    AIRCRAFT MAINTENANCE: A/R- Well versed in critical aircraft flight control,
    landing gear and canopy systems on fighter aircraft, 3 years hands on
    experience rigging and replacing close tolerance components to improve
    aerodynamics and performance while leading and performing within a team.
    <br />
    CDDAR “Crashed, Damaged and Disabled Aircraft removal/recovery”- Proficient
    in Crashed, Damaged and Disabled Aircraft removal/recovery and equipment
    maintenance recovered 16 aircraft from barrier engagements and crashes, and
    responded to 74+ emergency calls.
    <br /> Crew Chief- 3 years experience in aircraft inspections, hydraulics
    secondary power and control systems trouble shooting.
    <br /> Also components replacement, bleeding and operational/leak checking.
    <br /> Forms Expert - 6+ years of aircraft forms maintaining experience, and
    several years of Cams/IMDS system experience.
    <br /> 7 level- 2 years experience red X qualified, subject matter expert
    air frame general.
    <br /> Support Section- 1.5 years experience managing Airfield Driving,
    Precision, measurement and diagnostics equipment programs and Hazardous
    materials storage, transportation, procurement and disposal program. As well
    as being unit dangerous goods certifier for transport on land and air, with
    European regulation ADR qualification good for 5 years from 2014.
    <br /> Air force qualified driver- previously qualified driving Forklift,
    Tow Vehicles MB-2, MB-4, BOBTAIL, and experience towing small to medium
    frame aircraft.
    <br /> Personnel manager/supervisor - over 2 years managing 25 + personnel
    on a daily basis and personally supervising 3 personnel regularly “military
    supervisors are generally responsible for people they are supervisors of, in
    day to day shift supervision is generally 10+”.
    <br /> ALS “Airmen Leadership School”- Completed 23 Day leadership course
    worth 16 Credit hours learned writing, public speaking, front line
    management skills and communication skills.
    <br />
    Hazardous goods manager - Previously hazardous goods manager trained and was
    responsible for hazardous goods storage disposal and shipment by air and
    truck for my previous maintenance unit.
    <br /> USPS: Casual Clerk-Managed mail processing and sorting. Machine
    sorting 5000 + letters per day.
    <br /> Package handler: Sorted and shipped 100 + packages per day.
    <br /> LIFT OPS: Lift operator- operated multi-million dollar chair lift
    responsible for safe transport of more than 100 people entering and exiting
    the lift.
    <br /> Customer service professional- assisted individuals with inquires and
    assistance.
  </text>
);

function Resume() {
  return (
    <div class="resume-tab">
      <header class="hr"></header>
      <body className="resume-page">
        <h1>Resume/CV</h1>
        <h2>Summary</h2>
        <p>
          Computer Science Major & Software Engineer/Developer, and Aircraft
          Maintainer. “OPEN TO OPPORTUNITIES”.
        </p>
        <h3>Key Qualifications</h3>
        <p>{key_qualifications}</p>
        <h4>Experience:</h4>
        <div>
          <h1 class="head-text">Programming/CS</h1>
          <p>
            {cSExp}
            <br />
            <br />
            <h2 class="head-text">Aircraft Maintenance/DOD</h2>
            {acftExp}
          </p>
        </div>
        <h5>EMPLOYMENT HISTORY</h5>
        <p>{employment_CS}</p>
        <p>{employment_AF}</p>
        <h6>EDUCATION</h6>
        <p>{education}</p>
      </body>
      <footer class="fr"></footer>
    </div>
  );
}

export default Resume;
