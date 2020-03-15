import React from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";

import queries from "../../api/queries";

import AccountForm from "./AccountForm";
import { ParagraphMedium } from "../../components/typography";
import constants from "../../constants";
import util from "../../util";

const Wrapper = styled.div`
  padding: 1rem 0;
  width: 100%;
  max-width: ${constants.BREAKPOINTS.SMALL_DEVICES};
`;

function Account() {
  const findMyself = useQuery(queries.FIND_MYSELF_QUERY);
  const myself = util.getData(findMyself, {
    email: "",
    firstName: "",
    lastName: "",
    company: ""
  });

  return (
    <Wrapper>
      {findMyself.error && (
        <ParagraphMedium>{findMyself.error.message}</ParagraphMedium>
      )}
      <AccountForm
        email={myself.email}
        firstName={myself.firstName}
        lastName={myself.lastName}
        company={myself.company}
        onSuccess={findMyself.refetch}
      />
    </Wrapper>
  );
}

export default Account;
