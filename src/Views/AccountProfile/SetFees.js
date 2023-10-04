import React, { useState } from "react";
import Modal from "react-modal";
import { Post, Get } from "../../Constants/apiMethods";
import { setFeesData, getFeesData } from "../../Constants/apiRoutes";

function SetFees() {
  const token = localStorage.getItem("access_token");
  const [classId, setClassId] = useState("");
  const [newYear, setnewYear] = useState("");
  const classList = [
    "P.G",
    "LKG",
    "UKG",
    "I",
    "II",
    "III",
    "IV",
    "V",
    "VI",
    "VII",
    "VIII",
    "IX",
    "X",
    "XI",
    "XII",
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    year: new Date().getFullYear(),
    totalStudents: "",
    totalMonths: "",
    feePerStudent: "",
  });

  const handleChangeYear = async (selectedYear) => {
    try {
      setModalData({});

      openModal(classId, selectedYear);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const openModal = async (class_id, year) => {
    try {
      year = year || new Date().getFullYear();
      setClassId(class_id);
      setnewYear(year);
      const payload = `?class_id=${class_id}&year=${year}`;
      Get(getFeesData, token, payload)
        .then((response) => response)
        .then((data) => {
 
          setModalData({
            year: Number(year), // Default year or modify based on your requirements
            totalStudents: data?.data?.total_students
              ? data?.data?.total_students
              : "",
            totalMonths: data?.data?.total_months_fees_collected
              ? data?.data?.total_months_fees_collected
              : "",
            feePerStudent: data?.data?.fees_per_student
              ? data?.data?.fees_per_student
              : "",
          });
        });

      // Open the modal
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleTotalStudentsChange = (value) => {
    setModalData({ ...modalData, totalStudents: value });
  };

  const handleFeePerStudentChange = (value) => {
    setModalData({ ...modalData, feePerStudent: value });
  };

  const handleTotalMonthsChange = (value) => {
    setModalData({ ...modalData, totalMonths: value });
  };

  const handleSubmit = () => {
    try {
      const payload = {
        class_id: Number(classId),
        year: Number(newYear),
        total_student: Number(modalData.totalStudents),
        fees_per_student: Number(modalData.feePerStudent),
        total_months_fees_collected: Number(modalData.totalMonths),
      };

      Post(setFeesData, token, payload)
        .then((response) => response)
        .then((data) => {
          setIsModalOpen(false);
        });

      // Open the modal
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const modalContentStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#f5f5f5",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
  };

  const labelStyle = {
    marginBottom: "5px",
    fontWeight: "bold",
  };

  const selectStyle = {
    width: "30%",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    marginBottom: "10px",
  };

  const inputGroupStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: "10px",
  };

  const inputStyle = {
    width: "100%",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  };

  const equalSignStyle = {
    fontSize: "20px",
    margin: "10px 0",
  };

  const buttonStyle = {
    backgroundColor: "green",
    color: "white",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    border: "none",
  };

  const tileStyle = {
    backgroundColor: "white",
    border: "1px solid #ccc",
    padding: "10px",
    borderRadius: "8px",
    textAlign: "center",
    fontSize: "18px",
    cursor: "pointer",
    transition: "transform 0.2s",
    margin: "10px",
  };

  const tileContainerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "10px",
  };

  const classNameStyle = {
    textAlign: "center",
    marginBottom: "5px",
  };

  const modalStyle = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      zIndex: "1000",
    },
    content: {
      width: "500px",
      margin: "auto",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
      background: "linear-gradient(135deg, #f5f5f5, #e0e0e0)",
      border: "none",
    },
  };

  return (
    <div>
      <h3>Please Select The Class To Set Fees </h3>
      <div style={tileContainerStyle}>
        {classList.map((className, index) => (
          <div
            key={index}
            style={tileStyle}
            onClick={() => openModal(index + 1)}
          >
            <div style={classNameStyle}>{className}</div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Set Fees Modal"
        style={modalStyle}
      >
        <div style={modalContentStyle}>
          <label style={labelStyle}>Year:</label>
          <select
            style={selectStyle}
            value={modalData.year}
            onChange={(event) => handleChangeYear(event.target.value)}
          >
            <option value="2023">2023</option>
            <option value="2024">2024</option>
          </select>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Total Students:</label>
            <input
              type="text"
              style={inputStyle}
              value={modalData.totalStudents}
              onChange={(e) => handleTotalStudentsChange(e.target.value)}
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Per Student Fees:</label>
            <input
              type="text"
              style={inputStyle}
              value={modalData.feePerStudent}
              onChange={(e) => handleFeePerStudentChange(e.target.value)}
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Total Months:</label>
            <input
              type="text"
              style={inputStyle}
              value={modalData.totalMonths}
              onChange={(e) => handleTotalMonthsChange(e.target.value)}
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Total Fees For Year = </label>
            <input
              type="text"
              style={inputStyle}
              value={
                Number(modalData.feePerStudent) *
                Number(modalData.totalMonths) *
                Number(modalData.totalStudents)
              }
              readOnly
            />
          </div>

          <div>
            <button style={buttonStyle} onClick={() => handleSubmit()}>
              Submit
            </button>
            <button
              style={{ ...buttonStyle, marginLeft: "10px" }}
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default SetFees;
