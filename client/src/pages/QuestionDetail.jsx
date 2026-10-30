import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axiosConfig';

const QuestionDetail = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [error, setError] = useState('');
  const answerDom = useRef(null);

  async function loadAnswers() {
    try {
      const { data } = await axios.get(`/answer/${id}`);
      setAnswers(data.answers);
    } catch (err) {
      setAnswers([]);
    }
  }

  useEffect(() => {
    async function load() {
      try {
        const { data } = await axios.get(`/question/${id}`);
        setQuestion(data.question);
        loadAnswers();
      } catch (err) {
        setError(err.response?.data?.message || 'Could not load question');
      }
    }
    load();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    const answer = answerDom.current.value.trim();
    if (!answer) {
      alert('Please provide answer');
      return;
    }
    try {
      await axios.post('/answer', { questionid: Number(id), answer });
      answerDom.current.value = '';
      loadAnswers(); // stay on the page and show the new answer
    } catch (err) {
      alert(err.response?.data?.message || 'Could not post answer');
    }
  }

  if (error) return <section className="page"><p>{error}</p></section>;
  if (!question) return <section className="page"><p>Loading...</p></section>;

  return (
    <section className="page">
      <h3 className="page__title">Question</h3>
      <h4 className="q-title">{question.title}</h4>
      <p className="q-desc">{question.content}</p>
      <small>Asked by {question.user_name}</small>

      <h2 className="community">Answer From The Community</h2>

      {answers.length === 0 && <p>No answers yet. Be the first to answer!</p>}
      {answers.map((a) => (
        <div className="answer" key={a.answer_id}>
          <div className="q-item__user">
            <div className="avatar">👤</div>
            <small>{a.user_name}</small>
          </div>
          <p>{a.content}</p>
        </div>
      ))}

      <form className="ask" onSubmit={handleSubmit}>
        <textarea ref={answerDom} rows="5" placeholder="Your answer ..." required />
        <button type="submit" className="btn btn--blue">Post Answer</button>
      </form>
    </section>
  );
};

export default QuestionDetail;