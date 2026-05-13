'use server';

import pool from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

async function ensureDepartmentTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS erp_department (
      id BIGINT PRIMARY KEY,
      ten_id BIGINT,
      department_name VARCHAR(300) NOT NULL,
      tel_phone VARCHAR(20),
      branch_id BIGINT,
      created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      created_by BIGINT,
      last_updated_date TIMESTAMP,
      last_updated_by BIGINT
    )
  `);
}

export async function createDepartment(formData: FormData) {
  await ensureDepartmentTable();
  
  const id = Date.now();
  const ten_id = formData.get('ten_id') ? parseInt(formData.get('ten_id') as string) : null;
  const department_name = formData.get('department_name') as string;
  const tel_phone = formData.get('tel_phone') as string;
  const branch_id = formData.get('branch_id') ? parseInt(formData.get('branch_id') as string) : null;
  const created_by = formData.get('created_by') ? parseInt(formData.get('created_by') as string) : null;

  try {
    await pool.query(
      `INSERT INTO erp_department (
        id, ten_id, department_name, tel_phone, branch_id, created_by, created_date
      ) VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP)`,
      [id, ten_id, department_name, tel_phone, branch_id, created_by]
    );
  } catch (error) {
    console.error('Error creating department:', error);
    throw new Error('Failed to create department');
  }

  revalidatePath('/departments');
  redirect('/departments');
}

export async function updateDepartment(id: string, formData: FormData) {
  await ensureDepartmentTable();
  
  const ten_id = formData.get('ten_id') ? parseInt(formData.get('ten_id') as string) : null;
  const department_name = formData.get('department_name') as string;
  const tel_phone = formData.get('tel_phone') as string;
  const branch_id = formData.get('branch_id') ? parseInt(formData.get('branch_id') as string) : null;
  const last_updated_by = formData.get('last_updated_by') ? parseInt(formData.get('last_updated_by') as string) : null;

  try {
    await pool.query(
      `UPDATE erp_department SET
        ten_id = $1, department_name = $2, tel_phone = $3,
        branch_id = $4, last_updated_by = $5, last_updated_date = CURRENT_TIMESTAMP
       WHERE id = $6`,
      [ten_id, department_name, tel_phone, branch_id, last_updated_by, id]
    );
  } catch (error) {
    console.error('Error updating department:', error);
    throw new Error('Failed to update department');
  }

  revalidatePath('/departments');
  redirect('/departments');
}

export async function deleteDepartment(id: string) {
  await ensureDepartmentTable();
  
  try {
    await pool.query('DELETE FROM erp_department WHERE id = $1', [id]);
    revalidatePath('/departments');
  } catch (error) {
    console.error('Error deleting department:', error);
    throw new Error('Failed to delete department');
  }
}

export async function getDepartments() {
  try {
    await ensureDepartmentTable();
    const result = await pool.query(`
      SELECT d.*, b.branch_name 
      FROM erp_department d
      LEFT JOIN erp_branches b ON d.branch_id = b.id
      ORDER BY d.created_date DESC
    `);
    return result.rows;
  } catch (error) {
    console.error('Error fetching departments:', error);
    return [];
  }
}

export async function getDepartment(id: string) {
  try {
    await ensureDepartmentTable();
    const result = await pool.query('SELECT * FROM erp_department WHERE id = $1', [id]);
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error fetching department:', error);
    return null;
  }
}