import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import { Get } from "../../Constants/apiMethods";
import { getUserDetails } from "../../Constants/apiRoutes";

import { useParams } from "react-router-dom";
function MyPDFViewer() {
  const [name, setName] = useState("");
  const [className, setClassName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [nationality, setNationality] = useState("");
  const [DOB, setDOB] = useState("");
  const [lastClass, setLastClass] = useState("");
  const [subjectStudied, setSubjectStudied] = useState("");
  const [failed, setFailed] = useState("");
  const [DOJ, setDOJ] = useState("");
  const [promoted, setPromoted] = useState("");
  const [paidAllDues, setPaidAllDues] = useState("");
  const [feeConcession, setFeesConcession] = useState();
  const [lastAttendance, setLastAttendance] = useState("");
  const [nameOffOn, setNameOffOn] = useState("");
  const [dateOfAppCertificate, setDateOfAppCertificate] = useState("");
  const [reasonLeaving, setReasonLeaving] = useState("");
  const [dateOfIssCertificate, SetDateOfIssCertificate] = useState("");
  const [noOfSchoolDays, setNoOfSchoolDays] = useState("");
  const [noOfSchoolDaysAtt, setNoOfSchoolDaysAtt] = useState("");
  const [nccCadet, setNccCadet] = useState("");
  const [gamePlayed, setGamePlayed] = useState("");
  const [mediumOfInst, setMediumOfInst] = useState("");
  const [remark, setRemark] = useState("");
  const [religion, setReligion] = useState("");
  const [genConduct, setGenConduct] = useState("");

  const token = localStorage.getItem("access_token");

  const { id } = useParams();
  useEffect(() => {
    fetchStudentDetails(id);
  }, []);

  const fetchStudentDetails = (id) => {
    const payload = `/${id}`;
    console.log(id);

    Get(getUserDetails, token, payload)
      .then((response) => response)
      .then((data) => {
        setFatherName(data.data.father_name);
        setMotherName(data.data.mother_name);
        setDOB(data.data.date_of_birth.split("T")[0]);
        setName(data.data.name);
      });
  };

  const generatePDF = () => {
    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Set font style for the title and headline
    doc.setFontSize(23);
    doc.setFont("helvetica", "bold");

    // Add an image as a background
    doc.addImage(
      "https://new-doc-production.s3.amazonaws.com/luxa.org-opacity-changed-Untitled.jpeg",
      "JPEG",
      0,
      0,
      doc.internal.pageSize.getWidth(),
      doc.internal.pageSize.getHeight()
    );

    const schoolLogo =
      "https://new-doc-production.s3.amazonaws.com/Untitled.jpeg"; // Replace with the path to your school logo image
    doc.addImage(
      schoolLogo,
      "JPEG",
      0, // X-coordinate for the image
      5, // Y-coordinate for the image
      70, // Image width
      70 // Image height
    );

    // Add the school name as header
    doc.text(
      "LEARNING TREE SCHOOL",
      doc.internal.pageSize.getWidth() / 2,
      20,
      "center"
    );

    // Set font style for school details
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text(
      "Transfer Certificate",
      doc.internal.pageSize.getWidth() / 2,
      30,
      "center"
    );

    // Set font style for school details
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");

    // Add address and phone number
    doc.text(
      "123 Main Street, City, Zip Code",
      doc.internal.pageSize.getWidth() / 2,
      40, // Adjust the Y-coordinate for proper positioning
      "center"
    );
    doc.text(
      "Phone: +9187870 50522",
      doc.internal.pageSize.getWidth() / 2,
      50, // Adjust the Y-coordinate
      "center"
    );

    // Add email
    doc.text(
      "Email: example@example.com",
      doc.internal.pageSize.getWidth() / 2,
      60, // Adjust the Y-coordinate
      "center"
    );

    // Add a separated line
    doc.setLineWidth(0.5);
    doc.line(20, 70, doc.internal.pageSize.getWidth() - 20, 70);

    // Add Affiliated No. & School Code
    doc.setFont("helvetica", "bold");
    doc.text("Affiliated No.: _____________", 20, 68);
    doc.text(
      "School Code: ____________",
      doc.internal.pageSize.getWidth() - 20,
      68,
      "right"
    );

    // Reset font style for the content
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    // Example: Array containing all the content
    const allContent = [
      `1. Name of Pupil : ${
        name || "    ...................................."
      }`,
      `2. Father/Guardian's Name : ${
        fatherName || "    ...................................."
      }`,
      `3. Mother's Name : ${
        motherName || "    ...................................."
      }`,
      `4. Nationality : ${
        nationality || "   ...................................."
      }`,
      `5. Religion/Caste/Mother Tongue : ${
        religion || "    ...................................."
      }`,
      `6. Date of Birth According to the Register : ${
        DOB || "    ...................................."
      }`,
      `7. Class in which pupil last studied (in words) : ${
        lastClass || "    ...................................."
      }`,
      ,
      `8. Subject studied, compulsory or elective : ${
        subjectStudied || "    ...................................."
      }`,

      `9. Whether failed if so one/ twice in the same class : ${
        failed || "    ...................................."
      }`,

      `10. Date of Admission in the school with class : ${
        DOJ || "    ...................................."
      }`,
      `11. Whether qualified for promotion to higher class. : ${
        promoted || "    ...................................."
      }`,
      `12. Whether pupil has paid all the dues to the school : ${
        paidAllDues || "    ...................................."
      }`,
      `13. Whether the pupil was in receipt of any fee concession; if so nature of such concession. : ${
        feeConcession || "    ...................................."
      }`,
      `14. Date of Pupil’s last attendance at school : ${
        lastAttendance || "    ...................................."
      }`,
      `15. Date on hich the name was struck off the rolls of the school. : ${
        nameOffOn || "    ...................................."
      }`,

      `16. Date of Application of Certificate : ${
        dateOfAppCertificate || "    ...................................."
      }`,
      `17. Reason for Leaving : ${
        reasonLeaving || "   ...................................."
      }`,

      `18. Date of issue of Certificate : ${
        dateOfIssCertificate || "    ...................................."
      }`,
      `19. Number of the school days up to date. : ${
        noOfSchoolDays || "    ...................................."
      }`,
      `20. Number of the school days the pupil attended. : ${
        noOfSchoolDaysAtt || "    ...................................."
      }`,
      `21. Whether NCC Cadet/ Boy Scout/Girl Guide : ${
        nccCadet || "    ...................................."
      } `,
      `22. Games Played or other extra- curricular activities in which the pupil usually took part and 
      the proficiency therein : ${
        gamePlayed || "    ...................................."
      } `,
      `23. General Conduct : ${
        genConduct || "    ...................................."
      } `,
      `24. Medium Of Instruction : ${
        mediumOfInst || "    ...................................."
      } `,
      `25. Any other Remarks : ${
        remark || "    ...................................."
      } `,
      ``,

      `Class Teacher's Signature : ${"_______________________"}`,
      ``,

      `Principal's Signature : ${"_______________________"}`,
      ``,

      `School Seal : ${"_______________________"}`,
    ];

    // Function to add content to a page
    const addContentToPage = (content, pageNumber) => {
      // Calculate available space on the page
      const availableSpace = doc.internal.pageSize.getHeight(); // Adjust as needed
      let yOffset = 80; // Initial Y position
      let linesAdded = 0;

      content.forEach((line) => {
        if (yOffset + 10 <= availableSpace) {
          doc.text(line, 20, yOffset);
          yOffset += 10;
          linesAdded += 1;
        } else {
          // If adding this line exceeds the available space, add a new page
          doc.addPage();
          doc.addImage(
            "https://new-doc-production.s3.amazonaws.com/luxa.org-opacity-changed-Untitled.jpeg",
            "JPEG",
            0,
            0,
            doc.internal.pageSize.getWidth(),
            doc.internal.pageSize.getHeight()
          );
          pageNumber += 1;
          yOffset = 20; // Reset Y position
          doc.text(line, 20, yOffset);
          yOffset += 10;
          linesAdded += 1;
        }
      });

      return pageNumber;
    };

    // Initialize the page number to 1
    let pageNumber = 1;

    // Add content to the first page
    pageNumber = addContentToPage(allContent, pageNumber);

    // Save the PDF
    doc.save(`transfer_form_page${pageNumber}.pdf`);
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4">Transfer Certificate Form</h1>
      <div>
        <label className="block mb-2 font-bold">1. Name of the Pupil:</label>
        <input
          type="text"
          className="border border-gray-300 px-2 py-1 w-full mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label className="block mb-2 font-bold">2. Name of the Father</label>
        <input
          type="text"
          className="border border-gray-300 px-2 py-1 w-full mb-4"
          value={fatherName}
          onChange={(e) => setFatherName(e.target.value)}
        />
      </div>
      <div>
        <label className="block mb-2 font-bold">3. Name of the Mother</label>
        <input
          type="text"
          className="border border-gray-300 px-2 py-1 w-full mb-4"
          value={motherName}
          onChange={(e) => setMotherName(e.target.value)}
        />
      </div>
      <div>
        <label className="block mb-2 font-bold">4. Nationality</label>
        <input
          type="text"
          className="border border-gray-300 px-2 py-1 w-full mb-4"
          value={nationality}
          onChange={(e) => setNationality(e.target.value)}
        />
      </div>
      <div>
        <label className="block mb-2 font-bold">
          5. Religion/Caste/Mother Tongue
          <input
            type="text"
            className="border border-gray-300 px-2 py-1 w-full mb-4"
            value={religion}
            onChange={(e) => setReligion(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label className="block mb-2 font-bold">
          6. Date of Birth According to the Register
        </label>
        <input
          type="text"
          className="border border-gray-300 px-2 py-1 w-full mb-4"
          value={DOB}
          onChange={(e) => setDOB(e.target.value)}
        />
      </div>
      <div>
        <label className="block mb-2 font-bold">
          7. Class in which pupil last studied (in words)
        </label>
        <input
          type="text"
          className="border border-gray-300 px-2 py-1 w-full mb-4"
          value={lastClass}
          onChange={(e) => setLastClass(e.target.value)}
        />
      </div>
      <div>
        <label className="block mb-2 font-bold">
          8. Subject studied, compulsory or elective
        </label>
        <input
          type="text"
          className="border border-gray-300 px-2 py-1 w-full mb-4"
          value={subjectStudied}
          onChange={(e) => setSubjectStudied(e.target.value)}
        />
      </div>
      <div>
        <label className="block mb-2 font-bold">
          9. Whether failed if so one/ twice in the same class.
        </label>
        <input
          type="text"
          className="border border-gray-300 px-2 py-1 w-full mb-4"
          value={failed}
          onChange={(e) => setFailed(e.target.value)}
        />
      </div>
      <div>
        <label className="block mb-2 font-bold">
          10. Date of Admission in the school with class
        </label>
        <input
          type="text"
          className="border border-gray-300 px-2 py-1 w-full mb-4"
          value={DOJ}
          onChange={(e) => setDOJ(e.target.value)}
        />
      </div>
      <div>
        <label className="block mb-2 font-bold">
          11. Whether qualified for promotion to higher class.{" "}
        </label>
        <input
          type="text"
          className="border border-gray-300 px-2 py-1 w-full mb-4"
          value={promoted}
          onChange={(e) => setPromoted(e.target.value)}
        />
      </div>
      <div>
        <label className="block mb-2 font-bold">
          12. Whether pupil has paid all the dues to the school.
        </label>
        <input
          type="text"
          className="border border-gray-300 px-2 py-1 w-full mb-4"
          value={paidAllDues}
          onChange={(e) => setPaidAllDues(e.target.value)}
        />
      </div>
      <div>
        <label className="block mb-2 font-bold">
          13. Whether the pupil was in receipt of any fee concession; if so
          nature of such concession
        </label>
        <input
          type="text"
          className="border border-gray-300 px-2 py-1 w-full mb-4"
          value={feeConcession}
          onChange={(e) => setFeesConcession(e.target.value)}
        />
      </div>
      <div>
        <label className="block mb-2 font-bold">
          14. Date of Pupil’s last attendance at school
        </label>
        <input
          type="text"
          className="border border-gray-300 px-2 py-1 w-full mb-4"
          value={lastAttendance}
          onChange={(e) => setLastAttendance(e.target.value)}
        />
      </div>
      <div>
        <label className="block mb-2 font-bold">
          15. Date on which the name was struck off the rolls of the school.
        </label>
        <input
          type="text"
          className="border border-gray-300 px-2 py-1 w-full mb-4"
          value={nameOffOn}
          onChange={(e) => setNameOffOn(e.target.value)}
        />
      </div>
      <div>
        <label className="block mb-2 font-bold">
          16. Date of Application of Certificate
        </label>
        <input
          type="text"
          className="border border-gray-300 px-2 py-1 w-full mb-4"
          value={dateOfAppCertificate}
          onChange={(e) => setDateOfAppCertificate(e.target.value)}
        />
      </div>{" "}
      <div>
        <label className="block mb-2 font-bold">17. Reason for Leaving</label>
        <input
          type="text"
          className="border border-gray-300 px-2 py-1 w-full mb-4"
          value={reasonLeaving}
          onChange={(e) => setReasonLeaving(e.target.value)}
        />
      </div>
      <div>
        <label className="block mb-2 font-bold">
          18. Date of issue of Certificate
        </label>
        <input
          type="text"
          className="border border-gray-300 px-2 py-1 w-full mb-4"
          value={dateOfIssCertificate}
          onChange={(e) => SetDateOfIssCertificate(e.target.value)}
        />
      </div>
      <div>
        <label className="block mb-2 font-bold">
          19. Number of the school days up to date
        </label>
        <input
          type="text"
          className="border border-gray-300 px-2 py-1 w-full mb-4"
          value={noOfSchoolDays}
          onChange={(e) => setNoOfSchoolDays(e.target.value)}
        />
      </div>
      <div>
        <label className="block mb-2 font-bold">
          20. Number of the school days the pupil attended.
        </label>
        <input
          type="text"
          className="border border-gray-300 px-2 py-1 w-full mb-4"
          value={noOfSchoolDaysAtt}
          onChange={(e) => setNoOfSchoolDaysAtt(e.target.value)}
        />
      </div>
      <div>
        <label className="block mb-2 font-bold">
          21. Whether NCC Cadet/ Boy Scout/Girl Guide
        </label>
        <input
          type="text"
          className="border border-gray-300 px-2 py-1 w-full mb-4"
          value={nccCadet}
          onChange={(e) => setNccCadet(e.target.value)}
        />
      </div>
      <div>
        <label className="block mb-2 font-bold">
          22. Games Played or other extra- curricular activities in which the
          pupil usually took part and the proficiency therein.
        </label>
        <input
          type="text"
          className="border border-gray-300 px-2 py-1 w-full mb-4"
          value={gamePlayed}
          onChange={(e) => setGamePlayed(e.target.value)}
        />
      </div>
      <div>
        <label className="block mb-2 font-bold">23. General Conduct</label>
        <input
          type="text"
          className="border border-gray-300 px-2 py-1 w-full mb-4"
          value={genConduct}
          onChange={(e) => setGenConduct(e.target.value)}
        />
      </div>
      <div>
        <label className="block mb-2 font-bold">
          24. Medium Of Instruction
        </label>
        <input
          type="text"
          className="border border-gray-300 px-2 py-1 w-full mb-4"
          value={mediumOfInst}
          onChange={(e) => setMediumOfInst(e.target.value)}
        />
      </div>
      <div>
        <label className="block mb-2 font-bold">
          25. Any other Remarks.
          <input
            type="text"
            className="border border-gray-300 px-2 py-1 w-full mb-4"
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
          />
        </label>
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 mt-4 hover:bg-blue-600"
        onClick={generatePDF}
      >
        Generate PDF
      </button>
    </div>
  );
}

export default MyPDFViewer;
