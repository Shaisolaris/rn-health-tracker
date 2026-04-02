import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, spacing, fontSize } from "../../theme/index.js";
import type { NutritionEntry } from "../../types/index.js";

const mealIcons: Record<string, string> = { breakfast: "🌅", lunch: "☀️", dinner: "🌙", snack: "🍎" };

export function MealRow({ entry }: { entry: NutritionEntry }) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>{mealIcons[entry.meal] || "🍽️"}</Text>
      <View style={styles.info}>
        <Text style={styles.name}>{entry.name}</Text>
        <View style={styles.macros}>
          <Text style={[styles.macro, { color: colors.protein }]}>P: {entry.protein}g</Text>
          <Text style={[styles.macro, { color: colors.carbs }]}>C: {entry.carbs}g</Text>
          <Text style={[styles.macro, { color: colors.fat }]}>F: {entry.fat}g</Text>
        </View>
      </View>
      <Text style={styles.calories}>{entry.calories} cal</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center", paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  icon: { fontSize: 24, marginRight: spacing.md },
  info: { flex: 1 },
  name: { fontSize: fontSize.md, fontWeight: "500", color: colors.text },
  macros: { flexDirection: "row", gap: spacing.md, marginTop: spacing.xs },
  macro: { fontSize: fontSize.sm, fontWeight: "500" },
  calories: { fontSize: fontSize.md, fontWeight: "600", color: colors.text },
});
