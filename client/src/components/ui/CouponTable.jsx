import React from "react";
import DataTable from "react-data-table-component";
import { useGetAllTransactionsQuery } from "../../store/api/walletAPI";
import { formatTime } from "../../hooks/formatTime";
import { Export } from "./Export";

const CouponTable = ({ reloadQuery }) => {
  const {
    data: allTransactions,
    isLoading: transLoading,
    refetch,
  } = useGetAllTransactionsQuery({ startDate: "", endDate: "" });

  React.useEffect(() => {
    refetch();
  }, [reloadQuery, refetch]);

  const formattedData = React.useMemo(
    () =>
      allTransactions?.data?.map((transaction, index) => ({
        DATE: formatTime(transaction.timeStamp),
        MEMBERID: transaction.memberId,
        FULLNAME: transaction.firstname
          ? transaction.firstname + " " + transaction.lastname
          : "Not Available",
        TRTYPE: transaction.type,
        TRAMOUNT: transaction.couponAmount,
        EXPAYAMT: transaction.payableAmount,
        MODE: transaction.mode.toLowerCase(),
      })) || [],
    [allTransactions]
  );


  if (transLoading) {
    return <p>Loading...</p>;
  }

  const handleExport = () => {
    const csvData = formattedData.map((row) => ({
      ...row,
      TIMESTAMP: formatTime(row.TIMESTAMP),
      TRTYPE: row.TRTYPE.toLowerCase() === "issue" ? "Debit" : "Credit",
    }));
    const csvContent = [
      [
        "Date",
        "Membership ID",
        "Member Name",
        "Tr. Type",
        "Tr. Amount",
        "Ex-pay Amt.",
        "Tr. Mode",
      ],
      ...csvData.map((row) => [
        `"${row.DATE}"`,
        `"${row.MEMBERID}"`,
        `"${row.FULLNAME}"`,
        `"${row.TRTYPE}"`,
        `"${row.TRAMOUNT}"`,
        `"${row.EXPAYAMT}"`,
        `"${row.MODE}"`,
      ]),
    ]
      .map((e) => e.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "transactions.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (allTransactions?.data?.length === 0) {
    return (
      <div className="col-span-12 mt-6">
        <h1 className="text-center text-3xl font-bold text-text_primary tracking-normal">
          No data available
        </h1>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg custom-pagination font-roboto">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-roboto font-medium text-black tracking-tighter">
            Transaction Table
          </h1>
          <h1 className="text-sm font-roboto font-medium text-text_primary tracking-tighter mb-2">
            {allTransactions?.todaysTotalTransactions &&
            allTransactions.todaysTotalTransactions !== 0
              ? `${allTransactions.todaysTotalTransactions} Transactions Today`
              : "No Transactions Today"}
          </h1>
        </div>
        <Export onExport={handleExport} />
      </div>
      <DataTable
        columns={columns}
        data={formattedData}
        customStyles={customStyles}
        pagination
        paginationPerPage={10}
        paginationTotalRows={formattedData.length}
        paginationRowsPerPageOptions={[5, 10, 15, 20]}
        paginationComponentOptions={{
          rowsPerPageText: "Rows:",
          rangeSeparatorText: "of",
          noRowsPerPage: false,
          selectAllRowsItem: false,
          selectAllRowsItemText: "All",
        }}
        highlightOnHover
        pointerOnHover
        striped
        dense
        noHeader
        responsive
        noDataComponent="No data available"
      />
    </div>
  );
};

export default CouponTable;

const columns = [
  {
    name: "Date",
    selector: (row) => row.DATE,
  },
  {
    name: "Membership ID",
    selector: (row) => row.MEMBERID,
    wrap: true,
  },
  {
    name: "Member Name",
    selector: (row) => row.FULLNAME,
    wrap: true,
    cell: (row) => <p className="text-sm capitalize">{row.FULLNAME}</p>,
  },
  {
    name: "Tr. Type",
    selector: (row) => row.TRTYPE,
    cell: (row) => (
      <p>{row.TRTYPE.toLowerCase() === "issue" ? "Debit" : "Credit"}</p>
    ),
  },
  {
    name: "Tr. Amount",
    selector: (row) => row.TRAMOUNT,
  },
  {
    name: "Ex-pay Amt.",
    selector: (row) => row.EXPAYAMT,
  },
  {
    name: "Tr. Mode",
    selector: (row) => row.MODE,
    sortable: true,
    cell: (row) => (
      <p
        className={`w-16 h-6 rounded-full flex items-center justify-center font-medium text-white roboto ${
          row.MODE.toUpperCase() === "CASH"
            ? "bg-[#22C55E] text-[#BBF7D0] capitalize"
            : row.MODE.toUpperCase() === "CARD"
            ? "bg-[#0000FF] text-[#BAE6FD] capitalize"
            : row.MODE.toUpperCase() === "UPI"
            ? "bg-[#FBBF24] text-[#FEF3C7] uppercase"
            : "bg-[#DC2626] text-[#FCA5A5] capitalize"
        }`}
        style={{ fontSize: "12px", padding: "4px 6px" }}
      >
        {row.MODE}
      </p>
    ),
  },
];


const customStyles = {
  table: {
    style: {
      backgroundColor: "#FFFFFF",
      width: "100%",
      borderRadius: "0.75rem",
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
      overflowY: "auto",
      maxHeight: "400px",
    },
  },
  headRow: {
    style: {
      backgroundColor: "#F3F4F6",
    },
  },
  headCells: {
    style: {
      color: "#6B7280",
      fontFamily: "Roboto",
      fontSize: "14px",
      fontStyle: "normal",
      fontWeight: 500,
      lineHeight: "normal",
    },
  },
  cells: {
    style: {
      color: "#030712",
      fontFamily: "Lato",
      fontSize: "12px",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "normal",
      height: "3rem",
    },
  },
};
