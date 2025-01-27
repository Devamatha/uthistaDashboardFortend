import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faUsers,
  faListSquares,
  faUserGroup,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

function ExpandableList() {
  const [expanded, setExpanded] = useState(null);
  const navigate = useNavigate();

  const accordions = [
    {
      id: 1,
      title: "Users",
      icon: faUsers,
      items: [{ name: "Show Users", route: "/layout/usersList" }],
    },
    {
      id: 2,
      title: "Expenses Data",
      icon: faListSquares,
      items: [{ name: "Show Expenses", route: "/layout/Expenses" }],
    },
    {
      id: 3,
      title: "Payroll Data",
      icon: faUserGroup,
      items: [
        { name: "Payroll Data", route: "/layout/EmployeeExpenditure" },
      ],
    },
  ];
  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };
  return (
    <div className="cursor-pointer">
      
      {accordions.map((accordion) => (
        
        <div className="flex flex-col  text-[#FFA974]  " key={accordion.id}>
        
          <h5
            id={`accordion-collapse-heading-${accordion.id}`}
            className="text-center font-work-sans  text-[18px] lg:text-[18px]   font-medium leading-normal "
          >
            <div
              className={`py-3  ${expanded === accordion.id}`}
              onClick={() => toggleExpand(accordion.id)}
              aria-expanded={expanded === accordion.id}
              aria-controls={`accordion-collapse-body-${accordion.id}`}
            >
              <div className="flex md:justify-between   w-[100%] ">
                <div className="flex items-center justify-center cursor-pointer">
                  <FontAwesomeIcon
                    className="w-[32px] h-[32px] mr-2"
                    icon={accordion.icon}
                  />
                  <span className="mr-2 lg:block ">
                    {accordion.title}
                  </span>
                </div>
                <div className=" flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`shrink-0 transition-transform duration-300 ${
                      expanded === accordion.id ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </div>
              </div>
            </div>
          </h5>
          <div
            id={`accordion-collapse-body-${accordion.id}`}
            className={`overflow-hidden transition-all duration-300 font-work-sans text-[16px] font-medium leading-normal  ${
              expanded === accordion.id ? "max-h-[500px]" : "max-h-0"
            }`}
          >
            <div className="">
              {accordion.items.map((item, index) => (
                <p
                  key={index}
                  className="cursor-pointer  py-1 hover:underline decoration-2 underline-offset-8 decoration-[#EBA70B] text-center"
                  onClick={() => navigate(`${item.route}`)}
                >
                  {item.name}
                </p>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ExpandableList;
