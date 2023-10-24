import React from 'react';

function CompleteButton() {
  return (
    <button
      className="px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md w-15 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70"
      type="submit"
    >
      완료
    </button>
  );
}

export default CompleteButton;
