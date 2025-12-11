import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

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
  },
  value: {
    fontSize: 12,
    marginBottom: 10,
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
        <Text style={styles.value}>{user?.displayName || payment.userName}</Text>
        <Text style={styles.value}>{user?.email || payment.userEmail}</Text>
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
        <View style={styles.row}>
          <Text>Transaction ID:</Text>
          <Text>{payment.transactionId}</Text>
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
export const generateInvoicePDF = (payment, user) => {
  // Create a blob URL for the PDF
  const element = document.createElement('a');
  element.style.display = 'none';
  
  
  const invoiceContent = `
    Civix - Invoice
    ================
    
    Invoice ID: ${payment.invoiceId || `INV-${payment._id}`}
    Date: ${new Date(payment.createdAt).toLocaleDateString()}
    
    Customer Information:
    ${user?.displayName || payment.userName}
    ${user?.email || payment.userEmail}
    
    Payment Details:
    Type: ${payment.type === 'subscription' ? 'Premium Subscription' : 'Issue Boost'}
    Amount: ${payment.amount} tk
    Transaction ID: ${payment.transactionId}
    Status: ${payment.status || 'Completed'}
    
    Thank you for using Civix!
  `;
  
  const blob = new Blob([invoiceContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  element.href = url;
  element.download = `invoice-${payment.invoiceId || payment._id}.txt`;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
  URL.revokeObjectURL(url);
};

export default InvoiceDocument;

