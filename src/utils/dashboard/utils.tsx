import React from "react";
import _ from "lodash";

export const _columns = (personsData: any, mailAccountsData: any): any[] => {
  return [
    {
      Header: "ID",
      accessor: "id",
      disableSortBy: true,
    },
    {
      Header: "Person",
      accessor: "person",
      disableSortBy: true,
      Cell: (cell: any) => {
        let _person = _.filter(personsData, (o: any) => cell?.value === o?.id);
        return (
          <>
            {_person?.[0] ? (
              `${_person[0]?.first_name} ${_person[0]?.last_name}`
            ) : (
              <hr className="tw-w-3 tw-border-black" />
            )}
          </>
        );
      },
    },
    {
      Header: "Subject",
      accessor: "scheduledEmail.subject",
      disableSortBy: true,
      Cell: (cell: any) => {
        return cell?.value || <hr className="tw-w-3 tw-border-black" />;
      },
    },
    {
      Header: "From",
      accessor: "scheduledEmail.from_email",
      disableSortBy: true,
      Cell: (cell: any) => {
        let _from = _.filter(
          mailAccountsData,
          (o: any) => cell?.value === o?.id
        );
        return (
          <>
            {_from?.[0] ? (
              `${_from[0]?.email}`
            ) : (
              <hr className="tw-w-3 tw-border-black" />
            )}
          </>
        );
      },
    },
    {
      Header: "To",
      accessor: "scheduledEmail.to",
      disableSortBy: true,
      Cell: (cell: any) => {
        return cell?.value || <hr className="tw-w-3 tw-border-black" />;
      },
    },
    {
      Header: "Opens",
      accessor: "scheduledEmail.opens",
      disableSortBy: true,
      Cell: (cell: any) => {
        return cell?.value || "0";
      },
    },
    {
      Header: "Clicks",
      accessor: "scheduledEmail.clicks",
      disableSortBy: true,
      Cell: (cell: any) => {
        return cell?.value || "0";
      },
    },
  ];
};
