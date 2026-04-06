import { } from "../data/demo";
import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { colors, spacing, fontSize, borderRadius } from "../theme/index.js";
import { useAppStore } from "../store/index.js";

export function SettingsScreen() {
  const goals = useAppStore((s) => s.goals);

  const goalItems = [
    { icon: "👟", label: "Daily Steps", value: goals.dailySteps.toLocaleString() },
    { icon: "🔥", label: "Daily Calories", value: `${goals.dailyCalories} cal` },
    { icon: "💧", label: "Daily Water", value: `${goals.dailyWater} glasses` },
    { icon: "😴", label: "Daily Sleep", value: `${goals.dailySleep} hours` },
    { icon: "⏱️", label: "Active Minutes", value: `${goals.dailyActiveMinutes} min` },
    { icon: "🏋️", label: "Weekly Workouts", value: `${goals.weeklyWorkouts}` },
  ];

  const menuItems = [
    { icon: "👤", label: "Profile" }, { icon: "🔔", label: "Notifications" },
    { icon: "📱", label: "Connected Devices" }, { icon: "📊", label: "Export Data" },
    { icon: "❓", label: "Help & Support" }, { icon: "ℹ️", label: "About" },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Goals</Text>
        <View style={styles.card}>
          {goalItems.map((item) => (
            <TouchableOpacity key={item.label} style={styles.row}>
              <Text style={styles.rowIcon}>{item.icon}</Text>
              <Text style={styles.rowLabel}>{item.label}</Text>
              <Text style={styles.rowValue}>{item.value}</Text>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>General</Text>
        <View style={styles.card}>
          {menuItems.map((item) => (
            <TouchableOpacity key={item.label} style={styles.row}>
              <Text style={styles.rowIcon}>{item.icon}</Text>
              <Text style={styles.rowLabel}>{item.label}</Text>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, paddingHorizontal: spacing.md },
  title: { fontSize: fontSize.xxl, fontWeight: "700", color: colors.text, paddingTop: spacing.lg, marginBottom: spacing.lg },
  section: { marginBottom: spacing.lg },
  sectionTitle: { fontSize: fontSize.md, fontWeight: "600", color: colors.textSecondary, marginBottom: spacing.sm, textTransform: "uppercase", letterSpacing: 1 },
  card: { backgroundColor: colors.surface, borderRadius: borderRadius.md, overflow: "hidden", borderWidth: 1, borderColor: colors.border },
  row: { flexDirection: "row", alignItems: "center", padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  rowIcon: { fontSize: 18, marginRight: spacing.md },
  rowLabel: { flex: 1, fontSize: fontSize.md, color: colors.text },
  rowValue: { fontSize: fontSize.md, color: colors.textSecondary, marginRight: spacing.sm },
  chevron: { fontSize: fontSize.xl, color: colors.textMuted },
});
