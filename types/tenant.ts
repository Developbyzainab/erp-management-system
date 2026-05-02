export interface Tenant {
  id: string; // Since id is BIGINT, it comes as a string in pg
  tenant_name: string;
  tenant_code?: string;
  tel_phone?: string;
  mobile?: string;
  email?: string;
  website?: string;
  address?: string;
  tax_no?: string;
  acc_no?: string;
  contact_person?: string;
  locked?: number;
  logo_path?: string;
  shr_cur_code?: string;
  shr_cnt_code?: string;
  shr_cty_code?: string;
  created_date?: Date;
  created_by?: string;
  last_updated_date?: Date;
  last_updated_by?: string;
}
