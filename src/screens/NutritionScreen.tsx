import { } from "../data/demo";
import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { colors, spacing, fontSize, borderRadius } from "../theme/index.js";
import { useAppStore } from "../store/index.js";
import { MealRow } from "../components/nutrition/MealRow.js";
import { RingProgress } from "../components/common/RingProgress.js";
import { progressPercent } from "../utils/index.js";

export function NutritionScreen({ navigation }: { navigation: any }) {
  const nutrition = useAppStore((s) => s.nutrition);
  const stats = useAppStore((s) => s.dailyStats);
  const goals = useAppStore((s) => s.goals);

  const totals = nutrition.reduce((acc, n) => ({
    calories: acc.calories + n.calories, protein: acc.protein + n.protein,
    carbs: acc.carbs + n.carbs, fat: acc.fat + n.fat,
  }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

  const meals = ["breakfast", "lunch", "dinner", "snack"] as const;
  const mealLabels: Record<string, string> = { breakfast: "🌅 Breakfast", lunch: "☀️ Lunch", dinner: "🌙 Dinner", snack: "🍎 Snacks" };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Nutrition</Text>
        <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate("LogMeal")}>
          <Text style={styles.addText}>+ Log Meal</Text>
        </TouchableOpacity>
      </View>

      {/* Macro rings */}
      <View style={styles.macroRow}>
        <RingProgress progress={progressPercent(totals.calories, goals.dailyCalories)} color={colors.calories} label="Calories" value={`${totals.calories}`} size={90} />
        <RingProgress progress={Math.min(100, (totals.protein / 150) * 100)} color={colors.protein} label="Protein" value={`${totals.protein}g`} size={90} />
        <RingProgress progress={Math.min(100, (totals.carbs / 250) * 100)} color={colors.carbs} label="Carbs" value={`${totals.carbs}g`} size={90} />
        <RingProgress progress={Math.min(100, (totals.fat / 70) * 100)} color={colors.fat} label="Fat" value={`${totals.fat}g`} size={90} />
      </View>

      {/* Meals by type */}
      {meals.map((meal) => {
        const items = nutrition.filter((n) => n.meal === meal);
        if (items.length === 0) return null;
        return (
          <View key={meal} style={styles.mealSection}>
            <Text style={styles.mealTitle}>{mealLabels[meal]}</Text>
            {items.map((item) => <MealRow key={item.id} entry={item} />)}
          </View>
        );
      })}

      <View style={{ height: spacing.xxl }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: spacing.md, paddingTop: spacing.lg },
  title: { fontSize: fontSize.xxl, fontWeight: "700", color: colors.text },
  addBtn: { backgroundColor: colors.primary, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: borderRadius.full },
  addText: { color: "#fff", fontSize: fontSize.sm, fontWeight: "600" },
  macroRow: { flexDirection: "row", justifyContent: "space-around", paddingVertical: spacing.lg },
  mealSection: { paddingHorizontal: spacing.md, marginBottom: spacing.md },
  mealTitle: { fontSize: fontSize.lg, fontWeight: "600", color: colors.text, marginBottom: spacing.xs },
});
