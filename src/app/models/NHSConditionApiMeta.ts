export interface NHSConditionApiMeta {
  id: number;
  meta_requested: string;
  condition_name: string;
  description: string;
  symptoms: string;
  self_care: string;
  self_isolation: string;
  other_treatments: string;
  diagnosis: string;
  prevention: string;
  nhs_condition_url: string;
  nhs_header_url: string;
}
