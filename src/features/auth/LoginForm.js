import React from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/react-hooks";

import { FormControl } from "../../components/form-control";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import mutations from "../../api/mutations";

function LoginForm(props) {
  const [login, loginResult] = useMutation(mutations.LOGIN_MUTATION);
  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email is invalid")
      .required("Email is required"),
    password: Yup.string().required("Login code is required")
  });
  const formik = useFormik({
    initialValues: {
      email: props.email || "",
      password: props.password || ""
    },
    validationSchema: loginSchema,
    onSubmit: values => {
      login({ variables: { email: values.email, password: values.password } });
    }
  });

  React.useEffect(() => {
    if (loginResult.data && loginResult.data.login) {
      props.onSuccess && props.onSuccess(loginResult.data.login);
    }
  }, [loginResult]);

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
          style={{ marginBottom: "0.5rem" }}
        />
      </FormControl>
      <Button type="submit" disabled={!formik.isValid || !formik.dirty}>
        <span>Continue with Login Code</span>
      </Button>
    </form>
  );
}

LoginForm.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  onSuccess: PropTypes.func
};

export default LoginForm;
