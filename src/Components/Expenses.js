import React, { useEffect, useState } from "react";
import axios from "axios";
import SEARCH from "../assets/Images/search.png";
import { Modal, Button } from "react-bootstrap";

function Expenses() {
  const apiUrl = process.env.REACT_APP_DB;
  const environment = process.env.REACT_APP_NODE_ENV;
  const [data, setData] = useState([]);
  const [hasNoData, setHasNoData] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFormType, setSelectedFormType] = useState("");
  const [selectedCategoryType, setSelectedCategoryType] = useState("");

  const [isLoading, setisLoading] = useState(false);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [Page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalRecords, SetTotalRecords] = useState(0);
  useEffect(() => {
    fetchData(Page, pageSize);
  }, [Page, pageSize]);
  const fetchData = async (page, size) => {
    try {
     
      setisLoading(true);

      axios
        .get(`${apiUrl}categoreis/getAllExpenses`, {
          params: {
            page,
            size,
          },
        })
        .then((response) => {
          setisLoading(false);
          setData(response.data.content);
          setTotalPages(response.data.totalPages);
          //setHasNoData(response.data?.content?.length === 0);
          setHasNoData(response.message);

          SetTotalRecords(response.data.totalElements);
          setCurrentPage(1);
        });
    } catch (error) {
      setisLoading(false);
      console.log("Error in this page" + error);
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    const filtered = data?.filter((item) => {
      const matchesSearch = Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesFormType = !selectedFormType || item.formType === selectedFormType;

      const matchescategoryType = !selectedCategoryType || item.categoryType === selectedCategoryType;
      return matchesSearch && matchesFormType && matchescategoryType;
    });

    
    setFilteredData(filtered);
    setHasNoData(filtered?.length === 0);
  }, [searchTerm, selectedCategoryType, selectedFormType, data]);

  const indexOfLastItem = currentPage * recordsPerPage;
  const indexOfFirstItem = indexOfLastItem - recordsPerPage;
  const currentItems = filteredData?.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredData?.length / recordsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePreviousPage = () => {
    if (Page > 0) setPage(Page - 1);
  };

  const handleNextPage = () => {
    if (Page < totalPages - 1) setPage(Page + 1);
  };

  const handlePageClick = (number) => {
    setPage(number - 1);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  // const handleRecordsPerPageChange = (e) => {
  //   setRecordsPerPage(parseInt(e.target.value, 10));
  //   setCurrentPage(1);
  // };

  // const handleUIPageChange = (number) => {
  //   setCurrentPage(number);
  // };
  return (
    <div className="rounded-sm max-w-1440 whitespace-nowrap  mt-3 bg-white w-full ">
      <h1 className="text-start font-work-sans text-[24px] font-bold not-italic leading-normal">Expenses Data</h1> 
      <div className="m-1">

        <div className="mb-4 d-flex flex-column flex-lg-row  flex-md-column justify-content-start align-items-center gap-3">
        <div className="d-flex w-100">

          <div className="position-relative  w-100 ">
            <input
              type="text"
              placeholder="Search"
              className="form-control !px-[40px] !py-[8px] !items-center !gap-[21px] !rounded-[6px] !border-[1px] !border-[#FF914D] !bg-[#FFF] !shrink-0 !outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="rounded-[4px]">
              <img
                src={SEARCH}
                alt="search"
                className="absolute top-[22px] left-[1px] transform -translate-y-1/2 w-[32px] h-[32px]"
              />
            </div>
          </div>

          </div>

          <div className="d-flex w-100 gap-3 flex-column flex-md-row">

          <div className="flex-grow-1 flex-md-grow-0 w-100 w-md-50">
            <select
              value={selectedFormType}
              onChange={(e) => setSelectedFormType(e.target.value)}
              className="form-select !px-[24px] !py-[6px]  !rounded-[6px] !border-[1px] !border-[#FF914D] !outline-none !text-[20px]"
            >
              <option value="">Form Type</option>
              <option value="nursery">Nursery</option>
              <option value="tailoring">Tailoring</option>
              <option value="embroidery">Embroidery</option>
              <option value="puppetworkshop">Puppet Workshop</option>
              <option value="potteryclayartworkshop">
                Pottery & Clay Art Workshop
              </option>
              <option value="rugartworkshop">Rug Art Workshop</option>
              <option value="stoneartworkshop">Stone Art Workshop</option>
              <option value="soapartworkshop">Soap Art Workshop</option>
            </select>
          </div>

          <div className="flex-grow-1 flex-md-grow-0 w-100 w-md-50">
            <select
              value={selectedCategoryType}
              onChange={(e) => setSelectedCategoryType(e.target.value)}
              className="form-select !px-[24px] !py-[6px]  !rounded-[6px] !border-[1px] !border-[#FF914D] !outline-none !text-[20px]"
            >
              <option value="">Category Type</option>
              <option value="fixedsalaries">Fixed Salaries</option>
              <option value="wagessalaries">Wages Salaries</option>
              <option value="salaryadvance">Salary Advance</option>
              <option value="loans">Loans</option>
              <option value="packaging">Packaging</option>
              <option value="stafftrainingexpenses"> Staff Training Expenses</option>
              <option value="utilities">Utilities</option>
              <option value="stationery">Stationery</option>
              <option value="foodandBeverages">Food and Beverages</option>
              <option value="groceries">Groceries</option>
              <option value="watersupplie">Water Supplies</option>
              <option value="maintenanceandrepair"> Maintenance and Repair  </option>
              <option value="vechiclemaintenance">Vehicle Maintenance</option>
              <option value="misellaneous">Miscellaneous</option>
              <option value="fuelcosts">Fuel Costs</option>
              <option value="otherexpenses">Other Expenses</option>
              <option value="transportation">Transportation</option>
              <option value="skilltrainingcost">Skill Training Cost</option>
              <option value="rentandutilities">Rent and Utilities</option>
              <option value="machinemaintaince">Machine Maintenance</option>
              <option value="tools">Tools</option>
              <option value="rawmaterial">Raw Material</option>
              <option value="sewingmachine">Sewing Machine</option>
              <option value="skillstrainingcost">Skills Training Cost</option>
              <option value="machines">Machines</option>
            </select>
          </div>
          </div>
        </div>
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : hasNoData ? (
          <div className="alert alert-warning text-center">
            {/* {hasNoData} */}
            <iframe src="https://lottie.host/embed/6904d12c-ebf7-4e19-9691-b7b0e5d70a83/jrgAE1S4ry.lottie"></iframe>  

            </div>
        ) : (
          <div className="table-container  table-responsive text-center rounded shadow-sm rounded-sm table-hover">
         <h6 className="flex align-start justify-content-start font-work-sans text-[18px] font-medium not-italic leading-normal ">
              Total Number of Records - {totalRecords}
            </h6>
              <table className="table-active table-striped table-hover rounded-md overflow-x-auto">
                <thead className="font-work-sans text-[20px] font-medium not-italic leading-normal bg-[#FF914D]">
                  <tr className="rounded-md">
                    <th className="py-[16px] px-[24px]">S.No</th>
                    <th className="py-[16px] px-[24px]">Form Type</th>
                    <th className="py-[16px] px-[24px]">Category Type</th>
                    <th className="py-[16px] px-[24px]">Email</th>
                    <th className="py-[16px] px-[24px]">created At</th>

                    <th className="py-[16px] px-[24px]">Amount</th>
                    <th className="py-[16px] px-[24px]">Payment Mode</th>
                    <th className="py-[16px] px-[24px]">Remark</th>
                    <th className="py-[16px] px-[24px]">Transaction Id</th>
                    <th className="py-[16px] px-[24px]">Image</th>

                  </tr>
                </thead>
                <tbody className="font-work-sans text-[18px] font-medium not-italic leading-normal">
                  {currentItems?.map((data, index) => (
                    <tr key={index} className="border">
                      <td className="py-[16px] px-[24px]">
                        {index + indexOfFirstItem + 1}
                      </td>
                      <td className="py-[16px] px-[24px]">{data.formType}</td>
                      <td className="py-[16px] px-[24px]">
                        {data.categoryType}
                      </td>
                      <td className="py-[16px] px-[24px]">
                      {data.email}
                    </td>
                    <td className="py-[16px] px-[24px]">{data.createdAt}</td>

                      <td className="py-[16px] px-[24px]">{data.amount}</td>
                      <td className="py-[16px] px-[24px]">
                        {data.paymentMode}
                      </td>
                      <td className="py-[16px] px-[24px]">{data.remarks}</td>
                      <td className="py-[16px] px-[24px]">{data.transactionId}</td>
                      <td className="py-[16px] px-[24px]">
                        {/* <img
                          src={`data:image/jpg;base64,${data.image}`}
                          alt="Clock Out"
                          className="w-10 h-10 rounded-full object-cover"
                        /> */}


                          <button
                        onClick={() =>
                          openModal(
                            `data:image/jpg;base64,${data.image}`
                          )
                        }
                        className="button bg-[#FF914D] text-white py-2 px-4 rounded"
                      >
                     View  Image
                      </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
          
          </div>
        )}
        <nav className="mt-2" aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            {/* <div className="d-flex justify-content-end mb-3">
            <label
              htmlFor="recordsPerPage"
              className="font-work-sans text-[18px] font-medium not-italic leading-normal page-link"
            >
              Records per page:
            </label>
            <select
              id="recordsPerPage"
              className="form-select w-auto"
              value={recordsPerPage}
              onChange={handleRecordsPerPageChange}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={25}>25</option>
              <option value={30}>30</option>
            </select>
          </div> */}
            <li
              className={`page-item ${Page === 0 ? "disabled" : ""}`}
              onClick={handlePreviousPage}
            >
              <a className="page-link" href="#!">
                Previous
              </a>
            </li>
            {pageNumbers
              .filter(
                (number) =>
                  number === Page + 1 || number === Page || number === Page + 2
              )
              .map((number) => (
                <li
                  key={number}
                  className={`page-item ${Page + 1 === number ? "active" : ""}`}
                  onClick={() => handlePageClick(number)}
                >
                  <a className="page-link" href="#!">
                    {number}
                  </a>
                </li>
              ))}
            <li
              className={`page-item ${
                Page === totalPages - 1 ? "disabled" : ""
              }`}
              onClick={handleNextPage}
            >
              <a className="page-link" href="#!">
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <Modal show={isModalOpen} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title >View Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={selectedImage}
            alt="Clock In"
            className="w-100 rounded object-cover"
          />
        </Modal.Body>
       
      </Modal>
    </div>
  );
}

export default Expenses;
