import React from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/react-hooks";

import { FormControl } from "../../components/form-control";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import mutations from "../../api/mutations";

function SignupForm(props) {
  const [signup, signupResult] = useMutation(mutations.SIGNUP_MUTATION);
  const signupSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email is invalid")
      .required("Email is required")
  });
  const formik = useFormik({
    initialValues: {
      email: props.email || ""
    },
    validationSchema: signupSchema,
    onSubmit: values => {
      signup({ variables: { email: values.email } });
    }
  });

  React.useEffect(() => {
    if (signupResult.data && signupResult.data.signup) {
      props.onSuccess && props.onSuccess(signupResult.data.signup);
    }
  }, [signupResult]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl
        label="Your email"
        caption={formik.touched.email && formik.errors.email}
        error={Boolean(formik.errors.email && formik.touched.email)}
      >
        <Input
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="email"
          style={{ marginBottom: "0.5rem" }}
        />
      </FormControl>
      <Button type="submit" disabled={!formik.isValid || !formik.dirty}>
        <span>Get started</span>
      </Button>
    </form>
  );
}

SignupForm.propTypes = {
  email: PropTypes.string,
  onSuccess: PropTypes.func
};

export default SignupForm;
