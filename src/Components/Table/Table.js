import React from "react";
import ReactPaginate from "react-paginate";
import sortIcon from "../../assets/Icons/sort.svg";

export default function Table(props) {
  
  const changePage = (event) => {
    props.setCurrentPage(event.selected + 1);
  };

  return (
    <>
      <table className="w-full">
        <thead>
          <tr className="bg-bodyColor">
            {props.headerData &&
              props.headerData.map((item, index) => {
                return (
                  <>
                    <td
                      key={item}
                      className={`px-2 bg-blueGray-50 text-blueGray-500 align-middle  py-3 border-l-0 border-r-0 whitespace-nowrap font-semibold text-center ${
                        index === 0 && "rounded-l-xl"
                      } ${
                        props.headerData.length - 1 === index &&
                        " rounded-r-xl "
                      }`}
                    >
                      {item}
                      {props?.sortBy && props?.sortBy === item && (
                        <img
                          className="w-5 inline-flex ml-2"
                          onClick={() => props?.handleSortOrder()}
                          src={sortIcon}
                        />
                      )}
                    </td>
                  </>
                );
              })}
          </tr>
        </thead>
        <tbody className="divide-y">
          {props?.scopedSlots}
        </tbody>
      </table>
      {props.totalCount == 0 ? (
        <div className="text-center text-2xl mt-6">No Record Found</div>
      ) : (
        props.totalCount &&
        <div className="flex">
          <div className="w-1/4">
            <h1 className="mt-5">
              (Showing {props.count} out of {props.totalCount})
            </h1>
          </div>
          <div className="w-3/4 text-right">
            <ReactPaginate
              forcePage={props.currentPage - 1}
              previousLabel={"previous"}
              nextLabel={"Next"}
              pageCount={props.pageCount}
              onPageChange={changePage}
              containerClassName={"paginationBttns"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
              pageRangeDisplayed={5}
            />
          </div>
        </div>
      )}
    </>
  );
}
