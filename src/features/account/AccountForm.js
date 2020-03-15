import React from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/react-hooks";

import { FormControl } from "../../components/form-control";
import { Input } from "../../components/input";
import { Button } from "../../components/button";

import mutations from "../../api/mutations";

function AccountForm(props) {
  const [updateUser, updateUserResult] = useMutation(
    mutations.UPDATE_USER_MUTATION
  );
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    company: Yup.string()
  });
  const formik = useFormik({
    enableReinitialize: true,
    validationSchema,
    initialValues: {
      email: props.email || "",
      firstName: props.firstName || "",
      lastName: props.lastName || "",
      company: props.company || ""
    },
    onSubmit: values => {
      updateUser({
        variables: {
          firstName: values.firstName,
          lastName: values.lastName,
          company: values.company
        }
      });
    }
  });

  React.useEffect(() => {
    if (updateUserResult.data && updateUserResult.data.updateUser) {
      props.onSuccess && props.onSuccess(updateUserResult.data.updateUser);
    }
  }, [updateUserResult]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl
        label="Email"
        caption={formik.touched.email && formik.errors.email}
        error={Boolean(formik.errors.email && formik.touched.email)}
        disabled
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
        label="First name"
        caption={formik.touched.firstName && formik.errors.firstName}
        error={Boolean(formik.errors.firstName && formik.touched.firstName)}
      >
        <Input
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="firstName"
          style={{ marginBottom: "0.5rem" }}
        />
      </FormControl>
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
          style={{ marginBottom: "0.5rem" }}
        />
      </FormControl>
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
          style={{ marginBottom: "0.5rem" }}
        />
      </FormControl>
      <Button type="submit" disabled={!formik.isValid || !formik.dirty}>
        <span>{updateUserResult.loading ? "Saving" : "Save"}</span>
      </Button>
    </form>
  );
}

AccountForm.propTypes = {
  email: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  company: PropTypes.string,
  onSuccess: PropTypes.func
};

export default AccountForm;
