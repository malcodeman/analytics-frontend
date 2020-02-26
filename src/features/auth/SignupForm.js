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

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    "email email"
    "firstName lastName"
    "company company";
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const GridItem = styled.div`
  grid-area: ${props => props.gridArea};
`;

const StyledButton = styled(Button)`
  width: 100%;
`;

function SignupForm(props) {
  const [signup, signupResult] = useMutation(mutations.SIGNUP_MUTATION);
  const signupSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email is invalid")
      .required("Email is required"),
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required")
  });
  const formik = useFormik({
    initialValues: {
      email: props.email || "",
      firstName: props.firstName || "",
      lastName: props.lastName || "",
      company: props.company || ""
    },
    validationSchema: signupSchema,
    onSubmit: values => {
      signup({
        variables: {
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName,
          company: values.company
        }
      });
    }
  });

  React.useEffect(() => {
    if (signupResult.data && signupResult.data.signup) {
      props.onSuccess && props.onSuccess(signupResult.data.signup);
    }
  }, [signupResult]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormGrid>
        <GridItem gridArea="email">
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
              placeholder="rickdeckard@domain.com"
            />
          </FormControl>
        </GridItem>
        <GridItem gridArea="firstName">
          <FormControl
            label="First name"
            caption={formik.touched.firstName && formik.errors.firstName}
            error={Boolean(formik.errors.firstName && formik.touched.firstName)}
          >
            <Input
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="firstName"
              placeholder="Rick"
            />
          </FormControl>
        </GridItem>
        <GridItem gridArea="lastName">
          <FormControl
            label="Last name"
            caption={formik.touched.lastName && formik.errors.lastName}
            error={Boolean(formik.errors.lastName && formik.touched.lastName)}
          >
            <Input
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="lastName"
              placeholder="Deckard"
            />
          </FormControl>
        </GridItem>
        <GridItem gridArea="company">
          <FormControl
            label="Company"
            caption={formik.touched.company && formik.errors.company}
            error={Boolean(formik.errors.company && formik.touched.company)}
          >
            <Input
              value={formik.values.company}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="company"
              placeholder="Tyrell Corporation"
            />
          </FormControl>
        </GridItem>
      </FormGrid>
      <StyledButton type="submit" disabled={!formik.isValid || !formik.dirty}>
        <span>
          {signupResult.loading ? "Creating account..." : "Create account"}
        </span>
      </StyledButton>
    </form>
  );
}

SignupForm.propTypes = {
  email: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  company: PropTypes.string,
  onSuccess: PropTypes.func
};

export default SignupForm;
