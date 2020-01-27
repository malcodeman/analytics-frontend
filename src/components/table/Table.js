import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useTable } from "react-table";

const StyledTable = styled.table`
  border-spacing: 0;
  width: 100%;
`;

const HeadCell = styled.th`
  background-color: ${props => props.theme.colors.tableHeadBackgroundColor};
  color: ${props => props.theme.colors.contentPrimary};
  margin: 0;
  padding: 0.5rem 0;
  text-align: left;
  border-bottom: ${props => props.theme.borders.border300};
  ${props => props.theme.typography.font350};
`;

const BodyCell = styled.td`
  color: ${props => props.theme.colors.contentPrimary};
  margin: 0;
  padding: 0.5rem 0;
  ${props => props.theme.typography.font200};
`;

function Table(props) {
  const { columns, data } = props;
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data
  });

  return (
    <StyledTable {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr
            {...headerGroup.getHeaderGroupProps()}
            key={headerGroup.getHeaderGroupProps().key}
          >
            {headerGroup.headers.map(column => (
              <HeadCell
                {...column.getHeaderProps()}
                key={column.getHeaderProps().key}
              >
                {column.render("Header")}
              </HeadCell>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} key={row.getRowProps().key}>
              {row.cells.map(cell => {
                return (
                  <BodyCell
                    {...cell.getCellProps()}
                    key={cell.getCellProps().key}
                  >
                    {cell.render("Cell")}
                  </BodyCell>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </StyledTable>
  );
}

Table.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array
};

export default Table;
