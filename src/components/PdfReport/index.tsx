import OutfitBold from "@assets/fonts/outfit/Outfit-Bold.ttf"
import OutfitMedium from "@assets/fonts/outfit/Outfit-Medium.ttf"
import OutfitNormal from "@assets/fonts/outfit/Outfit-Regular.ttf"
import Light from "@assets/img/pdf/light.png"
import Logo from "@assets/img/pdf/logo.png"
import { PDF_DATA } from "@data/TEST_pdf"
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Svg,
  Path,
  Image
} from "@react-pdf/renderer"

import { GemIcon } from "./GemIcon"

Font.register({
  family: "Outfit",
  fonts: [
    { src: OutfitNormal, fontStyle: "normal", fontWeight: 400 },
    { src: OutfitMedium, fontStyle: "normal", fontWeight: 500 },
    { src: OutfitBold, fontStyle: "normal", fontWeight: 700 }
  ]
})

// Create styles
const styles = StyleSheet.create({
  page: {
    position: "relative",
    backgroundColor: "#09090A",
    color: "#ffffff",
    fontFamily: "Outfit",
    paddingBottom: "48px",
    paddingTop: "48px",
    
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: "32px",
    marginTop: "16px",
    fontSize: 18
  },
  hero: {
    position: "relative",
    //marginHorizontal: "32px",
    //marginVertical: "32px",
    //flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "28px",
    marginHorizontal: "32px"
  },
  heroTitle: {
    position: "relative",
    gap: "8px",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 32,
    fontWeight: 600
  },
  heroBackground: {
    position: "absolute",
    width: "384px",
    height: "148px",
    bottom: 0,
    left: "-124px"
  },
  summary: {
    fontSize: 11,
    fontWeight: 400,
    textAlign: "center",
    marginHorizontal: "32px",
    marginTop: "8px"
  },
  section: {
    marginHorizontal: "32px",
    marginTop: "16px",
    marginBottom: "32px",
    gap: "16px",
    flexGrow: 1
  },
  sectionTitle: {
    marginTop: "16px",
    flexDirection: "row",
    alignItems: "center",
    gap: "6px",
    fontSize: 16,
    fontWeight: 500
  },
  card: {
    flexDirection: "row",
    position: "relative"
  },
  cardTopLeftCorner: {
    position: "absolute",
    top: -1,
    left: -1
  },
  cardBottomRightCorner: {
    position: "absolute",
    bottom: -1,
    right: -1
  },
  cardNote: {
    backgroundColor: "#161616",
    width: "98px",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 48,
    fontWeight: 700
  },
  cardContent: {
    backgroundColor: "#212122",
    width: "433px",
    flexDirection: "column"
  },
  cardTitle: {
    marginHorizontal: "16px",
    marginTop: "16px",
    marginBottom: "8px",
    fontSize: 15,
    fontWeight: 500
  },
  cardText: {
    marginHorizontal: "16px",
    marginTop: "8px",
    marginBottom: "16px",
    fontSize: 11,
    fontWeight: 400
  },
  pageNumber: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: "32px",
    color: "#C1C1C2",
    fontSize: 9,
    bottom: 12,
    left: 0,
    right: 0,
    textAlign: "center"
  }
})

const PdfReport = () => {
  const noteColor = (note: number) => {
    if (note <= 2) {
      return "#EF4444"
    } else if (note >= 6) {
      return "#4ADE80"
    } else {
      return "#FB923C"
    }
  }

  return (
    <Document
      language='en'
      author='thenextgem.ai'
      title='Token - AI Analysis'
      subject='Token - AI Analysis'
      producer='https://thenextgem.ai/pdf'
      creator='https://thenextgem.ai/'
    >
      <Page size='A4' orientation='portrait' style={styles.page}>
        <View style={styles.header} fixed>
          <Text>AI ANALYSIS</Text>
          <Image style={{ width: 118, height: 16 }} source={Logo} />
        </View>
        <View style={styles.hero}>
          <View style={styles.heroTitle}>
            <Text>{PDF_DATA.name}</Text>
            <Image style={styles.heroBackground} source={Light} />
          </View>
          <Text style={styles.summary}>{PDF_DATA.summary}</Text>
        </View>
        <View style={styles.section}>
          <View style={styles.sectionTitle}>
            <GemIcon />
            <Text>AI FEEDBACK</Text>
          </View>
          {PDF_DATA.ai.map((ai, i) => (
            <View style={styles.card} key={`ai-feedback-${i}`}>
              <View style={styles.cardNote}>
                <Text style={{ color: noteColor(Number(ai.note)) }}>
                  {ai.note}
                </Text>
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{ai.model}</Text>
                <Text style={styles.cardText}>{ai.feedback}</Text>
              </View>
              <Svg
                style={styles.cardTopLeftCorner}
                width='23'
                height='23'
                viewBox='0 0 46 46'
                fill='none'
              >
                <Path
                  d='M0 1.6549e-06L46 0L1.51107e-06 46L0 1.6549e-06Z'
                  fill='#09090A'
                  stroke='#09090A'
                />
              </Svg>
              <Svg
                style={styles.cardBottomRightCorner}
                width='25'
                height='25'
                viewBox='0 0 50 50'
                fill='none'
              >
                <Path
                  d='M49 49.5H49.5V49L49.5 3L49.5 1.7929L48.6464 2.64645L2.64645 48.6464L1.7929 49.5L3 49.5L49 49.5Z'
                  fill='#09090A'
                  stroke='#09090A'
                />
              </Svg>
            </View>
          ))}
        </View>
        <View style={styles.pageNumber} fixed>
          <Text>{PDF_DATA.id}</Text>
          <Text
            render={({ pageNumber, totalPages }) =>
              `Page ${pageNumber} of ${totalPages}`
            }
          />
          <Text>Powered by https://thenextgem.ai</Text>
        </View>
      </Page>
    </Document>
  )
}

export default PdfReport
