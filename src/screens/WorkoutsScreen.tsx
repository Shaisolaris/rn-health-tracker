import { } from "../data/demo";
import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { colors, spacing, fontSize, borderRadius } from "../theme/index.js";
import { useAppStore } from "../store/index.js";
import { WorkoutCard } from "../components/workout/WorkoutCard.js";

export function WorkoutsScreen({ navigation }: { navigation: any }) {
  const workouts = useAppStore((s) => s.workouts);

  const todayWorkouts = workouts.filter((w) => w.date === new Date().toISOString().split("T")[0]);
  const pastWorkouts = workouts.filter((w) => w.date !== new Date().toISOString().split("T")[0]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Workouts</Text>
        <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate("LogWorkout")}>
          <Text style={styles.addText}>+ Log Workout</Text>
        </TouchableOpacity>
      </View>

      {/* Quick start templates */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.templates}>
        {["🏋️ Strength", "🏃 Cardio", "🧘 Yoga", "⚡ HIIT", "🏊 Swim"].map((t) => (
          <TouchableOpacity key={t} style={styles.templateChip}><Text style={styles.templateText}>{t}</Text></TouchableOpacity>
        ))}
      </ScrollView>

      {todayWorkouts.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today</Text>
          {todayWorkouts.map((w) => <WorkoutCard key={w.id} workout={w} onPress={() => navigation.navigate("WorkoutDetail", { id: w.id })} />)}
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Previous</Text>
        {pastWorkouts.map((w) => <WorkoutCard key={w.id} workout={w} onPress={() => navigation.navigate("WorkoutDetail", { id: w.id })} />)}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: spacing.md, paddingTop: spacing.lg },
  title: { fontSize: fontSize.xxl, fontWeight: "700", color: colors.text },
  addBtn: { backgroundColor: colors.primary, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: borderRadius.full },
  addText: { color: "#fff", fontSize: fontSize.sm, fontWeight: "600" },
  templates: { paddingHorizontal: spacing.md, paddingVertical: spacing.md },
  templateChip: { backgroundColor: colors.surface, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: borderRadius.full, marginRight: spacing.sm, borderWidth: 1, borderColor: colors.border },
  templateText: { fontSize: fontSize.md },
  section: { paddingHorizontal: spacing.md, marginBottom: spacing.md },
  sectionTitle: { fontSize: fontSize.lg, fontWeight: "600", color: colors.text, marginBottom: spacing.sm },
});
