import { Formik, ErrorMessage } from 'formik';
import classnames from 'classnames';
import React, { useState } from 'react';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import uniqid from 'uniqid';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {
  StyledForm,
  StyledField,
  FieldWrapper,
  Label,
  ErrorText,
  AddButton,
} from './ContactForm.styled';

const initialState = {
  name: '',
  number: '',
};

const validationSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .matches(
      /^[\p{L} '-]+$/u,
      'Name may contain only letters, apostrophe, dash and spaces.'
    ),
  number: yup
    .string()
    .required('Number is required')
    .matches(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +.'
    ),
});

const FormError = ({ name }) => {
  return (
    <ErrorMessage
      name={name}
      render={message => <ErrorText>{message}</ErrorText>}
    />
  );
};

export const ContactForm = ({ onSubmit, contacts }) => {
  const handleSubmit = (values, actions) => {
    actions.resetForm();
    const { name, number } = values;

    if (contacts.some(contact => contact.name.includes(name))) {
      Report.info(`${name} is already in contacts`, '', 'OK', {
        backOverlayClickToClose: true,
      });
      return;
    }
    Notify.success(`Contact ${name} added to contacts`);
    onSubmit(name, number);
  };

  const [focusedField, setFocusedField] = useState(null);

  const handleFieldFocus = fieldName => {
    setFocusedField(fieldName);
  };

  const handleFieldBlur = () => {
    setFocusedField(null);
  };

  const nameInputId = uniqid();
  const numberInputId = uniqid();
  return (
    <div>
      <Formik
        initialValues={initialState}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ getFieldProps }) => (
          <StyledForm>
            <FieldWrapper>
              <Label
                htmlFor={nameInputId}
                className={classnames({
                  'focused-label':
                    focusedField === 'name' ||
                    getFieldProps('name').value !== '',
                })}
              >
                Name
              </Label>
              <StyledField
                type="text"
                name="name"
                id={nameInputId}
                required
                onFocus={() => handleFieldFocus('name')}
                onBlur={handleFieldBlur}
              />
              <FormError name="name" />
            </FieldWrapper>
            <FieldWrapper>
              <Label
                htmlFor={numberInputId}
                className={classnames({
                  'focused-label':
                    focusedField === 'number' ||
                    getFieldProps('number').value !== '',
                })}
              >
                Number
              </Label>
              <StyledField
                type="tel"
                name="number"
                id={numberInputId}
                required
                onFocus={() => handleFieldFocus('number')}
                onBlur={handleFieldBlur}
              />
              <FormError name="number" />
            </FieldWrapper>
            <AddButton type="submit">Add contact</AddButton>
          </StyledForm>
        )}
      </Formik>
    </div>
  );
};

ContactForm.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
