import React, { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    const bookElements = document.querySelectorAll('.book');
    const notebook = document.querySelector('.notebook');
    const student = document.querySelector('.student');

    bookElements.forEach((book) => {
      book.addEventListener('click', () => {
        book.classList.toggle('open');
      });
    });

    if (notebook) {
      notebook.addEventListener('click', () => {
        notebook.classList.toggle('flip');
      });
    }

    if (student) {
      student.classList.add('animate');
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-indigo-600 text-white">
      <h1 className="text-4xl font-bold mb-4">Bienvenue sur EducControl!</h1>
      <p className="text-lg mb-8 text-center">
        "Éduquer, c'est former des esprits et bâtir des rêves."
      </p>

      {/* Élève animé */}
      <div className="student text-6xl mb-4 animate-bounce">
        🎓
      </div>

      {/* Cahier animé */}
      <div className="notebook mx-auto">
        <div className="cover text-center text-lg">Cahier</div>
        <div className="pages">
          <div className="page">Page 1</div>
        </div>
      </div>

      {/* Livres animés */}
      <div className="books-container flex gap-4 mt-6">
        <div className="book">Livre 1</div>
        <div className="book">Livre 2</div>
      </div>

      <style jsx>{`
        .student {
          margin: 20px;
          animation: bounce 1s infinite;
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .notebook {
          width: 150px;
          height: 200px;
          background: #f0e68c;
          border: 2px solid #654321;
          position: relative;
          cursor: pointer;
          margin: 20px;
          transition: transform 0.6s;
        }
        .notebook.flip {
          transform: rotateY(180deg);
        }
        .cover {
          text-align: center;
          line-height: 200px;
          font-size: 24px;
        }
        .pages {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: #fff;
          backface-visibility: hidden;
        }
        .page {
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          border-top: 1px solid #ccc;
          padding: 10px;
        }

        .books-container {
          display: flex;
          gap: 10px;
          margin-top: 20px;
        }

        .book {
          width: 80px;
          height: 120px;
          background: #8b5a2b;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 5px;
          cursor: pointer;
          transition: transform 0.3s;
        }

        .book:hover {
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
};

export default Home;
