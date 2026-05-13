
// Tenant.ts

'use server'

import pool from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import TenantForm from '../tenants/components/TenantForm';

export async function deleteTenant(id: string) {
  try {
    await pool.query('DELETE FROM erp_tenantes WHERE id = $1', [id]);
    revalidatePath('/tenants');
  } catch (error) {
    console.error('Error deleting tenant:', error);
    throw new Error('Failed to delete tenant');
  }
}

export async function createTenant(formData: FormData) {
  const id = Date.now(); // Generating a unique ID if not using SERIAL
  const tenant_name = formData.get('tenant_name') as string;
  const tenant_code = formData.get('tenant_code') as string;
  const tel_phone = formData.get('tel_phone') as string;
  const mobile = formData.get('mobile') as string;
  const email = formData.get('email') as string;
  const website = formData.get('website') as string;
  const address = formData.get('address') as string;
  const acc_no = formData.get('acc_no') as string;
  const shr_cnt_code = formData.get('shr_cnt_code') as string;
  const shr_cty_code = formData.get('shr_cty_code') as string;
  const shr_cur_code = formData.get('shr_cur_code') as string;
  const contact_person = formData.get('contact_person') as string;
  const tax_no = formData.get('tax_no') as string;
  const locked = formData.get('locked') === 'on' ? 1 : 0;

  try {
    await pool.query(
      `INSERT INTO erp_tenantes (
        id, tenant_name, tenant_code, tel_phone, mobile, email, website, 
        address, acc_no, shr_cnt_code, shr_cty_code, shr_cur_code, 
        contact_person, tax_no, locked
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15
      )`,
      [
        id, tenant_name, tenant_code, tel_phone, mobile, email, website,
        address, acc_no, shr_cnt_code, shr_cty_code, shr_cur_code,
        contact_person, tax_no, locked
      ]
    );
  } catch (error) {
    console.error('Error creating tenant:', error);
    throw new Error('Failed to create tenant');
  }

  revalidatePath('/tenants');
  redirect('/tenants');
}

export async function updateTenant(id: string, formData: FormData) {
  const tenant_name = formData.get('tenant_name') as string;
  const tenant_code = formData.get('tenant_code') as string;
  const tel_phone = formData.get('tel_phone') as string;
  const mobile = formData.get('mobile') as string;
  const email = formData.get('email') as string;
  const website = formData.get('website') as string;
  const address = formData.get('address') as string;
  const acc_no = formData.get('acc_no') as string;
  const shr_cnt_code = formData.get('shr_cnt_code') as string;
  const shr_cty_code = formData.get('shr_cty_code') as string;
  const shr_cur_code = formData.get('shr_cur_code') as string;
  const contact_person = formData.get('contact_person') as string;
  const tax_no = formData.get('tax_no') as string;
  const locked = formData.get('locked') === 'on' ? 1 : 0;

  try {
    await pool.query(
      `UPDATE erp_tenantes SET
        tenant_name = $1, tenant_code = $2, tel_phone = $3, mobile = $4, email = $5, website = $6, 
        address = $7, acc_no = $8, shr_cnt_code = $9, shr_cty_code = $10, shr_cur_code = $11, 
        contact_person = $12, tax_no = $13, locked = $14, last_updated_date = CURRENT_TIMESTAMP
       WHERE id = $15`,
      [
        tenant_name, tenant_code, tel_phone, mobile, email, website,
        address, acc_no, shr_cnt_code, shr_cty_code, shr_cur_code,
        contact_person, tax_no, locked, id
      ]
    );
  } catch (error) {
    console.error('Error updating tenant:', error);
    throw new Error('Failed to update tenant');
  }

  revalidatePath('/tenants');
  redirect('/tenants');
}



