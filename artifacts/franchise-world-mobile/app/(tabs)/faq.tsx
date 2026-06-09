import React, { useState } from "react";
import {
  Animated,
  LayoutAnimation,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  UIManager,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";
import { faqItems, faqAnswers, howItWorksSteps } from "@/data/content";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function FAQItem({ question }: { question: string }) {
  const colors = useColors();
  const [expanded, setExpanded] = useState(false);
  const answer = faqAnswers[question] ?? "";

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <Pressable
      style={[
        styles.faqItem,
        {
          backgroundColor: colors.card,
          borderColor: expanded ? colors.primary + "40" : colors.border,
          borderRadius: colors.radius,
        },
      ]}
      onPress={toggle}
    >
      <View style={styles.faqHeader}>
        <Text style={[styles.faqQuestion, { color: colors.foreground, flex: 1 }]}>
          {question}
        </Text>
        <View style={[styles.faqIcon, { backgroundColor: expanded ? colors.primary : colors.muted }]}>
          <Ionicons
            name={expanded ? "chevron-up" : "chevron-down"}
            size={14}
            color={expanded ? "#fff" : colors.mutedForeground}
          />
        </View>
      </View>
      {expanded && (
        <Text style={[styles.faqAnswer, { color: colors.mutedForeground, borderTopColor: colors.border }]}>
          {answer}
        </Text>
      )}
    </Pressable>
  );
}

function StepCard({ step, title, description }: { step: string; title: string; description: string }) {
  const colors = useColors();
  return (
    <View style={[styles.stepCard, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: colors.radius }]}>
      <View style={[styles.stepNumber, { backgroundColor: colors.primary }]}>
        <Text style={styles.stepNumberText}>{step}</Text>
      </View>
      <View style={styles.stepContent}>
        <Text style={[styles.stepTitle, { color: colors.foreground }]}>{title}</Text>
        <Text style={[styles.stepDescription, { color: colors.mutedForeground }]}>{description}</Text>
      </View>
    </View>
  );
}

export default function FAQScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const webTopPad = Platform.OS === "web" ? 67 : 0;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[
        styles.content,
        {
          paddingTop: insets.top + 20 + webTopPad,
          paddingBottom: insets.bottom + 90,
        },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.headerSection}>
        <Text style={[styles.screenTitle, { color: colors.foreground }]}>Help & FAQ</Text>
        <Text style={[styles.screenSub, { color: colors.mutedForeground }]}>
          Everything you need to know about consulting with us
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>How It Works</Text>
        <View style={styles.stepsContainer}>
          {howItWorksSteps.map((s) => (
            <StepCard key={s.step} step={s.step} title={s.title} description={s.description} />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Frequently Asked
        </Text>
        <View style={styles.faqList}>
          {faqItems.map((q) => (
            <FAQItem key={q} question={q} />
          ))}
        </View>
      </View>

      <View style={[styles.contactCard, { backgroundColor: colors.primary, borderRadius: colors.radius }]}>
        <Ionicons name="headset-outline" size={28} color="#fff" />
        <View style={styles.contactContent}>
          <Text style={styles.contactTitle}>Need more help?</Text>
          <Text style={styles.contactSub}>Our support team is available via WhatsApp and consultant success calls.</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: 20, gap: 24 },
  headerSection: {},
  screenTitle: { fontSize: 26, fontWeight: "700", letterSpacing: -0.5 },
  screenSub: { fontSize: 14, marginTop: 4 },
  section: { gap: 12 },
  sectionTitle: { fontSize: 18, fontWeight: "700", letterSpacing: -0.3 },
  stepsContainer: { gap: 10 },
  stepCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 14,
    borderWidth: 1,
    gap: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  stepNumberText: { color: "#fff", fontSize: 14, fontWeight: "800" },
  stepContent: { flex: 1 },
  stepTitle: { fontSize: 15, fontWeight: "700", marginBottom: 4 },
  stepDescription: { fontSize: 13, lineHeight: 18 },
  faqList: { gap: 8 },
  faqItem: {
    borderWidth: 1,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  faqHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
  },
  faqQuestion: { fontSize: 14, fontWeight: "600", lineHeight: 20 },
  faqIcon: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  faqAnswer: {
    fontSize: 14,
    lineHeight: 20,
    paddingHorizontal: 14,
    paddingBottom: 14,
    paddingTop: 10,
    borderTopWidth: 1,
  },
  contactCard: {
    padding: 20,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 14,
  },
  contactContent: { flex: 1 },
  contactTitle: { color: "#fff", fontSize: 16, fontWeight: "700", marginBottom: 4 },
  contactSub: { color: "rgba(255,255,255,0.8)", fontSize: 13, lineHeight: 18 },
});
