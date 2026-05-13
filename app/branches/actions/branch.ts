'use server';

import pool from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

async function ensureBranchTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS erp_branches (
      id BIGINT PRIMARY KEY,
      ten_id BIGINT,
      branch_name VARCHAR(300) NOT NULL,
      tel_phone VARCHAR(20),
      mobile VARCHAR(20),
      email VARCHAR(300),
      website VARCHAR(300),
      address VARCHAR(3000),
      tax_no VARCHAR(100),
      contact_person VARCHAR(300),
      logo_path VARCHAR(200),
      org_id BIGINT,
      company_id BIGINT,
      logo BYTEA,
      created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      created_by BIGINT,
      last_updated_date TIMESTAMP,
      last_updated_by BIGINT
    )
  `);
}

export async function createBranch(formData: FormData) {
  await ensureBranchTable();
  
  const id = Date.now();
  const ten_id = formData.get('ten_id') ? parseInt(formData.get('ten_id') as string) : null;
  const branch_name = formData.get('branch_name') as string;
  const tel_phone = formData.get('tel_phone') as string;
  const mobile = formData.get('mobile') as string;
  const email = formData.get('email') as string;
  const website = formData.get('website') as string;
  const address = formData.get('address') as string;
  const tax_no = formData.get('tax_no') as string;
  const contact_person = formData.get('contact_person') as string;
  const logo_path = formData.get('logo_path') as string;
  const org_id = formData.get('org_id') ? parseInt(formData.get('org_id') as string) : null;
  const company_id = formData.get('company_id') ? parseInt(formData.get('company_id') as string) : null;
  const created_by = formData.get('created_by') ? parseInt(formData.get('created_by') as string) : null;

  try {
    await pool.query(
      `INSERT INTO erp_branches (
        id, ten_id, branch_name, tel_phone, mobile, email, website,
        address, tax_no, contact_person, logo_path, org_id, company_id, created_by, created_date
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, CURRENT_TIMESTAMP)`,
      [id, ten_id, branch_name, tel_phone, mobile, email, website,
       address, tax_no, contact_person, logo_path, org_id, company_id, created_by]
    );
  } catch (error) {
    console.error('Error creating branch:', error);
    throw new Error('Failed to create branch');
  }

  revalidatePath('/branches');
  redirect('/branches');
}

export async function updateBranch(id: string, formData: FormData) {
  await ensureBranchTable();
  
  const ten_id = formData.get('ten_id') ? parseInt(formData.get('ten_id') as string) : null;
  const branch_name = formData.get('branch_name') as string;
  const tel_phone = formData.get('tel_phone') as string;
  const mobile = formData.get('mobile') as string;
  const email = formData.get('email') as string;
  const website = formData.get('website') as string;
  const address = formData.get('address') as string;
  const tax_no = formData.get('tax_no') as string;
  const contact_person = formData.get('contact_person') as string;
  const logo_path = formData.get('logo_path') as string;
  const org_id = formData.get('org_id') ? parseInt(formData.get('org_id') as string) : null;
  const company_id = formData.get('company_id') ? parseInt(formData.get('company_id') as string) : null;
  const last_updated_by = formData.get('last_updated_by') ? parseInt(formData.get('last_updated_by') as string) : null;

  try {
    await pool.query(
      `UPDATE erp_branches SET
        ten_id = $1, branch_name = $2, tel_phone = $3, mobile = $4,
        email = $5, website = $6, address = $7, tax_no = $8,
        contact_person = $9, logo_path = $10, org_id = $11, company_id = $12,
        last_updated_by = $13, last_updated_date = CURRENT_TIMESTAMP
       WHERE id = $14`,
      [ten_id, branch_name, tel_phone, mobile, email, website,
       address, tax_no, contact_person, logo_path, org_id, company_id, last_updated_by, id]
    );
  } catch (error) {
    console.error('Error updating branch:', error);
    throw new Error('Failed to update branch');
  }

  revalidatePath('/branches');
  redirect('/branches');
}

export async function deleteBranch(id: string) {
  await ensureBranchTable();
  
  try {
    await pool.query('DELETE FROM erp_branches WHERE id = $1', [id]);
    revalidatePath('/branches');
  } catch (error) {
    console.error('Error deleting branch:', error);
    throw new Error('Failed to delete branch');
  }
}

export async function getBranches() {
  try {
    await ensureBranchTable();
    const result = await pool.query('SELECT * FROM erp_branches ORDER BY created_date DESC');
    return result.rows;
  } catch (error) {
    console.error('Error fetching branches:', error);
    return [];
  }
}

export async function getBranch(id: string) {
  try {
    await ensureBranchTable();
    const result = await pool.query('SELECT * FROM erp_branches WHERE id = $1', [id]);
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error fetching branch:', error);
    return null;
  }
}