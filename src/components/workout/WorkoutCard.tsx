import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors, spacing, fontSize, borderRadius } from "../../theme/index.js";
import { formatDuration } from "../../utils/index.js";
import type { Workout } from "../../types/index.js";

const typeIcons: Record<string, string> = { strength: "🏋️", cardio: "🏃", flexibility: "🤸", hiit: "⚡", yoga: "🧘", swimming: "🏊" };

export function WorkoutCard({ workout, onPress }: { workout: Workout; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.iconWrap}><Text style={styles.icon}>{typeIcons[workout.type] || "💪"}</Text></View>
      <View style={styles.info}>
        <Text style={styles.name}>{workout.name}</Text>
        <View style={styles.meta}>
          <Text style={styles.metaText}>{formatDuration(workout.duration)}</Text>
          <Text style={styles.dot}>·</Text>
          <Text style={styles.metaText}>{workout.caloriesBurned} cal</Text>
          <Text style={styles.dot}>·</Text>
          <Text style={styles.metaText}>{workout.exercises.length} exercises</Text>
        </View>
      </View>
      {workout.completed && <Text style={styles.check}>✅</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center", backgroundColor: colors.surface, borderRadius: borderRadius.md, padding: spacing.md, marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.border },
  iconWrap: { width: 48, height: 48, borderRadius: borderRadius.md, backgroundColor: colors.surfaceDark, justifyContent: "center", alignItems: "center" },
  icon: { fontSize: 24 },
  info: { flex: 1, marginLeft: spacing.md },
  name: { fontSize: fontSize.lg, fontWeight: "600", color: colors.text },
  meta: { flexDirection: "row", alignItems: "center", marginTop: spacing.xs },
  metaText: { fontSize: fontSize.sm, color: colors.textSecondary },
  dot: { marginHorizontal: spacing.xs, color: colors.textMuted },
  check: { fontSize: 20 },
});
