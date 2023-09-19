export interface IPlan {
  billingCycle: "monthly" | "annual";
  selectedPlan: "solo" | "team" | null;
  teamMembers: number;
}
