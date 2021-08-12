import "./Projects.css";

function Projects() {
  return (
    <div class="projects">
      <body className="projects-page">
        <h1>Projects</h1>
        <h2>GITHub</h2>
        <li>
          <a
            className="st-Lstm"
            href="https://github.com/Archibajl/PythonProgramming_StockTracker.git"
            target="blank"
          >
            Stock Prediction LSTM
          </a>
        </li>
        <p>
          This project is a Deep learning network that uses Tensorflow Keras, SK
          learn, and gensim models to predict stock prices from stock data and
          sentiment. This uses one multi layered neural network and 1 linear
          neural netowrk for sentiment analysis.
        </p>
        <li>
          <a
            className="CS-proj"
            href="https://github.com/Archibajl/JArch_CS3020.git"
            target="blank"
          >
            Sudoku solver, threaded collision detection, TCP connection
            Tic-Tac-standalone
          </a>
        </li>
        <p>
          Multiple C# projects that include collision detection multi-threading,
          Sudoku game and game solver, and multi-player Tic-Tac-Toe that uses
          TCP/IP connection to play across 2 computers via windows forms.
        </p>
        <li>
          <a
            className="ANN-proj"
            href="https://github.com/Archibajl/ANN.git"
            target="blank"
          >
            Python Deep learning Projects
          </a>
        </li>
        <p>
          Multiple Deep learning couse projects using Tensorflow Keras, Python,
          SK-learn, and CNN LSTM and many ther types of artificial neural
          networks.
        </p>
      </body>
    </div>
  );
}

export default Projects;
