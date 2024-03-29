import React from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/react-hooks";
import styled from "styled-components";

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

function SigninForm(props) {
  const [login, loginResult] = useMutation(mutations.LOGIN_MUTATION);
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email is invalid")
      .required("Email is required"),
    password: Yup.string().required("Login code is required")
  });
  const formik = useFormik({
    validationSchema,
    initialValues: {
      email: props.email || "",
      password: props.password || ""
    },
    onSubmit: values => {
      login({ variables: { email: values.email, password: values.password } });
    }
  });

  React.useEffect(() => {
    if (loginResult.data && loginResult.data.login) {
      props.onSuccess && props.onSuccess(loginResult.data.login);
    }
  }, [loginResult]);

  React.useEffect(() => {
    if (loginResult.error) {
      formik.setFieldError("password", loginResult.error.message);
    }
  }, [loginResult]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormWrapper>
        <FormControl
          label="Your email"
          caption={formik.touched.email && formik.errors.email}
          error={Boolean(formik.errors.email && formik.touched.email)}
          disabled
        >
          <Input
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="email"
          />
        </FormControl>
        <FormControl
          label="Login code"
          caption={formik.touched.password && formik.errors.password}
          error={Boolean(formik.errors.password && formik.touched.password)}
        >
          <Input
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="password"
          />
        </FormControl>
      </FormWrapper>
      <StyledButton type="submit" disabled={!formik.isValid || !formik.dirty}>
        <span>Continue with Login Code</span>
      </StyledButton>
    </form>
  );
}

SigninForm.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  onSuccess: PropTypes.func
};

export default SigninForm;
