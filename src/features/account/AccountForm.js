import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FormControl, Input, Button } from "malcomponents";
import { useMutation } from "@apollo/react-hooks";

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
        caption={formik.errors.email}
        error={Boolean(formik.errors.email)}
        disabled
      >
        <Input
          value={formik.values.email}
          onChange={formik.handleChange}
          name="email"
          style={{ marginBottom: "0.5rem" }}
        />
      </FormControl>
      <FormControl
        label="First name"
        caption={formik.errors.firstName}
        error={Boolean(formik.errors.firstName)}
      >
        <Input
          value={formik.values.firstName}
          onChange={formik.handleChange}
          name="firstName"
          style={{ marginBottom: "0.5rem" }}
        />
      </FormControl>
      <FormControl
        label="Last name"
        caption={formik.errors.lastName}
        error={Boolean(formik.errors.lastName)}
      >
        <Input
          value={formik.values.lastName}
          onChange={formik.handleChange}
          name="lastName"
          style={{ marginBottom: "0.5rem" }}
        />
      </FormControl>
      <FormControl
        label="Company"
        caption={formik.errors.company}
        error={Boolean(formik.errors.company)}
      >
        <Input
          value={formik.values.company}
          onChange={formik.handleChange}
          name="company"
          style={{ marginBottom: "0.5rem" }}
        />
      </FormControl>
      <Button type="submit" disabled={!formik.isValid || !formik.dirty}>
        Save
      </Button>
    </form>
  );
}

export default AccountForm;