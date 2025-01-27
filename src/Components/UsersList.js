import React, { useEffect, useState } from "react";
import axios from "axios";
import SEARCH from "../assets/Images/search.png";
import { Modal, Button } from "react-bootstrap";

function UsersList() {
  const apiUrl = process.env.REACT_APP_DB;
  const environment = process.env.REACT_APP_NODE_ENV;
  const [data, setData] = useState([]);
  const [hasNoData, setHasNoData] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDesignation, setSelectedDesignation] = useState("");
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
        .get(`${apiUrl}getAllSiteUsersData`, {
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
      const matchesDesignation =
        !selectedDesignation ||
        item.employee_designation === selectedDesignation;
      return matchesSearch && matchesDesignation;
    });

    setFilteredData(filtered);
    setHasNoData(filtered?.length === 0);
  }, [searchTerm, selectedDesignation, data]);

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
    <div className="rounded-sm max-w-1440 whitespace-nowrap  mt-3 bg-white w-full">
      <h1 className="text-start font-work-sans text-[24px]  not-italic leading-normal font-bold">
        Site Users Data
      </h1>
      <div>
        <div className="mb-4 flex justify-start align-items-center  shrink-0 m-2">
          <div className="relative flex items-center lg:block ">
            <input
              type="text"
              placeholder="Search"
              className="flex w-[676px] px-[40px]  py-[8px] items-center gap-[21px] rounded-[6px] border-[1px] border-[#FF914D] bg-[#FFF] shrink-0 outline-none "
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="rounded-[4px]">
              <img
                src={SEARCH}
                alt="search"
                className=" absolute top-[22px] left-[1px] transform -translate-y-1/2 w-[32px] h-[32px]"
              />
            </div>
          </div>
          <div>
            <select
              value={selectedDesignation}
              onChange={(e) => setSelectedDesignation(e.target.value)}
              className="px-[24px]  py-[6px]  mx-2 rounded-[6px] border-[1px] border-[#FF914D] outline-none text-[20px]"
            >
              <option value="">Employee Designations</option>
              <option value="Nursery staff">Nursery staff</option>
              <option value="Nursery Technician">Nursery Technician</option>
              <option value="Creative Team">Creative Team</option>
              <option value="Nursery Manager">Nursery Manager</option>
            </select>
          </div>
        </div>
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center  ">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : hasNoData ? (
          <div className="alert alert-warning text-center">{hasNoData}</div>
        ) : (
          <div className="table-container  table-responsive text-center rounded shadow-sm rounded-sm table-hover">
            <h6 className="flex align-start justify-content-start font-work-sans text-[18px] font-medium not-italic leading-normal m-2">
              Total Number of Records - {totalRecords}
            </h6>

            <table className="table-active table-striped table-hover  rounded-md overflow-x-auto m-2 ">
              <thead className="font-work-sans text-[20px] font-medium not-italic  leading-normal bg-[#FF914D]  ">
                <tr className="rounded-md">
                  <th className="py-[16px] px-[24px]">S.No</th>
                  <th className="py-[16px] px-[24px]">EmployeeId</th>
                  <th className="py-[16px] px-[24px]">EmployeeName</th>
                  <th className="py-[16px] px-[24px]">EmployeeDesignation</th>
                  <th className="py-[16px] px-[24px]">Date</th>
                  <th className="py-[16px] px-[24px]">ClockIn</th>
                  <th className="py-[16px] px-[24px]">ClockOut</th>
                  <th className="py-[16px] px-[24px]">Duration</th>

                  <th className="py-[16px] px-[24px]">ClockInEmployeeImage</th>
                  <th className="py-[16px] px-[24px]">ClockOutEmployeeImage</th>
                </tr>
              </thead>
              <tbody className="font-work-sans text-[18px] font-medium not-italic leading-normal">
                {currentItems?.map((data, index) => (
                  <tr key={index} className="border">
                    <td className="py-[16px] px-[24px]">
                      {index + indexOfFirstItem + 1}
                    </td>
                    <td className="py-[16px] px-[24px]">{data.employeeId}</td>
                    <td className="py-[16px] px-[24px]">
                      {data.employee_name}
                    </td>
                    <td className="py-[16px] px-[24px]">
                      {data.employee_designation}
                    </td>
                    <td className="py-[16px] px-[24px]">{data.date}</td>

                    <td className="py-[16px] px-[24px]">{data.clock_in}</td>
                    <td className="py-[16px] px-[24px]">{data.clock_out}</td>
                    <td className="py-[16px] px-[24px]">{data.duration}</td>

                    <td className="py-[16px] px-[24px]">
                      <button
                        onClick={() =>
                          openModal(
                            `data:image/jpg;base64,${data.clock_in_employee_img}`
                          )
                        }
                        className="button bg-[#FF914D] text-white py-2 px-4 rounded"
                      >
                     View ClockIn Image
                      </button>
                    
                    </td>
                    <td className="py-[16px] px-[24px]">
                     
                    <button
                        onClick={() =>
                          openModal(
                            `data:image/jpg;base64,${data.clock_out_employee_img}`
                          )
                        }
                        className="button bg-[#FF914D] text-white py-2 px-4 rounded"
                      >
                       View ClockOut Image
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
          <Modal.Title >Clock In Image</Modal.Title>
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

export default UsersList;
