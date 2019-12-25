import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FormControl, Input, Button } from "malcomponents";
import { useMutation } from "@apollo/react-hooks";

import mutations from "../../api/mutations";

function OnboardingForm(props) {
  const [updateUser, updateUserResult] = useMutation(
    mutations.UPDATE_USER_MUTATION
  );

  const onboardingSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    company: Yup.string()
  });
  const formik = useFormik({
    initialValues: {
      firstName: props.firstName || "",
      lastName: props.lastName || "",
      company: props.company || ""
    },
    validationSchema: onboardingSchema,
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
      props.onSuccess(updateUserResult.data.updateUser);
    }
  }, [updateUserResult]);

  return (
    <form onSubmit={formik.handleSubmit}>
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
        Done
      </Button>
    </form>
  );
}

export default OnboardingForm;
