import { forwardRef, Fragment, useEffect, useRef, useState } from "react";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  useAsyncDebounce,
  useExpanded,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
import Pagination from "rc-pagination";
import Select from "react-select";

// components
// import { CElementCover } from "../components/CElementCover";

// hooks
import { useCustomMediaQuery } from "../../hooks/useCustomMediaQuery";

// images + icons
import { ReactComponent as DescArrowIcon } from "../../assets/images/svg/desc-arrow.svg";
import { ReactComponent as AscArrowIcon } from "../../assets/images/svg/asc-arrow.svg";
import { ReactComponent as AscAndDescArrowIcon } from "../../assets/images/svg/asc-and-desc-arrows.svg";
import { Typography } from "@mui/material";

interface MyTableProps {
  columns: any;
  data: any;
  tableName: string;
  // optional
  totalItems?: number;
  tableClassName?: string;
  renderRowSubComponent?: any;
  removeSelection?: boolean;
  setFilters?: any;
  filters?: any;
  setIsTableLoading?: any;
  isTableLoading?: any;
  removePageSizeDropdown?: boolean;
  setSelectedFlatRows?: any;
  topContent?: any;
  showSearch?: boolean;
  hiddenColumns?: any[];
  setSortedId?: any;
  setIsOrderDesc?: any;
  isResponsive?: boolean;
  //
  sortedId?: any;
  isOrderDesc?: any;
  //
  pageSizeDropdownDefaultValue?: any;
  pageSizeDropdownOptions?: any;
}

