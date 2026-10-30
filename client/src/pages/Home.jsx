import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../axiosConfig';
import { AppState } from '../App';

const Home = () => {
  const { user } = useContext(AppState);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const { data } = await axios.get('/question');
        setQuestions(data.questions);
      } catch (error) {
        setQuestions([]); // 404 = no questions yet
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <section className="page">
      <div className="home__top">
        <Link to="/ask" className="btn btn--blue">Ask Question</Link>
        <h4>Welcome: <span className="name">{user?.username}</span></h4>
      </div>

      <h3 className="page__title">Questions</h3>

      {loading && <p>Loading...</p>}
      {!loading && questions.length === 0 && <p>No questions yet. Be the first to ask!</p>}

      {questions.map((q) => (
        <Link to={`/question/${q.question_id}`} className="q-item" key={q.question_id}>
          <div className="q-item__user">
            <div className="avatar">👤</div>
            <small>{q.user_name}</small>
          </div>
          <p className="q-item__title">{q.title}</p>
          <span className="q-item__arrow">›</span>
        </Link>
      ))}
    </section>
  );
};

export default Home;