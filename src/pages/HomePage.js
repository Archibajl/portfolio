import "./HomePage.css";
import selfImg from "../images/DSC02218.JPG";

function HomePage() {
  let aboutMe = (
    <text>
      <br />
      New grad in Computer Science. Formerly an Aircraft mechanic for the U.S.
      Airforce where i worked as a maintainer, Crash recovery team member,
      Inspection team member, and suport sectoin shift lead.
      <br /> I have recently obtained a Bachelors of Science degree in Comuter
      Science from the University of Colorado at Colorado Springs and now find
      myself looking for employment.
      <br />
      The skills i am best at are general programming involving the C family of
      languages including C++ and C#, Java, Python, and SQL to a lesser degree.
      <br /> Unique projects i have worked in include coursework in Artificial
      Neural Networks otherwise known as Deep Learning, Database programming in
      MySQL, and a few projects involving process threading and TCP/IP
      communication, and Udemy to a lesser degree.
      <br /> Another skill which may not be relevant is windows forms
      applications using Visual Studio. In the rhealm of web development I have
      managed to learn a functional amount of HTML5, CSS, and React using Atom
      and yarn. In web development I can write functioning web-pages and using
      skills aquired from other programming experience, I shouldn't have a
      problem making back-end work either.
      <br /> Currently I am looking for jobs preferably involving Software
      Engineering/Development and or Machine learning, however I would also be
      happy with applications, embeded systems.
    </text>
  );

  //  aboutMe = aboutMe.forEach((string) => string.where((st == \n) => <br />));

  return (
    <div className="home-page">
      <h1 className="h1">Portfolio</h1>
      <head
        className="home-header"
        alt="Image of Himeji Castle at night in Himeji city"
      >
        <h2 className="h2">Justin Archibald</h2>
      </head>
      <body className="home-body">
        <h1 className="h1H">About me</h1>

        <p>
          <text>{aboutMe}</text>
          <br />
          <br />
          <br />
          <br />
        </p>
        <img
          src={selfImg}
          className="self"
          alt="shaped waterfall image"
          keywords=""
        />
      </body>
    </div>
  );
}

export default HomePage;
