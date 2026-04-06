import { } from "../data/demo";
import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { colors, spacing, fontSize, borderRadius } from "../theme/index.js";
import { useAppStore } from "../store/index.js";
import { RingProgress } from "../components/common/RingProgress.js";
import { MetricCard } from "../components/common/MetricCard.js";
import { WorkoutCard } from "../components/workout/WorkoutCard.js";
import { progressPercent, formatSleep } from "../utils/index.js";

export function TodayScreen({ navigation }: { navigation: any }) {
  const stats = useAppStore((s) => s.dailyStats);
  const workouts = useAppStore((s) => s.workouts).filter((w) => w.date === stats.date);
  const addWater = useAppStore((s) => s.addWater);
  const removeWater = useAppStore((s) => s.removeWater);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Good morning! 👋</Text>
        <Text style={styles.date}>{new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</Text>
      </View>

      {/* Rings */}
      <View style={styles.ringsRow}>
        <RingProgress progress={progressPercent(stats.steps, stats.stepsGoal)} color={colors.steps} label="Steps" value={stats.steps.toLocaleString()} size={110} />
        <RingProgress progress={progressPercent(stats.calories, stats.caloriesGoal)} color={colors.calories} label="Calories" value={`${stats.calories}`} size={110} />
        <RingProgress progress={progressPercent(stats.activeMinutes, stats.activeGoal)} color={colors.active} label="Active" value={`${stats.activeMinutes}m`} size={110} />
      </View>

      {/* Metrics */}
      <View style={styles.metricsRow}>
        <MetricCard icon="👟" label="Steps" current={stats.steps} goal={stats.stepsGoal} unit="steps" color={colors.steps} />
        <View style={{ width: spacing.md }} />
        <MetricCard icon="🔥" label="Calories" current={stats.calories} goal={stats.caloriesGoal} unit="cal" color={colors.calories} />
      </View>

      {/* Water */}
      <View style={styles.waterCard}>
        <View style={styles.waterHeader}>
          <Text style={styles.sectionTitle}>💧 Water Intake</Text>
          <Text style={styles.waterCount}>{stats.water} / {stats.waterGoal} glasses</Text>
        </View>
        <View style={styles.waterGlasses}>
          {Array.from({ length: stats.waterGoal }, (_, i) => (
            <TouchableOpacity key={i} onPress={i < stats.water ? removeWater : addWater} style={[styles.glass, i < stats.water && styles.glassFilled]}>
              <Text style={styles.glassIcon}>{i < stats.water ? "💧" : "○"}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Sleep */}
      <View style={styles.sleepCard}>
        <Text style={styles.sectionTitle}>😴 Sleep</Text>
        <Text style={styles.sleepValue}>{formatSleep(stats.sleep)}</Text>
        <View style={styles.sleepBar}>
          <View style={[styles.sleepFill, { width: `${progressPercent(stats.sleep, stats.sleepGoal)}%` }]} />
        </View>
        <Text style={styles.sleepGoal}>Goal: {stats.sleepGoal}h</Text>
      </View>

      {/* Today's Workouts */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🏋️ Today's Workouts</Text>
        {workouts.map((w) => <WorkoutCard key={w.id} workout={w} onPress={() => navigation.navigate("WorkoutDetail", { id: w.id })} />)}
        {workouts.length === 0 && <Text style={styles.emptyText}>No workouts yet today</Text>}
      </View>

      <View style={{ height: spacing.xxl }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: spacing.md, paddingTop: spacing.lg },
  greeting: { fontSize: fontSize.xxl, fontWeight: "700", color: colors.text },
  date: { fontSize: fontSize.md, color: colors.textSecondary, marginTop: spacing.xs },
  ringsRow: { flexDirection: "row", justifyContent: "space-around", paddingVertical: spacing.lg },
  metricsRow: { flexDirection: "row", paddingHorizontal: spacing.md, marginBottom: spacing.md },
  waterCard: { backgroundColor: colors.surface, marginHorizontal: spacing.md, borderRadius: borderRadius.md, padding: spacing.md, marginBottom: spacing.md, borderWidth: 1, borderColor: colors.border },
  waterHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: spacing.md },
  waterCount: { fontSize: fontSize.md, color: colors.water, fontWeight: "600" },
  waterGlasses: { flexDirection: "row", justifyContent: "space-around" },
  glass: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.surfaceDark, justifyContent: "center", alignItems: "center" },
  glassFilled: { backgroundColor: colors.water + "20" },
  glassIcon: { fontSize: 16 },
  sleepCard: { backgroundColor: colors.surface, marginHorizontal: spacing.md, borderRadius: borderRadius.md, padding: spacing.md, marginBottom: spacing.md, borderWidth: 1, borderColor: colors.border },
  sleepValue: { fontSize: fontSize.xxl, fontWeight: "700", color: colors.text, marginTop: spacing.sm },
  sleepBar: { height: 8, backgroundColor: colors.surfaceDark, borderRadius: 4, overflow: "hidden", marginTop: spacing.sm },
  sleepFill: { height: "100%", backgroundColor: colors.sleep, borderRadius: 4 },
  sleepGoal: { fontSize: fontSize.sm, color: colors.textMuted, marginTop: spacing.xs },
  section: { paddingHorizontal: spacing.md, marginTop: spacing.md },
  sectionTitle: { fontSize: fontSize.lg, fontWeight: "600", color: colors.text, marginBottom: spacing.sm },
  emptyText: { textAlign: "center", color: colors.textMuted, paddingVertical: spacing.lg },
});
