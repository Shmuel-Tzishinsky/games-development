export const shuffleAnswers = (question) => {
    if (!question) {
      return [];
    }

    console.log(question)
    const unshuffledAnswers = [
      ...question.questions[0].answers,
    ];
    return unshuffledAnswers
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);
  };
  