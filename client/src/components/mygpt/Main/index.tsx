import { Form } from 'formik';
import React, { forwardRef } from 'react';

type IProps = React.HTMLAttributes<HTMLFormElement>;

const GptMain = forwardRef<HTMLFormElement, IProps>(function GptMain(
  { children, ...props }: IProps,
  ref
) {
  return (
    <Form
      ref={ref}
      className="flex flex-col max-w-2xl gap-6 pt-8 mx-auto min-h-[200px]"
      {...props}
    >
      {children}
    </Form>
  );
});

export default GptMain;
