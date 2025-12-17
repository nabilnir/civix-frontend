import React from 'react';
import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer';
import Swal from 'sweetalert2';

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 30,
    borderBottom: 2,
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 10,
    color: '#666',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 12,
    marginBottom: 10,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  footer: {
    marginTop: 30,
    paddingTop: 20,
    borderTop: 1,
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
  },
});

// Invoice Document Component
const InvoiceDocument = ({ payment, user }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Civix - Invoice</Text>
        <Text style={styles.subtitle}>Public Infrastructure Issue Reporting System</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Invoice ID</Text>
        <Text style={styles.value}>{payment.invoiceId || `INV-${payment._id}`}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Date</Text>
        <Text style={styles.value}>
          {new Date(payment.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Customer Information</Text>
        <Text style={styles.value}>Name: {user?.displayName || payment.userName || 'N/A'}</Text>
        <Text style={styles.value}>Email: {user?.email || payment.userEmail || 'N/A'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Payment Details</Text>
        <View style={styles.row}>
          <Text>Type:</Text>
          <Text>{payment.type === 'subscription' ? 'Premium Subscription' : 'Issue Boost'}</Text>
        </View>
        <View style={styles.row}>
          <Text>Amount:</Text>
          <Text style={{ fontWeight: 'bold' }}>{payment.amount} tk</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Transaction ID</Text>
          <Text style={[styles.value, { fontSize: 9, wordBreak: 'break-all' }]}>
            {payment.transactionId || 'N/A'}
          </Text>
        </View>
        <View style={styles.row}>
          <Text>Status:</Text>
          <Text>{payment.status || 'Completed'}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text>Thank you for using Civix!</Text>
        <Text>This is a computer-generated invoice.</Text>
      </View>
    </Page>
  </Document>
);

// Function to generate and download PDF
export const generateInvoicePDF = async (payment, user) => {
  try {
    // Create the document instance
    const doc = <InvoiceDocument payment={payment} user={user} />;
    
    // Generate PDF blob using @react-pdf/renderer
    const blob = await pdf(doc).toBlob();
    
    // Create download link
    const url = URL.createObjectURL(blob);
    const element = document.createElement('a');
    element.href = url;
    element.download = `invoice-${payment.invoiceId || payment._id || 'invoice'}.pdf`;
    element.style.display = 'none';
    
    // Trigger download
    document.body.appendChild(element);
    element.click();
    
    // Cleanup
    document.body.removeChild(element);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error generating PDF:', error);
    // Fallback: Show error message
    Swal.fire({
      title: 'PDF Generation Failed',
      text: 'Failed to generate PDF. Please try again.',
      icon: 'error',
      confirmButtonColor: '#238ae9',
    });
    throw error;
  }
};

export default InvoiceDocument;

