export interface IPlan {
  billingCycle: "monthly" | "annual";
  selectedPlan: "solo" | "team";
  teamMembers: number;
}
