import React from 'react';
import Icon from '../Icon';

//green orange red
const iconInfo = {
  success: {
    color: 'green',
    shape: 'check-circle',
  },
  warning: {
    color: 'orange',
    shape: 'alert-triangle',
  },
  error: {
    color: 'red',
    shape: 'alert-octagon',
  },
};
export default function ModalIcon({ type: any }) {
  const { color, shape } = iconInfo.success;
  return (
    <div
      className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-${color}-100 sm:mx-0 sm:h-10 sm:w-10`}
    >
      <Icon name={shape} strokeWidth={2} size={24} color={color} />
    </div>
  );
}
// const IconType = {
//   success: (
//     <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
//       <Icon name="check-circle" strokeWidth={2} size={24} color="green" />
//     </div>
//   ),
//   warning: (
//     <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-yellow-100 sm:mx-0 sm:h-10 sm:w-10">
//       <Icon name="alert-triangle" strokeWidth={2} size={24} color="orange" />
//     </div>
//   ),
//   error: (
//     <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
//       <Icon name="alert-octagon" strokeWidth={2} size={24} color="red" />
//     </div>
//   ),
// };
