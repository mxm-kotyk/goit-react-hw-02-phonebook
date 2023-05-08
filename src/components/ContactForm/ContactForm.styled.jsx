import styled from '@emotion/styled/macro';
import { Form, Field, ErrorMessage } from 'formik';

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const StyledField = styled(Field)`
  width: 268px;
  height: 20px;
  padding: 16px;
  border: 1px solid #6998aa;
  border-radius: 8px;
  font-size: 16px;
  line-height: 140%;
  color: #1f1f1f;
`;

export const FieldWrapper = styled.div`
  position: relative;
`;

export const ErrorText = styled.p`
  position: absolute;
  top: 44px;
  left: 9px;
  font-size: 12px;
  line-height: 140%;
  color: #dc6000;
`;

export const Label = styled.label`
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translate(0%, -50%);
  font-size: 16px;
  line-height: 140%;
  color: #1f1f1f;
  ${StyledField}:focus + &,
  ${StyledField}:not(:placeholder-shown) + & {
    top: -14px;
  }
  ${StyledField}:focus + & {
    color: #b92f2c;
  }
`;
