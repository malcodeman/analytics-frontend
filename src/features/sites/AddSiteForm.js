import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FormControl, Input, Button } from "malcomponents";
import { useMutation } from "@apollo/react-hooks";

import mutations from "../../api/mutations";

function AddSiteForm(props) {
  const [addSite, addSiteResult] = useMutation(mutations.ADD_SITE);
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Site name is required")
  });
  const formik = useFormik({
    initialValues: {
      name: props.name || ""
    },
    validationSchema,
    onSubmit: values => {
      addSite({ variables: { name: values.name } });
    }
  });

  React.useEffect(() => {
    if (addSiteResult.data && addSiteResult.data.addSite) {
      props.onSuccess && props.onSuccess(addSiteResult.data.addSite);
    }
  }, [addSiteResult]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl
        label="Site name"
        caption={formik.errors.name}
        error={Boolean(formik.errors.name)}
      >
        <Input
          value={formik.values.name}
          onChange={formik.handleChange}
          name="name"
          style={{ marginBottom: "0.5rem" }}
        />
      </FormControl>
      <Button type="submit" disabled={!formik.isValid || !formik.dirty}>
        Get site code
      </Button>
    </form>
  );
}

export default AddSiteForm;
