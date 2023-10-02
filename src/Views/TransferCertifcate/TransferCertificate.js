import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';

// Define your Transfer Certificate content
const TransferCertificate = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.certificate}>
        <Text style={styles.title}>Transfer Certificate</Text>

        <View style={styles.content}>
          <Text>Name: John Doe</Text>
          <Text>Class: XII</Text>
          <Text>Year of Passing: 2023</Text>
          <Text>Date of Issue: 10th July 2023</Text>
        </View>
      </View>
    </Page>
  </Document>
);

// Define styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  certificate: {
    padding: 20,
    border: '1px solid #000',
    borderRadius: 10,
    textAlign: 'center',
    width: '70%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    marginTop: 10,
  },
});

// Create a component to display the PDF
const MyPDFViewer = () => (
  <PDFViewer width="100%" height="500px">
    <TransferCertificate />
  </PDFViewer>
);

export default MyPDFViewer;