const MyTable = (props: MyTableProps): JSX.Element => {
  const {
    columns = [],
    data = [],
    tableName = "",

    // optional
    totalItems = 10,
    tableClassName = "",
    renderRowSubComponent,
    removeSelection = true,
    setFilters,
    filters = {
      offset: 0,
      currentPage: 1,
      limit: 10,
    },
    setIsTableLoading,
    isTableLoading = false,
    removePageSizeDropdown = true,
    setSelectedFlatRows,
    topContent,
    showSearch = false,
    hiddenColumns = [],
    setSortedId,
    setIsOrderDesc,
    isResponsive = false,
    //
    sortedId,
    isOrderDesc,
    //
    pageSizeDropdownDefaultValue = filters?.limit === undefined
      ? { label: "Show 10", value: 10 }
      : {
          label:
            filters?.limit == totalItems
              ? "Show All"
              : `Show ${filters?.limit}`,
          value: filters?.limit,
        },
    pageSizeDropdownOptions = [
      { label: "Show 10", value: 10 },
      { label: "Show 20", value: 20 },
      { label: "Show 30", value: 30 },
      { label: "Show 40", value: 40 },
      { label: "Show 50", value: 50 },
      { label: "Show All", value: totalItems },
    ],
  } = props;

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,

    // use for selection
    selectedFlatRows,
    visibleColumns,

    // use for pagination
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,

    // use for filter
    state,
    preGlobalFilteredRows,
    setGlobalFilter,

    // use for column hiding
    setHiddenColumns,

    // use for sorting
    setSortBy,
    state: { selectedRowIds, expanded, pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        hiddenColumns: removeSelection
          ? ["selection", ...hiddenColumns]
          : hiddenColumns,
        pageIndex: 0,
        pageSize: filters.limit || 10,
        sortBy: [
          {
            id: isOrderDesc === undefined ? "" : sortedId,
            desc: isOrderDesc === undefined ? false : isOrderDesc,
          },
        ],
      },
      manualSortBy: true,
    } as any,
    useGlobalFilter,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,
    (hooks: any) => {
      hooks.visibleColumns.push((columns: any) => [
        // Let's make a column for selection
        {
          id: "selection",
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          // @ts-ignore
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }: any) => (
            <div>
              <IndeterminateCheckbox
                // @ts-ignore
                {...row.getToggleRowSelectedProps()}
              />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  ) as any;

  const searchInput = useRef<any>(null);

  const [mediaQuery] = useCustomMediaQuery();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      setIsLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (setSelectedFlatRows) {
      setSelectedFlatRows(selectedFlatRows);
    }
  }, [selectedFlatRows]);

  const GlobalFilter = ({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
  }: any) => {
    const count = preGlobalFilteredRows.length;
    const [value, setValue] = useState(globalFilter);
    const onChange = useAsyncDebounce((value: any) => {
      setGlobalFilter(value || undefined);
      searchInput.current.focus();
    }, 1000);

    return (
      <FormControl
      // value={value || ""}
      // onChange={(e: any) => {
      //   setValue(e.target.value);
      //   onChange(e.target.value);
      // }}
      // placeholder={`Search here...`}
      // ref={searchInput}
      // className="w-25"
      // type="search"
      >
        <TextField
          hiddenLabel
          id="filled-hidden-label-small"
          value={value || ""}
          variant="filled"
          // size="small"
          onChange={(e: any) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder={`Search here...`}
          ref={searchInput}
          className="w-25"
          type="search"
        />
      </FormControl>
    );
  };

  const IndeterminateCheckbox = forwardRef(
    // @ts-ignore
    ({ indeterminate, ...rest }, ref) => {
      const defaultRef = useRef();
      const resolvedRef: any = ref || defaultRef;

      useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate;
      }, [resolvedRef, indeterminate]);

      return (
        <>
          <input type="checkbox" ref={resolvedRef} {...rest} />
        </>
      );
    }
  );

  const paginationOnChange = (page: number) => {
    if (setIsTableLoading) setIsTableLoading(true);
    gotoPage(page - 1);
    if (setFilters) {
      setFilters((prevState: any) => {
        let newState = {
          offset: page ? (page - 1) * filters.limit : 0,
          currentPage: page,
          limit: filters.limit,
        };
        return { ...prevState, ...newState };
      });
    }
    if (setIsTableLoading) setTimeout(() => setIsTableLoading(true), 100);
  };

  const renderPagination = () => {
    let myLocale = {
      // Options.jsx
      items_per_page: "/ page",
      jump_to: "Go to",
      jump_to_confirm: "confirm",
      page: "",

      // Pagination.jsx
      prev_page: "Previous",
      next_page: "Next",
      prev_5: "Previous 5 Pages",
      next_5: "Next 5 Pages",
      prev_3: "Previous 3 Pages",
      next_3: "Next 3 Pages",
    };

    return (
      /*@ts-ignore*/
      <Pagination
        onChange={paginationOnChange}
        current={filters.currentPage || 1}
        showTotal={(total: any, range: any) => {
          return (
            <span className="results-count-text">
              <span className="results-count-start">
                {range[0] > 0 ? range[0] : 0}
              </span>
              –<span className="results-count-end">{range[1]}</span> of{" "}
              <span className="results-count-total results-count-link">
                {total}
              </span>
            </span>
          );
        }}
        total={totalItems || 0}
        defaultCurrent={1}
        pageSize={filters.limit || 10}
        // showLessItems
        locale={myLocale}
        // prevIcon={
        //   <BtnBackGreyIcon
        //     className="prev-icon"
        //     style={{ width: 13, marginTop: '-4px' }}
        //   />
        // }
        // nextIcon={
        //   <BtnBackGreyIcon
        //     className="next-icon"
        //     style={{
        //       width: 13,
        //       marginTop: '-4px',
        //       transform: 'rotateY(180deg)',
        //       WebkitTransform: 'rotateY(180deg)',
        //       OTransform: 'rotateY(180deg)',
        //     }}
        //   />
        // }
        // jumpPrevIcon={<DropdownIcon className="three-dots-icon" />}
        // jumpNextIcon={<DropdownIcon className="three-dots-icon" />}
      />
    );
  };

  const renderPageSizeDropdown = () => {
    return (
      <div className="mt-2">
        <Select
          className="basic-single small-size float-end"
          classNamePrefix="select"
          defaultValue={pageSizeDropdownDefaultValue}
          isClearable={false}
          isSearchable={false}
          name="pageSizeDropdown"
          options={pageSizeDropdownOptions}
          onChange={(val: any) => {
            if (setIsTableLoading) setIsTableLoading(true);
            setPageSize(Number(val.value) || null);
            gotoPage(0);
            // setFilters({
            //   offset: 0,
            //   currentPage: 1,
            //   limit: Number(val.value) || null,
            // });
            setFilters((prevState: any) => {
              let newState = {
                offset: 0,
                currentPage: 1,
                limit: Number(val.value) || null,
              };
              return { ...prevState, ...newState };
            });
            if (setIsTableLoading)
              setTimeout(() => setIsTableLoading(false), 100);
          }}
        />
      </div>
    );
  };

  const sendSortedId = (column: any, setSortBy: any, meinSortBy: any) => {
    if (!column.canSort) return;

    if (setSortedId) {
      if (column?.sorting_id) {
        setSortedId(column?.sorting_id);
      } else {
        setSortedId(column?.id);
      }
    }

    //set sort desc, aesc or none?
    const desc =
      column.isSortedDesc === true
        ? undefined
        : column.isSortedDesc === false
        ? true
        : false;

    if (setIsOrderDesc) setIsOrderDesc(desc);

    if (desc === undefined) {
      setSortBy([]);
    } else {
      setSortBy([{ id: column.id, desc }, ...meinSortBy]);
    }
  };

  return (
    <>
      {!isLoading && (
        <Fragment>
          {(topContent || showSearch) && (
            <Card>
              <CardContent className="d-flex flex-md-row-reverse justify-content-md-between">
                {topContent && topContent()}
                {showSearch && (
                  <GlobalFilter
                    preGlobalFilteredRows={preGlobalFilteredRows}
                    globalFilter={state.globalFilter}
                    setGlobalFilter={setGlobalFilter}
                  />
                )}
              </CardContent>
            </Card>
          )}
          <TableContainer
            className={
              isResponsive
                ? "table-responsive hide-horizontal-scrollbar"
                : "hide-horizontal-scrollbar"
            }
            component={Paper}
          >
            <Table
              striped="true"
              bordered="true"
              hover="true"
              {...getTableProps()}
              className={tableName + " " + tableClassName}
            >
              <TableHead>
                {
                  // Loop over the header rows
                  headerGroups.map((headerGroup: any) => {
                    // Apply the header row props
                    return (
                      <TableRow {...headerGroup.getHeaderGroupProps()}>
                        {
                          // Loop over the headers in each row
                          headerGroup.headers.map((column: any) => {
                            let _headerProps = {
                              ...column.getSortByToggleProps(),
                            };
                            let _headerPropsWithStyle = {
                              ...column.getSortByToggleProps(),
                              style: {
                                minWidth: column.minWidth,
                                width: column.width,
                              },
                            };
                            return (
                              // Apply the header cell props
                              <TableCell
                                {...column.getHeaderProps(
                                  column.minWidth
                                    ? _headerPropsWithStyle
                                    : _headerProps
                                )}
                                onClick={() =>
                                  sendSortedId(column, setSortBy, columns)
                                }
                              >
                                <Typography variant="h5">
                                  <strong>
                                    {
                                      // Render the header
                                      column.render("Header")
                                    }
                                  </strong>
                                  {/*<span>
                                    {column.isSorted ? (
                                      column.isSortedDesc === true ? (
                                        <DescArrowIcon />
                                      ) : column.isSortedDesc === false ? (
                                        <AscArrowIcon />
                                      ) : column.disableSortBy ? (
                                        ""
                                      ) : (
                                        <AscAndDescArrowIcon
                                          style={{ opacity: 0.25 }}
                                        />
                                      )
                                    ) : column.canSort ? (
                                      <AscAndDescArrowIcon
                                        style={{ opacity: 0.25 }}
                                      />
                                    ) : (
                                      ""
                                    )}
                                  </span>*/}
                                </Typography>
                              </TableCell>
                            );
                          })
                        }
                      </TableRow>
                    );
                  })
                }
              </TableHead>
              {/* Apply the table body props */}
              <TableBody {...getTableBodyProps()}>
                {
                  // Loop over the table rows
                  page.map((row: any, index: number) => {
                    // Prepare the row for display
                    prepareRow(row);
                    return (
                      // Apply the row props
                      <Fragment
                        key={index}
                        //{...row.getRowProps()}
                      >
                        <TableRow>
                          {
                            // Loop over the rows cells
                            row.cells.map((cell: any) => {
                              // Apply the cell props
                              return (
                                <TableCell
                                  {...cell.getCellProps({
                                    // style: {
                                    //   minWidth: cell.column.minWidth,
                                    //   width: cell.column.width,
                                    // },
                                  })}
                                  // className="text-wrap text-break"
                                >
                                  {
                                    // Render the cell contents
                                    cell.render("Cell")
                                  }
                                </TableCell>
                              );
                            })
                          }
                        </TableRow>
                        {row.isExpanded && renderRowSubComponent ? (
                          <TableRow>
                            <TableCell colSpan={visibleColumns.length}>
                              {renderRowSubComponent({ row })}
                            </TableCell>
                          </TableRow>
                        ) : null}
                      </Fragment>
                    );
                  })
                }
              </TableBody>
            </Table>
          </TableContainer>

          {/*{isTableLoading && (
            <div
              style={{
                // position: 'absolute',
                backgroundColor: 'rgba(255, 255, 255, 0.4)',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translateX(-50%) translateY(-50%)',
                }}
              >
                <CSpinner variant="grow" color="primary" />
              </div>
            </div>
          )}*/}

          {/*{isTableLoading && (
            <CElementCover
              boundaries={[
                { sides: ["top"], query: "td" },
                { sides: ["bottom"], query: "tbody" },
              ]}
            />
          )}*/}

          {(filters?.limit || 10) < totalItems && renderPagination()}

          {/*{!removePageSizeDropdown && renderPageSizeDropdown()}*/}

          {/*<p>Selected Rows: {Object.keys(selectedRowIds).length}</p>
          <pre>
            <code>
              {JSON.stringify(
                {
                  selectedRowIds: selectedRowIds,
                  'selectedFlatRows[].original': selectedFlatRows.map(
                    (d: any) => d.original,
                  ),
                },
                null,
                2,
              )}
            </code>
          </pre>*/}
        </Fragment>
      )}
    </>
  );
};

export default MyTable;
