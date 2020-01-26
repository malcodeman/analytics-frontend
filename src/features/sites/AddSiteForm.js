import React from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/react-hooks";

import { FormControl } from "../../components/form-control";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
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
        caption={formik.touched.name && formik.errors.name}
        error={Boolean(formik.errors.name && formik.touched.name)}
      >
        <Input
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="name"
          style={{ marginBottom: "0.5rem" }}
        />
      </FormControl>
      <Button type="submit" disabled={!formik.isValid || !formik.dirty}>
        <span>Get site code</span>
      </Button>
    </form>
  );
}

AddSiteForm.propTypes = {
  name: PropTypes.string,
  onSuccess: PropTypes.func
};

export default AddSiteForm;
