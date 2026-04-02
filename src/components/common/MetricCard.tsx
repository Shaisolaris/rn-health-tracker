import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors, spacing, fontSize, borderRadius } from "../../theme/index.js";
import { progressPercent } from "../../utils/index.js";

interface Props { icon: string; label: string; current: number; goal: number; unit: string; color: string; onPress?: () => void; }

export function MetricCard({ icon, label, current, goal, unit, color, onPress }: Props) {
  const pct = progressPercent(current, goal);
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.header}>
        <Text style={styles.icon}>{icon}</Text>
        <Text style={styles.label}>{label}</Text>
      </View>
      <Text style={styles.value}>{current.toLocaleString()}<Text style={styles.unit}> {unit}</Text></Text>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${pct}%`, backgroundColor: color }]} />
      </View>
      <Text style={styles.goal}>{pct}% of {goal.toLocaleString()} {unit}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.surface, borderRadius: borderRadius.md, padding: spacing.md, borderWidth: 1, borderColor: colors.border },
  header: { flexDirection: "row", alignItems: "center", marginBottom: spacing.sm },
  icon: { fontSize: 18, marginRight: spacing.xs },
  label: { fontSize: fontSize.sm, color: colors.textSecondary, fontWeight: "500" },
  value: { fontSize: fontSize.xxl, fontWeight: "700", color: colors.text },
  unit: { fontSize: fontSize.sm, fontWeight: "400", color: colors.textMuted },
  track: { height: 6, backgroundColor: colors.surfaceDark, borderRadius: 3, overflow: "hidden", marginTop: spacing.sm },
  fill: { height: "100%", borderRadius: 3 },
  goal: { fontSize: fontSize.xs, color: colors.textMuted, marginTop: spacing.xs },
});
