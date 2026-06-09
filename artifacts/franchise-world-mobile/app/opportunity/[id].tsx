import React, { useState } from "react";
import {
  Alert,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { router, useLocalSearchParams, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColors } from "@/hooks/useColors";
import { opportunities } from "@/data/opportunities";

const PAYMENT_GATEWAY =
  process.env.EXPO_PUBLIC_PAYMENT_GATEWAY_URL ??
  "https://payments.franchiseworldconsultant.com/checkout";
const PAYMENT_AMOUNT = 499;
const UNLOCK_KEY = "unlocked_opportunities";

const OCCUPATIONS = [
  "Business Consultant",
  "Real Estate Advisor",
  "Insurance Advisor",
  "Financial Advisor",
  "HR Professional",
  "Sales Professional",
  "Entrepreneur",
  "Investor",
  "Other",
];

type FormData = {
  fullName: string;
  mobile: string;
  email: string;
  city: string;
  occupation: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.fullName.trim()) errors.fullName = "Required";
  if (!/^[6-9]\d{9}$/.test(data.mobile)) errors.mobile = "Enter valid 10-digit mobile";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Enter valid email";
  if (!data.city.trim()) errors.city = "Required";
  if (!data.occupation) errors.occupation = "Required";
  return errors;
}

function OccupationPicker({
  value,
  onSelect,
  error,
}: {
  value: string;
  onSelect: (v: string) => void;
  error?: string;
}) {
  const colors = useColors();
  const [open, setOpen] = useState(false);
  return (
    <View>
      <Pressable
        style={[
          styles.fieldInput,
          styles.pickerBtn,
          {
            backgroundColor: colors.background,
            borderColor: error ? colors.primary : colors.border,
            borderRadius: colors.radius / 2,
          },
        ]}
        onPress={() => setOpen(!open)}
      >
        <Text style={[styles.pickerBtnText, { color: value ? colors.foreground : colors.mutedForeground }]}>
          {value || "Select occupation"}
        </Text>
        <Ionicons name={open ? "chevron-up" : "chevron-down"} size={16} color={colors.mutedForeground} />
      </Pressable>
      {open && (
        <View style={[styles.pickerDropdown, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: colors.radius / 2 }]}>
          {OCCUPATIONS.map((occ) => (
            <Pressable
              key={occ}
              style={[
                styles.pickerOption,
                { borderBottomColor: colors.border },
                value === occ && { backgroundColor: colors.primary + "10" },
              ]}
              onPress={() => { onSelect(occ); setOpen(false); }}
            >
              <Text style={[styles.pickerOptionText, { color: value === occ ? colors.primary : colors.foreground }]}>
                {occ}
              </Text>
              {value === occ && <Ionicons name="checkmark" size={14} color={colors.primary} />}
            </Pressable>
          ))}
        </View>
      )}
      {error && <Text style={[styles.fieldError, { color: colors.destructive }]}>{error}</Text>}
    </View>
  );
}

