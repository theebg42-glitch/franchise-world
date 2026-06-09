import React, { useMemo, useState } from "react";
import {
  FlatList,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";
import { categories, opportunities, type Opportunity } from "@/data/opportunities";

const CATEGORY_ALL = "ALL" as const;
type FilterCategory = typeof CATEGORY_ALL | typeof categories[number];

const demandTagColors: Record<string, string> = {
  "High Growth": "#22C55E",
  "Very High": "#16A34A",
  "High Demand": "#2563EB",
  "Growing Demand": "#7C3AED",
  "Growing": "#7C3AED",
  "Stable Demand": "#D97706",
  "Validated": "#D71920",
};

function CategoryPill({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  const colors = useColors();
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.pill,
        {
          backgroundColor: active ? colors.primary : colors.card,
          borderColor: active ? colors.primary : colors.border,
        },
      ]}
    >
      <Text
        style={[
          styles.pillText,
          { color: active ? colors.primaryForeground : colors.mutedForeground },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

function OpportunityCard({ item }: { item: Opportunity }) {
  const colors = useColors();
  const tagColor = item.demandTag ? demandTagColors[item.demandTag] ?? colors.primary : colors.primary;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          borderRadius: colors.radius,
          opacity: pressed ? 0.92 : 1,
          transform: [{ scale: pressed ? 0.985 : 1 }],
        },
      ]}
      onPress={() => router.push(`/opportunity/${item.id}`)}
    >
      <View style={styles.cardHeader}>
        <View style={[styles.categoryBadge, { backgroundColor: colors.muted }]}>
          <Text style={[styles.categoryBadgeText, { color: colors.mutedForeground }]}>
            {item.category}
          </Text>
        </View>
        {item.demandTag && (
          <View style={[styles.demandBadge, { backgroundColor: tagColor + "1A", borderColor: tagColor + "40" }]}>
            <View style={[styles.demandDot, { backgroundColor: tagColor }]} />
            <Text style={[styles.demandBadgeText, { color: tagColor }]}>{item.demandTag}</Text>
          </View>
        )}
      </View>

      <Text style={[styles.cardName, { color: colors.foreground }]}>{item.name}</Text>
      <Text style={[styles.cardIndustry, { color: colors.mutedForeground }]}>{item.industry}</Text>
      <Text style={[styles.cardDescription, { color: colors.mutedForeground }]} numberOfLines={2}>
        {item.description}
      </Text>

      <View style={[styles.cardFooter, { borderTopColor: colors.border }]}>
        <View>
          <Text style={[styles.footerLabel, { color: colors.mutedForeground }]}>Investment</Text>
          <Text style={[styles.footerValue, { color: colors.foreground }]}>{item.investment}</Text>
        </View>
        <View style={styles.footerRight}>
          <View>
            <Text style={[styles.footerLabel, { color: colors.mutedForeground }]}>Commission</Text>
            <Text style={[styles.footerValue, { color: colors.primary }]}>{item.commission ?? item.commissionPotential}</Text>
          </View>
          <View style={[styles.arrowBtn, { backgroundColor: colors.primary }]}>
            <Ionicons name="arrow-forward" size={14} color="#fff" />
          </View>
        </View>
      </View>
    </Pressable>
  );
}

export default function OpportunitiesScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>(CATEGORY_ALL);

  const filterTabs: FilterCategory[] = [CATEGORY_ALL, ...categories];

  const filtered = useMemo(
    () =>
      selectedCategory === CATEGORY_ALL
        ? opportunities
        : opportunities.filter((o) => o.category === selectedCategory),
    [selectedCategory]
  );

  const webTopPad = Platform.OS === "web" ? 67 : 0;
  const webBottomPad = Platform.OS === "web" ? 34 : 0;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View
        style={[
          styles.header,
          {
            backgroundColor: colors.card,
            borderBottomColor: colors.border,
            paddingTop: insets.top + 12 + webTopPad,
          },
        ]}
      >
        <View style={styles.headerTop}>
          <View>
            <Text style={[styles.headerTitle, { color: colors.foreground }]}>Opportunities</Text>
            <Text style={[styles.headerSub, { color: colors.mutedForeground }]}>
              {filtered.length} franchise brands
            </Text>
          </View>
          <View style={[styles.logoMark, { backgroundColor: colors.primary }]}>
            <Text style={styles.logoMarkText}>FW</Text>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.pillRow}
        >
          {filterTabs.map((cat) => (
            <CategoryPill
              key={cat}
              label={cat === CATEGORY_ALL ? "All" : cat}
              active={selectedCategory === cat}
              onPress={() => setSelectedCategory(cat)}
            />
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <OpportunityCard item={item} />}
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: insets.bottom + 90 + webBottomPad },
        ]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={48} color={colors.mutedForeground} />
            <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>
              No opportunities in this category
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "700",
    letterSpacing: -0.5,
  },
  headerSub: {
    fontSize: 13,
    marginTop: 2,
  },
  logoMark: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  logoMarkText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  pillRow: {
    gap: 8,
    paddingRight: 8,
  },
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1.5,
  },
  pillText: {
    fontSize: 13,
    fontWeight: "600",
  },
  listContent: {
    padding: 16,
    gap: 12,
  },
  card: {
    borderWidth: 1,
    padding: 16,
    marginBottom: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
    flexWrap: "wrap",
  },
  categoryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  categoryBadgeText: {
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
  demandBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
  },
  demandDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
  },
  demandBadgeText: {
    fontSize: 11,
    fontWeight: "600",
  },
  cardName: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 3,
    letterSpacing: -0.3,
  },
  cardIndustry: {
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  cardDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 14,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingTop: 12,
    borderTopWidth: 1,
  },
  footerLabel: {
    fontSize: 11,
    fontWeight: "500",
    marginBottom: 2,
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  footerValue: {
    fontSize: 14,
    fontWeight: "700",
  },
  footerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  arrowBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 60,
    gap: 12,
  },
  emptyText: {
    fontSize: 15,
  },
});
