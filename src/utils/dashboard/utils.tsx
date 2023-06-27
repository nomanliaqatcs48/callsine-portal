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
              <>
                <a
                  href={`/people/${_person[0]?.id}`}
                  className="tw-text-[#0096c7] hover:tw-text-[#0096c7]"
                >
                  {_person[0]?.first_name} {_person[0]?.last_name}
                </a>
              </>
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
              <>
                <a
                  href={`mailto:${_from[0]?.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tw-text-[#0096c7] hover:tw-text-[#0096c7]"
                >
                  {_from[0]?.email}
                </a>
              </>
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
        return cell?.value ? (
          <>
            <a
              href={`mailto:${cell?.value}`}
              target="_blank"
              rel="noopener noreferrer"
              className="tw-text-[#0096c7] hover:tw-text-[#0096c7]"
            >
              {cell?.value}
            </a>
          </>
        ) : (
          <hr className="tw-w-3 tw-border-black" />
        );
      },
    },
    {
      Header: "Status",
      accessor: "status",
      disableSortBy: true,
      Cell: (cell: any) => {
        return cell?.value.toLowerCase()?.includes("scheduled") ? (
          "Scheduled Email"
        ) : cell?.value.toLowerCase()?.includes("generated") ? (
          "Generated Email"
        ) : (
          <hr className="tw-w-3 tw-border-black" />
        );
      },
    },
  ];
};
