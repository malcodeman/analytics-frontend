import React from "react";
import styled from "styled-components";
import { useFormik } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/react-hooks";

import { FormControl } from "../../components/form-control";
import { Input } from "../../components/input";
import mutations from "../../api/mutations";

const FormWrapper = styled.div`
  margin-bottom: 1rem;
`;

function NameForm(props) {
  const { siteId } = props;
  const [updateSiteName, updateSiteNameResult] = useMutation(
    mutations.UPDATE_SITE_NAME_MUTATION
  );
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required")
  });
  const formik = useFormik({
    validationSchema,
    initialValues: {
      name: props.name || ""
    },
    onSubmit: values => {
      updateSiteName({
        variables: {
          siteId,
          name: values.name
        }
      });
    }
  });

  React.useEffect(() => {
    if (updateSiteNameResult.data && updateSiteNameResult.data.updateSiteName) {
      props.onSuccess &&
        props.onSuccess(updateSiteNameResult.data.updateSiteName);
    }
  }, [updateSiteNameResult]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormWrapper>
        <FormControl
          caption={formik.touched.name && formik.errors.name}
          error={Boolean(formik.errors.name && formik.touched.name)}
        >
          <Input
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="name"
          />
        </FormControl>
      </FormWrapper>
    </form>
  );
}

NameForm.propTypes = {
  siteId: PropTypes.string.isRequired,
  name: PropTypes.string,
  onSuccess: PropTypes.func.isRequired
};

export default NameForm;
