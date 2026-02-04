import {CrudModel} from '@app/core';

export class MemberInformationMeta extends CrudModel {
  member_id: number | string;
  full_name: string;
  is_working: boolean;
  gender: string;
  telegram_id: string;

  position: string;
  status_office: string;
  start_date: string;
  debut_date: string;
  stop_date: string;

  contract_salary: number;
  base_salary: number;
  kpi_salary: number;
  kpi_score: number;

  phone_allowance: number;
  travel_allowance: number;
  lunch_allowance: number;
  clothing_allowance: number;
  others_allowance: number;

  number_bank_account: string;
  name_bank_account: string;

  dob: string;
  citizen_identification: string;
  phone_number: string;
  email: string;
  address: string;
  description: string;

  leave_days: string;

  created_at: string;
  updated_at: string;

  is_insurance_paid: boolean;
}
