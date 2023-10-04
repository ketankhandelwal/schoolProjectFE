import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import { Get } from "../../Constants/apiMethods";
import { getUserDetails } from "../../Constants/apiRoutes";

import { useParams } from "react-router-dom";
function MyPDFViewer() {
  const [name, setName] = useState("");
  const [className, setClassName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [studentDetails, setStudentDetails] = useState([]);
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
        console.log(data.data);
        setStudentDetails(data.data);
      });
  };

  const generatePDF = () => {
    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Set font style for the title and headline
    doc.setFontSize(16);
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

    // Add the school name as header
    doc.text(
      "Learning Tree School",
      doc.internal.pageSize.getWidth() / 2,
      30,
      "center"
    );

    // Set font style for school details
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    // Add address and phone number
    doc.text(
      "123 Main Street, City, Zip Code",
      doc.internal.pageSize.getWidth() / 2,
      40,
      "center"
    );
    doc.text(
      "Phone: +1 (123) 456-7890",
      doc.internal.pageSize.getWidth() / 2,
      50,
      "center"
    );

    // Add email
    doc.text(
      "Email: example@example.com",
      doc.internal.pageSize.getWidth() / 2,
      60,
      "center"
    );

    // Add a separated line
    doc.setLineWidth(0.5);
    doc.line(20, 70, doc.internal.pageSize.getWidth() - 20, 70);

    // Add Affiliated No. & School Code
    doc.setFont("helvetica", "bold");
    doc.text("Affiliated No.: 12345", 20, 80);
    doc.text(
      "School Code: XYZ123",
      doc.internal.pageSize.getWidth() - 80,
      80,
      "right"
    );

    doc.text(
      "Transfer Certificate",
      doc.internal.pageSize.getWidth() / 2,
      30,
      "center"
    );

    // Reset font style for the content
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    // Example: Array containing all the content
    const allContent = [
      `1. Name of Pupil : ${
        studentDetails?.name || "...................................."
      }`,
      `2. Father/Guardian's Name : ${
        studentDetails?.father_name || "...................................."
      }`,
      `3. Mother's Name : ${
        studentDetails?.mother_name || "...................................."
      }`,
      `4. Nationlity : ${"" || "...................................."}`,
      `5. Religion/Caste/Mother Tongue : ${
        "" || "...................................."
      }`,
      `6. Date of Birth According to the Register : ${
        studentDetails?.date_of_birth || "...................................."
      }`,
      `7. Class in which pupil last studied (in words) : ${
        "" || "...................................."
      }`,
      ,
      `8. Subject studied, compulsory or elective : ${
        "" || "...................................."
      }`,

      `9. Whether failed if so one/ twice in the same class : ${
        "" || "...................................."
      }`,

      `10. Date of Admission in the school with class : ${
        "" || "...................................."
      }`,
      `11. Whether qualified for promotion to higher class. : ${
        "" || "...................................."
      }`,
      `12. Whether pupil has paid all the dues to the school : ${
        "" || "...................................."
      }`,
      `13. Whether the pupil was in receipt of any fee
      concession; if so nature of such concession. : ${
        "" || "...................................."
      }`,
      `14. Date of Pupil’s last attendance at school : ${
        "" || "...................................."
      }`,
      `15. Date on hich the name was struck off the rolls of
      the school. : ${"" || "...................................."}`,
      `16. Date of Application of Certificate : ${
        "" || "...................................."
      }`,
      `17. Reason for Leaving : ${
        "" || "...................................."
      }`,

      `18. Date of issue of Certificate : ${
        "" || "...................................."
      }`,
      `19. Number of the school days up to date. : ${
        "" || "...................................."
      }`,
      `20. Number of the school days the pupil attended. : ${
        "" || "...................................."
      }`,
      `21. Whether NCC Cadet/ Boy Scout/Girl Guide : ${
        "" || "...................................."
      } `,
      `22. Games Played or other extra- curricular activities in which the pupil usually took part and the
      proficiency therein : ${"" || "...................................."} `,
      `23. General Conduct : ${"" || "...................................."} `,
      `24. Medium Of Instruction : ${
        "" || "...................................."
      } `,
      `25. Any other Remarks : ${
        "" || "...................................."
      } `,
    ];

    // Function to add content to a page
    const addContentToPage = (content, pageNumber) => {
      // Calculate available space on the page
      const availableSpace = doc.internal.pageSize.getHeight() - 100; // Adjust as needed

      // Loop through content and add it to the page
      let yOffset = 100; // Initial Y position
      let linesAdded = 0;

      content.forEach((line) => {
        if (yOffset + 10 <= availableSpace) {
          doc.text(line, 20, yOffset);
          yOffset += 10;
          linesAdded += 1;
        } else {
          // If content exceeds the available space, add a new page
          doc.addPage();
          yOffset = 20; // Reset Y position
          pageNumber += 1;
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
      <div>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Class:
          <input
            type="text"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Roll number:
          <input
            type="text"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
          />
        </label>
      </div>
      <button onClick={generatePDF}>Generate PDF</button>
    </div>
  );
}

export default MyPDFViewer;
