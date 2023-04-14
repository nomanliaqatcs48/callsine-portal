import moment from "moment";
import { useTheme } from "@mui/material/styles";

export const _columns: any = () => {
  const theme: any = useTheme();
  return [
    {
      Header: "First",
      accessor: "first_name",
      Cell: (cell: any) => {
        return (
          <a
            className=""
            href={`/people/${cell?.row?.original?.id}`}
            style={{
              textDecoration: "underline",
            }}
          >
            {cell?.value}
          </a>
        );
      },
    },
    {
      Header: "Last",
      accessor: "last_name",
    },
    {
      Header: "Email",
      accessor: "work_email",
      width: 250,
      minWidth: 250,
      Cell: (cell: any) => {
        return (
          <a
            href={`mailto:${cell?.value}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {cell?.value}
          </a>
        );
      },
    },
    {
      Header: "Date Added",
      accessor: "created_date",
      width: 250,
      minWidth: 250,
      Cell: (cell: any) => {
        if (!cell?.value) return "";
        return moment.utc(cell?.value).format("MMMM D, YYYY");
      },
    },
    {
      Header: "Date Modified",
      accessor: "modified_date",
      width: 250,
      minWidth: 250,
      Cell: (cell: any) => {
        if (!cell?.value) return "";
        return moment.utc(cell?.value).format("MMMM D, YYYY");
      },
    },
  ];
};
