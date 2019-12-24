import React from "react";
import styled from "styled-components";
import { Input, Button, FormControl } from "malcomponents";
import { useFormik } from "formik";
import * as Yup from "yup";

import bg from "./bg.jpg";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  min-height: 100vh;
  @media (min-width: 576px) {
    grid-template-columns: 146px auto;
  }
`;

const Image = styled.div`
  background-image: url(${bg});
  background-size: cover;
  background-position: center;
  height: 100%;
  display: none;
  @media (min-width: 576px) {
    display: block;
  }
`;

const FormWrapper = styled.div`
  margin: 1rem;
  max-width: 576px;
`;

function Signup(props) {
  const signupSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email is invalid")
      .required("Email is required")
  });
  const formik = useFormik({
    initialValues: {
      email: ""
    },
    validationSchema: signupSchema,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    }
  });

  return (
    <Container>
      <Image />
      <FormWrapper>
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
          <Button type="submit" disabled={!formik.isValid || !formik.dirty}>
            Get started
          </Button>
        </form>
      </FormWrapper>
    </Container>
  );
}

export default Signup;
