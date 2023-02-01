/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AnswerList from './AnswerList';
import HelpfulButton from './HelpfulButton';
import App from './AddAnswer';

export default function QuestionListItem({ q }) {
  const [allAnswers, setAns] = useState([]);
  const [loading, setLoad] = useState(true);
  const { question_id } = q;

  useEffect(() => {
    axios.get('http://localhost:8081/answers', { params: { question_id } }).then(({ data }) => {
      const result = data.results;
      setAns(result);
      setLoad(false);
    });
  }, []);

  if (!loading) {
    return (
      <div className="question-body" key={question_id}>
        Q:
        {q.question_body}
        <HelpfulButton helpfulness={q.question_helpfulness} id={question_id} type="questions" />
        {' '}
        |
        {' '}
        <App />
        <AnswerList answers={allAnswers} />
      </div>
    );
  }
}
