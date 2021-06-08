import "./HomePage.css";
import selfImg from "../images/20200210_155853.jpg";

function HomePage() {
  const aboutMe =
    "New grad in Computer Science. Formerly an Aircraft mechanic for the U.S. Airforce" +
    " where i worked as a maintainer, Crash recovery team member, Inspection team member, and suport sectoin shift lead. \n" +
    "I have recently obtained a Bachelors of Science degree in Comuter Science from the University of Colorado at Colorado Springs \n" +
    "and now find myself looking for employment. The skills i am best at are general programming involving the C family of \n" +
    " languages including C++ and C#, Java, Python, and SQL to a lesser degree. Unique projects i have worked in include coursework\n" +
    " in Artificial Neural Networks otherwise known as Deep Learning, Database programming in MySQL, and a few projects involving \n" +
    "process threading and TCP/IP communication, and Udemy to a lesser degree. Another skill which may not be relevant is windows\n " +
    "forms applications using Visual Studio. In the rhealm of web development I have managed to learn a functional amount of HTML5, \n" +
    " CSS, and React using Atom and yarn. In web development I can write functioning web-pages and using skills aquired from \n" +
    "other programming experience, I shouldn't have a problem making back- end work either. Currently I am looking for jobs \n" +
    "preferably involving web development and or Machine learning, however I would also be happy with applications, embeded systems.";

  return (
    <div className="home-header">
      <h1 className="heading-val">Portfolio</h1>
      <head className="links-header">
        <h2>Justin Archibald</h2>
        <img src={selfImg} className="self" />
      </head>
      <body className="app-body">
        <h1>About me</h1>
        <p>{aboutMe}</p>
      </body>
    </div>
  );
}

export default HomePage;
