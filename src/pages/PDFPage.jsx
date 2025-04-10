import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Font,
} from "@react-pdf/renderer";

// Register Bangla Font
Font.register({
  family: "TiroBangla",
  src: "/src/assets/fonts/TiroBangla-Regular.ttf",
});
Font.register({
  family: "Galada",
  src: "/src/assets/fonts/Galada-Regular.ttf",
});
// Styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    // backgroundColor: "#E4E4E4",
    fontSize: "12px",
  },
  section: {
    margin: 20,
    padding: 10,
    flexGrow: 1,
    borderStyle: "solid",
    borderColor: "gray",
    borderWidth: 4,
  },
  banglaText: {
    fontFamily: "TiroBangla",
  },
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    marginTop: 10,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCell: {
    // width: "33.33%",
    padding: 5,
    textAlign: "center",
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#000",
    fontFamily: "TiroBangla",
  },
  tableHeader: {
    fontWeight: "bold",
    backgroundColor: "#f1f1f1",
  },
});

const PDFPage = () => (
  <PDFViewer className="w-full h-screen">
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <View>
            <Text
              style={[
                styles.banglaText,
                {
                  textAlign: "center",
                  fontSize: 22,
                  fontFamily: "Galada",
                  marginBottom: 10,
                },
              ]}
            >
              মাদ্‌রাসাতুল হাদিস
            </Text>
            <Text
              style={[
                styles.banglaText,
                { textAlign: "center", fontSize: 14, marginBottom: 5 },
              ]}
            >
              একাডেমিক ট্রান্সক্রিপ্ট
            </Text>
            <Text style={[styles.banglaText, { textAlign: "center" }]}>
              প্রথম সাময়িক পরীক্ষা ২০২৫ইং
            </Text>

            
              <Text style={[styles.banglaText]}>নামঃ রকিবুল হাসান</Text>
              <Text style={[styles.banglaText]}>রোলঃ ১৯ </Text>
              {/* <Text style={[styles.banglaText]}>শ্রেণীঃ পঞ্চম </Text> */}
              <Text style={[styles.banglaText]}>প্রাপ্ত মোট নম্বরঃ ৮০ </Text>
              <Text style={[styles.banglaText]}>প্রাপ্ত গ্রেডঃ A+ </Text>
            
          </View>

          {/* Examiner info */}
          {/* <View style={[styles.banglaText]}>
            
          </View> */}

          <View style={styles.table}>
            {/* Header */}
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text
                style={[styles.tableCell, { borderLeftWidth: 0, width: "8%" }]}
              >
                ক্রঃ নং
              </Text>
              <Text style={[styles.tableCell, { width: "56%" }]}>বিষয়</Text>
              <Text style={[styles.tableCell, { width: "12%" }]}>পূর্ণমান</Text>
              <Text style={[styles.tableCell, { width: "12%" }]}>
                প্রাপ্ত নাম্বার
              </Text>
              <Text style={[styles.tableCell, { width: "12%" }]}>
                প্রাপ্ত গ্রেড
              </Text>
            </View>

            {/* Row 1 */}
            {Array.from({ length: 10 }).map((_, index) => (
              <View key={index} style={styles.tableRow}>
                <Text
                  style={[
                    styles.tableCell,
                    { borderLeftWidth: 0, width: "8%" },
                  ]}
                >
                  ০১.
                </Text>
                <Text
                  style={[
                    styles.tableCell,
                    { width: "56%", textAlign: "left" },
                  ]}
                >
                  বাংলা
                </Text>
                <Text style={[styles.tableCell, { width: "12%" }]}>১০০</Text>
                <Text style={[styles.tableCell, { width: "12%" }]}>৯৮</Text>
                <Text style={[styles.tableCell, { width: "12%" }]}>A+</Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  </PDFViewer>
);

export default PDFPage;
