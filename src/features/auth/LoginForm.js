import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FormControl, Input, Button } from "malcomponents";
import { useMutation } from "@apollo/react-hooks";

import mutations from "./authMutations";

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
        caption={formik.errors.email}
        error={Boolean(formik.errors.email)}
      >
        <Input
          value={formik.values.email}
          onChange={formik.handleChange}
          name="email"
          style={{ marginBottom: "0.5rem" }}
        />
      </FormControl>
      <FormControl
        label="Login code"
        caption={formik.errors.password}
        error={Boolean(formik.errors.password)}
      >
        <Input
          value={formik.values.password}
          onChange={formik.handleChange}
          name="password"
          style={{ marginBottom: "0.5rem" }}
        />
      </FormControl>
      <Button type="submit" disabled={!formik.isValid || !formik.dirty}>
        Continue with Login Code
      </Button>
    </form>
  );
}

export default LoginForm;
