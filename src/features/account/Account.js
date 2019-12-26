import React from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";

import queries from "../../api/queries";

import AccountForm from "./AccountForm";

const Wrapper = styled.div`
  margin: 1rem;
`;

function Account() {
  const { loading, error, data } = useQuery(queries.FIND_MYSELF_QUERY);
  const myself = (data && data.findMyself) || {
    email: "",
    firstName: "",
    lastName: "",
    company: ""
  };

  return (
    <Wrapper>
      <AccountForm
        email={myself.email}
        firstName={myself.firstName}
        lastName={myself.lastName}
        company={myself.company}
      />
    </Wrapper>
  );
}

export default Account;
