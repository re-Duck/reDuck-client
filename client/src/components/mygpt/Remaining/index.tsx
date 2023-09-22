import React from 'react';

interface IProps {
  leftQuestionCount: number;
}

function GptRemaining({ leftQuestionCount }: IProps) {
  return (
    <div className="mr-2 text-sm text-gray-400">{`사용 가능 횟수: ${leftQuestionCount}`}</div>
  );
}

export default GptRemaining;
