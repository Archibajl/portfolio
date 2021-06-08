import "./Projects.css";

function Projects() {
  return (
    <>
      <body className="projects-page">
        <h1>Projects</h1>
        <h2>GITHub</h2>
        <a
          className="st-Lstm"
          href="https://github.com/Archibajl/PythonProgramming_StockTracker.git"
        >
          Stock Prediction LSTM
        </a>
        <p>
          This project is a Deep learning network that uses Tensorflow Keras, SK
          learn, and gensim models to predict stock prices from stock data and
          sentiment. This uses one multi layered neural network and 1 linear
          neural netowrk for sentiment analysis.
        </p>
        <a
          className="CS-proj"
          href="https://github.com/Archibajl/JArch_CS3020.git"
        >
          Sudoku solver, threaded collision detection, TCP connection
          Tic-Tac-standalone
        </a>
        <p>
          Multiple C# projects that include collision detection multi-threading,
          Sudoku game and game solver, and multi-player Tic-Tac-Toe that uses
          TCP/IP connection to play across 2 computers via windows forms.
        </p>
        <a className="ANN-proj" href="https://github.com/Archibajl/ANN.git">
          Python Deep learning Projects
        </a>
        <p>
          Multiple Deep learning couse projects using Tensorflow Keras, Python,
          SK-learn, and CNN LSTM and many ther types of artificial neural
          networks.
        </p>
      </body>
    </>
  );
}

export default Projects;
