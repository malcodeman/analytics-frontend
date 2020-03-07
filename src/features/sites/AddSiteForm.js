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

const StyledInput = styled(Input)`
  margin-bottom: 0.5rem;
`;

function AddSiteForm(props) {
  const [addSite, addSiteResult] = useMutation(mutations.ADD_SITE);
  const validationSchema = Yup.object().shape({
    domain: Yup.string()
      .required("Domain is required")
      .url("Invalid URL"),
    name: Yup.string().required("Site name is required")
  });
  const formik = useFormik({
    initialValues: {
      domain: props.domain || "",
      name: props.name || ""
    },
    validationSchema,
    onSubmit: values => {
      addSite({ variables: { name: values.name, domain: values.domain } });
    }
  });

  React.useEffect(() => {
    if (addSiteResult.data && addSiteResult.data.addSite) {
      props.onSuccess && props.onSuccess(addSiteResult.data.addSite);
      formik.resetForm();
    }
  }, [addSiteResult]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl
        label="Domain"
        caption={formik.touched.domain && formik.errors.domain}
        error={Boolean(formik.errors.domain && formik.touched.domain)}
      >
        <StyledInput
          value={formik.values.domain}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="domain"
        />
      </FormControl>
      <FormControl
        label="Site name"
        caption={formik.touched.name && formik.errors.name}
        error={Boolean(formik.errors.name && formik.touched.name)}
      >
        <StyledInput
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="name"
        />
      </FormControl>
      <Button
        type="submit"
        disabled={!formik.isValid || !formik.dirty || addSiteResult.loading}
      >
        <span>Get site code</span>
      </Button>
    </form>
  );
}

AddSiteForm.propTypes = {
  domain: PropTypes.string,
  name: PropTypes.string,
  onSuccess: PropTypes.func
};

export default AddSiteForm;
