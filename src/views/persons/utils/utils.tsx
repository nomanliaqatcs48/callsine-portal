export const _columns: any = [
  {
    Header: "First",
    accessor: "first_name",
    id: "first_name",
    key: "first_name",
    label: "First",
    Cell: (cell: any) => {
      return (
        <a className="" href="">
          {cell?.value}
        </a>
      );
    },
  },
  {
    Header: "Last",
    accessor: "last_name",
    id: "last_name",
    key: "last_name",
    label: "Last",
  },
  {
    Header: "Email",
    accessor: "email",
    id: "email",
    key: "email",
    label: "Email",
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
];