function LeadForm({
  brandId,
  brandName,
  onCancel,
  onRedirecting,
}: {
  brandId: string;
  brandName: string;
  onCancel: () => void;
  onRedirecting: () => void;
}) {
  const colors = useColors();
  const [form, setForm] = useState<FormData>({
    fullName: "",
    mobile: "",
    email: "",
    city: "",
    occupation: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const set = (key: keyof FormData) => (val: string) => {
    setForm((f) => ({ ...f, [key]: val }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const handleSubmit = async () => {
    const errs = validateForm(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    try {
      await AsyncStorage.setItem(
        `fw_lead_${brandId}`,
        JSON.stringify({ ...form, brandId, ts: Date.now() })
      );
    } catch {}

    const params = new URLSearchParams({
      source: "Franchise World Mobile App",
      brandId,
      brandName,
      amount: String(PAYMENT_AMOUNT),
      currency: "INR",
      fullName: form.fullName,
      mobile: form.mobile,
      email: form.email,
      city: form.city,
      occupation: form.occupation,
    });

    const url = `${PAYMENT_GATEWAY}?${params.toString()}`;
    onRedirecting();
    await Linking.openURL(url);
    setSubmitting(false);
  };

  return (
    <View style={[styles.formCard, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: colors.radius }]}>
      <View style={styles.formStepBadge}>
        <View style={[styles.stepBadgePill, { backgroundColor: colors.primary + "15" }]}>
          <Text style={[styles.stepBadgeText, { color: colors.primary }]}>Step 1 of 2</Text>
        </View>
      </View>
      <Text style={[styles.formTitle, { color: colors.foreground }]}>Unlock {brandName}</Text>
      <Text style={[styles.formSub, { color: colors.mutedForeground }]}>
        Fill in your details to continue to secure payment (₹{PAYMENT_AMOUNT} one-time).
      </Text>

      <View style={styles.formFields}>
        <View>
          <Text style={[styles.fieldLabel, { color: colors.mutedForeground }]}>Full Name *</Text>
          <TextInput
            style={[styles.fieldInput, { backgroundColor: colors.background, borderColor: errors.fullName ? colors.destructive : colors.border, color: colors.foreground, borderRadius: colors.radius / 2 }]}
            placeholder="Your full name"
            placeholderTextColor={colors.mutedForeground}
            value={form.fullName}
            onChangeText={set("fullName")}
            autoCapitalize="words"
          />
          {errors.fullName && <Text style={[styles.fieldError, { color: colors.destructive }]}>{errors.fullName}</Text>}
        </View>

        <View>
          <Text style={[styles.fieldLabel, { color: colors.mutedForeground }]}>Mobile Number *</Text>
          <TextInput
            style={[styles.fieldInput, { backgroundColor: colors.background, borderColor: errors.mobile ? colors.destructive : colors.border, color: colors.foreground, borderRadius: colors.radius / 2 }]}
            placeholder="10-digit mobile"
            placeholderTextColor={colors.mutedForeground}
            value={form.mobile}
            onChangeText={(t) => set("mobile")(t.replace(/\D/g, ""))}
            keyboardType="phone-pad"
            maxLength={10}
          />
          {errors.mobile && <Text style={[styles.fieldError, { color: colors.destructive }]}>{errors.mobile}</Text>}
        </View>

        <View>
          <Text style={[styles.fieldLabel, { color: colors.mutedForeground }]}>Email Address *</Text>
          <TextInput
            style={[styles.fieldInput, { backgroundColor: colors.background, borderColor: errors.email ? colors.destructive : colors.border, color: colors.foreground, borderRadius: colors.radius / 2 }]}
            placeholder="you@example.com"
            placeholderTextColor={colors.mutedForeground}
            value={form.email}
            onChangeText={set("email")}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {errors.email && <Text style={[styles.fieldError, { color: colors.destructive }]}>{errors.email}</Text>}
        </View>

        <View>
          <Text style={[styles.fieldLabel, { color: colors.mutedForeground }]}>City *</Text>
          <TextInput
            style={[styles.fieldInput, { backgroundColor: colors.background, borderColor: errors.city ? colors.destructive : colors.border, color: colors.foreground, borderRadius: colors.radius / 2 }]}
            placeholder="Your city"
            placeholderTextColor={colors.mutedForeground}
            value={form.city}
            onChangeText={set("city")}
            autoCapitalize="words"
          />
          {errors.city && <Text style={[styles.fieldError, { color: colors.destructive }]}>{errors.city}</Text>}
        </View>

        <View>
          <Text style={[styles.fieldLabel, { color: colors.mutedForeground }]}>Occupation *</Text>
          <OccupationPicker value={form.occupation} onSelect={set("occupation")} error={errors.occupation} />
        </View>
      </View>

      <View style={[styles.paymentNote, { backgroundColor: colors.muted, borderRadius: colors.radius / 2 }]}>
        <Ionicons name="shield-checkmark-outline" size={16} color={colors.mutedForeground} />
        <Text style={[styles.paymentNoteText, { color: colors.mutedForeground }]}>
          After submitting, you'll be redirected to our secure payment page to complete the{" "}
          <Text style={{ color: colors.primary, fontWeight: "700" }}>₹{PAYMENT_AMOUNT} unlock</Text>.
        </Text>
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.submitBtn,
          {
            backgroundColor: colors.primary,
            borderRadius: colors.radius / 1.5,
            opacity: pressed || submitting ? 0.85 : 1,
          },
        ]}
        onPress={handleSubmit}
        disabled={submitting}
      >
        <Ionicons name="lock-open-outline" size={18} color="#fff" />
        <Text style={styles.submitBtnText}>
          {submitting ? "Redirecting to payment…" : `Continue to Payment – ₹${PAYMENT_AMOUNT}`}
        </Text>
      </Pressable>

      <Pressable style={styles.cancelBtn} onPress={onCancel}>
        <Text style={[styles.cancelBtnText, { color: colors.mutedForeground }]}>Cancel</Text>
      </Pressable>
    </View>
  );
}

function PostPaymentConfirm({
  opportunityId,
  brandName,
  onConfirmed,
  onCancel,
}: {
  opportunityId: string;
  brandName: string;
  onConfirmed: () => void;
  onCancel: () => void;
}) {
  const colors = useColors();

  const confirmPayment = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const raw = await AsyncStorage.getItem(UNLOCK_KEY);
    const unlocked: string[] = raw ? JSON.parse(raw) : [];
    if (!unlocked.includes(opportunityId)) {
      unlocked.push(opportunityId);
      await AsyncStorage.setItem(UNLOCK_KEY, JSON.stringify(unlocked));
    }
    onConfirmed();
  };

  return (
    <View style={[styles.postPayCard, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: colors.radius }]}>
      <Ionicons name="checkmark-circle-outline" size={32} color={colors.success} />
      <Text style={[styles.postPayTitle, { color: colors.foreground }]}>Payment complete?</Text>
      <Text style={[styles.postPaySub, { color: colors.mutedForeground }]}>
        If you've completed your ₹{PAYMENT_AMOUNT} payment for {brandName}, tap below to unlock full access.
      </Text>
      <Pressable
        style={[styles.submitBtn, { backgroundColor: colors.success, borderRadius: colors.radius / 1.5 }]}
        onPress={confirmPayment}
      >
        <Ionicons name="checkmark" size={18} color="#fff" />
        <Text style={styles.submitBtnText}>Yes, I've paid – Unlock Access</Text>
      </Pressable>
      <Pressable style={styles.cancelBtn} onPress={onCancel}>
        <Text style={[styles.cancelBtnText, { color: colors.mutedForeground }]}>Back to payment</Text>
      </Pressable>
    </View>
  );
}

export default function OpportunityDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showPostPay, setShowPostPay] = useState(false);

  const opportunity = opportunities.find((o) => o.id === id);

  React.useEffect(() => {
    if (!id) return;
    AsyncStorage.getItem(UNLOCK_KEY).then((raw) => {
      const unlocked: string[] = raw ? JSON.parse(raw) : [];
      if (unlocked.includes(id)) setIsUnlocked(true);
    });
  }, [id]);

  if (!opportunity) {
    return (
      <View style={[styles.errorState, { backgroundColor: colors.background }]}>
        <Stack.Screen options={{ title: "Not Found" }} />
        <Ionicons name="alert-circle-outline" size={48} color={colors.mutedForeground} />
        <Text style={[styles.errorText, { color: colors.mutedForeground }]}>Opportunity not found</Text>
        <Pressable onPress={() => router.back()}>
          <Text style={[styles.backLink, { color: colors.primary }]}>Go back</Text>
        </Pressable>
      </View>
    );
  }

  const demandTagColor = opportunity.demandTag
    ? ({
        "High Growth": "#22C55E",
        "Very High": "#16A34A",
        "High Demand": "#2563EB",
        "Growing Demand": "#7C3AED",
        "Growing": "#7C3AED",
        "Stable Demand": "#D97706",
        "Validated": "#D71920",
      } as Record<string, string>)[opportunity.demandTag] ?? colors.primary
    : colors.primary;

  const webTopPad = Platform.OS === "web" ? 67 : 0;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen
        options={{
          title: opportunity.name,
          headerStyle: { backgroundColor: colors.card },
          headerTintColor: colors.foreground,
          headerShadowVisible: false,
        }}
      />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingTop: webTopPad, paddingBottom: insets.bottom + 100 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.heroSection, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
          <View style={[styles.heroInitials, { backgroundColor: colors.primary }]}>
            <Text style={styles.heroInitialsText}>
              {opportunity.name.split(" ").slice(0, 2).map((w) => w[0]).join("")}
            </Text>
          </View>
          <Text style={[styles.heroName, { color: colors.foreground }]}>{opportunity.name}</Text>
          <Text style={[styles.heroIndustry, { color: colors.mutedForeground }]}>{opportunity.industry}</Text>
          <View style={styles.heroBadges}>
            <View style={[styles.badge, { backgroundColor: colors.muted }]}>
              <Text style={[styles.badgeText, { color: colors.mutedForeground }]}>{opportunity.category}</Text>
            </View>
            {opportunity.demandTag && (
              <View style={[styles.badge, { backgroundColor: demandTagColor + "1A", borderColor: demandTagColor + "50", borderWidth: 1 }]}>
                <View style={[styles.dot, { backgroundColor: demandTagColor }]} />
                <Text style={[styles.badgeText, { color: demandTagColor }]}>{opportunity.demandTag}</Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.body}>
          <View style={[styles.statsRow, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: colors.radius }]}>
            <View style={styles.statItem}>
              <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>Investment</Text>
              <Text style={[styles.statValue, { color: colors.foreground }]}>{opportunity.investment}</Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
            <View style={styles.statItem}>
              <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>Commission</Text>
              <Text style={[styles.statValue, { color: colors.primary }]}>
                {opportunity.commission ?? opportunity.commissionPotential}
              </Text>
            </View>
            {opportunity.modelType && (
              <>
                <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
                <View style={[styles.statItem, { flex: 1.5 }]}>
                  <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>Model</Text>
                  <Text style={[styles.statValue, { color: colors.foreground }]} numberOfLines={2}>
                    {opportunity.modelType}
                  </Text>
                </View>
              </>
            )}
          </View>

          <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: colors.radius }]}>
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>About</Text>
            <Text style={[styles.sectionText, { color: colors.mutedForeground }]}>{opportunity.about}</Text>
          </View>

          {opportunity.opportunityHighlights && opportunity.opportunityHighlights.length > 0 && (
            <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: colors.radius }]}>
              <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Investment Highlights</Text>
              {opportunity.opportunityHighlights.map((h, i) => (
                <View key={i} style={styles.highlightRow}>
                  <View style={[styles.highlightDot, { backgroundColor: colors.primary }]} />
                  <Text style={[styles.highlightText, { color: colors.mutedForeground }]}>{h}</Text>
                </View>
              ))}
            </View>
          )}

          {[
            { label: "Why Preferred", value: opportunity.whyPreferred },
            { label: "Market Demand", value: opportunity.marketDemand },
            { label: "Support Provided", value: opportunity.supportProvided },
            { label: "Consultant Benefits", value: opportunity.consultantBenefits },
          ].map((row) => (
            <View key={row.label} style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: colors.radius }]}>
              <Text style={[styles.sectionTitle, { color: colors.foreground }]}>{row.label}</Text>
              <Text style={[styles.sectionText, { color: colors.mutedForeground }]}>{row.value}</Text>
            </View>
          ))}

          {isUnlocked && opportunity.salesContactFull && (
            <View style={[styles.unlockedCard, { backgroundColor: colors.success + "12", borderColor: colors.success + "40", borderRadius: colors.radius }]}>
              <Ionicons name="checkmark-circle" size={24} color={colors.success} />
              <View style={styles.unlockedContent}>
                <Text style={[styles.unlockedTitle, { color: colors.success }]}>Access Unlocked</Text>
                <Text style={[styles.unlockedContact, { color: colors.foreground }]}>
                  Sales Contact: {opportunity.salesContactFull}
                </Text>
              </View>
            </View>
          )}

          {!isUnlocked && showPostPay && (
            <PostPaymentConfirm
              opportunityId={opportunity.id}
              brandName={opportunity.name}
              onConfirmed={() => { setIsUnlocked(true); setShowPostPay(false); }}
              onCancel={() => { setShowPostPay(false); setShowForm(true); }}
            />
          )}

          {!isUnlocked && showForm && !showPostPay && (
            <LeadForm
              brandId={opportunity.id}
              brandName={opportunity.name}
              onCancel={() => setShowForm(false)}
              onRedirecting={() => { setShowForm(false); setShowPostPay(true); }}
            />
          )}

          {!isUnlocked && !showForm && !showPostPay && (
            <Pressable
              style={({ pressed }) => [
                styles.unlockBtn,
                { backgroundColor: colors.primary, borderRadius: colors.radius, opacity: pressed ? 0.9 : 1 },
              ]}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                setShowForm(true);
              }}
            >
              <Ionicons name="lock-closed-outline" size={20} color="#fff" />
              <Text style={styles.unlockBtnText}>Unlock Opportunity Access – ₹{PAYMENT_AMOUNT}</Text>
            </Pressable>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: {},
  heroSection: {
    alignItems: "center",
    paddingVertical: 28,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  heroInitials: { width: 72, height: 72, borderRadius: 20, alignItems: "center", justifyContent: "center", marginBottom: 12 },
  heroInitialsText: { color: "#fff", fontSize: 22, fontWeight: "800", letterSpacing: 1 },
  heroName: { fontSize: 22, fontWeight: "800", letterSpacing: -0.5, textAlign: "center", marginBottom: 4 },
  heroIndustry: { fontSize: 13, fontWeight: "500", textAlign: "center", marginBottom: 12, textTransform: "uppercase", letterSpacing: 0.5 },
  heroBadges: { flexDirection: "row", gap: 8, flexWrap: "wrap", justifyContent: "center" },
  badge: { flexDirection: "row", alignItems: "center", gap: 5, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 6 },
  dot: { width: 5, height: 5, borderRadius: 3 },
  badgeText: { fontSize: 12, fontWeight: "600" },
  body: { padding: 16, gap: 12 },
  statsRow: { flexDirection: "row", borderWidth: 1, overflow: "hidden", shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  statItem: { flex: 1, padding: 14, alignItems: "center" },
  statLabel: { fontSize: 10, fontWeight: "600", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 },
  statValue: { fontSize: 13, fontWeight: "700", textAlign: "center" },
  statDivider: { width: 1 },
  section: { padding: 16, borderWidth: 1, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 6, elevation: 1 },
  sectionTitle: { fontSize: 15, fontWeight: "700", marginBottom: 8 },
  sectionText: { fontSize: 14, lineHeight: 21 },
  highlightRow: { flexDirection: "row", alignItems: "flex-start", gap: 10, marginBottom: 8 },
  highlightDot: { width: 6, height: 6, borderRadius: 3, marginTop: 7 },
  highlightText: { flex: 1, fontSize: 14, lineHeight: 20 },
  unlockedCard: { flexDirection: "row", alignItems: "center", gap: 12, padding: 16, borderWidth: 1 },
  unlockedContent: { flex: 1 },
  unlockedTitle: { fontSize: 14, fontWeight: "700", marginBottom: 2 },
  unlockedContact: { fontSize: 16, fontWeight: "800" },
  unlockBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10, paddingVertical: 16, shadowColor: "#D71920", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4 },
  unlockBtnText: { color: "#fff", fontSize: 16, fontWeight: "800" },
  formCard: { padding: 20, borderWidth: 1, gap: 14 },
  formStepBadge: { flexDirection: "row" },
  stepBadgePill: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20 },
  stepBadgeText: { fontSize: 12, fontWeight: "700" },
  formTitle: { fontSize: 20, fontWeight: "800", marginTop: -4 },
  formSub: { fontSize: 13, lineHeight: 19, marginTop: -6 },
  formFields: { gap: 12 },
  fieldLabel: { fontSize: 12, fontWeight: "600", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.4 },
  fieldInput: { height: 46, paddingHorizontal: 14, fontSize: 15, borderWidth: 1.5 },
  fieldError: { fontSize: 12, marginTop: 4 },
  pickerBtn: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  pickerBtnText: { fontSize: 15 },
  pickerDropdown: { borderWidth: 1, marginTop: 4, overflow: "hidden" },
  pickerOption: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 14, paddingVertical: 12, borderBottomWidth: 1 },
  pickerOptionText: { fontSize: 14 },
  paymentNote: { flexDirection: "row", alignItems: "flex-start", gap: 10, padding: 12 },
  paymentNoteText: { flex: 1, fontSize: 13, lineHeight: 18 },
  submitBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10, paddingVertical: 14 },
  submitBtnText: { color: "#fff", fontSize: 15, fontWeight: "700" },
  cancelBtn: { alignItems: "center", paddingVertical: 4 },
  cancelBtnText: { fontSize: 14 },
  postPayCard: { padding: 20, borderWidth: 1, alignItems: "center", gap: 12 },
  postPayTitle: { fontSize: 20, fontWeight: "800" },
  postPaySub: { fontSize: 14, lineHeight: 20, textAlign: "center" },
  errorState: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12 },
  errorText: { fontSize: 16 },
  backLink: { fontSize: 15, fontWeight: "600" },
});
