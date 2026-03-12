import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Admin = () => {
  const { user } = useAuth();

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);

  const [formData, setFormData] = useState({
    questionText: '',
    category: 'java',
    difficulty: 'easy',
    options: ['', '', '', ''],
    correctAnswer: '',
    explanation: ''
  });

  const CATEGORIES = [
    'java',
    'python',
    'cpp',
    'c',
    'javascript',
    'sql',
    'aptitude',
    'mock interview',
    'questions',
    'soft skills'
  ];

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        'http://localhost:5000/api/questions?limit=100'
      );
      setQuestions(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch questions');
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      headers: { Authorization: `Bearer ${user.token}` }
    };

    try {
      if (editingQuestion) {
        await axios.put(
          `http://localhost:5000/api/admin/questions/${editingQuestion._id}`,
          formData,
          config
        );
      } else {
        await axios.post(
          'http://localhost:5000/api/admin/questions',
          formData,
          config
        );
      }

      setShowModal(false);
      fetchQuestions();

    } catch (error) {
      alert('Operation failed. Please check fields.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      try {
        const config = {
          headers: { Authorization: `Bearer ${user.token}` }
        };

        await axios.delete(
          `http://localhost:5000/api/admin/questions/${id}`,
          config
        );

        fetchQuestions();

      } catch (error) {
        alert('Delete failed');
      }
    }
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-6 text-center">
        <h2 className="text-3xl font-black">Access Restricted</h2>
        <p>This area is reserved for administrators only.</p>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-24">

      <header className="flex justify-between items-center">
        <h1 className="text-4xl font-black">Admin Control Panel</h1>

        <button
          onClick={() => {
            setEditingQuestion(null);

            setFormData({
              questionText: '',
              category: 'java',
              difficulty: 'easy',
              options: ['', '', '', ''],
              correctAnswer: '',
              explanation: ''
            });

            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Add Question
        </button>
      </header>

      {loading ? (
        <p>Loading questions...</p>
      ) : (

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4">Question</th>
              <th>Category</th>
              <th>Difficulty</th>
              <th>Operations</th>
            </tr>
          </thead>

          <tbody>

            {questions.map((q) => (
              <tr key={q._id} className="border-t">

                <td className="p-4">{q.questionText}</td>
                <td>{q.category}</td>
                <td>{q.difficulty}</td>

                <td className="space-x-3">

                  <button
                    onClick={() => {
                      setEditingQuestion(q);

                      setFormData({
                        questionText: q.questionText,
                        category: q.category,
                        difficulty: q.difficulty,
                        options: q.options || ['', '', '', ''],
                        correctAnswer: q.correctAnswer,
                        explanation: q.explanation || ''
                      });

                      setShowModal(true);
                    }}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(q._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>
            ))}

          </tbody>
        </table>
      )}

      {showModal && (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

          <div className="bg-white p-10 rounded-xl w-[600px]">

            <h2 className="text-2xl font-bold mb-6">
              {editingQuestion ? 'Edit Question' : 'Add Question'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">

              <textarea
                required
                placeholder="Question"
                value={formData.questionText}
                onChange={(e) =>
                  setFormData({ ...formData, questionText: e.target.value })
                }
                className="w-full border p-3"
              />

              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full border p-3"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              <select
                value={formData.difficulty}
                onChange={(e) =>
                  setFormData({ ...formData, difficulty: e.target.value })
                }
                className="w-full border p-3"
              >
                <option value="easy">easy</option>
                <option value="medium">medium</option>
                <option value="hard">hard</option>
              </select>

              {formData.options.map((opt, i) => (
                <input
                  key={i}
                  required
                  value={opt}
                  placeholder={`Option ${i + 1}`}
                  onChange={(e) => {
                    const newOpts = [...formData.options];
                    newOpts[i] = e.target.value;
                    setFormData({ ...formData, options: newOpts });
                  }}
                  className="w-full border p-3"
                />
              ))}

              <input
                required
                placeholder="Correct Answer"
                value={formData.correctAnswer}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    correctAnswer: e.target.value
                  })
                }
                className="w-full border p-3"
              />

              <textarea
                placeholder="Explanation"
                value={formData.explanation}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    explanation: e.target.value
                  })
                }
                className="w-full border p-3"
              />

              <div className="flex justify-end gap-4">

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-400 text-white px-5 py-2 rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-green-600 text-white px-5 py-2 rounded"
                >
                  {editingQuestion ? 'Update' : 'Create'}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
};

export default Admin;