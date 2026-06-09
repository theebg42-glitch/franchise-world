import React, { useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";

const COMMISSION_RATE = 0.01;
const UNLOCK_FEE = 499;

const PRESET_INVESTMENTS = [
  { label: "₹25L", value: 2500000 },
  { label: "₹50L", value: 5000000 },
  { label: "₹1 Cr", value: 10000000 },
  { label: "₹2 Cr", value: 20000000 },
  { label: "₹5 Cr", value: 50000000 },
];

function formatCurrency(amount: number): string {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  } else if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)}L`;
  }
  return `₹${amount.toLocaleString("en-IN")}`;
}

function parseInputToNumber(text: string): number {
  const cleaned = text.replace(/[^0-9.]/g, "");
  return parseFloat(cleaned) || 0;
}

export default function CalculatorScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [investmentInput, setInvestmentInput] = useState("");
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);

  const investmentAmount = selectedPreset !== null ? selectedPreset : parseInputToNumber(investmentInput) * 100;
  const grossCommission = investmentAmount * COMMISSION_RATE;
  const netEarning = Math.max(0, grossCommission - UNLOCK_FEE);
  const roi = UNLOCK_FEE > 0 ? ((netEarning / UNLOCK_FEE) * 100).toFixed(0) : "0";

  const handlePreset = (value: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedPreset(value);
    setInvestmentInput("");
  };

  const handleInputChange = (text: string) => {
    setSelectedPreset(null);
    setInvestmentInput(text);
  };

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
        <Text style={[styles.screenTitle, { color: colors.foreground }]}>
          Earnings Calculator
        </Text>
        <Text style={[styles.screenSub, { color: colors.mutedForeground }]}>
          Estimate your commission from franchise deals
        </Text>
      </View>

      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: colors.radius }]}>
        <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>
          DEAL SIZE (in lakhs)
        </Text>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: colors.background,
              borderColor: selectedPreset === null && investmentInput ? colors.primary : colors.border,
              color: colors.foreground,
              borderRadius: colors.radius / 1.5,
            },
          ]}
          placeholder="Enter investment amount"
          placeholderTextColor={colors.mutedForeground}
          keyboardType="numeric"
          value={investmentInput}
          onChangeText={handleInputChange}
        />

        <Text style={[styles.sectionLabel, { color: colors.mutedForeground, marginTop: 16 }]}>
          QUICK SELECT
        </Text>
        <View style={styles.presetRow}>
          {PRESET_INVESTMENTS.map((preset) => {
            const isActive = selectedPreset === preset.value;
            return (
              <Pressable
                key={preset.value}
                style={[
                  styles.presetBtn,
                  {
                    backgroundColor: isActive ? colors.primary : colors.background,
                    borderColor: isActive ? colors.primary : colors.border,
                    borderRadius: colors.radius / 1.5,
                  },
                ]}
                onPress={() => handlePreset(preset.value)}
              >
                <Text
                  style={[
                    styles.presetBtnText,
                    { color: isActive ? colors.primaryForeground : colors.foreground },
                  ]}
                >
                  {preset.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {investmentAmount > 0 && (
        <View style={[styles.resultsCard, { backgroundColor: colors.primary, borderRadius: colors.radius }]}>
          <Text style={styles.resultsTitle}>Your Potential Earnings</Text>
          <Text style={styles.resultsAmount}>{formatCurrency(grossCommission)}</Text>
          <Text style={styles.resultsLabel}>Gross Commission (1% of deal)</Text>

          <View style={[styles.divider, { backgroundColor: "rgba(255,255,255,0.25)" }]} />

          <View style={styles.resultsRow}>
            <View style={styles.resultsRowItem}>
              <Text style={styles.resultsRowLabel}>Investment</Text>
              <Text style={styles.resultsRowValue}>{formatCurrency(investmentAmount)}</Text>
            </View>
            <View style={[styles.separator, { backgroundColor: "rgba(255,255,255,0.25)" }]} />
            <View style={styles.resultsRowItem}>
              <Text style={styles.resultsRowLabel}>Unlock Fee</Text>
              <Text style={styles.resultsRowValue}>₹499</Text>
            </View>
            <View style={[styles.separator, { backgroundColor: "rgba(255,255,255,0.25)" }]} />
            <View style={styles.resultsRowItem}>
              <Text style={styles.resultsRowLabel}>Net Earnings</Text>
              <Text style={[styles.resultsRowValue, styles.resultsRowHighlight]}>
                {formatCurrency(netEarning)}
              </Text>
            </View>
          </View>
        </View>
      )}

      {investmentAmount > 0 && (
        <View style={[styles.roiCard, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: colors.radius }]}>
          <View style={styles.roiRow}>
            <Ionicons name="trending-up" size={20} color={colors.success} />
            <Text style={[styles.roiText, { color: colors.foreground }]}>
              ROI on unlock fee:{" "}
              <Text style={[styles.roiHighlight, { color: colors.success }]}>{roi}x</Text>
            </Text>
          </View>
          <Text style={[styles.roiNote, { color: colors.mutedForeground }]}>
            One ₹499 unlock can return {formatCurrency(netEarning)} on a successful referral.
          </Text>
        </View>
      )}

      <View style={[styles.infoCard, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: colors.radius }]}>
        <View style={styles.infoRow}>
          <View style={[styles.infoIcon, { backgroundColor: colors.primary + "15" }]}>
            <Ionicons name="information-circle-outline" size={20} color={colors.primary} />
          </View>
          <View style={styles.infoContent}>
            <Text style={[styles.infoTitle, { color: colors.foreground }]}>How it works</Text>
            <Text style={[styles.infoText, { color: colors.mutedForeground }]}>
              Pay ₹499 to unlock any opportunity. Refer a qualified investor. Earn up to 1% of the finalized investment value after deal closure.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: 20, gap: 16 },
  headerSection: { marginBottom: 4 },
  screenTitle: { fontSize: 26, fontWeight: "700", letterSpacing: -0.5 },
  screenSub: { fontSize: 14, marginTop: 4 },
  sectionLabel: {
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.8,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  card: {
    padding: 16,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  input: {
    height: 50,
    paddingHorizontal: 16,
    fontSize: 16,
    fontWeight: "500",
    borderWidth: 1.5,
  },
  presetRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  presetBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1.5,
  },
  presetBtnText: { fontSize: 13, fontWeight: "600" },
  resultsCard: {
    padding: 24,
    alignItems: "center",
  },
  resultsTitle: { color: "rgba(255,255,255,0.8)", fontSize: 13, fontWeight: "600", letterSpacing: 0.5, textTransform: "uppercase" },
  resultsAmount: { color: "#fff", fontSize: 48, fontWeight: "800", marginTop: 4, letterSpacing: -1 },
  resultsLabel: { color: "rgba(255,255,255,0.7)", fontSize: 13, marginTop: 2 },
  divider: { height: 1, width: "100%", marginVertical: 20 },
  resultsRow: { flexDirection: "row", width: "100%", justifyContent: "space-between" },
  resultsRowItem: { flex: 1, alignItems: "center" },
  resultsRowLabel: { color: "rgba(255,255,255,0.7)", fontSize: 11, fontWeight: "500", textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 4 },
  resultsRowValue: { color: "#fff", fontSize: 14, fontWeight: "700" },
  resultsRowHighlight: { fontSize: 16 },
  separator: { width: 1, marginHorizontal: 8 },
  roiCard: {
    padding: 16,
    borderWidth: 1,
  },
  roiRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 6 },
  roiText: { fontSize: 15, fontWeight: "600" },
  roiHighlight: { fontWeight: "800" },
  roiNote: { fontSize: 13, lineHeight: 18 },
  infoCard: { padding: 16, borderWidth: 1 },
  infoRow: { flexDirection: "row", gap: 12 },
  infoIcon: { width: 36, height: 36, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  infoContent: { flex: 1 },
  infoTitle: { fontSize: 14, fontWeight: "600", marginBottom: 4 },
  infoText: { fontSize: 13, lineHeight: 19 },
});
