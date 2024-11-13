import React, { useState } from "react";
import DataTable from "react-data-table-component";
import {
  useFetchTransactionsQuery,
  useGetAllTransactionsQuery,
} from "../../store/api/walletAPI";
import { formatTime } from "../../hooks/formatTime";
import SearchBox from "../../components/ui/SearchBox";
import { Export } from "../../components/ui/Export";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import MemberTrDetails from "../../components/modals/Member-tr-details";
import Toasts from "../../components/ui/Toasts";
import { MdError } from "react-icons/md";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { useGetOperatorProfileQuery } from "../../store/api/operatorAPI";
import Loader from "../../components/ui/loader";
import { useGettotalAmountQuery } from "../../store/api/memberAPI";

const Analytics = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [inputStartDate, setInputStartDate] = useState("");
  const [inputEndDate, setInputEndDate] = useState("");
  const [search, setSearch] = useState("");
  const [openTr, SetOpenTr] = useState(false);
  const navigate = useNavigate();

  const {
    data: allTransactions,
    isLoading: transLoading,
    refetch,
    isError,
  } = useGetAllTransactionsQuery({ startDate, endDate, search });

  const {
    data: totalAmount,
    isLoading: totalLoading,
    refetch: refetchTotal,
  } = useGettotalAmountQuery();


  const {
    data: profiledata,
    isLoading: profileLoading,
    error: profileError,
  } = useGetOperatorProfileQuery();

  React.useEffect(() => {
    refetch();
    refetchTotal();
  }, [refetch, startDate, endDate, search, refetchTotal]);

  const formattedData = React.useMemo(
    () =>
      allTransactions?.data?.map((transaction, index) => ({
        DATE: formatTime(transaction.timeStamp),
        MEMBERID: transaction.memberId,
        FULLNAME: transaction.firstname
          ? transaction.firstname + " " + transaction.lastname
          : "Not Available",
        CREDITAMOUNT: transaction.creditAmount,
        DEBITAMOUNT: transaction.debitAmount,
        WALLETBALANCE: transaction.walletAmount,
        MODE: transaction.mode.toLowerCase(),
      })) || [],
    [allTransactions?.data]
  );

  if (transLoading) {
    return <p className="text-center">Loading...</p>;
  }

  if (totalLoading){
    return <p className="text-center">Loading...</p>;
  }

 const handleExport = () => {
   const csvData = formattedData.map((row) => ({
     ...row,
     TIMESTAMP: formatTime(row.TIMESTAMP),
   }));

   const header = [
     "Date",
     "Membership ID",
     "Full Name",
     "Credit Amount",
     "Debit Amount",
     "Wallet Balance",
     "Tr. Mode",
   ];

   const csvContent = [
     [...header],
     ...csvData.map((row) => [
       `"${row.DATE}"`,
       `"${row.MEMBERID}"`,
       `"${row.FULLNAME}"`,
       `"${row.CREDITAMOUNT}"`,
       `"${row.DEBITAMOUNT}"`,
       `"${row.WALLETBALANCE}"`,
       `"${row.MODE}"`,
     ]),
   ]
     .map((e) => e.join(","))
     .join("\n");

   const summaryContent = [
     `Total Wallet Balance,${allTransactions?.totalCredited - allTransactions?.totalDebited}`,
     `Total Credited Amount,${allTransactions?.totalCredited}`,
     `Total Debited Amount,${allTransactions?.totalDebited}`,
   ].join("\n");

   const finalCsvContent = `${csvContent}\n\n${summaryContent}`;

   const blob = new Blob([finalCsvContent], {
     type: "text/csv;charset=utf-8;",
   });
   const link = document.createElement("a");
   const url = URL.createObjectURL(blob);
   link.setAttribute("href", url);
   link.setAttribute("download", "transactions.csv");
   link.style.visibility = "hidden";
   document.body.appendChild(link);
   link.click();
   document.body.removeChild(link);
 };


  if (profileLoading) return <Loader />;
  if (!profiledata) navigate("/login/club");
  if (profiledata.data.role !== "admin") {
    navigate("/");
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-3 background bg-cover bg-center">
      <div className="flex flex-col lg:flex-row justify-center items-center w-full max-w-7xl gap-10 mb-5 mt-5">
        <div className="w-96 ml-16 sm:ml-0 sm:w-117 py-3 px-12 bg-white flex flex-col justify-center items-center rounded-2xl shadow-lg custom-pagination gap-3 font-roboto">
          <p className="text-xl text-text_secondary mb-1 text-center">
            Select Date Range
          </p>
          <div className="flex flex-col gap-2 w-full">
            <div className="flex justify-between items-center gap-2 w-full">
              <label className="text-base roboto">Start Date</label>
              <input
                type="date"
                className="w-full lg:w-40 h-8 text-text_secondary p-2 border border-gray-300 rounded-md"
                onChange={(e) => setInputStartDate(e.target.value)}
              />
            </div>
            <div className="flex justify-between items-center gap-2 w-full">
              <label className="text-base roboto">End Date</label>
              <input
                type="date"
                className="w-full lg:w-40 h-8 text-text_secondary p-2 border border-gray-300 rounded-md"
                onChange={(e) => setInputEndDate(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => {
                setStartDate("");
                setEndDate("");
                setInputStartDate("");
                setInputEndDate("");
                navigate(0);
              }}
              className="w-20 h-8 rounded-md  hover:bg-blue-600 hover:text-white transition ease-in-out delay-150 duration-300 roboto text-base hover:roboto hover:text-base shadow-btn_shadow hover:shadow-blue-600"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (inputStartDate === "" || inputEndDate === "") {
                  toast.error("Please select a date range", {
                    position: "top-center",
                    duration: 2000,
                  });
                  return;
                }
                setStartDate(inputStartDate);
                setEndDate(inputEndDate);
              }}
              className="w-20 h-8 text-text_secondary hover:bg-blue-600 hover:text-white rounded-md transition ease-in-out delay-150 duration-300 roboto text-base hover:roboto hover:text-base shadow-btn_shadow hover:shadow-blue-600"
            >
              Confirm
            </button>
          </div>
        </div>

        <div className="w-96 ml-16 sm:ml-0 sm:w-117 py-6 px-6 bg-white flex flex-col justify-center items-center rounded-2xl shadow-lg custom-pagination gap-3 font-roboto">
          <p className="text-xl text-text_secondary mb-1 text-center">
            Transaction Analysis by Date Range
          </p>
          <div className="flex justify-between items-center gap-2 w-full">
            <p className="text-base roboto">Total Transactions:</p>
            <p className="text-base roboto font-bold">
              {allTransactions?.todaysTotalTransactions}
            </p>
          </div>
          <div className="flex justify-between items-center gap-2 w-full">
            <p className="text-base roboto">Total Credited Amount:</p>
            <p className="text-base roboto font-bold">
              {allTransactions?.totalCredited}
            </p>
          </div>
          <div className="flex justify-between items-center gap-2 w-full">
            <p className="text-base roboto">Total Debited Amount:</p>
            <p className="text-base roboto font-bold">
              {allTransactions?.totalDebited}
            </p>
          </div>
          <div className="flex justify-between items-center gap-2 w-full">
            <p className="text-base roboto">Total Wallet Balance:</p>
            <p className="text-base roboto font-bold">
              {allTransactions?.totalCredited - allTransactions?.totalDebited}
            </p>
          </div>
        </div>

        <div className="w-96 ml-16 sm:ml-0 sm:w-117 py-6 px-12 bg-white flex flex-col justify-center items-center rounded-2xl shadow-lg custom-pagination gap-3 font-roboto">
          <p className="text-xl text-text_secondary mb-1 text-center">
            Lifetime Transaction Analysis
          </p>
          <div className="flex justify-between items-center gap-2 w-full">
            <p className="text-base roboto">Lifetime Wallet Balance:</p>
            <p className="text-base roboto font-bold">
              {totalAmount?.data?.totalWalletBalance}
            </p>
          </div>
          <div className="flex justify-between items-center gap-2 w-full">
            <p className="text-base roboto">Lifetime Credited Amount:</p>
            <p className="text-base roboto font-bold">
              {totalAmount?.data?.totalCredit}
            </p>
          </div>
          <div className="flex justify-between items-center gap-2 w-full">
            <p className="text-base roboto">Lifetime Debited Amount:</p>
            <p className="text-base roboto font-bold">
              {totalAmount?.data?.totalDebit}
            </p>
          </div>
        </div>
      </div>
      <div className="md:w-full md:max-w-7xl w-96 ml-16 sm:ml-0 max-w-4xl p-3 bg-white rounded-2xl shadow-lg custom-pagination font-roboto">
        <div className="flex flex-col md:flex-row justify-between items-center p-2 gap-4">
          <h1 className="text-xl font-roboto font-medium text-black tracking-tighter text-center">
            Transaction Table
          </h1>
          <div className="w-full md:w-1/2 h-10">
            <SearchBox
              iconShow={true}
              // onClick={}
              placeholder={
                "Search by Member Name or ID to view total Transaction data"
              }
              onClick={() => SetOpenTr(true)}
              type={"text"}
              onchange={(e) =>
                setTimeout(() => {
                  setSearch(e.target.value);
                }, 1000)
              }
            />
            {openTr && (
              <MemberTrDetails
                onModal={() => SetOpenTr(false)}
                search={search}
              />
            )}
          </div>
          <Export onExport={handleExport} />
        </div>
        <DataTable
          columns={columns}
          data={isError ? [] : formattedData}
          customStyles={customStyles}
          pagination
          paginationPerPage={8}
          paginationTotalRows={isError ? [] : formattedData.length}
          paginationRowsPerPageOptions={[5, 8, 15, 20]}
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
    </div>
  );
};

export default Analytics;

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
    name: "Credit Amount",
    selector: (row) => row.CREDITAMOUNT,
  },
  {
    name: "Debit Amount",
    selector: (row) => row.DEBITAMOUNT,
  },
  {
    name: "Wallet Balance",
    selector: (row) => row.WALLETBALANCE,
  },
  {
    name: "Tr. Mode",
    selector: (row) => row.TRMODE,
    sortable: true,
    cell: (row) => (
      <p
        className={`w-16 h-6 rounded-full flex items-center justify-center font-medium text-white roboto  ${
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
