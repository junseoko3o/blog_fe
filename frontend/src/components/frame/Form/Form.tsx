import React from 'react';
import Styles from './lib/form.module.css';

type FormProps = {
  title?: string;
  children: React.ReactNode;
  fieldDirection: 'row' | 'column';
};

const Form = ({ title, children, fieldDirection }: FormProps) => {
  const formClassName = fieldDirection === 'row' ? Styles.directionRowForm : Styles.directionColumnForm;
  return (
    <form className={formClassName}>
      <fieldset className={Styles.fieldset}>
        {title && <legend className={Styles.legend}>{title}</legend>}
        {children}
      </fieldset>
    </form>
  );
}

export default Form
