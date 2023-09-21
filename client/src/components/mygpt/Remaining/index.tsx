import React, { useState } from 'react';

const MAX_QUESTION_COUNT = 10;

function GptRemaining() {
  const [remaining, setRemaining] = useState(8);
  return (
    <div className="mr-2 text-sm text-gray-400">{`${remaining}/${MAX_QUESTION_COUNT}`}</div>
  );
}

export default GptRemaining;
