import React, { useEffect } from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { useWords } from "../hooks/wordsState";
import LateefRegular from "../assets/fonts/Lateef-Regular.ttf";
import { api } from "../services/api";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
  },

  table: {
    width: "80%",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    display: "flex",
    flexDirection: "column",
  },
  tableRow: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  tableCell: {
    width: "100%",
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    border: ".2rem solid black",
    fontSize: 12,
    fontWeight: "bold",
  },
  tableHeader: {
    width: "100%",
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    border: ".2rem solid black",
    fontSize: 12,
    fontWeight: "bold",
  },
});

const DownloadWords = () => {
  const words = useWords((state: any) => state.words);
  const init_words = useWords((state: any) => state.init_words);

  useEffect(() => {
    api.get("words").then((res: any) => {
      init_words(
        res.data.map((w: any) => ({
          ...w,
          is_deleted: "false",
          step: 0,
          name: "حذف",
        }))
      );
    });
  }, []);
  return (
    <Document>
      <h1>{words.length}</h1>
      <Page style={styles.page}>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableHeader}>
              <Text>Word</Text>
            </View>
            <View style={styles.tableHeader}>
              <Text>Word (English)</Text>
            </View>
            <View style={styles.tableHeader}>
              <Text>Word (French)</Text>
            </View>
          </View>
          {words.map((w: any) => (
            <View style={styles.tableRow} key={w.id}>
              <View style={styles.tableCell}>
                <Text>{w.word}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{w.word_en}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{w.word_fr}</Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default DownloadWords;
