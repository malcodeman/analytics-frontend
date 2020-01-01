import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FormControl, Input, Button } from "malcomponents";
import styled from "styled-components";

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas:
    "ccNumber"
    "ccExpiry"
    "ccCvc";
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  @media (min-width: 576px) {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "ccNumber ccNumber"
      "ccExpiry ccCvc";
  }
`;

const GridItem = styled.div`
  grid-area: ${props => props.gridArea};
`;

function BillingForm(props) {
  const validationSchema = Yup.object().shape({
    cardNumber: Yup.string().required("Card number is required"),
    cardExpiry: Yup.string().required("Card expiration date is required"),
    cardCvc: Yup.string().required("CVC is required")
  });
  const formik = useFormik({
    enableReinitialize: true,
    validationSchema,
    initialValues: {
      cardNumber: props.cardNumber || "",
      cardExpiry: props.cardExpiry || "",
      cardCvc: props.cardCvc || ""
    },
    onSubmit: values => {
      console.log(values);
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid>
        <GridItem gridArea="ccNumber">
          <FormControl
            label="Card number"
            caption={formik.touched.cardNumber && formik.errors.cardNumber}
            error={Boolean(
              formik.errors.cardNumber && formik.touched.cardNumber
            )}
          >
            <Input
              value={formik.values.cardNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="cardNumber"
            />
          </FormControl>
        </GridItem>
        <GridItem gridArea="ccExpiry">
          <FormControl
            label="Card Expiry"
            caption={formik.touched.cardExpiry && formik.errors.cardExpiry}
            error={Boolean(
              formik.errors.cardExpiry && formik.touched.cardExpiry
            )}
          >
            <Input
              type="date"
              value={formik.values.cardExpiry}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="cardExpiry"
            />
          </FormControl>
        </GridItem>
        <GridItem gridArea="ccCvc">
          <FormControl
            label="Card CVC"
            caption={formik.touched.cardCvc && formik.errors.cardCvc}
            error={Boolean(formik.errors.cardCvc && formik.touched.cardCvc)}
          >
            <Input
              value={formik.values.cardCvc}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="cardCvc"
            />
          </FormControl>
        </GridItem>
      </Grid>
      <Button type="submit" disabled={!formik.isValid || !formik.dirty}>
        Save
      </Button>
    </form>
  );
}

export default BillingForm;
