import React from "react";
import styled from "styled-components";
import { useFormik } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/react-hooks";

import { FormControl } from "../../components/form-control";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import mutations from "../../api/mutations";

const FormWrapper = styled.div`
  margin-bottom: 1rem;
`;

const StyledButton = styled(Button)`
  width: 100%;
`;

function EmailForm(props) {
  const [sendTempPassword, sendTempPasswordResult] = useMutation(
    mutations.SEND_TEMPORARY_PASSWORD_MUTATION
  );
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email is invalid")
      .required("Email is required")
  });
  const formik = useFormik({
    validationSchema,
    initialValues: {
      email: props.email || ""
    },
    onSubmit: values => {
      sendTempPassword({
        variables: {
          email: values.email
        }
      });
    }
  });

  React.useEffect(() => {
    if (
      sendTempPasswordResult.data &&
      sendTempPasswordResult.data.sendTemporaryPassword
    ) {
      props.onSuccess &&
        props.onSuccess(sendTempPasswordResult.data.sendTemporaryPassword);
    }
  }, [sendTempPasswordResult]);

  React.useEffect(() => {
    if (sendTempPasswordResult.error) {
      formik.setFieldError("email", sendTempPasswordResult.error.message);
    }
  }, [sendTempPasswordResult]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormWrapper>
        <FormControl
          label="Email address"
          caption={formik.touched.email && formik.errors.email}
          error={Boolean(formik.errors.email && formik.touched.email)}
        >
          <Input
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="email"
          />
        </FormControl>
      </FormWrapper>
      <StyledButton type="submit" disabled={!formik.isValid || !formik.dirty}>
        <span>Continue</span>
      </StyledButton>
    </form>
  );
}

EmailForm.propTypes = {
  email: PropTypes.string,
  onSuccess: PropTypes.func.isRequired
};

export default EmailForm;
