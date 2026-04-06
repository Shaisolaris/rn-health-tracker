import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { colors, spacing, fontSize, borderRadius } from "../theme/index.js";
import { useAppStore } from "../store/index.js";
import { formatSleep } from "../utils/index.js";
import type { WeeklyProgress } from "../types/index.js";

function BarChart({ data, dataKey, color, maxValue }: { data: WeeklyProgress[]; dataKey: keyof WeeklyProgress; color: string; maxValue: number }) {
  return (
    <View style={barStyles.container}>
      {data.map((d, i) => {
        const value = d[dataKey] as number;
        const height = Math.max((value / maxValue) * 100, 4);
        return (
          <View key={i} style={barStyles.barWrap}>
            <Text style={barStyles.value}>{typeof value === "number" && value >= 1000 ? `${(value / 1000).toFixed(1)}K` : value}</Text>
            <View style={barStyles.barTrack}>
              <View style={[barStyles.bar, { height: `${height}%`, backgroundColor: color }]} />
            </View>
            <Text style={barStyles.label}>{d.week.split(" ")[1]}</Text>
          </View>
        );
      })}
    </View>
  );
}

const barStyles = StyleSheet.create({
  container: { flexDirection: "row", justifyContent: "space-around", alignItems: "flex-end", height: 140, paddingTop: spacing.md },
  barWrap: { alignItems: "center", flex: 1 },
  value: { fontSize: 10, color: colors.textMuted, marginBottom: 4 },
  barTrack: { width: 28, height: 80, justifyContent: "flex-end" },
  bar: { width: "100%", borderRadius: 4, minHeight: 4 },
  label: { fontSize: 10, color: colors.textMuted, marginTop: 4 },
});

export function ProgressScreen() {
  const weekly = useAppStore((s) => s.weeklyProgress);

  const cards = [
    { title: "Steps", key: "avgSteps" as const, color: colors.steps, max: 12000 },
    { title: "Calories", key: "avgCalories" as const, color: colors.calories, max: 3000 },
    { title: "Workouts", key: "totalWorkouts" as const, color: colors.primary, max: 7 },
    { title: "Sleep (hrs)", key: "avgSleep" as const, color: colors.sleep, max: 10 },
    { title: "Water (glasses)", key: "avgWater" as const, color: colors.water, max: 10 },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Progress</Text>
      <Text style={styles.subtitle}>Weekly trends over the last 5 weeks</Text>

      {cards.map((card) => (
        <View key={card.key} style={styles.card}>
          <Text style={styles.cardTitle}>{card.title}</Text>
          <BarChart data={weekly} dataKey={card.key} color={card.color} maxValue={card.max} />
        </View>
      ))}

      <View style={{ height: spacing.xxl }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, paddingHorizontal: spacing.md },
  title: { fontSize: fontSize.xxl, fontWeight: "700", color: colors.text, paddingTop: spacing.lg },
  subtitle: { fontSize: fontSize.md, color: colors.textSecondary, marginBottom: spacing.lg },
  card: { backgroundColor: colors.surface, borderRadius: borderRadius.md, padding: spacing.md, marginBottom: spacing.md, borderWidth: 1, borderColor: colors.border },
  cardTitle: { fontSize: fontSize.lg, fontWeight: "600", color: colors.text },
});
