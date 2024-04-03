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
  Image
} from "@react-pdf/renderer"

import {
  CornerBottomLeft,
  CornerBottomRight,
  CornerTopLeft,
  CornerTopRight
} from "./Corners"
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
    paddingBottom: "32px",
    paddingTop: "48px"
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
    marginTop: "12px",
    marginBottom: "28px"
  },
  section: {
    marginHorizontal: "32px",
    gap: "16px",
    marginTop: "28px"
  },
  sectionTitle: {
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
  cardNote: {
    backgroundColor: "#161616",
    width: "98px",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 48,
    fontWeight: 700
  },
  cardContent: {
    position: "relative",
    backgroundColor: "#212122",
    width: "433px",
    flexDirection: "column"
  },
  cardTitle: {
    marginHorizontal: "16px",
    marginTop: "16px",
    marginBottom: "4px",
    fontSize: 15,
    fontWeight: 500
  },
  cardText: {
    marginHorizontal: "16px",
    marginTop: "4px",
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
  },
  cardSwot: {
    position: "relative",
    backgroundColor: "#212122",
    width: "262px",
    flexDirection: "column"
  },
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
              <CornerTopLeft />
              <CornerBottomRight />
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
        <View style={styles.section}>
          <View style={styles.sectionTitle}>
            <GemIcon />
            <Text>TOKENOMICS</Text>
          </View>
        </View>
        <View style={{...styles.section, gap: "8px"}}>
          <View style={styles.sectionTitle}>
            <GemIcon />
            <Text>SWOT</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              gap: "8px",
              justifyContent: "space-between"
            }}
          >
            <View style={styles.cardSwot}>
              <Text style={styles.cardTitle}>STRENGTHS</Text>
              <Text style={styles.cardText}>{PDF_DATA.swot.strengths}</Text>
              <CornerTopLeft />
              <CornerBottomRight />
            </View>
            <View style={styles.cardSwot}>
              <Text style={styles.cardTitle}>WEAKNESSES</Text>
              <Text style={styles.cardText}>{PDF_DATA.swot.weaknesses}</Text>
              <CornerTopRight />
              <CornerBottomLeft />
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              gap: "8px",
              justifyContent: "space-between"
            }}
          >
            <View style={styles.cardSwot}>
              <Text style={styles.cardTitle}>OPPORTUNITIES</Text>
              <Text style={styles.cardText}>{PDF_DATA.swot.opportunities}</Text>
              <CornerTopRight />
              <CornerBottomLeft />
            </View>
            <View style={styles.cardSwot}>
              <Text style={styles.cardTitle}>THREATS</Text>
              <Text style={styles.cardText}>{PDF_DATA.swot.threats}</Text>
              <CornerTopLeft />
              <CornerBottomRight />
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.sectionTitle}>
            <GemIcon />
            <Text>TEAM</Text>
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.sectionTitle}>
            <GemIcon />
            <Text>CONCLUSION</Text>
          </View>
        </View>
      </Page>
    </Document>
  )
}

export default PdfReport
