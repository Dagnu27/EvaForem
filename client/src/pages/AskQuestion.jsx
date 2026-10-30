import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';

const AskQuestion = () => {
  const navigate = useNavigate();
  const titleDom = useRef(null);
  const descDom = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const title = titleDom.current.value.trim();
    const description = descDom.current.value.trim();

    if (!title || !description) {
      alert('Please provide all required fields');
      return;
    }
    if (title.length > 200) {
      alert('Title must not exceed 200 characters');
      return;
    }

    try {
      await axios.post('/question', { title, description });
      navigate('/');
    } catch (error) {
      alert(error.response?.data?.message || 'Could not post question');
    }
  }

  return (
    <section className="page">
      <h3 className="page__title">Steps To Write A Good Question</h3>
      <ul className="steps">
        <li>Summarize your problem in a one-line title.</li>
        <li>Describe your problem in more detail.</li>
        <li>Describe what you tried and what you expected to happen.</li>
        <li>Review your question and post it to the site.</li>
      </ul>

      <form className="ask" onSubmit={handleSubmit}>
        <h3>Post Your Question</h3>
        <input ref={titleDom} type="text" placeholder="Question title" maxLength={200} required />
        <textarea ref={descDom} rows="6" placeholder="Question detail ..." required />
        <button type="submit" className="btn btn--blue">Post Question</button>
      </form>
    </section>
  );
};

export default AskQuestion;